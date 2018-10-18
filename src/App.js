import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount(){
    this.renderMap();
  }
  
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCN7h8eGQclRO0ZhUL7TGu2upGWa-4YHbo&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.7356894, lng: -83.54819979999999},
          zoom: 8
        });
      }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

/*
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCN7h8eGQclRO0ZhUL7TGu2upGWa-4YHbo&callback=initMap"
    async defer></script>
*/

function loadScript(url){
  var index = window.document.getElementsByTagName('script')[0]
  var script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
