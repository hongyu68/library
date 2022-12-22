import * as compiler from '@vue/compiler-sfc'
import { rollup } from 'rollup'
import vue3 from '@vitejs/plugin-vue'
import vue from 'rollup-plugin-vue'
import { isVue2 } from 'vue-demi'
import css from 'rollup-plugin-css-only'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import filesize from 'rollup-plugin-filesize'
import glob from 'fast-glob'
import json from '@rollup/plugin-json'
import { mlRoot, pkgRoot } from './utils/paths'
import { MishopLibraryPcAlias } from './plugins/library-alias'
import { generateExternal, writeBundles } from './utils/rollup'
import { excludeFiles } from './utils/pkg'
import { reporter } from './plugins/size-reporter'
import { buildConfigEntries } from './buildInfo'
import type { OutputOptions } from 'rollup'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )

  const bundle = await rollup({
    input,
    plugins: [
      await MishopLibraryPcAlias(),
      isVue2
        ? vue({
            target: 'browser',
            exposeFilename: true,
          })
        : vue3({ compiler }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: false,
        target: 'es2018',
        loaders: {
          '.vue': 'ts',
        },
      }),
      json(),
      filesize({ reporter }),
    ],
    external: await generateExternal({ full: false }),
    treeshake: false,
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: mlRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}
