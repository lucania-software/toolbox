type OnDomReadyCallback = (mapping: Dom.ElementMapping) => void | Promise<void>;
type OnDomErrorCallback = (error: Error, mapping: Dom.ElementMapping) => void;
type SlowedInputCallback = (event: Event, slowed: boolean) => void;
type ValueEvaluationCallback = (element: HTMLInputElement) => boolean;
type InputModifier = (value: string) => string;
type HTMLElementCreationOptions = {
    tagName: string;
    classList?: string[];
    textContent?: string;
    innerHTML?: string;
    outerHTML?: string;
    style?: Partial<CSSStyleDeclaration>;
    attributes?: {
        [ElementId: string]: string;
    };
    eventListeners?: {
        [ElementId: string]: EventListenerOrEventListenerObject;
    };
    childNodes?: Node[];
};
export declare namespace Dom {
    /**
     * Registers a callback to be run when the DOM content loads.
     * @param callback The callback to be run when the DOM content loads.
     */
    export function onReady(callback: OnDomReadyCallback): void;
    /**
     * Registers a callback to be run if an error occurs while executing onReady callbacks.
     * @param callback The callback to be run if an error occurs while executing onReady callbacks.
     */
    export function onError(callback: OnDomErrorCallback): void;
    /**
     * Returns an ElementMapping of all elements in {@link root}.
     * @param root The document to create the mapping for.
     * @returns A mapping of element in {@link root}
     */
    export function getMapping(root?: Document | DocumentFragment): ElementMapping;
    /**
     * Creates an HTML element
     * @param options The options used to create the element
     * @returns The created HTML element
     */
    export function create(options: HTMLElementCreationOptions): HTMLElement;
    export type PopulationContext = {
        [Key: string]: PopulationContext | string;
    };
    export function populate(node: Node, context: PopulationContext): void;
    export function createFromTemplate(template: HTMLTemplateElement, context: PopulationContext): DocumentFragment;
    /**
     * Checks to see if an element with the ID "elementId" exists in the DOM.
     * @param elementId The ID of an element to check the existance of.
     * @returns True of an element with the ID "elementId" exists in the DOM, false otherwise.
     */
    export function exists(elementId: string): boolean;
    /**
     * Removes all children from a node.
     * @param container The node to remove the children from.
     */
    export function clear(container: Node): Node;
    /**
     * Retrieves form data for inputs within a certain section in a form
     * @param section The section to retrieve the form data from. This can be the form itself.
     */
    export function getFormData(section: HTMLElement): FormData;
    /**
     * Populates a form's inputs with data.
     * @param form The form element to populate.
     * @param data The data to populate {@link form} with.
     */
    export function setFormData(form: HTMLFormElement, data: FormData | object): void;
    /**
     * Clears the value of the inputs within a certain section within a form.
     * @param section The section to retrieve the form data from.
     */
    export function clearFormSection(section: HTMLElement): void;
    /**
     * Submits a form whilst triggering HTML's default form validation.
     * @param form A form to submit.
     */
    export function submitFormWithValidation(form: HTMLFormElement): void;
    /**
     * Pulses a halo affect around an element to bring attention to it.
     * @param element The element to pluse
     * @param color The color of the pluse
     */
    export function pulse(element: HTMLElement, color?: string): void;
    /**
     * Get a computed value of a css variable.
     * @param name The name of the css variable. (Starts with "--")
     * @returns The computed style of the css variable named {@link name}.
     */
    export function getCssVariable(name: string): string;
    /**
     * Sets a CSS variable for a given element.
     * @param name The name of the css variable. (Starts with "--")
     * @param value The CSS value of the variable.
     * @param element The host element of the styles. (Defaults to document.documentElement)
     */
    export function setCssVariable(name: string, value: string, element?: HTMLElement): void;
    /**
     * Attaches a input listener that only fires a given amount of time after the user has stopped inputting.
     * This is useful to reducing the amount of API requests for suggestions-as-you-type search boxes.
     * @param input The element to attach the listener to
     * @param callback The callback to be run after inputting
     * @param delay The time in milliseconds to wait after the user has inputted until firing the callback
     */
    export function setSlowedInputListener(input: HTMLInputElement, callback: SlowedInputCallback, delay?: number): void;
    /**
     * Attaches a modifier to an input to allow text tranformations. I.E. Auto capitalizing a postal code input, title casing a name input, etc.
     * @param input An input to apply an input modifer to.
     * @param modifier The modifier for "input"s value.
     */
    export function addTextModifier(input: HTMLInputElement, modifier: InputModifier): void;
    /**
     * Controls the existance of "templateElement"s content in the DOM based on the value of "controlInput"
     * @param templateElement The element whoes existance is dictated by "controlInput"
     * @param controlInput The element whoes value controls the existance of "templateElement"
     * @param valueEvaluationCallback The callback to assess "controlInput"s value. Returns true for "templateElement" to exists, false otherwise.
     */
    export function existanceControlledBy(templateElement: HTMLTemplateElement, controlInput: HTMLInputElement, valueEvaluationCallback?: ValueEvaluationCallback): void;
    type ElementMapProxy<Element extends HTMLElement> = {
        [ElementId: string]: Element;
    };
    /**
     * Holds a mapping of IDs to their corresponding elements
     * An easy-to-use typed, wrapping of document.getElementById()
     */
    export class ElementMapping {
        private _proxy;
        constructor(root?: Document | DocumentFragment);
        get element(): ElementMapProxy<HTMLElement>;
        get anchor(): ElementMapProxy<HTMLAnchorElement>;
        get base(): ElementMapProxy<HTMLBaseElement>;
        get body(): ElementMapProxy<HTMLBodyElement>;
        get break(): ElementMapProxy<HTMLBRElement>;
        get button(): ElementMapProxy<HTMLButtonElement>;
        get canvas(): ElementMapProxy<HTMLCanvasElement>;
        get division(): ElementMapProxy<HTMLDivElement>;
        get descriptionList(): ElementMapProxy<HTMLDListElement>;
        get embed(): ElementMapProxy<HTMLEmbedElement>;
        get form(): ElementMapProxy<HTMLFormElement>;
        get head(): ElementMapProxy<HTMLHeadElement>;
        get heading(): ElementMapProxy<HTMLHeadingElement>;
        get horizontalRule(): ElementMapProxy<HTMLHRElement>;
        get html(): ElementMapProxy<HTMLHtmlElement>;
        get inlineFrame(): ElementMapProxy<HTMLIFrameElement>;
        get image(): ElementMapProxy<HTMLImageElement>;
        get input(): ElementMapProxy<HTMLInputElement>;
        get listItem(): ElementMapProxy<HTMLLIElement>;
        get link(): ElementMapProxy<HTMLLinkElement>;
        get menu(): ElementMapProxy<HTMLMenuElement>;
        get meta(): ElementMapProxy<HTMLMetaElement>;
        get mod(): ElementMapProxy<HTMLModElement>;
        get orderedList(): ElementMapProxy<HTMLOListElement>;
        get optgroups(): ElementMapProxy<HTMLOptGroupElement>;
        get option(): ElementMapProxy<HTMLOptionElement>;
        get paragraph(): ElementMapProxy<HTMLParagraphElement>;
        get preformattedText(): ElementMapProxy<HTMLPreElement>;
        get quote(): ElementMapProxy<HTMLQuoteElement>;
        get script(): ElementMapProxy<HTMLScriptElement>;
        get select(): ElementMapProxy<HTMLSelectElement>;
        get slot(): ElementMapProxy<HTMLSlotElement>;
        get span(): ElementMapProxy<HTMLSpanElement>;
        get style(): ElementMapProxy<HTMLStyleElement>;
        get tableCell(): ElementMapProxy<HTMLTableCellElement>;
        get table(): ElementMapProxy<HTMLTableElement>;
        get tableRow(): ElementMapProxy<HTMLTableRowElement>;
        get tableSection(): ElementMapProxy<HTMLTableSectionElement>;
        get template(): ElementMapProxy<HTMLTemplateElement>;
        get time(): ElementMapProxy<HTMLTimeElement>;
        get title(): ElementMapProxy<HTMLTitleElement>;
        get unorderedList(): ElementMapProxy<HTMLUListElement>;
    }
    export {};
}
export {};
