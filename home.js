import "https://cdn.skypack.dev/preact/debug";
import { h } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import {
  useEffect,
  useState,
  useRef,
} from "https://cdn.skypack.dev/preact/hooks";

export const Home = ({ setCurrentPage, user }) => {
  useEffect(() => {
    console.log(user);
  }, []);
  return html`
    <div class="hero px-5 py-5 is-flex is-flex-direction-column is-fullheight">
      <div class="pb-5">
        <h1 class="title is-3 has-text-primary is-primary has-text-weight-bold">
          Greenhub
        </h1>
        <h1 class="subtitle has-text-dark has-text-weight-light">Home</h1>
      </div>
    </div>
  `;
};

export default Home;
