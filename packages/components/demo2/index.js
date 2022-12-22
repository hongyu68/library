import Demo2 from './src/demo.vue'

Demo2.install = function (app) {
  app.component(Demo2.name, Demo2)
}

export default Demo2
