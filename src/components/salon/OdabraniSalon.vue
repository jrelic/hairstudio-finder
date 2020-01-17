<template>
   <b-container>
       <div>
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
                    <router-link :to="{name: 'ZakaziTermin'}"> 
                        <button class="btn btn-primary">Zakaži termin</button>
                    </router-link>
                </div>
            </div>            
    </div>

</div>

       </div>
   </b-container>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
export default {
    data(){
        return{
            salon:{},
            frizeri:[]
        }
    },
    created(){
        var slug = slugify(this.$route.params.imeSalona, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })

        let salon = db.collection("saloni").doc(slug)

        salon.get().then((doc) =>{
            this.salon = doc.data()
        })

        let frizeri
        frizeri = salon.collection('frizeri').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let frizer = doc.data()
                this.frizeri.push(frizer)
            });
        })
        console.log(frizeri)
            
    }
}
</script>

<style>

</style>