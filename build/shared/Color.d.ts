export type Rgba = readonly [number, number, number, number];
export type ColorSource = number | Rgba | Color;
export declare class Color {
    private _hex;
    private _rgba;
    private constructor();
    get rgba(): Rgba;
    get hex(): number;
    set hex(value: number);
    get red(): number;
    get green(): number;
    get blue(): number;
    get alpha(): number;
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
