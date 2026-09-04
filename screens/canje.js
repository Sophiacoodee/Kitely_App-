import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CanjeExitosoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.titleText}>Transaction Completed</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="storefront-outline" size={22} color="#1F2937" />
              <Text style={styles.label}>Place</Text>
            </View>
            <Text style={styles.value}>Super Selectos</Text>
          </View>

          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="pricetag-outline" size={22} color="#1F2937" />
              <Text style={styles.label}>Amount</Text>
            </View>
            <Text style={styles.value}>$25.00</Text>
          </View>

          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="grid-outline" size={22} color="#1F2937" />
              <Text style={styles.label}>Category</Text>
            </View>
            <Text style={styles.value}>Groceries</Text>
          </View>

          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="calendar-outline" size={22} color="#1F2937" />
              <Text style={styles.label}>Date</Text>
            </View>
            <Text style={styles.value}>May 08, 2026</Text>
          </View>

          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.8}
            onPress={() => navigation?.navigate('AllTransactions')}
          >
            <Text style={styles.primaryButtonText}>View details</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkButton} 
            activeOpacity={0.6}
            onPress={() => navigation?.goBack()}
          >
            <Text style={styles.linkText}>Back to home</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 70, // Mayor espacio superior para bajar la vista
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  checkCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#55C900',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 40,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardContainer: {
    width: '90%',
    backgroundColor: '#F3F4F6', 
    borderRadius: 28,
    padding: 20,
    gap: 12,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#55C900',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  linkText: {
    color: '#9CA3AF',
    fontSize: 15,
    fontWeight: '500',
  },
});