(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SharedToolbox = {}));
})(this, (function (exports) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var Clock = /*#__PURE__*/function () {
    function Clock() {
      _classCallCheck(this, Clock);
      _defineProperty(this, "_creationTime", void 0);
      _defineProperty(this, "_lastTimeCheck", void 0);
      _defineProperty(this, "_timers", void 0);
      this._creationTime = this.now;
      this._lastTimeCheck = this._creationTime;
      this._timers = {};
    }
    _createClass(Clock, [{
      key: "now",
      get: function get() {
        return performance.now() / 1000;
      }
    }, {
      key: "deltaTime",
      get: function get() {
        var deltaTime = this.now - this._lastTimeCheck;
        this._lastTimeCheck = this.now;
        return deltaTime;
      }
    }, {
      key: "age",
      get: function get() {
        return this.now - this._creationTime;
      }
      /**
       * Creates a timer that can be queried for completion with {@link hasTimerElapsed}.
       * @param label The identifier for this timer.
       * @param duration The duration of the timer in seconds.
       * @param callback An optional callback to execute when the timer completes.
       */
    }, {
      key: "createTimer",
      value: function createTimer(label, duration, callback) {
        this._timers[label] = {
          duration: duration,
          lastTriggerTime: this.now
        };
        if (callback !== undefined) {
          setTimeout(function () {
            return callback(label, duration);
          }, duration);
        }
      }
    }, {
      key: "removeTimer",
      value: function removeTimer(label) {
        delete this._timers[label];
      }
    }, {
      key: "hasTimerElapsed",
      value: function hasTimerElapsed(label) {
        if (label in this._timers) {
          var timer = this._timers[label];
          if (this.now - timer.lastTriggerTime > timer.duration) {
            timer.lastTriggerTime = this.now;
            return true;
          }
          return false;
        } else {
          throw new Error("No timer exists with label ".concat(label, ". Make sure to create one first with Clock.createTimer()."));
        }
      }
    }]);
    return Clock;
  }();

  var Color = /*#__PURE__*/function () {
    function Color(hex) {
      _classCallCheck(this, Color);
      _defineProperty(this, "_hex", void 0);
      _defineProperty(this, "_rgba", void 0);
      this._hex = hex;
      this._rgba = Color._getRgba(hex);
    }
    _createClass(Color, [{
      key: "rgba",
      get: function get() {
        return this._rgba;
      }
    }, {
      key: "hex",
      get: function get() {
        return Number(this._hex);
      },
      set: function set(value) {
        this._hex = BigInt(value);
        this._rgba = Color._getRgba(this._hex);
      }
    }, {
      key: "red",
      get: function get() {
        return this.rgba[0];
      }
    }, {
      key: "green",
      get: function get() {
        return this.rgba[1];
      }
    }, {
      key: "blue",
      get: function get() {
        return this.rgba[2];
      }
    }, {
      key: "alpha",
      get: function get() {
        return this.rgba[3];
      }
    }, {
      key: "clone",
      value: function clone() {
        return new Color(this._hex);
      }
      /**
       * Mixes two colors together.
       * @param source The source of the color to mix.
       * @param weight The normalized weight from 0 to 1 of the mixture. 0 will result in all this color, 1 will result in all of the color defined by "source". Defaults to 0.5.
       */
    }, {
      key: "mix",
      value: function mix(source) {
        var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
        var color = Color.from(source);
        this._rgba = [this.red + (color.red - this.red) * weight, this.green + (color.green - this.green) * weight, this.blue + (color.blue - this.blue) * weight, this.alpha + (color.alpha - this.alpha) * weight];
      }
    }], [{
      key: "getRgba",
      value: function getRgba(hex) {
        return Color._getRgba(BigInt(hex));
      }
    }, {
      key: "getHex",
      value: function getHex(rgba) {
        return Number(Color._getHex(rgba));
      }
    }, {
      key: "_getRgba",
      value: function _getRgba(hex) {
        return [Number(hex >> 8n * 3n & 0xffn), Number(hex >> 8n * 2n & 0xffn), Number(hex >> 8n * 1n & 0xffn), Number(hex >> 8n * 0n & 0xffn)];
      }
    }, {
      key: "_getHex",
      value: function _getHex(rgba) {
        return BigInt(rgba[0]) << 8n * 3n | BigInt(rgba[1]) << 8n * 2n | BigInt(rgba[2]) << 8n * 1n | BigInt(rgba[3]) << 8n * 0n;
      }
    }, {
      key: "from",
      value: function from(source) {
        if (source instanceof Color) {
          return source.clone();
        } else if (typeof source === "number") {
          return new Color(BigInt(source));
        } else {
          return new Color(Color._getHex(source));
        }
      }
    }]);
    return Color;
  }();
  _defineProperty(Color, "BLACK", Color.from(0x000000FF));
  _defineProperty(Color, "WHITE", Color.from(0xFFFFFFFF));
  _defineProperty(Color, "GRAY", Color.from(0x808080FF));
  _defineProperty(Color, "RED", Color.from(0xFF0000FF));
  _defineProperty(Color, "GREEN", Color.from(0x00FF00FF));
  _defineProperty(Color, "BLUE", Color.from(0x0000FFFF));
  _defineProperty(Color, "CYAN", Color.from(0x00FFFFFF));
  _defineProperty(Color, "MAGENTA", Color.from(0xFF00FFFF));
  _defineProperty(Color, "YELLOW", Color.from(0xFFFF00FF));

  /**
   * Used for printing to the console in Color! :D
   */
  exports.ConsoleColor = void 0;
  (function (ConsoleColor) {
    /**
     * Special formatting codes.
     */
    var Special;
    (function (Special) {
      Special.reset = "\x1b[0m";
      Special.bright = "\x1b[1m";
      Special.dim = "\x1b[2m";
      Special.underscore = "\x1b[4m";
      Special.blink = "\x1b[5m";
      Special.reverse = "\x1b[7m";
      Special.hidden = "\x1b[8m";
    })(Special = ConsoleColor.Special || (ConsoleColor.Special = {}));
    /**
     * Foreground color codes.
     */
    var Fore;
    (function (Fore) {
      Fore.black = "\x1b[30m";
      Fore.red = "\x1b[31m";
      Fore.green = "\x1b[32m";
      Fore.yellow = "\x1b[33m";
      Fore.blue = "\x1b[34m";
      Fore.magenta = "\x1b[35m";
      Fore.cyan = "\x1b[36m";
      Fore.white = "\x1b[37m";
      Fore.gray = "\x1b[90m";
    })(Fore = ConsoleColor.Fore || (ConsoleColor.Fore = {}));
    (function (Back) {
      Back.black = "\x1b[40m";
      Back.red = "\x1b[41m";
      Back.green = "\x1b[42m";
      Back.yellow = "\x1b[43m";
      Back.blue = "\x1b[44m";
      Back.magenta = "\x1b[45m";
      Back.cyan = "\x1b[46m";
      Back.white = "\x1b[47m";
      Back.gray = "\x1b[100m";
    })(ConsoleColor.Back || (ConsoleColor.Back = {}));
    /**
     * A combination of Foreground and Special formatting codes so you don't have to destructure both.
     *
     * `E.G.`
     *
     * ```typescript
     * const { red, reset } = ConsoleColor.Common;
     * console.log(`I like the color ${red}red${reset}.`);
     * ```
     */
    ConsoleColor.Common = _objectSpread2(_objectSpread2({}, Fore), Special);
  })(exports.ConsoleColor || (exports.ConsoleColor = {}));

  /**
   * A set of semantic errors.
   */
  exports.Error = void 0;
  (function (Error) {
    Error.Original = globalThis.Error;
    var Named = /*#__PURE__*/function (_Error$Original) {
      _inherits(Named, _Error$Original);
      var _super = _createSuper(Named);
      function Named(message, options) {
        var _this;
        _classCallCheck(this, Named);
        _this = _super.call(this, message, options);
        _this.name = "".concat(_this.constructor.name, " Error");
        return _this;
      }
      return _createClass(Named);
    }(Error.Original);
    Error.Named = Named;
    /**
     * For when something goes very wrong.
     */
    var Fatal = /*#__PURE__*/function (_Named) {
      _inherits(Fatal, _Named);
      var _super2 = _createSuper(Fatal);
      function Fatal(message) {
        _classCallCheck(this, Fatal);
        return _super2.call(this, message);
      }
      return _createClass(Fatal);
    }(Named);
    Error.Fatal = Fatal;
    /**
     * For use for features that haven't been implemented yet.
     */
    var Unimplemented = /*#__PURE__*/function (_Fatal) {
      _inherits(Unimplemented, _Fatal);
      var _super3 = _createSuper(Unimplemented);
      function Unimplemented() {
        _classCallCheck(this, Unimplemented);
        return _super3.call(this, "This feature has not been implemented.");
      }
      return _createClass(Unimplemented);
    }(Fatal);
    Error.Unimplemented = Unimplemented;
    /**
     * Thrown when a Data.assertion is failed.
     */
    var Assertion = /*#__PURE__*/function (_Named2) {
      _inherits(Assertion, _Named2);
      var _super4 = _createSuper(Assertion);
      function Assertion(message) {
        _classCallCheck(this, Assertion);
        return _super4.call(this, message);
      }
      return _createClass(Assertion);
    }(Named);
    Error.Assertion = Assertion;
    /**
     * For use to indicate networks errors whilst using the HTTP protocol.
     */
    var Http = /*#__PURE__*/function (_Named3) {
      _inherits(Http, _Named3);
      var _super5 = _createSuper(Http);
      function Http(code, message) {
        var _this2;
        _classCallCheck(this, Http);
        _this2 = _super5.call(this, message);
        _defineProperty(_assertThisInitialized(_this2), "code", void 0);
        _this2.name = "".concat(_this2.name, " (HTTP Status Code ").concat(code, ")");
        _this2.code = code;
        return _this2;
      }
      _createClass(Http, null, [{
        key: "getFromResponse",
        value: function getFromResponse(response) {
          switch (response.status) {
            // Server
            case 500:
              return new InternalServerError(response.statusText);
            case 501:
              return new NotImplemented(response.statusText);
            case 502:
              return new BadGateway(response.statusText);
            case 503:
              return new ServiceUnavailable(response.statusText);
            case 504:
              return new GatewayTimeout(response.statusText);
            case 505:
              return new VersionNotSupported(response.statusText);
            case 506:
              return new VariantAlsoNegotiates(response.statusText);
            case 507:
              return new InsufficientStorage(response.statusText);
            case 508:
              return new LoopDetected(response.statusText);
            case 510:
              return new NotExtended(response.statusText);
            case 511:
              return new NetworkAuthenticationRequired(response.statusText);
            // Client
            case 400:
              return new BadRequest(response.statusText);
            case 401:
              return new Unauthorized(response.statusText);
            case 402:
              return new PaymentRequired(response.statusText);
            case 403:
              return new Forbidden(response.statusText);
            case 404:
              return new NotFound(response.statusText);
            case 405:
              return new MethodNotAllowed(response.statusText);
            case 406:
              return new NotAcceptable(response.statusText);
            case 407:
              return new ProxyAuthenticationRequired(response.statusText);
            case 408:
              return new RequestTimeout(response.statusText);
            case 409:
              return new Conflict(response.statusText);
            case 410:
              return new Gone(response.statusText);
            case 411:
              return new LengthRequired(response.statusText);
            case 412:
              return new PreconditionFailed(response.statusText);
            case 413:
              return new PayloadTooLarge(response.statusText);
            case 414:
              return new UriTooLong(response.statusText);
            case 415:
              return new UnsupportedMediaType(response.statusText);
            case 416:
              return new RangeNotSatisfiable(response.statusText);
            case 417:
              return new ExpectationFailed(response.statusText);
            case 418:
              return new Teapot(response.statusText);
            case 421:
              return new MisdirectedRequest(response.statusText);
            case 422:
              return new UnprocessableContent(response.statusText);
            case 423:
              return new Locked(response.statusText);
            case 424:
              return new FailedDependency(response.statusText);
            case 425:
              return new TooEarly(response.statusText);
            case 426:
              return new UpgradeRequired(response.statusText);
            case 428:
              return new PreconditionRequired(response.statusText);
            case 429:
              return new TooManyRequests(response.statusText);
            case 431:
              return new RequestHeaderFieldsTooLarge(response.statusText);
            case 451:
              return new UnavailableForLegalReasons(response.statusText);
            default:
              new Fatal("Error ".concat(response.status, ". ").concat(response.statusText));
          }
        }
      }]);
      return Http;
    }(Named);
    Error.Http = Http;
    /**
     * For use to indicate the server made a mistake over the HTTP protocol.
     */
    var Server = /*#__PURE__*/function (_Http) {
      _inherits(Server, _Http);
      var _super6 = _createSuper(Server);
      function Server(message) {
        var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
        _classCallCheck(this, Server);
        return _super6.call(this, code, message);
      }
      return _createClass(Server);
    }(Http);
    Error.Server = Server;
    var InternalServerError = /*#__PURE__*/function (_Server) {
      _inherits(InternalServerError, _Server);
      var _super7 = _createSuper(InternalServerError);
      function InternalServerError(message) {
        _classCallCheck(this, InternalServerError);
        return _super7.call(this, message, 500);
      }
      return _createClass(InternalServerError);
    }(Server);
    Error.InternalServerError = InternalServerError;
    var NotImplemented = /*#__PURE__*/function (_Server2) {
      _inherits(NotImplemented, _Server2);
      var _super8 = _createSuper(NotImplemented);
      function NotImplemented(message) {
        _classCallCheck(this, NotImplemented);
        return _super8.call(this, message, 501);
      }
      return _createClass(NotImplemented);
    }(Server);
    Error.NotImplemented = NotImplemented;
    var BadGateway = /*#__PURE__*/function (_Server3) {
      _inherits(BadGateway, _Server3);
      var _super9 = _createSuper(BadGateway);
      function BadGateway(message) {
        _classCallCheck(this, BadGateway);
        return _super9.call(this, message, 502);
      }
      return _createClass(BadGateway);
    }(Server);
    Error.BadGateway = BadGateway;
    var ServiceUnavailable = /*#__PURE__*/function (_Server4) {
      _inherits(ServiceUnavailable, _Server4);
      var _super10 = _createSuper(ServiceUnavailable);
      function ServiceUnavailable(message) {
        _classCallCheck(this, ServiceUnavailable);
        return _super10.call(this, message, 503);
      }
      return _createClass(ServiceUnavailable);
    }(Server);
    Error.ServiceUnavailable = ServiceUnavailable;
    var GatewayTimeout = /*#__PURE__*/function (_Server5) {
      _inherits(GatewayTimeout, _Server5);
      var _super11 = _createSuper(GatewayTimeout);
      function GatewayTimeout(message) {
        _classCallCheck(this, GatewayTimeout);
        return _super11.call(this, message, 504);
      }
      return _createClass(GatewayTimeout);
    }(Server);
    Error.GatewayTimeout = GatewayTimeout;
    var VersionNotSupported = /*#__PURE__*/function (_Server6) {
      _inherits(VersionNotSupported, _Server6);
      var _super12 = _createSuper(VersionNotSupported);
      function VersionNotSupported(message) {
        _classCallCheck(this, VersionNotSupported);
        return _super12.call(this, message, 505);
      }
      return _createClass(VersionNotSupported);
    }(Server);
    Error.VersionNotSupported = VersionNotSupported;
    var VariantAlsoNegotiates = /*#__PURE__*/function (_Server7) {
      _inherits(VariantAlsoNegotiates, _Server7);
      var _super13 = _createSuper(VariantAlsoNegotiates);
      function VariantAlsoNegotiates(message) {
        _classCallCheck(this, VariantAlsoNegotiates);
        return _super13.call(this, message, 506);
      }
      return _createClass(VariantAlsoNegotiates);
    }(Server);
    Error.VariantAlsoNegotiates = VariantAlsoNegotiates;
    var InsufficientStorage = /*#__PURE__*/function (_Server8) {
      _inherits(InsufficientStorage, _Server8);
      var _super14 = _createSuper(InsufficientStorage);
      function InsufficientStorage(message) {
        _classCallCheck(this, InsufficientStorage);
        return _super14.call(this, message, 507);
      }
      return _createClass(InsufficientStorage);
    }(Server);
    Error.InsufficientStorage = InsufficientStorage;
    var LoopDetected = /*#__PURE__*/function (_Server9) {
      _inherits(LoopDetected, _Server9);
      var _super15 = _createSuper(LoopDetected);
      function LoopDetected(message) {
        _classCallCheck(this, LoopDetected);
        return _super15.call(this, message, 508);
      }
      return _createClass(LoopDetected);
    }(Server);
    Error.LoopDetected = LoopDetected;
    var NotExtended = /*#__PURE__*/function (_Server10) {
      _inherits(NotExtended, _Server10);
      var _super16 = _createSuper(NotExtended);
      function NotExtended(message) {
        _classCallCheck(this, NotExtended);
        return _super16.call(this, message, 510);
      }
      return _createClass(NotExtended);
    }(Server);
    Error.NotExtended = NotExtended;
    var NetworkAuthenticationRequired = /*#__PURE__*/function (_Server11) {
      _inherits(NetworkAuthenticationRequired, _Server11);
      var _super17 = _createSuper(NetworkAuthenticationRequired);
      function NetworkAuthenticationRequired(message) {
        _classCallCheck(this, NetworkAuthenticationRequired);
        return _super17.call(this, message, 511);
      }
      return _createClass(NetworkAuthenticationRequired);
    }(Server);
    Error.NetworkAuthenticationRequired = NetworkAuthenticationRequired;
    /**
     * For use to indicate the user made a mistake over the HTTP protocol.
     */
    var User = /*#__PURE__*/function (_Http2) {
      _inherits(User, _Http2);
      var _super18 = _createSuper(User);
      function User(message) {
        var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
        _classCallCheck(this, User);
        return _super18.call(this, code, message);
      }
      return _createClass(User);
    }(Http);
    Error.User = User;
    var BadRequest = /*#__PURE__*/function (_User) {
      _inherits(BadRequest, _User);
      var _super19 = _createSuper(BadRequest);
      function BadRequest(message) {
        _classCallCheck(this, BadRequest);
        return _super19.call(this, message, 400);
      }
      return _createClass(BadRequest);
    }(User);
    Error.BadRequest = BadRequest;
    var Unauthorized = /*#__PURE__*/function (_User2) {
      _inherits(Unauthorized, _User2);
      var _super20 = _createSuper(Unauthorized);
      function Unauthorized(message) {
        _classCallCheck(this, Unauthorized);
        return _super20.call(this, message, 401);
      }
      return _createClass(Unauthorized);
    }(User);
    Error.Unauthorized = Unauthorized;
    var PaymentRequired = /*#__PURE__*/function (_User3) {
      _inherits(PaymentRequired, _User3);
      var _super21 = _createSuper(PaymentRequired);
      function PaymentRequired(message) {
        _classCallCheck(this, PaymentRequired);
        return _super21.call(this, message, 402);
      }
      return _createClass(PaymentRequired);
    }(User);
    Error.PaymentRequired = PaymentRequired;
    var Forbidden = /*#__PURE__*/function (_User4) {
      _inherits(Forbidden, _User4);
      var _super22 = _createSuper(Forbidden);
      function Forbidden(message) {
        _classCallCheck(this, Forbidden);
        return _super22.call(this, message, 403);
      }
      return _createClass(Forbidden);
    }(User);
    Error.Forbidden = Forbidden;
    var NotFound = /*#__PURE__*/function (_User5) {
      _inherits(NotFound, _User5);
      var _super23 = _createSuper(NotFound);
      function NotFound(message) {
        _classCallCheck(this, NotFound);
        return _super23.call(this, message, 404);
      }
      return _createClass(NotFound);
    }(User);
    Error.NotFound = NotFound;
    var MethodNotAllowed = /*#__PURE__*/function (_User6) {
      _inherits(MethodNotAllowed, _User6);
      var _super24 = _createSuper(MethodNotAllowed);
      function MethodNotAllowed(message) {
        _classCallCheck(this, MethodNotAllowed);
        return _super24.call(this, message, 405);
      }
      return _createClass(MethodNotAllowed);
    }(User);
    Error.MethodNotAllowed = MethodNotAllowed;
    var NotAcceptable = /*#__PURE__*/function (_User7) {
      _inherits(NotAcceptable, _User7);
      var _super25 = _createSuper(NotAcceptable);
      function NotAcceptable(message) {
        _classCallCheck(this, NotAcceptable);
        return _super25.call(this, message, 406);
      }
      return _createClass(NotAcceptable);
    }(User);
    Error.NotAcceptable = NotAcceptable;
    var ProxyAuthenticationRequired = /*#__PURE__*/function (_User8) {
      _inherits(ProxyAuthenticationRequired, _User8);
      var _super26 = _createSuper(ProxyAuthenticationRequired);
      function ProxyAuthenticationRequired(message) {
        _classCallCheck(this, ProxyAuthenticationRequired);
        return _super26.call(this, message, 407);
      }
      return _createClass(ProxyAuthenticationRequired);
    }(User);
    Error.ProxyAuthenticationRequired = ProxyAuthenticationRequired;
    var RequestTimeout = /*#__PURE__*/function (_User9) {
      _inherits(RequestTimeout, _User9);
      var _super27 = _createSuper(RequestTimeout);
      function RequestTimeout(message) {
        _classCallCheck(this, RequestTimeout);
        return _super27.call(this, message, 408);
      }
      return _createClass(RequestTimeout);
    }(User);
    Error.RequestTimeout = RequestTimeout;
    var Conflict = /*#__PURE__*/function (_User10) {
      _inherits(Conflict, _User10);
      var _super28 = _createSuper(Conflict);
      function Conflict(message) {
        _classCallCheck(this, Conflict);
        return _super28.call(this, message, 409);
      }
      return _createClass(Conflict);
    }(User);
    Error.Conflict = Conflict;
    var Gone = /*#__PURE__*/function (_User11) {
      _inherits(Gone, _User11);
      var _super29 = _createSuper(Gone);
      function Gone(message) {
        _classCallCheck(this, Gone);
        return _super29.call(this, message, 410);
      }
      return _createClass(Gone);
    }(User);
    Error.Gone = Gone;
    var LengthRequired = /*#__PURE__*/function (_User12) {
      _inherits(LengthRequired, _User12);
      var _super30 = _createSuper(LengthRequired);
      function LengthRequired(message) {
        _classCallCheck(this, LengthRequired);
        return _super30.call(this, message, 411);
      }
      return _createClass(LengthRequired);
    }(User);
    Error.LengthRequired = LengthRequired;
    var PreconditionFailed = /*#__PURE__*/function (_User13) {
      _inherits(PreconditionFailed, _User13);
      var _super31 = _createSuper(PreconditionFailed);
      function PreconditionFailed(message) {
        _classCallCheck(this, PreconditionFailed);
        return _super31.call(this, message, 412);
      }
      return _createClass(PreconditionFailed);
    }(User);
    Error.PreconditionFailed = PreconditionFailed;
    var PayloadTooLarge = /*#__PURE__*/function (_User14) {
      _inherits(PayloadTooLarge, _User14);
      var _super32 = _createSuper(PayloadTooLarge);
      function PayloadTooLarge(message) {
        _classCallCheck(this, PayloadTooLarge);
        return _super32.call(this, message, 413);
      }
      return _createClass(PayloadTooLarge);
    }(User);
    Error.PayloadTooLarge = PayloadTooLarge;
    var UriTooLong = /*#__PURE__*/function (_User15) {
      _inherits(UriTooLong, _User15);
      var _super33 = _createSuper(UriTooLong);
      function UriTooLong(message) {
        _classCallCheck(this, UriTooLong);
        return _super33.call(this, message, 414);
      }
      return _createClass(UriTooLong);
    }(User);
    Error.UriTooLong = UriTooLong;
    var UnsupportedMediaType = /*#__PURE__*/function (_User16) {
      _inherits(UnsupportedMediaType, _User16);
      var _super34 = _createSuper(UnsupportedMediaType);
      function UnsupportedMediaType(message) {
        _classCallCheck(this, UnsupportedMediaType);
        return _super34.call(this, message, 415);
      }
      return _createClass(UnsupportedMediaType);
    }(User);
    Error.UnsupportedMediaType = UnsupportedMediaType;
    var RangeNotSatisfiable = /*#__PURE__*/function (_User17) {
      _inherits(RangeNotSatisfiable, _User17);
      var _super35 = _createSuper(RangeNotSatisfiable);
      function RangeNotSatisfiable(message) {
        _classCallCheck(this, RangeNotSatisfiable);
        return _super35.call(this, message, 416);
      }
      return _createClass(RangeNotSatisfiable);
    }(User);
    Error.RangeNotSatisfiable = RangeNotSatisfiable;
    var ExpectationFailed = /*#__PURE__*/function (_User18) {
      _inherits(ExpectationFailed, _User18);
      var _super36 = _createSuper(ExpectationFailed);
      function ExpectationFailed(message) {
        _classCallCheck(this, ExpectationFailed);
        return _super36.call(this, message, 417);
      }
      return _createClass(ExpectationFailed);
    }(User);
    Error.ExpectationFailed = ExpectationFailed;
    var Teapot = /*#__PURE__*/function (_User19) {
      _inherits(Teapot, _User19);
      var _super37 = _createSuper(Teapot);
      function Teapot(message) {
        _classCallCheck(this, Teapot);
        return _super37.call(this, message, 418);
      }
      return _createClass(Teapot);
    }(User);
    Error.Teapot = Teapot;
    var MisdirectedRequest = /*#__PURE__*/function (_User20) {
      _inherits(MisdirectedRequest, _User20);
      var _super38 = _createSuper(MisdirectedRequest);
      function MisdirectedRequest(message) {
        _classCallCheck(this, MisdirectedRequest);
        return _super38.call(this, message, 421);
      }
      return _createClass(MisdirectedRequest);
    }(User);
    Error.MisdirectedRequest = MisdirectedRequest;
    var UnprocessableContent = /*#__PURE__*/function (_User21) {
      _inherits(UnprocessableContent, _User21);
      var _super39 = _createSuper(UnprocessableContent);
      function UnprocessableContent(message) {
        _classCallCheck(this, UnprocessableContent);
        return _super39.call(this, message, 422);
      }
      return _createClass(UnprocessableContent);
    }(User);
    Error.UnprocessableContent = UnprocessableContent;
    var Locked = /*#__PURE__*/function (_User22) {
      _inherits(Locked, _User22);
      var _super40 = _createSuper(Locked);
      function Locked(message) {
        _classCallCheck(this, Locked);
        return _super40.call(this, message, 423);
      }
      return _createClass(Locked);
    }(User);
    Error.Locked = Locked;
    var FailedDependency = /*#__PURE__*/function (_User23) {
      _inherits(FailedDependency, _User23);
      var _super41 = _createSuper(FailedDependency);
      function FailedDependency(message) {
        _classCallCheck(this, FailedDependency);
        return _super41.call(this, message, 424);
      }
      return _createClass(FailedDependency);
    }(User);
    Error.FailedDependency = FailedDependency;
    var TooEarly = /*#__PURE__*/function (_User24) {
      _inherits(TooEarly, _User24);
      var _super42 = _createSuper(TooEarly);
      function TooEarly(message) {
        _classCallCheck(this, TooEarly);
        return _super42.call(this, message, 425);
      }
      return _createClass(TooEarly);
    }(User);
    Error.TooEarly = TooEarly;
    var UpgradeRequired = /*#__PURE__*/function (_User25) {
      _inherits(UpgradeRequired, _User25);
      var _super43 = _createSuper(UpgradeRequired);
      function UpgradeRequired(message) {
        _classCallCheck(this, UpgradeRequired);
        return _super43.call(this, message, 426);
      }
      return _createClass(UpgradeRequired);
    }(User);
    Error.UpgradeRequired = UpgradeRequired;
    var PreconditionRequired = /*#__PURE__*/function (_User26) {
      _inherits(PreconditionRequired, _User26);
      var _super44 = _createSuper(PreconditionRequired);
      function PreconditionRequired(message) {
        _classCallCheck(this, PreconditionRequired);
        return _super44.call(this, message, 428);
      }
      return _createClass(PreconditionRequired);
    }(User);
    Error.PreconditionRequired = PreconditionRequired;
    var TooManyRequests = /*#__PURE__*/function (_User27) {
      _inherits(TooManyRequests, _User27);
      var _super45 = _createSuper(TooManyRequests);
      function TooManyRequests(message) {
        _classCallCheck(this, TooManyRequests);
        return _super45.call(this, message, 429);
      }
      return _createClass(TooManyRequests);
    }(User);
    Error.TooManyRequests = TooManyRequests;
    var RequestHeaderFieldsTooLarge = /*#__PURE__*/function (_User28) {
      _inherits(RequestHeaderFieldsTooLarge, _User28);
      var _super46 = _createSuper(RequestHeaderFieldsTooLarge);
      function RequestHeaderFieldsTooLarge(message) {
        _classCallCheck(this, RequestHeaderFieldsTooLarge);
        return _super46.call(this, message, 431);
      }
      return _createClass(RequestHeaderFieldsTooLarge);
    }(User);
    Error.RequestHeaderFieldsTooLarge = RequestHeaderFieldsTooLarge;
    var UnavailableForLegalReasons = /*#__PURE__*/function (_User29) {
      _inherits(UnavailableForLegalReasons, _User29);
      var _super47 = _createSuper(UnavailableForLegalReasons);
      function UnavailableForLegalReasons(message) {
        _classCallCheck(this, UnavailableForLegalReasons);
        return _super47.call(this, message, 451);
      }
      return _createClass(UnavailableForLegalReasons);
    }(User);
    Error.UnavailableForLegalReasons = UnavailableForLegalReasons;
  })(exports.Error || (exports.Error = {}));

  /**
   * A data manipulation module primarily used for reading and altering objects.
   */
  exports.Data = void 0;
  (function (Data) {
    /**
     * Checks to see if a given {@link target} object has a given {@link path}.
     * @param target The target object.
     * @param path The path to check the existence of.
     * @returns True if {@link target} has {@link path}.
     */
    function has(target, path) {
      var pieces = path === "" ? [] : path.split(".");
      var key = pieces.shift();
      if (key === undefined) {
        return target !== undefined && target !== null;
      } else {
        if (_typeof(target) === "object" && target !== null && key in target) {
          return has(target[key], pieces.join("."));
        } else {
          return false;
        }
      }
    }
    Data.has = has;
    function get(target, path, fallback) {
      var pieces = path === "" ? [] : path.split(".");
      var key = pieces.shift();
      if (key === undefined) {
        if (target === undefined || target === null) {
          return fallback;
        } else {
          return target;
        }
      } else {
        if (_typeof(target) === "object" && target !== null && key in target) {
          return Data.get(target[key], pieces.join("."), fallback);
        } else {
          return fallback;
        }
      }
    }
    Data.get = get;
    /**
     * Finds a retrieves a value at {@link path} in {@link target} or throws and error if the value fails validation by {@link validator}.
     * @param target The target object.
     * @param path The path to retrieve a value from.
     * @param validator A predicate to validate the value found at {@link path}.
     * @returns The value found at {@link path} in {@link target}.
     */
    function getOrThrow(target, path) {
      var value = Data.get(target, path, undefined);
      if (value === undefined) {
        throw new exports.Error.Original("Failed to get value at \"".concat(path, "\" in target."), {
          cause: {
            target: target,
            path: path
          }
        });
      }
      return value;
    }
    Data.getOrThrow = getOrThrow;
    /**
     * Sets a {@link value} in a {@link target} object at {@link pieces}.
     * @param target The target object.
     * @param pieces The path to set {@link value} at.
     * @param value The value to be set.
     * @returns True if the target is updated, false otherwise.
     */
    function set(target, path, value) {
      var pieces = path === "" ? [] : path.split(".");
      var key = pieces.shift();
      if (key !== undefined) {
        if (pieces.length === 0) {
          target[key] = value;
        } else {
          if (_typeof(target[key]) !== "object" && target[key] !== null) {
            target[key] = pieces.length > 0 && !isNaN(parseInt(pieces[0].toString())) ? [] : {};
          }
          Data.set(target[key], pieces.join("."), value);
        }
      }
    }
    Data.set = set;
    /**
     * Removes a value at {@link pieces} in {@link target}.
     * @param target The target object.
     * @param pieces The path of the value to remove from {@link target}.
     * @returns The removed value or undefined if the value couldn't be found.
     */
    function remove(target, path) {
      var pieces = path === "" ? [] : path.split(".");
      var key = pieces.shift();
      if (key !== undefined) {
        if (pieces.length === 0) {
          var deleted = target[key];
          delete target[key];
          return deleted;
        } else if (key in target) {
          return Data.remove(target[key], pieces.join("."));
        }
      }
      return undefined;
    }
    Data.remove = remove;
    /**
     * Creates a copy of {@link target}.
     * @param target The target object to clone.
     * @param deep True to perform a deep copy, false to perform a shallow copy.
     * @returns A copy of {@link target}.
     */
    function clone(target) {
      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (deep) {
        var objectClone = Array.isArray(target) ? [] : {};
        Data.walk(target, function (_, property, path) {
          if (_typeof(property) !== "object") {
            Data.set(objectClone, path, property);
          } else if (property === null) {
            Data.set(objectClone, path, null);
          } else if (Object.keys(property).length === 0) {
            Data.set(objectClone, path, Array.isArray(property) ? [] : {});
          }
          return false;
        });
        return objectClone;
      } else {
        return _objectSpread2({}, target);
      }
    }
    Data.clone = clone;
    /**
     * Walks across the nested properties of {@link target} and calls {@link callback} for every property.
     * @param target The target object.
     * @param callback The callback to be executed for every nested property in {@link target}.
     * @param path The path to start walking in {@link target}.
     * @param level The level of nesting from the starting path in {@link target}.
     */
    function walk(target, callback) {
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      for (var key in target) {
        var value = target[key];
        var valuePath = path === "" ? key : path + "." + key;
        var finished = callback(target, value, valuePath, level);
        if (!finished && _typeof(value) === "object" && value !== null) {
          Data.walk(value, callback, valuePath, level + 1);
        }
      }
    }
    Data.walk = walk;
    /**
     * Flattens an object's nested hierarchy.
     * I.E. { name: { first: "Jeremy", last: "Bankes" } } -> { "name.first": "Jeremy", "name.last": "Bankes" }
     *
     * @param target The target object
     * @returns A flattened version of {@link target} without any nesting.
     */
    function flatten(target) {
      var flattenedTarget = {};
      Data.walk(target, function (_, property, path) {
        if (!isPlain(property)) {
          flattenedTarget[path] = property;
          return true;
        }
        return false;
      });
      return flattenedTarget;
    }
    Data.flatten = flatten;
    /**
     * Converts a flattened object back into an object with a nested hierarchy.
     * @param target
     * @returns a hierarchized version of {@link target} with a nested hierarchy.
     */
    function hierarchize(target) {
      var object = {};
      for (var key in target) {
        Data.set(object, key, target[key]);
      }
      return object;
    }
    Data.hierarchize = hierarchize;
    function isPlainObject(target) {
      return _typeof(target) === "object" && target !== null && target.constructor.name === "Object";
    }
    Data.isPlainObject = isPlainObject;
    function isPlainArray(target) {
      return Array.isArray(target);
    }
    Data.isPlainArray = isPlainArray;
    /**
     * Tests to see if a given object is POD (Plain old data).
     * @param target The object to test.
     * @param deep True to traverse the entire object (deep), false to check just the first layer (shallow).
     */
    function isPlain(target) {
      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var object = Data.isPlainObject(target);
      var array = Data.isPlainArray(target);
      if (object || array) {
        if (deep) {
          for (var key in target) {
            if (!isPlain(target[key], true)) {
              return false;
            }
          }
          return true;
        } else {
          return true;
        }
      } else {
        if (typeof target === "string" || typeof target === "number" || typeof target === "boolean" || typeof target === "undefined" || typeof target === "bigint" || target === null) {
          return true;
        }
        if (target instanceof Date) {
          return true;
        }
        return false;
      }
    }
    Data.isPlain = isPlain;
    /**
     * Used to optionally include {@link value}'s properties when defining an inline object.
     * @param condition The condition to be checked.
     * @param value The object with properties to include in an inline object definition if {@link condition} is met.
     * @returns The given {@link value} if {@link condition} is met, an empty array otherwise.
     */
    function conditional(condition, value) {
      if (condition) {
        return value;
      } else {
        if (Array.isArray(value)) {
          return [];
        } else {
          return {};
        }
      }
    }
    Data.conditional = conditional;
    /**
     * Compares two objects for deep equality.
     * @param object1 The first object to compare.
     * @param object2 The second object to compare.
     * @returns true if all of the nested properties of object1 are equal to that of object2.
     */
    function deepEquals(object1, object2) {
      if (_typeof(object1) === "object" && _typeof(object2) === "object") {
        if (object1 === null || object2 === null) {
          return object1 === object2;
        }
        var object1Keys = Object.keys(object1);
        var object2Keys = Object.keys(object2);
        if (object1Keys.length !== object2Keys.length) {
          return false;
        }
        for (var _i = 0, _object1Keys = object1Keys; _i < _object1Keys.length; _i++) {
          var key = _object1Keys[_i];
          var value1 = object1[key];
          var value2 = object2[key];
          var areObjects = _typeof(value1) === "object" && value1 !== null && _typeof(value2) === "object" && value2 !== null;
          if (areObjects && !Data.deepEquals(value1, value2) || !areObjects && value1 !== value2) {
            return false;
          }
        }
        return true;
      } else {
        return object1 === object2;
      }
    }
    Data.deepEquals = deepEquals;
    function assert(condition) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Assertion failed.";
      if (!condition) {
        throw new exports.Error.Assertion(message);
      }
    }
    Data.assert = assert;
  })(exports.Data || (exports.Data = {}));

  exports.RegularExpression = void 0;
  (function (RegularExpression) {
    RegularExpression.email = /(^[\w\.]+)@((?:[\w-]+\.)+[\w-]{2,4}$)/i;
    RegularExpression.mimeType = /(?:application|audio|font|example|image|message|model|multipart|text|video)\/[a-z0-9+-.]+/i;
  })(exports.RegularExpression || (exports.RegularExpression = {}));

  /**
   * A String manipulation module used for formatting and interpreting text.
   */
  exports.Text = void 0;
  (function (Text) {
    /**
     * The default options for text manipulations and formatting
     */
    Text.defaults = {
      locale: "en-CA",
      dateFormat: {
        dateStyle: "long"
      },
      timeFormat: {
        timeStyle: "short"
      },
      currency: "CAD"
    };
    /**
     * Converts {@link string} to a url-slug. Note that this function treats camel casing as separate words. Convert {@link string} to lower case first to avoid this functionality.
     * @param string The text to turn into a slug
     * @returns a-slug-string
     */
    function slug(string) {
      string = string.replace(/[^a-z0-9]+/gi, "-");
      string = string.replace(/([a-z])([A-Z])/g, "$1-$2");
      string = string.replace(/^-|-$/g, "");
      return string.toLowerCase();
    }
    Text.slug = slug;
    /**
     * Converts {@link string} to camelCase.
     * @param string The text to turn into camel case.
     * @returns aCamelCaseString
     */
    function camel(string) {
      string = string.replace(/[^A-Za-z0-9]+/g, " ").trim().toLowerCase();
      string = string.split(/ /g).map(function (piece, index) {
        if (index > 0) {
          return piece.charAt(0).toUpperCase() + piece.substring(1);
        }
        return piece;
      }).join("");
      return string;
    }
    Text.camel = camel;
    /**
     * Converts string to Title Case
     * @param string The text to turn into title case.
     * @returns A Title Case String
     */
    function title(string) {
      return string.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (match) {
        return match.toUpperCase();
      });
    }
    Text.title = title;
    /**
     * Wraps 'string' in quotes.
     * @param string A string to wrap in quotes.
     * @param quote The quote string.
     * @returns A string wrapped in quotes.
     */
    function quote(string) {
      var quote = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "\"";
      return quote + string + quote;
    }
    Text.quote = quote;
    /**
     * Removes the quotes from a given string.
     * @param string A string to remove the quotes from.
     * @param quote The quote string.
     * @returns `string` without quotes.
     */
    function unquote(string) {
      var quote = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "\"";
      if (string.startsWith(quote) && string.endsWith(quote)) {
        return string.substring(quote.length, string.length - quote.length);
      }
      return string;
    }
    Text.unquote = unquote;
    /**
     * Creates an English readable list from {@link values}.
     * @param values A list of values to make a pretty list out of.
     * @returns A list deliminated by commas with the word "and" separating the last element.
     */
    function list(values) {
      var lastDelimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " and ";
      var delimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ", ";
      if (values.length > 1) {
        var lastValue = values.pop();
        return values.join(delimiter) + lastDelimiter + lastValue;
      } else {
        return values.join(delimiter);
      }
    }
    Text.list = list;
    /**
     * Makes {@link singular} plural.
     * @param singular The singular word to make plural.
     * @param count The number of {@link singular}. Not 1 to pluralize.
     * @returns The plural of {@link singular}.
     */
    function plural(singular) {
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (count == 1) {
        return singular;
      }
      var plural = {
        "(quiz)$": "$1zes",
        "^(ox)$": "$1en",
        "([m|l])ouse$": "$1ice",
        "(matr|vert|ind)ix|ex$": "$1ices",
        "(x|ch|ss|sh)$": "$1es",
        "([^aeiouy]|qu)y$": "$1ies",
        "(hive)$": "$1s",
        "(?:([^f])fe|([lr])f)$": "$1$2ves",
        "(shea|lea|loa|thie)f$": "$1ves",
        "sis$": "ses",
        "([ti])um$": "$1a",
        "(tomat|potat|ech|her|vet)o$": "$1oes",
        "(bu)s$": "$1ses",
        "(alias)$": "$1es",
        "(octop)us$": "$1i",
        "(ax|test)is$": "$1es",
        "(us)$": "$1es",
        "([^s]+)$": "$1s"
      };
      var irregular = {
        "move": "moves",
        "foot": "feet",
        "goose": "geese",
        "sex": "sexes",
        "child": "children",
        "man": "men",
        "tooth": "teeth",
        "person": "people"
      };
      var uncountable = ["sheep", "fish", "deer", "moose", "series", "species", "money", "rice", "information", "equipment"];
      if (uncountable.indexOf(singular.toLowerCase()) >= 0) {
        return singular;
      }
      for (var word in irregular) {
        var pattern = new RegExp(word + "$", "i");
        var replace = irregular[word];
        if (pattern.test(singular)) {
          return singular.replace(pattern, replace);
        }
      }
      for (var expression in plural) {
        var _pattern = new RegExp(expression, "i");
        if (_pattern.test(singular)) {
          return singular.replace(_pattern, plural[expression]);
        }
      }
      return singular;
    }
    Text.plural = plural;
    /**
     * Adds a number suffix to "value". (-st, -nd, -rd or -th)
     * @param value The number to add a suffix to.
     * @returns A string of "value" with a number suffix.
     */
    function integerSuffix(value) {
      if (value % 1 !== 0) {
        throw new Error("Can only determine a number suffix for integers. Got \"".concat(value, "\"."));
      }
      var string = value.toFixed(0);
      if (value === 13) {
        return string + "th";
      }
      switch (value % 10) {
        case 1:
          return string + "st";
        case 2:
          return string + "nd";
        case 3:
          return string + "rd";
        default:
          return string + "th";
      }
    }
    Text.integerSuffix = integerSuffix;
    /**
     * Converts a date object into strings of various formats.
     * @param date The date to convert.
     * @param format The format to use. ("iso", "form", "pretty")
     * @returns A formatted date string.
     *
     * @note The "pretty" will use {@link Text.defaults.locale} and {@link Text.defaults.dateFormat}
     */
    function date(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "pretty";
      switch (format) {
        case "iso":
          return date.toISOString();
        case "form":
          return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
        case "pretty":
          return date.toLocaleDateString(Text.defaults.locale, Text.defaults.dateFormat);
        default:
          throw new Error("Unrecognized date format ".concat(format, "."));
      }
    }
    Text.date = date;
    /**
     * Converts a date or hours number into time strings of various formats.
     * @param hoursOfDayOrDate A number of hours in a day (0-24) or a date object to convert to a time string.
     * @param format The format of the time string.
     * @returns The formatted time string.
     */
    function time(hoursOfDayOrDate) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "pretty";
      switch (format) {
        case "form":
          var hours;
          var minutes;
          if (typeof hoursOfDayOrDate === "number") {
            hours = Math.floor(hoursOfDayOrDate);
            minutes = Math.round((hoursOfDayOrDate - hours) * 60);
          } else {
            hours = hoursOfDayOrDate.getHours();
            minutes = hoursOfDayOrDate.getMinutes();
          }
          return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
        case "pretty":
          if (typeof hoursOfDayOrDate === "number") {
            var _hours = Math.floor(hoursOfDayOrDate);
            var _minutes = Math.round((hoursOfDayOrDate - _hours) * 60);
            hoursOfDayOrDate = new Date(0, 0, 0, _hours, _minutes);
          }
          return hoursOfDayOrDate.toLocaleTimeString(Text.defaults.locale, Text.defaults.timeFormat);
      }
    }
    Text.time = time;
    /**
     * Converts a given duration in milliseconds to a string.
     * @param milliseconds Milliseconds to convert into a duration string.
     * @param maximumPrecision The maximum precision of the duration string.
     * @param minimumPrecision The minimum precision of the duration string.
     * @param pluralize True to pluralize the units, false otherwise.
     * @returns A duration string.
     */
    function duration(milliseconds) {
      var maximumPrecision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "day";
      var minimumPrecision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "second";
      var pluralize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var precisions = [{
        name: "week",
        milliseconds: 1000 * 60 * 60 * 24 * 7
      }, {
        name: "day",
        milliseconds: 1000 * 60 * 60 * 24
      }, {
        name: "hour",
        milliseconds: 1000 * 60 * 60
      }, {
        name: "minute",
        milliseconds: 1000 * 60
      }, {
        name: "second",
        milliseconds: 1000
      }, {
        name: "millisecond",
        milliseconds: 1
      }];
      var pieces = [];
      var maximumPrecisionIndex = precisions.findIndex(function (item) {
        return item.name === maximumPrecision;
      });
      var minimumPrecisionIndex = precisions.findIndex(function (item) {
        return item.name === minimumPrecision;
      });
      for (var i = maximumPrecisionIndex, last = minimumPrecisionIndex; i <= last; i++) {
        var item = precisions[i];
        var count = i === last ? Math.round(milliseconds / item.milliseconds) : Math.floor(milliseconds / item.milliseconds);
        milliseconds -= count * item.milliseconds;
        if (count !== 0) {
          pieces.push(count + " " + (pluralize ? Text.plural(item.name, count) : item.name));
        }
      }
      return pieces.join(", ");
    }
    Text.duration = duration;
    /**
     * Gets the name of the day of the week from {@link date}.
     * @param date The date to get the weekday from.
     * @returns The name of the day of the week.
     */
    function weekday(date) {
      return date.toLocaleDateString(Text.defaults.locale, {
        weekday: "long"
      });
    }
    Text.weekday = weekday;
    /**
     * Gets the name of the month of the year from {@link date}.
     * @param date The date to get the month from.
     * @returns The name of the month of the year.
     */
    function month(date) {
      return date.toLocaleDateString(Text.defaults.locale, {
        month: "long"
      });
    }
    Text.month = month;
    /**
     * Creates a string from {@link currency}.
     * @param currency The currency to convert to a string.
     * @returns A string representing {@link currency}.
     */
    function currency(currency) {
      return currency.toLocaleString(Text.defaults.locale, {
        style: "currency",
        currency: Text.defaults.currency
      });
    }
    Text.currency = currency;
    /**
     * Creates a string from {@link percentage}.
     * @param percentage The percentage to convert to a string.
     * @returns A string representing {@link percentage}.
     */
    function percentage(percentage) {
      return percentage.toLocaleString(Text.defaults.locale, {
        style: "percent"
      });
    }
    Text.percentage = percentage;
    /**
     * Creates a string from {@link number}.
     * @param number The number to convert to a string.
     * @param fractionalDigits The number of digits to represent the fractional portion of the number.
     * @returns A string representing {@link number}.
     */
    function number(number) {
      var fractionalDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      return number.toLocaleString(Text.defaults.locale, {
        style: "decimal",
        minimumFractionDigits: fractionalDigits,
        maximumFractionDigits: fractionalDigits
      });
    }
    Text.number = number;
    (function (Utility) {
      /**
       * Calculates the [Levenshtein distance]{@link https://en.wikipedia.org/wiki/Levenshtein_distance} between two strings.
       * @param stringA The first string
       * @param stringB The second string
       * @returns The distance between {@link stringA} and {@link stringB}
       */
      function getLevenshteinDistance(stringA, stringB) {
        var line = Array(stringB.length + 1).fill(null).map(function () {
          return Array(stringA.length + 1).fill(null);
        });
        for (var i = 0; i <= stringA.length; i += 1) {
          line[0][i] = i;
        }
        for (var j = 0; j <= stringB.length; j += 1) {
          line[j][0] = j;
        }
        for (var _j = 1; _j <= stringB.length; _j += 1) {
          for (var _i = 1; _i <= stringA.length; _i += 1) {
            var indicator = stringA[_i - 1] === stringB[_j - 1] ? 0 : 1;
            line[_j][_i] = Math.min(line[_j][_i - 1] + 1, line[_j - 1][_i] + 1, line[_j - 1][_i - 1] + indicator);
          }
        }
        return line[stringB.length][stringA.length];
      }
      Utility.getLevenshteinDistance = getLevenshteinDistance;
      /**
       * Calculates a normalized similarity factor between two strings. Determines how similar two strings are. Used for fuzzy string checking.
       * @param stringA The first string
       * @param stringB The second string
       * @returns A similarity factor, 1 being identical, 0 being very different.
       */
      function getSimilarity(stringA, stringB) {
        var distance = Text.Utility.getLevenshteinDistance(stringA, stringB);
        var averageLength = (stringA.length + stringB.length) / 2;
        return Math.max(0, 1 - distance / Math.max(1, averageLength));
      }
      Utility.getSimilarity = getSimilarity;
    })(Text.Utility || (Text.Utility = {}));
    (function (Parse) {
      /**
      * Converts a string into a date object.
      * @param dateString The string to parse into a date.
      * @param formFormat If true, parses "dateString" in the current timezone instead of UTC.
      * @returns The parsed date.
      */
      function date(dateString, formFormat) {
        var date = new Date(dateString);
        if (formFormat) {
          return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        } else {
          return date;
        }
      }
      Parse.date = date;
      /**
       * Converts a form time string (HH:mm) to a number of hours of a day.
       * @param formTimeString The string to parse.
       * @returns An hour of the day (0-24) representing {@link formTimeString}.
       */
      function time(formTimeString) {
        var hours = parseInt(formTimeString.substring(0, 2));
        var minutes = parseInt(formTimeString.substring(3, 5));
        return hours + minutes / 60;
      }
      Parse.time = time;
    })(Text.Parse || (Text.Parse = {}));
  })(exports.Text || (exports.Text = {}));

  exports.Clock = Clock;
  exports.Color = Color;

}));
