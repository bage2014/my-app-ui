<template>
  <div>
      <v-row align="center">
        <v-col cols="3">
          <v-autocomplete
            v-model="companyValue"
            :items="companys"
            :filter="companyFilter"
            color="black"
            item-text="name"
            label="Company"            
          ></v-autocomplete>
        </v-col>
        <v-col cols="7">
          <v-text-field
            color="black"
            v-model="companyNo"
            label="No"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            color="success"
            @click="query"
          >
            Query
          </v-btn>
        </v-col>
      </v-row>
    <v-timeline>
      <v-timeline-item
        v-for="(year, i) in years"
        :key="i"
        :color="year.color"
        small
      >
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-bold ${year.color}--text`"
            v-text="year.year"
          ></span>
        </template>
        <div class="py-4">
          <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">Lorem ipsum</h2>
          <div>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>

  import axios from "../plugins/axios.js";

  let companys = [];
  let companyValue = null;
  let companyNo = null;

  export default {
    data: () => ({
      years: [
        {
          color: 'cyan',
          year: '1960',
        },
        {
          color: 'green',
          year: '1970',
        },
        {
          color: 'pink',
          year: '1980',
        },
        {
          color: 'amber',
          year: '1990',
        },
        {
          color: 'orange',
          year: '2000',
        },
      ],
      companys: companys,
      companyValue: companyValue,
      companyNo: companyNo
    }),
    methods: {
      companyFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      refresh () {
        let that = this;
        axios.get('/delivery/companyPairs/load', {
        }).then(function (response) {
          console.log(response);
          if(response.code === 200){
            let result = [];
            for (let i = 0; i < response.data.length; i++) {
              const element = response.data[i];
              result.push({ 
                name: element.name, 
                abbr: element.code, 
                id: i+1 
                });
            }
            that.companys = result;
          }
        }).catch(function (error) {
            console.log(error);
        });
      },      
      query () {        
        let that = this;
        console.log(that.companyValue + "；" + that.companyNo);
        axios.get('/delivery/companyPairs/load', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }).then(function (response) {
          console.log(response);
          if(response.code === 200){
            let result = [];
            for (let i = 0; i < response.data.length; i++) {
              const element = response.data[i];
              result.push({ 
                name: element.name, 
                abbr: element.code, 
                id: i+1 
                });
            }
            that.companys = result;
          }
        }).catch(function (error) {
            console.log(error);
        });
      },
    },

    mounted() {
      this.refresh()
    }
  }
</script>