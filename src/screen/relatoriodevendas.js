import { useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import styles from "./relatoriodevendas.styles";

export default function RelatorioVendas({ navigation }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const [hoveredItem, setHoveredItem] = useState(null);

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

        {/* Conteúdo principal */}
        
      </View>
    </View>
  );
}
