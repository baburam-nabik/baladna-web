importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Initialize Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyDK4WHKt2ApuySeikBJyWfjP_Lh5LR9Jqk',
    appId: '1:606098100078:web:23f080feeb89bc704ebb7f',
    messagingSenderId: '606098100078',
    projectId: 'scoreloan-development',
    authDomain: 'scoreloan-development.firebaseapp.com',
    storageBucket: 'scoreloan-development.firebasestorage.app',
    measurementId: 'G-W1WNH4Q2EL',
});

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);

    const notificationTitle = payload.notification?.title || "No Title";
        const notificationOptions = {
            body: payload.notification?.body || "No body",
            icon: '/icons/icon-192.png',
            data: payload.data,
            click_action: payload.fcmOptions?.link || "/",
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
});


// Handle notification click
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    if (event.notification.data && event.notification.data.click_action) {
        event.waitUntil(clients.openWindow(event.notification.data.click_action));
    }
});
