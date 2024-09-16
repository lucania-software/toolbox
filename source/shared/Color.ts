export type Rgba = readonly [number, number, number, number];
export type Hsl = readonly [number, number, number];
export type Cielab = readonly [number, number, number];
export type ColorSource = number | Rgba | Color;

export class Color {

    private _hex: bigint;
    private _rgba: Rgba;

    private constructor(hex: bigint) {
        this._hex = hex;
        this._rgba = Color._getRgba(hex);
    }

    /**
     * Gets this color's RGBA value as a tuple, on a scale from 0 to 255.
     */
    public get rgba() { return this._rgba; }

    /**
     * Gets this color's RGBA value as a tuple, on a scale from 0 to 1.
     */
    public get normalizedRgba(): Rgba {
        return [
            this.normalizedRed,
            this.normalizedGreen,
            this.normalizedBlue,
            this.normalizedAlpha
        ];
    };

    /**
     * Gets this color's CIELAB value as a tuple.
     * https://en.wikipedia.org/wiki/CIELAB_color_space
     */
    public get cielab(): Cielab {
        let [red, green, blue] = this.normalizedRgba;
        red = (red > 0.04045) ? Math.pow((red + 0.055) / 1.055, 2.4) : red / 12.92;
        green = (green > 0.04045) ? Math.pow((green + 0.055) / 1.055, 2.4) : green / 12.92;
        blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / 1.055, 2.4) : blue / 12.92;
        let x = (red * 0.4124 + green * 0.3576 + blue * 0.1805) / 0.95047;
        let y = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 1.00000;
        let z = (red * 0.0193 + green * 0.1192 + blue * 0.9505) / 1.08883;
        x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
        y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
        z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
        return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
    }

    /**
     * Gets this color's hex value, including alpha channel (i.e. 0xFF00FFFF)
     */
    public get hex() { return Number(this._hex); }

    /**
     * Sets this color's hex value, including alpha channel (i.e. 0xFF00FFFF)
     */
    public set hex(value: number) {
        this._hex = BigInt(value);
        this._rgba = Color._getRgba(this._hex);
    }

    /**
     * Gets this color's hsl (Hue, Saturation, Lightness) value, excluding the alpha channel.
     * @note The hue value is in the range from 0 to 360 degrees.
     * @note The saturation value is in the range of 0 to 100.
     * @note the lightness value is in the range of 0 to 100.
     */
    public get hsl() {
        return Color.getHsl(this);
    }

    /**
     * The red channel of this color, on a scale from 0 to 255
     */
    public get red() { return this.rgba[0]; }
    /**
     * The green channel of this color, on a scale from 0 to 255
     */
    public get green() { return this.rgba[1]; }
    /**
     * The blue channel of this color, on a scale from 0 to 255
     */
    public get blue() { return this.rgba[2]; }
    /**
     * The alpha channel of this color, on a scale from 0 to 255
     */
    public get alpha() { return this.rgba[3]; }

    /**
     * The red channel of this color, on a scale from 0 to 1
     */
    public get normalizedRed() { return this.red / 255; }
    /**
     * The green channel of this color, on a scale from 0 to 1
     */
    public get normalizedGreen() { return this.green / 255; }
    /**
     * The blue channel of this color, on a scale from 0 to 1
     */
    public get normalizedBlue() { return this.blue / 255; }
    /**
     * The alpha channel of this color, on a scale from 0 to 1
     */
    public get normalizedAlpha() { return this.alpha / 255; }

    public clone() {
        return new Color(this._hex);
    }

    public equals(color: any) {
        return color instanceof Color && color._hex === this._hex;
    }

    /**
     * Mixes two colors together.
     * @param source The source of the color to mix.
     * @param weight The normalized weight from 0 to 1 of the mixture. 0 will result in all this color, 1 will result in all of the color defined by "source". Defaults to 0.5.
     */
    public mix(source: ColorSource, weight: number = 0.5) {
        const color = Color.from(source);
        this._rgba = [
            this.red + (color.red - this.red) * weight,
            this.green + (color.green - this.green) * weight,
            this.blue + (color.blue - this.blue) * weight,
            this.alpha + (color.alpha - this.alpha) * weight
        ];
    }

    public chooseFromPalette(palette: Color[]) {
        const [color] = palette;
        const result = palette.reduce<{ color: Color, delta?: number }>((accumulator, color) => {
            const delta = Color.getCielabDelta(this, color);
            return accumulator.delta === undefined || delta < accumulator.delta ? { color, delta } : accumulator;
        }, { color });
        return result.color;
    }

    public toString() {
        return `[(r: ${this.red}, g: ${this.green}, b: ${this.blue}), (#${this.hex.toString(16).padStart(8, "0")})]`;
    }

    public static getRgba(color: ColorSource): Rgba {
        return Color.from(color).rgba;
    }

    public static getHex(color: ColorSource): number {
        return Color.from(color).hex;
    }

    public static getNormalizedRgba(color: ColorSource): Rgba {
        return Color.from(color).normalizedRgba;
    }

    public static getHsl(color: ColorSource): Hsl {
        const [red, green, blue] = Color.getNormalizedRgba(color);
        const lightness = Math.max(red, green, blue);
        const saturation = lightness - Math.min(red, green, blue);
        const hue = (
            saturation ? (
                lightness === red ? (
                    (green - blue) / saturation
                ) : (
                    lightness === green ? (
                        2 + (blue - red) / saturation
                    ) : (
                        4 + (red - green) / saturation
                    )
                )
            ) : (
                0
            )
        );
        return [
            60 * hue < 0 ? 60 * hue + 360 : 60 * hue,
            100 * (saturation ? (
                lightness <= 0.5 ? (
                    saturation / (2 * lightness - saturation)
                ) : (
                    saturation / (2 - (2 * lightness - saturation))
                )
            ) : 0),
            (100 * (2 * lightness - saturation)) / 2,
        ];
    }

    /**
     * Gets the difference between two colors via Cielab ΔE*.
     * https://en.wikipedia.org/wiki/Color_difference#CIELAB_%CE%94E*
     * 
     * @param colorA 
     * @param colorB 
     * @returns 
     */
    public static getCielabDelta(colorA: ColorSource, colorB: ColorSource) {
        colorA = Color.from(colorA);
        colorB = Color.from(colorB);
        const labA = colorA.cielab;
        const labB = colorB.cielab;
        const deltaL = labA[0] - labB[0];
        const deltaA = labA[1] - labB[1];
        const deltaB = labA[2] - labB[2];
        const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
        const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
        const deltaC = c1 - c2;
        let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
        deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
        const sc = 1.0 + 0.045 * c1;
        const sh = 1.0 + 0.015 * c1;
        const deltaLKlsl = deltaL / (1.0);
        const deltaCkcsc = deltaC / (sc);
        const deltaHkhsh = deltaH / (sh);
        const i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
        return i < 0 ? 0 : Math.sqrt(i);
    }

    private static _getHex(rgba: Rgba) {
        return (
            BigInt(rgba[0]) << (8n * 3n) |
            BigInt(rgba[1]) << (8n * 2n) |
            BigInt(rgba[2]) << (8n * 1n) |
            BigInt(rgba[3]) << (8n * 0n)
        );
    }

    public static _getRgba(hex: bigint): Rgba {
        return [
            Number((hex >> 8n * 3n) & 0xFFn),
            Number((hex >> 8n * 2n) & 0xFFn),
            Number((hex >> 8n * 1n) & 0xFFn),
            Number((hex >> 8n * 0n) & 0xFFn)
        ];
    }

    public static from(source: ColorSource): Color {
        if (source instanceof Color) {
            return source.clone();
        } else if (typeof source === "number") {
            return new Color(BigInt(source));
        } else {
            return new Color(Color._getHex(source));
        }
    }

    public static readonly BLACK = Color.from(0x000000FF);
    public static readonly WHITE = Color.from(0xFFFFFFFF);
    public static readonly GRAY = Color.from(0x808080FF);

    public static readonly RED = Color.from(0xFF0000FF);
    public static readonly GREEN = Color.from(0x00FF00FF);
    public static readonly BLUE = Color.from(0x0000FFFF);

    public static readonly CYAN = Color.from(0x00FFFFFF);
    public static readonly MAGENTA = Color.from(0xFF00FFFF);
    public static readonly YELLOW = Color.from(0xFFFF00FF);

}