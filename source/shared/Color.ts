export type Rgba = readonly [number, number, number, number];
export type ColorSource = number | Rgba | Color;

export class Color {

    private _hex: bigint;
    private _rgba: Rgba;

    private constructor(hex: bigint) {
        this._hex = hex;
        this._rgba = Color._getRgba(hex);
    }

    public get rgba() { return this._rgba; }
    public get hex() { return Number(this._hex); }
    public set hex(value: number) {
        this._hex = BigInt(value);
        this._rgba = Color._getRgba(this._hex);
    }

    public get red() { return this.rgba[0]; }
    public get green() { return this.rgba[1]; }
    public get blue() { return this.rgba[2]; }
    public get alpha() { return this.rgba[3] }

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

    public static getRgba(hex: number) {
        return Color._getRgba(BigInt(hex));
    }

    public static getHex(rgba: Rgba) {
        return Number(Color._getHex(rgba));
    }

    private static _getRgba(hex: bigint): Rgba {
        return [
            Number((hex >> 8n * 3n) & 0xFFn),
            Number((hex >> 8n * 2n) & 0xFFn),
            Number((hex >> 8n * 1n) & 0xFFn),
            Number((hex >> 8n * 0n) & 0xFFn)
        ];
    }

    private static _getHex(rgba: Rgba) {
        return (
            BigInt(rgba[0]) << (8n * 3n) |
            BigInt(rgba[1]) << (8n * 2n) |
            BigInt(rgba[2]) << (8n * 1n) |
            BigInt(rgba[3]) << (8n * 0n)
        );
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