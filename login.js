import "https://cdn.skypack.dev/preact/debug";
const { h, render } = preact;
const { Router } = preactRouter;
const { useEffect, useState, useRef } = preactHooks;
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);

export const Login = ({ setCurrentPage }) => {
    const user = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isLogined, setIsLogined] = useState(false);
    useEffect(() => {
        setIsLoading(false);
        console.log(isLogined);
    }, []);

    return html `
    <div class="hero px-5 py-5 is-flex is-flex-direction-column is-fullheight">
      <div class="pb-5 is-flex is-flex-direction-column full-height">
        <div>
          <h1
            class="title is-2 has-text-primary is-primary has-text-weight-bold mb-6"
          >
            Login
          </h1>
        </div>
        <div>
          <div class="field mt-6">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" />
            </div>
          </div>
          <button class="button is-primary is-medium is-pulled-right">
            Log in</button
          ><br />
        </div>
        <div class="one-third-height py-6">
          <button
            class="button is-danger is-outlined mt-3 full-width"
            onclick="${() => {
              setCurrentPage("REGISTER");
            }}"
          >
            Register now
          </button>
          <button class="button is-primary is-outlined full-width mt-5">
            Continue with Google
          </button>
          <button class="button is-primary is-outlined full-width mt-5">
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  `;
};

export default Login;