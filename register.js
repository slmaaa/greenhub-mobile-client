import "https://cdn.skypack.dev/preact/debug";
const { h, render } = preact;
const { Router } = preactRouter;
const { useEffect, useState, useRef } = preactHooks;
import htm from "https://cdn.skypack.dev/htm";
import { fetchUserInfo } from "./fetch.js";
const html = htm.bind(h);

const REGISTER_URL =
    "https://greenhub.slmaaa.work/backend/dj-rest-auth/registration/";

const Register = () => {
    const ws = useRef(null);

    const registerRequestRef = useRef(null);

    const handleRegister = () => {
        const request = {
            name: document.getElementById("name-input").value,
            email: document.getElementById("email-input").value,
            password1: document.getElementById("password-input").value,
            password2: document.getElementById("password-input").value,
        };
        console.log(request);
        fetch(REGISTER_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
                credentials: "include",
            })
            .then((response) => response.json())
            .then((data) => {
                route("/home");
            });
    };

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
            onclick="${handleRegister}"
          >
            Log in</button
          ><br />
        </div>
      </div>
    </div>
  `;
};
export default Register;