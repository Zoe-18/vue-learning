// 作用： 告诉typescript，遇到.vue文件会交给Vue处理
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
