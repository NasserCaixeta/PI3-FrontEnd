// src/screen/editProduct.js

import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function EditProductScreen({ route, navigation }) {
  const { productId } = route.params; // Pega o ID do produto passado pela navegação

  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const [preco, setPreco] = useState("");

  const productRef = doc(db, "produtos", productId); // Cria a referência para o documento

  // Busca os dados do produto quando a tela carrega
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setNome(productData.nome);
          setQuantidade(productData.quantidade.toString());
          setCusto(productData.custo.toString());
          setPreco(productData.preco.toString());
        } else {
          Alert.alert("Erro", "Produto não encontrado.");
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível buscar os dados do produto.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Função para ATUALIZAR o produto
  const handleUpdate = async () => {
    if (!nome || !quantidade || !custo || !preco) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    try {
      await updateDoc(productRef, {
        nome: nome,
        quantidade: parseInt(quantidade),
        custo: parseFloat(custo),
        preco: parseFloat(preco),
      });
      Alert.alert("Sucesso", "Produto atualizado!");
      navigation.goBack(); // Volta para a Home
    } catch (error) {
      console.error("Erro ao atualizar: ", error);
      Alert.alert("Erro", "Não foi possível atualizar o produto.");
    }
  };

  // Função para EXCLUIR o produto
  const handleDelete = () => {
  // Usamos o 'window.confirm' nativo do navegador.
  // Ele mostra uma caixa de diálogo com "OK" e "Cancelar" e retorna true/false.
  const userConfirmed = window.confirm(
    `Você tem certeza que deseja excluir o produto "${nome}"? Esta ação não pode ser desfeita.`
  );

  // Se o usuário clicou em "OK", userConfirmed será 'true'
  if (userConfirmed) {
    const deleteProduct = async () => {
      try {
        await deleteDoc(productRef);
        // O Alert simples (só com OK) geralmente funciona bem.
        Alert.alert("Sucesso", "Produto excluído!");
        navigation.goBack(); // Volta para a Home
      } catch (error) {
        console.error("Erro ao excluir: ", error);
        Alert.alert("Erro", "Não foi possível excluir o produto.");
      }
    };

    deleteProduct(); // Executa a exclusão
  }
  // Se o usuário clicou em "Cancelar", nada acontece.
};

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Editar Produto</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Quantidade em Estoque</Text>
        <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />

        <Text style={styles.label}>Custo de Aquisição (R$)</Text>
        <TextInput style={styles.input} value={custo} onChangeText={setCusto} keyboardType="numeric" />

        <Text style={styles.label}>Preço de Venda (R$)</Text>
        <TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="numeric" />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Excluir Produto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Reutilizando e adaptando estilos do cadastroprodutos.styles.js
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#e5e5e5', alignItems: 'center', paddingTop: 20 },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    form: { width: '90%', maxWidth: 500, backgroundColor: '#fff', padding: 20, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6, color: '#444' },
    input: { height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 10, backgroundColor: '#fafafa' },
    button: { marginTop: 20, backgroundColor: '#ff6600', paddingVertical: 12, borderRadius: 6, alignItems: 'center' },
    deleteButton: { backgroundColor: '#d9534f' }, // Cor vermelha para o botão de excluir
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});