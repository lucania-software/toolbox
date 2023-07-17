import { Data } from "@jeremy-bankes/toolbox/shared";

enum RequestMethod {
    GET = "GET", HEAD = "HEAD", OPTIONS = "OPTIONS", PATCH = "PATCH",
    POST = "POST", PUT = "PUT", DELETE = "DELETE", TRACE = "TRACE"
}

type NetworkDefaults = {
    /** The host to use for outgoing requests instead of the current origin. */
    host?: string,
    /** Headers to use for all outgoing requests */
    headers: HeadersInit,
    /** Headers to use for outgoing GET requests */
    getHeaders: HeadersInit,
    /** Headers to use for outgoing POST requests */
    postHeaders: HeadersInit
};

export namespace Network {

    /**
     * Used specify default to use for all outgoing requests.
     */
    export const defaults: NetworkDefaults = {
        headers: {},
        getHeaders: {},
        postHeaders: {},
    }

    /**
     * Sends a {@link method} request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    export async function request(url: string, method: RequestMethod = RequestMethod.GET, body?: BodyInit | object, headers: HeadersInit = {}) {
        if (Network.defaults.host !== undefined && url.match(/^[a-zA-Z]+:\/\//) === null) {
            url = Network.defaults.host + url;
        }
        const additionalHeaders: Record<string, string> = {};
        if (typeof body === "object") {
            body = JSON.stringify(body);
            additionalHeaders["Content-Type"] = "application/json";
        }
        return await fetch(url, {
            method: method,
            credentials: "include",
            headers: {
                ...Network.defaults.headers,
                ...Data.conditional(method === RequestMethod.GET, Network.defaults.getHeaders),
                ...Data.conditional(method === RequestMethod.POST, Network.defaults.postHeaders),
                ...additionalHeaders,
                ...headers
            },
            ...Data.conditional(body !== undefined, { body })
        });
    }

    /**
     * Sends a post request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param parameters The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    export async function get(url: string, parameters?: URLSearchParams, headers: HeadersInit = {}) {
        if (parameters !== undefined) {
            url = url + "?" + parameters.toString();
        }
        return await Network.request(url, RequestMethod.GET, undefined, headers);
    }

    /**
     * Sends a post request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    export async function post(url: string, body: BodyInit | object = {}, headers: HeadersInit = {}) {
        return await Network.request(url, RequestMethod.POST, body, headers);
    }

    /**
     * Sends a put request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    export async function put(url: string, body: BodyInit | object, headers: HeadersInit = {}) {
        return await Network.request(url, RequestMethod.PUT, body, headers);
    }

    /**
     * Sends a patch request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    export async function patch(url: string, body: BodyInit | object, headers = {}) {
        return await Network.request(url, RequestMethod.PATCH, body, headers);
    }

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
    export async function deleteRequest(url: string, body: BodyInit | object, headers = {}) {
        return await Network.request(url, RequestMethod.DELETE, body, headers);
    }

}