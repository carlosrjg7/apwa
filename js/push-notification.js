import firebase from '../node_modules/firebase';
import $ from "../node_modules/jquery";
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "your messagingSenderId"
  });
};


export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do usuário:', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
};