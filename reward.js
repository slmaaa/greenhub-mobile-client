import "https://cdn.skypack.dev/preact/debug";

const { h, render } = preact;
const { Router } = preactRouter;
const { useEffect, useState, useRef } = preactHooks;
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import NavBar from "./navigation_bar.js";
import { getData, fetchUserInfo } from "./fetch.js";

const REWARD_DB_URL = "https://greenhub.slmaaa.work/backend/reward/";

const Reward = () => {
        const [searchInput, setSearchInput] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [isInputSearchFocused, setIsInputSearchFocused] = useState(false);
        const resultRef = useRef(null);
        const [displayedGCash, setDisplayedGCash] = useState();
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
            const user = JSON.parse(sessionStorage.getItem("user"));
            if (user) {
                setDisplayedGCash(user.g_cash);
            } else {
                fetchUserInfo.then((user) => {
                    setDisplayedGCash(user.g_cash);
                    sessionStorage.setItem("user", JSON.stringify(user));
                });
            }
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
            function checkUserData() {
                const item = sessionStorage.getItem("user");
                if (item) {
                    const user = JSON.parse(item);
                    setDisplayedGCash(user.g_cash);
                }
            }
            window.addEventListener("storage", checkUserData);
            return () => {
                window.removeEventListener("storage", checkUserData);
            };
        }, []);

        return isLoading > 0 ?
            html `` :
            html `
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
            <div class="rewards-div">
              ${isLoading
                ? html`<div
                    class="is-flex is-flex-grow-1 is-align-items-center"
                  >
                    <progress class="progress is-small is-primary" max="100">
                      15%
                    </progress>
                    <div></div>
                  </div>`
                : resultRef.current.map((reward) => {
                    return generateRewardItems(reward);
                  })}
            </div>
          </div>
          <${NavBar} />
        </div>
      `;
};

export default Reward;