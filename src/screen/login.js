import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  useWindowDimensions,
} from "react-native";
import styles from "./login.styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 768; // breakpoint para web

  const handleLogin = () => {
    if (email && senha) {
      Alert.alert("Sucesso", `Bem-vindo ${email}`);
      navigation.replace("Home");
    } else {
      Alert.alert("Erro", "Preencha todos os campos");
    }
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

        <Text style={styles.registerText}>
          Não possui conta? <Text style={styles.link}>Clique aqui</Text> para registrar!
        </Text>
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
