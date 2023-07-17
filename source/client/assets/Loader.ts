import { Data, RegularExpression } from "@jeremy-bankes/toolbox/shared";
import { ResourceLoader } from "./AssetManager";

export namespace Loader {

    export const dom: ResourceLoader<Document> = {

        contentTypes: [
            "text/html",
            "text/xml",
            "application/xml",
            "application/xhtml+xml",
            "image/svg+xml"
        ],

        load: async function (response: Response) {
            const text = await response.text();
            const contentType = response.headers.get("Content-Type");
            let mimeType: DOMParserSupportedType;
            if (contentType === null) {
                mimeType = "text/html";
            } else {
                const match = contentType.match(RegularExpression.mimeType);
                Data.assert(match !== null, `Failed to parse Content-Type header "${contentType}".`);
                [mimeType] = match as [DOMParserSupportedType];
            }
            const parser = new DOMParser();
            return parser.parseFromString(text, mimeType);
        }

    };

    export const bitmap: ResourceLoader<ImageBitmap> = {

        contentTypes: [
            "image/avif",
            "image/bmp",
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/tiff",
            "image/webp"
        ],

        async load(response: Response) {
            return await window.createImageBitmap(await response.blob());
        }

    };

    export const json: ResourceLoader<any> = {

        contentTypes: [
            "application/json"
        ],

        async load(response: Response) {
            return await response.json();
        }

    };

    export const text = {

        contentTypes: [
            "text/css",
            "text/csv",
            "text/plain"
        ],

        async load(response: Response) {
            return await response.text();
        }

    };

}