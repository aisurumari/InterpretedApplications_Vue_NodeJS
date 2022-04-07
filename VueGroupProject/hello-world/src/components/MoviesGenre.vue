<template>

    <div>
    <h1 class="header" >Films by genre</h1>

    <dl class="list-item" v-for="(index, val) in jsonData" :key="val" >
      <dt @click="changeState(val)">{{jsonData[val]}}</dt>
      <div v-if="genreState[val]">
          <dd  class="list-item-body" v-for="i in getGroup(val)" :key="i">{{i.title}}</dd>
      </div>
      
    </dl>

    </div>
    
</template>

<script>
import _ from 'lodash';
let genreState = []
let gen 


export default {
  props: {
    jsonData: Array,
    jsonMovies: Array
  },

  data(){

    for(let i=0; i<this.jsonData.length; i++){
      genreState.push(false)
    }
    return {genreState}
    
  },


  methods: {
    changeState: function(index){
      genreState[index] = ! genreState[index]
      console.log(genreState[index])
      this.$forceUpdate();
      //vm.$forceUpdate();
    },
    getGroup: function(index){
      gen = this.jsonData[index]
      console.log(gen)
      let some = _.filter(this.jsonMovies, function(o){return o.genres==gen})
      some = _.slice(some, 0, 100)
      console.log(some.length)
      return some
    }

  }
  
}

</script>

<style scoped>

.list-item{
    background-color: #fffefe;
    border-top-left-radius: 20px ;
    border-top-right-radius: 20px;
    padding:10px;
    margin-left: 120px;
    margin-right: 120px;
    opacity: 0.8;

}
.list-item:hover {
  -webkit-box-shadow: inset 0px 0px 8px 5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0px 0px 8px 5px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0px 0px 8px 5px rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 128, 0, 0.521);
}
 
.list-item-body{
    background-color: #dfdfdfcc;
    border-radius: 10px;
    padding:10px;
    margin-block: 15px;
    display: block;

}
.header{
    margin-left: 120px;
}

</style>
