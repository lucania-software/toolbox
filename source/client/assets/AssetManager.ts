import { Data, Error, RegularExpression } from "@jeremy-bankes/toolbox/shared";
import { Loader } from "./Loader";

export type ResourceLoader<ResourceType> = {
    contentTypes: string[];
    load: (response: Response) => Promise<ResourceType>;
}

interface ResourceDescriptor {
    name: string,
    source: string,
    contentType?: string
}

interface ResourceLoadedCallback {
    (resource: any, resourceDescriptor: ResourceDescriptor): void;
}

export class AssetManager {

    public readonly queue: ResourceDescriptor[];
    public readonly resourceLoaders: ResourceLoader<any>[];
    private _resources: { [Name: string]: any };

    public constructor() {
        this.queue = [];
        this.resourceLoaders = [Loader.bitmap, Loader.dom, Loader.json, Loader.text];
        this._resources = {};
    }

    public register(resourceLoader: ResourceLoader<any>) {
        this.resourceLoaders.push(resourceLoader);
    }

    public add(name: string, source: string, contentType?: string) {
        this.queue.push({ name, source, contentType });
    }

    public async load(resourceLoadedCallback?: ResourceLoadedCallback) {
        const tasks = [];
        while (this.queue.length > 0) {
            const resourceDescriptor = this.queue.pop() as ResourceDescriptor;
            tasks.push(new Promise(async (resolve, reject) => {
                try {
                    const response = await fetch(resourceDescriptor.source);
                    if (response.status !== 200) {
                        throw Error.Http.getFromResponse(response);
                    }
                    let contentType = resourceDescriptor.contentType;
                    if (contentType === undefined && response.headers.has("Content-Type")) {
                        const headerContentType = response.headers.get("Content-Type") as string;
                        const match = headerContentType.match(RegularExpression.mimeType);
                        if (match !== null) {
                            [contentType] = match;
                        }
                    }
                    let loader = undefined;
                    if (contentType !== undefined) {
                        const definedContentType = contentType;
                        loader = this.resourceLoaders.find((loader) => loader.contentTypes.includes(definedContentType));
                    }
                    Data.assert(loader !== undefined, `No loaders found for content type "${contentType}".`);
                    let resource = undefined;
                    try {
                        resource = await loader.load(response);
                    } catch (error) {
                        console.warn(error);
                    }
                    if (resourceLoadedCallback !== undefined) {
                        resourceLoadedCallback(resource, resourceDescriptor);
                    }
                    this._resources[resourceDescriptor.name] = resource;
                    resolve(resource);
                } catch (error) {
                    reject(error);
                }
            }));
        }
        return await Promise.all(tasks);
    }

    public get<Type>(name: string): Type | undefined {
        if (name in this._resources) {
            return this._resources[name];
        } else {
            return undefined;
        }
    }

    public getAsserted<Type>(name: string): Type {
        const value = this.get<Type>(name);
        Data.assert(value !== undefined, `Failed to get asset named "${name}" as it is not loaded.`);
        return value;
    }

}