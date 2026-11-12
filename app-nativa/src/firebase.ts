// Mateix projecte de Firebase que l'app web (rutes-planenques) — NO en creem
// cap de nou, perquè els ~220 usuaris i les seves dades (medalles, punts,
// rànquing) hi són vinculats i s'han de mantenir intactes.
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, type Auth } from "firebase/auth";
// @ts-expect-error -- El "package.json" de @firebase/auth posa un "types"
// sense condicionar ABANS del bloc "react-native", així que TypeScript
// sempre agafa els tipus web i no veu aquesta funció encara que sí que
// existeix en temps real (Metro sí resol bé el condition "react-native" en
// JS — només el TYPE-CHECK estàtic queda despistat). Verificat llegint
// directament node_modules/@firebase/auth/dist/rn/index.rn.d.ts.
import { getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mateixa configuració exacta que index.html (app web)
const firebaseConfig = {
  apiKey: "AIzaSyC1jtpfx9csBNkvXjrXe5gUnMI0Y3F_U5Y",
  authDomain: "rutes-planenques.firebaseapp.com",
  projectId: "rutes-planenques",
  storageBucket: "rutes-planenques.firebasestorage.app",
  messagingSenderId: "843557916096",
  appId: "1:843557916096:web:3d6911bdd7ad6bec0bcc25",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// initializeAuth() només es pot cridar un cop per app — en recàrregues en
// calent (Fast Refresh) ja existirà, per això el try/getAuth de fallback.
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  // Ja inicialitzat (Fast Refresh) — reutilitzem la instància existent.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  auth = require("firebase/auth").getAuth(app);
}
export { auth };

export const db = getFirestore(app);
