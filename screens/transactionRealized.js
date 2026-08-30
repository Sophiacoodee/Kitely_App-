import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PantallaExito({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.checkCircle}>
          <FontAwesome5 name="check" size={48} color="#FFFFFF" />
        </View>
        <Text style={styles.completedText}>Transaction Completed</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="storefront-outline" size={26} color="#021024" />
          </View>
          <Text style={styles.cardLabel}>Place</Text>
          <Text style={styles.cardValue}>Super Selectos</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <FontAwesome5 name="tag" size={22} color="#021024" />
          </View>
          <Text style={styles.cardLabel}>Amount</Text>
          <Text style={styles.cardValue}>$25.00</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="view-grid-outline" size={26} color="#021024" />
          </View>
          <Text style={styles.cardLabel}>Category</Text>
          <Text style={styles.cardValue}>Groceries</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <FontAwesome5 name="calendar-alt" size={24} color="#021024" />
          </View>
          <Text style={styles.cardLabel}>Date</Text>
          <Text style={styles.cardValue}>May 08, 2026</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>View details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021024',
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  checkCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#65C500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  cardContainer: {
    backgroundColor: '#F8FAF8',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardLabel: {
    fontSize: 16,
    color: '#1E293B',
    flex: 1,
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  primaryButton: {
    backgroundColor: '#65C500',
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#65C500',
    fontSize: 16,
    fontWeight: '600',
  },
});