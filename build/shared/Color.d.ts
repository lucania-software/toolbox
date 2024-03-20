export type Rgba = readonly [number, number, number, number];
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
     * Gets this color's hex value, including alpha channel (i.e. 0xFF00FFFF)
     */
    get hex(): number;
    /**
     * Sets this color's hex value, including alpha channel (i.e. 0xFF00FFFF)
     */
    set hex(value: number);
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
    static getRgba(hex: number): Rgba;
    static getHex(rgba: Rgba): number;
    private static _getRgba;
    private static _getHex;
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
