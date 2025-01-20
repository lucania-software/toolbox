/**
 * Supplies tooling to aid in working with `Date` objects in different time zones.
 */
export declare namespace TimeZone {
    type ParsedDate = {
        year: number;
        month: number;
        date: number;
        hour: number;
        minute: number;
        second: number;
        timeZoneOffset: number;
        timeZoneName: string;
    };
    /**
     * Gets a parsed date representing a snapshot of parts of Date & Time in a given time zone.
     *
     * @note The returned `ParsedDate` can be thought of as the numbers someone in the time zone
     * specified by `timeZoneName` would see on their clock.
     *
     * @param date A date to parse into parts for a certain time zone.
     * @param timeZoneName The time zone in which the parsed parts represent.
     */
    function parse(date: Date, timeZoneName: string): ParsedDate;
    /**
     * Gets a time zone offset string given a time zone name.
     *
     * I.E. GMT-04:00
     *
     * @param timeZoneName An IANA time zone name (I.E. America/Halifax)
     */
    function getTimeZoneString(timeZoneName: string): string;
    /**
     * Gets a time zone offset string given a time zone name.
     *
     * @param timeZoneName An IANA time zone name (I.E. America/Halifax).
     * @returns
     */
    function getTimeZoneOffset(timeZoneName: string): number;
    /**
     * Parses a time zone offset string into a number.
     *
     * @param timeZoneOffset A time zone string returned from "getTimeZoneOffset". I.E. GMT-04:00
     * @return A time zone offset number in hours. I.E. "GMT-04:00" -> 4.0, "GMT+03:00" -> -3.0
     */
    function parseTimeZoneOffset(timeZoneOffset: string): number;
    /**
     * Creates a date object where `source`'s values are interpreted as describing the time in a given `timeZone`.
     *
     * @param source Source used to create a Date object.
     * @param timeZone An IANA time zone name (I.E. America/Halifax).
     * @returns A date object representing an instant in time where `source`'s values would match that of a clock in `timeZone`.
     */
    function createDate(source: {
        year: number;
        monthIndex?: number;
        date?: number;
        hours?: number;
        minutes?: number;
        seconds?: number;
        milliseconds?: number;
    }, timeZone: string): Date;
    /**
     * Creates a date object where `formDateString` is parsed as a date in the supplied `timeZone`.
     *
     * @param formDateString A date string in the form format.
     * @param timeZone An IANA time zone name (I.E. America/Halifax).
     * @returns A date object representing an instant in time where `formDateString` would match that of a clock in `timeZone`.
     */
    function createDateFromFormString(formDateString: string, timeZone: string): Date;
}
