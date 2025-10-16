import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./relatoriodevendas.styles";

// --- 1. NOVOS IMPORTS ---
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export default function RelatorioVendas({ navigation }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  // --- 2. NOVOS ESTADOS ---
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 3. BUSCA AS VENDAS EM TEMPO REAL ---
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, "vendas"),
        where("userId", "==", user.uid),
        orderBy("dataVenda", "desc") // Ordena pela data, da mais nova para a mais antiga
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const vendasList = [];
        querySnapshot.forEach((doc) => {
          vendasList.push({ id: doc.id, ...doc.data() });
        });
        setVendas(vendasList);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  // --- 4. CÁLCULOS PARA O RESUMO ---
  const totalVendas = vendas.length;
  const faturamentoTotal = vendas.reduce(
    (acc, venda) => acc + venda.valorTotal,
    0
  );

  // --- 5. FUNÇÃO PARA RENDERIZAR CADA VENDA NA LISTA ---
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.produtoNome}</Text>
      <Text style={styles.texto}>
        Quantidade Vendida: {item.quantidadeVendida}
      </Text>
      <Text style={styles.texto}>
        Valor Total: R$ {item.valorTotal.toFixed(2)}
      </Text>
      <Text style={styles.texto}>
        Data:{" "}
        {item.dataVenda
          ? new Date(item.dataVenda.seconds * 1000).toLocaleString("pt-BR")
          : "Data indisponível"}
      </Text>
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
          opacity: 0.08, // bem suave no fundo
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

        <View style={styles.mainContent}>
        <Text style={styles.sectionTitle}>📈 Relatório de Vendas</Text>

        {/* Resumo */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Total de Vendas</Text>
            <Text style={styles.summaryValue}>{totalVendas}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Faturamento Total</Text>
            <Text style={styles.summaryValue}>
              R$ {faturamentoTotal.toFixed(2)}
            </Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#ff6600" />
        ) : vendas.length === 0 ? (
          <Text style={{ marginTop: 20, color: "gray" }}>
            Nenhuma venda registrada ainda.
          </Text>
        ) : (
          <FlatList
            data={vendas}
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
