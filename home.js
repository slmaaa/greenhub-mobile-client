import "https://cdn.skypack.dev/preact/debug";

const { h, render } = preact;
const { Router } = preactRouter;
const { useEffect, useState, useRef } = preactHooks;
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);

import NavBar from "./navigation_bar.js";

export const Home = ({ setCurrentPage, currentPage, user, userDataRef }) => {
    const [topPercent, setTopPercent] = useState(10);
    const [displayedBalance, setDisplayedBalance] = useState(
        userDataRef.current.balance
    );
    const [displayedGCash, setDisplayedGCash] = useState(
        userDataRef.current.g_cash
    );

    useEffect(() => {
        console.log(user);
    }, []);

    useEffect(() => {
        setDisplayedBalance(userDataRef.current.balance);
        setDisplayedGCash(userDataRef.current.g_cash);
    }, [userDataRef.current.balance, userDataRef.current.g_cash]);

    const generateTask = (description, reward, finishedCount, totalCount) => {
        return html `<div class="my-4">
      <span class="is-size-7">> ${description}</span>
      <div
        class="is-flex is-justify-content-space-between is-align-items-flex-end"
      >
        <span class="is-size-7 has-text-primary-dark has-text-weight-bold"
          >${reward.toString()} G-Cash
        </span>
        <button class="button is-white is-small is-rounded is-size-7">
          ${finishedCount.toString()} / ${totalCount.toString()}
        </button>
      </div>
    </div>`;
    };

    return html `
    <div class="hero is-flex is-flex-direction-column full-height">
      <div
        class=" pt-5 px-5 is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-start"
      >
        <div class=" header">
          <h1
            class="title ml-1 is-3 has-text-primary is-primary has-text-weight-bold"
          >
            Greenhub
          </h1>

          <div
            class="is-flex is-justify-content-space-between is-align-items-center"
          >
            <span class="is-size-5 has-text-weight-bold ml-2"
              >Balance: $${displayedBalance}</span
            >
          </div>
        </div>

        <div class=" home-body overflow-y">
          <div>
            <div class="is-flex is-flex-direction-row overflow-x">
              <div class="is-flex is-justify-content-center info-box-container">
                <div class="box mt-3 has-background-primary-dark info-box">
                  <span class="has-text-white has-text-weight-bold is-size-5"
                    >You have saved<br /><span
                      class="is-size-1 has-text-weight-bold is-underlined"
                      >$200</span
                    >
                    <br />
                    by using G-Cash
                  </span>
                </div>
              </div>
              <div class="is-flex is-justify-content-center info-box-container">
                <div class="box mt-3 has-background-info-dark info-box">
                  <span class="has-text-white has-text-weight-bold is-size-5"
                    >You are the top <br /><span
                      class="is-size-1 has-text-weight-bold is-underlined"
                      >${topPercent.toString()}%</span
                    >
                    <br />
                    user in last 30 days
                  </span>
                </div>
              </div>
              <div
                class="is-flex is-justify-content-center info-box-container "
              >
                <div class="box mt-3 has-background-warning-dark info-box">
                  <span class="has-text-white has-text-weight-bold is-size-5"
                    >You have saved <br /><span
                      class="is-size-1 has-text-weight-bold is-underlined"
                      >60L</span
                    >
                    <br />
                    space in the landfill
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-5 box has-background-primary-light">
            <div class="is-flex is-justify-content-space-between">
              <div>
                <span class="is-size-6 has-text-weight-light"
                  >You currently have</span
                >
                <br />
                <span class="is-size-5 has-text-weight-bold"
                  >${displayedGCash}</span
                >
                <span class="is-size-5 has-text-weight-bold"> G-Cash</span>
              </div>
              <button
                class="button is-size-7 is-inverted is-primary is-align-self-flex-end has-text-right"
                onclick=${() => {
                  setCurrentPage("REWARD");
                }}
              >
                Check rewards >>
              </button>
            </div>

            <hr class="solid" />

            <div class="is-flex is-flex-direction-column">
              <span class="is-size-6 has-text-weight-semibold"
                >G-Cash Tasks:</span
              >
              ${generateTask(
                "Takeaway with Greenhub 3 days in a row",
                50,
                2,
                3
              )}
              ${generateTask(
                "Takeaway with Greenhub 7 days in a row",
                500,
                3,
                7
              )}
              ${generateTask("Takeaway with 3 Greenhub in one go", 100, 0, 3)}
            </div>
          </div>
        </div>
      </div>
      <${NavBar} setCurrentPage=${setCurrentPage} currentPage=${currentPage} />
    </div>
  `;
};

export default Home;