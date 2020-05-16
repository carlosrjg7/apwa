import firebase from 'firebase';

/*==================
    variables
===================*/
let FIREBASE_AUTH;
let FIREBASE_MESSAGING;
let FIREBASE_DATABASE; 



const firebaseConfig = {
  apiKey: "AIzaSyAwWArnTnyHGSrGBr3Oby7WwS8oflag784",
  authDomain: "pwat-d6956.firebaseapp.com",
  databaseURL: "https://pwat-d6956.firebaseio.com",
  projectId: "pwat-d6956",
  storageBucket: "pwat-d6956.appspot.com",
  messagingSenderId: "956765347113",
  appId: "1:956765347113:web:62fd0e94d89345812dab38",
  measurementId: "G-R3CJPXBC55"
};



/* ==============
   Eventos
================*/





/* ================
    Functions
==================*/


/* Inicializa firebase e instala el service worker*/
export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);

   FIREBASE_MESSAGING = firebase.messaging();
   FIREBASE_DATABASE = firebase.database(); 


  let url = window.location.href;
  let swLocation = '/apwa/sw.js';

  if (navigator.serviceWorker) {

    if (url.includes('localhost')) {
      swLocation = '/sw.js';
      console.log(swLocation);
    }

    navigator.serviceWorker.register(swLocation)
      .then(reg => {
        console.log(reg);
        firebase.messaging().useServiceWorker(reg);
        reg.pushManager.getSubscription().then( verificaSuscripcion );
      });

  }

};


function verificaSuscripcion(activadas){
    const btnActivate = jQuery('.section_button');
    let store = window.localStorage.getItem('sentToServer');
  if(activadas && store ==='1'){

    btnActivate.removeClass('show');
    btnActivate.addClass('hide');

  }else{
    console.log('no hay suscrip');
    btnActivate.addClass('show');
    btnActivate.removeClass('hide');

    setTokenSentToServer(false);
    window.localStorage.removeItem('pushToken');
  }
}


const addTokenToFirebaseBD = async (token) =>{

    await FIREBASE_DATABASE.ref('/tokens').push({
      token: token
    });

    window.localStorage.setItem('pushToken', token);
 
};

//function para consultar el token en localStorage
const isTokenSentToServer = () => {
  return window.localStorage.getItem('sentToServer') === '1';
}

//funciona para guardar en mi server mysql o firebase
const setTokenSentToServer = (sent) => {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');

}

//funcion para almacenar los tokens en localStorage
const sendTokenToServer = (token) =>{

  const btnActivate = jQuery('.section_button');

    if(!isTokenSentToServer()){
      setTokenSentToServer(true);
      addTokenToFirebaseBD(token);
      console.log('Send token to server');
      btnActivate.removeClass('show');
      btnActivate.addClass('hide');
    }else{
      console.log('El token ya existe en el server');
      btnActivate.removeClass('show');
      btnActivate.addClass('hide');
    }
};

const handleTokenRefresh = async () =>{

  return await  FIREBASE_MESSAGING.getToken().then( (currentToken) => {
    if(currentToken){
      sendTokenToServer(currentToken);
      return currentToken;
    }else{
      console.log('no hay token valido, genera permiso de nuevo');
      setTokenSentToServer(false);
      return;
    }

  }).catch(err => {
      console.log('Ocurrio un error', err);
      setTokenSentToServer(false);
  });

};
 

const getTokenToDelete = async () =>{
  return await  FIREBASE_MESSAGING.getToken().then( (currentToken) => {
    if(currentToken){
      return currentToken;
    }

  }).catch(err => {
      console.log('Ocurrio un error', err);
  });

}


/* ======= Suscripcion a Notificaciones ======= */
export const subscribeToNotifications = async () =>{

  try{
    await FIREBASE_MESSAGING.requestPermission();
    const token = await handleTokenRefresh();
    return token;
  } catch (error){
    console.log(error);
  }

};


export const unSubscribe = async () =>{


    const tokenToDelete =  await getTokenToDelete();

  console.log(tokenToDelete);

  FIREBASE_MESSAGING.deleteToken(tokenToDelete)
  .then(() => FIREBASE_DATABASE.ref('/tokens').orderByChild("token").equalTo(tokenToDelete).once('value'))
  .then((snapshot) => {
    const key = Object.keys(snapshot.val())[0];
    return FIREBASE_DATABASE.ref('/tokens').child(key).remove();
  })
  .then( () => setTokenSentToServer(false))
  .catch( error => { console.log(" Error eliminando token ", error)}); 

};
