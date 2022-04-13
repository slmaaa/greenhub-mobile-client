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

export const Home = ({ setCurrentPage, user, currentPage, balance, GCash }) => {
        const [topPercent, setTopPercent] = useState(30);
        const [chartConfig, setChartConfig] = useState(null);

        useEffect(() => {
            const data = {
                labels: ["Unfairwood", "TamNui", "Silver bowl"],
                datasets: [{
                    label: "Frequency",
                    data: [300, 50, 100],
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                    ],
                    hoverOffset: 4,
                }, ],
            };
            const config = {
                type: "doughnut",
                data: data,
            };
            setChartConfig(config);
        }, []);

        const chart = new Chart(document.getElementById("donut-chart"), chartConfig);

        useEffect(() => {
            console.log(user);
            return () => {
                chart.destroy();
            };
        }, []);

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
        class="px-5 pt-5 is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-start"
      >
        <div class="header">
          <h1
            class="title ml-1 is-3 has-text-primary is-primary has-text-weight-bold"
          >
            Greenhub
          </h1>

          <div
            class="is-flex is-justify-content-space-between is-align-items-center"
          >
            <span class="is-size-5 has-text-weight-bold ml-2"
              >Balance: $${balance.toString()}</span
            >
          </div>
        </div>

        <div class="is-overflow home-body">
          <div class="box mt-3 has-background-primary-dark">
            <span class="has-text-white has-text-weight-bold is-size-5"
              >You are the top ${topPercent.toString()}% ${html`<br />`} user in
              last 30 days
            </span>
            <br />
            <div>
              <canvas id="donut-chart" />
            </div>
          </div>

          <div class="box has-background-primary-light">
            <div class="is-flex is-justify-content-space-between">
              <div>
                <span class="is-size-6 has-text-weight-light"
                  >You currently have</span
                >
                <br />
                <span class="is-size-5 has-text-weight-bold"
                  >${GCash.toString()}</span
                >
                <span class="is-size-5 has-text-weight-bold"> G-Cash</span>
              </div>
              <button
                class="button is-size-7 is-inverted is-primary is-align-self-flex-end has-text-right"
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