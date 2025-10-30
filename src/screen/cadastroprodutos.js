import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { auth, db } from "../../firebaseConfig";
import styles from "./cadastroprodutos.styles";

export default function CadastroProdutos({ navigation }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  // estado para hover
  const [hoveredItem, setHoveredItem] = useState(null);

  // estados para formulário de estoque
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const [preco, setPreco] = useState("");

  const salvarEstoque = async () => {
  // 1. Validação básica
  if (!nome || !quantidade || !custo || !preco) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  
  // 2. Tenta salvar no Firestore
  try {
    const user = auth.currentUser; // Pega o usuário atualmente logado
    if (user) {
      // Cria um novo documento na coleção "produtos"
      const docRef = await addDoc(collection(db, "produtos"), {
        nome: nome,
        quantidade: parseInt(quantidade), // Converte para número inteiro
        custo: parseFloat(custo),       // Converte para número com decimal
        preco: parseFloat(preco),         // Converte para número com decimal
        userId: user.uid,                 // Associa o produto ao usuário logado
        dataCadastro: new Date()          // Adiciona a data do cadastro
      });
      
      console.log("Produto salvo com o ID: ", docRef.id);
      alert(`Produto "${nome}" salvo com sucesso!`);

      // Limpa os campos do formulário após o sucesso
      setNome("");
      setQuantidade("");
      setCusto("");
      setPreco("");
    } else {
      alert("Nenhum usuário logado. Faça o login para cadastrar produtos.");
    }
  } catch (error) {
    // 3. Mostra um erro se algo der errado
    console.error("Erro ao salvar o produto: ", error);
    alert("Ocorreu um erro ao salvar o produto. Tente novamente.");
  }
};

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

      </View>

          <View
      style={[
        styles.contentWrapper,
        !isLargeScreen && { flexDirection: "column" }, 
      ]}
    >

        {/* Sidebar */}
        <View style={[styles.sidebar, !isLargeScreen && styles.sidebarMobile]}>
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

        {/* Main Content */}
        <View style={[styles.mainContent, !isLargeScreen && styles.mainContentMobile]}>
          <Text style={styles.sectionTitle}>Cadastro de Estoque</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Tomate"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Quantidade em Estoque</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 100"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />

            <Text style={styles.label}>Custo de Aquisição (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2.50"
              keyboardType="numeric"
              value={custo}
              onChangeText={setCusto}
            />

            <Text style={styles.label}>Preço de Venda (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 4.50"
              keyboardType="numeric"
              value={preco}
              onChangeText={setPreco}
            />

            <TouchableOpacity style={styles.button} onPress={salvarEstoque}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

  );
}
