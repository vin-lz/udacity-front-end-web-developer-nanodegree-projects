const cacheName = 'cache-v' + Math.floor(Math.random() * 10000);;
const cacheFiles = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
	];

//add cacheFiles to cache at install event
self.addEventListener('install', function(e) {
	//wait untill completion
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(cacheFiles);
		})
	);
});


self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			if (response) {
				return response;
			}
			else {
				return fetch(e.request)
				.then(function(response) {
					const responseClone = response.clone();
					caches.open(cacheName).then(function(cache) {
						cache.put(e.request, responseClone);
					});
					return response;
				})
				.catch(function(err) {
					console.error(err);
				});
			}         
		})
	);
});