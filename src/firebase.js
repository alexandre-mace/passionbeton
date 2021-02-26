import firebase from 'firebase/app';
import 'firebase/messaging';
import addDeviceToken from "./data/http/addDeviceToken";

const firebaseConfig = {
    apiKey: "AIzaSyBM5Ca68pyv781JkfKeCZhOY5T5QMRnqiQ",
    authDomain: "passionbeton-c2e88.firebaseapp.com",
    projectId: "passionbeton-c2e88",
    storageBucket: "passionbeton-c2e88.appspot.com",
    messagingSenderId: "962110031",
    appId: "1:962110031:web:553f4f6850f0ec1242003a"
};

firebase.initializeApp(firebaseConfig);

const messaging = null;
if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging();
}

export const getToken = (setTokenFound) => {
    if (firebase.messaging.isSupported()) {
        return messaging.getToken({vapidKey: 'BIlSpicZrE17yN4cVKZ7xhD78z44qnnXlBH2kwR1trbSt1DHKP6oW4srqq4l6xD3GgKdThUYbcCGmoNvwxfdAJE'}).then((currentToken) => {
            if (currentToken) {
                setTokenFound(true);
                addDeviceToken({'token': currentToken})
                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setTokenFound(false);
                // shows on the UI that permission is required
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // catch error while creating client token
        });
    } else {
        return false
    }
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        if (firebase.messaging.isSupported()) {
            messaging.onMessage((payload) => {
                resolve(payload);
            });
        }
    });