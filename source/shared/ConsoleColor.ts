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

}