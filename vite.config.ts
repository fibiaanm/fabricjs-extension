import {fileURLToPath, URL} from "url";
import {defineConfig, UserConfig} from 'vite'
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

const buildLibrary: UserConfig = {
    build: {
        target: "esnext",
        sourcemap: true,
        minify: false,
        rollupOptions: {
            external: Object.keys(pkg.peerDependencies),
        },
        lib: {
            entry: [fileURLToPath(new URL("src/main.ts", import.meta.url))],
            formats: ["es"],
            fileName: (format) => `main.${format}.js`,
        },
    },
}

export default defineConfig(({mode}) => {
    return {
        plugins: [
            checker({
                typescript: true,
            }),
            dts({exclude: ["**/__tests__/**", "**/*.test.ts"]}),
        ],
        server: {
            port: 4000
        },
        ...buildLibrary
    }
})