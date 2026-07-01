importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "__API_KEY__",
    appId: "__APP_ID__",
    messagingSenderId: "__MESSAGING_SENDER_ID__",
    projectId: "__PROJECT_ID__",
    authDomain: "__AUTH_DOMAIN__",
    storageBucket: "__STORAGE_BUCKET__",
    measurementId: "__MEASUREMENT_ID__",
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
