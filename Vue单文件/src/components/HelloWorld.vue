<template>
  <p>{{ gretting }} </p>
</template>

<script>
module.exports = {
  data: function() {
    return {
      gretting: 'Hello Vue World!123'
    }
  },
}
</script>

<style>
p{
  font-size: 2em;
  text-align: center;
}
</style>