import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
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

export default function CategoriesScreen({ navigation }) {
  const [selectedCategories, setSelectedCategories] = useState(['clothing']);
  const [amount, setAmount] = useState('250.00');

  const toggleCategory = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleContinue = () => {
    if (selectedCategories.length === 0) {
      Alert.alert('Attention', 'Please select at least one category.');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Attention', 'Please enter a valid amount.');
      return;
    }

    navigation.navigate('TransmitterHome', {
      selectedCategories,
      amount,
    });
  };

  return (
    <View style={styles.container}>
      {/* Sección Deslizable (Categorías) */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
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

        {/* Grilla de Selección de Categorías */}
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
      </ScrollView>

      {/* Sección del Monto y Continuar Sobrepuesta / Flotante */}
      <View style={styles.overlayAmountSection}>
        <Text style={styles.amountLabel}>Amount</Text>
        <Text style={styles.amountSublabel}>You send (USD)</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#94A3B8"
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
    paddingTop: 50,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 230, // Espacio suficiente para que el último elemento se lea completo sobre la tarjeta
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 14,
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
  // Contenedor Sobrepuesto Flotante al Fondo
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