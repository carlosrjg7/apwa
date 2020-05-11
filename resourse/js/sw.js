//importScripts('js/sw-utils.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


const STATIC_CACHE    = 'static-v2.2';
const DYNAMIC_CACHE   = 'dynamic-v2.2';
//const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'css/styles.css',
    'js/index.js'
];


self.addEventListener('install', e =>{

    const cacheStatic = caches.open( STATIC_CACHE )
                              .then( cache => cache.addAll( APP_SHELL ));
    
    e.waitUntil(cacheStatic);

});


self.addEventListener('activate', e =>{

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});

self.addEventListener('fetch', e => {

    let respuesta;

    respuesta = caches.match( e.request ).then( res =>{

        if(res){
            actualizarCache(STATIC_CACHE, e.request);
            return res;
        }else{
            return actualizarCache(DYNAMIC_CACHE, e.request);
        }
    });

    e.respondWith(respuesta); 

});

function actualizarCache(cacheName, req){
    return fetch( req ).then(res => {
        
        if(res.ok){
            return caches.open(cacheName).then( cache => {
                cache.put(req, res.clone());
                return res.clone();
            });
        }else{
            return res;
        }


    });
};



firebase.initializeApp({
    apiKey: "AIzaSyAwWArnTnyHGSrGBr3Oby7WwS8oflag784",
    authDomain: "pwat-d6956.firebaseapp.com",
    databaseURL: "https://pwat-d6956.firebaseio.com",
    projectId: "pwat-d6956",
    storageBucket: "pwat-d6956.appspot.com",
    messagingSenderId: "956765347113",
    appId: "1:956765347113:web:62fd0e94d89345812dab38",
    measurementId: "G-R3CJPXBC55"
});

const messaging = firebase.messaging();
 