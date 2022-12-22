#! /bin/bash

NAME=$1

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../packages" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Please enter a name without spaces"
  exit 1
fi

DIRNAME="$FILE_PATH/components/$NAME"
INPUT_NAME=$NAME

if [ -d "$DIRNAME" ]; then
  echo "$NAME component already exists, please change it"
  exit 1
fi


mkdir -p "$DIRNAME"
mkdir -p "$DIRNAME/src"

cat > $DIRNAME/src/index.vue <<EOF
import Vue from "vue";
<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang='ts'>
export default Vue.extend({
  name: 'mishop-${NAME}',
  props: { },
  data() {
    return {}
  }
})
</script>
<style>
</style>
EOF

cat <<EOF >"$DIRNAME/index.ts"

import ${NAME} from './src/index.vue'

${NAME}.install = (Vue) {
  Vue.component(${NAME}.name, ${NAME})
}

export default ${NAME}
EOF
