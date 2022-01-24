import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { Observable } from 'rxjs'
import { HelperService } from 'src/app/services/helper/helper.service';
import { HttpClient } from '@angular/common/http';
declare var google

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss'],
})
export class MyMapComponent implements OnInit{


  locations: Observable<any>;
  user = null
  watch = null
  mapLoaded: boolean = false

  @ViewChild('map') mapElement: ElementRef;
  map: any
  markers = []

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    ) {
  }


  ngOnInit(){

    this.setCurrentLocation()

  }


  // getPlace(key){
  //   return this.http.get(
  //     this.helper.getApiUrl()+'misc/places/'+key,
  //     {headers: this.helper.header()}
  //   )
  // }

  setCurrentLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          if(!this.mapLoaded){
            this.loadMap(position.coords.latitude, position.coords.longitude)
            this.mapLoaded = true
          }
          else{
            let currposition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.map.setCenter(currposition);
            this.map.setZoom(17)
          }

          this.setCurrentPositionMarker(position)
          this.getLocationDetails(position.coords.latitude, position.coords.longitude)
        },
        () => {
          // handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter()!);
    }
    // navigator.geolocation.watchPosition((position, err) => {
    //   console.log('position:', position)
    //   console.log('err:', position)
    //   if(position){

    //     if(!this.mapLoaded){
    //       this.loadMap(position.coords.latitude, position.coords.longitude)
    //       this.mapLoaded = true
    //     }
    //     else{
    //       let currposition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //       this.map.setCenter(currposition);
    //       this.map.setZoom(17)
    //     }

    //     this.setCurrentPositionMarker(position)
    //     this.getLocationDetails(position.coords.latitude, position.coords.longitude)
    //   }
    // })
  }

  updateMap(location){
    this.markers.map(marker => marker.setMap(null));
    this.markers = []

    location.forEach(loc => {
      let latlng = new google.maps.LatLng(loc.lat, loc.lng);

      let marker = new google.maps.Marker({
        position: latlng,
        //animation: google.maps.Animation.DROP,
        map: this.map
      })

      this.markers.push(marker)
    });
  }

  setCurrentPositionMarker(position){
    this.markers.map(marker => marker.setMap(null));
    this.markers = []

    let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let marker = new google.maps.Marker({
        position: latlng,
        //ßanimation: google.maps.Animation.DROP,
        map: this.map,
        icon: 'http://www.robotwoods.com/dev/misc/bluecircle.png'
      })

      this.markers.push(marker)
  }

  loadMap(lat, lng){
    let latlng = new google.maps.LatLng(lat, lng)

    let mapOptions = {
      center: latlng,
      zoom: 17,
      mapId: '1291296c5adc90d1',
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
  }


  getLocationDetails(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    new google.maps.Geocoder().geocode({'location': latlng}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
      //console.log(results)
        if (results[0]) {

          let value = results[0].address_components[0].long_name+', '+results[0].address_components[1].long_name+', '+results[0].address_components[3].long_name


        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
    return true
  }

  // setRoute(){
  //   new google.maps.DirectionsService().route({
  //     origin: this._map.pickupLocation.result.description,
  //     destination: this._map.destinationLocation.result.description,
  //     travelMode: 'DRIVING',
  //     avoidTolls: true
  //   }, ((response, status) => {
  //     if(status === 'OK') {
  //       const directionsDisplay = new google.maps.DirectionsRenderer()
  //       directionsDisplay.setMap(this.map)
  //       directionsDisplay.setDirections(response)
  //     }
  //     else{
  //       const directionsDisplay = new google.maps.DirectionsRenderer()
  //       directionsDisplay.setMap(null)
  //       directionsDisplay.setDirections(null)
  //       console.log('error set route')
  //     }
  //   }))

  // }

}
