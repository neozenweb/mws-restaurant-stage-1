console.log("Service Worker Registered");
const cachefiles=[
    '/',
    'index.html',
    'restauant.html',
    'css/styles.css',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'
            
];
//Event listener for install

self.addEventListener('install',function(e){
    
     e.waitUntil(
        caches.open('v1').then(function(cache){
                
              cache.addAll(cachefiles).then(function(){console.log("successfully cached");return cache.addAll(cachefiles);})
                                      .catch(err=>console.log("error in caching files  " + cachefiles, err));
                 
           })
        );
    
});

// Event Listener for fetch

self.addEventListener('fetch',function(f){
    f.respondWith(
         caches.match(f.request).then(function(response){
                  const clonedresp = response.clone();     
               caches.open('v1').then(function(cache){
                   cache.put(f.request,clonedresp);
               })
                            if (clonedresp){
        
                            console.log('FOUND');
                            return response;
                                    }
                                 else{
                                 console.log('could not find');
                                 return fetch(f.request);
        
                                 }
                                 
                        })
        );
    
    
    });

