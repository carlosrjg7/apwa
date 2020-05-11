//import {initializeFirebase} from './push-notification.js';


var url = window.location.href;
var swLocation = '/apwa/sw.js';


/* $( document ).ready(function() {
    console.log( "ready!" );
});
 */

if(navigator.serviceWorker){

    if(url.includes('localhost')){
        swLocation = '/sw.js';
    }

    navigator.serviceWorker.register(swLocation)
        .then(reg => {
            console.log(reg);
          //  firebase.messaging().useServiceWorker(reg);
        });

}

//initializeFirebase();

