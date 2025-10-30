import { signOut } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { auth, db } from "../../firebaseConfig";
import styles from "./home.styles";

export default function Home({ navigation }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const [hoveredItem, setHoveredItem] = useState(null);
  const [estoque, setEstoque] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const produtosCollection = collection(db, "produtos");
      const q = query(produtosCollection, where("userId", "==", user.uid));

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const produtosList = [];
          querySnapshot.forEach((doc) => {
            produtosList.push({ id: doc.id, ...doc.data() });
          });
          setEstoque(produtosList);
          setLoading(false);
        },
        (error) => {
          console.error("Erro ao buscar produtos: ", error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    }
  }, []);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Erro no logout: ", error));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.nome}>{item.nome}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProduct", { productId: item.id })}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.texto}>💰 Custo: R$ {item.custo.toFixed(2)}</Text>
      <Text style={styles.texto}>🏷️ Preço: R$ {item.preco.toFixed(2)}</Text>
      <Text style={styles.texto}>📦 Estoque: {item.quantidade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* OBS: Centralizei o logo */}
      <ImageBackground
        source={require("../../assets/images/logo_feira.png")}
        style={styles.backgroundImage}
        imageStyle={{
          resizeMode: "contain",
          alignSelf: "center",
          opacity: 0.08,
        }}
      />

      {/* Topbar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.topMenuText}>Início</Text>
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* OBS: Mantive a sidebar, mas com comportamento ajustado para telas pequenas */}
            <View
        style={[
          styles.contentWrapper,
          !isLargeScreen && { flexDirection: "column" }, // OBS: empilha tudo no mobile
        ]}
      >
        <View style={[styles.sidebar, !isLargeScreen && styles.sidebarMobile]}>
          <Text style={styles.menuGroupTitle}>Estoque</Text>

          <TouchableOpacity onPress={() => navigation.navigate("CadastroProdutos")}>
            <Text style={styles.menuItem}>Cadastro de Estoque</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.menuItem}>Perecíveis</Text>
          </TouchableOpacity>

          <Text style={styles.menuGroupTitle}>Vendas</Text>

          <TouchableOpacity onPress={() => navigation.navigate("RegistrarVenda")}>
            <Text style={styles.menuItem}>Registro de Vendas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("RelatorioVendas")}>
            <Text style={styles.menuItem}>Relatórios</Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo principal */}
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>📋 Lista de Estoque</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#ff6600" style={{ marginTop: 50 }} />
          ) : estoque.length === 0 ? (
            <Text style={{ marginTop: 20, color: "gray" }}>Nenhum produto cadastrado ainda.</Text>
          ) : (
            <FlatList
              data={estoque}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              style={{ width: "100%" }}
            />
          )}
        </View>
      </View>
    </View>
  );
}
