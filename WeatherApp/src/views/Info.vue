<script>
import { defineComponent  } from "vue";
import Weather from "@/components/weather.vue";
export default defineComponent ({
  components: { Weather },
    data(){
        return{
            cityGet: this.$route.params.city
        }
    }

})
</script>
<template>
    <div class="info_page">
        <a href="/" class="btn_back">←</a>
        <Weather :city="cityGet"/>
    </div>
</template>

<style>
.btn_back{
    background-color: #114603;
    color: white;
    height: 20px;
    text-decoration: none;
    position: absolute;
    margin-left: 30px;
    padding: 10px;
    height: 40px;
    border-radius: 20px;
    margin-top: 20px;
    
}
.info_page{
    background-image: url("../assets/paris.jpg");
    height: 100vh;
}

@media screen and (max-width:768px){
  .btn_back{
    background-color: #114603;
    color: white;
    height: 20px;
    text-decoration: none;
    position: inherit;
    margin-left: 30px;
    padding: 10px;
    height: 40px;
    border-radius: 20px;
    margin-top: 0px;
    display: initial;
 }
}
</style>