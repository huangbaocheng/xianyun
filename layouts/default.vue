<template>
  <div>
    <Header></Header>
    <nuxt />
    <Footer />
  </div>
</template>


<script>
  import Header from '@/components/header.vue';
  import Footer from '@/components/footer.vue';
  export default {
    components:{
      Header,
      Footer
    }
  }
</script>


<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a{
  display: block;
  text-decoration: none;
  color:inherit;
}
em,i{
  font-style: normal;
}
</style>
