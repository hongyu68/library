import path from 'path'
import * as compiler from '@vue/compiler-sfc'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import vue3 from '@vitejs/plugin-vue'
import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'
import filesize from 'rollup-plugin-filesize'
import { parallel } from 'gulp'
import { isVue2, version } from 'vue-demi'
import json from '@rollup/plugin-json'
import { getOutputDir } from '../scripts/utils'
import { pkgVersion } from '../packages/library/pkgVersion'
import { MishopLibraryPcAlias } from './plugins/library-alias'
import { mlRoot } from './utils/paths'
import { generateExternal, writeBundles } from './utils/rollup'
import { withTaskName } from './utils/gulp'

export const buildFull = (minify: boolean) => async () => {
  const bundle = await rollup({
    input: path.resolve(mlRoot, 'index.ts'),
    plugins: [
      await MishopLibraryPcAlias(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      isVue2
        ? vue({
            target: 'browser',
            exposeFilename: true,
          })
        : vue3({ compiler }),
      commonjs(),
      esbuild({
        minify,
        sourceMap: minify,
        target: 'es2018',
        treeShaking: true,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      json(),
      filesize(),
    ],
    external: await generateExternal({ full: true }),
    treeshake: true,
  })
  const banner = `/*! library v${pkgVersion} */\n`
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(
        getOutputDir(version),
        `dist/index.full${minify ? '.min' : ''}.js`
      ),
      exports: 'named',
      name: 'MishopLibraryPc',
      globals: {
        vue: 'Vue',
      },
      sourcemap: minify,
      banner,
    },
    {
      format: 'esm',
      file: path.resolve(
        getOutputDir(version),
        `dist/index.full${minify ? '.min' : ''}.mjs`
      ),
      sourcemap: minify,
      banner,
    },
  ])
}

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false))
)
