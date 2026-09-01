import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

function getIconoPorCategoria(categoria) {
  switch (categoria) {
    case "Groceries":
      return "cart-outline";
    case "Medicine":
      return "medkit-outline";
    case "Construction":
      return "hammer-outline";
    default:
      return "pricetag-outline";
  }
}

export default function AllTransactions() {
  const transactions = [
    {
      name: "Walmart",
      category: "Groceries",
      location: "San Salvador",
      time: "10:24 am",
      amount: "$25.00",
    },
    {
      name: "Farmacia Don Bosco",
      category: "Medicine",
      location: "San Salvador",
      time: "10:45 am",
      amount: "$25.00",
    },
    {
      name: "Maxi Despensa",
      category: "Groceries",
      location: "San Salvador",
      time: "4:30 pm",
      amount: "$25.00",
    },
    {
      name: "Vidrí",
      category: "Construction",
      location: "San Salvador",
      time: "2:15 pm",
      amount: "$25.00",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All the transactions</Text>

      <View style={styles.content}>
        <View style={styles.historyHeader}>
          <Text style={styles.history}>History</Text>
          <Ionicons name="filter-outline" size={24} color="#021533" />
        </View>

        <View style={styles.dateBox}>
          <Text style={styles.date}>May 22, 2022</Text>
          <Ionicons name="calendar-outline" size={20} color="#55C900" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {transactions.map((transaction, index) => (
            <View key={index} style={styles.transactionCard}>
              <View style={styles.iconBox}>
                <Ionicons
                  name={getIconoPorCategoria(transaction.category)}
                  size={22}
                  color="#FFFFFF"
                />
              </View>

              <View style={styles.info}>
                <Text style={styles.name}>{transaction.name}</Text>
                <Text style={styles.details}>
                  {transaction.category} - {transaction.location}
                </Text>
                <Text style={styles.time}>{transaction.time}</Text>
              </View>

              <Text style={styles.amount}>{transaction.amount}</Text>
              <Text style={styles.completed}>Completed</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021B42",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 25,
    paddingBottom: 20,
  },

  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  history: {
    fontSize: 25,
    fontWeight: "600",
    color: "#021533",
  },

  dateBox: {
    height: 55,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginBottom: 10,
  },

  date: {
    fontSize: 17,
    color: "#202020",
  },

  list: {
    paddingTop: 5,
    paddingBottom: 20,
  },

  transactionCard: {
    minHeight: 105,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#A0ABC0",
    borderRadius: 12,
    marginBottom: 15,
    padding: 12,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: "#021533",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#021533",
    marginBottom: 5,
  },

  details: {
    fontSize: 14,
    color: "#202020",
    marginBottom: 5,
  },

  time: {
    fontSize: 14,
    fontWeight: "600",
    color: "#202020",
  },

  amount: {
    position: "absolute",
    top: 12,
    right: 14,
    fontSize: 13,
    color: "#A0ABC0",
  },

  completed: {
    position: "absolute",
    bottom: 12,
    right: 14,
    fontSize: 13,
    color: "#55C900",
  },
});