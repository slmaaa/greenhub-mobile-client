import "https://cdn.skypack.dev/preact/debug";

const { h, render } = preact;
const { Router, route } = preactRouter;
const { useEffect, useState, useRef } = preactHooks;

import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);

export const NavBar = () => {
    const NAVBAR_BUTTON_PROP =
        "button is-radiusless is-shadowless is-primary nav-button is-centered";

    const setTabActiveness = (path) =>
        path === window.location.pathname ? "" : "is-light";

    return html `
    <div class="navbar-default is-flex is-flex-direction-row">
      <button
        class="${NAVBAR_BUTTON_PROP} ${setTabActiveness("/home")}"
        onclick=${() => {
          route("/home");
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
        class="${NAVBAR_BUTTON_PROP} ${setTabActiveness("/search")}"
        onclick=${() => {
          route("/search");
        }}
      >
        <div class="is-flex is-flex-direction-column is-align-items-center">
          <span class="m-0 icon is-large">
            <i class="fas fa-search fa-lg"></i>
          </span>
          <p class="is-size-7">Search</p>
        </div>
      </button>
      <button
        class="${NAVBAR_BUTTON_PROP} ${setTabActiveness("/rewards")}"
        onclick=${() => {
          route("/reward");
        }}
      >
        <div class="is-flex is-flex-direction-column is-align-items-center">
          <span class="m-0 icon is-large">
            <i class="fas fa-gift fa-lg"></i>
          </span>
          <p class="is-size-7">Reward</p>
        </div>
      </button>
      <div
        class="has-background-primary-light nav-bar-button-size is-flex-grow-1"
      ></div>
    </div>
    <button
      class="qr-button button mr-1 ml-1 is-rounded is-warning is-flex is-flex-direction-column is-align-items-center"
      onclick=${() => {
        if (currentPage === "QR_CODE") return;
        route("/qr_code");
      }}
    >
      <span class="m-0 icon is-large">
        <i class="fa-solid fa-qrcode fa-2x"></i>
      </span>
    </button>
  `;
};

export default NavBar;