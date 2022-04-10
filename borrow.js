import "https://cdn.skypack.dev/preact/debug";
import { h } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import {
    useEffect,
    useState,
    useRef,
} from "https://cdn.skypack.dev/preact/hooks";
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';
import QRCode from 'https://cdn.skypack.dev/qrcode';


import NavBar from "./navigation_bar.js";

export const Borrow = ({ setCurrentPage, user, currentPage }) => {
    const [borrowID, setBorrowID] = useState(null);
    const [isLoadingCode, setIsLoadingCode] = useState(true);
    useEffect(() => {
        setBorrowID(uuidv4());
        const canvas = document.getElementById("qr-code");
        QRCode.toCanvas(canvas, uuidv4(), { "width": window.innerWidth * 0.8, "color": { "light": "#0000" } }, function(error) {
            if (error) console.error(error)
            console.log('success!');
        })
    }, [])

    const [balance, setBalance] = useState(0);
    return html `
    <div class="hero is-flex is-flex-direction-column full-height">
        <div class="px-5 pt-5 is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-start">
            <div class="header">
                <h1 class="title ml-1 is-3 has-text-primary is-primary has-text-weight-bold">
                    Lend a Greenhub
                </h1>
    
                <div class="is-flex is-justify-content-space-between is-align-items-center">
                    <span class="is-size-5 has-text-weight-bold ml-2">Balance: $${balance.toString()}</span>
                    <button class="button is-right is-align-self is-primary is-light is-rounded is-size-6 is-small">
                        Top up
                    </button>
                </div>
            </div>
            <div class="box m-5 is-flex is-justify-content-center has-background-primary-light">
                <canvas id="qr-code" class="i"></canvas>
            </div>
        </div>
        <${NavBar} setCurrentPage=${setCurrentPage} currentPage=${currentPage} />
    </div>
  `;
};

export default Borrow;