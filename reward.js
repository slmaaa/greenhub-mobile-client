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
import { getData } from "./fetch.js";

const REWARD_DB_URL = "https://greenhub.slmaaa.work/backend/reward/";

const Reward = ({ setCurrentPage, currentPage, GCash, setGCash }) => {
        const [searchInput, setSearchInput] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [isInputSearchFocused, setIsInputSearchFocused] = useState(false);
        const resultRef = useRef(null);

        const generateRewardItems = (reward) => {
            return html ` <div
      class="box mb-3 has-background-primary-light is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between"
    >
      <figure class="image is-64x64">
        <img src=${reward.illustration} />
      </figure>
      <div class="is-flex is-flex-direction-column is-size-6 reward-info">
        ${reward.name}<br />
        Provided by: ${reward.provider}<br />
        <button class="button is-primary is-size-6">
          <span>${reward.cost} G-Cash</span>
        </button>
      </div>
    </div>`;
        };

        useEffect(() => {
            getData(REWARD_DB_URL)
                .then((data) => {
                    console.log(data);
                    resultRef.current = data.results;
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        return html `
    <div class="hero is-flex is-flex-direction-column full-height">
      <div
        class=" pt-5 px-5 is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-start"
      >
        <div
          id="search-bar"
          class="field has-addons-centered is-flex is-align-items-center is-justify-content-center"
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
        ${isLoading
          ? html`<div class="is-flex is-flex-grow-1 is-align-items-center">
              <progress class="progress is-small is-primary" max="100">
                15%
              </progress>
              <div></div>
            </div>`
          : resultRef.current.map((reward) => {
              return generateRewardItems(reward);
            })}
      </div>
      <${NavBar} setCurrentPage=${setCurrentPage} currentPage=${currentPage} />
    </div>
  `;
};

export default Reward;