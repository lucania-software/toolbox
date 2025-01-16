(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SharedToolbox = {}));
})(this, (function (exports) { 'use strict';

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
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
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
    return _createClass(Clock, [{
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
  }();

  var _Color;
  var Color = /*#__PURE__*/function () {
    function Color(hex) {
      _classCallCheck(this, Color);
      _defineProperty(this, "_hex", void 0);
      _defineProperty(this, "_rgba", void 0);
      this._hex = hex;
      this._rgba = Color._getRgba(hex);
    }
    /**
     * Gets this color's RGBA value as a tuple, on a scale from 0 to 255.
     */
    return _createClass(Color, [{
      key: "rgba",
      get: function get() {
        return this._rgba;
      }
      /**
       * Gets this color's RGBA value as a tuple, on a scale from 0 to 1.
       */
    }, {
      key: "normalizedRgba",
      get: function get() {
        return [this.normalizedRed, this.normalizedGreen, this.normalizedBlue, this.normalizedAlpha];
      }
    }, {
      key: "cielab",
      get:
      /**
       * Gets this color's CIELAB value as a tuple.
       * https://en.wikipedia.org/wiki/CIELAB_color_space
       */
      function get() {
        var _this$normalizedRgba = _slicedToArray(this.normalizedRgba, 3),
          red = _this$normalizedRgba[0],
          green = _this$normalizedRgba[1],
          blue = _this$normalizedRgba[2];
        red = red > 0.04045 ? Math.pow((red + 0.055) / 1.055, 2.4) : red / 12.92;
        green = green > 0.04045 ? Math.pow((green + 0.055) / 1.055, 2.4) : green / 12.92;
        blue = blue > 0.04045 ? Math.pow((blue + 0.055) / 1.055, 2.4) : blue / 12.92;
        var x = (red * 0.4124 + green * 0.3576 + blue * 0.1805) / 0.95047;
        var y = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 1.00000;
        var z = (red * 0.0193 + green * 0.1192 + blue * 0.9505) / 1.08883;
        x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
        return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
      }
      /**
       * Gets this color's hex value, including alpha channel (i.e. 0xFF00FFFF)
       */
    }, {
      key: "hex",
      get: function get() {
        return Number(this._hex);
      }
      /**
       * Sets this color's hex value, including alpha channel (i.e. 0xFF00FFFF)
       */,
      set: function set(value) {
        this._hex = BigInt(value);
        this._rgba = Color._getRgba(this._hex);
      }
      /**
       * Gets this color's hsl (Hue, Saturation, Lightness) value, excluding the alpha channel.
       * @note The hue value is in the range from 0 to 360 degrees.
       * @note The saturation value is in the range of 0 to 100.
       * @note the lightness value is in the range of 0 to 100.
       */
    }, {
      key: "hsl",
      get: function get() {
        return Color.getHsl(this);
      }
      /**
       * The red channel of this color, on a scale from 0 to 255
       */
    }, {
      key: "red",
      get: function get() {
        return this.rgba[0];
      }
      /**
       * The green channel of this color, on a scale from 0 to 255
       */
    }, {
      key: "green",
      get: function get() {
        return this.rgba[1];
      }
      /**
       * The blue channel of this color, on a scale from 0 to 255
       */
    }, {
      key: "blue",
      get: function get() {
        return this.rgba[2];
      }
      /**
       * The alpha channel of this color, on a scale from 0 to 255
       */
    }, {
      key: "alpha",
      get: function get() {
        return this.rgba[3];
      }
      /**
       * The red channel of this color, on a scale from 0 to 1
       */
    }, {
      key: "normalizedRed",
      get: function get() {
        return this.red / 255;
      }
      /**
       * The green channel of this color, on a scale from 0 to 1
       */
    }, {
      key: "normalizedGreen",
      get: function get() {
        return this.green / 255;
      }
      /**
       * The blue channel of this color, on a scale from 0 to 1
       */
    }, {
      key: "normalizedBlue",
      get: function get() {
        return this.blue / 255;
      }
      /**
       * The alpha channel of this color, on a scale from 0 to 1
       */
    }, {
      key: "normalizedAlpha",
      get: function get() {
        return this.alpha / 255;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new Color(this._hex);
      }
    }, {
      key: "equals",
      value: function equals(color) {
        return color instanceof Color && color._hex === this._hex;
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
    }, {
      key: "chooseFromPalette",
      value: function chooseFromPalette(palette) {
        var _this = this;
        var _palette = _slicedToArray(palette, 1),
          color = _palette[0];
        var result = palette.reduce(function (accumulator, color) {
          var delta = Color.getCielabDelta(_this, color);
          return accumulator.delta === undefined || delta < accumulator.delta ? {
            color: color,
            delta: delta
          } : accumulator;
        }, {
          color: color
        });
        return result.color;
      }
    }, {
      key: "toString",
      value: function toString() {
        return "[(r: ".concat(this.red, ", g: ").concat(this.green, ", b: ").concat(this.blue, "), (#").concat(this.hex.toString(16).padStart(8, "0"), ")]");
      }
    }], [{
      key: "getRgba",
      value: function getRgba(color) {
        return Color.from(color).rgba;
      }
    }, {
      key: "getHex",
      value: function getHex(color) {
        return Color.from(color).hex;
      }
    }, {
      key: "getNormalizedRgba",
      value: function getNormalizedRgba(color) {
        return Color.from(color).normalizedRgba;
      }
    }, {
      key: "getHsl",
      value: function getHsl(color) {
        var _Color$getNormalizedR = Color.getNormalizedRgba(color),
          _Color$getNormalizedR2 = _slicedToArray(_Color$getNormalizedR, 3),
          red = _Color$getNormalizedR2[0],
          green = _Color$getNormalizedR2[1],
          blue = _Color$getNormalizedR2[2];
        var lightness = Math.max(red, green, blue);
        var saturation = lightness - Math.min(red, green, blue);
        var hue = saturation ? lightness === red ? (green - blue) / saturation : lightness === green ? 2 + (blue - red) / saturation : 4 + (red - green) / saturation : 0;
        return [60 * hue < 0 ? 60 * hue + 360 : 60 * hue, 100 * (saturation ? lightness <= 0.5 ? saturation / (2 * lightness - saturation) : saturation / (2 - (2 * lightness - saturation)) : 0), 100 * (2 * lightness - saturation) / 2];
      }
      /**
       * Gets the difference between two colors via Cielab ΔE*.
       * https://en.wikipedia.org/wiki/Color_difference#CIELAB_%CE%94E*
       *
       * @param colorA
       * @param colorB
       * @returns
       */
    }, {
      key: "getCielabDelta",
      value: function getCielabDelta(colorA, colorB) {
        colorA = Color.from(colorA);
        colorB = Color.from(colorB);
        var labA = colorA.cielab;
        var labB = colorB.cielab;
        var deltaL = labA[0] - labB[0];
        var deltaA = labA[1] - labB[1];
        var deltaB = labA[2] - labB[2];
        var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
        var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
        var deltaC = c1 - c2;
        var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
        deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
        var sc = 1.0 + 0.045 * c1;
        var sh = 1.0 + 0.015 * c1;
        var deltaLKlsl = deltaL / 1.0;
        var deltaCkcsc = deltaC / sc;
        var deltaHkhsh = deltaH / sh;
        var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
        return i < 0 ? 0 : Math.sqrt(i);
      }
    }, {
      key: "_getHex",
      value: function _getHex(rgba) {
        return BigInt(rgba[0]) << 8n * 3n | BigInt(rgba[1]) << 8n * 2n | BigInt(rgba[2]) << 8n * 1n | BigInt(rgba[3]) << 8n * 0n;
      }
    }, {
      key: "_getRgba",
      value: function _getRgba(hex) {
        return [Number(hex >> 8n * 3n & 0xffn), Number(hex >> 8n * 2n & 0xffn), Number(hex >> 8n * 1n & 0xffn), Number(hex >> 8n * 0n & 0xffn)];
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
  }();
  _Color = Color;
  _defineProperty(Color, "BLACK", _Color.from(0x000000FF));
  _defineProperty(Color, "WHITE", _Color.from(0xFFFFFFFF));
  _defineProperty(Color, "GRAY", _Color.from(0x808080FF));
  _defineProperty(Color, "RED", _Color.from(0xFF0000FF));
  _defineProperty(Color, "GREEN", _Color.from(0x00FF00FF));
  _defineProperty(Color, "BLUE", _Color.from(0x0000FFFF));
  _defineProperty(Color, "CYAN", _Color.from(0x00FFFFFF));
  _defineProperty(Color, "MAGENTA", _Color.from(0xFF00FFFF));
  _defineProperty(Color, "YELLOW", _Color.from(0xFFFF00FF));

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
    function closest(color) {
      var closestColor = Color.from(color).chooseFromPalette(ConsoleColor.SupportedColors);
      return "\x1B[38;5;".concat(ConsoleColor.SupportedColors.indexOf(closestColor), "m");
    }
    ConsoleColor.closest = closest;
    ConsoleColor.SupportedColors = [0X000000FF, 0XCD3131FF, 0X0DBC79FF, 0XE5E510FF, 0X2472C8FF, 0XBC3FBCFF, 0X11A8CDFF, 0XE5E5E5FF, 0X666666FF, 0XF14C4CFF, 0X23D18BFF, 0XF5F543FF, 0X3B8EEAFF, 0XD670D6FF, 0X29B8DBFF, 0XE5E5E5FF, 0X000000FF, 0X00005FFF, 0X000087FF, 0X0000AFFF, 0X0000D7FF, 0X0000FFFF, 0X005F00FF, 0X005F5FFF, 0X005F87FF, 0X005FAFFF, 0X005FD7FF, 0X005FFFFF, 0X008700FF, 0X00875FFF, 0X008787FF, 0X0087AFFF, 0X0087D7FF, 0X0087FFFF, 0X00AF00FF, 0X00AF5FFF, 0X00AF87FF, 0X00AFAFFF, 0X00AFD7FF, 0X00AFFFFF, 0X00D700FF, 0X00D75FFF, 0X00D787FF, 0X00D7AFFF, 0X00D7D7FF, 0X00D7FFFF, 0X00FF00FF, 0X00FF5FFF, 0X00FF87FF, 0X00FFAFFF, 0X00FFD7FF, 0X00FFFFFF, 0X5F0000FF, 0X5F005FFF, 0X5F0087FF, 0X5F00AFFF, 0X5F00D7FF, 0X5F00FFFF, 0X5F5F00FF, 0X5F5F5FFF, 0X5F5F87FF, 0X5F5FAFFF, 0X5F5FD7FF, 0X5F5FFFFF, 0X5F8700FF, 0X5F875FFF, 0X5F8787FF, 0X5F87AFFF, 0X5F87D7FF, 0X5F87FFFF, 0X5FAF00FF, 0X5FAF5FFF, 0X5FAF87FF, 0X5FAFAFFF, 0X5FAFD7FF, 0X5FAFFFFF, 0X5FD700FF, 0X5FD75FFF, 0X5FD787FF, 0X5FD7AFFF, 0X5FD7D7FF, 0X5FD7FFFF, 0X5FFF00FF, 0X5FFF5FFF, 0X5FFF87FF, 0X5FFFAFFF, 0X5FFFD7FF, 0X5FFFFFFF, 0X870000FF, 0X87005FFF, 0X870087FF, 0X8700AFFF, 0X8700D7FF, 0X8700FFFF, 0X875F00FF, 0X875F5FFF, 0X875F87FF, 0X875FAFFF, 0X875FD7FF, 0X875FFFFF, 0X878700FF, 0X87875FFF, 0X878787FF, 0X8787AFFF, 0X8787D7FF, 0X8787FFFF, 0X87AF00FF, 0X87AF5FFF, 0X87AF87FF, 0X87AFAFFF, 0X87AFD7FF, 0X87AFFFFF, 0X87D700FF, 0X87D75FFF, 0X87D787FF, 0X87D7AFFF, 0X87D7D7FF, 0X87D7FFFF, 0X87FF00FF, 0X87FF5FFF, 0X87FF87FF, 0X87FFAFFF, 0X87FFD7FF, 0X87FFFFFF, 0XAF0000FF, 0XAF005FFF, 0XAF0087FF, 0XAF00AFFF, 0XAF00D7FF, 0XAF00FFFF, 0XAF5F00FF, 0XAF5F5FFF, 0XAF5F87FF, 0XAF5FAFFF, 0XAF5FD7FF, 0XAF5FFFFF, 0XAF8700FF, 0XAF875FFF, 0XAF8787FF, 0XAF87AFFF, 0XAF87D7FF, 0XAF87FFFF, 0XAFAF00FF, 0XAFAF5FFF, 0XAFAF87FF, 0XAFAFAFFF, 0XAFAFD7FF, 0XAFAFFFFF, 0XAFD700FF, 0XAFD75FFF, 0XAFD787FF, 0XAFD7AFFF, 0XAFD7D7FF, 0XAFD7FFFF, 0XAFFF00FF, 0XAFFF5FFF, 0XAFFF87FF, 0XAFFFAFFF, 0XAFFFD7FF, 0XAFFFFFFF, 0XD70000FF, 0XD7005FFF, 0XD70087FF, 0XD700AFFF, 0XD700D7FF, 0XD700FFFF, 0XD75F00FF, 0XD75F5FFF, 0XD75F87FF, 0XD75FAFFF, 0XD75FD7FF, 0XD75FFFFF, 0XD78700FF, 0XD7875FFF, 0XD78787FF, 0XD787AFFF, 0XD787D7FF, 0XD787FFFF, 0XD7AF00FF, 0XD7AF5FFF, 0XD7AF87FF, 0XD7AFAFFF, 0XD7AFD7FF, 0XD7AFFFFF, 0XD7D700FF, 0XD7D75FFF, 0XD7D787FF, 0XD7D7AFFF, 0XD7D7D7FF, 0XD7D7FFFF, 0XD7FF00FF, 0XD7FF5FFF, 0XD7FF87FF, 0XD7FFAFFF, 0XD7FFD7FF, 0XD7FFFFFF, 0XFF0000FF, 0XFF005FFF, 0XFF0087FF, 0XFF00AFFF, 0XFF00D7FF, 0XFF00FFFF, 0XFF5F00FF, 0XFF5F5FFF, 0XFF5F87FF, 0XFF5FAFFF, 0XFF5FD7FF, 0XFF5FFFFF, 0XFF8700FF, 0XFF875FFF, 0XFF8787FF, 0XFF87AFFF, 0XFF87D7FF, 0XFF87FFFF, 0XFFAF00FF, 0XFFAF5FFF, 0XFFAF87FF, 0XFFAFAFFF, 0XFFAFD7FF, 0XFFAFFFFF, 0XFFD700FF, 0XFFD75FFF, 0XFFD787FF, 0XFFD7AFFF, 0XFFD7D7FF, 0XFFD7FFFF, 0XFFFF00FF, 0XFFFF5FFF, 0XFFFF87FF, 0XFFFFAFFF, 0XFFFFD7FF, 0XFFFFFFFF, 0X080808FF, 0X121212FF, 0X1C1C1CFF, 0X262626FF, 0X303030FF, 0X3A3A3AFF, 0X444444FF, 0X4E4E4EFF, 0X585858FF, 0X626262FF, 0X6C6C6CFF, 0X767676FF, 0X808080FF, 0X8A8A8AFF, 0X949494FF, 0X9E9E9EFF, 0XA8A8A8FF, 0XB2B2B2FF, 0XBCBCBCFF, 0XC6C6C6FF, 0XD0D0D0FF, 0XDADADAFF, 0XE4E4E4FF, 0XEEEEEEFF].map(function (hex) {
      return Color.from(hex);
    });
  })(exports.ConsoleColor || (exports.ConsoleColor = {}));

  function _callSuper(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  /**
   * A set of semantic errors.
   */
  exports.Error = void 0;
  (function (Error) {
    Error.Original = globalThis.Error;
    var Named = /*#__PURE__*/function (_Error$Original) {
      function Named(message, options) {
        var _this2;
        _classCallCheck(this, Named);
        _this2 = _callSuper(this, Named, [message, options]);
        _this2.name = "".concat(_this2.constructor.name, " Error");
        return _this2;
      }
      _inherits(Named, _Error$Original);
      return _createClass(Named);
    }(Error.Original);
    Error.Named = Named;
    /**
     * For when something goes very wrong.
     */
    var Fatal = /*#__PURE__*/function (_Named) {
      function Fatal(message) {
        _classCallCheck(this, Fatal);
        return _callSuper(this, Fatal, [message]);
      }
      _inherits(Fatal, _Named);
      return _createClass(Fatal);
    }(Named);
    Error.Fatal = Fatal;
    /**
     * For use for features that haven't been implemented yet.
     */
    var Unimplemented = /*#__PURE__*/function (_Fatal) {
      function Unimplemented() {
        _classCallCheck(this, Unimplemented);
        return _callSuper(this, Unimplemented, ["This feature has not been implemented."]);
      }
      _inherits(Unimplemented, _Fatal);
      return _createClass(Unimplemented);
    }(Fatal);
    Error.Unimplemented = Unimplemented;
    /**
     * Thrown when a Data.assertion is failed.
     */
    var Assertion = /*#__PURE__*/function (_Named2) {
      function Assertion(message) {
        _classCallCheck(this, Assertion);
        return _callSuper(this, Assertion, [message]);
      }
      _inherits(Assertion, _Named2);
      return _createClass(Assertion);
    }(Named);
    Error.Assertion = Assertion;
    /**
     * For use to indicate networks errors whilst using the HTTP protocol.
     */
    var Http = /*#__PURE__*/function (_Named3) {
      function Http(code, message) {
        var _this3;
        _classCallCheck(this, Http);
        _this3 = _callSuper(this, Http, [message]);
        _defineProperty(_this3, "code", void 0);
        _this3.name = "".concat(_this3.name, " (HTTP Status Code ").concat(code, ")");
        _this3.code = code;
        return _this3;
      }
      _inherits(Http, _Named3);
      return _createClass(Http, null, [{
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
              return new Fatal("Error ".concat(response.status, ". ").concat(response.statusText));
          }
        }
      }]);
    }(Named);
    Error.Http = Http;
    /**
     * For use to indicate the server made a mistake over the HTTP protocol.
     */
    var Server = /*#__PURE__*/function (_Http2) {
      function Server(message) {
        var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
        _classCallCheck(this, Server);
        return _callSuper(this, Server, [code, message]);
      }
      _inherits(Server, _Http2);
      return _createClass(Server);
    }(Http);
    Error.Server = Server;
    var InternalServerError = /*#__PURE__*/function (_Server) {
      function InternalServerError(message) {
        _classCallCheck(this, InternalServerError);
        return _callSuper(this, InternalServerError, [message, 500]);
      }
      _inherits(InternalServerError, _Server);
      return _createClass(InternalServerError);
    }(Server);
    Error.InternalServerError = InternalServerError;
    var NotImplemented = /*#__PURE__*/function (_Server2) {
      function NotImplemented(message) {
        _classCallCheck(this, NotImplemented);
        return _callSuper(this, NotImplemented, [message, 501]);
      }
      _inherits(NotImplemented, _Server2);
      return _createClass(NotImplemented);
    }(Server);
    Error.NotImplemented = NotImplemented;
    var BadGateway = /*#__PURE__*/function (_Server3) {
      function BadGateway(message) {
        _classCallCheck(this, BadGateway);
        return _callSuper(this, BadGateway, [message, 502]);
      }
      _inherits(BadGateway, _Server3);
      return _createClass(BadGateway);
    }(Server);
    Error.BadGateway = BadGateway;
    var ServiceUnavailable = /*#__PURE__*/function (_Server4) {
      function ServiceUnavailable(message) {
        _classCallCheck(this, ServiceUnavailable);
        return _callSuper(this, ServiceUnavailable, [message, 503]);
      }
      _inherits(ServiceUnavailable, _Server4);
      return _createClass(ServiceUnavailable);
    }(Server);
    Error.ServiceUnavailable = ServiceUnavailable;
    var GatewayTimeout = /*#__PURE__*/function (_Server5) {
      function GatewayTimeout(message) {
        _classCallCheck(this, GatewayTimeout);
        return _callSuper(this, GatewayTimeout, [message, 504]);
      }
      _inherits(GatewayTimeout, _Server5);
      return _createClass(GatewayTimeout);
    }(Server);
    Error.GatewayTimeout = GatewayTimeout;
    var VersionNotSupported = /*#__PURE__*/function (_Server6) {
      function VersionNotSupported(message) {
        _classCallCheck(this, VersionNotSupported);
        return _callSuper(this, VersionNotSupported, [message, 505]);
      }
      _inherits(VersionNotSupported, _Server6);
      return _createClass(VersionNotSupported);
    }(Server);
    Error.VersionNotSupported = VersionNotSupported;
    var VariantAlsoNegotiates = /*#__PURE__*/function (_Server7) {
      function VariantAlsoNegotiates(message) {
        _classCallCheck(this, VariantAlsoNegotiates);
        return _callSuper(this, VariantAlsoNegotiates, [message, 506]);
      }
      _inherits(VariantAlsoNegotiates, _Server7);
      return _createClass(VariantAlsoNegotiates);
    }(Server);
    Error.VariantAlsoNegotiates = VariantAlsoNegotiates;
    var InsufficientStorage = /*#__PURE__*/function (_Server8) {
      function InsufficientStorage(message) {
        _classCallCheck(this, InsufficientStorage);
        return _callSuper(this, InsufficientStorage, [message, 507]);
      }
      _inherits(InsufficientStorage, _Server8);
      return _createClass(InsufficientStorage);
    }(Server);
    Error.InsufficientStorage = InsufficientStorage;
    var LoopDetected = /*#__PURE__*/function (_Server9) {
      function LoopDetected(message) {
        _classCallCheck(this, LoopDetected);
        return _callSuper(this, LoopDetected, [message, 508]);
      }
      _inherits(LoopDetected, _Server9);
      return _createClass(LoopDetected);
    }(Server);
    Error.LoopDetected = LoopDetected;
    var NotExtended = /*#__PURE__*/function (_Server10) {
      function NotExtended(message) {
        _classCallCheck(this, NotExtended);
        return _callSuper(this, NotExtended, [message, 510]);
      }
      _inherits(NotExtended, _Server10);
      return _createClass(NotExtended);
    }(Server);
    Error.NotExtended = NotExtended;
    var NetworkAuthenticationRequired = /*#__PURE__*/function (_Server11) {
      function NetworkAuthenticationRequired(message) {
        _classCallCheck(this, NetworkAuthenticationRequired);
        return _callSuper(this, NetworkAuthenticationRequired, [message, 511]);
      }
      _inherits(NetworkAuthenticationRequired, _Server11);
      return _createClass(NetworkAuthenticationRequired);
    }(Server);
    Error.NetworkAuthenticationRequired = NetworkAuthenticationRequired;
    /**
     * For use to indicate the user made a mistake over the HTTP protocol.
     */
    var User = /*#__PURE__*/function (_Http3) {
      function User(message) {
        var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
        _classCallCheck(this, User);
        return _callSuper(this, User, [code, message]);
      }
      _inherits(User, _Http3);
      return _createClass(User);
    }(Http);
    Error.User = User;
    var BadRequest = /*#__PURE__*/function (_User) {
      function BadRequest(message) {
        _classCallCheck(this, BadRequest);
        return _callSuper(this, BadRequest, [message, 400]);
      }
      _inherits(BadRequest, _User);
      return _createClass(BadRequest);
    }(User);
    Error.BadRequest = BadRequest;
    var Unauthorized = /*#__PURE__*/function (_User2) {
      function Unauthorized(message) {
        _classCallCheck(this, Unauthorized);
        return _callSuper(this, Unauthorized, [message, 401]);
      }
      _inherits(Unauthorized, _User2);
      return _createClass(Unauthorized);
    }(User);
    Error.Unauthorized = Unauthorized;
    var PaymentRequired = /*#__PURE__*/function (_User3) {
      function PaymentRequired(message) {
        _classCallCheck(this, PaymentRequired);
        return _callSuper(this, PaymentRequired, [message, 402]);
      }
      _inherits(PaymentRequired, _User3);
      return _createClass(PaymentRequired);
    }(User);
    Error.PaymentRequired = PaymentRequired;
    var Forbidden = /*#__PURE__*/function (_User4) {
      function Forbidden(message) {
        _classCallCheck(this, Forbidden);
        return _callSuper(this, Forbidden, [message, 403]);
      }
      _inherits(Forbidden, _User4);
      return _createClass(Forbidden);
    }(User);
    Error.Forbidden = Forbidden;
    var NotFound = /*#__PURE__*/function (_User5) {
      function NotFound(message) {
        _classCallCheck(this, NotFound);
        return _callSuper(this, NotFound, [message, 404]);
      }
      _inherits(NotFound, _User5);
      return _createClass(NotFound);
    }(User);
    Error.NotFound = NotFound;
    var MethodNotAllowed = /*#__PURE__*/function (_User6) {
      function MethodNotAllowed(message) {
        _classCallCheck(this, MethodNotAllowed);
        return _callSuper(this, MethodNotAllowed, [message, 405]);
      }
      _inherits(MethodNotAllowed, _User6);
      return _createClass(MethodNotAllowed);
    }(User);
    Error.MethodNotAllowed = MethodNotAllowed;
    var NotAcceptable = /*#__PURE__*/function (_User7) {
      function NotAcceptable(message) {
        _classCallCheck(this, NotAcceptable);
        return _callSuper(this, NotAcceptable, [message, 406]);
      }
      _inherits(NotAcceptable, _User7);
      return _createClass(NotAcceptable);
    }(User);
    Error.NotAcceptable = NotAcceptable;
    var ProxyAuthenticationRequired = /*#__PURE__*/function (_User8) {
      function ProxyAuthenticationRequired(message) {
        _classCallCheck(this, ProxyAuthenticationRequired);
        return _callSuper(this, ProxyAuthenticationRequired, [message, 407]);
      }
      _inherits(ProxyAuthenticationRequired, _User8);
      return _createClass(ProxyAuthenticationRequired);
    }(User);
    Error.ProxyAuthenticationRequired = ProxyAuthenticationRequired;
    var RequestTimeout = /*#__PURE__*/function (_User9) {
      function RequestTimeout(message) {
        _classCallCheck(this, RequestTimeout);
        return _callSuper(this, RequestTimeout, [message, 408]);
      }
      _inherits(RequestTimeout, _User9);
      return _createClass(RequestTimeout);
    }(User);
    Error.RequestTimeout = RequestTimeout;
    var Conflict = /*#__PURE__*/function (_User10) {
      function Conflict(message) {
        _classCallCheck(this, Conflict);
        return _callSuper(this, Conflict, [message, 409]);
      }
      _inherits(Conflict, _User10);
      return _createClass(Conflict);
    }(User);
    Error.Conflict = Conflict;
    var Gone = /*#__PURE__*/function (_User11) {
      function Gone(message) {
        _classCallCheck(this, Gone);
        return _callSuper(this, Gone, [message, 410]);
      }
      _inherits(Gone, _User11);
      return _createClass(Gone);
    }(User);
    Error.Gone = Gone;
    var LengthRequired = /*#__PURE__*/function (_User12) {
      function LengthRequired(message) {
        _classCallCheck(this, LengthRequired);
        return _callSuper(this, LengthRequired, [message, 411]);
      }
      _inherits(LengthRequired, _User12);
      return _createClass(LengthRequired);
    }(User);
    Error.LengthRequired = LengthRequired;
    var PreconditionFailed = /*#__PURE__*/function (_User13) {
      function PreconditionFailed(message) {
        _classCallCheck(this, PreconditionFailed);
        return _callSuper(this, PreconditionFailed, [message, 412]);
      }
      _inherits(PreconditionFailed, _User13);
      return _createClass(PreconditionFailed);
    }(User);
    Error.PreconditionFailed = PreconditionFailed;
    var PayloadTooLarge = /*#__PURE__*/function (_User14) {
      function PayloadTooLarge(message) {
        _classCallCheck(this, PayloadTooLarge);
        return _callSuper(this, PayloadTooLarge, [message, 413]);
      }
      _inherits(PayloadTooLarge, _User14);
      return _createClass(PayloadTooLarge);
    }(User);
    Error.PayloadTooLarge = PayloadTooLarge;
    var UriTooLong = /*#__PURE__*/function (_User15) {
      function UriTooLong(message) {
        _classCallCheck(this, UriTooLong);
        return _callSuper(this, UriTooLong, [message, 414]);
      }
      _inherits(UriTooLong, _User15);
      return _createClass(UriTooLong);
    }(User);
    Error.UriTooLong = UriTooLong;
    var UnsupportedMediaType = /*#__PURE__*/function (_User16) {
      function UnsupportedMediaType(message) {
        _classCallCheck(this, UnsupportedMediaType);
        return _callSuper(this, UnsupportedMediaType, [message, 415]);
      }
      _inherits(UnsupportedMediaType, _User16);
      return _createClass(UnsupportedMediaType);
    }(User);
    Error.UnsupportedMediaType = UnsupportedMediaType;
    var RangeNotSatisfiable = /*#__PURE__*/function (_User17) {
      function RangeNotSatisfiable(message) {
        _classCallCheck(this, RangeNotSatisfiable);
        return _callSuper(this, RangeNotSatisfiable, [message, 416]);
      }
      _inherits(RangeNotSatisfiable, _User17);
      return _createClass(RangeNotSatisfiable);
    }(User);
    Error.RangeNotSatisfiable = RangeNotSatisfiable;
    var ExpectationFailed = /*#__PURE__*/function (_User18) {
      function ExpectationFailed(message) {
        _classCallCheck(this, ExpectationFailed);
        return _callSuper(this, ExpectationFailed, [message, 417]);
      }
      _inherits(ExpectationFailed, _User18);
      return _createClass(ExpectationFailed);
    }(User);
    Error.ExpectationFailed = ExpectationFailed;
    var Teapot = /*#__PURE__*/function (_User19) {
      function Teapot(message) {
        _classCallCheck(this, Teapot);
        return _callSuper(this, Teapot, [message, 418]);
      }
      _inherits(Teapot, _User19);
      return _createClass(Teapot);
    }(User);
    Error.Teapot = Teapot;
    var MisdirectedRequest = /*#__PURE__*/function (_User20) {
      function MisdirectedRequest(message) {
        _classCallCheck(this, MisdirectedRequest);
        return _callSuper(this, MisdirectedRequest, [message, 421]);
      }
      _inherits(MisdirectedRequest, _User20);
      return _createClass(MisdirectedRequest);
    }(User);
    Error.MisdirectedRequest = MisdirectedRequest;
    var UnprocessableContent = /*#__PURE__*/function (_User21) {
      function UnprocessableContent(message) {
        _classCallCheck(this, UnprocessableContent);
        return _callSuper(this, UnprocessableContent, [message, 422]);
      }
      _inherits(UnprocessableContent, _User21);
      return _createClass(UnprocessableContent);
    }(User);
    Error.UnprocessableContent = UnprocessableContent;
    var Locked = /*#__PURE__*/function (_User22) {
      function Locked(message) {
        _classCallCheck(this, Locked);
        return _callSuper(this, Locked, [message, 423]);
      }
      _inherits(Locked, _User22);
      return _createClass(Locked);
    }(User);
    Error.Locked = Locked;
    var FailedDependency = /*#__PURE__*/function (_User23) {
      function FailedDependency(message) {
        _classCallCheck(this, FailedDependency);
        return _callSuper(this, FailedDependency, [message, 424]);
      }
      _inherits(FailedDependency, _User23);
      return _createClass(FailedDependency);
    }(User);
    Error.FailedDependency = FailedDependency;
    var TooEarly = /*#__PURE__*/function (_User24) {
      function TooEarly(message) {
        _classCallCheck(this, TooEarly);
        return _callSuper(this, TooEarly, [message, 425]);
      }
      _inherits(TooEarly, _User24);
      return _createClass(TooEarly);
    }(User);
    Error.TooEarly = TooEarly;
    var UpgradeRequired = /*#__PURE__*/function (_User25) {
      function UpgradeRequired(message) {
        _classCallCheck(this, UpgradeRequired);
        return _callSuper(this, UpgradeRequired, [message, 426]);
      }
      _inherits(UpgradeRequired, _User25);
      return _createClass(UpgradeRequired);
    }(User);
    Error.UpgradeRequired = UpgradeRequired;
    var PreconditionRequired = /*#__PURE__*/function (_User26) {
      function PreconditionRequired(message) {
        _classCallCheck(this, PreconditionRequired);
        return _callSuper(this, PreconditionRequired, [message, 428]);
      }
      _inherits(PreconditionRequired, _User26);
      return _createClass(PreconditionRequired);
    }(User);
    Error.PreconditionRequired = PreconditionRequired;
    var TooManyRequests = /*#__PURE__*/function (_User27) {
      function TooManyRequests(message) {
        _classCallCheck(this, TooManyRequests);
        return _callSuper(this, TooManyRequests, [message, 429]);
      }
      _inherits(TooManyRequests, _User27);
      return _createClass(TooManyRequests);
    }(User);
    Error.TooManyRequests = TooManyRequests;
    var RequestHeaderFieldsTooLarge = /*#__PURE__*/function (_User28) {
      function RequestHeaderFieldsTooLarge(message) {
        _classCallCheck(this, RequestHeaderFieldsTooLarge);
        return _callSuper(this, RequestHeaderFieldsTooLarge, [message, 431]);
      }
      _inherits(RequestHeaderFieldsTooLarge, _User28);
      return _createClass(RequestHeaderFieldsTooLarge);
    }(User);
    Error.RequestHeaderFieldsTooLarge = RequestHeaderFieldsTooLarge;
    var UnavailableForLegalReasons = /*#__PURE__*/function (_User29) {
      function UnavailableForLegalReasons(message) {
        _classCallCheck(this, UnavailableForLegalReasons);
        return _callSuper(this, UnavailableForLegalReasons, [message, 451]);
      }
      _inherits(UnavailableForLegalReasons, _User29);
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
      return true;
    }
    Data.set = set;
    /**
     * Removes a value at {@link pieces} in {@link target}.
     * @param target The target object.
     * @param pieces The path of the value to remove from {@link target}.
     * @returns The removed value.
     */
    function remove(target, path) {
      var pieces = path === "" ? [] : path.split(".");
      var key = pieces.shift();
      if (key !== undefined) {
        if (pieces.length === 0) {
          var deleted = target[key];
          if (Array.isArray(target) && !isNaN(parseInt(key))) {
            target.splice(parseInt(key), 1);
          } else {
            delete target[key];
          }
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
     *
     * @note When performing deep copies, only "plain old data" will be processed. If a class instance is encountered, it WILL NOT
     * be copied!
     *
     * @returns A copy of {@link target}.
     */
    function clone(target) {
      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (deep) {
        if (_typeof(target) === "object" && target !== null) {
          if (Array.isArray(target)) {
            var result = [];
            var _iterator = _createForOfIteratorHelper(target),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var item = _step.value;
                result.push(clone(item, deep));
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            return result;
          } else if (target.constructor.name === "Object") {
            var _result = {};
            for (var key in target) {
              _result[key] = clone(target[key], deep);
            }
            return _result;
          }
        }
        return target;
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
        if (_typeof(property) === "object") {
          if (!isPlain(property, false)) {
            flattenedTarget[path] = property;
            return true;
          }
        } else {
          flattenedTarget[path] = property;
          return true;
        }
        return false;
      });
      return flattenedTarget;
    }
    Data.flatten = flatten;
    /**
     * Flattens an object's nested hierarchy.
     * I.E. { name: { first: "Jeremy", last: "Bankes" } } -> { "name.first": "Jeremy", "name.last": "Bankes" }
     *
     * @note This is an alternate implementation of {@link Data.flatten} that takes a simpler recursive approach over using {@link Data.walk}.
     *
     * @param target The target object.
     * @param keys
     * @returns A flattened version of {@link target} without any nesting.
     */
    function alternateFlatten(target) {
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var flattened = {};
      if (Array.isArray(target) || _typeof(target) === "object" && target !== null && target.constructor.name === "Object") {
        for (var key in target) {
          Object.assign(flattened, alternateFlatten(target[key], [].concat(_toConsumableArray(keys), [key])));
        }
      } else if (keys.length === 0) {
        return target;
      } else {
        var path = keys.join(".");
        flattened[path] = target;
      }
      return flattened;
    }
    Data.alternateFlatten = alternateFlatten;
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
        }
        return true;
      } else {
        return typeof target === "string" || typeof target === "number" || typeof target === "boolean" || typeof target === "undefined" || typeof target === "bigint" || target === null;
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
        var lastValue = values[values.length - 1];
        return values.slice(0, -1).join(delimiter) + lastDelimiter + lastValue;
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
        throw new exports.Error.Fatal("Can only determine a number suffix for integers. Got \"".concat(value, "\"."));
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
          throw new exports.Error.Fatal("Unrecognized date format ".concat(format, "."));
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
        default:
          throw new exports.Error.Fatal("Unrecognized date format \"".concat(format, "\"."));
      }
    }
    Text.time = time;
    /**
     * Gets the name of the month of the year from {@link date}.
     * @param date The date to get the month from.
     * @returns The name of the month of the year.
     */
    function month(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "pretty";
      switch (format) {
        case "form":
          return "".concat(date.getFullYear().toString().padStart(4, "0"), "-").concat((date.getMonth() + 1).toString().padStart(2, "0"));
        case "pretty":
          return date.toLocaleDateString(Text.defaults.locale, {
            month: "long"
          });
        default:
          throw new exports.Error.Fatal("Unrecognized date format \"".concat(format, "\"."));
      }
    }
    Text.month = month;
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
       * Converts a month string into a date object.
       * @note A month string is the format of the value associated with a type="month" HTML input `YYYY-MM`.
       * @param monthString The string to parse into a date.
       * @returns The parsed date.
       */
      function month(monthString) {
        var match = monthString.match(/([0-9]{4})-([0-9]{2})/);
        if (match === null) {
          return new Date(NaN);
        }
        var _match = _slicedToArray(match, 3);
          _match[0];
          var year = _match[1],
          month = _match[2];
        return new Date(parseInt(year), parseInt(month) - 1);
      }
      Parse.month = month;
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

  exports.Typing = void 0;
  (function (Typing) {
    function ArrayLiteral() {
      for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }
      return items;
    }
    Typing.ArrayLiteral = ArrayLiteral;
    function Tuple() {
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }
      return items;
    }
    Typing.Tuple = Tuple;
    function makeLiteral(value) {
      return value;
    }
    Typing.makeLiteral = makeLiteral;
    /**
     * Allows creation of an object that contains strongly typed specific primitive literals.
     *
     * @example
     * ```ts
     * const person = {
     *     name: "Jeremy",
     *     age: 23,
     *     hair: {
     *         color: "black",
     *         bald: false
     *     }
     * };
     * ```
     *
     * With the above object definition, TypeScript assumes the type to be:
     *
     * ```ts
     * const person: {
     *     name: string;
     *     age: number;
     *     hair: {
     *         color: string;
     *         bald: boolean;
     *     };
     * }
     * ```
     *
     * Alternatively,
     *
     * ```ts
     * const verySpecificPerson = FreeCoreToolbox.withLiterals((literal) => ({
     *     name: literal("Jeremy"),
     *     age: literal(23),
     *     hair: {
     *         color: literal("black"),
     *         bald: literal(false)
     *     }
     * }));
     * ```
     *
     * With the above object definition, TypeScript assumes the type to be:
     *
     * ```ts
     * const verySpecificPerson: {
     *     name: "Jeremy";
     *     age: 23;
     *     hair: {
     *         color: "black";
     *         bald: false;
     *     };
     * }
     * ```
     *
     * @note This function only matters in a TypeScript context.
     *
     * @param builder An object builder callback that returns an object with typed literals.
     *
     * @returns An object with specifically selected primitive literals.
     */
    function withLiterals(builder) {
      return builder(function (value) {
        return value;
      });
    }
    Typing.withLiterals = withLiterals;
  })(exports.Typing || (exports.Typing = {}));

  exports.Clock = Clock;
  exports.Color = Color;

}));
