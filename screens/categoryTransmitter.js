import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const MAX_AMOUNT = 3000;

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

  const [selectedCategories, setSelectedCategories] = useState(['clothing']);
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

  const handleContinue = () => {
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

    if (numericAmount > MAX_AMOUNT) {
      Alert.alert(
        t('categoriesScreen.limitExceededTitle'),
        t('categoriesScreen.limitExceededMessage', { max: MAX_AMOUNT.toLocaleString('en-US', { minimumFractionDigits: 2 }) })
      );
      return;
    }

    navigation.navigate('Transaction', {
      selectedCategories,
      amount: numericAmount.toFixed(2),
    });
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <View style={styles.mainWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
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
                    color="#021024"
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
            {t('categoriesScreen.amountSublabel', { max: MAX_AMOUNT.toLocaleString() })}
          </Text>
=======
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Categories</Text>
            <Text style={styles.headerSubtitle}>Choose one or more categories</Text>
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
                  isSelected && styles.selectedCategoryCard
                ]}
                onPress={() => toggleCategory(item.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.categoryName}>{item.name}</Text>
                <Ionicons 
                  name={item.icon} 
                  size={44} 
                  color="#021024" 
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

        <View style={styles.overlayAmountSection}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amountSublabel}>You send (USD)</Text>
>>>>>>> rodrigo

          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.input}
              value={amount}
<<<<<<< HEAD
              onChangeText={handleAmountChange}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#94A3B8"
              maxLength={10}
            />
            <Text style={styles.currencyCode}>{t('categoriesScreen.currencyCode')}</Text>
          </View>

          <TouchableOpacity
=======
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.currencyCode}>USD</Text>
          </View>

          <TouchableOpacity 
>>>>>>> rodrigo
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
<<<<<<< HEAD
            <Text style={styles.continueButtonText}>{t('categoriesScreen.continueButton')}</Text>
          </TouchableOpacity>
        </View>
      </View>
=======
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
>>>>>>> rodrigo
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
    paddingTop: 50,
  },
  mainWrapper: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
<<<<<<< HEAD
    paddingBottom: 230,
=======
    paddingBottom: 40,
>>>>>>> rodrigo
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
  },
  selectedCategoryCard: {
    borderWidth: 3.5,
    borderColor: '#55C900',
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#55C900',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#021024',
  },
  overlayAmountSection: {
    backgroundColor: '#021B42',
    paddingTop: 16,
    paddingBottom: 10,
    marginTop: 10,
  },
  amountLabel: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#94A3B8',
  },
  amountSublabel: {
    fontSize: 13,
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
    color: '#021024',
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#021024',
  },
  currencyCode: {
    fontSize: 13,
    fontWeight: '600',
    color: '#021024',
  },
  continueButton: {
    backgroundColor: '#55C900',
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