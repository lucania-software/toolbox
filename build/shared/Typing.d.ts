export declare namespace Typing {
    function ArrayLiteral<Item extends string>(...items: Item[]): Item[];
    function ArrayLiteral<Item extends number>(...items: Item[]): Item[];
    function ArrayLiteral<Item extends bigint>(...items: Item[]): Item[];
    function ArrayLiteral<Item extends boolean>(...items: Item[]): Item[];
    function ArrayLiteral<Item extends any>(...items: Item[]): Item[];
    function Tuple<Tuple extends string[]>(...items: Tuple): Tuple;
    function Tuple<Tuple extends number[]>(...items: Tuple): Tuple;
    function Tuple<Tuple extends bigint[]>(...items: Tuple): Tuple;
    function Tuple<Tuple extends boolean[]>(...items: Tuple): Tuple;
    function Tuple<Tuple extends any[]>(...items: Tuple): Tuple;
    type ObjectWithLiteralBuilder<Type> = (literal: typeof makeLiteral) => Type;
    function makeLiteral<Type extends string>(value: Type): Type;
    function makeLiteral<Type extends number>(value: Type): Type;
    function makeLiteral<Type extends boolean>(value: Type): Type;
    function makeLiteral<Type extends bigint>(value: Type): Type;
    /**
     * Allows creation of an object that contains strongly typed specific primitive literals.
     *
     * @example
     * ```ts
     * const person = {
     *     name: "Jeremy",
     *     age: 23,
     *     hair: {
     *         color: "black",
     *         bald: false
     *     }
     * };
     * ```
     *
     * With the above object definition, TypeScript assumes the type to be:
     *
     * ```ts
     * const person: {
     *     name: string;
     *     age: number;
     *     hair: {
     *         color: string;
     *         bald: boolean;
     *     };
     * }
     * ```
     *
     * Alternatively,
     *
     * ```ts
     * const verySpecificPerson = FreeCoreToolbox.withLiterals((literal) => ({
     *     name: literal("Jeremy"),
     *     age: literal(23),
     *     hair: {
     *         color: literal("black"),
     *         bald: literal(false)
     *     }
     * }));
     * ```
     *
     * With the above object definition, TypeScript assumes the type to be:
     *
     * ```ts
     * const verySpecificPerson: {
     *     name: "Jeremy";
     *     age: 23;
     *     hair: {
     *         color: "black";
     *         bald: false;
     *     };
     * }
     * ```
     *
     * @note This function only matters in a TypeScript context.
     *
     * @param builder An object builder callback that returns an object with typed literals.
     *
     * @returns An object with specifically selected primitive literals.
     */
    function withLiterals<Type>(builder: ObjectWithLiteralBuilder<Type>): Type;
}
