<template>
    <v-app>
  <div id="app">
      <Form/>
  </div>
    </v-app>
</template>

<script>
import Form from "./views/Form";

export default {
  name: 'App',
  components: {
      Form,
  }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
</style>
