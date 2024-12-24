/**
 * A set of semantic errors.
 */
export namespace Error {

    export const Original = globalThis.Error;

    export class Named extends Original {

        public constructor(message?: string, options?: ErrorOptions) {
            super(message, options);
            this.name = `${this.constructor.name} Error`;
        }

    }

    /**
     * For when something goes very wrong.
     */
    export class Fatal extends Named {

        public constructor(message?: string) {
            super(message);
        }

    }

    /**
     * For use for features that haven't been implemented yet.
     */
    export class Unimplemented extends Fatal {

        public constructor() {
            super("This feature has not been implemented.");
        }

    }

    /**
     * Thrown when a Data.assertion is failed.
     */
    export class Assertion extends Named {

        public constructor(message?: string) {
            super(message);
        }

    }

    /**
     * For use to indicate networks errors whilst using the HTTP protocol.
     */
    export class Http extends Named {

        public readonly code: number;

        public constructor(code: number, message?: string) {
            super(message);
            this.name = `${this.name} (HTTP Status Code ${code})`;
            this.code = code;
        }

        public static getFromResponse(response: { status: number, statusText: string }) {
            switch (response.status) {
                // Server
                case 500: return new InternalServerError(response.statusText);
                case 501: return new NotImplemented(response.statusText);
                case 502: return new BadGateway(response.statusText);
                case 503: return new ServiceUnavailable(response.statusText);
                case 504: return new GatewayTimeout(response.statusText);
                case 505: return new VersionNotSupported(response.statusText);
                case 506: return new VariantAlsoNegotiates(response.statusText);
                case 507: return new InsufficientStorage(response.statusText);
                case 508: return new LoopDetected(response.statusText);
                case 510: return new NotExtended(response.statusText);
                case 511: return new NetworkAuthenticationRequired(response.statusText);
                // Client
                case 400: return new BadRequest(response.statusText);
                case 401: return new Unauthorized(response.statusText);
                case 402: return new PaymentRequired(response.statusText);
                case 403: return new Forbidden(response.statusText);
                case 404: return new NotFound(response.statusText);
                case 405: return new MethodNotAllowed(response.statusText);
                case 406: return new NotAcceptable(response.statusText);
                case 407: return new ProxyAuthenticationRequired(response.statusText);
                case 408: return new RequestTimeout(response.statusText);
                case 409: return new Conflict(response.statusText);
                case 410: return new Gone(response.statusText);
                case 411: return new LengthRequired(response.statusText);
                case 412: return new PreconditionFailed(response.statusText);
                case 413: return new PayloadTooLarge(response.statusText);
                case 414: return new UriTooLong(response.statusText);
                case 415: return new UnsupportedMediaType(response.statusText);
                case 416: return new RangeNotSatisfiable(response.statusText);
                case 417: return new ExpectationFailed(response.statusText);
                case 418: return new Teapot(response.statusText);
                case 421: return new MisdirectedRequest(response.statusText);
                case 422: return new UnprocessableContent(response.statusText);
                case 423: return new Locked(response.statusText);
                case 424: return new FailedDependency(response.statusText);
                case 425: return new TooEarly(response.statusText);
                case 426: return new UpgradeRequired(response.statusText);
                case 428: return new PreconditionRequired(response.statusText);
                case 429: return new TooManyRequests(response.statusText);
                case 431: return new RequestHeaderFieldsTooLarge(response.statusText);
                case 451: return new UnavailableForLegalReasons(response.statusText);
                default: return new Fatal(`Error ${response.status}. ${response.statusText}`);
            }
        }

    }

    /**
     * For use to indicate the server made a mistake over the HTTP protocol.
     */
    export class Server extends Http { public constructor(message?: string, code: number = 500) { super(code, message); } }
    export class InternalServerError extends Server { public constructor(message?: string) { super(message, 500); } }
    export class NotImplemented extends Server { public constructor(message?: string) { super(message, 501); } }
    export class BadGateway extends Server { public constructor(message?: string) { super(message, 502); } }
    export class ServiceUnavailable extends Server { public constructor(message?: string) { super(message, 503); } }
    export class GatewayTimeout extends Server { public constructor(message?: string) { super(message, 504); } }
    export class VersionNotSupported extends Server { public constructor(message?: string) { super(message, 505); } }
    export class VariantAlsoNegotiates extends Server { public constructor(message?: string) { super(message, 506); } }
    export class InsufficientStorage extends Server { public constructor(message?: string) { super(message, 507); } }
    export class LoopDetected extends Server { public constructor(message?: string) { super(message, 508); } }
    export class NotExtended extends Server { public constructor(message?: string) { super(message, 510); } }
    export class NetworkAuthenticationRequired extends Server { public constructor(message?: string) { super(message, 511); } }

    /**
     * For use to indicate the user made a mistake over the HTTP protocol.
     */
    export class User extends Http { public constructor(message?: string, code: number = 400) { super(code, message); } }

    export class BadRequest extends User { public constructor(message?: string) { super(message, 400); } }
    export class Unauthorized extends User { public constructor(message?: string) { super(message, 401); } }
    export class PaymentRequired extends User { public constructor(message?: string) { super(message, 402); } }
    export class Forbidden extends User { public constructor(message?: string) { super(message, 403); } }
    export class NotFound extends User { public constructor(message?: string) { super(message, 404); } }
    export class MethodNotAllowed extends User { public constructor(message?: string) { super(message, 405); } }
    export class NotAcceptable extends User { public constructor(message?: string) { super(message, 406); } }
    export class ProxyAuthenticationRequired extends User { public constructor(message?: string) { super(message, 407); } }
    export class RequestTimeout extends User { public constructor(message?: string) { super(message, 408); } }
    export class Conflict extends User { public constructor(message?: string) { super(message, 409); } }
    export class Gone extends User { public constructor(message?: string) { super(message, 410); } }
    export class LengthRequired extends User { public constructor(message?: string) { super(message, 411); } }
    export class PreconditionFailed extends User { public constructor(message?: string) { super(message, 412); } }
    export class PayloadTooLarge extends User { public constructor(message?: string) { super(message, 413); } }
    export class UriTooLong extends User { public constructor(message?: string) { super(message, 414); } }
    export class UnsupportedMediaType extends User { public constructor(message?: string) { super(message, 415); } }
    export class RangeNotSatisfiable extends User { public constructor(message?: string) { super(message, 416); } }
    export class ExpectationFailed extends User { public constructor(message?: string) { super(message, 417); } }
    export class Teapot extends User { public constructor(message?: string) { super(message, 418); } }
    export class MisdirectedRequest extends User { public constructor(message?: string) { super(message, 421); } }
    export class UnprocessableContent extends User { public constructor(message?: string) { super(message, 422); } }
    export class Locked extends User { public constructor(message?: string) { super(message, 423); } }
    export class FailedDependency extends User { public constructor(message?: string) { super(message, 424); } }
    export class TooEarly extends User { public constructor(message?: string) { super(message, 425); } }
    export class UpgradeRequired extends User { public constructor(message?: string) { super(message, 426); } }
    export class PreconditionRequired extends User { public constructor(message?: string) { super(message, 428); } }
    export class TooManyRequests extends User { public constructor(message?: string) { super(message, 429); } }
    export class RequestHeaderFieldsTooLarge extends User { public constructor(message?: string) { super(message, 431); } }
    export class UnavailableForLegalReasons extends User { public constructor(message?: string) { super(message, 451); } }

}