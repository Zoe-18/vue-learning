<template>
  <div>
    <input class="custom-input" type="text" placeholder="  请输入关键词" size="large" v-model="searchParams"> 
    <button @click="handleSearch" class="search-bnt">search</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data: {
    searchParams: ''
  },
  methods: {
    handleSearch: function(){
      console.log('正在搜索……，请稍候')
    }
  }
}
</script>

<style>
.custom-input {
  width: 240px;
  height: 30px;
  border-radius: 18px;
}
.search-bnt {
  background-color: burlywood;
  height: 30px;
  width: 60px;
  border-radius: 12px;
  border: 1px royalblue solid;
}
</style>