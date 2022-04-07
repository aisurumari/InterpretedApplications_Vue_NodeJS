<template>
  <div>
    <h1 class="header" >Films by cast</h1>

    <dl class="list-item"  v-for="(index, val) in listSize" :key="val">

      <dt @click="changeState(val)">{{casts[val]}}</dt>
      <div v-if="castState[val]">
          <dd  class="list-item-body" 
          v-for="i in getCast(val)" :key="i">{{i.title}}</dd>
      </div>
      
    </dl>

  </div>
</template>

<script>
import _ from 'lodash';

let castSet = new Set()
let casts = []
let castState = []

let listSize
const LIST_SIZE = 100;

let cas

export default {
  name: "MoviesCast",
  props:{
    jsonData: Array
  },
  data(){
    listSize = LIST_SIZE

    for(let i in this.jsonData){
      castSet.add(this.jsonData[i].cast)
    }
    let castsArray = _.filter(Array.from(castSet),function(o){return Array.isArray(o) && o.length!=0})

    casts =_.flatten(castsArray)

    for(let i=0; i<casts.length; i++){
      castState.push(false)
    }

    if(casts.length < listSize){
      listSize = casts.length
    }else{
      listSize = LIST_SIZE
    }

    return {casts,castState,listSize}
  },
  methods:{
    changeState: function(index){
      castState[index] = !castState[index]
      console.log(castState[index])
      this.$forceUpdate()
    },
    getCast: function(index){
      cas = casts[index]
      console.log(cas)
      for(let i in this.jsonData){
        if(this.jsonData[i].cast.includes(cas)){
          console.log('Cast exists')
        }
      }
      let some = _.filter(this.jsonData, function(o){return o.cast.includes(cas)})
      some = _.slice(some,0, 100)
      console.log(some.length)

      return some
    },
    expand(){
      if(casts.length < listSize){
        listSize = casts.length
      }else{
        listSize += LIST_SIZE
      }
      console.log("Show more clicked")
      this.$forceUpdate()
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

.btn{
  font-size: 30px;
  margin-top: 20px;
}
</style>