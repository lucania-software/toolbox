import { Data } from "./Data";

/**
 * Supplies tooling to aid in working with `Date` objects in different time zones.
 */
export namespace TimeZone {

    /**
     * Gets a time zone offset string given a time zone name.
     * 
     * I.E. GMT-04:00
     * 
     * @param timeZoneName An IANA time zone name (I.E. America/Halifax)
     */
    export function getTimeZoneString(timeZoneName: string) {
        const timeZoneFormat = new Intl.DateTimeFormat("en-US", { timeZoneName: "longOffset", timeZone: timeZoneName });
        const formattedParts = timeZoneFormat.formatToParts(0);
        const timeZoneOffsetPart = formattedParts.find((part) => part.type === "timeZoneName");
        Data.assert(timeZoneOffsetPart !== undefined, `Failed to find time zone offset part while getting offset of "${timeZoneName}".`);
        return timeZoneOffsetPart.value;
    }

    /**
     * Gets a time zone offset string given a time zone name.
     * 
     * I.E. GMT-04:00
     * 
     * @param timeZoneName An IANA time zone name (I.E. America/Halifax).
     * @returns
     */
    export function getTimeZoneOffset(timeZoneName: string) {
        const timeZoneString = getTimeZoneString(timeZoneName);
        const timeZoneMatcher = timeZoneString.match(/([A-Z]{3})([+-])([0-9]{2}):([0-9]{2})/);
        Data.assert(timeZoneMatcher !== null, `Time zone offset part "${timeZoneString}" did not match expected format while getting offset of "${timeZoneName}".`);
        const [_, offsetFrom, direction, hour, minute] = timeZoneMatcher;
        const sign = direction === "+" ? -1 : 1;
        Data.assert(offsetFrom === "GMT", `Expected time zone string to be offset from GMT, but got "${offsetFrom}".`);
        return sign * (parseInt(hour) + parseInt(minute) / 60);
    }

    /**
     * Creates a date object where `source`'s values are interpreted as describing the time in a given `timeZone`.
     * 
     * @param source Source used to create a Date object.
     * @param timeZone An IANA time zone name (I.E. America/Halifax).
     * @returns A date object representing an instant in time where `source`'s values would match that of a clock in `timeZone`.
     */
    export function createDate(
        source: {
            year: number,
            monthIndex?: number,
            date?: number,
            hours?: number,
            minutes?: number,
            seconds?: number,
            milliseconds?: number
        },
        timeZone: string
    ) {
        const date = new Date(Date.UTC(...Object.values(source) as [number]));
        date.setHours(date.getHours() + getTimeZoneOffset(timeZone));
        return date;
    }

    /**
     * Creates a date object where `formDateString` is parsed as a date in the supplied `timeZone`.
     * 
     * @param formDateString A date string in the form format.
     * @param timeZone An IANA time zone name (I.E. America/Halifax).
     * @returns A date object representing an instant in time where `formDateString` would match that of a clock in `timeZone`.
     */
    export function createDateFromFormString(formDateString: string, timeZone: string) {
        const formDateStringMatcher = formDateString.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})/);
        Data.assert(formDateStringMatcher !== null, `Unexpected form date format "${formDateString}".`);
        const [_, year, month, date] = formDateStringMatcher;
        return createDate({
            year: parseInt(year),
            monthIndex: parseInt(month) - 1,
            date: parseInt(date)
        }, timeZone);
    }

}