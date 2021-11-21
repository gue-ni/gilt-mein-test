self.addEventListener("install", () => {
	console.log("installed service worker");
});

self.addEventListener("fetch", (event) => {
	event.respondWith(fetch(event.request));
});
