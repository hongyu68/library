// 在switch vue版本之后执行

// import path from 'path'
import { exists } from 'fs'
import { isVue2, isVue3 } from 'vue-demi'
import { mlOutputV2, mlOutputV3 } from '../build/utils/paths'
import { deleteFolder } from './utils'

if (isVue2) {
  exists(mlOutputV2, (exists) => {
    if (exists) {
      deleteFolder(mlOutputV2)
    }
  })
} else if (isVue3) {
  exists(mlOutputV3, (exists) => {
    if (exists) {
      deleteFolder(mlOutputV3)
    }
  })
}
