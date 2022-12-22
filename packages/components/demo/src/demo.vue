<template>
  <div>
    {{ label }}
  </div>
</template>
<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'MishopDemo',
  props: {
    label: {
      type: String,
      default: 'This is a demo label',
    },
  },
  data() {
    return {
      text: 'This is a demo text',
    }
  },
  methods: {},
})
</script>
