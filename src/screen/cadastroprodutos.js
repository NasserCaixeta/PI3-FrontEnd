import { useState } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import styles from "./cadastroprodutos.styles";

export default function CadastroProdutos() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  // estado para hover
  const [hoveredItem, setHoveredItem] = useState(null);

  // estados para formulário de estoque
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const [preco, setPreco] = useState("");

  const salvarEstoque = () => {
    console.log("Produto salvo:", { nome, quantidade, custo, preco });
    alert(`Produto "${nome}" salvo com sucesso!`);

    // limpa os campos
    setNome("");
    setQuantidade("");
    setCusto("");
    setPreco("");
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
        <View style={styles.mainContent}>
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
