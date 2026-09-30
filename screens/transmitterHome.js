import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

export default function TransmitterHome({ navigation }) {
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [availableBalance, setAvailableBalance] = useState(1236.00);
  const [transactions, setTransactions] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({
    food: { amount: 0, percentage: 0, color: '#805AD5' },
    medicine: { amount: 0, percentage: 0, color: '#ECC94B' },
    construction: { amount: 0, percentage: 0, color: '#00D2A0' },
  });

  // Cada vez que entras o vuelves a esta pantalla, se actualiza el historial en tiempo real
  useFocusEffect(
    useCallback(() => {
      loadUserData();
      loadBalance();
      loadStoredTransactions();
    }, [])
  );

  const loadBalance = async () => {
    try {
      const savedBalance = await AsyncStorage.getItem('@transmitter_balance');
      if (savedBalance !== null) {
        setAvailableBalance(parseFloat(savedBalance));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadUserData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const savedImage = await AsyncStorage.getItem(
          `@user_profile_image_${currentUser.uid}`
        );
        if (savedImage) {
          setProfileImage(savedImage);
        }

        const docRef = doc(db, 'Usuarios', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const firstName = (userData.nombre || currentUser.displayName || '').split(' ')[0];
          setFullName(firstName);
        } else if (currentUser.displayName) {
          setFullName(currentUser.displayName.split(' ')[0]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Carga únicamente las transacciones reales guardadas en el almacenamiento
  const loadStoredTransactions = async () => {
    try {
      const savedTransactions = await AsyncStorage.getItem('@transmitter_transactions');
      if (savedTransactions !== null) {
        const parsedList = JSON.parse(savedTransactions);
        setTransactions(parsedList);
        calculateCategoryTotals(parsedList);
      } else {
        setTransactions([]);
        calculateCategoryTotals([]);
      }
    } catch (error) {
      console.error(error);
      setTransactions([]);
    }
  };

  const calculateCategoryTotals = (list) => {
    let foodTotal = 0;
    let medicineTotal = 0;
    let constructionTotal = 0;
    let totalAll = 0;

    if (!list || list.length === 0) {
      setCategoryTotals({
        food: { amount: 0, percentage: 0, color: '#805AD5' },
        medicine: { amount: 0, percentage: 0, color: '#ECC94B' },
        construction: { amount: 0, percentage: 0, color: '#00D2A0' },
      });
      return;
    }

    list.forEach((item) => {
      const amt = item.rawAmount || 0;
      totalAll += amt;
      const catKey = (item.categoryKey || '').toLowerCase();
      if (catKey === 'medicine') {
        medicineTotal += amt;
      } else if (catKey === 'construction') {
        constructionTotal += amt;
      } else {
        foodTotal += amt;
      }
    });

    const calcPercent = (val) => (totalAll > 0 ? Math.round((val / totalAll) * 100) : 0);

    setCategoryTotals({
      food: {
        amount: foodTotal,
        percentage: calcPercent(foodTotal),
        color: '#805AD5',
      },
      medicine: {
        amount: medicineTotal,
        percentage: calcPercent(medicineTotal),
        color: '#ECC94B',
      },
      construction: {
        amount: constructionTotal,
        percentage: calcPercent(constructionTotal),
        color: '#00D2A0',
      },
    });
  };

  const displayName = fullName !== '' ? fullName : t('transmitterHome.fallbackUser');
  const greetingText = t('transmitterHome.greeting', { name: displayName });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('Perfil')}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <FontAwesome5 name="user" size={18} color="#021024" />
            )}
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{greetingText}</Text>
            <Text style={styles.headerSubtitle}>{t('transmitterHome.subtitle')}</Text>
          </View>

          <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={22} color="#021024" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>{t('transmitterHome.balanceLabel')}</Text>
          <Text style={styles.balanceAmount}>${availableBalance.toFixed(2)}</Text>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('CategoryTransmitter')}
          >
            <Ionicons name="paper-plane" size={24} color="#021024" />
            <Text style={styles.actionText}>{t('transmitterHome.sendRemittance')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('FamilyTransmitter')}
          >
            <FontAwesome5 name="users" size={20} color="#021024" />
            <Text style={styles.actionText}>{t('transmitterHome.beneficiaries')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AllTransactions')}
          >
            <Ionicons name="time" size={24} color="#021024" />
            <Text style={styles.actionText}>{t('transmitterHome.history')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.chartRow}>
            <View style={styles.pieContainer}>
              <View style={[styles.pieSegment, { backgroundColor: categoryTotals.construction.color }]} />
              <View style={[styles.pieInnerCircle, { backgroundColor: categoryTotals.food.color }]} />
            </View>

            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: categoryTotals.food.color }]} />
                <Text style={styles.legendLabel}>Food / Clothing</Text>
                <Text style={styles.legendPercent}>{categoryTotals.food.percentage}%</Text>
                <Text style={styles.legendAmount}>${categoryTotals.food.amount.toFixed(2)}</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: categoryTotals.medicine.color }]} />
                <Text style={styles.legendLabel}>Medicine</Text>
                <Text style={styles.legendPercent}>{categoryTotals.medicine.percentage}%</Text>
                <Text style={styles.legendAmount}>${categoryTotals.medicine.amount.toFixed(2)}</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: categoryTotals.construction.color }]} />
                <Text style={styles.legendLabel}>Construction</Text>
                <Text style={styles.legendPercent}>{categoryTotals.construction.percentage}%</Text>
                <Text style={styles.legendAmount}>${categoryTotals.construction.amount.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Spending by Category</Text>
        
        {/* Historial dinámico real con diseño de tarjetas con guión (-) */}
        {transactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay transacciones aún.</Text>
          </View>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.transactionCard}>
                <View style={styles.transactionIconBox}>
                  <Ionicons name={item.icon || 'cart'} size={20} color="#22C55E" />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>{item.title}</Text>
                  <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>{item.amount}</Text>
                  <Text style={styles.transactionDate}>{item.dateText || 'Just now'}</Text>
                  <Text style={styles.transactionStatus}>{item.status}</Text>
                </View>
              </View>
            )}
          />
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  balanceCard: {
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#55C900',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    width: (width - 64) / 3,
    height: 85,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  actionText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#021024',
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pieContainer: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#00D2A0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  pieSegment: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: 0,
  },
  pieInnerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  legendContainer: {
    flex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#021024',
    flex: 1,
  },
  legendPercent: {
    fontSize: 12,
    color: '#667085',
    marginRight: 10,
  },
  legendAmount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#021024',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 14,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.05)',
    borderRadius: 16,
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#021024',
  },
  transactionSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#021024',
  },
  transactionDate: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  transactionStatus: {
    fontSize: 10,
    color: '#22C55E',
    fontWeight: '600',
    marginTop: 2,
  },
});