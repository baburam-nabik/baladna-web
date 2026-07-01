importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyC-fWEiqhFCgCum_Z5yMqFVXbo_fQ54RV0",
    appId: "1:138570770920:android:811b40094f54850bd01c5d",
    messagingSenderId: "138570770920",
    projectId: "scoreloan-dev",
    authDomain: "scoreloan-dev.firebaseapp.com",
    storageBucket: "scoreloan-dev.firebasestorage.app",
    measurementId: "G-R7EQVQF70C",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message:", payload);

    const notificationTitle = payload.notification?.title || "No Title";

    const notificationOptions = {
        body: payload.notification?.body || "No body",
        icon: "/icons/Icon-192.png",
        data: payload.data,
        click_action: payload.fcmOptions?.link || "/",
    };

    self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();

    if (event.notification.data &&
        event.notification.data.click_action) {
        event.waitUntil(
            clients.openWindow(event.notification.data.click_action)
        );
    }
});
