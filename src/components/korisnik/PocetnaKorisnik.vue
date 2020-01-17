<template>
<b-container>
  <div role="group">
    <input v-model="searchTerm" class="search form-control mr-sm-2 upis-mjesta" type="search" placeholder="Upišite mjesto" aria-label="Search">
  <div class="card text-center">
    <div v-for="salon in filteredCards" :key="salon.id">
      
      <div class="card-header font-weight-bold">
          <div>{{salon.naziv_salona}}</div>
      </div>
      <div class="card-body text-left offset-lg-5">
          <div>
            <label>Ime vlasnika: <div class="d-inline font-weight-bold">{{salon.ime_vlasnika}}</div></label>
          </div>
          <div>
            <label>Prezime vlasnika: <div class="d-inline font-weight-bold">{{salon.prezime_vlasnika}}</div></label>
          </div>
          <div>
            <label>Adresa: <div class="d-inline font-weight-bold">{{salon.adresa}}</div></label>
          </div>
         <div>
            <label>Grad: <div class="d-inline font-weight-bold">{{salon.grad}}</div></label>
         </div>
         <div>
            <label>Email: <div class="d-inline font-weight-bold">{{salon.email_salona}}</div></label>
         </div>
          <div>
            <label>Kontakt: <div class="d-inline font-weight-bold">{{salon.kontakt}}</div></label>
          </div>
        
        <button class="btn btn-primary offset-sm-1 mt-sm-2">
            <router-link :to="{name: 'OdabraniSalon', params: {imeSalona: salon.korisnickoImeSalona}}"> 
              <div class="otvori">ODABERI</div>
            </router-link>
        </button>

      </div>
      
    
      <div class="card-footer text-muted">
        <div>{{salon.korisnickoImeSalona}}</div>
      </div>
    </div>
  </div>
    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">
      Enter at least 3 letters
    </b-form-invalid-feedback>

    <!-- This is a form text block (formerly known as help block) -->
  
  </div>
</b-container>
</template>

<script>
import db from '@/firebase/init'

export default {
    data(){
        return {
            name: 'PocetnaKorisnik',
            saloni: [],
            searchTerm:''
        }
    },
    mounted(){
      db.collection("saloni")
      .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {

              if (change.type === "added") {
                let doc = change.doc
                let salon = doc.data()
                this.saloni.push(salon)
                
              }
              if (change.type === "removed") {
                  console.log("Removed city: ", change.doc.data());
              }
          });
      });
    },
    computed:{
      filteredCards() {
      return this.saloni.filter(salon => salon.grad.includes(this.searchTerm));
    }
    }
}
</script>

<style>

.otvori{
  color: white;
}

.upis-mjesta{
  margin: 30px 0px;
 
}


.card-footer {
  margin-bottom: 30px;

}

.card{
  background-color: rgb(209, 205, 201);
}

.card-header{
  background-color: rgb(189, 183, 175);
}
body{
    background-color: #a69180;
}
.btn-primary{
    background-color: #463D36;
    border-color: #463D36;
}
.btn-primary:hover{
    background-color: rgb(115, 190, 100);
    border-color: rgb(115, 190, 100);
}

</style>