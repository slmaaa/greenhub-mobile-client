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

const Reward = ({ setCurrentPage, currentPage, userDataRef }) => {
        const [searchInput, setSearchInput] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [isInputSearchFocused, setIsInputSearchFocused] = useState(false);
        const resultRef = useRef(null);
        const [displayedGCash, setDisplayedGCash] = useState(
            userDataRef.current.g_cash
        );

        const generateRewardItems = (reward) => {
            return html ` <div
      class="box mt-5 has-background-primary-light is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between"
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
        }, []);

        useEffect(() => {
            setDisplayedGCash(userDataRef.current.g_cash);
        }, [userDataRef.current.g_cash]);

        return html `
    <div class="hero is-flex is-flex-direction-column full-height">
      <div
        class=" pt-5 px-5 is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-start"
      >
        <div
          class="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center mb-3"
        >
          <button class="button is-danger is-inverted ml-1 redeemed-button">
            <span class="icon is-large">
              <i class="fas fa-ticket fa-lg"></i>
            </span>
          </button>
          <div
            id="search-bar"
            class="field has-addons-centered is-flex is-align-items-center is-justify-content-center mr-6"
          >
            <div class="field is-flex">
              <p class="control has-icons-right is-flex-shrink-1">
                <input
                  class="input is-medium is-rounded "
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
                  ><i class="fas fa-search fa-lg"> </i>
                </span>
              </p>
            </div>
          </div>
        </div>

        <span class="is-size-5 has-text-weight-bold ml-2 my-2"
          >You have ${displayedGCash} G-CASH</span
        >
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