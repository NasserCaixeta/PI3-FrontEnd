import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Sidebar({
  containerStyle,
  mobileStyle,
  menuGroupTitleStyle,
  menuItemStyle,
  menuItemHoverStyle,
  isLargeScreen,
  navigation,
}) {
  const [hovered, setHovered] = useState(null);

  return (
    <View style={[containerStyle, !isLargeScreen && mobileStyle]}>
      <View>
        <Text style={menuGroupTitleStyle}>Estoque</Text>
        <TouchableOpacity
          onMouseEnter={() => setHovered("cadastro")}
          onMouseLeave={() => setHovered(null)}
          onPress={() => navigation.navigate("CadastroProdutos")}
        >
          <Text style={[menuItemStyle, hovered === "cadastro" && menuItemHoverStyle]}>
            Cadastro de Estoque
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onMouseEnter={() => setHovered("pereciveis")}
          onMouseLeave={() => setHovered(null)}
        >
          <Text style={[menuItemStyle, hovered === "pereciveis" && menuItemHoverStyle]}>
            Perecíveis
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={menuGroupTitleStyle}>Vendas</Text>
        <TouchableOpacity
          onMouseEnter={() => setHovered("vendas")}
          onMouseLeave={() => setHovered(null)}
          onPress={() => navigation.navigate("RegistrarVenda")}
        >
          <Text style={[menuItemStyle, hovered === "vendas" && menuItemHoverStyle]}>
            Registro de Vendas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onMouseEnter={() => setHovered("relatorios")}
          onMouseLeave={() => setHovered(null)}
          onPress={() => navigation.navigate("RelatorioVendas")}
        >
          <Text style={[menuItemStyle, hovered === "relatorios" && menuItemHoverStyle]}>
            Relatórios
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
