import path from 'path'
import { series, parallel } from 'gulp'
import { version } from 'vue-demi'
import { getOutputDir } from '../scripts/utils'
import { run } from './utils/process'
import { withTaskName } from './utils/gulp'
import { mlOutput, mlPackage, mlRoot } from './utils/paths'
// import { buildConfig } from './buildInfo';
// import type { TaskFunction } from 'gulp';
// import type { Module } from './buildInfo';

const runTask = (name: string) =>
  withTaskName(name, () => run(`pnpm run build:task ${name}`))

export const copyFiles = () => {
  return Promise.all([
    // run(`cp ${mlPackage} ${path.join(getOutputDir(version), 'package.json')}`),
    run(`cp ${mlPackage} ${path.join(mlOutput, 'package.json')}`),
    run(
      `cp ${path.join(mlRoot, 'postinstall.js')} ${path.join(
        mlOutput,
        'postinstall.js'
      )}`
    ),
    run(`cp README.md ${mlOutput}`),
  ])
}

export const copyFullStyle = async () => {
  await run(`mkdir -p ${getOutputDir(version)}/dist`)
  await run(
    `cp ${getOutputDir(version)}/theme/index.css ${getOutputDir(
      version
    )}/dist/index.css`
  )
}

export default series(
  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    series(
      withTaskName('buildTheme', () => run('pnpm run -C packages/theme build')),
      copyFullStyle
    )
  ),
  parallel(copyFiles)
)

export * from './modules'
export * from './fullBundle'
