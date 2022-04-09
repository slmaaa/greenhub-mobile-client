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

const Search = ({ setCurrentPage, currentPage }) => {
  const [inputDestination, setInputDestination] = useState("");
  const [isInputDestinationFocused, setIsInputDestinationFocused] =
    useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);

  const initMap = () => {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return html`
    <div class="hero is-flex is-flex-direction-column full-height">
      <div class="is-flex is-flex-direction-column p-5">
        <div id="search-bar" class="field is-align-self-center my-5">
          <div
            class="dropdown is-left ${inputDestination.length <= 1 ||
            !isInputDestinationFocused
              ? ""
              : "is-active"}"
          >
            <div class="dropdown-trigger">
              <div class="field">
                <p class="control is-expanded has-icons-right">
                  <input
                    class="input is-medium is-rounded has-background-primary-light "
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
        <div id="map" class="is-flex-grow-2"></div>
      </div>
      <${NavBar} setCurrentPage=${setCurrentPage} currentPage=${currentPage} />
    </div>
  `;
};

export default Search;
