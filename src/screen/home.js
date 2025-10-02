import { useState } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styles from "./home.styles";

export default function Home({ navigation }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const [hoveredItem, setHoveredItem] = useState(null);

  const [estoque] = useState([
    { id: "1", nome: "Tomate", custo: 2.5, preco: 4.5, quantidade: 100 },
    { id: "2", nome: "Batata", custo: 1.8, preco: 3.5, quantidade: 200 },
    { id: "3", nome: "Maçã", custo: 3.0, preco: 5.0, quantidade: 150 },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
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

          </View>
        </View>

        {/* Conteúdo principal */}
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>📋 Lista de Estoque</Text>

          <FlatList
            data={estoque}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={{ width: "100%" }}
          />
        </View>
      </View>
    </View>
  );
}
