

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
}