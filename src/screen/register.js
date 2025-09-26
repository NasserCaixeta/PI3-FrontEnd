import { createUserWithEmailAndPassword } from "firebase/auth";
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
import styles from "./login.styles"; // Reutilizando os mesmos estilos do login

export default function Register({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 768;

  const handleRegister = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Cadastro e login automático bem-sucedidos
        const user = userCredential.user;
        Alert.alert("Sucesso!", `Conta para ${user.email} criada com sucesso!`);
        // A navegação para a Home será gerenciada pelo App.js
      })
      .catch((error) => {
        // Tratamento de erros do Firebase
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          Alert.alert("Erro", "Este e-mail já está em uso por outra conta.");
        } else if (errorCode === "auth/invalid-email") {
          Alert.alert("Erro", "O formato do e-mail é inválido.");
        } else if (errorCode === "auth/weak-password") {
          Alert.alert("Erro", "A senha precisa ter no mínimo 6 caracteres.");
        } else {
          Alert.alert("Erro ao cadastrar", error.message);
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
      {/* Card de registro */}
      <View style={[styles.card, isLargeScreen && styles.cardLarge]}>
        <Text style={styles.title}>
          Crie sua conta no <Text style={styles.highlight}>Feira</Text> no Ponto
        </Text>
        <Text style={styles.subtitle}>É rápido, fácil e gratuito</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>REGISTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.registerText}>
            Já possui conta? <Text style={styles.link}>Faça o login</Text>
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