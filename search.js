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

var googleMapSrc =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3vtiKXk5oOqyFRxIGiWd41XMe5gAKbUE";

const Search = ({ setCurrentPage, currentPage }) => {
    const [inputDestination, setInputDestination] = useState("");
    const [isInputDestinationFocused, setIsInputDestinationFocused] =
    useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);

    function loadScript(sScriptSrc, loadedCallback) {
        var oHead = document.getElementsByTagName("HEAD")[0];
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = sScriptSrc;
        oHead.appendChild(oScript);
        oScript.onload = loadedCallback;
    }

    // Initialize and add the map
    function initMap() {
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
        });
        // The marker, positioned at Uluru

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
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
    }

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
      id="search-bar"
      class="field my-5 mx-3 is-overlay search-bar has-addons-centered is-flex is-align-items-center is-justify-content-center"
    >
      <div
        class="dropdown ${inputDestination.length <= 1 ||
        !isInputDestinationFocused
          ? ""
          : ""}"
      >
        <div class="dropdown-trigger">
          <div class="field">
            <p class="control has-icons-right">
              <input
                class="input is-medium is-rounded has-background-primary-light is-expanded "
                type="text"
                id="search-input"
                onfocus=${(e) => {
                  setIsInputDestinationFocused(true);
                }}
                oninput=${(e) => {
                  setInputDestination(e.target.value);
                }}
              />
              <span class="icon is-small is-right is-white"
                ><i class="fas fa-search"></i
              ></span>
            </p>
          </div>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content d-property p-1 is-primary">
            ${dropdownItems}
          </div>
        </div>
      </div>
    </div>
    <div class="hero is-flex is-flex-direction-column full-height">
      <div id="map" class="map-size"></div>
      <${NavBar} setCurrentPage=${setCurrentPage} currentPage=${currentPage} />
    </div>
  `;
};

export default Search;