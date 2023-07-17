export namespace RegularExpression {

    export const email = /(^[\w\.]+)@((?:[\w-]+\.)+[\w-]{2,4}$)/i;
    export const mimeType = /(?:application|audio|font|example|image|message|model|multipart|text|video)\/[a-z0-9+-.]+/i;

}