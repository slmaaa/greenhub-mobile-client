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

const REFRESH_URL =
    "https://greenhub.slmaaa.work/backend/dj-rest-auth/refresh/";

const Main = () => {
    useEffect(() => {
        fetch(REFRESH_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console,
                log(err);
            });
    }, []);

    return html ` 
    <${Router}>
        <${Home} path="/" />
        <${Login} path="/login" />
        <${Register} path="/register" />
        <${Search} path="/search" />
        <${QR_Code} path="/qr_code"/>
        <${Reward} path="/reward" />
    </${Router}>`;
};

render(html `<${Main} />`, document.body);