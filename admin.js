var admin = require("firebase-admin");

var serviceAccount = require("./antika-3c76f-firebase-adminsdk-f1imy-f1f80da5f0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// This registration token comes from the client FCM SDKs.
const registrationToken = 'cXqC7MWy0g7poSwoc_mAiH:APA91bE8Nf8Fboy67APdIknCVCAFlzQlRw6pZADkPBme_i48TqCnQW2L9RKJ10dFjuVCwlH33_QuBnJVmNDdQGAEtCVYBmLMZucoLSw5yV2IKyYAxUsTrfmQvUEz7PwQ4IMgjBcCtTAk';

admin.messaging().subscribeToTopic([registrationToken], 'users')
  .then((response) => {
    console.log('Successfully subscribed to topic:', response);
  })
  .catch((error) => {
    console.log('Error subscribing to topic:', error);
  });

const message = {
  notification: {
    title: 'title',
    body: 'body'
  },
  webpush: {
    fcmOptions: {
      link: '/?breakingnews'
    }
  },
  token: registrationToken
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });