import "@babel/polyfill";
import $ from "jquery";
window.$ = $;
window.jQuery = $;

//import firebase from 'firebase';

import { initializeFirebase, subscribeToNotifications, unSubscribe } from './push-notification';

//import './push-notification';


initializeFirebase();


jQuery(document).ready(function() {
    console.log( "ready!" );
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

     if(Notification.permission === 'denied'){
         console.log('las notificaciones estan bloqueadas..');
     }
});



jQuery('#notify_active').on('touchstart click', (event) =>{
    event.preventDefault();
    console.log('click suscrip');
    subscribeToNotifications();
    jQuery(this).css('display', 'none');
});


jQuery('#notify_inactive').on('touchstart click', (event) =>{
    event.preventDefault();
    console.log('click Unsuscrip');
    unSubscribe();
    jQuery(this).css('display','none');
});
