import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    padding: 20,
  },
  // Layout responsivo
  columnContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  // Card
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 20,
  },
  cardLarge: {
    marginRight: 40, // espaço entre card e logo
  },

  // Logo
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 0,
  },
  logoLarge: {
    width: 250,
    height: 250,
    marginTop: 0,       // sem espaço extra
    marginLeft: 20,  // espaço entre card e logo
  },

  // Textos
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  highlight: {
    color: "#ff6600",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },

  // Inputs
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: "#fafafa",
    fontSize: 14,
  },

  // Botão
  button: {
    width: "100%",
    backgroundColor: "#ff6600",
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },

  // Registro
  registerText: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  link: {
    color: "#ff6600",
    fontWeight: "bold",
  },
});
