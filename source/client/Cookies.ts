import { Data } from "@lucania/toolbox/shared";

export type CookieOptions = {
    path?: string,
    domain?: string,
    maxAge?: number,
    expires?: Date,
    secure?: boolean,
    sameSite?: "lax" | "strict" | "none"
};

export namespace Cookies {

    /**
     * Retrieves a cookie by name.
     * @param name The name of the cookie to get the value of.
     * @returns The cookie named {@link name}, or null if it does not exist.
     */
    export function get(name: string) {
        const valueStrings = document.cookie.split(";");
        for (const valueString of valueStrings) {
            const [possibleKey, value] = valueString.trim().split("=").map(decodeURIComponent);
            if (name === possibleKey) {
                return value;
            }
        }
        return null;
    }

    /**
     * Retrieves a JSON cookie by name.
     * @param name The name of the cookie to get the value of.
     * @returns The cookie named {@link name}, or null if it does not exist, or cannot be parsed as JSON.
     */
    export function getJson(name: string) {
        try {
            const cookie = Cookies.get(name);
            Data.assert(cookie !== null);
            return JSON.parse(cookie);
        } catch (error) {
            return null;
        }
    }

    /**
     * Retrieves all cookies and returns each key, value pair as an object.
     * @returns An object where each key in a cookie name that maps a cookie value.
     */
    export function getAll(): { [key: string]: string } {
        const cookies: { [key: string]: string } = {};
        const valueStrings = document.cookie.split(";");
        for (const valueString of valueStrings) {
            const [key, value] = valueString.trim().split("=").map(decodeURIComponent);
            cookies[key] = value;
        }
        return cookies;
    }

    /**
     * Sets a cookie named {@link name} to {@link value}.
     * @param name The name of the cookie to set the value of.
     * @param value The value of the cookie to be set.
     */
    export function set(name: string, value: string, options: CookieOptions = {}) {
        const pieces = [`${name}=${encodeURIComponent(value)}`];
        if (Data.has(options, "path")) {
            pieces.push(`path=${options.path}`);
        }
        if (Data.has(options, "domain")) {
            pieces.push(`domain=${options.domain}`);
        }
        if (Data.has(options, "maxAge")) {
            pieces.push(`max-age=${options.maxAge}`);
        }
        if (Data.has(options, "expires")) {
            pieces.push(`expires=${options.expires.toUTCString()}`)
        }
        if (Data.has(options, "pasecureth") && options.secure) {
            pieces.push("secure");
        }
        if (Data.has(options, "sameSite")) {
            pieces.push(`samesite=${options.sameSite}`);
        }
        document.cookie = pieces.join("; ");
    }

    /**
     * Sets a cookie named {@link name} to {@link value} as JSON.
     * @param name The name of the cookie to set the value of.
     * @param value The value of the cookie to be set.
     */
    export function setJson(name: string, value: any, options?: CookieOptions) {
        Cookies.set(name, JSON.stringify(value), options);
    }

    /**
     * Deletes a cookie named {@link name}.
     * @param name The name of the cookie to delete.
     */
    export function remove(name: string, options: CookieOptions = {}) {
        const pieces = [`${name}=`];
        if ("path" in options) {
            pieces.push(`path=${options.path}`);
        }
        if ("domain" in options) {
            pieces.push(`domain=${options.domain}`);
        }
        if ("secure" in options && options.secure) {
            pieces.push("secure");
        }
        if ("sameSite" in options) {
            pieces.push(`samesite=${options.sameSite}`);
        }
        pieces.push(`max-age=0`);
        document.cookie = pieces.join("; ");
    }

}