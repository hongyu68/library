import { ML_PKG, ML_PREFIX } from '../utils/constants'
import type { Plugin } from 'rollup'

export function MishopLibraryPcAlias(): Plugin {
  const THEME = `${ML_PREFIX}/theme`

  return {
    name: 'library-alias-plugin',
    resolveId(id, importer, options) {
      if (!id.startsWith(ML_PREFIX)) return

      if (id.startsWith(THEME)) {
        return {
          id: id.replaceAll(THEME, `${ML_PKG}/theme`),
          external: 'absolute',
        }
      }

      return this.resolve(id, importer, { skipSelf: true, ...options })
    },
  }
}
