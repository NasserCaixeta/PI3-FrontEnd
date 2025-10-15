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

  const [estoque, setEstoque] = useState([]); // Começa vazio
  const [loading, setLoading] = useState(true); // Começa carregando


useEffect(() => {
  const user = auth.currentUser;

  if (user) {
    const produtosCollection = collection(db, "produtos");

    const q = query(produtosCollection, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const produtosList = [];
      querySnapshot.forEach((doc) => {
        produtosList.push({ id: doc.id, ...doc.data() });
      });
      setEstoque(produtosList); 
      setLoading(false); 
    }, (error) => {
      console.error("Erro ao buscar produtos: ", error);
      setLoading(false); 
    });

    
    return () => unsubscribe();
  }
}, []); 



  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.nome}>{item.nome}</Text>
        {/* Botão Editar adicionado aqui */}
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
      {/* Logo no fundo */}
      <ImageBackground
        source={require("../../assets/images/logo_feira.png")}
        style={styles.backgroundImage}
        imageStyle={{
          resizeMode: "contain",
          alignSelf: "flex-start",
           marginLeft: 320,
          opacity: 0.08, 
        }}
      />

      {/* Topbar */}
      <View style={styles.topBar}>

        <TouchableOpacity
          onMouseEnter={() => setHoveredItem("inicio")}
          onMouseLeave={() => setHoveredItem(null)}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={[
              styles.topMenuText,
              hoveredItem === "inicio" && styles.topMenuHover,
            ]}
          >
            Início
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onMouseEnter={() => setHoveredItem("alertas")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Text
            style={[
              styles.topMenuText,
              hoveredItem === "alertas" && styles.topMenuHover,
            ]}
          >
            Alertas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrapper}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.menuGroup}>
            <Text style={styles.menuGroupTitle}>Estoque</Text>

            <TouchableOpacity
              onMouseEnter={() => setHoveredItem("cadastro")}
              onMouseLeave={() => setHoveredItem(null)}
              onPress={() => navigation.navigate("CadastroProdutos")}
            >
              <Text
                style={[
                  styles.menuItem,
                  hoveredItem === "cadastro" && styles.menuItemHover,
                ]}
              >
                Cadastro de Estoque
              </Text>
            </TouchableOpacity>
            <View>
  <View style={styles.menuGroup}>
    <TouchableOpacity
      onMouseEnter={() => setHoveredItem("pereciveis")}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <Text
        style={[
          styles.menuItem,
          hoveredItem === "pereciveis" && styles.menuItemHover,
        ]}
      >
        Perecíveis
      </Text>
    </TouchableOpacity>
  </View>

  <View style={styles.menuGroup}>
    <Text style={styles.menuGroupTitle}>Vendas</Text>

    <TouchableOpacity
      onMouseEnter={() => setHoveredItem("vendas")}
      onMouseLeave={() => setHoveredItem(null)}
      onPress={() => navigation.navigate("RegistrarVenda")}
    >
      <Text
        style={[
          styles.menuItem,
          hoveredItem === "vendas" && styles.menuItemHover,
        ]}
      >
        Registro de Vendas
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      onMouseEnter={() => setHoveredItem("relatorios")}
      onMouseLeave={() => setHoveredItem(null)}
      onPress={() => navigation.navigate("RelatorioVendas")}
    >
      <Text
        style={[
          styles.menuItem,
          hoveredItem === "relatorios" && styles.menuItemHover,
        ]}
      >
        Relatórios
      </Text>
    </TouchableOpacity>
  </View>
</View>

          </View>
        </View>

                {/* Conteúdo principal */}
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>📋 Lista de Estoque</Text>

          {loading ? (
            // Se estiver carregando, mostra o indicador
            <ActivityIndicator size="large" color="#ff6600" style={{ marginTop: 50 }} />
          ) : estoque.length === 0 ? (
            // Se não estiver carregando e a lista estiver vazia
            <Text style={{ marginTop: 20, color: 'gray' }}>
              Nenhum produto cadastrado ainda.
            </Text>
          ) : (
            // Se tiver produtos, mostra a lista
            <FlatList
              data={estoque}
              keyExtractor={(item) => item.id}
              renderItem={renderItem} // Sua função renderItem não precisa mudar
              style={{ width: "100%" }}
            />
          )}
        </View>
      </View>
    </View>
  );
}
