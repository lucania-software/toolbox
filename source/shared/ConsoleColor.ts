import { Color, ColorSource } from "./Color"

/**
 * Used for printing to the console in Color! :D
 */
export namespace ConsoleColor {

    /**
     * Special formatting codes.
     */
    export namespace Special {
        export const reset = "\x1b[0m"
        export const bright = "\x1b[1m"
        export const dim = "\x1b[2m"
        export const underscore = "\x1b[4m"
        export const blink = "\x1b[5m"
        export const reverse = "\x1b[7m"
        export const hidden = "\x1b[8m"
    }

    /**
     * Foreground color codes.
     */
    export namespace Fore {
        export const black = "\x1b[30m"
        export const red = "\x1b[31m"
        export const green = "\x1b[32m"
        export const yellow = "\x1b[33m"
        export const blue = "\x1b[34m"
        export const magenta = "\x1b[35m"
        export const cyan = "\x1b[36m"
        export const white = "\x1b[37m"
        export const gray = "\x1b[90m"
    }

    /**
     * Background color codes.
     */
    export namespace Back {
        export const black = "\x1b[40m"
        export const red = "\x1b[41m"
        export const green = "\x1b[42m"
        export const yellow = "\x1b[43m"
        export const blue = "\x1b[44m"
        export const magenta = "\x1b[45m"
        export const cyan = "\x1b[46m"
        export const white = "\x1b[47m"
        export const gray = "\x1b[100m"
    }

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
    export const Common = { ...Fore, ...Special };

    export function closest(color: ColorSource) {
        const closestColor = Color.from(color).chooseFromPalette(ConsoleColor.SupportedColors);
        return `\x1B[38;5;${ConsoleColor.SupportedColors.indexOf(closestColor)}m`;
    }

    export const SupportedColors = [
        0X000000FF, 0XCD3131FF, 0X0DBC79FF, 0XE5E510FF, 0X2472C8FF, 0XBC3FBCFF, 0X11A8CDFF, 0XE5E5E5FF,
        0X666666FF, 0XF14C4CFF, 0X23D18BFF, 0XF5F543FF, 0X3B8EEAFF, 0XD670D6FF, 0X29B8DBFF, 0XE5E5E5FF,
        0X000000FF, 0X00005FFF, 0X000087FF, 0X0000AFFF, 0X0000D7FF, 0X0000FFFF, 0X005F00FF, 0X005F5FFF,
        0X005F87FF, 0X005FAFFF, 0X005FD7FF, 0X005FFFFF, 0X008700FF, 0X00875FFF, 0X008787FF, 0X0087AFFF,
        0X0087D7FF, 0X0087FFFF, 0X00AF00FF, 0X00AF5FFF, 0X00AF87FF, 0X00AFAFFF, 0X00AFD7FF, 0X00AFFFFF,
        0X00D700FF, 0X00D75FFF, 0X00D787FF, 0X00D7AFFF, 0X00D7D7FF, 0X00D7FFFF, 0X00FF00FF, 0X00FF5FFF,
        0X00FF87FF, 0X00FFAFFF, 0X00FFD7FF, 0X00FFFFFF, 0X5F0000FF, 0X5F005FFF, 0X5F0087FF, 0X5F00AFFF,
        0X5F00D7FF, 0X5F00FFFF, 0X5F5F00FF, 0X5F5F5FFF, 0X5F5F87FF, 0X5F5FAFFF, 0X5F5FD7FF, 0X5F5FFFFF,
        0X5F8700FF, 0X5F875FFF, 0X5F8787FF, 0X5F87AFFF, 0X5F87D7FF, 0X5F87FFFF, 0X5FAF00FF, 0X5FAF5FFF,
        0X5FAF87FF, 0X5FAFAFFF, 0X5FAFD7FF, 0X5FAFFFFF, 0X5FD700FF, 0X5FD75FFF, 0X5FD787FF, 0X5FD7AFFF,
        0X5FD7D7FF, 0X5FD7FFFF, 0X5FFF00FF, 0X5FFF5FFF, 0X5FFF87FF, 0X5FFFAFFF, 0X5FFFD7FF, 0X5FFFFFFF,
        0X870000FF, 0X87005FFF, 0X870087FF, 0X8700AFFF, 0X8700D7FF, 0X8700FFFF, 0X875F00FF, 0X875F5FFF,
        0X875F87FF, 0X875FAFFF, 0X875FD7FF, 0X875FFFFF, 0X878700FF, 0X87875FFF, 0X878787FF, 0X8787AFFF,
        0X8787D7FF, 0X8787FFFF, 0X87AF00FF, 0X87AF5FFF, 0X87AF87FF, 0X87AFAFFF, 0X87AFD7FF, 0X87AFFFFF,
        0X87D700FF, 0X87D75FFF, 0X87D787FF, 0X87D7AFFF, 0X87D7D7FF, 0X87D7FFFF, 0X87FF00FF, 0X87FF5FFF,
        0X87FF87FF, 0X87FFAFFF, 0X87FFD7FF, 0X87FFFFFF, 0XAF0000FF, 0XAF005FFF, 0XAF0087FF, 0XAF00AFFF,
        0XAF00D7FF, 0XAF00FFFF, 0XAF5F00FF, 0XAF5F5FFF, 0XAF5F87FF, 0XAF5FAFFF, 0XAF5FD7FF, 0XAF5FFFFF,
        0XAF8700FF, 0XAF875FFF, 0XAF8787FF, 0XAF87AFFF, 0XAF87D7FF, 0XAF87FFFF, 0XAFAF00FF, 0XAFAF5FFF,
        0XAFAF87FF, 0XAFAFAFFF, 0XAFAFD7FF, 0XAFAFFFFF, 0XAFD700FF, 0XAFD75FFF, 0XAFD787FF, 0XAFD7AFFF,
        0XAFD7D7FF, 0XAFD7FFFF, 0XAFFF00FF, 0XAFFF5FFF, 0XAFFF87FF, 0XAFFFAFFF, 0XAFFFD7FF, 0XAFFFFFFF,
        0XD70000FF, 0XD7005FFF, 0XD70087FF, 0XD700AFFF, 0XD700D7FF, 0XD700FFFF, 0XD75F00FF, 0XD75F5FFF,
        0XD75F87FF, 0XD75FAFFF, 0XD75FD7FF, 0XD75FFFFF, 0XD78700FF, 0XD7875FFF, 0XD78787FF, 0XD787AFFF,
        0XD787D7FF, 0XD787FFFF, 0XD7AF00FF, 0XD7AF5FFF, 0XD7AF87FF, 0XD7AFAFFF, 0XD7AFD7FF, 0XD7AFFFFF,
        0XD7D700FF, 0XD7D75FFF, 0XD7D787FF, 0XD7D7AFFF, 0XD7D7D7FF, 0XD7D7FFFF, 0XD7FF00FF, 0XD7FF5FFF,
        0XD7FF87FF, 0XD7FFAFFF, 0XD7FFD7FF, 0XD7FFFFFF, 0XFF0000FF, 0XFF005FFF, 0XFF0087FF, 0XFF00AFFF,
        0XFF00D7FF, 0XFF00FFFF, 0XFF5F00FF, 0XFF5F5FFF, 0XFF5F87FF, 0XFF5FAFFF, 0XFF5FD7FF, 0XFF5FFFFF,
        0XFF8700FF, 0XFF875FFF, 0XFF8787FF, 0XFF87AFFF, 0XFF87D7FF, 0XFF87FFFF, 0XFFAF00FF, 0XFFAF5FFF,
        0XFFAF87FF, 0XFFAFAFFF, 0XFFAFD7FF, 0XFFAFFFFF, 0XFFD700FF, 0XFFD75FFF, 0XFFD787FF, 0XFFD7AFFF,
        0XFFD7D7FF, 0XFFD7FFFF, 0XFFFF00FF, 0XFFFF5FFF, 0XFFFF87FF, 0XFFFFAFFF, 0XFFFFD7FF, 0XFFFFFFFF,
        0X080808FF, 0X121212FF, 0X1C1C1CFF, 0X262626FF, 0X303030FF, 0X3A3A3AFF, 0X444444FF, 0X4E4E4EFF,
        0X585858FF, 0X626262FF, 0X6C6C6CFF, 0X767676FF, 0X808080FF, 0X8A8A8AFF, 0X949494FF, 0X9E9E9EFF,
        0XA8A8A8FF, 0XB2B2B2FF, 0XBCBCBCFF, 0XC6C6C6FF, 0XD0D0D0FF, 0XDADADAFF, 0XE4E4E4FF, 0XEEEEEEFF
    ].map((hex) => Color.from(hex));

}