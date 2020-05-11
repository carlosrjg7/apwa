import "@babel/polyfill";
import $ from "jquery";
window.$ = $;
window.jQuery = $;

import { initializeFirebase, askForPermissioToReceiveNotifications } from './push-notification';


jQuery(document).ready(function() {
    console.log( "ready!" );
});

jQuery('#notify').on('click', () =>{
    askForPermissioToReceiveNotifications();
});

initializeFirebase();

