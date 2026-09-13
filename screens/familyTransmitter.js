import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const INITIAL_BENEFICIARIES = [
  {
    id: '1',
    name: 'Lucia Pocasangre',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
  },
  {
    id: '2',
    name: 'Alan Martinez',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: '3',
    name: 'Mariana Munguia',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: '4',
    name: 'Moises Rivas',
    avatar:
      'https://healthyceleb.com/wp-content/uploads/2020/04/Fernanfloo-in-a-selfie-in-October-2018.jpg',
  },
];

export default function BeneficiariesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [beneficiaries, setBeneficiaries] = useState(
    INITIAL_BENEFICIARIES
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('');

  useEffect(() => {
    loadBeneficiaries();
  }, []);

  const loadBeneficiaries = async () => {
    try {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        console.log('No user is logged in');
        return;
      }

      const ref = doc(db, 'Users', uid);
      const snap = await getDoc(ref);

      if (snap.exists() && snap.data().beneficiaries) {
        setBeneficiaries(snap.data().beneficiariies);
      } else {
        setBeneficiaries(INITIAL_BENEFICIARIES);
      }
    } catch (error) {
      console.log('Error loading beneficiaries:', error);
    }
  };

  const saveBeneficiaries = async (list) => {
    try {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        Alert.alert('Error', 'No user is logged in');
        return;
      }

      await setDoc(
        doc(db, 'Users', uid),
        {
          beneficiaries: list,
        },
        {
          merge: true,
        }
      );

      setBeneficiaries(list);
    } catch (error) {
      console.log('Error saving beneficiaries:', error);
      Alert.alert('Error', 'The changes could not be saved');
    }
  };

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
          onPress: async () => {
            const updatedList = beneficiaries.filter(
              (item) => item.id !== id
            );

            await saveBeneficiaries(updatedList);

            Alert.alert(
              'Success',
              'Beneficiary deleted'
            );
          },
        },
      ]
    );
  };

  const handleAddBeneficiary = async () => {
    if (!newName.trim()) {
      Alert.alert(
        'Error',
        'Please enter a name for the beneficiary.'
      );
      return;
    }

    const newBeneficiary = {
      id: Date.now().toString(),
      name: newName.trim(),
      avatar:
        newAvatar.trim() ||
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    };

    const updatedList = [
      newBeneficiary,
      ...beneficiaries,
    ];

    await saveBeneficiaries(updatedList);

    setNewName('');
    setNewAvatar('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>

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
          onPress={() => setModalVisible(true)}
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
          placeholder="Search a beneficiary"
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
              onPress={() => handleDelete(item.id)}
            >
              <Ionicons
                name="trash-outline"
                size={23}
                color="#021024"
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>
              Add Beneficiary
            </Text>

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
                style={[
                  styles.modalButton,
                  styles.cancelButton,
                ]}
                onPress={() =>
                  setModalVisible(false)
                }
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.saveButton,
                ]}
                onPress={handleAddBeneficiary}
              >
                <Text style={styles.saveButtonText}>
                  Save
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>
      </Modal>

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
    marginLeft: 20,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContent: {
    width: '100%',
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
