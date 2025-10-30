import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // --- Estilos de Layout ---
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  // --- ESTILOS DA TOPBAR ATUALIZADOS ---
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  logoText: { // Adicionado
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6600",
  },
  topMenuText: {
    fontSize: 16,
    marginHorizontal: 15,
    color: "#000",
    transition: "color 0.3s",
    fontWeight: "bold",
  },
  topMenuHover: {
    color: "#ff6600",
  },
  // --- FIM DOS ESTILOS DA TOPBAR ---

  contentWrapper: {
    flex: 1,
    flexDirection: "row",
  },
sidebar: {
  width: 220,
  backgroundColor: "#fff",
  borderRightWidth: 1,
  borderColor: "#ddd",
  paddingVertical: 15,
  paddingHorizontal: 10,
},

sidebarMobile: {
  width: "100%",
  flexDirection: "column", // OBS: empilha os botões verticalmente
  alignItems: "center",
  borderRightWidth: 0,
  borderBottomWidth: 1,
  borderColor: "#ddd",
  paddingVertical: 10,
  backgroundColor: "#fff", // mantém o contraste
  elevation: 3, // dá uma leve sombra
},

  menuGroup: {
    marginBottom: 20,
  },
  menuGroupTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 15,
    textAlign: "center",
  },
  menuItem: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
    color: "#000",
  },
  menuItemHover: {
    color: "#ff6600",
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Mantido 'center' para o formulário
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },

  // --- Estilos Específicos do Formulário (Mantidos) ---
  form: {
    width: "70%",
    minWidth: 300, 
    maxWidth: 500, 
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignSelf: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
    color: "#444",
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fafafa",
    fontSize: 14,
    width: "100%", 
  },
  button: {
    marginTop: 25,
    backgroundColor: "#ff6600",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 6,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});