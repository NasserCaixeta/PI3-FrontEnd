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
  
  // --- ESTILOS DA TOPBAR ATUALIZADOS ---
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Adicionado
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
    marginHorizontal: 15, // Ajustado (era 10 em cadastro)
    color: "#000",
    transition: "color 0.3s",
    fontWeight: "bold",
    // marginLeft: 190, // Removido
  },
  topMenuHover: { // Mantido
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
    flexDirection: "column", 
    alignItems: "center",
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    backgroundColor: "#fff", 
    elevation: 3, 
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
    justifyContent: "center", // Mantido como 'center' para home
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  
  // ... (Estilos de Card, Botões, Modal) ...
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
  filterButton: {
    backgroundColor: "#ff6600",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  exportButton: {
    backgroundColor: "#ff6600", 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  exportButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: 280,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalOption: {
    backgroundColor: "#ff6600",
    width: "100%",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalOptionText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalCancel: {
    marginTop: 10,
  },
  modalCancelText: {
    color: "#555",
    fontWeight: "bold",
  },
});