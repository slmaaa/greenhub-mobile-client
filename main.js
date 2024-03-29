import "https://cdn.skypack.dev/preact/debug";

const { h, render } = preact;
const { Router } = preactRouter;
const { useEffect, useState, useRef } = preactHooks;

import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);

import Login from "./login.js";
import Home from "./home.js";
import Search from "./search.js";
import QR_Code from "./qr_code.js";
import Reward from "./reward.js";
import Register from "./register.js";

const Main = () => {
    //useStates for routing
    const user = useRef(null);
    const [currentPage, setCurrentPage] = useState("HOME");
    const [isLoading, setIsLoading] = useState(true);

    //DUMMY VALUES FOR TESTING
    const userDataRef = useRef({
        userID: "d66b3691-836f-4aaf-9ddf-6566b06a9725",
        balance: 0,
        g_cash: 1000,
    });

    useEffect(() => {
        console.log(currentPage);
    }, [currentPage]);

    let scene;
    switch (currentPage) {
        case "LOGIN":
            scene = html `<${Login} setCurrentPage=${setCurrentPage} />`;
            break;
        case "HOME":
            scene = html `<${Home}
        setCurrentPage=${setCurrentPage}
        user=${user}
        currentPage=${currentPage}
        userDataRef=${userDataRef}
      />`;
            break;
        case "SEARCH":
            scene = html `<${Search}
        setCurrentPage=${setCurrentPage}
        currentPage=${currentPage}
      />`;
            break;
        case "QR_CODE":
            scene = html `<${QR_Code}
        setCurrentPage=${setCurrentPage}
        currentPage=${currentPage}
        userDataRef=${userDataRef}
      />`;
            break;
        case "REWARD":
            scene = html `<${Reward}
        setCurrentPage=${setCurrentPage}
        currentPage=${currentPage}
        userDataRef=${userDataRef}
      />`;
            break;
        case "REGISTER":
            scene = html `<${Register}
        setCurrentPage=${setCurrentPage}
        userDataRef=${userDataRef}
      />`;
            break;
    }
    return scene;
    return html ` 
    <${Router}>
        <${Home} path="/" setCurrentPage=${set}/>
        <${Login} path="/login" />
        <${Register} path="/register" />
    </${Router}>`;
};

render(html `<${Main} />`, document.body);