import typescript from "@rollup/plugin-typescript";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";

/** @type {import("rollup").RollupOptions[]} */
export default [
    {
        input: "source/shared/index.ts",
        output: {
            file: "build/shared/index.js",
            name: "Schema",
            format: "cjs",
            sourcemap: false,
            exports: "named"
        },
        plugins: [
            typescript({ tsconfig: "source/shared/tsconfig.json" }),
            getBabelOutputPlugin({ presets: [["@babel/preset-env", { modules: "umd" }]] })
        ]
    },
    {
        input: "source/client/index.ts",
        external: ["@jeremy-bankes/toolbox/shared"],
        output: {
            file: "build/client/index.js",
            name: "Schema",
            format: "cjs",
            sourcemap: false,
            exports: "named"
        },
        plugins: [
            typescript({ tsconfig: "source/client/tsconfig.json" }),
            getBabelOutputPlugin({ presets: [["@babel/preset-env", { modules: "umd" }]] })
        ]
    },
    {
        input: "source/server/index.ts",
        external: ["fs", "path"],
        output: {
            file: "build/server/index.js",
            name: "Schema",
            format: "cjs",
            sourcemap: false,
            exports: "named",
        },
        plugins: [
            typescript({ tsconfig: "source/server/tsconfig.json" })
        ]
    }

];