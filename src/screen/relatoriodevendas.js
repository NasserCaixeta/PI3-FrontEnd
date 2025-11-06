import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import styles from "./relatoriodevendas.styles";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

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

export default function RelatorioVendas({ navigation }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. ESTADOS ATUALIZADOS ---
  const [allVendas, setAllVendas] = useState([]); // Guarda TODAS as vendas
  const [filteredVendas, setFilteredVendas] = useState([]); // Guarda as vendas filtradas
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroSelecionado, setFiltroSelecionado] = useState("Todos"); // Filtro padrão

  // Responsividade
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  // Busca vendas em tempo real (agora salva em 'allVendas')
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
        setAllVendas(vendasList); // Atualiza a lista principal
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  // --- 2. LÓGICA DE FILTRO (NOVO useEffect) ---
  // Este useEffect roda sempre que o filtro ou a lista principal de vendas mudar
  useEffect(() => {
    const now = new Date();
    // Clona a data 'now' para não modificar a original
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Define para o último domingo
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Converte o timestamp do Firebase em um objeto Date
    const getVendaDate = (venda) => {
      if (!venda.dataVenda || !venda.dataVenda.seconds) {
        return null;
      }
      return new Date(venda.dataVenda.seconds * 1000);
    }
    
    let vendasData = [];

    if (filtroSelecionado === "Hoje") {
      vendasData = allVendas.filter(v => {
        const vendaDate = getVendaDate(v);
        return vendaDate && vendaDate >= startOfToday;
      });
    } else if (filtroSelecionado === "Esta Semana") {
      vendasData = allVendas.filter(v => {
        const vendaDate = getVendaDate(v);
        return vendaDate && vendaDate >= startOfWeek;
      });
    } else if (filtroSelecionado === "Este Mês") {
      vendasData = allVendas.filter(v => {
        const vendaDate = getVendaDate(v);
        return vendaDate && vendaDate >= startOfMonth;
      });
    } else {
      // Filtro "Todos"
      vendasData = allVendas;
    }
    
    setFilteredVendas(vendasData); // Atualiza o estado das vendas filtradas

  }, [filtroSelecionado, allVendas]); // Dependências

  // --- 3. CÁLCULOS ATUALIZADOS ---
  // Resumo agora é baseado nas 'filteredVendas'
  const totalVendas = filteredVendas.length;
  const faturamentoTotal = filteredVendas.reduce(
    (acc, venda) => acc + venda.valorTotal,
    0
  );

  // --- 4. FUNÇÃO DE EXPORTAR ATUALIZADA ---
  // Exportar CSV agora usa as 'filteredVendas'
  const exportToCSV = async () => {
    if (filteredVendas.length === 0) {
      alert("Nenhuma venda para exportar.");
      return;
    }

    let csvContent = "Produto; Quantidade Vendida; Valor Total (R$); Data\n";

    filteredVendas.forEach((v) => { // <-- Usa filteredVendas
      const dataFormatada = v.dataVenda
        ? new Date(v.dataVenda.seconds * 1000).toLocaleDateString("pt-BR")
        : "Data indisponível";

      csvContent += `${v.produtoNome}; ${v.quantidadeVendida}; ${v.valorTotal.toFixed(
        2
      )}; ${dataFormatada}\r\n`;
    });

    // ... (O resto da lógica de exportação (web/mobile) continua a mesma)
    if (Platform.OS === "web") {
      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `relatorio_vendas_${filtroSelecionado}.csv`); // Nome do arquivo com filtro
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    // ... (lógica do FileSystem e Sharing)
  };

  // Filtro (funções do Modal)
  const abrirModal = () => setModalVisible(true);
  const fecharModal = () => setModalVisible(false);
  const selecionarFiltro = (tipo) => {
    setFiltroSelecionado(tipo); // Apenas atualiza o estado, o useEffect faz o resto
    fecharModal();
  };

  // Render item (agora usa a data formatada corretamente)
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
      <Header
        containerStyle={styles.topBar}
        textStyle={styles.topMenuText}
        hoverTextStyle={styles.topMenuHover}
        onPressInicio={() => navigation.navigate("Home")}
      />

      {/* Conteúdo */}
      <View
        style={[
          styles.contentWrapper,
          !isLargeScreen && styles.contentWrapperMobile,
        ]}
      >
        {/* Sidebar */}
        <Sidebar
          containerStyle={styles.sidebar}
          mobileStyle={styles.sidebarMobile}
          menuGroupTitleStyle={styles.menuGroupTitle}
          menuItemStyle={styles.menuItem}
          menuItemHoverStyle={styles.menuItemHover}
          isLargeScreen={isLargeScreen}
          navigation={navigation}
        />

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
                Filtrar ({filtroSelecionado})
              </Text>
            </TouchableOpacity>

            {/* BOTÃO DE EXPORTAR CSV (RESTABELECIDO) */}
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
              <Text style={styles.summaryLabel}>Total de Vendas (Filtradas)</Text>
              <Text style={styles.summaryValue}>{totalVendas}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Faturamento (Filtrado)</Text>
              <Text style={styles.summaryValue}>
                R$ {faturamentoTotal.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Lista de Vendas */}
          {loading ? (
            <ActivityIndicator size="large" color="#ff6600" />
          ) : filteredVendas.length === 0 ? (
            <Text style={{ marginTop: 20, color: "gray" }}>
              Nenhuma venda registrada para este período.
            </Text>
          ) : (
            <FlatList
              data={filteredVendas}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              style={{ width: "100%" }}
            />
          )}
        </View>
      </View>

      {/* Modal de Filtro (JÁ ESTAVA CORRETO) */}
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

            {["Hoje", "Esta Semana", "Este Mês", "Todos"].map((tipo) => (
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
                <Text style={{ color: "white", textAlign: "center", fontWeight: 'bold' }}>
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
  );}