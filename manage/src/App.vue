<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px; 
}

.el-form-item__label {
  width: 95px;
  color: #99a9bf;
}

.long-item >.el-form-item__content {
  width: 90%;
}

.dialog-long-item {
  width: 90%;
}

</style>
