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

const RESTAURANT_REST_URL = "https://greenhub.slmaaa.work/backend/restaurant/";

const Search = ({ setCurrentPage, currentPage }) => {
    const [searchInput, setSearchInput] = useState("");
    const [isInputSearchFocused, setIsInputSearchFocused] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);

    const loadScript = (sScriptSrc, loadedCallback) => {
        var oHead = document.getElementsByTagName("HEAD")[0];
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = sScriptSrc;
        oHead.appendChild(oScript);
        oScript.onload = loadedCallback;
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
            })
            .catch((err) => {});
    };

    // Initialize and add the map
    const initMap = () => {
        // The location of Uluru
        const hong_kong = { lat: 22.3526632, lng: 113.8475072 };
        // The map, centered at Uluru
        const infoWindow = new google.maps.InfoWindow();

        const map = new google.maps.Map(document.getElementById("map"), {
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
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    pos = { lat: 22.3127038, lng: 114.1762896 }; // Override for testing
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
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
        getData("https://greenhub.slmaaa.work/backend/r_db/all?format=json").then(
            (data) => {
                console.log(data);
            }
        );
    }, []);

    return html `
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
      <${NavBar} setCurrentPage=${setCurrentPage} currentPage=${currentPage} />
    </div>
  `;
};

export default Search;