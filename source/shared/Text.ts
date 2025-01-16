import { Error } from "./Error";

type TextDefaults = {
    locale: Intl.LocalesArgument,
    dateFormat: Intl.DateTimeFormatOptions,
    timeFormat: Intl.DateTimeFormatOptions,
    currency: string // https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list_one.xml
};

type Precision = "week" | "day" | "hour" | "minute" | "second" | "millisecond";

/**
 * A String manipulation module used for formatting and interpreting text. 
 */
export namespace Text {

    /** 
     * The default options for text manipulations and formatting
     */
    export const defaults: TextDefaults = {
        locale: "en-CA",
        dateFormat: { dateStyle: "long" },
        timeFormat: { timeStyle: "short" },
        currency: "CAD"
    }

    /**
     * Converts {@link string} to a url-slug. Note that this function treats camel casing as separate words. Convert {@link string} to lower case first to avoid this functionality.
     * @param string The text to turn into a slug
     * @returns a-slug-string
     */
    export function slug(string: string) {
        string = string.replace(/[^a-z0-9]+/gi, "-");
        string = string.replace(/([a-z])([A-Z])/g, "$1-$2");
        string = string.replace(/^-|-$/g, "");
        return string.toLowerCase();
    }

    /**
     * Converts {@link string} to camelCase.
     * @param string The text to turn into camel case.
     * @returns aCamelCaseString
     */
    export function camel(string: string) {
        string = string.replace(/[^A-Za-z0-9]+/g, " ").trim().toLowerCase();
        string = string.split(/ /g).map((piece, index) => {
            if (index > 0) {
                return piece.charAt(0).toUpperCase() + piece.substring(1);
            }
            return piece;
        }).join("");
        return string;
    }

    /**
     * Converts string to Title Case
     * @param string The text to turn into title case.
     * @returns A Title Case String
     */
    export function title(string: string) {
        return string.toLowerCase().replace(/(?:^|\s)[a-z]/g, (match) => match.toUpperCase());
    }

    /**
     * Wraps 'string' in quotes.
     * @param string A string to wrap in quotes.
     * @param quote The quote string.
     * @returns A string wrapped in quotes.
     */
    export function quote(string: string, quote: string = "\"") {
        return quote + string + quote;
    }

    /**
     * Removes the quotes from a given string.
     * @param string A string to remove the quotes from.
     * @param quote The quote string.
     * @returns `string` without quotes.
     */
    export function unquote(string: string, quote: string = "\"") {
        if (string.startsWith(quote) && string.endsWith(quote)) {
            return string.substring(quote.length, string.length - quote.length);
        }
        return string;
    }

    /**
     * Creates an English readable list from {@link values}.
     * @param values A list of values to make a pretty list out of.
     * @returns A list deliminated by commas with the word "and" separating the last element.
     */
    export function list(values: string[], lastDelimiter: string = " and ", delimiter: string = ", ") {
        if (values.length > 1) {
            const lastValue = values[values.length - 1];
            return values.slice(0, -1).join(delimiter) + lastDelimiter + lastValue;
        } else {
            return values.join(delimiter);
        }
    }

    /**
     * Makes {@link singular} plural.
     * @param singular The singular word to make plural.
     * @param count The number of {@link singular}. Not 1 to pluralize.
     * @returns The plural of {@link singular}.
     */
    export function plural(singular: string, count: number = 0) {
        if (count == 1) {
            return singular;
        }
        const plural = {
            "(quiz)$": "$1zes", "^(ox)$": "$1en", "([m|l])ouse$": "$1ice", "(matr|vert|ind)ix|ex$": "$1ices", "(x|ch|ss|sh)$": "$1es",
            "([^aeiouy]|qu)y$": "$1ies", "(hive)$": "$1s", "(?:([^f])fe|([lr])f)$": "$1$2ves", "(shea|lea|loa|thie)f$": "$1ves", "sis$": "ses",
            "([ti])um$": "$1a", "(tomat|potat|ech|her|vet)o$": "$1oes", "(bu)s$": "$1ses", "(alias)$": "$1es", "(octop)us$": "$1i", "(ax|test)is$": "$1es",
            "(us)$": "$1es", "([^s]+)$": "$1s"
        };
        const irregular = { "move": "moves", "foot": "feet", "goose": "geese", "sex": "sexes", "child": "children", "man": "men", "tooth": "teeth", "person": "people" };
        const uncountable = ["sheep", "fish", "deer", "moose", "series", "species", "money", "rice", "information", "equipment"];
        if (uncountable.indexOf(singular.toLowerCase()) >= 0) {
            return singular;
        }
        for (const word in irregular) {
            const pattern = new RegExp(word + "$", "i");
            const replace = irregular[word as never];
            if (pattern.test(singular)) {
                return singular.replace(pattern, replace);
            }
        }
        for (const expression in plural) {
            const pattern = new RegExp(expression, "i");
            if (pattern.test(singular)) {
                return singular.replace(pattern, plural[expression as never]);
            }
        }
        return singular;
    }

    /**
     * Adds a number suffix to "value". (-st, -nd, -rd or -th)
     * @param value The number to add a suffix to.
     * @returns A string of "value" with a number suffix.
     */
    export function integerSuffix(value: number): string {
        if (value % 1 !== 0) {
            throw new Error.Fatal(`Can only determine a number suffix for integers. Got "${value}".`);
        }
        const string = value.toFixed(0);
        if (value === 13) {
            return string + "th";
        }
        switch (value % 10) {
            case 1: return string + "st";
            case 2: return string + "nd";
            case 3: return string + "rd";
            default: return string + "th";
        }
    }

    /**
     * Converts a date object into strings of various formats.
     * @param date The date to convert.
     * @param format The format to use. ("iso", "form", "pretty")
     * @returns A formatted date string.
     * 
     * @note The "pretty" will use {@link Text.defaults.locale} and {@link Text.defaults.dateFormat}
     */
    export function date(date: Date, format: "iso" | "form" | "pretty" = "pretty") {
        switch (format) {
            case "iso": return date.toISOString();
            case "form": return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
            case "pretty": return date.toLocaleDateString(Text.defaults.locale, Text.defaults.dateFormat);
            default: throw new Error.Fatal(`Unrecognized date format ${format}.`);
        }
    }

    /**
     * Converts a date or hours number into time strings of various formats.
     * @param hoursOfDayOrDate A number of hours in a day (0-24) or a date object to convert to a time string.
     * @param format The format of the time string.
     * @returns The formatted time string.
     */
    export function time(hoursOfDayOrDate: Date | number, format: "form" | "pretty" = "pretty") {
        switch (format) {
            case "form":
                let hours: number;
                let minutes: number;
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
                    const hours = Math.floor(hoursOfDayOrDate);
                    const minutes = Math.round((hoursOfDayOrDate - hours) * 60);
                    hoursOfDayOrDate = new Date(0, 0, 0, hours, minutes);
                }
                return hoursOfDayOrDate.toLocaleTimeString(Text.defaults.locale, Text.defaults.timeFormat);
            default:
                throw new Error.Fatal(`Unrecognized date format "${format}".`);
        }
    }

    /**
     * Gets the name of the month of the year from {@link date}.
     * @param date The date to get the month from.
     * @returns The name of the month of the year.
     */
    export function month(date: Date, format: "form" | "pretty" = "pretty") {
        switch (format) {
            case "form":
                return `${date.getFullYear().toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
            case "pretty":
                return date.toLocaleDateString(Text.defaults.locale, { month: "long" })
            default:
                throw new Error.Fatal(`Unrecognized date format "${format}".`);
        }
    }

    /**
     * Converts a given duration in milliseconds to a string.
     * @param milliseconds Milliseconds to convert into a duration string.
     * @param maximumPrecision The maximum precision of the duration string.
     * @param minimumPrecision The minimum precision of the duration string.
     * @param pluralize True to pluralize the units, false otherwise.
     * @returns A duration string.
     */
    export function duration(milliseconds: number, maximumPrecision: Precision = "day", minimumPrecision: Precision = "second", pluralize: boolean = false) {
        const precisions = [
            { name: "week", milliseconds: 1000 * 60 * 60 * 24 * 7 },
            { name: "day", milliseconds: 1000 * 60 * 60 * 24 },
            { name: "hour", milliseconds: 1000 * 60 * 60 },
            { name: "minute", milliseconds: 1000 * 60 },
            { name: "second", milliseconds: 1000 },
            { name: "millisecond", milliseconds: 1 }
        ];
        const pieces = [];
        const maximumPrecisionIndex = precisions.findIndex(item => item.name === maximumPrecision);
        const minimumPrecisionIndex = precisions.findIndex(item => item.name === minimumPrecision);
        for (let i = maximumPrecisionIndex, last = minimumPrecisionIndex; i <= last; i++) {
            const item = precisions[i];
            let count = i === last ? Math.round(milliseconds / item.milliseconds) : Math.floor(milliseconds / item.milliseconds);
            milliseconds -= count * item.milliseconds;
            if (count !== 0) {
                pieces.push(count + " " + (pluralize ? Text.plural(item.name, count) : item.name));
            }
        }
        return pieces.join(", ");
    }

    /**
     * Gets the name of the day of the week from {@link date}.
     * @param date The date to get the weekday from.
     * @returns The name of the day of the week.
     */
    export function weekday(date: Date) {
        return date.toLocaleDateString(Text.defaults.locale, { weekday: "long" });
    }

    /**
     * Creates a string from {@link currency}.
     * @param currency The currency to convert to a string.
     * @returns A string representing {@link currency}.
     */
    export function currency(currency: number) {
        return currency.toLocaleString(Text.defaults.locale, { style: "currency", currency: Text.defaults.currency });
    }

    /**
     * Creates a string from {@link percentage}.
     * @param percentage The percentage to convert to a string.
     * @returns A string representing {@link percentage}.
     */
    export function percentage(percentage: number) {
        return percentage.toLocaleString(Text.defaults.locale, { style: "percent" });
    }

    /**
     * Creates a string from {@link number}.
     * @param number The number to convert to a string.
     * @param fractionalDigits The number of digits to represent the fractional portion of the number.
     * @returns A string representing {@link number}.
     */
    export function number(number: number, fractionalDigits: number = 2) {
        return number.toLocaleString(Text.defaults.locale, { style: "decimal", minimumFractionDigits: fractionalDigits, maximumFractionDigits: fractionalDigits });
    }

    export namespace Utility {

        /**
         * Calculates the [Levenshtein distance]{@link https://en.wikipedia.org/wiki/Levenshtein_distance} between two strings.
         * @param stringA The first string
         * @param stringB The second string
         * @returns The distance between {@link stringA} and {@link stringB}
         */
        export function getLevenshteinDistance(stringA: string, stringB: string) {
            const line = Array(stringB.length + 1).fill(null).map(() => Array(stringA.length + 1).fill(null));
            for (let i = 0; i <= stringA.length; i += 1) {
                line[0][i] = i;
            }
            for (let j = 0; j <= stringB.length; j += 1) {
                line[j][0] = j;
            }
            for (let j = 1; j <= stringB.length; j += 1) {
                for (let i = 1; i <= stringA.length; i += 1) {
                    const indicator = stringA[i - 1] === stringB[j - 1] ? 0 : 1;
                    line[j][i] = Math.min(line[j][i - 1] + 1, line[j - 1][i] + 1, line[j - 1][i - 1] + indicator);
                }
            }
            return line[stringB.length][stringA.length];
        }

        /**
         * Calculates a normalized similarity factor between two strings. Determines how similar two strings are. Used for fuzzy string checking.
         * @param stringA The first string
         * @param stringB The second string
         * @returns A similarity factor, 1 being identical, 0 being very different.
         */
        export function getSimilarity(stringA: string, stringB: string) {
            const distance = Text.Utility.getLevenshteinDistance(stringA, stringB);
            const averageLength = (stringA.length + stringB.length) / 2;
            return Math.max(0, 1 - distance / Math.max(1, averageLength));
        }

    }

    export namespace Parse {

        /**
        * Converts a string into a date object.
        * @param dateString The string to parse into a date.
        * @param formFormat If true, parses "dateString" in the current timezone instead of UTC.
        * @returns The parsed date.
        */
        export function date(dateString: string, formFormat: boolean) {
            const date = new Date(dateString);
            if (formFormat) {
                return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
            } else {
                return date;
            }
        }

        /**
         * Converts a month string into a date object.
         * @note A month string is the format of the value associated with a type="month" HTML input `YYYY-MM`.
         * @param monthString The string to parse into a date.
         * @returns The parsed date.
         */
        export function month(monthString: string) {
            const match = monthString.match(/([0-9]{4})-([0-9]{2})/);
            if (match === null) {
                return new Date(NaN);
            }
            const [_, year, month] = match;
            return new Date(parseInt(year), parseInt(month) - 1);
        }

        /**
         * Converts a form time string (HH:mm) to a number of hours of a day.
         * @param formTimeString The string to parse.
         * @returns An hour of the day (0-24) representing {@link formTimeString}.
         */
        export function time(formTimeString: string) {
            const hours = parseInt(formTimeString.substring(0, 2));
            const minutes = parseInt(formTimeString.substring(3, 5));
            return hours + minutes / 60;
        }

    }

};