import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Map.css';
import mapboxgl from 'mapbox-gl';
import Marker from '../Marker/Marker';
import { useDispatch, useSelector } from 'react-redux';
import { mapProduct } from '../../../../Redux/Slices/ProductDetailSlice';

mapboxgl.accessToken ='pk.eyJ1IjoibWFyZWxsYSIsImEiOiJjbDIwaWJvcGowd2x1M2tucnB6ZmNsY3JoIn0.CVo2zzXXWwAj2mVDnwagvg';

mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
null,
true //Lazy load the plugin
);


// latitude: 34.725587, longitude: 36.720798,

export default function Map(props){

  const product=useSelector(state=>state.productDetail.allProduct);
  const green=useSelector(state=>state.productDetail.green);
  const orange=useSelector(state=>state.productDetail.orange);
  const blue=useSelector(state=>state.productDetail.blue);
  const red=useSelector(state=>state.productDetail.red);
  const dispatch=useDispatch();


  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(props.coords.lng);
  const [lat, setLat] = useState(props.coords.lat);
  const [zoom, setZoom] = useState(12);

  // Initialize map when component mounts
  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      scrollZoom:true
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Add FullScreen control 
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    //Add geolocate control to the map
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions:{enableHighAccuracy:true},
      trackUserLocation:true,
      showUserHeading:true
    }),'top-right')

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.on('load', () => {
        addMarkers(blue,'blue');
        addMarkers(red,'red');
        addMarkers(orange,'orange');
        addMarkers(green,'green');     
    });

 
    function addMarkers(marker,markerColor) {

      if((markerColor=='green'&&Object.keys(marker).length)||(markerColor=='orange'&&Object.keys(marker).length)){

          const el = document.createElement('div');
          // el.id = `marker-${marker.properties.id}`;
          el.className = 'marker';
          ReactDOM.render(<Marker image={product.productImage} color={markerColor}/>,el);

          /**
           * Create a marker using the div element
           * defined above and add it to the map.
          **/

           new mapboxgl.Marker(el,{offset:[0,-10]})
           .setLngLat(marker.coo)
           .addTo(map);

          el.addEventListener('click', (e) => {
            /* Fly to the point */
            flyToStore(marker.coo);
            /* Close all other popups and display popup for clicked store */
            createPopUp(marker,markerColor);

            dispatch(mapProduct(marker));
          
          });

      }
      else if((markerColor=='red'&&marker.length)||(markerColor=='blue'&&marker.length)){

 
          for(const x of marker){

              const el = document.createElement('div');
              // el.id = `marker-${marker.properties.id}`;
              el.className = 'marker';
              ReactDOM.render(<Marker image={product.productImage} color={markerColor}/>,el);
    
              /**
               * Create a marker using the div element
               * defined above and add it to the map.
              **/

              new mapboxgl.Marker(el,{offset:[0,-10]})
              .setLngLat(x.coo)
              .addTo(map);
    
              el.addEventListener('click', (e) => {
                /* Fly to the point */
                flyToStore(x.coo);
                /* Close all other popups and display popup for clicked store */
                createPopUp(x,markerColor);

                dispatch(mapProduct(x));


              });

          }

      }

    }

    function flyToStore(coords) {
      map.flyTo({
        center: coords,
        zoom: 17
      });
    }

    function createPopUp(marker,markerColor) {
      
      const popUps = document.getElementsByClassName('mapboxgl-popup');

      if (popUps[0]) popUps[0].remove();


      const my_popup_container=document.createElement('div');
      my_popup_container.style.padding='0px';
      my_popup_container.style.textAlign='center';
      const my_popup=
      <>
          <h4 style={{backgroundColor:markerColor}}>
            {marker.name}
          </h4>

          <h5 style={{color:markerColor}}>

            {
              marker.old!=marker.new?
              <span>

                <span style={{display:'block',textDecoration:'line-through'}}>
                {marker.old}&nbsp;s.p
                </span>

                {marker.new}&nbsp;s.p

              </span>:
              <span>
                {marker.old}&nbsp;s.p
              </span>
            }

          </h5>
      </>;
      ReactDOM.render(my_popup,my_popup_container);

      

      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(marker.coo)
        .setDOMContent(my_popup_container)
        .addTo(map);
    }


    // Clean up on unmount
    return () => map.remove();

  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  return (
  
    <div ref={mapContainerRef} className='mapContainer' style={{position:'relative',zIndex:'0',width: "64%",minHeight: "100vh",marginLeft:'25px',borderRadius:'25px',boxShadow:'5px 5px 20px 10px rgba(0,0,0,0.25)'}}>


            <div className="marker-color">
                Location's Color

                <div>
                    <button type="button" style={{backgroundColor:'orange'}}/>
                    The closest
                </div>

                <div>
                    <button type="button" style={{backgroundColor:'green'}}/>
                    The cheapest
                </div>

                <div>
                    <button type="button" style={{backgroundColor:'red'}}/>
                    With offer
                </div>

                <div>
                    <button type="button" style={{backgroundColor:'blue'}}/>
                    Others
                </div>

            </div>


    </div>

  );
}