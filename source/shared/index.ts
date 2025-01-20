import { TimeZone } from "./TimeZone";

export * from "./Clock";
export * from "./Color";
export * from "./ConsoleColor";
export * from "./Data";
export * from "./Error";
export * from "./RegularExpression";
export * from "./Text";
export * from "./TimeZone";
export * from "./Typing";

const parsed = TimeZone.parse(new Date(), "America/Toronto");
console.log(parsed);