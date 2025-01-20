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
        const formatter = new Intl.DateTimeFormat("en-US", {
            hour12: false,
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "longOffset",
            timeZone: timeZoneName
        });
        return formatter.formatToParts(date).reduce<ParsedDate>((parsed, part) => {
            switch (part.type) {
                case "year": parsed.year = parseInt(part.value); break;
                case "month": parsed.month = parseInt(part.value); break;
                case "day": parsed.date = parseInt(part.value); break;
                case "hour": parsed.hour = parseInt(part.value); break;
                case "minute": parsed.minute = parseInt(part.value); break;
                case "second": parsed.second = parseInt(part.value); break;
                case "timeZoneName":
                    parsed.timeZoneName = part.value;
                    parsed.timeZoneOffset = parseTimeZoneOffset(part.value);
                    break;
                default: break;
            }
            return parsed;
        }, {
            year: 0,
            month: 0,
            date: 0,
            hour: 0,
            minute: 0,
            second: 0,
            timeZoneOffset: 0,
            timeZoneName: ""
        });
    }

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
     * @param timeZoneName An IANA time zone name (I.E. America/Halifax).
     * @returns
     */
    export function getTimeZoneOffset(timeZoneName: string) {
        const timeZoneString = getTimeZoneString(timeZoneName);
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