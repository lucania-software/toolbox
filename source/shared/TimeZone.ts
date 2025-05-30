import { Data } from "./Data";

/**
 * Supplies tooling to aid in working with `Date` objects in different time zones.
 */
export namespace TimeZone {

    export type ParsedDate = {
        year: number,
        month: number,
        date: number,
        hour: number,
        minute: number,
        second: number,
        timeZoneOffset: number,
        timeZoneName: string
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
    export function parse(date: Date, timeZoneName: string): ParsedDate {
        const newDate = new Date(date);
        const currentTimeZoneOffset = -newDate.getTimezoneOffset() / 60;
        const timeZoneString = getTimeZoneString(timeZoneName, date);
        const timeZoneOffset = parseTimeZoneOffset(timeZoneString);
        newDate.setUTCHours(newDate.getUTCHours() - currentTimeZoneOffset - timeZoneOffset);
        return {
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
            date: newDate.getDate(),
            hour: newDate.getHours(),
            minute: newDate.getMinutes(),
            second: newDate.getSeconds(),
            timeZoneOffset: timeZoneOffset,
            timeZoneName: timeZoneString
        };
    }

    /**
     * Gets a time zone offset string given a time zone name.
     * 
     * I.E. GMT-04:00
     * 
     * @param timeZoneName An IANA time zone name (I.E. America/Halifax)
     */
    export function getTimeZoneString(timeZoneName: string, date: Date) {
        const expression = /GMT(?:\+|-)[0-9]{2}:[0-9]{2}/;
        const timeZoneFormat = new Intl.DateTimeFormat("en-US", { timeZoneName: "longOffset", timeZone: timeZoneName });
        const formattedString = timeZoneFormat.format(date);
        // Doesn't appear to work on IOS on Hermes engine.
        // const formattedParts = timeZoneFormat.formatToParts(date);
        // const timeZoneOffsetPart = formattedParts.find((part) => part.type === "timeZoneName");
        const match = formattedString.match(expression);
        Data.assert(match !== null, `Failed to find time zone offset part while getting offset of "${timeZoneName}".`);
        const [timeZoneString] = match;
        return timeZoneString;
    }

    /**
     * Gets a time zone offset string given a time zone name.
     * 
     * @param timeZoneName An IANA time zone name (I.E. America/Halifax).
     * @returns
     */
    export function getTimeZoneOffset(timeZoneName: string, date: Date) {
        const timeZoneString = getTimeZoneString(timeZoneName, date);
        return parseTimeZoneOffset(timeZoneString);
    }

    /**
     * Parses a time zone offset string into a number.
     * 
     * @param timeZoneOffset A time zone string returned from "getTimeZoneOffset". I.E. GMT-04:00
     * @return A time zone offset number in hours. I.E. "GMT-04:00" -> 4.0, "GMT+03:00" -> -3.0
     */
    export function parseTimeZoneOffset(timeZoneOffset: string) {
        const timeZoneMatcher = timeZoneOffset.match(/([A-Z]{3})([+-])([0-9]{2}):([0-9]{2})/);
        Data.assert(timeZoneMatcher !== null, `Time zone offset part "${timeZoneOffset}" did not match expected format.`);
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
        const date = new Date(Date.UTC(
            Data.get(source, "year", 0),
            Data.get(source, "monthIndex", 0),
            Data.get(source, "date", 1),
            Data.get(source, "hours", 0),
            Data.get(source, "minutes", 0),
            Data.get(source, "seconds", 0),
            Data.get(source, "milliseconds", 0)
        ));
        date.setHours(date.getHours() + getTimeZoneOffset(timeZone, date));
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

    /**
     * Gets the current time zone according to your system locale.
     * 
     * @note Think about the environment you're calling this function from. A client browser could potentially return
     * a different time zone than the server.
     * 
     * @returns The current time zone in IANA format. I.E. "America/Halifax".
     */
    export function getCurrentTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

}