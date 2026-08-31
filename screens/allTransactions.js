import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
 
export default function AllTransactions() {
  const transactions = [
    {
      icon: "",
      name: "Walmart",
      category: "Groceries",
      location: "San Salvador",
      time: "10:24 a:m",
      amount: "$25.00",
    },
    {
      icon: "",
      name: "Farmacia Don Bosco",
      category: "Medicine",
      location: "San Salvador",
      time: "10:45 a:m",
      amount: "$25.00",
    },
    {
      icon: "",
      name: "Maxi Despensa",
      category: "Groceries",
      location: "San Salvador",
      time: "4:30 p:m",
      amount: "$25.00",
    },
    {
      icon: "",
      name: "Vidri",
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
 
          <Text style={styles.filter}></Text>
        </View>
 
        <View style={styles.dateBox}>
          <Text style={styles.date}>May 22, 2022</Text>
          <Text style={styles.calendar}></Text>
        </View>
 

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {transactions.map((transaction, index) => (
            <View style={styles.transactionCard} key={index}>
 
             
              <View style={styles.iconBox}>
                <Text style={styles.icon}>{transaction.icon}</Text>
              </View>
 
             
              <View style={styles.info}>
                <Text style={styles.name}>{transaction.name}</Text>
 
                <Text style={styles.details}>
                  {transaction.category} - {transaction.location}
                </Text>
 
                <Text style={styles.time}>
                  {transaction.time}
                </Text>
              </View>
 
            
              <View style={styles.rightInfo}>
                <Text style={styles.amount}>
                  {transaction.amount}
                </Text>
 
                <Text style={styles.completed}>
                  Completed
                </Text>
              </View>
 
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
    backgroundColor: "#050505",
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
 
  filter: {
    fontSize: 28,
    color: "#202020",
  },
 
  dateBox: {
    height: 55,
    backgroundColor: "#FFFFFF",
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
 
  calendar: {
    fontSize: 22,
  },
 
  list: {
    paddingTop: 5,
    paddingBottom: 20,
  },
 
  transactionCard: {
    minHeight: 105,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#A0ABC0",
    marginBottom: 15,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
 
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#021533",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
 
  icon: {
    fontSize: 25,
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
 
  rightInfo: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
 
  amount: {
    fontSize: 13,
    color: "#A0ABC0",
  },
 
  completed: {
    fontSize: 13,
    color: "#55C900",
  },
});
 