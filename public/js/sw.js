!function s(a,c,o){function u(t,e){if(!c[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(f)return f(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var i=c[t]={exports:{}};a[t][0].call(i.exports,function(e){return u(a[t][1][e]||e)},i,i.exports,s,a,c,o)}return c[t].exports}for(var f="function"==typeof require&&require,e=0;e<o.length;e++)u(o[e]);return u}({1:[function(e,t,n){"use strict";importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js"),importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");var r="static-v2.1",i="dynamic-v2.1",s=["index.html","css/styles.css","js/index.js"];function a(e,n){return fetch(n).then(function(t){return t.ok?caches.open(e).then(function(e){return e.put(n,t.clone()),t.clone()}):t})}self.addEventListener("install",function(e){var t=caches.open(r).then(function(e){return e.addAll(s)});e.waitUntil(t)}),self.addEventListener("activate",function(e){var t=caches.keys().then(function(e){e.forEach(function(e){return e!==r&&e.includes("static")||e!==i&&e.includes("dynamic")?caches.delete(e):void 0})});e.waitUntil(t)}),self.addEventListener("fetch",function(t){var e=caches.match(t.request).then(function(e){return e?(a(r,t.request),e):a(i,t.request)});t.respondWith(e)}),firebase.initializeApp({apiKey:"AIzaSyAwWArnTnyHGSrGBr3Oby7WwS8oflag784",authDomain:"pwat-d6956.firebaseapp.com",databaseURL:"https://pwat-d6956.firebaseio.com",projectId:"pwat-d6956",storageBucket:"pwat-d6956.appspot.com",messagingSenderId:"956765347113",appId:"1:956765347113:web:62fd0e94d89345812dab38",measurementId:"G-R3CJPXBC55"});firebase.messaging()},{}]},{},[1]);
//# sourceMappingURL=sw.js.map
