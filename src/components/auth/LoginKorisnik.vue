<template>
<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

<form @submit.prevent="loginKorisnik" class="container">
        <h3>Prijava</h3>
  <div class="form-group">
    <label for="email-adresa">Email adresa: </label>
    <input type="email" class="form-control" id="email-adresa" aria-describedby="emailHelp" placeholder="Unesite email" v-model="email">
  </div>
  <div class="form-group">
    <label for="lozinka">Lozinka: </label>
    <input type="password" class="form-control" id="lozinka" placeholder="Unesite lozinku" v-model="lozinka">
  </div>
  <p class="text-danger text-center" v-if="feedback">{{ feedback }}</p>
  <button type="submit" class="btn btn-primary">Prijavi me!</button>
</form>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'LoginKorisnik',
    data(){
        return {
            email: null,
            lozinka: null,
            feedback: null
        }
    },
    methods: {
        loginKorisnik(){
            if(this.email && this.lozinka){
                firebase.auth().signInWithEmailAndPassword(this.email, this.lozinka)
                .then( ()=> {
                    db.collection("korisnici").where("email_korisnika", "==", this.email).get()
                        .then(querySnapshot => {
                          console.log(querySnapshot)
                          if(!querySnapshot.empty){
                            
                            this.$router.push('/pocetna-korisnik')
                          }else{
                            this.$router.push('/pocetna-salon')
                          }
                          
                        })
                }).catch(err => {
                    this.feedback = err.message
                })
                this.feedback = null
            } else {
                this.feedback = 'Ispunite sva polja!'
            }
        }
    }
}
</script>

<style>
body{
    background-color: #a69180;
}
form{
    margin: 30px 30px;
}
form h3{
    text-align: center;
}
.btn-primary{
    background-color: #463D36;
    border-color: #463D36;
}
.btn-primary:hover{
    background-color: rgb(115, 190, 100);
    border-color: rgb(115, 190, 100);
}
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: rgb(209, 205, 201);
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

</style>