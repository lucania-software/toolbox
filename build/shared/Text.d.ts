type TextDefaults = {
    locale: Intl.LocalesArgument;
    dateFormat: Intl.DateTimeFormatOptions;
    timeFormat: Intl.DateTimeFormatOptions;
    currency: string;
};
type Precision = "week" | "day" | "hour" | "minute" | "second" | "millisecond";
/**
 * A String manipulation module used for formatting and interpreting text.
 */
export declare namespace Text {
    /**
     * The default options for text manipulations and formatting
     */
    const defaults: TextDefaults;
    /**
     * Converts {@link string} to a url-slug. Note that this function treats camel casing as separate words. Convert {@link string} to lower case first to avoid this functionality.
     * @param string The text to turn into a slug
     * @returns a-slug-string
     */
    function slug(string: string): string;
    /**
     * Converts {@link string} to camelCase.
     * @param string The text to turn into camel case.
     * @returns aCamelCaseString
     */
    function camel(string: string): string;
    /**
     * Converts string to Title Case
     * @param string The text to turn into title case.
     * @returns A Title Case String
     */
    function title(string: string): string;
    /**
     * Wraps 'string' in quotes.
     * @param string A string to wrap in quotes.
     * @param quote The quote string.
     * @returns A string wrapped in quotes.
     */
    function quote(string: string, quote?: string): string;
    /**
     * Removes the quotes from a given string.
     * @param string A string to remove the quotes from.
     * @param quote The quote string.
     * @returns `string` without quotes.
     */
    function unquote(string: string, quote?: string): string;
    /**
     * Creates an English readable list from {@link values}.
     * @param values A list of values to make a pretty list out of.
     * @returns A list deliminated by commas with the word "and" separating the last element.
     */
    function list(values: string[], lastDelimiter?: string, delimiter?: string): string;
    /**
     * Makes {@link singular} plural.
     * @param singular The singular word to make plural.
     * @param count The number of {@link singular}. Not 1 to pluralize.
     * @returns The plural of {@link singular}.
     */
    function plural(singular: string, count?: number): string;
    /**
     * Adds a number suffix to "value". (-st, -nd, -rd or -th)
     * @param value The number to add a suffix to.
     * @returns A string of "value" with a number suffix.
     */
    function integerSuffix(value: number): string;
    /**
     * Converts a date object into strings of various formats.
     *
     * @param date The date to convert.
     * @param format The format to use. ("iso", "form", "pretty")
     * @param timeZone An IANA time zone name (I.E. America/Halifax). Defaults to current time zone. See {@link TimeZone.getCurrentTimeZone}
     *
     * @returns A formatted date string.
     *
     * @note The "pretty" will use {@link Text.defaults.locale} and {@link Text.defaults.dateFormat}
     * @note The `timeZone` parameter has no effect when the "iso" format is specified.
     */
    function date(date: Date, format?: "iso" | "form" | "pretty", timeZone?: string): string;
    /**
     * Converts a date or hours number into time strings of various formats.
     * @param hourOfDayOrDate A number of hours in a day (0-24) or a date object to convert to a time string.
     * @param format The format of the time string.
     * @param timeZone An IANA time zone name (I.E. America/Halifax). Defaults to current time zone. See {@link TimeZone.getCurrentTimeZone}
     *
     * @returns The formatted time string.
     *
     * @note The `timeZone` parameter has no effect when `hoursOfDayOrDate` represents an hour of day.
     */
    function time(hourOfDayOrDate: Date | number, format?: "form" | "pretty", timeZone?: string): string;
    /**
     * Gets the name of the day of the week from {@link dayIndexOrDate}.
     * @param dayIndexOrDate A day of the week index (0-6, starting with Sunday), or a date to get the weekday from.
     * @param timeZone An IANA time zone name (I.E. America/Halifax). Defaults to current time zone. See {@link TimeZone.getCurrentTimeZone}
     *
     * @returns The name of the day of the week.
     *
     * @note The `timeZone` parameter has no effect when `monthIndexOrDate` represents a month index.
     */
    function weekday(dayIndexOrDate: Date | number, timeZone?: string): string;
    /**
     * Gets the name of the month of the year from {@link monthIndexOrDate}.
     *
     * @note If you specify a month index and the "form" format. The current year will be used as
     * the year in the month form format.
     *
     * @param monthIndexOrDate A month index, or a date to get the month from.
     * @param format The format of the time string.
     * @param timeZone An IANA time zone name (I.E. America/Halifax). Defaults to current time zone. See {@link TimeZone.getCurrentTimeZone}
     * @returns The name of the month of the year.
     *
     * @note The `timeZone` parameter has no effect when `monthIndexOrDate` represents a month index.
     */
    function month(monthIndexOrDate: Date | number, format?: "form" | "pretty", timeZone?: string): string;
    /**
     * Converts a given duration in milliseconds to a string.
     * @param milliseconds Milliseconds to convert into a duration string.
     * @param maximumPrecision The maximum precision of the duration string.
     * @param minimumPrecision The minimum precision of the duration string.
     * @param pluralize True to pluralize the units, false otherwise.
     * @returns A duration string.
     */
    function duration(milliseconds: number, maximumPrecision?: Precision, minimumPrecision?: Precision, pluralize?: boolean): string;
    /**
     * Creates a string from {@link currency}.
     * @param currency The currency to convert to a string.
     * @returns A string representing {@link currency}.
     */
    function currency(currency: number): string;
    /**
     * Creates a string from {@link percentage}.
     * @param percentage The percentage to convert to a string.
     * @returns A string representing {@link percentage}.
     */
    function percentage(percentage: number): string;
    /**
     * Creates a string from {@link number}.
     * @param number The number to convert to a string.
     * @param fractionalDigits The number of digits to represent the fractional portion of the number.
     * @returns A string representing {@link number}.
     */
    function number(number: number, fractionalDigits?: number): string;
    namespace Utility {
        /**
         * Calculates the [Levenshtein distance]{@link https://en.wikipedia.org/wiki/Levenshtein_distance} between two strings.
         * @param stringA The first string
         * @param stringB The second string
         * @returns The distance between {@link stringA} and {@link stringB}
         */
        function getLevenshteinDistance(stringA: string, stringB: string): any;
        /**
         * Calculates a normalized similarity factor between two strings. Determines how similar two strings are. Used for fuzzy string checking.
         * @param stringA The first string
         * @param stringB The second string
         * @returns A similarity factor, 1 being identical, 0 being very different.
         */
        function getSimilarity(stringA: string, stringB: string): number;
    }
    namespace Parse {
        /**
        * Converts a string into a date object.
        * @param dateString The string to parse into a date.
        * @param formFormat If true, parses "dateString" in the current timezone instead of UTC.
        * @param timeZone An IANA time zone name (I.E. America/Halifax). Defaults to current time zone. See {@link TimeZone.getCurrentTimeZone}
        *
        * @returns The parsed date.
        *
        * @note By specifying a `timeZone`, this function will interpret `dateString` as though in `timeZone`.
        *
        * @note This function only parses dates to second precision.
        */
        function date(dateString: string, formFormat: boolean, timeZone?: string): Date;
        /**
         * Converts a month string into a date object.
         * @note A month string is the format of the value associated with a type="month" HTML input `YYYY-MM`.
         * @param monthString The string to parse into a date.
         * @param timeZone An IANA time zone name (I.E. America/Halifax). Defaults to current time zone. See {@link TimeZone.getCurrentTimeZone}
         *
         * @returns A date representing the first of the month specified by `monthString` at 12:00 a.m. in `timeZone`.
         */
        function month(monthString: string, timeZone?: string): Date;
        /**
         * Converts a form time string (HH:mm) to a number of hours of a day.
         * @param formTimeString The string to parse.
         * @returns An hour of the day (0-24) representing {@link formTimeString}.
         */
        function time(formTimeString: string): number;
    }
}
export {};
