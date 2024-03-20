export type StringWithSuggestion<Suggestion> = Suggestion | (string & {});
export type PlainPrimitives = string | number | boolean | bigint | undefined | null;
export type PlainTarget<SupportedType = PlainPrimitives> = (SupportedType | {
    [Key: string]: PlainTarget<SupportedType>;
} | PlainTarget<SupportedType>[]);
export type Present<Value> = Exclude<Exclude<Value, undefined>, null>;
export type ObjectWithPath<Path extends string, Type = any> = (Path extends `${infer Head}.${infer Tail}` ? ({
    [Key in Head]: ObjectWithPath<Tail, Type>;
}) : ({
    [Key in Path]: Present<Type>;
}));
export type TypeAtPath<Target, Path extends string> = (Path extends `${infer Head}.${infer Tail}` ? (Target extends {
    [Key in Head]: any;
} ? TypeAtPath<Target[Head], Tail> : undefined) : (Target extends {
    [Key in Path]: any;
} ? Target[Path] : undefined));
export interface WalkObjectCallback {
    /**
     * @param target The direct parent object of {@link property}. (Not necessarily the object being walked.)
     * @param property The value of a property within {@link target}.
     * @param path A string representing the path to {@link property} in the object being walked.
     * @param level The depth of {@link property} within the object being walked.
     * @returns True representing being finished with {@link property}, and to stop traversing its keys. False to continue.
     */
    (target: any, property: any, path: string, level: number): boolean;
}
/**
 * A data manipulation module primarily used for reading and altering objects.
 */
export declare namespace Data {
    /**
     * Checks to see if a given {@link target} object has a given {@link path}.
     * @param target The target object.
     * @param path The path to check the existence of.
     * @returns True if {@link target} has {@link path}.
     */
    function has<Path extends string>(target: any, path: Path): target is ObjectWithPath<Path>;
    /**
     * Finds a retrieves a value at {@link pieces} in {@link target} object.
     * @param target The target object.
     * @param pieces The path to retrieve a value from.
     * @returns The value in {@link target} at {@link pieces}, or undefined if {@link pieces} can't be found.
     */
    function get<Target, Path extends string>(target: Target, path: Path): TypeAtPath<Target, Path> | undefined;
    /**
     * Retrieves a value at {@link path} in {@link target} object.
     * @param target The target object.
     * @param path The path to retrieve a value from.
     * @param fallback A value to fallback on if {@link path} couldn't be found.
     * @returns The value in {@link target} at {@link path}, or {@link fallback} if {@link path} doesn't exist or has a value of null or undefined.
     */
    function get<Target, Path extends string, Fallback>(target: Target, path: Path, fallback: Fallback): Present<TypeAtPath<Target, Path>> | Fallback;
    /**
     * Finds a retrieves a value at {@link path} in {@link target} or throws and error if the value fails validation by {@link validator}.
     * @param target The target object.
     * @param path The path to retrieve a value from.
     * @param validator A predicate to validate the value found at {@link path}.
     * @returns The value found at {@link path} in {@link target}.
     */
    function getOrThrow<Target, Path extends string>(target: Target, path: Path): Present<TypeAtPath<Target, Path>>;
    /**
     * Sets a {@link value} in a {@link target} object at {@link pieces}.
     * @param target The target object.
     * @param pieces The path to set {@link value} at.
     * @param value The value to be set.
     * @returns True if the target is updated, false otherwise.
     */
    function set<Path extends string, Value>(target: any, path: Path, value: Value): target is ObjectWithPath<Path, Value>;
    /**
     * Removes a value at {@link pieces} in {@link target}.
     * @param target The target object.
     * @param pieces The path of the value to remove from {@link target}.
     * @returns The removed value.
     */
    function remove<Target extends ObjectWithPath<Path, any>, Path extends string>(target: Target, path: Path): TypeAtPath<Target, Path>;
    /**
     * Creates a copy of {@link target}.
     * @param target The target object to clone.
     * @param deep True to perform a deep copy, false to perform a shallow copy.
     * @returns A copy of {@link target}.
     */
    function clone<Target extends object>(target: Target, deep?: boolean): Target;
    /**
     * Walks across the nested properties of {@link target} and calls {@link callback} for every property.
     * @param target The target object.
     * @param callback The callback to be executed for every nested property in {@link target}.
     * @param path The path to start walking in {@link target}.
     * @param level The level of nesting from the starting path in {@link target}.
     */
    function walk(target: any, callback: WalkObjectCallback, path?: string, level?: number): void;
    /**
     * Flattens an object's nested hierarchy.
     * I.E. { name: { first: "Jeremy", last: "Bankes" } } -> { "name.first": "Jeremy", "name.last": "Bankes" }
     *
     * @param target The target object
     * @returns A flattened version of {@link target} without any nesting.
     */
    function flatten(target: any): any;
    /**
     * Converts a flattened object back into an object with a nested hierarchy.
     * @param target
     * @returns a hierarchized version of {@link target} with a nested hierarchy.
     */
    function hierarchize(target: any): any;
    function isPlainObject(target: any): target is {
        [Key: string]: any;
    };
    function isPlainArray(target: any): target is any[];
    /**
     * Tests to see if a given object is POD (Plain old data).
     * @param target The object to test.
     * @param deep True to traverse the entire object (deep), false to check just the first layer (shallow).
     */
    function isPlain(target: any, deep?: boolean): target is PlainTarget;
    /**
     * Used to optionally include {@link value}'s properties when defining an inline object.
     * @param condition The condition to be checked.
     * @param value The object with properties to include in an inline object definition if {@link condition} is met.
     * @returns The given {@link value} if {@link condition} is met, an empty array otherwise.
     */
    function conditional<ValueType extends any[] | any>(condition: boolean, value: ValueType): ValueType;
    /**
     * Compares two objects for deep equality.
     * @param object1 The first object to compare.
     * @param object2 The second object to compare.
     * @returns true if all of the nested properties of object1 are equal to that of object2.
     */
    function deepEquals(object1: any, object2: any): boolean;
    function assert(condition: boolean, message?: string): asserts condition;
}
