declare enum RequestMethod {
    GET = "GET",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    TRACE = "TRACE"
}
type NetworkDefaults = {
    /** The host to use for outgoing requests instead of the current origin. */
    host?: string;
    /** Headers to use for all outgoing requests */
    headers: HeadersInit;
    /** Headers to use for outgoing GET requests */
    getHeaders: HeadersInit;
    /** Headers to use for outgoing POST requests */
    postHeaders: HeadersInit;
};
export declare namespace Network {
    /**
     * Used specify default to use for all outgoing requests.
     */
    const defaults: NetworkDefaults;
    /**
     * Sends a {@link method} request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function request(url: string, method?: RequestMethod, body?: BodyInit | object, headers?: HeadersInit): Promise<Response>;
    /**
     * Sends a post request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param parameters The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function get(url: string, parameters?: URLSearchParams, headers?: HeadersInit): Promise<Response>;
    /**
     * Sends a post request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function post(url: string, body?: BodyInit | object, headers?: HeadersInit): Promise<Response>;
    /**
     * Sends a put request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function put(url: string, body: BodyInit | object, headers?: HeadersInit): Promise<Response>;
    /**
     * Sends a patch request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function patch(url: string, body: BodyInit | object, headers?: {}): Promise<Response>;
    /**
     * Sends a delete request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @note It's unsatisfying that delete is a reserved keyword.
     *
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function deleteRequest(url: string, body: BodyInit | object, headers?: {}): Promise<Response>;
}
export {};
