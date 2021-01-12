// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBM5Ca68pyv781JkfKeCZhOY5T5QMRnqiQ",
    authDomain: "passionbeton-c2e88.firebaseapp.com",
    projectId: "passionbeton-c2e88",
    storageBucket: "passionbeton-c2e88.appspot.com",
    messagingSenderId: "962110031",
    appId: "1:962110031:web:553f4f6850f0ec1242003a"
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});