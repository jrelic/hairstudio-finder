<template>
  <div id="app">
    <Navbar />

    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
.page-footer{

 bottom: 0;
 width: 100%;
}
</style>
