// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey:"AIzaSyBujiJHU8KbVRdH-Ta53RF-oeSax2RKz80",
  authDomain: "mern-estate-8d897.firebaseapp.com",
  projectId: "mern-estate-8d897",
  storageBucket: "mern-estate-8d897.appspot.com",
  messagingSenderId: "87809878839",
  appId: "1:87809878839:web:4d7ba7a8761f33838388b2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export default app
