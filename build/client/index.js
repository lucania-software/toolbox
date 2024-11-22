(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@lucania/toolbox/shared')) :
  typeof define === 'function' && define.amd ? define(['exports', '@lucania/toolbox/shared'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ClientToolbox = {}, global.SharedToolbox));
})(this, (function (exports, shared) { 'use strict';

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw new Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
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
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
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

  var RequestMethod;
  (function (RequestMethod) {
    RequestMethod["GET"] = "GET";
    RequestMethod["HEAD"] = "HEAD";
    RequestMethod["OPTIONS"] = "OPTIONS";
    RequestMethod["PATCH"] = "PATCH";
    RequestMethod["POST"] = "POST";
    RequestMethod["PUT"] = "PUT";
    RequestMethod["DELETE"] = "DELETE";
    RequestMethod["TRACE"] = "TRACE";
  })(RequestMethod || (RequestMethod = {}));
  exports.Network = void 0;
  (function (Network) {
    /**
     * Used specify default to use for all outgoing requests.
     */
    Network.defaults = {
      headers: {},
      getHeaders: {},
      postHeaders: {}
    };
    /**
     * Sends a {@link method} request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function request(_x) {
      return _request.apply(this, arguments);
    }
    function _request() {
      _request = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
        var method,
          body,
          headers,
          additionalHeaders,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              method = _args.length > 1 && _args[1] !== undefined ? _args[1] : RequestMethod.GET;
              body = _args.length > 2 ? _args[2] : undefined;
              headers = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
              if (Network.defaults.host !== undefined && url.match(/^[a-zA-Z]+:\/\//) === null) {
                url = Network.defaults.host + url;
              }
              additionalHeaders = {};
              if (_typeof(body) === "object") {
                body = JSON.stringify(body);
                additionalHeaders["Content-Type"] = "application/json";
              }
              _context.next = 8;
              return fetch(url, _objectSpread2({
                method: method,
                credentials: "include",
                headers: _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, Network.defaults.headers), shared.Data.conditional(method === RequestMethod.GET, Network.defaults.getHeaders)), shared.Data.conditional(method === RequestMethod.POST, Network.defaults.postHeaders)), additionalHeaders), headers)
              }, shared.Data.conditional(body !== undefined, {
                body: body
              })));
            case 8:
              return _context.abrupt("return", _context.sent);
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return _request.apply(this, arguments);
    }
    Network.request = request;
    /**
     * Sends a post request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param parameters The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function get(_x2, _x3) {
      return _get.apply(this, arguments);
    }
    function _get() {
      _get = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url, parameters) {
        var headers,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              headers = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              if (parameters !== undefined) {
                url = url + "?" + parameters.toString();
              }
              _context2.next = 4;
              return Network.request(url, RequestMethod.GET, undefined, headers);
            case 4:
              return _context2.abrupt("return", _context2.sent);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return _get.apply(this, arguments);
    }
    Network.get = get;
    /**
     * Sends a post request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function post(_x4) {
      return _post.apply(this, arguments);
    }
    function _post() {
      _post = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(url) {
        var body,
          headers,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              body = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              headers = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
              _context3.next = 4;
              return Network.request(url, RequestMethod.POST, body, headers);
            case 4:
              return _context3.abrupt("return", _context3.sent);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return _post.apply(this, arguments);
    }
    Network.post = post;
    /**
     * Sends a put request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function put(_x5, _x6) {
      return _put.apply(this, arguments);
    }
    function _put() {
      _put = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(url, body) {
        var headers,
          _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              headers = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
              _context4.next = 3;
              return Network.request(url, RequestMethod.PUT, body, headers);
            case 3:
              return _context4.abrupt("return", _context4.sent);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return _put.apply(this, arguments);
    }
    Network.put = put;
    /**
     * Sends a patch request with optional body data and headers.
     * Uses the fetch API and {@link Network.defaults}
     * @param url The address of the server to make the request to.
     * @param body The body data to send to {@link url}
     * @param headers The headers to send to {@link url}
     * @returns The response from {@link url}
     */
    function patch(_x7, _x8) {
      return _patch.apply(this, arguments);
    }
    function _patch() {
      _patch = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(url, body) {
        var headers,
          _args5 = arguments;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              headers = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
              _context5.next = 3;
              return Network.request(url, RequestMethod.PATCH, body, headers);
            case 3:
              return _context5.abrupt("return", _context5.sent);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return _patch.apply(this, arguments);
    }
    Network.patch = patch;
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
    function deleteRequest(_x9, _x10) {
      return _deleteRequest.apply(this, arguments);
    }
    function _deleteRequest() {
      _deleteRequest = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(url, body) {
        var headers,
          _args6 = arguments;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              headers = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
              _context6.next = 3;
              return Network.request(url, RequestMethod.DELETE, body, headers);
            case 3:
              return _context6.abrupt("return", _context6.sent);
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      return _deleteRequest.apply(this, arguments);
    }
    Network.deleteRequest = deleteRequest;
  })(exports.Network || (exports.Network = {}));

  exports.Dom = void 0;
  (function (Dom) {
    /**
     * Called if an error occurs while executing the {@link Network.onReady} callback.
     */
    var _onErrorListeners = [];
    /**
     * Registers a callback to be run when the DOM content loads.
     * @param callback The callback to be run when the DOM content loads.
     */
    function onReady(callback) {
      var mapping = Dom.getMapping();
      var execute = function execute() {
        return Promise.resolve(callback(mapping))["catch"](function (error) {
          if (_onErrorListeners.length > 0) {
            _onErrorListeners.forEach(function (listener) {
              return listener(error, mapping);
            });
          } else {
            console.warn("No error handlers are supplied. It's a good idea to handle errors with Dom.onError.");
            console.error(error);
          }
        });
      };
      if (document.readyState === "complete") {
        execute();
      } else {
        window.addEventListener("DOMContentLoaded", execute);
      }
    }
    Dom.onReady = onReady;
    /**
     * Registers a callback to be run if an error occurs while executing onReady callbacks.
     * @param callback The callback to be run if an error occurs while executing onReady callbacks.
     */
    function onError(callback) {
      _onErrorListeners.push(callback);
    }
    Dom.onError = onError;
    /**
     * Returns an ElementMapping of all elements in {@link root}.
     * @param root The document to create the mapping for.
     * @returns A mapping of element in {@link root}
     */
    function getMapping() {
      var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      return new ElementMapping(root);
    }
    Dom.getMapping = getMapping;
    /**
     * Creates an HTML element
     * @param options The options used to create the element
     * @returns The created HTML element
     */
    function create(options) {
      var element = document.createElement(options.tagName);
      if (shared.Data.has(options, "textContent")) {
        element.textContent = options.textContent;
      }
      if (shared.Data.has(options, "classList")) {
        var _element$classList;
        (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(options.classList));
      }
      if (shared.Data.has(options, "innerHTML")) {
        element.innerHTML = options.innerHTML;
      }
      if (shared.Data.has(options, "outerHTML")) {
        element.outerHTML = options.outerHTML;
      }
      if (shared.Data.has(options, "style")) {
        for (var key in options.style) {
          element.style[key] = options.style[key];
        }
      }
      if (shared.Data.has(options, "attributes")) {
        for (var name in options.attributes) {
          element.setAttribute(name, options.attributes[name]);
        }
      }
      if (shared.Data.has(options, "eventListeners")) {
        for (var type in options.eventListeners) {
          element.addEventListener(type, options.eventListeners[type]);
        }
      }
      if (shared.Data.has(options, "childNodes")) {
        element.append.apply(element, _toConsumableArray(options.childNodes));
      }
      return element;
    }
    Dom.create = create;
    function populate(node, context) {
      if (node.nodeName === "#text" && node.textContent) {
        node.textContent = node.textContent.replace(/{% ([a-z_$][a-z0-9_.$]*) %}/gi, function (_, path) {
          var value = shared.Data.get(context, path, "");
          shared.Data.assert(typeof value === "string", "Expected string at path \"".concat(path, "\" in population context!"));
          return value;
        });
      } else {
        var _iterator = _createForOfIteratorHelper(node.childNodes),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var childNode = _step.value;
            populate(childNode, context);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
    Dom.populate = populate;
    function createFromTemplate(template, context) {
      var content = template.content.cloneNode(true);
      Dom.populate(content, context);
      var fragment = document.createDocumentFragment();
      fragment.append(content);
      return fragment;
    }
    Dom.createFromTemplate = createFromTemplate;
    /**
     * Checks to see if an element with the ID "elementId" exists in the DOM.
     * @param elementId The ID of an element to check the existance of.
     * @returns True of an element with the ID "elementId" exists in the DOM, false otherwise.
     */
    function exists(elementId) {
      return document.getElementById(elementId) !== null;
    }
    Dom.exists = exists;
    /**
     * Removes all children from a node.
     * @param container The node to remove the children from.
     */
    function clear(container) {
      while (container.lastChild !== null) {
        container.lastChild.remove();
      }
      return container;
    }
    Dom.clear = clear;
    /**
     * Retrieves form data for inputs within a certain section in a form
     * @param section The section to retrieve the form data from. This can be the form itself.
     */
    function getFormData(section) {
      var form = section instanceof HTMLFormElement ? section : section.closest("form");
      shared.Data.assert(form !== null, "The provided section is not in a form element.");
      var formData = new FormData(form);
      var _iterator2 = _createForOfIteratorHelper(form.elements),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var element = _step2.value;
          if (!section.contains(element)) {
            if (element instanceof HTMLInputElement) {
              formData["delete"](element.name);
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return formData;
    }
    Dom.getFormData = getFormData;
    /**
     * Populates a form's inputs with data.
     * @param form The form element to populate.
     * @param data The data to populate {@link form} with.
     */
    function setFormData(form, data) {
      var formData;
      if (data instanceof FormData) {
        formData = data;
      } else {
        formData = new FormData();
        shared.Data.walk(data, function (_, property, path) {
          if (_typeof(property) !== "object") {
            formData.append(path, property);
          }
          return false;
        });
      }
      var _iterator3 = _createForOfIteratorHelper(formData),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _slicedToArray(_step3.value, 2),
            key = _step3$value[0],
            value = _step3$value[1];
          if (key in form.elements) {
            var input = form.elements[key];
            if (input instanceof HTMLInputElement) {
              switch (input.type) {
                case "checkbox":
                  input.checked = !!value;
                  break;
                default:
                  if (value instanceof File) {
                    var dataTransfer = new DataTransfer();
                    dataTransfer.items.add(value);
                    input.files = dataTransfer.files;
                  } else {
                    input.value = value;
                  }
                  break;
              }
            }
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    Dom.setFormData = setFormData;
    /**
     * Clears the value of the inputs within a certain section within a form.
     * @param section The section to retrieve the form data from.
     */
    function clearFormSection(section) {
      var form = section instanceof HTMLFormElement ? section : section.closest("form");
      shared.Data.assert(form !== null, "The provided section is not in a form element.");
      var _iterator4 = _createForOfIteratorHelper(form.elements),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var element = _step4.value;
          if (section.contains(element)) {
            if (element instanceof HTMLInputElement) {
              if (element.type === "checkbox" || element.type === "radio") {
                element.checked = false;
              } else if (element.type === "file") {
                element.files = new FileList();
              } else {
                element.value = "";
              }
            } else if (element instanceof HTMLTextAreaElement) {
              element.value = "";
            } else if (element instanceof HTMLSelectElement) {
              element.selectedIndex = 0;
            }
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    Dom.clearFormSection = clearFormSection;
    /**
     * Submits a form whilst triggering HTML's default form validation.
     * @param form A form to submit.
     */
    function submitFormWithValidation(form) {
      var input = document.createElement("input");
      input.style.display = "none";
      input.setAttribute("type", "submit");
      form.appendChild(input);
      input.click();
      input.remove();
    }
    Dom.submitFormWithValidation = submitFormWithValidation;
    /**
     * Pulses a halo affect around an element to bring attention to it.
     * @param element The element to pluse
     * @param color The color of the pluse
     */
    function pulse(element) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#FF0000";
      var i = 0;
      var duration = 500;
      var steps = 20;
      var boxShadowBefore = element.style.boxShadow;
      var intervalId = setInterval(function () {
        if (i > 1) {
          element.style.boxShadow = boxShadowBefore;
          clearInterval(intervalId);
        } else {
          i += duration / 1000 / steps;
          var expand = Math.sin(Math.PI * (4 * i + 1.5)) + 1;
          element.style.boxShadow = "0 0 ".concat(expand * 15, "px ").concat(color);
        }
      }, duration / steps);
    }
    Dom.pulse = pulse;
    /**
     * Get a computed value of a css variable.
     * @param name The name of the css variable. (Starts with "--")
     * @returns The computed style of the css variable named {@link name}.
     */
    function getCssVariable(name) {
      return getComputedStyle(document.documentElement).getPropertyValue(name);
    }
    Dom.getCssVariable = getCssVariable;
    /**
     * Sets a CSS variable for a given element.
     * @param name The name of the css variable. (Starts with "--")
     * @param value The CSS value of the variable.
     * @param element The host element of the styles. (Defaults to document.documentElement)
     */
    function setCssVariable(name, value) {
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;
      element.style.setProperty(name, value);
    }
    Dom.setCssVariable = setCssVariable;
    /**
     * Attaches a input listener that only fires a given amount of time after the user has stopped inputting.
     * This is useful to reducing the amount of API requests for suggestions-as-you-type search boxes.
     * @param input The element to attach the listener to
     * @param callback The callback to be run after inputting
     * @param delay The time in milliseconds to wait after the user has inputted until firing the callback
     */
    function setSlowedInputListener(input, callback) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
      if (callback) {
        var timeout;
        input.oninput = function (event) {
          if (timeout === undefined) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(function () {
            return callback(event, true);
          }, delay);
          callback(event, false);
        };
      } else {
        input.oninput = null;
      }
    }
    Dom.setSlowedInputListener = setSlowedInputListener;
    /**
     * Attaches a modifier to an input to allow text tranformations. I.E. Auto capitalizing a postal code input, title casing a name input, etc.
     * @param input An input to apply an input modifer to.
     * @param modifier The modifier for "input"s value.
     */
    function addTextModifier(input, modifier) {
      input.addEventListener("input", function () {
        var selectionStart = input.selectionStart;
        var selectionEnd = input.selectionEnd;
        input.value = modifier(input.value);
        input.setSelectionRange(selectionStart, selectionEnd);
      });
    }
    Dom.addTextModifier = addTextModifier;
    /**
     * Controls the existance of "templateElement"s content in the DOM based on the value of "controlInput"
     * @param templateElement The element whoes existance is dictated by "controlInput"
     * @param controlInput The element whoes value controls the existance of "templateElement"
     * @param valueEvaluationCallback The callback to assess "controlInput"s value. Returns true for "templateElement" to exists, false otherwise.
     */
    function existanceControlledBy(templateElement, controlInput) {
      var valueEvaluationCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (controlInput) {
        return controlInput.checked;
      };
      var puppetElements = _toConsumableArray(templateElement.content.childNodes);
      var update = function update() {
        if (valueEvaluationCallback(controlInput)) {
          templateElement.after.apply(templateElement, _toConsumableArray(puppetElements));
        } else {
          var _templateElement$cont;
          (_templateElement$cont = templateElement.content).append.apply(_templateElement$cont, _toConsumableArray(puppetElements));
        }
      };
      controlInput.addEventListener("change", update);
      update();
    }
    Dom.existanceControlledBy = existanceControlledBy;
    /**
     * Holds a mapping of IDs to their corresponding elements
     * An easy-to-use typed, wrapping of document.getElementById()
     */
    var ElementMapping = /*#__PURE__*/function () {
      function ElementMapping() {
        var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        _classCallCheck(this, ElementMapping);
        _defineProperty(this, "_proxy", void 0);
        this._proxy = new Proxy(root, {
          get: function get(root, elementId) {
            return root.getElementById(elementId);
          }
        });
      }
      return _createClass(ElementMapping, [{
        key: "element",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "anchor",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "base",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "body",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "break",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "button",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "canvas",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "division",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "descriptionList",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "embed",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "form",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "head",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "heading",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "horizontalRule",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "html",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "inlineFrame",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "image",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "input",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "listItem",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "link",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "menu",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "meta",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "mod",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "orderedList",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "optgroups",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "option",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "paragraph",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "preformattedText",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "quote",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "script",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "select",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "slot",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "span",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "style",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "tableCell",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "table",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "tableRow",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "tableSection",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "template",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "time",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "title",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "unorderedList",
        get: function get() {
          return this._proxy;
        }
      }]);
    }();
    Dom.ElementMapping = ElementMapping;
  })(exports.Dom || (exports.Dom = {}));

  exports.Cookies = void 0;
  (function (Cookies) {
    /**
     * Retrieves a cookie by name.
     * @param name The name of the cookie to get the value of.
     * @returns The cookie named {@link name}, or undefined if it does not exist.
     */
    function get(name) {
      var valueStrings = document.cookie.split(";");
      var _iterator = _createForOfIteratorHelper(valueStrings),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var valueString = _step.value;
          var _valueString$trim$spl = valueString.trim().split("=").map(decodeURIComponent),
            _valueString$trim$spl2 = _slicedToArray(_valueString$trim$spl, 2),
            possibleKey = _valueString$trim$spl2[0],
            value = _valueString$trim$spl2[1];
          if (name === possibleKey) {
            return value;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return undefined;
    }
    Cookies.get = get;
    /**
     * Retrieves a JSON cookie by name.
     * @param name The name of the cookie to get the value of.
     * @returns The cookie named {@link name}, or undefined if it does not exist, or cannot be parsed as JSON.
     */
    function getJson(name) {
      try {
        var cookie = Cookies.get(name);
        shared.Data.assert(cookie !== undefined);
        return JSON.parse(cookie);
      } catch (error) {
        return undefined;
      }
    }
    Cookies.getJson = getJson;
    /**
     * Retrieves all cookies and returns each key, value pair as an object.
     * @returns An object where each key in a cookie name that maps a cookie value.
     */
    function getAll() {
      var cookies = {};
      var valueStrings = document.cookie.split(";");
      var _iterator2 = _createForOfIteratorHelper(valueStrings),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var valueString = _step2.value;
          var _valueString$trim$spl3 = valueString.trim().split("=").map(decodeURIComponent),
            _valueString$trim$spl4 = _slicedToArray(_valueString$trim$spl3, 2),
            key = _valueString$trim$spl4[0],
            value = _valueString$trim$spl4[1];
          cookies[key] = value;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return cookies;
    }
    Cookies.getAll = getAll;
    /**
     * Sets a cookie named {@link name} to {@link value}.
     * @param name The name of the cookie to set the value of.
     * @param value The value of the cookie to be set.
     */
    function set(name, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var pieces = ["".concat(name, "=").concat(encodeURIComponent(value))];
      if (shared.Data.has(options, "path")) {
        pieces.push("path=".concat(options.path));
      }
      if (shared.Data.has(options, "domain")) {
        pieces.push("domain=".concat(options.domain));
      }
      if (shared.Data.has(options, "maxAge")) {
        pieces.push("max-age=".concat(options.maxAge));
      }
      if (shared.Data.has(options, "expires")) {
        pieces.push("expires=".concat(options.expires.toUTCString()));
      }
      if (shared.Data.has(options, "secure") && options.secure) {
        pieces.push("secure");
      }
      if (shared.Data.has(options, "sameSite")) {
        pieces.push("samesite=".concat(options.sameSite));
      }
      document.cookie = pieces.join("; ");
    }
    Cookies.set = set;
    /**
     * Sets a cookie named {@link name} to {@link value} as JSON.
     * @param name The name of the cookie to set the value of.
     * @param value The value of the cookie to be set.
     */
    function setJson(name, value, options) {
      Cookies.set(name, JSON.stringify(value), options);
    }
    Cookies.setJson = setJson;
    /**
     * Deletes a cookie named {@link name}.
     * @param name The name of the cookie to delete.
     */
    function remove(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pieces = ["".concat(name, "=")];
      if ("path" in options) {
        pieces.push("path=".concat(options.path));
      }
      if ("domain" in options) {
        pieces.push("domain=".concat(options.domain));
      }
      if ("secure" in options && options.secure) {
        pieces.push("secure");
      }
      if ("sameSite" in options) {
        pieces.push("samesite=".concat(options.sameSite));
      }
      pieces.push("max-age=0");
      document.cookie = pieces.join("; ");
    }
    Cookies.remove = remove;
  })(exports.Cookies || (exports.Cookies = {}));

  var Loader;
  (function (Loader) {
    Loader.dom = {
      contentTypes: ["text/html", "text/xml", "application/xml", "application/xhtml+xml", "image/svg+xml"],
      load: function () {
        var _load = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(response) {
          var text, contentType, mimeType, match, _match, parser;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return response.text();
              case 2:
                text = _context.sent;
                contentType = response.headers.get("Content-Type");
                if (contentType === null) {
                  mimeType = "text/html";
                } else {
                  match = contentType.match(shared.RegularExpression.mimeType);
                  shared.Data.assert(match !== null, "Failed to parse Content-Type header \"".concat(contentType, "\"."));
                  _match = _slicedToArray(match, 1);
                  mimeType = _match[0];
                }
                parser = new DOMParser();
                return _context.abrupt("return", parser.parseFromString(text, mimeType));
              case 7:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        function load(_x) {
          return _load.apply(this, arguments);
        }
        return load;
      }()
    };
    Loader.bitmap = {
      contentTypes: ["image/avif", "image/bmp", "image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/tiff", "image/webp"],
      load: function load(response) {
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = window;
                _context2.next = 3;
                return response.blob();
              case 3:
                _context2.t1 = _context2.sent;
                _context2.next = 6;
                return _context2.t0.createImageBitmap.call(_context2.t0, _context2.t1);
              case 6:
                return _context2.abrupt("return", _context2.sent);
              case 7:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      }
    };
    Loader.json = {
      contentTypes: ["application/json"],
      load: function load(response) {
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return response.json();
              case 2:
                return _context3.abrupt("return", _context3.sent);
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      }
    };
    Loader.text = {
      contentTypes: ["text/css", "text/csv", "text/plain"],
      load: function load(response) {
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return response.text();
              case 2:
                return _context4.abrupt("return", _context4.sent);
              case 3:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      }
    };
  })(Loader || (Loader = {}));

  var AssetManager = /*#__PURE__*/function () {
    function AssetManager() {
      _classCallCheck(this, AssetManager);
      _defineProperty(this, "queue", void 0);
      _defineProperty(this, "resourceLoaders", void 0);
      _defineProperty(this, "_resources", void 0);
      this.queue = [];
      this.resourceLoaders = [Loader.bitmap, Loader.dom, Loader.json, Loader.text];
      this._resources = {};
    }
    return _createClass(AssetManager, [{
      key: "register",
      value: function register(resourceLoader) {
        this.resourceLoaders.push(resourceLoader);
      }
    }, {
      key: "add",
      value: function add(name, source, contentType) {
        this.queue.push({
          name: name,
          source: source,
          contentType: contentType
        });
      }
    }, {
      key: "load",
      value: function () {
        var _load = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resourceLoadedCallback) {
          var _this = this;
          var tasks, _loop;
          return _regeneratorRuntime().wrap(function _callee2$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                tasks = [];
                _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                  var resourceDescriptor;
                  return _regeneratorRuntime().wrap(function _loop$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        resourceDescriptor = _this.queue.pop();
                        tasks.push(new Promise(/*#__PURE__*/function () {
                          var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
                            var response, contentType, headerContentType, match, _match, loader, definedContentType, resource;
                            return _regeneratorRuntime().wrap(function _callee$(_context) {
                              while (1) switch (_context.prev = _context.next) {
                                case 0:
                                  _context.prev = 0;
                                  _context.next = 3;
                                  return fetch(resourceDescriptor.source);
                                case 3:
                                  response = _context.sent;
                                  if (!(response.status !== 200)) {
                                    _context.next = 6;
                                    break;
                                  }
                                  throw shared.Error.Http.getFromResponse(response);
                                case 6:
                                  contentType = resourceDescriptor.contentType;
                                  if (contentType === undefined && response.headers.has("Content-Type")) {
                                    headerContentType = response.headers.get("Content-Type");
                                    match = headerContentType.match(shared.RegularExpression.mimeType);
                                    if (match !== null) {
                                      _match = _slicedToArray(match, 1);
                                      contentType = _match[0];
                                    }
                                  }
                                  loader = undefined;
                                  if (contentType !== undefined) {
                                    definedContentType = contentType;
                                    loader = _this.resourceLoaders.find(function (loader) {
                                      return loader.contentTypes.includes(definedContentType);
                                    });
                                  }
                                  shared.Data.assert(loader !== undefined, "No loaders found for content type \"".concat(contentType, "\"."));
                                  resource = undefined;
                                  _context.prev = 12;
                                  _context.next = 15;
                                  return loader.load(response);
                                case 15:
                                  resource = _context.sent;
                                  _context.next = 21;
                                  break;
                                case 18:
                                  _context.prev = 18;
                                  _context.t0 = _context["catch"](12);
                                  console.warn(_context.t0);
                                case 21:
                                  if (resourceLoadedCallback !== undefined) {
                                    resourceLoadedCallback(resource, resourceDescriptor);
                                  }
                                  _this._resources[resourceDescriptor.name] = resource;
                                  resolve(resource);
                                  _context.next = 29;
                                  break;
                                case 26:
                                  _context.prev = 26;
                                  _context.t1 = _context["catch"](0);
                                  reject(_context.t1);
                                case 29:
                                case "end":
                                  return _context.stop();
                              }
                            }, _callee, null, [[0, 26], [12, 18]]);
                          }));
                          return function (_x2, _x3) {
                            return _ref.apply(this, arguments);
                          };
                        }()));
                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }, _loop);
                });
              case 2:
                if (!(this.queue.length > 0)) {
                  _context3.next = 6;
                  break;
                }
                return _context3.delegateYield(_loop(), "t0", 4);
              case 4:
                _context3.next = 2;
                break;
              case 6:
                _context3.next = 8;
                return Promise.all(tasks);
              case 8:
                return _context3.abrupt("return", _context3.sent);
              case 9:
              case "end":
                return _context3.stop();
            }
          }, _callee2, this);
        }));
        function load(_x) {
          return _load.apply(this, arguments);
        }
        return load;
      }()
    }, {
      key: "get",
      value: function get(name) {
        if (name in this._resources) {
          return this._resources[name];
        } else {
          return undefined;
        }
      }
    }, {
      key: "getAsserted",
      value: function getAsserted(name) {
        var value = this.get(name);
        shared.Data.assert(value !== undefined, "Failed to get asset named \"".concat(name, "\" as it is not loaded."));
        return value;
      }
    }]);
  }();

  exports.AssetManager = AssetManager;

}));
