import "https://cdn.skypack.dev/preact/debug";
import { h } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import {
    useEffect,
    useState,
    useRef,
} from "https://cdn.skypack.dev/preact/hooks";

import NavBar from "./navigation_bar.js";

import { getData, postData } from "./fetch.js";

const googleMapSrc =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3vtiKXk5oOqyFRxIGiWd41XMe5gAKbUE";

const SEARCH_RADIUS = "1000";

const RESTAURANT_REST_URL = "https://greenhub.slmaaa.work/backend/restaurant";

const Search = ({ setCurrentPage, currentPage }) => {
        const [searchInput, setSearchInput] = useState("");
        const [isInputSearchFocused, setIsInputSearchFocused] = useState(false);
        const [dropdownItems, setDropdownItems] = useState([]);
        const dummyRestaurant = {
            url: "",
            name: "",
            region: "",
            district: "",
            address: "",
            picture: "",
            cuisine: "",
            price_range_low: 0,
            price_range_high: 0,
            open_rice_url: "",
            lat: 0,
            lng: 0,
            point: "",
            business_hours_from: "",
            business_hours_to: "",
        };
        const clickedRestaurantRef = useRef(dummyRestaurant);
        const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

        const mapRef = useRef(null);

        const loadScript = (sScriptSrc, loadedCallback) => {
            var oHead = document.getElementsByTagName("HEAD")[0];
            var oScript = document.createElement("script");
            oScript.type = "text/javascript";
            oScript.src = sScriptSrc;
            oHead.appendChild(oScript);
            oScript.onload = loadedCallback;
        };

        const addRestaurantMarker = (restaurant) => {
            const marker = new google.maps.Marker({
                position: { lat: restaurant.lat, lng: restaurant.lng },
                map: mapRef.current,
            });
            marker.addListener("click", () => {
                clickedRestaurantRef.current = restaurant;
                setIsDetailModalOpen(true);
            });
        };

        const getNearbyRestaurants = async(lat, lng) => {
            getData(
                    RESTAURANT_REST_URL +
                    "?" +
                    new URLSearchParams({
                        lat: lat,
                        lng: lng,
                        dst: SEARCH_RADIUS,
                    })
                )
                .then((data) => {
                    console.log(data);
                    data.results.map((restaurant) => {
                        addRestaurantMarker(restaurant);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        // Initialize and add the map
        const initMap = () => {
            // The location of Uluru
            const hong_kong = { lat: 22.3526632, lng: 113.8475072 };
            // The map, centered at Uluru
            const infoWindow = new google.maps.InfoWindow();

            mapRef.current = new google.maps.Map(document.getElementById("map"), {
                zoom: 17,
                center: hong_kong,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                zoomControl: false,
            });
            // The marker, positioned at Uluru

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        //const pos = {
                        //   lat: position.coords.latitude,
                        //   lng: position.coords.longitude,
                        //};
                        const pos = { lat: 22.3127038, lng: 114.1762896 }; // Override for testing
                        mapRef.current.setCenter(pos);
                        getNearbyRestaurants(pos.lat, pos.lng);
                    },
                    () => {
                        handleLocationError(true, infoWindow, mapRef.current.getCenter());
                    }
                );
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, mapRef.current.getCenter());
            }
        };

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(
                browserHasGeolocation ?
                "Error: The Geolocation service failed." :
                "Error: Your browser doesn't support geolocation."
            );
            infoWindow.open(map);
        }

        useEffect(() => {
            loadScript(googleMapSrc, initMap);
        }, []);

        return html `
    <div
      id="restaurant-detail-modal"
      class="modal ${isDetailModalOpen ? "is-active" : ""}"
    >
      <div class="modal-background"></div>
      <div class="modal-content">
        <!-- Any other Bulma elements you want -->
        <div
          class="box has-background-primary-light mx-3 is-flex is-flex-direction-column "
        >
          <button class="button is-rounded is-danger is-pulled-right">
            <span class="icon">
              <i class="fas fa-xmark"></i>
            </span>
          </button>
          <figure class="image restaurant-pic my-3">
            <img src=${clickedRestaurantRef.current.picture} />
          </figure>
          <p class="">
            <span class="is-size-5 has-text-weight-medium"
              >${clickedRestaurantRef.current.name}</span
            ><br />
            Cuisine type: ${clickedRestaurantRef.current.cuisine}<br />
            Address: ${clickedRestaurantRef.current.address}<br />
            Price: ${clickedRestaurantRef.current.price_range_low} -
            ${clickedRestaurantRef.current.price_range_high}<br />
            Business hour: ${clickedRestaurantRef.current.business_hours_from} -
            ${clickedRestaurantRef.current.business_hours_to}<br />
            <a
              class="button is-warning"
              href=${clickedRestaurantRef.current.open_rice_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Openrice
            </a>
          </p>
        </div>
      </div>
    </div>
    <div
      id="search-bar"
      class="field my-5 mx-4 is-overlay search-bar has-addons-centered is-flex is-align-items-center is-justify-content-center"
    >
      <div class="field">
        <p class="control has-icons-right">
          <input
            class="input is-medium is-rounded is-expanded "
            type="text"
            id="search-input"
            onblur=${() => setIsInputSearchFocused(false)}
            onfocus=${(e) => {
              setIsInputSearchFocused(true);
            }}
            oninput=${(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <span class="icon is-small is-right is-white"
            ><i class="fas fa-search"> </i>
          </span>
        </p>
      </div>
    </div>
    <div class="hero is-flex is-flex-direction-column full-height">
      <div
        id="map"
        class="map-size ${isInputSearchFocused ? "disable" : ""}"
      ></div>
      ${isInputSearchFocused ? html` <div id="search results"></div>` : html``}
      <${NavBar} setCurrentPage=${setCurrentPage} currentPage=${currentPage} />
    </div>
  `;
};

export default Search;