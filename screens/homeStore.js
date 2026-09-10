import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import dayjs from 'dayjs';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');

const CATEGORY_ICONS = {
  Food: 'shopping-cart',
  Medicine: 'medical-services',
  Education: 'school',
  Entertainment: 'movie',
  Construction: 'build',
  'Pet supplies': 'pets',
  Clothes: 'checkroom',
};

export default function HomeStoreScreen({ navigation }) {
  const expirationDate = dayjs('2026-08-14').format('DD MMM, YYYY');
  const [activeCategories, setActiveCategories] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadAuthorizedCategories();
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
      }
    } catch (error) {
      console.error('Error al cargar la foto de perfil:', error);
    }
  };

  const loadAuthorizedCategories = async () => {
    try {
      const saved = await AsyncStorage.getItem('@user_categories');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        const enabledOnly = parsed.filter((cat) => cat.enabled);
        setActiveCategories(enabledOnly);
      } else {
        setActiveCategories([
          { name: 'Food', enabled: true },
          { name: 'Medicine', enabled: true },
          { name: 'Education', enabled: true },
          { name: 'Entertainment', enabled: true },
        ]);
      }
    } catch (e) {
      console.error('Error al cargar categorías en la pantalla principal', e);
    }
  };

  const recentActivities = [
    {
      id: '1',
      title: 'Redirection - Food',
      subtitle: 'Register 02 • Ticket #1042',
      amount: '+$25.00',
      time: 'Today 10:24 a.m.',
      status: 'Completed',
      icon: 'shopping-cart',
    },
    {
      id: '2',
      title: 'Redirection - Medicine',
      subtitle: 'Register 01 • Ticket #1038',
      amount: '+$12.50',
      time: 'Yesterday 4:15 p.m.',
      status: 'Completed',
      icon: 'medical-services',
    },
    {
      id: '3',
      title: 'Redirection - Food',
      subtitle: 'Register 04 • Ticket #1012',
      amount: '+$45.00',
      time: '10 Aug 2:30 p.m.',
      status: 'Completed',
      icon: 'shopping-cart',
    },
    {
      id: '4',
      title: 'Redirection - Entertainment',
      subtitle: 'Register 03 • Ticket #0998',
      amount: '+$18.00',
      time: '08 Aug 11:10 a.m.',
      status: 'Completed',
      icon: 'movie',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('Perfil')}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <FontAwesome5 name="user" size={18} color="#021024" />
            )}
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Super Selectos - Escalón</Text>
            <Text style={styles.subGreeting}>Authorized Branch • ID: #4082</Text>
          </View>

          <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={22} color="#021024" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <TouchableOpacity
          style={styles.balanceCard}
          onPress={() => navigation.navigate('BalanceDiario')}
        >
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>Available Register Balance</Text>
            <Text style={styles.balanceAmount}>$250.00</Text>
            <Text style={styles.expiryText}>Cut-off date: {expirationDate}</Text>
          </View>
        </TouchableOpacity>

        {/* Mapa */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 13.7013,
              longitude: -89.2244,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            toolbarEnabled={false}
            showsCompass={false}
          >
            <Marker
              coordinate={{ latitude: 13.7013, longitude: -89.2244 }}
              title="Escalón Branch"
              pinColor="red"
            />
          </MapView>
        </View>

        {/* Botón de Authorized Categories */}
        <TouchableOpacity
          style={styles.categoriesHeaderButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AuthorizedCategories')}
        >
          <Text style={styles.categoriesButtonText}>Authorized Categories</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Grilla de categorías */}
        <View style={styles.gridContainer}>
          {activeCategories.map((item) => (
            <View key={item.name} style={styles.categoryCard}>
              <MaterialIcons
                name={CATEGORY_ICONS[item.name] || 'category'}
                size={28}
                color="#021B42"
              />
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Branch Recent Activity</Text>

        {recentActivities.map((item) => (
          <View key={item.id} style={styles.activityCard}>
            <View style={styles.activityLeft}>
              <View style={styles.cartIconBg}>
                <MaterialIcons name={item.icon} size={24} color="#55C900" />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.activitySubtitle} numberOfLines={1}>{item.subtitle}</Text>
              </View>
            </View>

            <View style={styles.activityRight}>
              <Text style={styles.activityAmount}>{item.amount}</Text>
              <Text style={styles.activityTime} numberOfLines={1}>{item.time}</Text>
              <Text style={styles.activityStatus}>{item.status}</Text>
            </View>
          </View>
        ))}

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
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerTextContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  greeting: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subGreeting: {
    color: '#a0aab8',
    fontSize: 12,
    marginTop: 2,
  },
  balanceCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  balanceInfo: {
    width: '100%',
  },
  balanceLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#021B42',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#021B42',
    marginVertical: 4,
  },
  expiryText: {
    fontSize: 12,
    color: '#6c757d',
  },
  mapContainer: {
    height: 150,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 15,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  categoriesHeaderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  categoriesButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    width: (width - 70) / 4,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#021B42',
    marginTop: 6,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  cartIconBg: {
    backgroundColor: '#EEFAD8',
    padding: 10,
    borderRadius: 12,
  },
  activityDetails: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#021B42',
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 3,
  },
  activityRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  activityAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#55C900',
  },
  activityTime: {
    fontSize: 11,
    color: '#6c757d',
    marginTop: 3,
  },
  activityStatus: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#55C900',
    marginTop: 2,
  },
});