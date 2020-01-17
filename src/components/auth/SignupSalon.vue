<template>
<div class="wrapper fadeInDown">
  <div id="formContent">
    <form @submit.prevent="signupSalon" class="container">
        <h3>Registracija salona</h3>
  <div class="form-group">
    <label for="naziv-salona">Naziv salona: </label>
    <input type="text" class="form-control" id="naziv-salona" placeholder="Unesite naziv salona" v-model="naziv_salona">
  </div>
 <div class="form-group">
    <label for="ime">Ime vlasnika: </label>
    <input type="text" class="form-control" id="ime" placeholder="Unesite ime vlasnika" v-model="ime_vlasnika">
  </div>
  <div class="form-group">
    <label for="prezime">Prezime vlasnika: </label>
    <input type="text" class="form-control" id="prezime" placeholder="Unesite prezime vlasnika" v-model="prezime_vlasnika">
  </div>
  <div class="form-group">
    <label for="adresa">Adresa salona: </label>
    <input type="text" class="form-control" id="adresa" placeholder="Unesite adresu salona" v-model="adresa">
  </div>
  <div class="form-group">
    <label for="grad">Grad: </label>
    <input type="text" class="form-control" id="grad" placeholder="Unesite grad" v-model="grad">
  </div>
  <div class="form-group">
    <label for="kontakt">Kontakt telefon: </label>
    <input type="text" class="form-control" id="kontakt" placeholder="Unesite kontakt telefon" v-model="kontakt">
  </div>
    <div class="form-group">
    <label for="korisnicko-ime">Korisničko ime: </label>
    <input type="text" class="form-control" id="korisnicko-ime" placeholder="Unesite korisničko ime salona" v-model="korisnickoImeSalona">
  </div>
  <div class="form-group">
    <label for="email-adresa">Email adresa: </label>
    <input type="email" class="form-control" id="email-adresa" aria-describedby="emailHelp" placeholder="Unesite email" v-model="email">
  </div>
  <div class="form-group">
    <label for="lozinka">Lozinka: </label>
    <input type="password" class="form-control" id="lozinka" placeholder="Unesite lozinku" v-model="lozinka">
  </div>
  <p class="text-danger text-center" v-if="feedback">{{ feedback }}</p>
  <button type="submit" class="btn btn-primary">Registriraj salon!</button>
</form>
  </div>
</div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'SignupSalon',
    data(){
        return{
          naziv_salona: null,
          ime_vlasnika: null,
          prezime_vlasnika: null,
          adresa: null,
          grad: null,
          kontakt: null,
          korisnickoImeSalona: null,
          email: null,
          lozinka: null,
          feedback: null,
          slug: null
        }
    },
    methods: {
      signupSalon(){
            if(this.korisnickoImeSalona && this.ime_vlasnika && this.prezime_vlasnika && 
            this.adresa && this.grad && this.kontakt && this.email && this.lozinka && this.naziv_salona){
                this.slug = slugify(this.korisnickoImeSalona, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                let ref = db.collection('saloni').doc(this.slug)
                ref.get().then(doc => {
                    if(doc.exists){
                        this.feedback = 'Upisano korisničko ime je zauzeto!'
                    } else {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.lozinka)
                        .then(cred => {
                            ref.set({
                                naziv_salona: this.naziv_salona,
                                ime_vlasnika: this.ime_vlasnika,
                                prezime_vlasnika: this.prezime_vlasnika,
                                korisnickoImeSalona: this.korisnickoImeSalona,
                                adresa: this.adresa,
                                grad: this.grad,
                                kontakt: this.kontakt,
                                id_salona: cred.user.uid,
                                email_salona: this.email
                            })
                        }).then(() => {
                            this.$router.push({ name: 'PocetnaSalon' })
                        })
                        .catch(err => {
                            this.feedback = err.message
                        })
                    }
                })
            } else{
                this.feedback = "Ispunite sva polja!"
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