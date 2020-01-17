<template>
  <div>
    <date-picker
        v-model="value1"
        format="YYYY-MM-DD"
        type="date"
        placeholder="Select date"
      ></date-picker>
    <date-picker v-model="value5" type="time" placeholder="Select time"></date-picker>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
 
  export default {
    name:'ZakaziTermin',
    components: { DatePicker },
    data() {
      return {
        value1: null,
        value5: null,
      };
    },
  };
</script> 