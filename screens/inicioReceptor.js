import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Modal,
  SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import { db } from '../firebase/config';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

const { width } = Dimensions.get('window');

const RECENT_SPENDING = [
  {
    id: '1',
    title: 'Super Selectos - Food',
    subtitle: 'Ticket #1042 • Register 02',
    amount: '-$42.00',
    date: 'Today 10:24 a.m.',
    icon: 'cart-outline',
    iconBg: '#DCFCE7',
    iconColor: '#16A34A'
  },
  {
    id: '2',
    title: 'Farmacia San Nicolás',
    subtitle: 'Ticket #1038 • Register 01',
    amount: '-$16.00',
    date: 'Yesterday 4:15 p.m.',
    icon: 'medical-outline',
    iconBg: '#FEF3C7',
    iconColor: '#D97706'
  },
  {
    id: '3',
    title: 'Vidrí - Construction',
    subtitle: 'Ticket #0992 • Register 04',
    amount: '-$258.00',
    date: '12 Aug 2:30 p.m.',
    icon: 'construct-outline',
    iconBg: '#E0E7FF',
    iconColor: '#4F46E5'
  },
  {
    id: '4',
    title: 'Cine Madero',
    subtitle: 'Ticket #0950 • Register 01',
    amount: '-$18.50',
    date: '10 Aug 7:10 p.m.',
    icon: 'film-outline',
    iconBg: '#FCE7F3',
    iconColor: '#DB2777'
  }
];

export default function InicioReceptor({ route, navigation }) {
  const webViewRef = useRef(null);
  const modalWebViewRef = useRef(null);
  const [loadingMap, setLoadingMap] = useState(true);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);

  const [coords, setCoords] = useState({
    latitude: 13.69294,
    longitude: -89.21819,
    title: 'Super Selectos',
    description: 'Sucursal'
  });

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
          const map = L.map('map').setView([${coords.latitude}, ${coords.longitude}], 14);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);

          const marker = L.marker([${coords.latitude}, ${coords.longitude}]).addTo(map);
          marker.bindPopup("<b>${coords.title}</b><br>${coords.description}").openPopup();
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    if (route.params?.selectedLocation) {
      const { latitude, longitude, branchName, branchId } = route.params.selectedLocation;
      setCoords({
        latitude: Number(latitude),
        longitude: Number(longitude),
        title: branchName || 'Sucursal Seleccionada',
        description: branchId || 'Ubicación activa'
      });
      setLoadingMap(false);
    }
  }, [route.params?.selectedLocation]);

  useEffect(() => {
    const locationsRef = collection(db, 'branches_locations');
    const q = query(locationsRef, orderBy('createdAt', 'desc'), limit(1));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty && !route.params?.selectedLocation) {
          const docData = snapshot.docs[0].data();
          setCoords({
            latitude: Number(docData.latitude),
            longitude: Number(docData.longitude),
            title: docData.branchName || 'Super Selectos',
            description: docData.branchId || 'Sucursal'
          });
        }
        setLoadingMap(false);
      },
      (error) => {
        console.error('Error al escuchar Firebase:', error);
        setLoadingMap(false);
      }
    );

    return () => unsubscribe();
  }, [route.params?.selectedLocation]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('Perfil')}>
            <FontAwesome5 name="user" size={18} color="#021024" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Hello, Sandra!</Text>
            <Text style={styles.headerSubtitle}>
              Transparent remittances, stronger connections.
            </Text>
          </View>

          <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={22} color="#021024" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("FamilyTransmitter")}
          >
            <FontAwesome5 name="users" size={20} color="#021024" />
            <Text style={styles.actionText}>Senders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("QRScanner")}
          >
            <MaterialIcons name="qr-code-scanner" size={24} color="#021024" />
            <Text style={styles.actionText}>Scan Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AllTransactions')}
          >
            <MaterialIcons name="history" size={24} color="#021024" />
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Map Container con Botón de Expansión */}
        <View style={styles.mapCard}>
          {loadingMap ? (
            <View style={styles.mapLoader}>
              <ActivityIndicator size="small" color="#021024" />
            </View>
          ) : (
            <>
              <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                source={{ html: mapHtml }}
                style={styles.map}
              />
              <TouchableOpacity
                style={styles.expandButton}
                onPress={() => setIsMapModalVisible(true)}
              >
                <Ionicons name="expand" size={18} color="#021024" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Modal de Mapa Fullscreen */}
        <Modal
          visible={isMapModalVisible}
          animationType="slide"
          onRequestClose={() => setIsMapModalVisible(false)}
        >
          <SafeAreaView style={styles.fullMapContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsMapModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#021024" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Ubicación de Sucursal</Text>
              <View style={{ width: 36 }} />
            </View>

            <WebView
              ref={modalWebViewRef}
              originWhitelist={['*']}
              source={{ html: mapHtml }}
              style={styles.fullMap}
            />
          </SafeAreaView>
        </Modal>

        {/* Resumen por Categorías */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Spending by Category</Text>
          <View style={styles.chartRow}>
            <View style={styles.pieContainer}>
              <View style={[styles.pieSegment, { backgroundColor: '#00D2A0' }]} />
              <View style={[styles.pieInnerCircle, { backgroundColor: '#805AD5' }]} />
            </View>

            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: '#805AD5' }]} />
                <Text style={styles.legendLabel}>Food</Text>
                <Text style={styles.legendPercent}>64%</Text>
                <Text style={styles.legendAmount}>$42.00</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: '#ECC94B' }]} />
                <Text style={styles.legendLabel}>Medicine</Text>
                <Text style={styles.legendPercent}>11%</Text>
                <Text style={styles.legendAmount}>$16.00</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: '#00D2A0' }]} />
                <Text style={styles.legendLabel}>Construction</Text>
                <Text style={styles.legendPercent}>25%</Text>
                <Text style={styles.legendAmount}>$258.00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Gastos Recientes */}
        <Text style={styles.sectionTitle}>Recent Spending</Text>
        <FlatList
          data={RECENT_SPENDING}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.spendingCard}>
              <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon} size={22} color={item.iconColor} />
              </View>
              <View style={styles.spendingInfo}>
                <Text style={styles.spendingTitle}>{item.title}</Text>
                <Text style={styles.spendingSubtitle}>{item.subtitle}</Text>
                <Text style={styles.spendingDate}>{item.date}</Text>
              </View>
              <Text style={styles.spendingAmount}>{item.amount}</Text>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
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
  mapCard: {
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 18,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  mapLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  expandButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  fullMapContainer: {
    flex: 1,
    backgroundColor: '#021B42',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#021B42',
  },
  closeButton: {
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullMap: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#021024',
    marginBottom: 12,
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
  spendingCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  spendingInfo: {
    flex: 1,
  },
  spendingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#021024',
  },
  spendingSubtitle: {
    fontSize: 11,
    color: '#667085',
    marginTop: 2,
  },
  spendingDate: {
    fontSize: 10,
    color: '#98A2B3',
    marginTop: 2,
  },
  spendingAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#021024',
  },
});
