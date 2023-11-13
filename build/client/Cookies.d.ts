export type CookieOptions = {
    path?: string;
    domain?: string;
    maxAge?: number;
    expires?: Date;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
};
export declare namespace Cookies {
    /**
     * Retrieves a cookie by name.
     * @param name The name of the cookie to get the value of.
     * @returns The cookie named {@link name}, or null if it does not exist.
     */
    function get(name: string): string | null;
    /**
     * Retrieves a JSON cookie by name.
     * @param name The name of the cookie to get the value of.
     * @returns The cookie named {@link name}, or null if it does not exist, or cannot be parsed as JSON.
     */
    function getJson(name: string): any;
    /**
     * Retrieves all cookies and returns each key, value pair as an object.
     * @returns An object where each key in a cookie name that maps a cookie value.
     */
    function getAll(): {
        [key: string]: string;
    };
    /**
     * Sets a cookie named {@link name} to {@link value}.
     * @param name The name of the cookie to set the value of.
     * @param value The value of the cookie to be set.
     */
    function set(name: string, value: string, options?: CookieOptions): void;
    /**
     * Sets a cookie named {@link name} to {@link value} as JSON.
     * @param name The name of the cookie to set the value of.
     * @param value The value of the cookie to be set.
     */
    function setJson(name: string, value: any, options?: CookieOptions): void;
    /**
     * Deletes a cookie named {@link name}.
     * @param name The name of the cookie to delete.
     */
    function remove(name: string, options?: CookieOptions): void;
}
