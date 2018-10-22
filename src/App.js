import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount(){
    this.getVenus();
  }
  
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCN7h8eGQclRO0ZhUL7TGu2upGWa-4YHbo&callback=initMap")
    window.initMap = this.initMap
  }

  getVenus = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "51WWNTHABB5J114P3QLN1ZHKLY3PIGRHMF5AJSO5MPO42HTC",
      client_secret: "RPZIBZ012VBJI3D1ASIAHLMTHT2N3AWZQV13C12FNSAFDDIM",
      section: "topPicks",
      ll: "41.7356894, -83.54819979999999",
      v: "20180323"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log('ERROR! ' + error)
        alert('There was an error getting information from Foursquare')
      })
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.7356894, lng: -83.54819979999999},
    zoom: 12
    })

    var infowindow = new window.google.maps.InfoWindow

    this.state.venues.map(myVenue => {

      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, 
                   lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name,
        address: myVenue.venue.location.address
      })

      marker.addListener('click', function() {
        infowindow.setContent('<div>' + marker.title + '<br>' + 
                              marker.address + '<br>' + '</div>')
        infowindow.open(map, marker);
      })
    })

  }

  render() {
    return (
      <main>
        <div id="map"></div>
        <footer>Location information provided by <a href="https://foursquare.com">Foursquare</a></footer>
      </main>
    );
  }
}

function loadScript(url){
  var index = window.document.getElementsByTagName('script')[0]
  var script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;