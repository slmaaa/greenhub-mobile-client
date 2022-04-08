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
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const provider = new GoogleAuthProvider();

export const Login = ({ setCurrentPage, app }) => {
    const auth = useRef(null);
    const user = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isLogined, setIsLogined] = useState(false);
    useEffect(() => {
        auth.current = getAuth(app.current);
        setIsLoading(false);
        console.log(isLogined);
    }, []);

    useEffect(() => {
        if (!isLogined) return;
    }), [isLogined];

    const handleGoogleLogin = () => {
        signInWithRedirect(auth.current, provider);
        setIsLogined(true);
    };

    return html `
    <div class="hero px-5 py-5 is-flex is-flex-direction-column is-fullheight">
      <div class="pb-5 is-flex is-flex-direction-column full-height">
        <div>
        <h1 class="title is-3 has-text-primary is-primary has-text-weight-bold">
          Greenhub
        </h1>
        <h1 class="subtitle has-text-dark has-text-weight-light">
          Login to your account
        </h1>
        </div>
        <div class="box is-flex-grow-1 my-6">Icon</div>
        <div class="one-third-height py-6">
        <button class="button is-primary full-width" onClick=${handleGoogleLogin}>
          Google
        </button>
        </div>
      </div>
    </div>
  `;
};

export default Login;