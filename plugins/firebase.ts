import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDYyN8Tl4vSpil1r1xdlTqVEDoaxzBrMMY',
  authDomain: 'misskey-login-bonus.firebaseapp.com',
  databaseURL: 'https://misskey-login-bonus.firebaseio.com',
  projectId: 'misskey-login-bonus',
  storageBucket: 'misskey-login-bonus.appspot.com',
  messagingSenderId: '1046728037357',
  appId: '1:1046728037357:web:b258db2dc4c5148215cde4'
}

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore()
