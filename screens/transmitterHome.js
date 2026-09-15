import React, { useState, useCallback, useMemo } from 'react';
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

  const RECENT_TRANSACTIONS = useMemo(() => [
    {
      id: '1',
      title: 'Walmart',
      subtitle: `${t('transmitterHome.categoryFood')} • Today, 10:24 AM`,
      amount: '-$42.00',
      status: t('transmitterHome.statusCompleted'),
      icon: 'home-outline',
    },
    {
      id: '2',
      title: 'Pharmacy Vida Nueva',
      subtitle: `${t('transmitterHome.categoryMedicine')} • Yesterday, 4:32 PM`,
      amount: '-$42.00',
      status: t('transmitterHome.statusCompleted'),
      icon: 'heart-outline',
    },
    {
      id: '3',
      title: 'Vidrí',
      subtitle: `${t('transmitterHome.categoryConstruction')} • 12 Jul 2026`,
      amount: '-$42.00',
      status: t('transmitterHome.statusCompleted'),
      icon: 'lock-closed-outline',
    },
    {
      id: '4',
      title: 'Super Selectos',
      subtitle: `${t('transmitterHome.categoryFood')} • 08 Jul 2026`,
      amount: '-$65.00',
      status: t('transmitterHome.statusCompleted'),
      icon: 'cart-outline',
    }
  ], [t]);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const savedImage = await AsyncStorage.getItem(
          `@user_profile_image_${currentUser.uid}`
        );
        if (savedImage) {
          setProfileImage(savedImage);
        } else {
          setProfileImage(null);
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
      console.error('Error al cargar datos del usuario:', error);
    }
  };

  const displayName = fullName !== '' ? fullName : t('transmitterHome.fallbackUser');
  const greetingText = t('transmitterHome.greeting', { name: displayName });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Encabezado con Perfil y Ajustes */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('Perfil')}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <FontAwesome5 name="user" size={18} color="#021024" />
            )}
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              {greetingText}
            </Text>
            <Text style={styles.headerSubtitle}>
              {t('transmitterHome.subtitle')}
            </Text>
          </View>

          <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={22} color="#021024" />
          </TouchableOpacity>
        </View>

        {/* Balance Disponible */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>{t('transmitterHome.balanceLabel')}</Text>
          <Text style={styles.balanceAmount}>$316.00</Text>
        </View>

        {/* Botones de Acción Rápida */}
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

        {/* Resumen por Categorías */}
        <View style={styles.card}>
          <View style={styles.chartRow}>
            <View style={styles.pieContainer}>
              <View style={[styles.pieSegment, { backgroundColor: '#00D2A0' }]} />
              <View style={[styles.pieInnerCircle, { backgroundColor: '#805AD5' }]} />
            </View>

            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: '#805AD5' }]} />
                <Text style={styles.legendLabel}>{t('transmitterHome.categoryFood')}</Text>
                <Text style={styles.legendPercent}>64%</Text>
                <Text style={styles.legendAmount}>$42.00</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: '#ECC94B' }]} />
                <Text style={styles.legendLabel}>{t('transmitterHome.categoryMedicine')}</Text>
                <Text style={styles.legendPercent}>11%</Text>
                <Text style={styles.legendAmount}>$16.00</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: '#00D2A0' }]} />
                <Text style={styles.legendLabel}>{t('transmitterHome.categoryConstruction')}</Text>
                <Text style={styles.legendPercent}>25%</Text>
                <Text style={styles.legendAmount}>$258.00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Lista Deslizable de Gastos Recientes */}
        <Text style={styles.sectionTitle}>{t('transmitterHome.spendingTitle')}</Text>
        <FlatList
          data={RECENT_TRANSACTIONS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <View style={styles.transactionIconBox}>
                <Ionicons name={item.icon} size={22} color="#021024" />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>{item.amount}</Text>
                <Text style={styles.transactionStatus}>{item.status}</Text>
              </View>
            </View>
          )}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 80,
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
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  transactionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#021024',
  },
  transactionSubtitle: {
    fontSize: 11,
    color: '#55C900',
    fontStyle: 'italic',
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#021024',
  },
  transactionStatus: {
    fontSize: 11,
    color: '#55C900',
    fontStyle: 'italic',
    marginTop: 2,
  },
});