import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  topMenuText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "#000",
    fontWeight: "bold",
  },
  contentWrapper: {
  flex: 1,
  flexDirection: "row",
},

// 🧩 Sidebar desktop
sidebar: {
  width: 220,
  backgroundColor: "#fff",
  borderRightWidth: 1,
  borderColor: "#ddd",
  paddingVertical: 15,
  paddingHorizontal: 10,
},

// 🧩 Sidebar mobile — agora empilhada logo abaixo do topbar
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

  menuGroupTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 15,
    textAlign: "center",
  },
  menuItem: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: "95%",
    alignSelf: "center",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  texto: {
    fontSize: 14,
    color: "#555",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 12,
  },
});
