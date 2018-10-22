import React, { Component } from 'react'
import Header from './components/header'
import SideBar from './components/sideBar'
import MapDiv from './components/mapDiv'
import axios from 'axios'
import './App.css'


class App extends Component {
  state = {
    venues: [],
    markers: [],
    sideBarOpen: false,
    ariaExpand: false
  }

/**
 * Invoked immediately all map's info
 * once it's mounted
 */
  componentDidMount() {
    this.requestVenues()
  }

  setMap = () => {
   loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCN7h8eGQclRO0ZhUL7TGu2upGWa-4YHbo&callback=initMap")
   window.initMap = this.initMap
  }

 /**
  * Set up endPoints and Fetch data for locations
  * from FourSquare API-
  * as a third party API
  */
  requestVenues = () => {
   const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
   const parameters = {
     client_id: '51WWNTHABB5J114P3QLN1ZHKLY3PIGRHMF5AJSO5MPO42HTC',
     client_secret: 'RPZIBZ012VBJI3D1ASIAHLMTHT2N3AWZQV13C12FNSAFDDIM',
     section: 'topPicks',
     ll: "41.7356894, -83.54819979999999",
     v: "20180323"
  }

  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
     this.setState({
      venues: response.data.response.groups[0].items.slice(0, 12)
     }, this.setMap())
   })
   .catch(err => {
    console.log("Error: " + err)
    alert("Error occurred while fetching data from four square API!")
   })
 }

/**
 * Initialize and add the map, venues markers,
 * info windows and set their positions
 */
 initMap = () => {
  let myLatLng = {lat: 41.7356894, lng: -83.54819979999999}
  // Create a map object and specify the DOM element
  // for display.
  let myMap = new window.google.maps.Map(document.getElementById("map"),
  {
    center: myLatLng,
    Zoom: 16
  })

  let bounds = new window.google.maps.LatLngBounds()
  
  let infoWindow = new window.google.maps.InfoWindow()
    this.state.venues.forEach(myVenue => {
      console.log(myVenue)
      let name = `${myVenue.venue.name}`
      let addressOne = `${myVenue.venue.location.formattedAddress[0]}`
      let addressTwo = `${myVenue.venue.location.formattedAddress[1]}`
      let addressThree = `${myVenue.venue.location.formattedAddress[2]}`
      let category = `${myVenue.venue.categories[0].name}`

      //Creates content for InfoWindow: added in a test image
      let contentString = `<div className="content" tabIndex="0">
                              <h3 id="venue" tabIndex="0">${name}</h3>
                              <p id="adress" tabIndex="0"><b>${addressOne}<br>
                                 ${addressTwo}<br>
                                 ${addressThree}</b>
                              </p>
                             <div id="body" tabIndex="0">
                              <p tabIndex="0">Type: ${category} </p>
                              <p>Information provided by FourSquare</p>
                             </div>
                          </div>`

     //Create a marker and set its position for each venue.
     let myMarker = new window.google.maps.Marker({
      map: myMap,
      position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
      title: myVenue.venue.name,
      id: myVenue.venue.id,
      name: myVenue.venue.name,
      venue: myVenue.venue,
      draggable: false,
      animation: window.google.maps.Animation.drop,
    })

    let venue = new window.google.maps.LatLng(myMarker.position.lat(), myMarker.position.lng())
    bounds.extend(venue)

   
    function toggleBounce(marker) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
      setTimeout(() => {
        marker.setAnimation(null)
      }, 1500)
    }

 /**
  * Listens for a click on a marker
  * to open infoWindow
  */
   myMarker.addListener('click', () => {
     myMap.setCenter(myMarker.getPosition())
     console.log(myMarker)
     toggleBounce(myMarker)

     
      infoWindow.setContent(contentString)

      
      infoWindow.open(myMap, myMarker)
    })
    this.setState({
      markers: [...this.state.markers, myMarker]
    })
    myMap.fitBounds(bounds)
    myMap.panToBounds(bounds)
   })
 }

 
 hamToggleClickHandler = () => {
  this.setState((prevState) => {
    return {
      sideBarOpen: !prevState.sideBarOpen,
      ariaExpand: !prevState.ariaExpand
    }
  })
 }

 //Closes sidebar when menu icon is clicked
 sideCloseClickHandler = () => {
  this.setState({sideBarOpen: false, ariaExpand: false})
 }

 handleMarkerClickEvent = (name) => {
   const newMarker = this.props.markers.find(marker => marker.title === name.venue.name)
   window.google.maps.event.trigger(newMarker, 'click')
 }

 render() {
   let sideBar

   if (this.state.sideBarOpen) {
    sideBar = <SideBar venues={this.state.venues}
    map={this.state.myMap}
    markers={this.state.markers}
    newState={this.filterMarkers}/>
  }

  return (
    <div style={{height: '100%'}}>
      <Header click={this.hamToggleClickHandler} ariaExpand="this.state.ariaExpand"/>
       {sideBar}
      <MapDiv />
    </div>
  )
 }
}

export default App

/**
 * Asynchronously loads JavaScript
 * <script> tags on the page.
 * Creating script tag for HTML
 * Elharony walkthrough helped understand
 * how to code the loadScript
 * https://www.youtube.com/channel/UCcWSbBe_s-T_gZRnqFbtyIA
 */
function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0]
  const gm_authFailure = window.gm_authFailure = function() {
    alert('Google maps failed to load! Please try again later.')
  }
  const script = window.document.createElement('script')
  script.setAttribute('id', 'map-script')
  script.setAttribute('onerror', 'gm_authFailure')
  script.defer = true
  script.async = true
  script.src = url
  document.body.appendChild(script, index, gm_authFailure)
}
