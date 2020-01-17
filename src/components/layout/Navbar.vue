<template>
  <div>
      
  <b-navbar toggleable="lg" class="navbar-color">
       <b-container>
    <b-navbar-brand><router-link :to="{ name: 'Home' }">HairstudioFinder</router-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
     

      <!-- Right aligned nav items -->
     
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown text="Registracija" right v-if="!user">
          <b-dropdown-item><router-link :to="{ name: 'SignupKorisnik' }">KORISNIK</router-link></b-dropdown-item>
          <b-dropdown-item><router-link :to="{ name: 'SignupSalon' }">SALON</router-link></b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item nav-link right v-if="!user" class="prijava"><router-link :to="{ name: 'LoginKorisnik' }">Prijava</router-link></b-nav-item>
        <b-nav-item nav-link right @click="redirectUser()" v-if="user">{{ user.email }}</b-nav-item>
        <b-nav-item nav-link right @click="odjava" v-if="user">Odjava</b-nav-item>
      </b-navbar-nav>
      
    </b-collapse>
  </b-container>
  </b-navbar>
  
   

</div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'Navbar',
    data(){
        return{
          user: null,
          logiran:{}
          
        }
    },
    methods: {
        odjava(){
          firebase.auth().signOut().then(() => {
              this.$router.push({ name: 'Home' })
          })  
        },
        redirectUser(){
          var email_logiranog = firebase.auth().currentUser.email;
            db.collection("korisnici").where("email_korisnika", "==", email_logiranog).get()
                .then(querySnapshot => {
                  if(!querySnapshot.empty){
                    this.$router.push('/pocetna-korisnik')
                  }else{
                    this.$router.push('/pocetna-salon')
                  }
                  
                })
        }
    },
    created(){
      //let user = firebase.auth().currentUser
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.user = user
        } else {
          this.user = null
        }
      })
    }
}

</script>

<style>
.navbar-color{
 background-color: #463D36;
}
.navbar-light .navbar-brand {
    color: white;
}
.navbar-light .navbar-nav .nav-link {
    color: white;
}
.router-link-active{
    color: white;
}
.router-link-active:hover{
    text-decoration: none;
    color: #212529;
}
a{
    color: #212529;
}
a:hover{
    text-decoration: none;
    color: #212529;
}

.prijava a{
  color: white;
}

.prijava a:hover{
  color: #212529;
}


</style>