import { Error } from "./Error";

export type StringWithSuggestion<Suggestion> = Suggestion | (string & {});
export type PlainPrimitives = string | number | boolean | bigint | undefined | null;
export type PlainTarget<SupportedType = PlainPrimitives> = (
    SupportedType |
    { [Key: string]: PlainTarget<SupportedType> } |
    PlainTarget<SupportedType>[]
)
export type Present<Value> = Exclude<Exclude<Value, undefined>, null>;

export type ObjectWithPath<Path extends string, Type = any, Optional extends boolean = false> = (
    Path extends `${infer Head}.${infer Tail}` ? (
        { [Key in Head]: ObjectWithPath<Tail, Type> }
    ) : (
        Optional extends true ? (
            { [Key in Path]?: Type }
        ) : (
            { [Key in Path]: Type }
        )
    )
);

export type TypeAtPath<Target, Path extends string> = (
    Path extends `${infer Head}.${infer Tail}` ? (
        Target extends { [Key in Head]?: any } ? TypeAtPath<Target[Head], Tail> : undefined
    ) : (
        Target extends { [Key in Path]?: any } ? Target[Path] : undefined
    )
);

export type ObjectPaths<Type> = (
    Type extends any[] ? (
        `${number}`
    ) : (
        {
            [Key in keyof Type]-?: (
                Key extends string ? (
                    Type[Key] extends object ? (
                        Key | `${Key}.${ObjectPaths<Type[Key]>}`
                    ) : Key
                ) : never
            )
        }[keyof Type]
    )
);

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
export namespace Data {

    /**
     * Checks to see if a given {@link target} object has a given {@link path}.
     * @param target The target object.
     * @param path The path to check the existence of.
     * @returns True if {@link target} has {@link path}.
     */
    export function has<Path extends string>(target: any, path: Path): target is ObjectWithPath<Path> {
        const pieces = path === "" ? [] : path.split(".");
        const key = pieces.shift();
        if (key === undefined) {
            return target !== undefined && target !== null;
        } else {
            if (typeof target === "object" && target !== null && key in target) {
                return has(target[key], pieces.join("."));
            } else {
                return false;
            }
        }
    }

    /**
     * Finds a retrieves a value at {@link pieces} in {@link target} object.
     * @param target The target object.
     * @param pieces The path to retrieve a value from.
     * @returns The value in {@link target} at {@link pieces}, or undefined if {@link pieces} can't be found.
     */
    export function get<Target, Path extends string>(target: Target, path: Path): TypeAtPath<Target, Path> | undefined;
    /**
     * Retrieves a value at {@link path} in {@link target} object.
     * @param target The target object.
     * @param path The path to retrieve a value from.
     * @param fallback A value to fallback on if {@link path} couldn't be found.
     * @returns The value in {@link target} at {@link path}, or {@link fallback} if {@link path} doesn't exist or has a value of null or undefined.
     */
    export function get<Target, Path extends string, Fallback>(target: Target, path: Path, fallback: Fallback): Present<TypeAtPath<Target, Path>> | Fallback;
    export function get(target: any, path: string, fallback?: any) {
        const pieces = path === "" ? [] : path.split(".");
        const key = pieces.shift();
        if (key === undefined) {
            if (target === undefined || target === null) {
                return fallback;
            } else {
                return target;
            }
        } else {
            if (typeof target === "object" && target !== null && key in target) {
                return Data.get(target[key], pieces.join("."), fallback);
            } else {
                return fallback;
            }
        }
    }

    /**
     * Finds a retrieves a value at {@link path} in {@link target} or throws and error if the value fails validation by {@link validator}.
     * @param target The target object.
     * @param path The path to retrieve a value from.
     * @param validator A predicate to validate the value found at {@link path}.
     * @returns The value found at {@link path} in {@link target}.
     */
    export function getOrThrow<Target, Path extends string>(target: Target, path: Path): Present<TypeAtPath<Target, Path>> {
        const value = Data.get(target, path, undefined);
        if (value === undefined) {
            throw new Error.Original(`Failed to get value at "${path}" in target.`, { cause: { target, path } });
        }
        return value;
    }

    /**
     * Sets a {@link value} in a {@link target} object at {@link pieces}.
     * @param target The target object.
     * @param pieces The path to set {@link value} at.
     * @param value The value to be set.
     * @returns True if the target is updated, false otherwise.
     */
    export function set<Path extends string, Value>(target: any, path: Path, value: Value): target is ObjectWithPath<Path, Value> {
        const pieces = path === "" ? [] : path.split(/(?<!\\)\./);
        let key = pieces.shift();
        if (key !== undefined) {
            key = key.replaceAll("\\.", ".");
            if (pieces.length === 0) {
                target[key] = value as any;
            } else {
                if (typeof target[key] !== "object" && target[key] !== null) {
                    target[key] = (pieces.length > 0 && !isNaN(parseInt(pieces[0].toString())) ? [] : {}) as any;
                }
                Data.set(target[key], pieces.join("."), value);
            }
        }
        return true;
    }

    /**
     * Removes a value at {@link pieces} in {@link target}.
     * @param target The target object.
     * @param pieces The path of the value to remove from {@link target}.
     * @returns The removed value.
     */
    export function remove<Target extends ObjectWithPath<Path, any>, Path extends string>(target: Target, path: Path): TypeAtPath<Target, Path> {
        const pieces = path === "" ? [] : path.split(".");
        const key = pieces.shift();
        if (key !== undefined) {
            if (pieces.length === 0) {
                const deleted = target[key];
                if (Array.isArray(target) && !isNaN(parseInt(key))) {
                    target.splice(parseInt(key), 1);
                } else {
                    delete target[key];
                }
                return deleted;
            } else if (key in target) {
                return Data.remove(target[key], pieces.join("."));
            }
        }
        return undefined as any;
    }

    /**
     * Creates a copy of {@link target}.
     * @param target The target object to clone.
     * @param deep True to perform a deep copy, false to perform a shallow copy.
     * 
     * @note When performing deep copies, only "plain old data" will be processed. If a class instance is encountered, it WILL NOT
     * be copied!
     * 
     * @returns A copy of {@link target}.
     */
    export function clone<Target>(target: Target, deep: boolean = false): Target {
        if (deep) {
            if (typeof target === "object" && target !== null) {
                if (Array.isArray(target)) {
                    let result: any = [];
                    for (const item of target) {
                        result.push(clone(item, deep));
                    }
                    return result;
                } else if (target.constructor.name === "Object") {
                    const result: any = {};
                    for (const key in target) {
                        result[key] = clone((target as any)[key], deep);
                    }
                    return result;
                }
            }
            return target;
        } else {
            return { ...target };
        }
    }

    /**
     * Walks across the nested properties of {@link target} and calls {@link callback} for every property.
     * @param target The target object.
     * @param callback The callback to be executed for every nested property in {@link target}.
     * @param path The path to start walking in {@link target}.
     * @param level The level of nesting from the starting path in {@link target}.
     */
    export function walk(target: any, callback: WalkObjectCallback, path: string = "", level: number = 0) {
        for (const key in target) {
            const value = target[key];
            const valuePath = path === "" ? key : path + "." + key;
            const finished = callback(target, value, valuePath, level);
            if (!finished && typeof value === "object" && value !== null) {
                Data.walk(value, callback, valuePath, level + 1);
            }
        }
    }

    /**
     * Flattens an object's nested hierarchy.
     * I.E. { name: { first: "Jeremy", last: "Bankes" } } -> { "name.first": "Jeremy", "name.last": "Bankes" }
     * 
     * @param target The target object
     * @returns A flattened version of {@link target} without any nesting.
     */
    export function flatten(target: any) {
        const flattenedTarget: any = {};
        Data.walk(target, (_, property, path) => {
            path = path.replaceAll(".", "\\.");
            if (typeof property === "object") {
                if (!isPlain(property, false)) {
                    flattenedTarget[path] = property;
                    return true;
                }
            } else {
                flattenedTarget[path] = property;
                return true;
            }
            return false;
        });
        return flattenedTarget;
    }

    /**
     * Flattens an object's nested hierarchy.
     * I.E. { name: { first: "Jeremy", last: "Bankes" } } -> { "name.first": "Jeremy", "name.last": "Bankes" }
     * 
     * @note This is an alternate implementation of {@link Data.flatten} that takes a simpler recursive approach over using {@link Data.walk}.
     * 
     * @param target The target object.
     * @param keys 
     * @returns A flattened version of {@link target} without any nesting.
     */
    export function alternateFlatten(target: any, keys: string[] = []): any {
        const flattened: any = {};
        if (Array.isArray(target) || typeof target === "object" && target !== null && target.constructor.name === "Object") {
            for (const key in target) {
                Object.assign(flattened, alternateFlatten(target[key], [...keys, key]));
            }
        } else if (keys.length === 0) {
            return target;
        } else {
            const path = keys.join(".");
            const key = path.replaceAll(".", "\\.");
            flattened[key] = target;
        }
        return flattened;
    }

    /**
     * Converts a flattened object back into an object with a nested hierarchy.
     * @param target
     * @returns a hierarchized version of {@link target} with a nested hierarchy.
     */
    export function hierarchize(target: any) {
        const object: any = {};
        for (const key in target) {
            Data.set(object, key, target[key]);
        }
        return object;
    }

    export function isPlainObject(target: any): target is { [Key: string]: any } {
        return typeof target === "object" && target !== null && target.constructor.name === "Object";
    }

    export function isPlainArray(target: any): target is any[] {
        return Array.isArray(target);
    }

    /**
     * Tests to see if a given object is POD (Plain old data).
     * @param target The object to test.
     * @param deep True to traverse the entire object (deep), false to check just the first layer (shallow).
     */
    export function isPlain(target: any, deep: boolean = true): target is PlainTarget {
        const object = Data.isPlainObject(target);
        const array = Data.isPlainArray(target);
        if (object || array) {
            if (deep) {
                for (const key in target) {
                    if (!isPlain((target as any)[key], true)) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            return (
                typeof target === "string" || typeof target === "number" || typeof target === "boolean" ||
                typeof target === "undefined" || typeof target === "bigint" || target === null
            );
        }
    }

    /**
     * Used to optionally include {@link value}'s properties when defining an inline object. 
     * @param condition The condition to be checked.
     * @param value The object with properties to include in an inline object definition if {@link condition} is met.
     * @returns The given {@link value} if {@link condition} is met, an empty array otherwise.
     */
    export function conditional<ValueType extends any[] | any>(condition: boolean, value: ValueType): ValueType {
        if (condition) {
            return value;
        } else {
            if (Array.isArray(value)) {
                return [] as ValueType;
            } else {
                return {} as ValueType;
            }
        }
    }

    /**
     * Compares two objects for deep equality.
     * @param object1 The first object to compare.
     * @param object2 The second object to compare.
     * @returns true if all of the nested properties of object1 are equal to that of object2.
     */
    export function deepEquals(object1: any, object2: any) {
        if (typeof object1 === "object" && typeof object2 === "object") {
            if (object1 === null || object2 === null) {
                return object1 === object2;
            }
            const object1Keys = Object.keys(object1);
            const object2Keys = Object.keys(object2);
            if (object1Keys.length !== object2Keys.length) {
                return false;
            }
            for (const key of object1Keys) {
                const value1 = object1[key as keyof typeof object1];
                const value2 = object2[key as keyof typeof object2];
                const areObjects = (typeof value1 === "object" && value1 !== null) && (typeof value2 === "object" && value2 !== null);
                if (
                    areObjects && !Data.deepEquals(value1, value2) ||
                    !areObjects && value1 !== value2
                ) {
                    return false;
                }
            }
            return true;
        } else {
            return object1 === object2;
        }
    }

    export function assert(condition: boolean, message: string = "Assertion failed."): asserts condition {
        if (!condition) {
            throw new Error.Assertion(message);
        }
    }

}