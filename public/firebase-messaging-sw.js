importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')
firebase.initializeApp({
    apiKey: "AIzaSyCwgKRQ5fr9iJ33fbH1oWo9NPsUkcq76IY",
    authDomain: "social-media-434c6.firebaseapp.com",
    projectId: "social-media-434c6",
    storageBucket: "social-media-434c6.appspot.com",
    messagingSenderId: "573496330806",
    appId: "1:573496330806:web:2afbfeb7da278bff6c2697"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
      );
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
      };
      
      self.registration.showNotification(notificationTitle, notificationOptions);
    });
    