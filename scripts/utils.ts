import path from 'path'
import fs from 'fs'
import shell from 'shelljs'
import chalk from 'chalk'
import { mlOutput } from '../build/utils/paths'

function switchVersion(version) {
  const src = getOutputDir(version)
  const dest = path.join(src, '..')
  fs.exists(src, (exists) => {
    if (exists && !isEmptyDir(src)) {
      copyDir(src, dest)
    }
  })
}


function getOutputDir(version) {
  console.log('version', version)
  const dirname = String(version).startsWith('2') ? 'v2' : 'v3'
  return path.join(mlOutput, dirname)
}

function copyDir(src, dest) {
  console.log(`copying from ${src} to ${dest}`)

  try {
    fs.unlinkSync(dest)
  } catch {}

  try {
    copyRecursiveSync(src, dest)
  } catch (error) {
    console.error(error)
  }
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = stats && stats.isDirectory()
  if (isDirectory) {
    !fs.existsSync(dest) && fs.mkdirSync(dest)
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      )
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

// 删除文件夹
function deleteFolder(path: string) {
  let files: Array<string> = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach((file, index) => {
      const curPath = `${path}/${file}`
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFolder(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

function doShell(command: string) {
  return new Promise((resolve, reject) => {
    shell.exec(command, { silent: true }, (err, std, stderr) => {
      if (err || stderr) {
        console.log(chalk.red(command))
        console.log(chalk.red(std))
        console.log('\n')
        console.log(chalk.red(stderr))
        reject()
        shell.exit(1)
      } else {
        resolve()
      }
    })
  })
}

function isEmptyDir(path: string){
  var childDir = fs.readdirSync(path);
  if(!childDir.length){
      return true;
  } else {
      return false;
  }
}

export { getOutputDir, copyDir, switchVersion, deleteFolder, doShell }
