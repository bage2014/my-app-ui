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
            label="快递公司"            
          ></v-autocomplete>
        </v-col>
        <v-col cols="7">
          <v-text-field
            color="black"
            v-model="companyNo"
            label="快递编号"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            color="success"
            @click="query"
          >
            查询
          </v-btn>
        </v-col>
      </v-row>
    <v-timeline>
      <v-timeline-item
        v-for="(item, i) in timelines"
        :key="i"
        :color="item.color"
        small
      >
        <!--<template v-slot:opposite>
          <span
            :class="`headline font-weight-bold ${item.color}--text`"
            v-text="item.time"
          ></span>
        </template>-->
        <div class="py-4">
          <h2 :class="`headline font-weight-light mb-4 ${item.color}--text`">{{item.time}}</h2>
          <div>
            {{item.desc}}
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>

  import axios from "../plugins/axios.js";

  let companys = [];
  let timelines = [];
  let companyValue = null;
  let companyNo = null;

  export default {
    data: () => ({
      timelines: timelines,
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
            that.companys = result.reverse();
          }
        }).catch(function (error) {
            console.log(error);
        });
      },      
      query () {        
        let that = this
        let expCode = null
        for (let i = 0; i < that.companys.length; i++) {
          const element = that.companys[i];
          if(that.companyValue == element.name){
            expCode = element.abbr
            break
          }
        }
        let queryCondition = {
            expCode: expCode,
            expNo: that.companyNo
        }
        axios.post('/delivery/query',queryCondition).then(function (response) {
          console.log(response);
          if(response.code === 200){
            let result = [];
            for (let i = 0; i < response.data.length; i++) {
              const element = response.data[i];
              result.push({ 
                color: 'cyan',
                time: element.acceptTime,
                desc: element.acceptStation
                });
            }
            that.timelines = result;
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