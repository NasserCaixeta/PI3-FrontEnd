import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
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
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; 
import { auth, db } from "../../firebaseConfig";
import styles from "./relatoriodevendas.styles"; 

const RelatorioVendas = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const [hoveredItem, setHoveredItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vendas, setVendas] = useState([]);

  // ... (Estados do modal) ...
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());

  const user = auth.currentUser;

  // ... (useEffect de busca de vendas) ...
  useEffect(() => {
    if (user) {
      const vendasCollection = collection(db, "vendas");
      const q = query(
        vendasCollection,
        where("userId", "==", user.uid),
        orderBy("dataVenda", "desc") 
      );
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const listaVendas = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data().dataVenda.toDate();
            const dataFormatada = data.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            listaVendas.push({
              id: doc.id,
              ...doc.data(),
              dataFormatada: dataFormatada,
            });
          });
          setVendas(listaVendas);
          setLoading(false);
        },
        (error) => {
          console.error("Erro ao buscar vendas: ", error);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);
       // ... (função handleExportarCSV) ...
       const handleExportarCSV = () => {
         if (Platform.OS !== "web") {
           Alert.alert(
             "Indisponível",
             "A exportação para CSV está disponível apenas na versão web."
           );
           return;
         }
         if (estoque.length === 0) {
           Alert.alert("Exportar", "Não há dados de estoque para exportar.");
           return;
         }
         const header = "Nome,Custo,Preco,Estoque\n";
         const rows = estoque
           .map(
             (item) =>
               `"${item.nome}",${item.custo.toFixed(2)},${item.preco.toFixed(
                 2
               )},${item.quantidade}`
           )
           .join("\n");
         const csvContent = header + rows;
         const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
         const link = document.createElement("a");
         const url = URL.createObjectURL(blob);
         link.setAttribute("href", url);
         link.setAttribute("download", "meu_estoque.csv");
         link.style.visibility = "hidden";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
       };
     
  // ... (funções do modal) ...
  const abrirModal = () => setModalVisible(true);
  const fecharModal = () => setModalVisible(false);
  const selecionarFiltro = (tipo) => {
    setTipoFiltro(tipo);
    setModalVisible(false);
    setTempDate(new Date(selectedDate));
    setTimeout(() => setDatePickerVisibility(true), 300);
  };
  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
    // ... (lógica de alerta do filtro) ...
  };
  
  // ... (função renderItemVenda) ...
  const renderItemVenda = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.nome}>{item.produtoNome}</Text>
        <Text style={styles.textoData}>{item.dataFormatada}</Text>
      </View>
      <Text style={styles.texto}>
        📦 Qtd: {item.quantidadeVendida} (R$ {item.valorUnitario.toFixed(2)} cd)
      </Text>
      <Text style={styles.textoTotal}>
        💰 Total: R$ {item.valorTotal.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/logo_feira.png")}
        style={styles.backgroundImage}
        imageStyle={{
          resizeMode: "contain",
          alignSelf: "center",
          opacity: 0.08,
        }}
      />

      {/* --- TOPBAR ATUALIZADA --- */}
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
      {/* --- FIM DA TOPBAR --- */}

      {/* contentWrapper */}
      <View
        style={[styles.contentWrapper, !isLargeScreen && { flexDirection: "column" }]}
      >
        {/* Sidebar */}
        <View style={[styles.sidebar, !isLargeScreen && styles.sidebarMobile]}>
          <Text style={styles.menuGroupTitle}>Estoque</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CadastroProdutos")}
          >
            <Text style={styles.menuItem}>Cadastro de Estoque</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuItem}>Perecíveis</Text>
          </TouchableOpacity>

          <Text style={styles.menuGroupTitle}>Vendas</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegistrarVenda")}
          >
            <Text style={styles.menuItem}>Registro de Vendas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("RelatorioVendas")}
          >
            <Text style={styles.menuItem}>Relatórios</Text>
          </TouchableOpacity>
        </View>

        {/* mainContent */}
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>📊 Relatório de Vendas</Text>

          <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
            <TouchableOpacity
              onPress={abrirModal}
              style={styles.filterButton} 
            >
              <Text style={styles.filterButtonText}>Filtrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleExportarCSV}
              style={styles.exportButton} 
            >
            <Text style={styles.exportButtonText}>Exportar (CSV)</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#ff6600" style={{ marginTop: 50 }} />
          ) : vendas.length === 0 ? (
            <Text style={{ marginTop: 20, color: "gray" }}>
              Nenhuma venda registrada ainda.
            </Text>
          ) : (
            <FlatList
              data={vendas}
              keyExtractor={(item) => item.id}
              renderItem={renderItemVenda}
              style={{ width: "100%" }}
            />
          )}
        </View>
      </View>

      {/* ... (Modal e DatePicker) ... */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
         <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtrar por:</Text>
            {["Dia", "Mês", "Ano"].map((tipo) => (
              <TouchableOpacity
                key={tipo}
                style={styles.modalOption}
                onPress={() => selecionarFiltro(tipo)}
              >
                <Text style={styles.modalOptionText}>{tipo}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={fecharModal} style={styles.modalCancel}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={isDatePickerVisible && Platform.OS !== "web"}
        mode="date"
        date={selectedDate}
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
        // ... (props do DatePicker) ...
      />
      
      {/* Fallback Web */}
      {Platform.OS === "web" && isDatePickerVisible && (
        <View style={/* ... (estilos do fallback) ... */ {position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -150 }, { translateY: -150 }], backgroundColor: "#fff", padding: 20, borderRadius: 12, elevation: 6, zIndex: 9999, width: 300}}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
            Selecione uma data:
          </Text>
          {/* ... (inputs web) ... */}
          <TouchableOpacity
            onPress={() => handleConfirmDate(tempDate)}
            style={{ backgroundColor: "#ff6600", paddingVertical: 8, borderRadius: 8, marginTop: 10 }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(false)}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: "#555", textAlign: "center" }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RelatorioVendas;