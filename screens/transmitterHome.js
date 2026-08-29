import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Lista deslizable de transacciones enviadas
const RECENT_TRANSACTIONS = [
  {
    id: '1',
    title: 'Walmart',
    subtitle: 'Food • Today, 10:24 AM',
    amount: '-$42.00',
    status: 'Completed',
    icon: 'home-outline',
  },
  {
    id: '2',
    title: 'Pharmacy Vida Nueva',
    subtitle: 'Medicine • Yesterday, 4:32 PM',
    amount: '-$42.00',
    status: 'Completed',
    icon: 'heart-outline',
  },
  {
    id: '3',
    title: 'Vidrí',
    subtitle: 'Construction • 12 Jul 2026',
    amount: '-$42.00',
    status: 'Completed',
    icon: 'lock-closed-outline',
  },
  {
    id: '4',
    title: 'Super Selectos',
    subtitle: 'Food • 08 Jul 2026',
    amount: '-$65.00',
    status: 'Completed',
    icon: 'cart-outline',
  }
];

export default function TransmitterHome({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Encabezado con Perfil y Ajustes */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarButton} onPress={() => {}}>
            <FontAwesome5 name="user" size={18} color="#021024" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Hello, Emiliano!</Text>
            <Text style={styles.headerSubtitle}>
              Transparent remittances, stronger connections.
            </Text>
          </View>

          <TouchableOpacity style={styles.avatarButton} onPress={() => {}}>
            <Ionicons name="settings-outline" size={22} color="#021024" />
          </TouchableOpacity>
        </View>

        {/* Balance Disponible */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>$316.00</Text>
        </View>

        {/* Botones de Acción Rápida */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('CategoryTransmitter')}
          >
            <Ionicons name="paper-plane" size={24} color="#021024" />
            <Text style={styles.actionText}>Send{'\n'}Remittance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('FamilyTransmitter')}
          >
            <FontAwesome5 name="users" size={20} color="#021024" />
            <Text style={styles.actionText}>Beneficiaries</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="time" size={24} color="#021024" />
            <Text style={styles.actionText}>History</Text>
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

        {/* Lista Deslizable de Gastos Recientes */}
        <Text style={styles.sectionTitle}>Spending by Category</Text>
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
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
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