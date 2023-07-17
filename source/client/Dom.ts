import { Data } from "@jeremy-bankes/toolbox/shared";

type OnDomReadyCallback = (mapping: Dom.ElementMapping) => void | Promise<void>;
type OnDomErrorCallback = (error: Error, mapping: Dom.ElementMapping) => void;
type SlowedInputCallback = (event: Event, slowed: boolean) => void;
type ValueEvaluationCallback = (element: HTMLInputElement) => boolean;
type InputModifier = (value: string) => string;

type HTMLElementCreationOptions = {
    tagName: string,
    classList?: string[],
    textContent?: string,
    innerHTML?: string,
    outerHTML?: string,
    attributes?: { [ElementId: string]: string },
    eventListeners?: { [ElementId: string]: EventListenerOrEventListenerObject },
    childNodes?: Node[]
};

export namespace Dom {

    /**
     * Called if an error occurs while executing the {@link Network.onReady} callback.
     */
    const _onErrorListeners: OnDomErrorCallback[] = [];

    /**
     * Registers a callback to be run when the DOM content loads.
     * @param callback The callback to be run when the DOM content loads.
     */
    export function onReady(callback: OnDomReadyCallback) {
        const mapping = Dom.getMapping();
        const execute = () => Promise.resolve(callback(mapping)).catch((error) => _onErrorListeners.forEach(listener => listener(error, mapping)));
        if (document.readyState === "complete") {
            execute();
        } else {
            window.addEventListener("DOMContentLoaded", execute);
        }
    }

    /**
     * Registers a callback to be run if an error occurs while executing onReady callbacks.
     * @param callback The callback to be run if an error occurs while executing onReady callbacks.
     */
    export function onError(callback: OnDomErrorCallback) {
        _onErrorListeners.push(callback);
    }

    /**
     * Returns an ElementMapping of all elements in {@link root}.
     * @param root The document to create the mapping for.
     * @returns A mapping of element in {@link root}
     */
    export function getMapping(root: Document | DocumentFragment = document) {
        return new ElementMapping(root);
    }

    /**
     * Creates an HTML element
     * @param options The options used to create the element
     * @returns The created HTML element
     */
    export function create(options: HTMLElementCreationOptions) {
        const element = document.createElement(options.tagName);
        if (Data.has(options, "textContent")) {
            element.textContent = options.textContent;
        }
        if (Data.has(options, "classList")) {
            element.classList.add(...options.classList);
        }
        if (Data.has(options, "innerHTML")) {
            element.innerHTML = options.innerHTML;
        }
        if (Data.has(options, "outerHTML")) {
            element.outerHTML = options.outerHTML;
        }
        if (Data.has(options, "attributes")) {
            for (const name in options.attributes) {
                element.setAttribute(name, options.attributes[name]);
            }
        }
        if (Data.has(options, "eventListeners")) {
            for (const type in options.eventListeners) {
                element.addEventListener(type, options.eventListeners[type]);
            }
        }
        if (Data.has(options, "childNodes")) {
            element.append(...options.childNodes);
        }
        return element;
    }

    /**
     * Checks to see if an element with the ID "elementId" exists in the DOM.
     * @param elementId The ID of an element to check the existance of.
     * @returns True of an element with the ID "elementId" exists in the DOM, false otherwise.
     */
    export function exists(elementId: string) {
        return document.getElementById(elementId) !== null;
    }

    /**
     * Removes all children from a node.
     * @param container The node to remove the children from.
     */
    export function clear(container: Node) {
        while (container.lastChild !== null) {
            container.lastChild.remove();
        }
        return container;
    }

    /**
     * Retrieves form data for inputs within a certain section in a form
     * @param section The section to retrieve the form data from. This can be the form itself.
     */
    export function getFormData(section: HTMLElement) {
        const form = section instanceof HTMLFormElement ? section : section.closest("form");
        Data.assert(form !== null, "The provided section is not in a form element.");
        const formData = new FormData(form);
        for (const element of form.elements) {
            if (!section.contains(element)) {
                if (element instanceof HTMLInputElement) {
                    formData.delete(element.name);
                }
            }
        }
        return formData;
    }

    /**
     * Populates a form's inputs with data.
     * @param form The form element to populate.
     * @param data The data to populate {@link form} with.
     */
    export function setFormData(form: HTMLFormElement, data: FormData | object) {
        let formData: FormData;
        if (data instanceof FormData) {
            formData = data;
        } else {
            formData = new FormData();
            Data.walk(data, (_, property, path) => {
                if (typeof property !== "object") {
                    formData.append(path, property);
                }
                return false;
            });
        }
        for (const [key, value] of formData) {
            if (key in form.elements) {
                const input = form.elements[key as never];
                if (input instanceof HTMLInputElement) {
                    switch (input.type) {
                        case "checkbox":
                            input.checked = !!value;
                            break;
                        default:
                            if (value instanceof File) {
                                const dataTransfer = new DataTransfer();
                                dataTransfer.items.add(value);
                                input.files = dataTransfer.files;
                            } else {
                                input.value = value;
                            }
                            break;
                    }
                }
            }
        }
    }

    /**
     * Clears the value of the inputs within a certain section within a form.
     * @param section The section to retrieve the form data from.
     */
    export function clearFormSection(section: HTMLElement) {
        const form = section instanceof HTMLFormElement ? section : section.closest("form");
        Data.assert(form !== null, "The provided section is not in a form element.");
        for (const element of form.elements) {
            if (section.contains(element)) {
                if (element instanceof HTMLInputElement) {
                    if (element.type === "checkbox" || element.type === "radio") {
                        element.checked = false;
                    } else if (element.type === "file") {
                        element.files = new FileList();
                    } else {
                        element.value = "";
                    }
                } else if (element instanceof HTMLTextAreaElement) {
                    element.value = "";
                } else if (element instanceof HTMLSelectElement) {
                    element.selectedIndex = 0;
                }
            }
        }
    }

    /**
     * Submits a form whilst triggering HTML's default form validation.
     * @param form A form to submit.
     */
    export function submitFormWithValidation(form: HTMLFormElement) {
        const input = document.createElement("input");
        input.style.display = "none";
        input.setAttribute("type", "submit");
        form.appendChild(input);
        input.click();
        input.remove();
    }

    /**
     * Pulses a halo affect around an element to bring attention to it.
     * @param element The element to pluse
     * @param color The color of the pluse
     */
    export function pulse(element: HTMLElement, color: string = "#FF0000") {
        let i = 0;
        const duration = 500;
        const steps = 20;
        const boxShadowBefore = element.style.boxShadow;
        const intervalId = setInterval(() => {
            if (i > 1) {
                element.style.boxShadow = boxShadowBefore;
                clearInterval(intervalId);
            } else {
                i += (duration / 1000) / steps;
                const expand = Math.sin(Math.PI * (4 * i + 1.5)) + 1;
                element.style.boxShadow = `0 0 ${expand * 15}px ${color}`;
            }
        }, duration / steps);
    }

    /**
     * Get a computed value of a css variable.
     * @param name The name of the css variable. (Starts with "--")
     * @returns The computed style of the css variable named {@link name}.
     */
    export function getCssVariable(name: string) {
        return getComputedStyle(document.documentElement).getPropertyValue(name);
    }

    /**
     * Sets a CSS variable for a given element.
     * @param name The name of the css variable. (Starts with "--")
     * @param value The CSS value of the variable.
     * @param element The host element of the styles. (Defaults to document.documentElement)
     */
    export function setCssVariable(name: string, value: string, element: HTMLElement = document.documentElement) {
        element.style.setProperty(name, value);
    }

    /**
     * Attaches a input listener that only fires a given amount of time after the user has stopped inputting.
     * This is useful to reducing the amount of API requests for suggestions-as-you-type search boxes.
     * @param input The element to attach the listener to
     * @param callback The callback to be run after inputting
     * @param delay The time in milliseconds to wait after the user has inputted until firing the callback 
     */
    export function setSlowedInputListener(input: HTMLInputElement, callback: SlowedInputCallback, delay: number = 500) {
        if (callback) {
            let timeout: NodeJS.Timeout;
            input.oninput = event => {
                if (timeout === undefined) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => callback(event, true), delay);
                callback(event, false);
            };
        } else {
            input.oninput = null;
        }
    }

    /**
     * Attaches a modifier to an input to allow text tranformations. I.E. Auto capitalizing a postal code input, title casing a name input, etc.
     * @param input An input to apply an input modifer to.
     * @param modifier The modifier for "input"s value.
     */
    export function addTextModifier(input: HTMLInputElement, modifier: InputModifier) {
        input.addEventListener("input", () => {
            const selectionStart = input.selectionStart;
            const selectionEnd = input.selectionEnd;
            input.value = modifier(input.value);
            input.setSelectionRange(selectionStart, selectionEnd);
        });
    }

    /**
     * Controls the existance of "templateElement"s content in the DOM based on the value of "controlInput"
     * @param templateElement The element whoes existance is dictated by "controlInput"
     * @param controlInput The element whoes value controls the existance of "templateElement"
     * @param valueEvaluationCallback The callback to assess "controlInput"s value. Returns true for "templateElement" to exists, false otherwise.
     */
    export function existanceControlledBy(templateElement: HTMLTemplateElement, controlInput: HTMLInputElement, valueEvaluationCallback: ValueEvaluationCallback = (controlInput) => controlInput.checked) {
        const puppetElements = [...templateElement.content.childNodes];
        const update = () => {
            if (valueEvaluationCallback(controlInput)) {
                templateElement.after(...puppetElements);
            } else {
                templateElement.content.append(...puppetElements);
            }
        };
        controlInput.addEventListener("change", update);
        update();
    }

    type ElementMapProxy<Element extends HTMLElement> = { [ElementId: string]: Element };
    /**
     * Holds a mapping of IDs to their corresponding elements
     * An easy-to-use typed, wrapping of document.getElementById()
     */
    export class ElementMapping {

        private _proxy: {};

        public constructor(root: Document | DocumentFragment = document) {
            this._proxy = new Proxy(root, {
                get(root, elementId: string) {
                    return root.getElementById(elementId);
                }
            });
        }

        public get element() { return this._proxy as ElementMapProxy<HTMLElement> }
        public get anchor() { return this._proxy as ElementMapProxy<HTMLAnchorElement> }
        public get base() { return this._proxy as ElementMapProxy<HTMLBaseElement> }
        public get body() { return this._proxy as ElementMapProxy<HTMLBodyElement> }
        public get break() { return this._proxy as ElementMapProxy<HTMLBRElement> }
        public get button() { return this._proxy as ElementMapProxy<HTMLButtonElement> }
        public get canvas() { return this._proxy as ElementMapProxy<HTMLCanvasElement> }
        public get division() { return this._proxy as ElementMapProxy<HTMLDivElement> }
        public get descriptionList() { return this._proxy as ElementMapProxy<HTMLDListElement> }
        public get embed() { return this._proxy as ElementMapProxy<HTMLEmbedElement> }
        public get form() { return this._proxy as ElementMapProxy<HTMLFormElement> }
        public get head() { return this._proxy as ElementMapProxy<HTMLHeadElement> }
        public get heading() { return this._proxy as ElementMapProxy<HTMLHeadingElement> }
        public get horizontalRule() { return this._proxy as ElementMapProxy<HTMLHRElement> }
        public get html() { return this._proxy as ElementMapProxy<HTMLHtmlElement> }
        public get inlineFrame() { return this._proxy as ElementMapProxy<HTMLIFrameElement> }
        public get image() { return this._proxy as ElementMapProxy<HTMLImageElement> }
        public get input() { return this._proxy as ElementMapProxy<HTMLInputElement> }
        public get listItem() { return this._proxy as ElementMapProxy<HTMLLIElement> }
        public get link() { return this._proxy as ElementMapProxy<HTMLLinkElement> }
        public get menu() { return this._proxy as ElementMapProxy<HTMLMenuElement> }
        public get meta() { return this._proxy as ElementMapProxy<HTMLMetaElement> }
        public get mod() { return this._proxy as ElementMapProxy<HTMLModElement> }
        public get orderedList() { return this._proxy as ElementMapProxy<HTMLOListElement> }
        public get optgroups() { return this._proxy as ElementMapProxy<HTMLOptGroupElement> }
        public get option() { return this._proxy as ElementMapProxy<HTMLOptionElement> }
        public get paragraph() { return this._proxy as ElementMapProxy<HTMLParagraphElement> }
        public get preformattedText() { return this._proxy as ElementMapProxy<HTMLPreElement> }
        public get quote() { return this._proxy as ElementMapProxy<HTMLQuoteElement> }
        public get script() { return this._proxy as ElementMapProxy<HTMLScriptElement> }
        public get select() { return this._proxy as ElementMapProxy<HTMLSelectElement> }
        public get slot() { return this._proxy as ElementMapProxy<HTMLSlotElement> }
        public get span() { return this._proxy as ElementMapProxy<HTMLSpanElement> }
        public get style() { return this._proxy as ElementMapProxy<HTMLStyleElement> }
        public get tableCell() { return this._proxy as ElementMapProxy<HTMLTableCellElement> }
        public get table() { return this._proxy as ElementMapProxy<HTMLTableElement> }
        public get tableRow() { return this._proxy as ElementMapProxy<HTMLTableRowElement> }
        public get tableSection() { return this._proxy as ElementMapProxy<HTMLTableSectionElement> }
        public get template() { return this._proxy as ElementMapProxy<HTMLTemplateElement> }
        public get time() { return this._proxy as ElementMapProxy<HTMLTimeElement> }
        public get title() { return this._proxy as ElementMapProxy<HTMLTitleElement> }
        public get unorderedList() { return this._proxy as ElementMapProxy<HTMLUListElement> }

    }

}