let map = L.map("map");
let tbody = document.querySelector("#tableLocation > tbody");

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker = L.marker();

if (latitude && longitude) {
  map.setView([latitude, longitude], 13);
  marker.setLatLng([latitude, longitude]).addTo(map);
} else {
  map.setView([16.908287574630382, -92.09497690200807], 13);
}

const editLocation = (e) => {
  console.log("Aceptar");
  const idProyect = e.target.id;
  const newLatitude = document.getElementById(PROJECT_ATTRIBUTES.LATITUDE);
  const newLongitude = document.getElementById(PROJECT_ATTRIBUTES.LONGITUD);
  console.log(idProyect, newLatitude.textContent, newLongitude.textContent);

  const bodyLocation = {
    latitude: newLatitude.textContent,
    longitude: newLongitude.textContent,
  };
  fetch(`${URL_LOCATION_PUT}${idProyect}`, {
    method: "PUT",
    body: JSON.stringify(bodyLocation),
    headers: HEADERS,
  })
    .then((response) => {
      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error al modificar el la ubicación",
          text: response.status,
        });
        return;
      }
      return response.json();
    })
    .then((data) => {
      latitude = newLatitude.textContent;
      longitude = newLongitude.textContent;
      tbody.innerHTML = "";
      rowLocation(tbody, { latitude, longitude, idProject });
    })
    .catch((e) => console.error(e));
};

const onMapClick = (e) => {
  console.log(e.latlng);
  marker.setLatLng(e.latlng).addTo(map);
  tbody.innerHTML = "";
  let newLatitude = e.latlng.lat;
  let newLongitude = e.latlng.lng;
  rowLocation(
    tbody,
    { latitude: newLatitude, longitude: newLongitude, idProject },
    editLocation,
    (e) => {
      console.log("Cancelar");
      tbody.innerHTML = "";
      rowLocation(tbody, { latitude, longitude, idProject });
      marker.setLatLng([latitude, longitude]).addTo(map);
    }
  );
};

map.on("click", onMapClick);

rowLocation(tbody, { latitude, longitude, idProject });
