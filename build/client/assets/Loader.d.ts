import { ResourceLoader } from "./AssetManager";
export declare namespace Loader {
    const dom: ResourceLoader<Document>;
    const bitmap: ResourceLoader<ImageBitmap>;
    const json: ResourceLoader<any>;
    const text: {
        contentTypes: string[];
        load(response: Response): Promise<string>;
    };
}
