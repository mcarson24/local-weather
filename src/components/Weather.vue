<template>
  <div id="weather">
    <div class="header">
      <h1>Free C<span><i class="fa fa-sun-o" aria-hidden="true"></i></span>de Camp</h1>
      <h1>Weather App</h1>
    </div>
    <div class="weather">
      <h2>{{ location }}</h2>
      <h2>{{ temperatureInFahrenheit }}&deg; F</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'weather',
  data () {
    return {
      latitude: '',
      longitude: '',
      weatherDescription: '',
      location: '',
      temperature: ''
    }
  },
  methods: {
    coordinatesAreEmpty() {
        return this.latitude == '' && this.longitude == '';
    },
    geolocate() {
        if (typeof(navigator.geolocation !== 'undefined')) {
            navigator.geolocation.getCurrentPosition(position => {
                this.latitude = position.coords.latitude ;
                this.longitude = position.coords.longitude;
            });
        }
        if (this.coordinatesAreEmpty()) {
            // Use ipinfo to grab coordinates based on IP Address
            axios.get('http://ipinfo.io/json').then(response => {
                let location = response.data.loc;
                this.latitude = location.substring(0, 6);
                this.longitude = location.substring(location.indexOf(',') +1);
            });
        }
    },
    getLocalWeather() {
        let url = `http://api.openweathermap.org/data/2.5/weather?apikey=98dad75144cd7378516e1d74ddbb7e59&lat=${this.latitude}&lon=${this.longitude}`;
        axios.get(url).then(response => {
            let data = response.data;
            console.log(data);
            this.weatherDescription = data.weather[0].main;
            this.location = `${data.name}, ${data.sys.country}`;
            this.temperature = data.main.temp;
        }).catch(error => {
            console.log(error);
        });
    }
  },
  computed: {
      temperatureInFahrenheit() {
          // The temperature is returned in Kelvin; 
          // convert it to fahrenheit.
          return Math.floor((this.temperature * (9/5)) - 459.67);
      }
  },
  created() {
      this.geolocate();
      setTimeout(this.getLocalWeather, 100);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
