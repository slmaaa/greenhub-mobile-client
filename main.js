import "https://cdn.skypack.dev/preact/debug";

const { h, render } = preact;
const { Router, route } = preactRouter;
const { useEffect, useState, useRef } = preactHooks;

import htm from "https://cdn.skypack.dev/htm";
import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js";
const html = htm.bind(h);

import Login from "./login.js";
import Home from "./home.js";
import Search from "./search.js";
import QR_Code from "./qr_code.js";
import Reward from "./reward.js";
import Register from "./register.js";
import { fetchUserInfo } from "./fetch.js";

const REFRESH_URL =
    "https://greenhub.slmaaa.work/backend/dj-rest-auth/token/refresh/";

const Main = () => {
    useEffect(() => {
        fetch(REFRESH_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then((response) => {
            console.log(response);
            if (!response.ok) {
                route("/login");
            } else {
                fetchUserInfo.then((user) => {
                    Cookies.set("user", JSON.stringify(user), { expires: 1 });
                    route("/home");
                });
            }
        });
    }, []);

    return html ` 
    <${Router}>
        <${Login} path="/login" />
        <${Register} path="/register" />
        <${Home} path="/home" />
        <${Search} path="/search" />
        <${QR_Code} path="/qr_code"/>
        <${Reward} path="/reward" />
    </${Router}>`;
};

render(html `<${Main} />`, document.body);