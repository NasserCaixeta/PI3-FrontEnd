import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },

  // 🧭 Barra superior
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
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },

  topMenuText: {
    fontSize: 16,
    marginHorizontal: 15,
    color: "#000",
    fontWeight: "bold",
  },
  topMenuHover: {
    color: "#ff6600",
  },

  // 🧱 Estrutura geral
  contentWrapper: {
    flex: 1,
    flexDirection: "row",
  },

  // 🧩 Sidebar padrão (desktop/tablet)
  sidebar: {
    width: 220,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  // 📱 Sidebar adaptada para mobile
  sidebarMobile: {
    width: "100%",
    flexDirection: "column", // OBS: empilha itens verticalmente
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    elevation: 3, // OBS: leve sombra no mobile
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
    color: "#000",
    textAlign: "center", // OBS: centraliza no mobile
  },
  menuItemHover: {
    color: "#ff6600",
  },

  // 📋 Conteúdo principal
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  mainContentMobile: {
    // OBS: aplica no mobile (sem marginLeft fixa)
    marginLeft: 0,
    paddingTop: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },

  // 🧾 Formulário
  form: {
    width: "90%", // OBS: mais fluido no mobile
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: "#444",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ff6600",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
