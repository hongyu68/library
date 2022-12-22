import findWorkspacePackages from '@pnpm/find-workspace-packages'
import { buildConfig } from '../buildInfo'
import { ML_PREFIX } from './constants'
import { projRoot } from './paths'
import type { Module } from '../buildInfo'
import type { ProjectManifest } from '@pnpm/types'
//获取workspace的包的manifest信息，如下：
// {
//   dir: '/Users/cool/Desktop/xm/library/packages/theme',
//   manifest: {
//     name: '@library/theme',
//     version: '1.0.0',
//     private: true,
//     description: '样式',
//     homepage: '',
//     license: 'ISC',
//     main: 'index.css',
//     unpkg: 'index.css',
//     style: 'index.css',
//     directories: [Object],
//     files: [Array],
//     publishConfig: [Object],
//     repository: [Object],
//     scripts: [Object],
//     dependencies: [Object]
//   },
//   writeProjectManifest: [AsyncFunction (anonymous)]
// }
export const getWorkspacePackages = () => findWorkspacePackages(projRoot)

// export const getWorkspaceNames = async (dir = projRoot) => {
//   const pkgs = await findWorkspacePackages(projRoot);
//   return pkgs
//     .filter((pkg) => pkg.dir.startsWith(dir))
//     .map((pkg) => pkg.manifest.name)
//     .filter((name): name is string => !!name);
// };

export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest
}

// 获取依赖
export const getPackageDependencies = (pkgPath: string): string[] => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies } = manifest
  return Object.keys(dependencies ?? {})
}

export const pathRewriter = (module: Module) => {
  const config = buildConfig[module]

  return (id: string) => {
    id = id.replaceAll(`${ML_PREFIX}/theme`, 'library/theme')
    id = id.replaceAll(`${ML_PREFIX}/`, `${config.bundle.path}/`)
    return id
  }
}

// 不打包的文件
export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}

/**
 * get package list (theme excluded)
 */
// export const getDistPackages = async () =>
//   (await getWorkspacePackages())
//     .map((pkg) => ({ name: pkg.manifest.name, dir: pkg.dir }))
//     .filter(
//       (pkg): pkg is { name: string; dir: string } =>
//         !!pkg.name &&
//         !!pkg.dir &&
//         pkg.name.startsWith(ML_PREFIX) &&
//         pkg.dir.startsWith(pkgRoot) &&
//         pkg.name !== `${ML_PREFIX}/theme`
//     );
