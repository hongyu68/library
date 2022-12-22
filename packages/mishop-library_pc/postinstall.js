// import { isVue2, version } from 'vue-demi'
// import { switchVersion } from '../../scripts/utils'

// switchVersion(version)

const vue = require('vue')
const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')
const version = vue.version
const isVue2 = +version.split('.')[0] === 2
let pkgDir = isVue2 ? "v2" : "v3";

if (isVue2) {
  console.log('[library] Switch main field for Vue 2')
  // pkgDir = "v2"
} else {
  console.log('[library] Switch main field for Vue 3')
  // pkgDir = "v3"
}
pkg.main =`${pkgDir}/lib/index.js`
pkg.module = `${pkgDir}/es/index.mjs`
pkg.exports = {
  ".": {
    "require": `./${pkgDir}/lib/index.js`,
    "import": `./${pkgDir}/es/index.mjs`
  },
  "./es": `./${pkgDir}/es/index.mjs`,
  "./lib": `./${pkgDir}/lib/index.js`,
  "./es/*.mjs": `./${pkgDir}/es/*.mjs`,
  "./es/*": `./${pkgDir}/es/*.mjs`,
  "./lib/*.js": `./${pkgDir}/lib/*.js`,
  "./lib/*": `./${pkgDir}/lib/*.js`,
  "./*": `./${pkgDir}/*`
}


fs.writeFileSync(
  path.resolve(__dirname, './package.json'),
  JSON.stringify(pkg, null, 2),
  {
    encoding: 'utf-8',
  }
)
