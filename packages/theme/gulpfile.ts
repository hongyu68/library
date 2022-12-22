import path from 'path'
import chalk from 'chalk'
import { src, dest, series, parallel } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import { version } from 'vue-demi'
import { getOutputDir } from '../../scripts/utils'
// import { mlOutput } from '../../build/utils/paths'

const distFolder = path.resolve(__dirname, 'dist'),
  distBundle = path.resolve(getOutputDir(version), 'theme')

function buildTheme() {
  const sass = gulpSass(dartSass)
  return (
    src(path.resolve(__dirname, 'src/*.scss'))
      .pipe(sass.sync())
      // cascade 是否美化属性值
      .pipe(autoprefixer({ cascade: false }))
      .pipe(
        cleanCSS({}, (details) => {
          console.log(
            `${chalk.cyan(details.name)}: ${chalk.yellow(
              details.stats.originalSize / 1000
            )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
          )
        })
      )
      .pipe(dest(distFolder))
  )
}

/**
 * copy from packages/theme-chalk/lib to dist/theme-chalk
 */
export function copyThemeBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

/**
 * copy source file to packages
 */

export function copyThemeSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  )
}

export const build = parallel(
  copyThemeSource,
  series(buildTheme, copyThemeBundle)
)

export default build
