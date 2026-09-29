import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CategoriesScreen({ navigation }) {
  const { t } = useTranslation();

  const CATEGORIES_DATA = [
    { id: 'groceries', name: t('categoriesScreen.list.groceries', { defaultValue: 'Groceries' }), icon: 'bag-handle-sharp' },
    { id: 'health', name: t('categoriesScreen.list.health', { defaultValue: 'Health' }), icon: 'heart-sharp' },
    { id: 'clothing', name: t('categoriesScreen.list.clothing', { defaultValue: 'Clothing' }), icon: 'shirt-sharp' },
    { id: 'house', name: t('categoriesScreen.list.house', { defaultValue: 'House' }), icon: 'home-sharp' },
    { id: 'education', name: t('categoriesScreen.list.education', { defaultValue: 'Education' }), icon: 'school-sharp' },
    { id: 'cleaning', name: t('categoriesScreen.list.cleaning', { defaultValue: 'Cleaning' }), icon: 'sparkles-sharp' },
    { id: 'entertainment', name: t('categoriesScreen.list.entertainment', { defaultValue: 'Entertainment' }), icon: 'film-sharp' },
    { id: 'construction', name: t('categoriesScreen.list.construction', { defaultValue: 'Construction' }), icon: 'construct-sharp' },
  ];

  const [selectedCategories, setSelectedCategories] = useState(['clothing', 'cleaning']);
  const [amount, setAmount] = useState('');

  const toggleCategory = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

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

  const handleContinue = async () => {
    if (selectedCategories.length === 0) {
      Alert.alert(t('categoriesScreen.attentionTitle'), t('categoriesScreen.errorSelectCategory'));
      return;
    }

    if (!amount || amount.trim() === '') {
      Alert.alert(t('categoriesScreen.attentionTitle'), t('categoriesScreen.errorEnterAmount'));
      return;
    }

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert(t('categoriesScreen.attentionTitle'), t('categoriesScreen.errorValidAmount'));
      return;
    }

    // Cargar el saldo disponible del emisor desde AsyncStorage
    const savedBalance = await AsyncStorage.getItem('@transmitter_balance');
    const currentBalance = savedBalance !== null ? parseFloat(savedBalance) : 316.00;

    // Validación para no permitir enviar más dinero del saldo disponible
    if (numericAmount > currentBalance) {
      Alert.alert(
        t('categoriesScreen.limitExceededTitle', { defaultValue: 'Saldo insuficiente' }),
        `No puedes enviar más del saldo disponible ($${currentBalance.toFixed(2)})`
      );
      return;
    }

    const formattedAmount = numericAmount.toFixed(2);
    const newBalance = (currentBalance - numericAmount).toFixed(2);

    try {
      // Restar y guardar el nuevo saldo disponible del emisor
      await AsyncStorage.setItem('@transmitter_balance', newBalance);

      // Guardar los datos de la remesa enviada para la pantalla Store
      await AsyncStorage.setItem('@remittance_amount', formattedAmount);

      const categoriesToSave = selectedCategories.map((catId) => {
        const found = CATEGORIES_DATA.find((c) => c.id === catId);
        return {
          name: found ? found.name : catId,
          enabled: true,
        };
      });

      await AsyncStorage.setItem('@user_categories', JSON.stringify(categoriesToSave));
    } catch (e) {
      console.error('Error al guardar la transacción:', e);
    }

    navigation.navigate('Transaction', {
      selectedCategories,
      amount: formattedAmount,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.mainWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>{t('categoriesScreen.headerTitle')}</Text>
              <Text style={styles.headerSubtitle}>
                {t('categoriesScreen.headerSubtitle')}
              </Text>
            </View>
          </View>

          <View style={styles.gridContainer}>
            {CATEGORIES_DATA.map((item) => {
              const isSelected = selectedCategories.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.categoryCard,
                    isSelected && styles.selectedCategoryCard,
                  ]}
                  onPress={() => toggleCategory(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.categoryName}>{item.name}</Text>
                  <Ionicons
                    name={item.icon}
                    size={44}
                    color="#021533"
                    style={{ marginTop: 10 }}
                  />
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.overlayAmountSection}>
          <Text style={styles.amountLabel}>{t('categoriesScreen.amountLabel')}</Text>
          <Text style={styles.amountSublabel}>
            {t('categoriesScreen.amountSublabel', { max: '3000.00' })}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#94A3B8"
              maxLength={10}
            />
            <Text style={styles.currencyCode}>{t('categoriesScreen.currencyCode')}</Text>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>{t('categoriesScreen.continueButton')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021533',
    paddingTop: 50,
  },
  mainWrapper: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 230,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 135,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    position: 'relative',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedCategoryCard: {
    borderColor: '#52D017',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#52D017',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#021533',
  },
  overlayAmountSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#021533',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  amountLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  amountSublabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 14,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#021533',
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#021533',
  },
  currencyCode: {
    fontSize: 13,
    fontWeight: '600',
    color: '#021533',
  },
  continueButton: {
    backgroundColor: '#52D017',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});