import 'bootstrap';
import 'select2';

import {setNavbarBackground} from "./navbar.js";
import {assignGridEventsToGridContentElement, initialGrid} from "./grid.js";

$(document).ready(function () {
    loadComponents()
        .then(
            function() {
                let apiKey = "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"
                let ticketMasterUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + apiKey;

                setNavbarBackground();
                initialGrid(ticketMasterUrl);
            }
        );
});

function loadComponents() {
    return new Promise((resolve) => {
        $('#home-header').load("../components/navbar.html");
        $('#home-banner').load("../components/banner.html");
        $('#home-footer').load("../components/footer.html");
        resolve();
    })
}

assignGridEventsToGridContentElement();