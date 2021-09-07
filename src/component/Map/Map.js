import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import './Map.css'
const containerStyle = {
  width: "100%",
  height: "400px",
};

const location = {
    lat: 23.733348, lng: 90.406707
};

const Map = ({origin, destination}) => {

  const [directionResponse, setDirectionResponse] = useState(null);
  return (
    <div className="map">
     <LoadScript
            googleMapsApiKey={'AIzaSyBavZmpJqhWzhhdFA-FWL0S_AcJwMUDApo'}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={16}
            >
                {
                    origin !== '' && destination !== '' && <DirectionsService
                    // required
                    options={{
                      destination: destination,
                      origin: origin,
                      travelMode: 'DRIVING'
                    }}
                    // required
                    callback={res => {
                        if(res !== null){
                          setDirectionResponse(res);
                        }
                    }}
                  />
                }
                {
                    directionResponse && <DirectionsRenderer
                    // required
                    options={{ 
                      directions: directionResponse
                    }}
                    
                  />
                }
            </GoogleMap>
        </LoadScript>
        </div>
  );
};

export default Map;
