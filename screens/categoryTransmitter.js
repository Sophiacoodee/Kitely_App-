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

const CATEGORIES_DATA = [
  { id: 'groceries', name: 'Groceries', icon: 'bag-handle-sharp' },
  { id: 'health', name: 'Health', icon: 'heart-sharp' },
  { id: 'clothing', name: 'Clothing', icon: 'shirt-sharp' },
  { id: 'house', name: 'House', icon: 'home-sharp' },
  { id: 'education', name: 'Education', icon: 'school-sharp' },
  { id: 'cleaning', name: 'Cleaning', icon: 'sparkles-sharp' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film-sharp' },
  { id: 'construction', name: 'Construction', icon: 'construct-sharp' },
];

// Límite máximo de dinero permitido
const MAX_AMOUNT = 3000;

export default function CategoriesScreen({ navigation }) {
  const [selectedCategories, setSelectedCategories] = useState(['clothing']);
  const [amount, setAmount] = useState('');

  const toggleCategory = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  // Manejador del texto para prevenir letras, signos negativos o múltiples puntos
  const handleAmountChange = (text) => {
    // Reemplaza comas por puntos y elimina cualquier caracter que no sea número o punto decimal
    let cleanedText = text.replace(',', '.').replace(/[^0-9.]/g, '');

    // Evita ingresar múltiples puntos decimales
    const parts = cleanedText.split('.');
    if (parts.length > 2) {
      cleanedText = `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // Limita la cantidad a 2 decimales
    if (parts[1] && parts[1].length > 2) {
      cleanedText = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    setAmount(cleanedText);
  };

  const handleContinue = () => {
    // 1. Validar categorías seleccionadas
    if (selectedCategories.length === 0) {
      Alert.alert('Attention', 'Please select at least one category.');
      return;
    }

    // 2. Validar campo vacío o solo espacios
    if (!amount || amount.trim() === '') {
      Alert.alert('Attention', 'Please enter an amount.');
      return;
    }

    const numericAmount = parseFloat(amount);

    // 3. Validar si es un número válido y mayor a 0
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Attention', 'Please enter a valid amount greater than $0.00.');
      return;
    }

    // 4. Validar límite máximo de dinero
    if (numericAmount > MAX_AMOUNT) {
      Alert.alert(
        'Limit Exceeded',
        `The maximum allowed amount per transaction is $${MAX_AMOUNT.toLocaleString('en-US', { minimumFractionDigits: 2 })}.`
      );
      return;
    }

    navigation.navigate('TransmitterHome', {
      selectedCategories,
      amount: numericAmount.toFixed(2),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainWrapper}>
        {/* Sección Deslizable (Categorías) */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Categories</Text>
              <Text style={styles.headerSubtitle}>
                Choose one or more categories
              </Text>
            </View>
          </View>

          {/* Grilla de Selección de Categorías */}
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
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amountSublabel}>
            You send (USD) - Max: ${MAX_AMOUNT.toLocaleString()}
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
            <Text style={styles.currencyCode}>USD</Text>
          </View>

          {/* Botón Continuar */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#021B42',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
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