// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig"; // Importe sua config

import Home from "./src/screen/home"; // Importe a Home

console.log("Componente Home importado:", Home); // <--- ADICIONE ESTA LINHA

import Login from "./src/screen/login";
import Register from "./src/screen/register";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listener que fica "ouvindo" as mudanças de autenticação
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Se houver um usuário logado, mostre a tela Home
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Feira no Ponto" }}
          />
        ) : (
          // Se NÃO houver usuário, mostre as telas de Login/Registro
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