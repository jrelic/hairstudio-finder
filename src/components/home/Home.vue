<template>
    <div>
 <b-jumbotron>
      <div>
  <b-img src="https://i.ibb.co/vmNv4vr/naslovna.png" fluid-grow alt="Fluid-grow image"></b-img>
</div>
  </b-jumbotron>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Home',
    data(){
        return {

        }
    },
    mounted(){
        console.log(firebase.auth().currentUser)
    }
}
</script>

<style>
body{
    background-color: #a69180;
}
@media (min-width: 576px) {

.jumbotron {
    padding: 0;
}}

.jumbotron{
    padding:0;
}
</style>