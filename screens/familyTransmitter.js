import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BENEFICIARIES_DATA = [
  {
    id: '1',
    name: 'Lucia Pocasangre',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  },
  {
    id: '2',
    name: 'Alan Martinez',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
  },
  {
    id: '3',
    name: 'Mariana Munguia',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
  },
  {
    id: '4',
    name: 'Moises Rivas',
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
  },
];

export default function BeneficiariesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [beneficiaries, setBeneficiaries] =
    useState(BENEFICIARIES_DATA);

  const filteredBeneficiaries = beneficiaries.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleted = (id) => {
    Alert.alert(
      'deleted',
      '¿deleted beneficiaries?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          style: 'destructive',
          onPress: () => {
            setBeneficiaries((lista) =>
              lista.filter((item) => item.id !== id)
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>
              My family
            </Text>

            <Text style={styles.headerSubtitle}>
              Your beneficiaries
            </Text>
          </View>

        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            Alert.alert(
              'Add',
              'Función para agregar beneficiarios'
            );
          }}
        >
          <Ionicons
            name="add"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.addButtonText}>
            Add
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.searchContainer}>

        <TextInput
          style={styles.searchInput}
          placeholder="Search a Beneficiary"
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Ionicons
          name="search-outline"
          size={20}
          color="#021024"
        />

      </View>

      <FlatList
        data={filteredBeneficiaries}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No beneficiaries found
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
            />

            <Text style={styles.nameText}>
              {item.name}
            </Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminar(item.id)}
            >
              <Ionicons
                name="trash-outline"
                size={23}
                color="#FF3B30"
              />
            </TouchableOpacity>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#021024"
            />

          </View>
        )}
      />

      <View style={styles.bottomNav}>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons
            name="home-outline"
            size={24}
            color="#FFFFFF"
          />

          <Text style={styles.navText}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons
            name="people-outline"
            size={24}
            color="#55A605"
          />

          <Text style={styles.navText}>
            Family
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#FFFFFF"
          />

          <Text style={styles.navText}>
            Profile
          </Text>
        </TouchableOpacity>

      </View>

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
    paddingBottom: 90,
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

  deleteButton: {
    padding: 8,
    marginRight: 4,
  },

  emptyText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
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

  navText: {
    color: '#FFFFFF',
    fontSize: 11,
    marginTop: 2,
  },

});