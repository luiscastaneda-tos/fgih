import { useState, useRef, useEffect } from 'react';
import { LoadScript, StandaloneSearchBox} from '@react-google-maps/api';
import "./App.css"

const hoteles = [
  { nombre: "IBIS AGUASCALIENTES NORTE", lat: 21.93536109999999, lng: -102.2904946 },
  { nombre: "FIESTA INN AGUASCALIENTES PATIO", lat: 21.85815149999999, lng: -102.2942778 },
  { nombre: "IBIS BUDGET AGUASCALIENTES", lat: 21.9353182, lng: -102.2905751 },
  { nombre: "HOTEL FRANCIA", lat: 21.88109219999999, lng: -102.2951688 },
  { nombre: "MISION AGUASCALIENTES SUR", lat: 21.8342377, lng: -102.2885772 },
]
const libraries = ['places']
let pila = []

const App = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 19.4326, lng: -99.1332 }); // Coordenadas por defecto (Ciudad de México)
  const [searchBox, setSearchBox] = useState(null);
  const [place, setPlace] = useState(null);
  const mapRef = useRef(null);

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    console.log(searchBox.getPlaces())
    const places = searchBox.getPlaces();
    if (places.length > 0) {
      const selectedPlace = places[0];
      setAddress(selectedPlace.formatted_address);
      setPlace(selectedPlace);

      // Obtener las coordenadas
      const lat = selectedPlace.geometry.location.lat();
      const lng = selectedPlace.geometry.location.lng();
      setCoordinates({ lat, lng });

      // Opcionalmente, mover el mapa a la ubicación seleccionada
      if (mapRef.current) {
        mapRef.current.panTo(new window.google.maps.LatLng(lat, lng));
      }
    }
  };

  useEffect(() => {
    hoteles.forEach(element => {
      pila.push({ ...element, costo: Math.abs((element.lat - coordinates.lat) + (element.lng - coordinates.lng)) })
    })
  }, [coordinates]); // Ahora se ejecuta cuando cambian las coordenadas

  return (
    <LoadScript googleMapsApiKey="AIzaSyCHlzPFlfXng1tLspCSDohXlafJ3nzeqlA" libraries={libraries}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
          options={{
            componentRestrictions: { country: 'mx' }, // Restringir a México
          }}
        >
          <input
            type="text"
            placeholder="Busca una dirección en México"
            style={{
              width: '300px',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              marginBottom: '20px',
            }}
          />
        </StandaloneSearchBox>
        
        <div style={{ marginTop: '20px' }}>
          {/* <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            center={coordinates} // Centrado en las coordenadas
            zoom={14}
            onLoad={(map) => (mapRef.current = map)}
          >
            <Marker position={coordinates} />
          </GoogleMap> */}
          {
            place &&
            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=12&size=600x400&markers=color:red%7Clabel:A%7C${coordinates.lat},${coordinates.lng}&markers=color:blue%7Clabel:B%7C${hoteles[0].lat},${hoteles[0].lng}&markers=color:blue%7Clabel:C%7C${hoteles[1].lat},${hoteles[1].lng}&markers=color:blue%7Clabel:D%7C${hoteles[2].lat},${hoteles[2].lng}&markers=color:blue%7Clabel:E%7C${hoteles[3].lat},${hoteles[3].lng}&key=AIzaSyCHlzPFlfXng1tLspCSDohXlafJ3nzeqlA`} alt="" />
          }

          <h3>Dirección seleccionada:</h3>
          <p>{address}</p>

          {coordinates && (
            <div>
              <h3>Coordenadas:</h3>
              <p>Latitud: {coordinates.lat}</p>
              <p>Longitud: {coordinates.lng}</p>
            </div>
          )}

          {place &&
            pila.map(element=> <p key={Math.random()*123456789} >{element.nombre}</p> )
          }
        </div>
      </div>
    </LoadScript>
  );
};

export default App;
