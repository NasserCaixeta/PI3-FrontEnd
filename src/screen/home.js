// src/screen/home.js
import { signOut } from "firebase/auth";
import { Button, StyleSheet, Text, View } from "react-native";
import { auth } from "../../firebaseConfig";

export default function Home() {
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Erro no logout: ", error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.email}>{user ? user.email : "Usuário"}</Text>
      <Button title="Sair" onPress={handleLogout} color="#ff6600" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
});