import "https://cdn.skypack.dev/preact/debug";
import { h } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import {
  useEffect,
  useState,
  useRef,
} from "https://cdn.skypack.dev/preact/hooks";

export const NavBar = ({ setCurrentPage, currentPage }) => {
  const NAVBAR_BUTTON_PROP =
    "button is-radiusless is-shadowless is-primary nav-button is-flex-grow-2 is-centered";

  const setTabActiveness = (tabName) =>
    tabName === currentPage ? "" : "is-light";

  return html` <div class="navbar-default is-flex is-flex-direction-row">
    <button
      class="${NAVBAR_BUTTON_PROP} ${setTabActiveness("HOME")}"
      onclick=${() => {
        setCurrentPage("HOME");
      }}
    >
      <div class="is-flex is-flex-direction-column is-align-items-center">
        <span class="m-0 icon is-large">
          <i class="fas fa-home fa-lg "></i>
        </span>
        <p class="is-size-7">Home</p>
      </div>
    </button>
    <button
      class="${NAVBAR_BUTTON_PROP} ${setTabActiveness("SEARCH")}"
      onclick=${() => {
        setCurrentPage("SEARCH");
      }}
    >
      <div class="is-flex is-flex-direction-column is-align-items-center">
        <span class="m-0 icon is-large">
          <i class="fas fa-search fa-lg"></i>
        </span>
        <p class="is-size-7">Search</p>
      </div>
    </button>
    <button class="${NAVBAR_BUTTON_PROP} ${setTabActiveness("REWARD")}">
      <div class="is-flex is-flex-direction-column is-align-items-center">
        <span class="m-0 icon is-large">
          <i class="fas fa-gift fa-lg"></i>
        </span>
        <p class="is-size-7">Reward</p>
      </div>
    </button>
    <button class="${NAVBAR_BUTTON_PROP} ${setTabActiveness("RECORD")}">
      <div class="is-flex is-flex-direction-column is-align-items-center">
        <span class=" m-0 icon is-large">
          <i class="fas fa-file-invoice fa-lg nav-icon has-text-centered"></i>
        </span>
        <p class="is-size-7">Record</p>
      </div>
    </button>
  </div>`;
};

export default NavBar;
