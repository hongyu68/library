import Demo from './src/demo.vue'

Demo.install = function (app) {
  app.component(Demo.name, Demo)
}

export default Demo
