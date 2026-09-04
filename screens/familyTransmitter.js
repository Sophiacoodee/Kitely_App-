import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const BENEFICIARIES_DATA = [
  {
    id: '1',
    name: 'Lucia Pocasangre',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  },
  {
    id: '2',
    name: 'Alan Martinez',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
  },
  {
    id: '3',
    name: 'Mariana Munguia',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
  },
  {
    id: '4',
    name: 'Moises Rivas',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
  },
];

export default function BeneficiariesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBeneficiaries = BENEFICIARIES_DATA.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>My family</Text>
            <Text style={styles.headerSubtitle}>Your beneficiaries</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a Beneficiary"
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search-outline" size={20} color="#021024" />
      </View>

      {/* Lista de Beneficiarios */}
      <FlatList
        data={filteredBeneficiaries}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.nameText}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#021024" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#55A605',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 50,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#021024',
    marginRight: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  nameText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#021024',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#021024',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const listaInicial = [
  {
    id: "1",
    name: "Lucía Pocsangre",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
  },
  {
    id: "2",
    name: "Alan Martínez",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  },
  {
    id: "3",
    name: "Mariana Munguía",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
  },
  {
    id: "4",
    name: "Moises Rivas",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  },
];

export default function Beneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState(listaInicial);

  const eliminar = (id) => {
    Alert.alert("Eliminar", "¿Eliminar beneficiario?", [
      { text: "Cancelar" },
      {
        text: "Sí",
        onPress: () =>
          setBeneficiarios((lista) =>
            lista.filter((item) => item.id !== id)
          ),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Familia</Text>

      {beneficiarios.map((item) => (
        <View style={styles.card} key={item.id}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />

          <Text style={styles.name}>{item.name}</Text>

          <TouchableOpacity onPress={() => eliminar(item.id)}>
            <Ionicons name="trash" size={25} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#061A3A",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#102E63",
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  name: {
    color: "white",
    fontSize: 18,
    flex: 1,
    marginLeft: 15,
  },
});

