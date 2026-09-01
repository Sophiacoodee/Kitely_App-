import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Transaction({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction</Text>
      </View>

      <View style={styles.paperPlane}>
        <Ionicons name="paper-plane-outline" size={70} color="#FFFFFF" />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Categories you chose</Text>

        <View style={styles.inputBox}>
          <Ionicons name="cart-outline" size={20} color="#021533" style={styles.icon} />
          <Text style={styles.inputText}>Groceries</Text>
          <TouchableOpacity>
            <Ionicons name="close-outline" size={20} color="#9AA5AD" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Receiver</Text>

        <View style={styles.inputBox}>
          <View style={styles.receiverImage}>
            <Ionicons name="person" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.inputText}>Lucia Pocasangre</Text>
          <TouchableOpacity>
            <Ionicons name="close-outline" size={20} color="#9AA5AD" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Amount (USD)</Text>

        <View style={styles.amountBox}>
          <Text style={styles.amount}>$250</Text>
          <Text style={styles.currency}>USD</Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("AllTransactions")}
        >
          <Text style={styles.continueText}>Continue</Text>
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