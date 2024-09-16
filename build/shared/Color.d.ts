export type Rgba = readonly [number, number, number, number];
export type Hsl = readonly [number, number, number];
export type Cielab = readonly [number, number, number];
export type ColorSource = number | Rgba | Color;
export declare class Color {
    private _hex;
    private _rgba;
    private constructor();
    /**
     * Gets this color's RGBA value as a tuple, on a scale from 0 to 255.
     */
    get rgba(): Rgba;
    /**
     * Gets this color's RGBA value as a tuple, on a scale from 0 to 1.
     */
    get normalizedRgba(): Rgba;
    /**
     * Gets this color's CIELAB value as a tuple.
     * https://en.wikipedia.org/wiki/CIELAB_color_space
     */
    get cielab(): Cielab;
    /**
     * Gets this color's hex value, including alpha channel (i.e. 0xFF00FFFF)
     */
    get hex(): number;
    /**
     * Sets this color's hex value, including alpha channel (i.e. 0xFF00FFFF)
     */
    set hex(value: number);
    /**
     * Gets this color's hsl (Hue, Saturation, Lightness) value, excluding the alpha channel.
     * @note The hue value is in the range from 0 to 360 degrees.
     * @note The saturation value is in the range of 0 to 100.
     * @note the lightness value is in the range of 0 to 100.
     */
    get hsl(): Hsl;
    /**
     * The red channel of this color, on a scale from 0 to 255
     */
    get red(): number;
    /**
     * The green channel of this color, on a scale from 0 to 255
     */
    get green(): number;
    /**
     * The blue channel of this color, on a scale from 0 to 255
     */
    get blue(): number;
    /**
     * The alpha channel of this color, on a scale from 0 to 255
     */
    get alpha(): number;
    /**
     * The red channel of this color, on a scale from 0 to 1
     */
    get normalizedRed(): number;
    /**
     * The green channel of this color, on a scale from 0 to 1
     */
    get normalizedGreen(): number;
    /**
     * The blue channel of this color, on a scale from 0 to 1
     */
    get normalizedBlue(): number;
    /**
     * The alpha channel of this color, on a scale from 0 to 1
     */
    get normalizedAlpha(): number;
    clone(): Color;
    equals(color: any): boolean;
    /**
     * Mixes two colors together.
     * @param source The source of the color to mix.
     * @param weight The normalized weight from 0 to 1 of the mixture. 0 will result in all this color, 1 will result in all of the color defined by "source". Defaults to 0.5.
     */
    mix(source: ColorSource, weight?: number): void;
    chooseFromPalette(palette: Color[]): Color;
    toString(): string;
    static getRgba(color: ColorSource): Rgba;
    static getHex(color: ColorSource): number;
    static getNormalizedRgba(color: ColorSource): Rgba;
    static getHsl(color: ColorSource): Hsl;
    /**
     * Gets the difference between two colors via Cielab ΔE*.
     * https://en.wikipedia.org/wiki/Color_difference#CIELAB_%CE%94E*
     *
     * @param colorA
     * @param colorB
     * @returns
     */
    static getCielabDelta(colorA: ColorSource, colorB: ColorSource): number;
    private static _getHex;
    static _getRgba(hex: bigint): Rgba;
    static from(source: ColorSource): Color;
    static readonly BLACK: Color;
    static readonly WHITE: Color;
    static readonly GRAY: Color;
    static readonly RED: Color;
    static readonly GREEN: Color;
    static readonly BLUE: Color;
    static readonly CYAN: Color;
    static readonly MAGENTA: Color;
    static readonly YELLOW: Color;
}
