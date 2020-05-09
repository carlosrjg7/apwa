importScripts('js/sw-utils.js');

const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
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