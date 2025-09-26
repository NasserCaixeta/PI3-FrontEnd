import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { auth } from "../../firebaseConfig"; // Verifique se o caminho está correto
import styles from "./login.styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 768; // breakpoint para web

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha e-mail e senha");
      return;
    }

    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Login bem-sucedido
        const user = userCredential.user;
        console.log("Login realizado com sucesso:", user.email);
        // A navegação para a Home será gerenciada pelo App.js
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password" || errorCode === "auth/invalid-credential") {
          Alert.alert("Erro", "Usuário ou senha inválidos.");
        } else {
          Alert.alert("Erro ao fazer login", error.message);
        }
      });
  };

  return (
    <View
      style={[
        styles.container,
        isLargeScreen ? styles.rowContainer : styles.columnContainer,
      ]}
    >
      {/* Card de login */}
      <View style={[styles.card, isLargeScreen && styles.cardLarge]}>
        <Text style={styles.title}>
          Bem-vindo ao <Text style={styles.highlight}>Feira</Text> no Ponto
        </Text>
        <Text style={styles.subtitle}>Preencha os dados do login para acessar</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>
            Não possui conta? <Text style={styles.link}>Clique aqui</Text> para registrar!
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo_feira.png")}
          style={isLargeScreen ? styles.logoLarge : styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
