import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme')
export const utilRoot = resolve(pkgRoot, 'utils')
export const mlRoot = resolve(pkgRoot, 'library')

/** dist */
export const buildOutput = resolve(projRoot, 'dist')

/** dist/library */
export const mlOutput = resolve(buildOutput, 'library')
export const mlOutputV2 = resolve(mlOutput, 'v2')
export const mlOutputV3 = resolve(mlOutput, 'v3')

/** dist/lib */
export const libOutput = resolve(buildOutput, 'lib')

export const projPackage = resolve(projRoot, 'package.json')
export const compPackage = resolve(compRoot, 'package.json')
export const themePackage = resolve(themeRoot, 'package.json')
export const utilPackage = resolve(utilRoot, 'package.json')
export const mlPackage = resolve(mlRoot, 'package.json');

