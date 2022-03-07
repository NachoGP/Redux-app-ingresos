import { initializeApp } from "firebase/app";

export const environment = {
  production: true,
  firebase: {
    projectId: 'redux-login-ingresos-app',
    appId: '1:101860195991:web:2b86434610115c44ef73d2',
    storageBucket: 'redux-login-ingresos-app.appspot.com',
    locationId: 'europe-central2',
    apiKey: 'AIzaSyBvcFNB3bJBfdmVhPtCgPYEQsTL9YLyQSY',
    authDomain: 'redux-login-ingresos-app.firebaseapp.com',
    messagingSenderId: '101860195991',
  }
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
