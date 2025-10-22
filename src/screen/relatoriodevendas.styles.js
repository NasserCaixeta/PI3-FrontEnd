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
    position: "absolute",
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
  menuGroup: {
    marginBottom: 20,
  },
  menuGroupTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 14,
  },
  mainContentMobile: {
    marginLeft: 0,
    paddingTop: 10,
  },

  contentWrapperMobile: {
  flexDirection: "column", 
    alignItems: "center",
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
    width: "60%",
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

  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6600',
  },
});

