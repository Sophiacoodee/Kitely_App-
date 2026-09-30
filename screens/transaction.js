import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Transaction({ route, navigation }) {
  const { t } = useTranslation();
  const { selectedCategories = ['groceries'], amount = '0.00' } = route.params || {};
  const [loading, setLoading] = useState(false);

  const displayCategory = selectedCategories.map(
    (cat) => cat.charAt(0).toUpperCase() + cat.slice(1)
  ).join(', ');

  const handleConfirmTransaction = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
      const numericAmount = parseFloat(amount) || 0;

      // 1. Guardar en Firebase (Firestore)
      await addDoc(collection(db, "transactions"), {
        category: displayCategory || "Groceries",
        name: "Super Selectos",
        location: "San Salvador",
        amount: `$${amount}`,
        date: dateStr,
        time: timeStr,
        createdAt: serverTimestamp(),
      });

      // 2. Crear la tarjeta rectangular para el historial de TransmitterHome (con signo -)
      const primaryCatKey = (selectedCategories[0] || 'food').toLowerCase();
      const newTransactionCard = {
        id: Date.now().toString(),
        title: "Super Selectos",
        subtitle: `${displayCategory} • Just now`,
        amount: `-$${numericAmount.toFixed(2)}`,
        rawAmount: numericAmount,
        status: 'Completed',
        dateText: 'Just now',
        icon: primaryCatKey.includes('medic') ? 'medical' : primaryCatKey.includes('construc') ? 'construct' : 'cart',
        categoryKey: primaryCatKey.includes('medic') ? 'medicine' : primaryCatKey.includes('construc') ? 'construction' : 'food',
      };

      // 3. Apilar la transacción en AsyncStorage para que aparezca en el historial del Home
      const existingTransactions = await AsyncStorage.getItem('@transmitter_transactions');
      const transactionsList = existingTransactions ? JSON.parse(existingTransactions) : [];
      const updatedList = [newTransactionCard, ...transactionsList];
      await AsyncStorage.setItem('@transmitter_transactions', JSON.stringify(updatedList));

      // NOTA: Ya no tocamos ni restamos aquí el balance duplicado para evitar saltos extraños de dinero.

      setLoading(false);
      navigation.navigate("Canje", {
        amount,
        category: displayCategory,
        date: dateStr,
      });
    } catch (error) {
      setLoading(false);
      console.error("Error al guardar transacción:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('transaction.headerTitle')}</Text>
      </View>

      <View style={styles.paperPlane}>
        <Ionicons name="paper-plane-outline" size={70} color="#FFFFFF" />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('transaction.sectionCategories')}</Text>

        <View style={styles.inputBox}>
          <Ionicons name="cart-outline" size={20} color="#021533" style={styles.icon} />
          <Text style={styles.inputText}>{displayCategory}</Text>
          <TouchableOpacity>
            <Ionicons name="close-outline" size={20} color="#9AA5AD" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>{t('transaction.sectionReceiver')}</Text>

        <View style={styles.inputBox}>
          <View style={styles.receiverImage}>
            <Ionicons name="person" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.inputText}>Super Selectos</Text>
          <TouchableOpacity>
            <Ionicons name="close-outline" size={20} color="#9AA5AD" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>{t('transaction.sectionAmount')}</Text>

        <View style={styles.amountBox}>
          <Text style={styles.amount}>${amount}</Text>
          <Text style={styles.currency}>{t('transaction.currency')}</Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleConfirmTransaction}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.continueText}>{t('transaction.continue')}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021B42",
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  paperPlane: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  card: {
    flex: 1,
    backgroundColor: "#0A2E63",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 28,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputBox: {
    height: 55,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: "#021533",
    fontStyle: "italic",
  },
  receiverImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#8AA0C0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  amountBox: {
    height: 55,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  amount: {
    fontSize: 16,
    color: "#021533",
    fontStyle: "italic",
  },
  currency: {
    fontSize: 14,
    color: "#9AA5AD",
    fontWeight: "600",
  },
  continueButton: {
    height: 56,
    backgroundColor: "#55C900",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});