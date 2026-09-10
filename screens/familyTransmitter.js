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
  Modal,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_BENEFICIARIES = [
  {
    id: '1',
    name: 'Lucia Pocasangre',
    avatar: 'https://tse3.mm.bing.net/th/id/OIP._qjHrR7e96-I0mshLsmOvgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '2',
    name: 'Alan Martinez',
    avatar: 'https://www.shutterstock.com/image-photo/young-latin-man-making-selfie-600nw-1385281145.jpg',
  },
  {
    id: '3',
    name: 'Mariana Munguia',
    avatar: 'https://m.media-amazon.com/images/M/MV5BMjEzMzEwNTk1OV5BMl5BanBnXkFtZTgwNTU1MzI3MjE@._V1_QL75_UX216_.jpg',
  },
  {
    id: '4',
    name: 'Moises Rivas',
    avatar: 'https://media.istockphoto.com/id/1183945946/pt/foto/headshot-portrait-of-happy-mid-adult-hispanic-businessman.jpg?s=612x612&w=0&k=20&c=-nsGHWZgtQI6FVFrHMQ7NOgMCqYglUBbF-nHIZcRe2o=',
  },
];

export default function BeneficiariesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [beneficiaries, setBeneficiaries] = useState(INITIAL_BENEFICIARIES);

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('');

  const filteredBeneficiaries = beneficiaries.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Beneficiary',
      'Are you sure you want to delete this beneficiary?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setBeneficiaries((list) =>
              list.filter((item) => item.id !== id)
            );
          },
        },
      ]
    );
  };

  const handleAddBeneficiary = () => {
    if (!newName.trim()) {
      Alert.alert('Error', 'Please enter a name for the beneficiary.');
      return;
    }

    const newBeneficiary = {
      id: Date.now().toString(),
      name: newName.trim(),
      avatar: newAvatar.trim() || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    };

    setBeneficiaries([newBeneficiary, ...beneficiaries]);
    setNewName('');
    setNewAvatar('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#021B42" />
      <View style={styles.mainContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>My family</Text>
            <Text style={styles.headerSubtitle}>Your beneficiaries</Text>
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search a beneficiary"
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No beneficiaries found</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.nameText}>{item.name}</Text>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Ionicons name="trash-outline" size={22} color="#021024" />
              </TouchableOpacity>

              <Ionicons name="chevron-forward" size={20} color="#021024" />
            </View>
          )}
        />
      </View>

      {/* Modal para agregar beneficiario */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Beneficiary</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Full Name"
              placeholderTextColor="#94A3B8"
              value={newName}
              onChangeText={setNewName}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Photo URL (Optional)"
              placeholderTextColor="#94A3B8"
              value={newAvatar}
              onChangeText={setNewAvatar}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddBeneficiary}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
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
    paddingBottom: 40,
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
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#021024',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 14,
    color: '#021024',
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#1E293B',
  },
  saveButton: {
    backgroundColor: '#55A605',
  },
  cancelButtonText: {
    color: '#94A3B8',
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});