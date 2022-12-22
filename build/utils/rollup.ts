import { mlPackage } from './paths'
import { getPackageDependencies } from './pkg'

import type { OutputOptions, RollupBuild } from 'rollup'

export const generateExternal = async (options: { full: boolean }) => {
  return (id: string) => {
    const packages: string[] = ['vue']
    if (!options.full) {
      packages.push(
        'library/theme',
        '@vue',
        ...getPackageDependencies(mlPackage)
      )
    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}
