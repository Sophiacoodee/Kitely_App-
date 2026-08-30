import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TransactionDetailScreen() {
 
  const transactionData = {
    title: 'Groceries',
    date: 'May 22, 2022 · 10:24 a:m',
    amount: '$25.00',
    status: 'In progress',
    iconName: 'home',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#04122D" />

      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction details</Text>
      </View>

      
      <View style={styles.contentContainer}>
        
        <View style={styles.iconWrapper}>
          <View style={styles.iconCircle}>
            <FontAwesome5 name={transactionData.iconName} size={48} color="#04122D" />
          </View>
        </View>

       
        <Text style={styles.title}>{transactionData.title}</Text>
        <Text style={styles.date}>{transactionData.date}</Text>

       
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Amount</Text>
          <Text style={styles.cardValueAmount}>{transactionData.amount}</Text>
        </View>

  
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Status</Text>
          <Text style={styles.cardValueStatus}>{transactionData.status}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04122D', 
  },
  header: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  iconWrapper: {
  
    marginTop: -50,
    marginBottom: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#04122D',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#04122D',
    fontWeight: '500',
    marginBottom: 36,
    opacity: 0.8,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#04122D',
  },
  cardValueAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#04122D',
  },
  cardValueStatus: {
    fontSize: 18,
    fontWeight: '500',
    color: '#04122D',
  },
});