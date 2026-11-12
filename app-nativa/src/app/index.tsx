import { useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../auth-context";

WebBrowser.maybeCompleteAuthSession();

// ════════════════════════════════════════════════════════
//  CONFIGURACIÓ PENDENT — s'ha d'omplir abans que el login funcioni:
//
//  1. Firebase Console → Authentication → Sign-in method → Google → desplega
//     "Configuració del SDK web" i copia el "Client ID web" d'allà a
//     WEB_CLIENT_ID (és el mateix que ja fa servir l'app web).
//  2. Google Cloud Console → APIs i serveis → Credencials → crea un
//     "ID de client OAuth" de tipus Android, amb el nom del paquet
//     (de moment app.json diu "app-nativa", s'haurà de triar el definitiu,
//     p.ex. "cat.rutesplanenques.app") i l'empremta SHA-1 del certificat de
//     signatura (Expo la dona amb `eas credentials`). Enganxa'l a
//     ANDROID_CLIENT_ID.
// ════════════════════════════════════════════════════════
const WEB_CLIENT_ID =
  "843557916096-33qn2o3jq715p5nv13p6hibstglea340.apps.googleusercontent.com";
const ANDROID_CLIENT_ID = ""; // TODO: enganxar l'ID de client OAuth Android

export default function Login() {
  const { user, carregant } = useAuth();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: WEB_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((e) =>
        console.warn("Error fent login:", e)
      );
    }
  }, [response]);

  useEffect(() => {
    if (user) router.replace("/ranking");
  }, [user]);

  if (carregant) {
    return (
      <View style={styles.centre}>
        <ActivityIndicator color="#D4A843" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.centre}>
      <Text style={styles.titol}>Rutes Planenques</Text>
      <Text style={styles.subtitol}>Prova de concepte — app nativa Android</Text>
      {user ? (
        <>
          <Text style={styles.benvingut}>Hola, {user.displayName}!</Text>
          <Pressable style={styles.boto} onPress={() => signOut(auth)}>
            <Text style={styles.botoText}>Sortir</Text>
          </Pressable>
        </>
      ) : (
        <Pressable
          style={styles.boto}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Text style={styles.botoText}>Entra amb Google</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centre: {
    flex: 1,
    backgroundColor: "#1A2E1D",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
  },
  titol: { color: "#F5F0E8", fontSize: 28, fontWeight: "700" },
  subtitol: { color: "#A89880", fontSize: 14, marginBottom: 12 },
  benvingut: { color: "#F5F0E8", fontSize: 16 },
  boto: {
    backgroundColor: "#D4A843",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
  },
  botoText: { color: "#1A2E1D", fontWeight: "700", fontSize: 16 },
});
