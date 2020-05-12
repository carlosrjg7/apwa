import "@babel/polyfill";
import $ from "jquery";
window.$ = $;
window.jQuery = $;

import { initializeFirebase, askForPermissioToReceiveNotifications } from './push-notification';


jQuery(document).ready(function() {
    console.log( "ready!" );
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
});

jQuery('#notify').on('touchstart click', (event) =>{
    event.preventDefault();
    askForPermissioToReceiveNotifications();
});



initializeFirebase();

