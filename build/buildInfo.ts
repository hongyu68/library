import path from 'path'
import { version } from 'vue-demi'
import { getOutputDir } from '../scripts/utils'
// import { mlOutput } from './utils/paths'
import { ML_PKG } from './utils/constants'
import type { ModuleFormat } from 'rollup'

export const modules = ['esm', 'cjs'] as const
export type Module = typeof modules[number]
export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    /** e.g: `es` */
    name: string
    /** e.g: `dist/library/es` */
    path: string
  }

  bundle: {
    /** e.g: `library/es` */
    path: string
  }
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(getOutputDir(version), 'es'),
    },
    bundle: {
      path: `${ML_PKG}/es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(getOutputDir(version), 'lib'),
    },
    bundle: {
      path: `${ML_PKG}/lib`,
    },
  },
}

export type BuildConfigEntries = [Module, BuildInfo][]

export const buildConfigEntries = Object.entries(
  buildConfig
) as BuildConfigEntries

export type BuildConfig = typeof buildConfig
