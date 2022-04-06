import "https://cdn.skypack.dev/preact/debug";
import { h } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import {
  useEffect,
  useState,
  useRef,
} from "https://cdn.skypack.dev/preact/hooks";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const provider = new GoogleAuthProvider();

export const Login = ({ setCurrentPage, app }) => {
  const auth = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    auth.current = getAuth(app.current);
  }, []);

  return isLoading
    ? html`<p>Loading</p>`
    : html`
        <div
          class="hero px-5 py-5 is-flex is-flex-direction-column is-fullheight"
        >
          <div class="pb-5">
            <h1
              class="title is-3 has-text-primary is-primary has-text-weight-bold"
            >
              Greenhub
            </h1>
            <h1 class="subtitle has-text-dark has-text-weight-light">
              Login to your account
            </h1>
          </div>
        </div>
      `;
};

export default Login;
