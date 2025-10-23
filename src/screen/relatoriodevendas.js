import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Modal,
  Platform,
} from "react-native";
import styles from "./relatoriodevendas.styles";

// Firebase
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

// Expo libs
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

export default function RelatorioVendas({ navigation }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal de filtro
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroSelecionado, setFiltroSelecionado] = useState(null);

  // Responsividade
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  // Busca vendas em tempo real
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, "vendas"),
        where("userId", "==", user.uid),
        orderBy("dataVenda", "desc")
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

  // Resumo
  const totalVendas = vendas.length;
  const faturamentoTotal = vendas.reduce(
    (acc, venda) => acc + venda.valorTotal,
    0
  );

  // Exportar CSV
  const exportToCSV = async () => {
    if (vendas.length === 0) {
      alert("Nenhuma venda para exportar.");
      return;
    }

    let csvContent = "Produto; Quantidade Vendida; Valor Total (R$); Data\n";

    vendas.forEach((v) => {
      const dataFormatada = v.dataVenda
        ? new Date(v.dataVenda.seconds * 1000).toLocaleDateString("pt-BR")
        : "Data indisponível";

      csvContent += `${v.produtoNome}; ${v.quantidadeVendida}; ${v.valorTotal.toFixed(
        2
      )}; ${dataFormatada}\r\n`;
    });

    if (Platform.OS === "web") {
      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio_vendas.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    try {
      const fileUri = FileSystem.documentDirectory + "relatorio_vendas.csv";
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: "utf8",
      });
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      alert("Erro ao exportar CSV. Verifique as permissões.");
    }
  };

  // Filtro
  const abrirModal = () => setModalVisible(true);
  const fecharModal = () => setModalVisible(false);
  const selecionarFiltro = (tipo) => {
    setFiltroSelecionado(tipo);
    fecharModal();
    alert(`Filtro selecionado: ${tipo}`);
  };

  // Render item
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
      {/* Logo */}
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

      {/* Conteúdo */}
      <View
        style={[
          styles.contentWrapper,
          !isLargeScreen && styles.contentWrapperMobile,
        ]}
      >
        {/* Sidebar */}
        <View
          style={[
            styles.sidebar,
            !isLargeScreen && styles.sidebarMobile,
            !isLargeScreen && { position: "relative", width: "100%" },
          ]}
        >
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

        {/* Main Content */}
        <View
          style={[
            styles.mainContent,
            !isLargeScreen && { marginLeft: 0, width: "100%" },
          ]}
        >
          {/* Botões */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "flex-start",
              marginBottom: 15,
            }}
          >
            <TouchableOpacity
              onPress={abrirModal}
              style={{
                backgroundColor: "#ff6600",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Filtrar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={exportToCSV}
              style={{
                backgroundColor: "#ff6600",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Exportar CSV
              </Text>
            </TouchableOpacity>
          </View>

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

      {/* Modal de Filtro */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 280,
              borderRadius: 12,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
              Filtrar por:
            </Text>

            {["Dia", "Mês", "Ano"].map((tipo) => (
              <TouchableOpacity
                key={tipo}
                style={{
                  backgroundColor: "#ff6600",
                  width: "100%",
                  paddingVertical: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                }}
                onPress={() => selecionarFiltro(tipo)}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  {tipo}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={fecharModal} style={{ marginTop: 10 }}>
              <Text style={{ color: "#555" }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
