const express = require("express");
const app = express();
const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 10});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/',(req, res, next)=>{
    return res.status(200).json({
        statusCode: 200,
        message:"api testTechnique"
    })
})

app.get('/meteo/:city', async (req, res, next)=>{
    let key_api = '3bb44ad73a13161159832d921352f64f';
    let url_geo = 'http://api.openweathermap.org/geo/1.0/direct?';
    let url_weather = 'http://api.openweathermap.org/data/2.5/onecall?';
    let lon = null;
    let lat = null;
    let lang = 'fr';
    let weatherCurrent = null;
    let weatherDay_current = null;
    let weatherNight_current = null;
    let humidity_current = null;
    let pression_current = null;
    let vent_current = null;
    let icon_current = null;
    let curent_Day = null;
    let next_DayResult = null;
    let next_Day = [];

    if (cache.has("curentDay") && cache.has("nextDay")) {
        return res.status(200).json({
            statusCode: 200,
            message:"OK",
            meteocurent: cache.get("curentDay"),
            nextDay: cache.get("nextDay")
        })
    } else {
        await axios.get(`${url_geo}q=${req.params.city}&appid=${key_api}`)
        .then(response =>{
            lon = response.data[0].lon;
            lat = response.data[0].lat;
        })
        await axios.get(`${url_weather}lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${key_api}`)
            .then(response => {
                weatherCurrent = response.data.current.temp
                humidity_current = response.data.current.humidity;
                pression_current = response.data.current.pressure;
                vent_current = response.data.current.wind_speed;
                weatherDay_current = response.data.daily[0].temp.day;
                weatherNight_current = response.data.daily[0].temp.night;
                icon_current = response.data.current.weather[0].icon;
                next_DayResult = response.data.daily;
            })

            for (let i = 0; i < next_DayResult.length; i++) {
                let next_DayWeather = next_DayResult[i].temp.day;
                let next_Dayicon = next_DayResult[i].weather[0].icon;
                next_Day.push({"next_DayWeather": next_DayWeather,"next_Dayicon": next_Dayicon})
            }

            curent_Day = {
                "weatherCurrent": + weatherCurrent,
                "humidityCurrent": + humidity_current,
                "pressureCurrent": + pression_current,
                "windCurrent": + vent_current,
                "weatherDay_current": + weatherDay_current,
                "weatherNight_current": + weatherNight_current,
                "iconCurrent": + icon_current
            };
           
            /*set cache*/
            cache.set("curentDay",curent_Day);
            cache.set("nextDay",next_Day);
            
            /*list key cache*/
            mykeys = cache.keys();
            console.log(mykeys);
        }

    return res.status(200).json({
        statusCode: 200,
        message:"OK",
        meteocurent: curent_Day,
        nextDay: next_Day
    })
})

module.exports = app;