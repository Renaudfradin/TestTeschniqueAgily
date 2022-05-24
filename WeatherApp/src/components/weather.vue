<script>
import { defineComponent  } from "vue";
import axios from "axios"
export default defineComponent ({
    name: 'Weather',
    props: {
        city:String
    },
    data(){
        return{
            urlApi: "http://localhost:3005/meteo",
            humidityCurrent: null,
            iconCurrent: null,
            pressureCurrent: null,
            weatherCurrent: null,
            weatherDayCurrent: null,
            weatherNightCurrent: null,
            windCurrent: null,
            nextDay: [ ]
        }
    },
    methods:{
        getMetheo(){
            axios.get(`${this.urlApi}/${this.city}`)
            .then(response =>{
                this.humidityCurrent= response.data.meteocurent.humidityCurrent;
                this.iconCurrent= response.data.meteocurent.iconCurrent;
                this.pressureCurrent= response.data.meteocurent.pressureCurrent;
                this.weatherCurrent= response.data.meteocurent.weatherCurrent;
                this.weatherDayCurrent= response.data.meteocurent.weatherDay_current;
                this.weatherNightCurrent= response.data.meteocurent.weatherNight_current;
                this.windCurrent= response.data.meteocurent.windCurrent;
                this.nextDay= response.data.nextDay;
            })
        }

    },
    mounted(){
        this.getMetheo();
    }
    
})
</script>
<template>
<div class="curentNextDay">
    <div class="curent">
        <div class="top">
            <img :src="`https://openweathermap.org/img/wn/${iconCurrent}.png`" alt="" srcset="">
            <p>{{city}}</p>
            <p>{{weatherCurrent}} °C</p>
        </div>
        <div class="today">
            <div class="left">
                <p>Jour - {{weatherDayCurrent}} °C</p>
                <p>Nuit - {{weatherNightCurrent}} °C</p>
                <p>Humidité - {{humidityCurrent}} %</p>
            </div>
            <div class="right">
                <p>Pression - {{pressureCurrent}} hPa</p>
                <p>Vent - {{windCurrent}} Km/h</p>
            </div>
        </div>
    </div>
    <div class="next_days">
        <div v-for="(next , index) in nextDay" v-bind:key="index" class="next_day">
            <img :src="`https://openweathermap.org/img/wn/${next.next_Dayicon}.png`" alt="" srcset="">
            <p>{{next.next_DayWeather}}</p>
        </div>
    </div>
</div>
    
</template>

<style>
.curent{
    background-color: #114603;
    width: 25%;
    margin-left: 30px;
    color: white;
    border-radius: 15px 15px 0px 0px;
    align-items: flex-end;
    bottom: 0;
    height: 150px;
}
.top{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.today{
    display: flex;
    justify-content: space-evenly;
}
.curentNextDay{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 100vh;
}
.next_days{
    width: 15%;
    margin-right: 30px;
    margin-top: 4%;
}
.next_day{
    background-color: #114603;
    color: white;
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    height: 80px;
    margin-bottom: 20px;
    width: 100%;
    padding: 10px;
    align-items: center;
}
@media screen and (max-width:768px){
  .curentNextDay{
    display: flex;
    flex-direction: column;
    padding: 15px;
  }
  .curent{
    background-color: #114603;
    width: 100%;
    margin-left: 0px;
    color: white;
    border-radius: 15px;
    align-items: flex-end;
    bottom: 0;
    height: 150px;
  }
  .next_days{
    width: 100%;
    margin-right: 0px;
    margin-top: 4%;
 }
}

@media screen and (max-width:1024px) and (min-width: 769px){
  .curentNextDay{
    display: flex;
    justify-content: space-between;
 }
  .curent{
    background-color: #114603;
    width: 40%;
    margin-left: 30px;
    color: white;
    border-radius: 15px 15px 0px 0px;
    align-items: flex-end;
    bottom: 0;
    height: 150px;
 }
  .next_days{
    width: 50%;
    margin-right: 30px;
    margin-top: 5%;
 }
}

@media screen and (max-width:1440px) and (min-width: 1025px){
  .curentNextDay{
    display: flex;
    justify-content: space-between;
 }
  .curent{
    background-color: #114603;
    width: 40%;
    margin-left: 30px;
    color: white;
    border-radius: 15px 15px 0px 0px;
    align-items: flex-end;
    bottom: 0;
    height: 150px;
 }
  .next_days{
    width: 30%;
    margin-right: 30px;
    margin-top: 5%;
 }
}
</style>