import "@babel/polyfill";
import $ from "jquery";
window.$ = $;
window.jQuery = $;

import { initializeFirebase, askForPermissioToReceiveNotifications } from './push-notification';


jQuery(document).ready(function() {
    console.log( "ready!" );
});

jQuery('#notify').on('touchstart click', (event) =>{
    event.preventDefault();
   let tokengen = askForPermissioToReceiveNotifications().then(res => {
    alert(res);
    $('#token').html('');
    $('#token').html(token);
   });
    
});



initializeFirebase();

