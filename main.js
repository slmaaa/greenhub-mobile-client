import "https://cdn.skypack.dev/preact/debug";
import { h, render } from "https://cdn.skypack.dev/preact";
import {
  useEffect,
  useState,
  useRef,
} from "https://cdn.skypack.dev/preact/hooks";

import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);

import Login from "./login.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKyQWZ6hsQ6xyIMZGsriZgoZlGTU1RgTQ",
  authDomain: "greenhub-9c7d3.firebaseapp.com",
  projectId: "greenhub-9c7d3",
  storageBucket: "greenhub-9c7d3.appspot.com",
  messagingSenderId: "889263093307",
  appId: "1:889263093307:web:62b77b2338b5a7eb28ce1e",
};

const Main = () => {
  //useStates for routing
  const app = useRef(null);
  const [currentPage, setCurrentPage] = useState("LOGIN");

  const _URL = new URL(document.location);
  const _GET = _URL.searchParams;
  const URL_TARGET = _GET.get("id");
  useEffect(() => {
    //Intialize Firebase
    app.current = initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  switch (currentPage) {
    case "LOGIN":
      return html`<${Login} setCurrentPage=${setCurrentPage} app=${app} />`;
  }
};

render(html`<${Main} />`, document.body);
