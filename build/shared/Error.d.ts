/**
 * A set of semantic errors.
 */
export declare namespace Error {
    const Original: ErrorConstructor;
    class Named extends Original {
        constructor(message?: string, options?: ErrorOptions);
    }
    /**
     * For when something goes very wrong.
     */
    class Fatal extends Named {
        constructor(message?: string);
    }
    /**
     * For use for features that haven't been implemented yet.
     */
    class Unimplemented extends Fatal {
        constructor();
    }
    /**
     * Thrown when a Data.assertion is failed.
     */
    class Assertion extends Named {
        constructor(message?: string);
    }
    /**
     * For use to indicate networks errors whilst using the HTTP protocol.
     */
    class Http extends Named {
        readonly code: number;
        constructor(code: number, message?: string);
        static getFromResponse(response: {
            status: number;
            statusText: string;
        }): InternalServerError | NotImplemented | BadGateway | ServiceUnavailable | GatewayTimeout | VersionNotSupported | VariantAlsoNegotiates | InsufficientStorage | LoopDetected | NotExtended | NetworkAuthenticationRequired | BadRequest | Unauthorized | PaymentRequired | Forbidden | NotFound | MethodNotAllowed | NotAcceptable | ProxyAuthenticationRequired | RequestTimeout | Conflict | Gone | LengthRequired | PreconditionFailed | PayloadTooLarge | UriTooLong | UnsupportedMediaType | RangeNotSatisfiable | ExpectationFailed | Teapot | MisdirectedRequest | UnprocessableContent | Locked | FailedDependency | TooEarly | UpgradeRequired | PreconditionRequired | TooManyRequests | RequestHeaderFieldsTooLarge | UnavailableForLegalReasons | undefined;
    }
    /**
     * For use to indicate the server made a mistake over the HTTP protocol.
     */
    class Server extends Http {
        constructor(message?: string, code?: number);
    }
    class InternalServerError extends Server {
        constructor(message?: string);
    }
    class NotImplemented extends Server {
        constructor(message?: string);
    }
    class BadGateway extends Server {
        constructor(message?: string);
    }
    class ServiceUnavailable extends Server {
        constructor(message?: string);
    }
    class GatewayTimeout extends Server {
        constructor(message?: string);
    }
    class VersionNotSupported extends Server {
        constructor(message?: string);
    }
    class VariantAlsoNegotiates extends Server {
        constructor(message?: string);
    }
    class InsufficientStorage extends Server {
        constructor(message?: string);
    }
    class LoopDetected extends Server {
        constructor(message?: string);
    }
    class NotExtended extends Server {
        constructor(message?: string);
    }
    class NetworkAuthenticationRequired extends Server {
        constructor(message?: string);
    }
    /**
     * For use to indicate the user made a mistake over the HTTP protocol.
     */
    class User extends Http {
        constructor(message?: string, code?: number);
    }
    class BadRequest extends User {
        constructor(message?: string);
    }
    class Unauthorized extends User {
        constructor(message?: string);
    }
    class PaymentRequired extends User {
        constructor(message?: string);
    }
    class Forbidden extends User {
        constructor(message?: string);
    }
    class NotFound extends User {
        constructor(message?: string);
    }
    class MethodNotAllowed extends User {
        constructor(message?: string);
    }
    class NotAcceptable extends User {
        constructor(message?: string);
    }
    class ProxyAuthenticationRequired extends User {
        constructor(message?: string);
    }
    class RequestTimeout extends User {
        constructor(message?: string);
    }
    class Conflict extends User {
        constructor(message?: string);
    }
    class Gone extends User {
        constructor(message?: string);
    }
    class LengthRequired extends User {
        constructor(message?: string);
    }
    class PreconditionFailed extends User {
        constructor(message?: string);
    }
    class PayloadTooLarge extends User {
        constructor(message?: string);
    }
    class UriTooLong extends User {
        constructor(message?: string);
    }
    class UnsupportedMediaType extends User {
        constructor(message?: string);
    }
    class RangeNotSatisfiable extends User {
        constructor(message?: string);
    }
    class ExpectationFailed extends User {
        constructor(message?: string);
    }
    class Teapot extends User {
        constructor(message?: string);
    }
    class MisdirectedRequest extends User {
        constructor(message?: string);
    }
    class UnprocessableContent extends User {
        constructor(message?: string);
    }
    class Locked extends User {
        constructor(message?: string);
    }
    class FailedDependency extends User {
        constructor(message?: string);
    }
    class TooEarly extends User {
        constructor(message?: string);
    }
    class UpgradeRequired extends User {
        constructor(message?: string);
    }
    class PreconditionRequired extends User {
        constructor(message?: string);
    }
    class TooManyRequests extends User {
        constructor(message?: string);
    }
    class RequestHeaderFieldsTooLarge extends User {
        constructor(message?: string);
    }
    class UnavailableForLegalReasons extends User {
        constructor(message?: string);
    }
}
