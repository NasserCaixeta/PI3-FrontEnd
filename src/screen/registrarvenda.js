import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  isLargeScreen
} from "react-native";
import styles from "./registrarvenda.style";

// 1. IMPORTAÇÕES NOVAS
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
  const [hoveredItem, setHoveredItem] = useState(null);
   
  
  
    // 2. NOVOS ESTADOS PARA GERENCIAR A LÓGICA
  const [produtos, setProdutos] = useState([]); // Armazena a lista de produtos do DB
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState(null); // Guarda o ID do produto escolhido
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(true); // Para feedback de carregamento

  // 3. BUSCA OS PRODUTOS DO FIREBASE QUANDO A TELA CARREGA
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, "produtos"), where("userId", "==", user.uid));
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

  // 4. A NOVA FUNÇÃO PARA REGISTRAR A VENDA DE FORMA SEGURA
  const handleRegistrarVenda = async () => {
    if (!produtoSelecionadoId || !quantidade) {
      Alert.alert("Erro", "Selecione um produto e informe a quantidade.");
      return;
    }

    const qtdVendida = parseInt(quantidade);
    const produtoCompleto = produtos.find(p => p.value === produtoSelecionadoId);

    if (qtdVendida <= 0) {
      Alert.alert("Erro", "A quantidade vendida deve ser maior que zero.");
      return;
    }
    if (qtdVendida > produtoCompleto.quantidade) {
      Alert.alert("Erro", `Estoque insuficiente. Você só tem ${produtoCompleto.quantidade} unidades de ${produtoCompleto.nome}.`);
      return;
    }

    try {
      // Usamos uma TRANSAÇÃO para garantir a consistência dos dados.
      // Se a atualização do estoque falhar, o registro da venda também falha (e vice-versa).
      await runTransaction(db, async (transaction) => {
        const produtoRef = doc(db, "produtos", produtoSelecionadoId);
        
        // Dentro da transação, primeiro lemos o dado mais atual do produto
        const produtoDoc = await transaction.get(produtoRef);
        if (!produtoDoc.exists()) {
          throw new Error("Produto não existe mais!");
        }

        const dadosProduto = produtoDoc.data();
        const novoEstoque = dadosProduto.quantidade - qtdVendida;

        // Atualizamos o estoque do produto
        transaction.update(produtoRef, { quantidade: novoEstoque });

        // Criamos um novo documento de venda
        const vendaRef = doc(collection(db, "vendas")); // Gera um novo ID de venda
        transaction.set(vendaRef, {
          userId: auth.currentUser.uid,
          produtoId: produtoSelecionadoId,
          produtoNome: dadosProduto.nome,
          quantidadeVendida: qtdVendida,
          valorUnitario: dadosProduto.preco,
          valorTotal: dadosProduto.preco * qtdVendida,
          dataVenda: serverTimestamp(), // Usa a data/hora do servidor
        });
      });

      alert("Sucesso! Venda registrada e estoque atualizado.");
      setProdutoSelecionadoId(null);
      setQuantidade("");

    } catch (e) {
      console.error("Erro na transação de venda: ", e);
      Alert.alert("Erro", "Não foi possível registrar a venda. Tente novamente.");
    }
  };


  // ... (o return vai ser modificado abaixo)
  // ... (a parte do TopBar e Sidebar pode continuar a mesma)
  
    if (loading) {
    return <ActivityIndicator size="large" color="#ff6600" style={{ flex: 1 }} />;
  }

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

      <View style={[styles.contentWrapper, !isLargeScreen && { flexDirection: "column" }]}>
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
        <View style={[styles.mainContent, !isLargeScreen && styles.mainContentMobile]}>
          <Text style={styles.sectionTitle}>Cadastro de Estoque</Text>

          <View style={styles.form}>
          <Text style={styles.label}>Selecione o Produto</Text>
          {/* 5. SUBSTITUÍMOS O TEXTINPUT PELO SELETOR */}
          <PickerSelect
            onValueChange={(value) => setProdutoSelecionadoId(value)}
            items={produtos}
            placeholder={{ label: "Clique para escolher um produto...", value: null }}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              inputWeb: styles.input,
            }}
          
          />

            <Text style={styles.label}>Quantidade vendida</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 100"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegistrarVenda}>
              <Text style={styles.buttonText}>Registrar Venda</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegistrarVenda;
