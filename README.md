# greenhub-mobile-client

<img src="images/maskable_icon.png" alt="icon" width="150"/>

A web mobile application for Greenhub users. Aim to make the experience of using Greenhub service fluent and user-friendly.

## Usage

1. Access [https://greenhub.slmaaa.work](https://greenhub.slmaaa.work)
2. (Optional) Add application to home page

## Main screens

1.  Home
    Contains dashboards which show interesting and motivating data to the users. List of tasks will be generated for the users in order to motivate them using Greehub.<br/>
    <img src="screenshots/Screenshot_2.png" alt="screenshot" width="200"/>

2.  Search
    Render Greenhub restaurants as maskers on a map (Provided using Google Map API). User can check for more details by pressing on one of the markers.<br/>
    TODO: Search for Greenhub Restaurants with filters
    <br/>
    <img src="screenshots/Screenshot_1.png" alt="screenshot" width="200"/>
    <img src="screenshots/Screenshot_6.png" alt="screenshot" width="200"/>

3.  Reward
    Show rewards that could be redeemed using G-CASH (credits rewarded by using Greenhub).
    <br/>
    TODO: Reward redeeming, use redeemed coupon, search function with filter<br/>
    <img src="screenshots/Screenshot_5.png" alt="screenshot" width="200"/>

4.  Borrow/return/top-up
    Three operations: "Borrow", "Return" and "Top-up" will be done using the same QR code.
    The app will request a UUID from the server. After the operation is processed by the Greenhub Restaurant (scanning QR code) and verified by the server. The user will receive a response with details.
    <br/>
    <img src="screenshots/Screenshot_4.png" alt="screenshot" width="200"/>
    <img src="screenshots/Screenshot_3.png" alt="screenshot" width="200"/>

## Framworks and Libraries used

Framework: Preact<br/>
UI: Bulma
