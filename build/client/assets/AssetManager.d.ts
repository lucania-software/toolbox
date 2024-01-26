export type ResourceLoader<ResourceType> = {
    contentTypes: string[];
    load: (response: Response) => Promise<ResourceType>;
};
interface ResourceDescriptor {
    name: string;
    source: string;
    contentType?: string;
}
interface ResourceLoadedCallback {
    (resource: any, resourceDescriptor: ResourceDescriptor): void;
}
export declare class AssetManager {
    readonly queue: ResourceDescriptor[];
    readonly resourceLoaders: ResourceLoader<any>[];
    private _resources;
    constructor();
    register(resourceLoader: ResourceLoader<any>): void;
    add(name: string, source: string, contentType?: string): void;
    load(resourceLoadedCallback?: ResourceLoadedCallback): Promise<unknown[]>;
    get<Type>(name: string): Type | undefined;
    getAsserted<Type = any>(name: string): Type;
}
export {};
