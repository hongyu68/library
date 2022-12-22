import type { App, Plugin } from '@vue/runtime-core'
export const installer = (components: Plugin[] = []) => {
  const install = (Vue:any) => {
    // components.forEach((c) => app.use(c))
    components.forEach((c) => Vue.use(c))

  }

  return {
    install,
  }
}
