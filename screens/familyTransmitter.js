import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebase/config';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

export default function BeneficiariesScreen({ navigation }) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'Beneficiarios'),
      where('ownerUid', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            avatar: data.fotoPerfil || data.avatar || data.photoURL || null,
          };
        });
        setBeneficiaries(list);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredBeneficiaries = beneficiaries.filter((item) =>
    (item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchUsersInDB = async () => {
    if (!userQuery.trim()) return;
    setSearching(true);
    setSearchResults([]);

    try {
      const usersRef = collection(db, 'Usuarios');
      const querySnapshot = await getDocs(usersRef);

      const matches = [];
      const term = userQuery.trim().toLowerCase();
      const currentUid = auth.currentUser?.uid;

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const docId = docSnap.id;

        if (docId === currentUid) return;

        const name = (data.nombre || data.fullName || '').toLowerCase();
        const email = (data.correo || data.email || '').toLowerCase();

        if (name.includes(term) || email.includes(term)) {
          matches.push({
            uid: docId,
            name: data.nombre || data.fullName || 'User',
            email: data.correo || data.email || '',
            avatar: data.fotoPerfil || data.photoURL || data.avatar || data.profileImage || null,
          });
        }
      });

      setSearchResults(matches);
    } catch (error) {
      Alert.alert(
        t('beneficiaries.errorTitle', 'Error'),
        'Search failed'
      );
    } finally {
      setSearching(false);
    }
  };

  const handleAddBeneficiary = async (user) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const alreadyExists = beneficiaries.some(
      (b) => b.beneficiaryUid === user.uid
    );
    if (alreadyExists) {
      Alert.alert(
        t('beneficiaries.errorTitle', 'Attention'),
        'User is already in your list'
      );
      return;
    }

    try {
      await addDoc(collection(db, 'Beneficiarios'), {
        ownerUid: currentUser.uid,
        beneficiaryUid: user.uid,
        name: user.name,
        email: user.email,
        fotoPerfil: user.avatar || null,
        avatar: user.avatar || null,
        createdAt: new Date(),
      });

      setModalVisible(false);
      setUserQuery('');
      setSearchResults([]);
    } catch (error) {
      Alert.alert(
        t('beneficiaries.errorTitle', 'Error'),
        'Could not save beneficiary'
      );
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      t('beneficiaries.deleteTitle', 'Delete'),
      t('beneficiaries.deleteMessage', 'Remove this beneficiary?'),
      [
        {
          text: t('beneficiaries.cancel', 'Cancel'),
          style: 'cancel',
        },
        {
          text: t('beneficiaries.delete', 'Delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'Beneficiarios', id));
            } catch (error) {
            }
          },
        },
      ]
    );
  };

  const handleNavigateToProfile = (item) => {
    const targetUid = item.beneficiaryUid || item.id;

    navigation.navigate('InformationUsers', {
      userId: targetUid,
      userData: item,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#021B42" />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>
              {t('beneficiaries.headerTitle')}
            </Text>
            <Text style={styles.headerSubtitle}>
              {t('beneficiaries.headerSubtitle')}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>
              {t('beneficiaries.addButton')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t('beneficiaries.searchPlaceholder')}
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search-outline" size={20} color="#021024" />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#55A605" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={filteredBeneficiaries}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {t('beneficiaries.emptyText')}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => handleNavigateToProfile(item)}
              >
                {item.avatar ? (
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, styles.placeholderAvatar]}>
                    <Ionicons name="person" size={24} color="#94A3B8" />
                  </View>
                )}
                <Text style={styles.nameText}>{item.name}</Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Ionicons name="trash-outline" size={22} color="#021024" />
                </TouchableOpacity>

                <Ionicons name="chevron-forward" size={20} color="#021024" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSearchResults([]);
          setUserQuery('');
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {t('beneficiaries.modalTitle', 'Add Beneficiary')}
            </Text>

            <View style={styles.modalSearchBox}>
              <TextInput
                style={styles.modalInput}
                placeholder={t(
                  'beneficiaries.searchUserPlaceholder',
                  'User'
                )}
                placeholderTextColor="#94A3B8"
                value={userQuery}
                onChangeText={setUserQuery}
              />
              <TouchableOpacity
                style={styles.modalSearchBtn}
                onPress={handleSearchUsersInDB}
              >
                <Ionicons name="search" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {searching ? (
              <ActivityIndicator color="#55A605" style={{ marginVertical: 20 }} />
            ) : (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.uid}
                style={{ width: '100%', maxHeight: 220 }}
                ListEmptyComponent={
                  userQuery.length > 0 ? (
                    <Text style={styles.noResultsText}>
                      No users found.
                    </Text>
                  ) : null
                }
                renderItem={({ item }) => (
                  <View style={styles.resultItem}>
                    {item.avatar ? (
                      <Image source={{ uri: item.avatar }} style={styles.resultAvatar} />
                    ) : (
                      <View style={[styles.resultAvatar, styles.placeholderAvatar]}>
                        <Ionicons name="person" size={18} color="#94A3B8" />
                      </View>
                    )}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.resultName}>{item.name}</Text>
                      {item.email ? (
                        <Text style={styles.resultEmail}>{item.email}</Text>
                      ) : null}
                    </View>
                    <TouchableOpacity
                      style={styles.addResultBtn}
                      onPress={() => handleAddBeneficiary(item)}
                    >
                      <Text style={styles.addResultBtnText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setSearchResults([]);
                  setUserQuery('');
                }}
              >
                <Text style={styles.cancelButtonText}>
                  {t('beneficiaries.cancel', 'Close')}
                </Text>
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
  placeholderAvatar: {
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
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
  modalSearchBox: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
  },
  modalInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 14,
    color: '#021024',
  },
  modalSearchBtn: {
    backgroundColor: '#55A605',
    width: 48,
    height: 48,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
    width: '100%',
  },
  resultAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  resultName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resultEmail: {
    color: '#94A3B8',
    fontSize: 12,
  },
  addResultBtn: {
    backgroundColor: '#55A605',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addResultBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noResultsText: {
    color: '#94A3B8',
    marginVertical: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 12,
  },
  modalButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#1E293B',
  },
  cancelButtonText: {
    color: '#94A3B8',
    fontWeight: 'bold',
  },
});