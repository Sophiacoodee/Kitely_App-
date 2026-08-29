import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function MetodoPagoScreen({ navigation }) {
  const [cardholderName, setCardholderName] = useState('Alan Martínez');
  const [cardNumber, setCardNumber] = useState('••••••••••••••••');
  const [expireDate, setExpireDate] = useState('06/27');
  const [cvv, setCvv] = useState('');

  return (
    <LinearGradient
      colors={['#021024','#021024','#021024','#011f49','#002355', '#0050a5']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.mainTitle}>Payment</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cardholder´s name</Text>
            <TextInput
              style={styles.input}
              value={cardholderName}
              onChangeText={setCardholderName}
              placeholder="Name on card"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              secureTextEntry
              placeholder="•••• •••• •••• ••••"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>Expire Date</Text>
              <TextInput
                style={styles.input}
                value={expireDate}
                onChangeText={setExpireDate}
                placeholder="MM/YY"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={setCvv}
                placeholder="123"
                placeholderTextColor="#999"
                keyboardType="numeric"
                secureTextEntry
                maxLength={4}
              />
            </View>
          </View>

          <View style={styles.cardsRow}>

            <View style={styles.cardBadge}>
              <Image
                source={require('../assets/imagesmastercard.png')}
                style={styles.logoImage}
              />
            </View>

            <View style={styles.cardBadge}>
              <Image
                source={require('../assets/imagesvisa.png')}
                style={styles.logoImage}
              />
            </View>

            <View style={styles.cardBadge}>
              <Image
                source={require('../assets/Apple_Pay-Logo.wine.png')}
                style={styles.logoImage}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 70,
    paddingBottom: 30,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#021024',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '47%',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 60,
  },
  cardBadge: {
    backgroundColor: '#FFFFFF',
    width: '30%',
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  applePayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 2,
  },
  continueButton: {
    backgroundColor: '#55C900',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});