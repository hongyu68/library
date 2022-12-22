<template>
    <div style="margin: 20px;">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <demo></demo>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        input: 'Hello World!'
      };
    }
  };
</script>
