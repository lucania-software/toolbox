import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";

/** @type {import("rollup").RollupOptions[]} */
export default [
    {
        input: "./source/shared/index.ts",
        output: {
            file: "./build/shared/index.js",
            name: "SharedToolbox",
            format: "umd"
        },
        plugins: [
            typescript({ tsconfig: "./source/shared/tsconfig.json" }),
            babel({
                extensions: [".ts"],
                babelHelpers: "bundled",
                presets: ["@babel/preset-env"]
            })
        ]
    },
    {
        input: "./source/client/index.ts",
        external: ["@lucania/toolbox/shared"],
        output: {
            file: "./build/client/index.js",
            name: "ClientToolbox",
            format: "umd",
            globals: {
                "@lucania/toolbox/shared": "SharedToolbox"
            }
        },
        plugins: [
            typescript({ tsconfig: "./source/client/tsconfig.json" }),
            babel({
                extensions: [".ts"],
                babelHelpers: "bundled",
                presets: ["@babel/preset-env"]
            })
        ]
    },
    {
        input: "./source/server/index.ts",
        external: ["fs", "path", "child_process"],
        output: {
            file: "./build/server/index.js",
            name: "ServerToolbox",
            format: "cjs",
            sourcemap: false,
            exports: "named",
        },
        plugins: [
            typescript({ tsconfig: "./source/server/tsconfig.json" })
        ]
    }

];