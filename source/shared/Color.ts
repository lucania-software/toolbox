export type Rgba = readonly [number, number, number, number];
export type Hsl = readonly [number, number, number];
export type ColorSource = number | Rgba | Color;

export class Color {

    private _hex: bigint;
    private _rgba: Rgba;
    private _hsl: Hsl;

    private constructor(hex: bigint) {
        this._hex = hex;
        this._rgba = Color._getRgba(hex);
        this._hsl = Color.getHsl(this.rgba);
    }

    /**
     * Gets this color's RGBA value as a tuple, on a scale from 0 to 255.
     */
    public get rgba() { return this._rgba; }

    /**
     * Gets this color's RGBA value as a tuple, on a scale from 0 to 1.
     */
    public get normalizedRgba(): Rgba {
        return Color.getNormalizedRgba(this.rgba);
    };

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
        return this._hsl;
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

    public static getRgba(color: ColorSource): Rgba {
        if (typeof color === "number") {
            return Color._getRgba(BigInt(color));
        } else if (color instanceof Color) {
            return color.rgba;
        } else {
            return color;
        }
    }

    public static getHex(color: ColorSource): number {
        if (typeof color === "number") {
            return color;
        } else if (color instanceof Color) {
            return color.hex;
        } else {
            return Number(Color._getHex(color));
        }
    }

    public static getNormalizedRgba(color: ColorSource): Rgba {
        if (typeof color === "number") {
            return this.getNormalizedRgba(Color.getRgba(color));
        } else if (color instanceof Color) {
            return this.getNormalizedRgba(color.rgba);
        } else {
            const [red, green, blue, alpha] = color;
            return [
                red / 255,
                green / 255,
                blue / 255,
                alpha / 255
            ];
        }
    }

    public static getHsl(color: ColorSource): Hsl {
        if (typeof color === "number") {
            return Color.getHsl(Color.getRgba(color));
        } else if (color instanceof Color) {
            return Color.getHsl(color.rgba);
        } else {
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