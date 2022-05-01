import "https://cdn.skypack.dev/preact/debug";
const { h, render } = preact;
const { Router } = preactRouter;
const { useEffect, useState, useRef } = preactHooks;
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";
import WebSocket from "https://cdn.skypack.dev/isomorphic-ws";
import QRCode from "https://cdn.skypack.dev/qrcode";

import NavBar from "./navigation_bar.js";
import { fetchUserInfo } from "./fetch.js";

export const QR_Code = () => {
        const [pid, setPid] = useState(null);
        const [status, setStatus] = useState("LOADING");
        const [isLoading, setIsLoading] = useState(true);
        const [isGCashModalActive, setIsGCashModalActive] = useState(false);
        const [isLuckyDrawButtonActive, setIsLuckyDrawButtonActive] = useState(true);
        const [displayedBalance, setDisplayedBalance] = useState();
        const [displayedGCash, setDisplayedGCash] = useState();

        const userRef = useRef(null);

        const ws = useRef(null);

        const dummpyResult = { g_cash: 0 };
        const resultRef = useRef(dummpyResult);

        const showBalanceDelta = (delta) => {
            console.log(delta);
            if (delta < 0) {
                return `- \$${(delta * -1).toString()}`;
            } else {
                return `+ \$${delta.toString()}`;
            }
        };

        useEffect(() => {
            ws.current = new WebSocket(
                "wss://greenhub.slmaaa.work/ws/user_db/qr_request"
            );
            ws.current.onopen = () => {
                console.log("opened");
                console.log("Sending user request");
                const request = {};
                request.user_id = userRef.curent.id;
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
                    setStatus("READY");
                } else if (json.response_type === "COMPLETED") {
                    fetchUserInfo.then((user) => {
                        console.log(user);
                        userRef.current = user;
                        setDisplayedBalance(user.balance);
                        setDisplayedGCash(user.g_cash);
                        sessionStorage.setItem("user", JSON.stringify(user));
                        resultRef.current = json;
                        setStatus("COMPLETED");
                    });
                }
            };

            ws.current.onclose = () => {
                console.log("closed");
            };
        }, []);

        useEffect(() => {
            if (status === "LOADING") {}
            if (status === "READY") {
                const canvas = document.getElementById("qr-code");
                QRCode.toCanvas(
                    canvas,
                    pid, { width: window.innerWidth * 0.8, color: { light: "#0000" } },
                    function(error) {
                        if (error) console.error(error);
                        console.log("success!");
                    }
                );
            }
        }, [status]);

        useEffect(() => {
            const user = JSON.parse(sessionStorage.getItem("user"));
            userRef.current = user;
            setDisplayedBalance(user.balance);
            setDisplayedGCash(user.g_cash);
            setIsLoading(false);
        }, []);

        useEffect(() => {
            function checkUserData() {
                const item = sessionStorage.getItem("user");
                if (item) {
                    const user = JSON.parse(item);
                    userRef.current = user;
                    setDisplayedBalance(user.balance);
                    setDisplayedGCash(user.g_cash);
                }
            }
            window.addEventListener("storage", checkUserData);
            return () => {
                window.removeEventListener("storage", checkUserData);
            };
        }, []);

        return isLoading ?
            html `` :
            html `
        <div class="modal ${isGCashModalActive ? "is-active" : ""}">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div
              class="box g-cash-box mx-3 is-flex is-flex-direction-column is-align-items-center is-justify-content-space-around has-background-primary-dark"
            >
              <p
                class="is-size-3 has-text-weight-bold has-text-white has-text-centered"
              >
                ${parseInt(resultRef.current.g_cash) >= 100 ? "Congrat!" : ""}
                You won ${resultRef.current.g_cash} G-Cash!
              </p>
              <button
                class="button is-warning"
                onclick=${() => {
                  setIsGCashModalActive(false);
                }}
              >
                Collect
              </button>
            </div>
          </div>
        </div>
        <div class="hero is-flex is-flex-direction-column full-height">
          <div
            class="px-5 pt-5 is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-start"
          >
            <div class="header">
              <h1
                class="title ml-1 is-4 has-text-primary is-primary has-text-weight-bold"
              >
                Borrow/ Return/ Top-up
              </h1>

              <div
                class="is-flex is-justify-content-space-between is-align-items-center"
              >
                <span class="is-size-5 has-text-weight-bold ml-2"
                  >Balance: $${displayedBalance}</span
                >
              </div>
            </div>
            <div
              class="box is-flex is-justify-content-center has-background-primary-light qr-code-box"
            >
              ${status === "LOADING"
                ? html`<progress class="progress is-small is-primary" max="100">
                    15%
                  </progress>`
                : status === "READY"
                ? html`<canvas id="qr-code" class="i"></canvas>`
                : html`<div
                    class="is-flex is-flex-direction-column is-align-self-center is-justify-content-center is-align-items-center"
                  >
                    <div
                      class="icon-text is-flex is-justify-content-center is-align-items-center"
                    >
                      <span class="icon is-large has-text-primary">
                        <i class="fas fa-circle-check fa-2x"></i>
                      </span>
                      <span
                        class="has-text-primary has-text-weight-bold is-size-4"
                        >Success</span
                      >
                    </div>
                    <p class="is-size-6 has-text-weight-medium">
                      ${resultRef.current.mode === "LEND"
                        ? `You have borrowed ${resultRef.current.amount} Greenhub`
                        : resultRef.current.mode === "COLLECT"
                        ? `You have returned ${resultRef.current.amount} Greenhub`
                        : `You have topped up \$${resultRef.current.amount}`}<br />
                      <span class=""
                        >Restaurant: <br />
                        ${resultRef.current.r_name}</span
                      ><br />
                      ${`Balance: ${showBalanceDelta(
                        parseInt(resultRef.current.balance_delta)
                      )}`}
                    </p>
                    ${resultRef.current.mode === "COLLECT"
                      ? isLuckyDrawButtonActive
                        ? html`<button
                            class="button is-primary mt-3 is-inverted"
                            onclick=${() => {
                              setIsGCashModalActive(true);
                              setIsLuckyDrawButtonActive(false);
                            }}
                          >
                            <span>G-Cash Lucky Draw</span>
                          </button>`
                        : html`<button
                            class="button is-grey mt-3 is-inverted"
                            disabled
                          >
                            <span>Collected</span>
                          </button>`
                      : html``}
                  </div>`}
            </div>
            <button
              class="button is-warning"
              onclick=${() => {
                setStatus("LOADING");
                console.log("Sending user request");
                const request = {};
                request.user_id = userRef.current.id;
                console.log(request);
                ws.current.send(JSON.stringify(request));
              }}
            >
              <span class="icon-text">
                <span class="icon">
                  <i class="fa-solid fa-rotate-right"></i>
                </span>
                <span>Reload</span>
              </span>
            </button>
          </div>
          <${NavBar} />
        </div>
      `;
};

export default QR_Code;