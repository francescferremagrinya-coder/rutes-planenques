import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from "react-native";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

type Usuari = {
  id: string;
  nom?: string;
  foto?: string;
  punts?: number;
};

export default function Ranking() {
  const [usuaris, setUsuaris] = useState<Usuari[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "usuaris"), orderBy("punts", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setUsuaris(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (err) => setError(err.message)
    );
    return unsubscribe;
  }, []);

  if (error) {
    return (
      <View style={styles.centre}>
        <Text style={styles.error}>Error carregant el rànquing: {error}</Text>
      </View>
    );
  }

  if (!usuaris) {
    return (
      <View style={styles.centre}>
        <ActivityIndicator color="#D4A843" size="large" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.llista}
      data={usuaris}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View style={styles.fila}>
          <Text style={styles.posicio}>{index + 1}</Text>
          {item.foto ? (
            <Image source={{ uri: item.foto }} style={styles.foto} />
          ) : (
            <View style={[styles.foto, styles.fotoBuida]} />
          )}
          <Text style={styles.nom}>{item.nom ?? "(sense nom)"}</Text>
          <Text style={styles.punts}>{item.punts ?? 0}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  llista: { flex: 1, backgroundColor: "#1A2E1D" },
  centre: {
    flex: 1,
    backgroundColor: "#1A2E1D",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  error: { color: "#F5F0E8", textAlign: "center" },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2A3F2D",
  },
  posicio: { color: "#D4A843", fontWeight: "700", width: 24 },
  foto: { width: 36, height: 36, borderRadius: 18 },
  fotoBuida: { backgroundColor: "#2A3F2D" },
  nom: { color: "#F5F0E8", flex: 1 },
  punts: { color: "#D4A843", fontWeight: "700" },
});
