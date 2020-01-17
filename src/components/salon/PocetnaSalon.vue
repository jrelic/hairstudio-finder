<template>
    <div class="container">
        <div class="card mb-3">
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title"><div>{{salon.naziv_salona}}</div></h5>

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
           <router-link :to="{name: 'DodajFrizera', params: {imeSalona: salon.korisnickoImeSalona }}"> 
            <button class="btn btn-primary">Dodaj Frizera</button>
        </router-link>
        </div>
      
        </div>
    
  <div class="card-deck justify-content-center">
          <div v-for="frizer in frizeri" :key="frizer.id">
                <div class="card mb-sm-4" style="width: 18rem;">
                      <img src="https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png" class="card-img-top" alt="">
                      <div class="card-body">
                          <h5 class="card-title text-center">{{frizer.ime}} {{frizer.prezime}}</h5>
                      </div>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item">{{frizer.email}}</li>
                          <li class="list-group-item">{{frizer.telefon}}</li>
                      </ul>
                      <div class="card-body text-center">
                          <button @click="obrisi(frizer.id)" class="btn btn-danger">Obriši</button>
                          
                      </div>
                  </div>            
          </div>

</div>



       
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import slugify from 'slugify'

export default {
    name: 'PocetnaSalon',
    data(){
        return {
            salon:{},
            email_salona:'',
            frizeri:[],
            korisnickoImeSalona:''

        }
    },
    methods:{
      obrisi(id){
        db.collection('saloni').doc(this.salon.id).collection('frizeri').doc(id).get()
        .then((querySnapshot) =>{
          querySnapshot.ref.delete()
         
        })
      }
    },
  
    mounted(){

        this.email_salona = firebase.auth().currentUser.email;
        db.collection("saloni").where("email_salona", "==", this.email_salona).get()
            .then(querySnapshot => {

                querySnapshot.forEach(doc => {
                this.salon = doc.data()
                this.salon.id = doc.id
                
                var slug = slugify(doc.data().korisnickoImeSalona, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })


                  let salon = db.collection("saloni").doc(slug)

                  salon.collection('frizeri')
                  .onSnapshot(snapshot => {
                      snapshot.docChanges().forEach(change => {

                        if(change.type === 'added'){

                          let doc = change.doc
                          let frizer = doc.data()
                          frizer.id = doc.id
                          this.frizeri.push(frizer)
                        }
                        else if( change.type === 'removed'){
                           this.frizeri = this.frizeri.filter(frizeri =>{
                            return frizeri.id != change.doc.id
                          })
                        }
                          
                      });
                  })

                });
            })
            


          
        
        
    }
}
</script>

<style>
body{
    background-color: #a69180;
}
.card{
  background-color: rgb(209, 205, 201);
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