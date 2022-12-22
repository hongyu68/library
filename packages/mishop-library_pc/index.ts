// import installer from './defaults'
// export * from '@library/components'
// export * from './installer'
// console.log(installer)
// export const install = installer.install
// export default installer
import Demo from '@library/components/demo'
import Demo2 from '@library/components/demo2'

const components = [Demo, Demo2]

const install = function (app: any, opts = {}) {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }

export default { install, Demo, Demo2 }
