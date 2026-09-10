<<<<<<< HEAD
import React, { useState, useRef } from 'react';
=======
import React, { useState, useCallback } from 'react';
>>>>>>> e0bfca9f79fa11e12f863ed3b72262db03677e85
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
<<<<<<< HEAD
  Alert,
  Modal,
=======
  Image,
>>>>>>> e0bfca9f79fa11e12f863ed3b72262db03677e85
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import dayjs from 'dayjs';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
<<<<<<< HEAD
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
>>>>>>> e0bfca9f79fa11e12f863ed3b72262db03677e85

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
<<<<<<< HEAD
  const webViewRef = useRef(null);
  const modalWebViewRef = useRef(null);

  const [selectedCoords, setSelectedCoords] = useState({
    latitude: 13.7013,
    longitude: -89.2244,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
=======
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
>>>>>>> e0bfca9f79fa11e12f863ed3b72262db03677e85

  const recentActivities = [
    { id: '1', title: 'Redirection - Food', subtitle: 'Register 02 • Ticket #1042', amount: '+$25.00', time: 'Today 10:24 a.m.', status: 'Completed', icon: 'shopping-cart' },
    { id: '2', title: 'Redirection - Medicine', subtitle: 'Register 01 • Ticket #1038', amount: '+$12.50', time: 'Yesterday 4:15 p.m.', status: 'Completed', icon: 'medical-services' },
    { id: '3', title: 'Redirection - Food', subtitle: 'Register 04 • Ticket #1012', amount: '+$45.00', time: '10 Aug 2:30 p.m.', status: 'Completed', icon: 'shopping-cart' },
    { id: '4', title: 'Redirection - Entertainment', subtitle: 'Register 03 • Ticket #0998', amount: '+$18.00', time: '08 Aug 11:10 a.m.', status: 'Completed', icon: 'movie' },
  ];

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body, html, #map { height: 100%; margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([${selectedCoords.latitude}, ${selectedCoords.longitude}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);

          let marker = L.marker([${selectedCoords.latitude}, ${selectedCoords.longitude}], {draggable: true}).addTo(map);

          function updateCoords(lat, lng) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: lat, longitude: lng }));
          }

          map.on('click', function(e) {
            marker.setLatLng(e.latlng);
            updateCoords(e.latlng.lat, e.latlng.lng);
          });

          marker.on('dragend', function(e) {
            const position = marker.getLatLng();
            updateCoords(position.lat, position.lng);
          });
        </script>
      </body>
    </html>
  `;

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.latitude && data.longitude) {
        setSelectedCoords({
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
        });
      }
    } catch (e) {
      console.error('Error al procesar coordenadas:', e);
    }
  };

  const handleSaveLocation = async () => {
    try {
      setIsSaving(true);
      await addDoc(collection(db, 'branches_locations'), {
        branchName: 'Super Selectos - Escalón',
        branchId: '#4082',
        latitude: selectedCoords.latitude,
        longitude: selectedCoords.longitude,
        createdAt: serverTimestamp(),
      });

      Alert.alert('¡Éxito!', 'Ubicación guardada en Firebase correctamente.');
      setIsMapModalVisible(false);
    } catch (error) {
      console.error('Error al guardar:', error);
      Alert.alert('Error', 'No se pudo guardar la ubicación.');
    } finally {
      setIsSaving(false);
    }
  };

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
<<<<<<< HEAD
        <TouchableOpacity style={styles.balanceCard} onPress={() => navigation.navigate("BalanceDiario")}>
=======
        <TouchableOpacity
          style={styles.balanceCard}
          onPress={() => navigation.navigate('BalanceDiario')}
        >
>>>>>>> e0bfca9f79fa11e12f863ed3b72262db03677e85
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>Available Register Balance</Text>
            <Text style={styles.balanceAmount}>$250.00</Text>
            <Text style={styles.expiryText}>Cut-off date: {expirationDate}</Text>
          </View>
        </TouchableOpacity>

<<<<<<< HEAD
        {/* Map Container */}
=======
        {/* Mapa */}
>>>>>>> e0bfca9f79fa11e12f863ed3b72262db03677e85
        <View style={styles.mapContainer}>
          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ html: mapHtml }}
            onMessage={handleWebViewMessage}
            style={styles.map}
          />
          <TouchableOpacity style={styles.expandButton} onPress={() => setIsMapModalVisible(true)}>
            <Ionicons name="expand" size={18} color="#021024" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.saveLocationButton, isSaving && { backgroundColor: '#a0aab8' }]} 
            onPress={handleSaveLocation}
            disabled={isSaving}
          >
            <Ionicons name="save-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.saveLocationText}>{isSaving ? 'Guardando...' : 'Guardar ubicación'}</Text>
          </TouchableOpacity>
        </View>

<<<<<<< HEAD
        {/* Fullscreen Map Modal */}
        <Modal visible={isMapModalVisible} animationType="slide" onRequestClose={() => setIsMapModalVisible(false)}>
          <SafeAreaView style={styles.fullMapContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsMapModalVisible(false)}>
                <Ionicons name="close" size={24} color="#021024" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Seleccionar Ubicación</Text>
              <View style={{ width: 36 }} />
            </View>

            <WebView
              ref={modalWebViewRef}
              originWhitelist={['*']}
              source={{ html: mapHtml }}
              onMessage={handleWebViewMessage}
              style={styles.fullMap}
            />

            <TouchableOpacity style={styles.fullMapSaveButton} onPress={handleSaveLocation} disabled={isSaving}>
              <Ionicons name="save-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.fullMapSaveText}>{isSaving ? 'Guardando...' : 'Confirmar y Guardar Ubicación'}</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

        <TouchableOpacity onPress={() => navigation.navigate("AuthorizedCategories")}>
          <Text style={styles.sectionTitle}>Authorized Categories</Text>
=======
        {/* Botón de Authorized Categories */}
        <TouchableOpacity
          style={styles.categoriesHeaderButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AuthorizedCategories')}
        >
          <Text style={styles.categoriesButtonText}>Authorized Categories</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
>>>>>>> e0bfca9f79fa11e12f863ed3b72262db03677e85
        </TouchableOpacity>

        {/* Grilla de categorías */}
        <View style={styles.gridContainer}>
<<<<<<< HEAD
          <TouchableOpacity style={styles.categoryCard}>
            <MaterialIcons name="shopping-cart" size={28} color="#021B42" />
            <Text style={styles.categoryText}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <MaterialIcons name="medical-services" size={28} color="#021B42" />
            <Text style={styles.categoryText}>Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <MaterialIcons name="school" size={28} color="#021B42" />
            <Text style={styles.categoryText}>Education</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <MaterialIcons name="movie" size={28} color="#021B42" />
            <Text style={styles.categoryText}>Entertainment</Text>
          </TouchableOpacity>
=======
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
>>>>>>> e0bfca9f79fa11e12f863ed3b72262db03677e85
        </View>

        {/* Activity */}
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
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: '#021B42' },
  scrollContent: { paddingBottom: 30 },
  header: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  avatarButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  headerTextContainer: { flex: 1, marginHorizontal: 12 },
  greeting: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  subGreeting: { color: '#a0aab8', fontSize: 12, marginTop: 2 },
  balanceCard: { backgroundColor: '#ffffff', marginHorizontal: 20, borderRadius: 20, padding: 20, marginTop: 5, elevation: 4 },
  balanceInfo: { width: '100%' },
  balanceLabel: { fontSize: 15, fontWeight: 'bold', color: '#021B42' },
  balanceAmount: { fontSize: 28, fontWeight: 'bold', color: '#021B42', marginVertical: 4 },
  expiryText: { fontSize: 12, color: '#6c757d' },
  mapContainer: { height: 180, marginHorizontal: 20, borderRadius: 20, overflow: 'hidden', marginTop: 15, position: 'relative' },
  map: { width: '100%', height: '100%' },
  expandButton: { position: 'absolute', top: 10, right: 10, backgroundColor: '#FFFFFF', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  saveLocationButton: { position: 'absolute', bottom: 10, alignSelf: 'center', backgroundColor: '#55C900', flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, elevation: 4 },
  saveLocationText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  fullMapContainer: { flex: 1, backgroundColor: '#021B42' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#021B42' },
  closeButton: { backgroundColor: '#FFFFFF', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  modalTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  fullMap: { flex: 1 },
  fullMapSaveButton: { position: 'absolute', bottom: 30, alignSelf: 'center', backgroundColor: '#55C900', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 25, elevation: 5 },
  fullMapSaveText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginHorizontal: 20, marginTop: 22, marginBottom: 12 },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  categoryCard: { backgroundColor: '#ffffff', borderRadius: 14, width: (width - 70) / 4, height: 85, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  categoryText: { fontSize: 10, fontWeight: 'bold', color: '#021B42', marginTop: 6, textAlign: 'center' },
  activityCard: { backgroundColor: '#ffffff', marginHorizontal: 20, borderRadius: 16, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  activityLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 8 },
  cartIconBg: { backgroundColor: '#EEFAD8', padding: 10, borderRadius: 12 },
  activityDetails: { marginLeft: 12, flex: 1 },
  activityTitle: { fontSize: 14, fontWeight: 'bold', color: '#021B42' },
  activitySubtitle: { fontSize: 12, color: '#6c757d', marginTop: 3 },
  activityRight: { alignItems: 'flex-end', justifyContent: 'center' },
  activityAmount: { fontSize: 15, fontWeight: 'bold', color: '#55C900' },
  activityTime: { fontSize: 11, color: '#6c757d', marginTop: 3 },
  activityStatus: { fontSize: 11, fontWeight: 'bold', color: '#55C900', marginTop: 2 },
=======
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
>>>>>>> e0bfca9f79fa11e12f863ed3b72262db03677e85
});