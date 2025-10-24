import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions, // 1. IMPORTAR O HOOK
} from "react-native";
import styles from "./registrarvenda.style";

// IMPORTAÇÕES DO FIREBASE
import {
  collection,
  doc,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";
import PickerSelect from "react-native-picker-select"; // O componente do seletor
import { auth, db } from "../../firebaseConfig";

const RegistrarVenda = ({ navigation }) => {
  // 2. CALCULAR O TAMANHO DA TELA (igual ao home.js)
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const [hoveredItem, setHoveredItem] = useState(null);

  // Estados para gerenciar a lógica
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState(null);
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(true);

  // Busca os produtos do Firebase
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, "produtos"),
        where("userId", "==", user.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const produtosDoUsuario = [];
        querySnapshot.forEach((doc) => {
          produtosDoUsuario.push({
            label: `${doc.data().nome} (Estoque: ${doc.data().quantidade})`,
            value: doc.id,
            ...doc.data(),
          });
        });
        setProdutos(produtosDoUsuario);
        setLoading(false);
      });
      return () => unsubscribe(); // Limpa o listener ao sair da tela
    }
  }, []);

  // Função para registrar a venda
  const handleRegistrarVenda = async () => {
    if (!produtoSelecionadoId || !quantidade) {
      Alert.alert("Erro", "Selecione um produto e informe a quantidade.");
      return;
    }

    const qtdVendida = parseInt(quantidade);
    const produtoCompleto = produtos.find(
      (p) => p.value === produtoSelecionadoId
    );

    if (qtdVendida <= 0) {
      Alert.alert("Erro", "A quantidade vendida deve ser maior que zero.");
      return;
    }
    if (qtdVendida > produtoCompleto.quantidade) {
      Alert.alert(
        "Erro",
        `Estoque insuficiente. Você só tem ${produtoCompleto.quantidade} unidades de ${produtoCompleto.nome}.`
      );
      return;
    }

    try {
      await runTransaction(db, async (transaction) => {
        const produtoRef = doc(db, "produtos", produtoSelecionadoId);

        const produtoDoc = await transaction.get(produtoRef);
        if (!produtoDoc.exists()) {
          throw new Error("Produto não existe mais!");
        }

        const dadosProduto = produtoDoc.data();
        const novoEstoque = dadosProduto.quantidade - qtdVendida;

        transaction.update(produtoRef, { quantidade: novoEstoque });

        const vendaRef = doc(collection(db, "vendas"));
        transaction.set(vendaRef, {
          userId: auth.currentUser.uid,
          produtoId: produtoSelecionadoId,
          produtoNome: dadosProduto.nome,
          quantidadeVendida: qtdVendida,
          valorUnitario: dadosProduto.preco,
          valorTotal: dadosProduto.preco * qtdVendida,
          dataVenda: serverTimestamp(),
        });
      });

      alert("Sucesso! Venda registrada e estoque atualizado.");
      setProdutoSelecionadoId(null);
      setQuantidade("");
    } catch (e) {
      console.error("Erro na transação de venda: ", e);
      Alert.alert(
        "Erro",
        "Não foi possível registrar a venda. Tente novamente."
      );
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#ff6600" style={{ flex: 1 }} />
    );
  }

  return (
    <View style={styles.container}>
      {/* Logo no fundo (igual ao home.js) */}
      <ImageBackground
        source={require("../../assets/images/logo_feira.png")}
        style={styles.backgroundImage}
        imageStyle={{
          resizeMode: "contain",
          alignSelf: "center", // Ajustado
          opacity: 0.08,
        }}
      />

      {/* Topbar (igual ao home.js) */}
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

      {/* contentWrapper (igual ao home.js) */}
      <View
        style={[styles.contentWrapper, !isLargeScreen && { flexDirection: "column" }]}
      >
        {/* Sidebar (igual ao home.js) */}
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

        {/* mainContent (agora usa o estilo base correto) */}
        <View style={styles.mainContent}>
          {/* 3. TÍTULO CORRIGIDO */}
          <Text style={styles.sectionTitle}> Registrar Venda</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Selecione o Produto</Text>
            <PickerSelect
              onValueChange={(value) => setProdutoSelecionadoId(value)}
              items={produtos}
              placeholder={{
                label: "Clique para escolher um produto...",
                value: null,
              }}
              style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
                inputWeb: styles.input,
              }}
              value={produtoSelecionadoId}
            />

            <Text style={styles.label}>Quantidade vendida</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 10" // Placeholder ajustado
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegistrarVenda}
            >
              {/* 4. TEXTO DO BOTÃO CORRIGIDO */}
              <Text style={styles.buttonText}>Registrar Venda</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegistrarVenda;