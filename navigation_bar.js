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
        "button is-radiusless is-shadowless is-primary nav-button is-centered";

    const setTabActiveness = (tabName) =>
        tabName === currentPage ? "" : "is-light";

    return html ` <div class="navbar-default is-flex is-flex-direction-row">
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
    <button class="${NAVBAR_BUTTON_PROP} ${setTabActiveness("RECORD")}">
      <div class="is-flex is-flex-direction-column is-align-items-center">
        <span class="m-0 icon is-large">
          <i class="fas fa-file-invoice fa-lg"></i>
        </span>
        <p class="is-size-7">Record</p>
      </div>
    </button>
    <div class="has-background-primary-light nav-bar-button-size is-flex-grow-1"></div>
  </div>
  <button class="qr-button button mr-2 is-rounded is-warning is-flex is-flex-direction-column is-align-items-center"
  onclick=${()=>{
    if (currentPage==="BORROW") return;
    setCurrentPage("BORROW")}}>
        <span class="m-0 icon is-large">
          <i class="fa-solid fa-inbox fa-lg"></i>
        </span>
        <p class="is-size-7">Borrow</p>
  </button>
  `;
};

export default NavBar;