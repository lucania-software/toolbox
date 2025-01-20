/**
 * Supplies tooling to aid in working with `Date` objects in different time zones.
 */
export declare namespace TimeZone {
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
     * I.E. GMT-04:00
     *
     * @param timeZoneName An IANA time zone name (I.E. America/Halifax).
     * @returns
     */
    function getTimeZoneOffset(timeZoneName: string): number;
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
