import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import url from "rollup-plugin-url";
import json from '@rollup/plugin-json';
import svg from 'rollup-plugin-svg-import';
import image from '@rollup/plugin-image';

const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extensions: ['.css']
    }),
    url({
      include: ['**/*.ttf'],
      limit: Infinity,
    }),
    json(),
    svg({
      stringify: false
    }),
    image()
  ]
};
