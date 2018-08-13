import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})


function getApiData(url){
  var result = [];
  fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          result = data;});
  alert(result);
  return result;
}