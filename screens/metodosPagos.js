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
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MetodoPagoScreen({ navigation }) {
  const { t } = useTranslation();
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');

  // 1. Formateo y validación de Monto
  const handleAmountChange = (text) => {
    let cleanedText = text.replace(',', '.').replace(/[^0-9.]/g, '');
    const parts = cleanedText.split('.');
    if (parts.length > 2) {
      cleanedText = `${parts[0]}.${parts.slice(1).join('')}`;
    }
    if (parts[1] && parts[1].length > 2) {
      cleanedText = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }
    setAmount(cleanedText);
  };

  // 2. Formateo del número de tarjeta en grupos de 4 dígitos (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  // 3. Formateo de fecha de expiración (MM/YY)
  const handleExpireDateChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      setExpireDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setExpireDate(cleaned);
    }
  };

  // 4. Límite del CVV a 3 dígitos numéricos
  const handleCvvChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 3);
    setCvv(cleaned);
  };

  const handleProcessPayment = async () => {
    const rawCardNumber = cardNumber.replace(/\s/g, '');

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert(
        t('metodoPago.attentionTitle', { defaultValue: 'Atención' }),
        t('metodoPago.invalidAmount', { defaultValue: 'Ingresa un monto válido a recargar.' })
      );
      return;
    }

    if (!cardholderName.trim()) {
      Alert.alert(
        t('metodoPago.attentionTitle', { defaultValue: 'Atención' }),
        'Ingresa el nombre del titular de la tarjeta.'
      );
      return;
    }

    if (rawCardNumber.length !== 16) {
      Alert.alert(
        t('metodoPago.attentionTitle', { defaultValue: 'Atención' }),
        'El número de tarjeta debe tener 16 dígitos.'
      );
      return;
    }

    // Validación de fecha de expiración MM/YY
    const dateParts = expireDate.split('/');
    if (dateParts.length !== 2 || dateParts[0].length !== 2 || dateParts[1].length !== 2) {
      Alert.alert(
        t('metodoPago.attentionTitle', { defaultValue: 'Atención' }),
        'Ingresa una fecha de expiración válida en formato MM/YY.'
      );
      return;
    }

    const month = parseInt(dateParts[0], 10);
    const year = parseInt(`20${dateParts[1]}`, 10);

    if (month < 1 || month > 12) {
      Alert.alert(
        t('metodoPago.attentionTitle', { defaultValue: 'Atención' }),
        'El mes ingresado no es válido (01 a 12).'
      );
      return;
    }

    if (year < 2026) {
      Alert.alert(
        t('metodoPago.attentionTitle', { defaultValue: 'Atención' }),
        'La tarjeta ya se encuentra vencida.'
      );
      return;
    }

    if (cvv.length !== 3) {
      Alert.alert(
        t('metodoPago.attentionTitle', { defaultValue: 'Atención' }),
        'El CVV debe contener exactamente 3 dígitos.'
      );
      return;
    }

    const rechargeAmount = parseFloat(amount);

    try {
      const savedBalance = await AsyncStorage.getItem('@transmitter_balance');
      const currentBalance = savedBalance !== null ? parseFloat(savedBalance) : 316.00;

      const newBalance = (currentBalance + rechargeAmount).toFixed(2);
      await AsyncStorage.setItem('@transmitter_balance', newBalance);

      Alert.alert(
        t('metodoPago.successTitle', { defaultValue: '¡Recarga Exitosa!' }),
        `Se han abonado $${rechargeAmount.toFixed(2)} a tu saldo disponible.\nTu nuevo saldo es: $${newBalance}`,
        [
          {
            text: 'Aceptar',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error al guardar el saldo:', error);
      Alert.alert('Error', 'Ocurrió un problema al procesar el pago.');
    }
  };

  return (
    <LinearGradient
      colors={['#021B42', '#021B42']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.mainTitle}>{t('metodoPago.title')}</Text>

          {/* Campo Monto a Recargar */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Monto a ingresar ($)</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#999"
            />
          </View>

          {/* Nombre del titular */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('metodoPago.cardholderLabel')}</Text>
            <TextInput
              style={styles.input}
              value={cardholderName}
              onChangeText={setCardholderName}
              placeholder={t('metodoPago.cardholderPlaceholder')}
              placeholderTextColor="#999"
              autoCapitalize="words"
            />
          </View>

          {/* Número de Tarjeta con formato profesional (xxxx xxxx xxxx xxxx) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('metodoPago.cardNumberLabel')}</Text>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              keyboardType="numeric"
              maxLength={19}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.row}>
            {/* Fecha de Expiración (MM/YY) */}
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>{t('metodoPago.expireDateLabel')}</Text>
              <TextInput
                style={styles.input}
                value={expireDate}
                onChangeText={handleExpireDateChange}
                placeholder="MM/YY"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            {/* CVV (Máximo 3 dígitos) */}
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.label}>{t('metodoPago.cvvLabel')}</Text>
              <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={handleCvvChange}
                placeholder="123"
                placeholderTextColor="#999"
                keyboardType="numeric"
                secureTextEntry
                maxLength={3}
              />
            </View>
          </View>

          {/* Logos de Pasarelas */}
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

          {/* Botón Continuar */}
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={handleProcessPayment}
          >
            <Text style={styles.buttonText}>{t('metodoPago.continue')}</Text>
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
    paddingTop: 50,
    paddingBottom: 30,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
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
    marginTop: 10,
    marginBottom: 25,
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
  continueButton: {
    backgroundColor: '#55C900',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
