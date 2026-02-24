const CACHE_NAME = "habit-cache-v1";
const BASE_PATH = "/HabitTracker/";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        BASE_PATH,
        BASE_PATH + "index.html",
        BASE_PATH + "style.css",
        BASE_PATH + "script.js"
      ]);
    })
  );
});