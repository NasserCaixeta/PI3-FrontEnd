import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native"; // <--- importar
import { auth } from "./firebaseConfig";

import CadastroProdutos from "./src/screen/cadastroprodutos";
import EditProductScreen from "./src/screen/editProduct";
import Home from "./src/screen/home";
import Login from "./src/screen/login";
import Register from "./src/screen/register";
import RegistrarVenda from "./src/screen/registrarvenda";
import RelatorioVendas from "./src/screen/relatoriodevendas";
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <-- novo estado

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // só termina quando Firebase responder
    });
    return unsubscribe;
  }, []);

  if (loading) {
    // Enquanto o Firebase responde, mostra um loader
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Feira no Ponto" }}
            />
            <Stack.Screen
              name="CadastroProdutos"
              component={CadastroProdutos}
              options={{ title: "Cadastro de Estoque" }}
            />
            <Stack.Screen
              name="EditProduct"
              component={EditProductScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RelatorioVendas"
              component={RelatorioVendas}
              options={{ title: "Relatório de Vendas" }}
            />
            <Stack.Screen
              name="RegistrarVenda"
              component={RegistrarVenda}
              options={{ title: "Registrar Venda" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
