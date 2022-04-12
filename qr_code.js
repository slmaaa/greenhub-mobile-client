import "https://cdn.skypack.dev/preact/debug";
import { h } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import {
    useEffect,
    useState,
    useRef,
} from "https://cdn.skypack.dev/preact/hooks";
import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";
import WebSocket from "https://cdn.skypack.dev/isomorphic-ws";
import QRCode from "https://cdn.skypack.dev/qrcode";

import NavBar from "./navigation_bar.js";

export const QR_Code = ({ setCurrentPage, currentPage, userID }) => {
        const [pid, setPid] = useState(null);
        const [isLoadingCode, setIsLoadingCode] = useState(true);
        const [balance, setBalance] = useState(0);
        const ws = useRef(null);

        useEffect(() => {
            ws.current = new WebSocket(
                "wss://greenhub.slmaaa.work/ws/user_db/qr_request"
            );
            ws.current.onopen = () => {
                console.log("opened");
                console.log("Sending user request");
                const request = {};
                request.user_id = userID.current;
                console.log(request);
                ws.current.send(JSON.stringify(request));
            };
            ws.current.onmessage = (data) => {
                console.log("Received data");
                console.log(data);
                const json = JSON.parse(data.data);
                console.log(json);
                if (json.response_type === "RECEIVED") {
                    setPid(json.pid);
                    setIsLoadingCode(false);
                } else if (json.response_type === "COMPLETED") {
                    console.log(json);
                }
            };

            ws.current.onclose = () => {
                console.log("closed");
            };
        }, []);

        useEffect(() => {
            if (isLoadingCode) return;
            const canvas = document.getElementById("qr-code");
            QRCode.toCanvas(
                canvas,
                pid, { width: window.innerWidth * 0.8, color: { light: "#0000" } },
                function(error) {
                    if (error) console.error(error);
                    console.log("success!");
                }
            );
        }, [isLoadingCode]);

        return html `
    <div class="hero is-flex is-flex-direction-column full-height">
      <div
        class="px-5 pt-5 is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-start"
      >
        <div class="header">
          <h1
            class="title ml-1 is-3 has-text-primary is-primary has-text-weight-bold"
          >
            Borrow / Return
          </h1>

          <div
            class="is-flex is-justify-content-space-between is-align-items-center"
          >
            <span class="is-size-5 has-text-weight-bold ml-2"
              >Balance: $${balance.toString()}</span
            >
            <button
              class="button is-right is-align-self is-primary is-light is-rounded is-size-6 is-small"
            >
              Top up
            </button>
          </div>
        </div>
        <div
          class="box m-5 is-flex is-justify-content-center has-background-primary-light"
        >
          ${isLoadingCode
            ? html`<progress class="progress is-small is-primary" max="100">
                15%
              </progress>`
            : html`<canvas id="qr-code" class="i"></canvas>`}
        </div>
      </div>
      <${NavBar} setCurrentPage=${setCurrentPage} currentPage=${currentPage} />
    </div>
  `;
};

export default QR_Code;