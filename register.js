import "https://cdn.skypack.dev/preact/debug";
const { h, render } = preact;
const { Router } = preactRouter;
const { useEffect, useState, useRef } = preactHooks;
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);

const Register = () => {
    const ws = useRef(null);

    const registerRequestRef = useRef(null);
    useEffect(() => {
        ws.current = new WebSocket("wss://greenhub.slmaaa.work/ws/user_register");
        ws.current.onopen = () => {
            console.log("opened");
        };
        ws.current.onmessage = (data) => {
            console.log("Received data");
            console.log(data);
        };

        ws.current.onclose = () => {
            console.log("closed");
        };
    }, []);
    return html `
    <div class="hero px-5 py-5 is-flex is-flex-direction-column is-fullheight">
      <div class="pb-5 is-flex is-flex-direction-column full-height">
        <div>
          <h1
            class="title is-2 has-text-primary is-primary has-text-weight-bold mb-6"
          >
            Register
          </h1>
        </div>
        <div>
          <div class="field mt-6">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" id="name-input" type="text" />
            </div>
          </div>
          <div class="field mt-6">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" id="email-input" type="email" />
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" id="password-input" type="password" />
            </div>
          </div>
          <button
            class="button is-primary is-medium is-pulled-right"
            onclick="${() => {
              const request = {
                name: document.getElementById("name-input").value,
                email: document.getElementById("email-input").value,
                password: document.getElementById("password-input").value,
              };
              console.log(request);
              ws.current.send(JSON.stringify(request));
            }}"
          >
            Log in</button
          ><br />
        </div>
      </div>
    </div>
  `;
};
export default Register;