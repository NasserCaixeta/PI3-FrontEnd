import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
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
    transition: "color 0.3s",
    fontWeight: "bold",
    marginLeft: 190,
  },
  topMenuHover: {
    color: "#ff6600",
  },
  contentWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 200,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
  menuGroup: {
    marginBottom: 20,
  },
  menuGroupTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 14,
  },
  menuItem: {
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 10,
    color: "#000",
    transition: "color 0.3s",
  },
  menuItemHover: {
    color: "#ff6600",
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 200,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  form: {
  width: "30%", 
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
},

button: {
  marginTop: 25,
  backgroundColor: "#ff6600",
  paddingVertical: 10,
  paddingHorizontal: 35, // 🔹 define largura proporcional ao texto
  borderRadius: 6,
  alignSelf: "center", // centraliza o botão
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
    width: "100%",
    marginLeft: 10,
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

});
