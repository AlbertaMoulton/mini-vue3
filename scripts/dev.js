import minimist from "minimist";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { createRequire } from "module";
import esbuild from "esbuild";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const args = minimist(process.argv.slice(2));

const targetPackage = args._[0];
const format = args.f || "iife";

console.log("file:", __filename);
console.log("dirname:", __dirname);
console.log(`Building package: ${targetPackage} with format: ${format}`);

const entryFile = resolve(__dirname, `../packages/${targetPackage}/src/index.ts`);
console.log("------ entryFile ------");
console.log(entryFile);

// import package.json
const require = createRequire(import.meta.url);
const pkg = require(resolve(__dirname, `../packages/${targetPackage}/package.json`));
console.log("------ package.json ------");
console.log(pkg.name);

esbuild.context({
    entryPoints: [entryFile],
    bundle: true,
    outfile: resolve(__dirname, `../packages/${targetPackage}/dist/${targetPackage}.${format}.js`),
    format: format,
    sourcemap: true,
    platform: "browser",
    globalName: pkg.buildOptions?.name,
}).then(context => {
    context.watch().then(() => {
        console.log("Watching for changes...");
    });
})