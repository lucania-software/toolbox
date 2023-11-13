/**
 * Used for printing to the console in Color! :D
 */
export declare namespace ConsoleColor {
    /**
     * Special formatting codes.
     */
    namespace Special {
        const reset = "\u001B[0m";
        const bright = "\u001B[1m";
        const dim = "\u001B[2m";
        const underscore = "\u001B[4m";
        const blink = "\u001B[5m";
        const reverse = "\u001B[7m";
        const hidden = "\u001B[8m";
    }
    /**
     * Foreground color codes.
     */
    namespace Fore {
        const black = "\u001B[30m";
        const red = "\u001B[31m";
        const green = "\u001B[32m";
        const yellow = "\u001B[33m";
        const blue = "\u001B[34m";
        const magenta = "\u001B[35m";
        const cyan = "\u001B[36m";
        const white = "\u001B[37m";
        const gray = "\u001B[90m";
    }
    /**
     * Background color codes.
     */
    namespace Back {
        const black = "\u001B[40m";
        const red = "\u001B[41m";
        const green = "\u001B[42m";
        const yellow = "\u001B[43m";
        const blue = "\u001B[44m";
        const magenta = "\u001B[45m";
        const cyan = "\u001B[46m";
        const white = "\u001B[47m";
        const gray = "\u001B[100m";
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
    const Common: {
        reset: "\u001B[0m";
        bright: "\u001B[1m";
        dim: "\u001B[2m";
        underscore: "\u001B[4m";
        blink: "\u001B[5m";
        reverse: "\u001B[7m";
        hidden: "\u001B[8m";
        black: "\u001B[30m";
        red: "\u001B[31m";
        green: "\u001B[32m";
        yellow: "\u001B[33m";
        blue: "\u001B[34m";
        magenta: "\u001B[35m";
        cyan: "\u001B[36m";
        white: "\u001B[37m";
        gray: "\u001B[90m";
    };
}
