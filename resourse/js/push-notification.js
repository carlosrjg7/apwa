import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyAwWArnTnyHGSrGBr3Oby7WwS8oflag784",
    authDomain: "pwat-d6956.firebaseapp.com",
    databaseURL: "https://pwat-d6956.firebaseio.com",
    projectId: "pwat-d6956",
    storageBucket: "pwat-d6956.appspot.com",
    messagingSenderId: "956765347113",
    appId: "1:956765347113:web:62fd0e94d89345812dab38",
    measurementId: "G-R3CJPXBC55"
  });



  var url = window.location.href;
  var swLocation = '/apwa/sw.js';

if(navigator.serviceWorker){

  if(url.includes('localhost')){
      swLocation = '/sw.js';
      console.log(swLocation);
  }

  navigator.serviceWorker.register(swLocation)
      .then(reg => {
          console.log(reg);
          firebase.messaging().useServiceWorker(reg);
      });

}

} 

export const  askForPermissioToReceiveNotifications = async () => {
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

export const hola = () =>{
  console.log('hoila');
};
