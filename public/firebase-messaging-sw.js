// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAn1-7_MRnT11EDG0cwQrRqsudC19EeWQM",
    authDomain: "antika-3c76f.firebaseapp.com",
    projectId: "antika-3c76f",
    storageBucket: "antika-3c76f.appspot.com",
    messagingSenderId: "943515890689",
    appId: "1:943515890689:web:cfb107c678d3f908c4bc00",
    // measurementId: 'G-measurement-id',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/BG.jpg'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });