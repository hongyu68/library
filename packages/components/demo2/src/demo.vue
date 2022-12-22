<template>
    <div>
        {{ text }}
    </div>
</template>
<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'MishopDemo2',
  data() {
    return {
      text: 'This is a demo text2',
    }
  },

  methods: {},
})
</script>
