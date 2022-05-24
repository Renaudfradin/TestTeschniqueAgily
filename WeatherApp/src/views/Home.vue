<script>
import { defineComponent  } from "vue";
export default defineComponent ({
  data(){
    return{
      city:null,
    }
  },
  methods:{
    getCityUrl(){
      this.cityUrl = `/info/${this.city}`
    }
  },
  beforeUpdate(){
    this.getCityUrl();
  }
})
</script>

<template>
  <div class="home">
    <h2 class="title1">The Forecast</h2>
    <h2 class="title2">Weather App</h2>
    <form :action="cityUrl" method="get">
      <input 
        type="text" 
        v-model="city"
        class="inputCity"
        placeholder="Search"
      >
    </form>
  </div>
  
 
</template>

<style>
.home{
  height: 100vh;
  background-color: #134601;
  display:flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.title1{
  color: #27c765;
  font-size: 50px;
  font-family: fantasy;
}
.title2{
  color: #d2e59a;
  font-size: 50px;
  font-family: fantasy;
}
.inputCity{
  width: 30%;
  height: 60px;
  border-radius: 20px;
  padding: 20px;
  border-color: white;
}

.inputCity::placeholder{
  color: #134601;
  font-family: fantasy;
  font-size: 15px;
}

@media screen and (max-width:768px){
  .inputCity{
    width: 90%;
    height: 60px;
    border-radius: 20px;
    padding: 20px;
    border-color: white;
  }
}

@media screen and (max-width:1350px) and (min-width:769px){
  .inputCity{
    width: 60%;
    height: 60px;
    border-radius: 20px;
    padding: 20px;
    border-color: white;
  }
}
</style>
