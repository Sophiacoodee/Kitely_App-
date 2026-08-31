import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
 
export default function Transaction({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        
      <View style={styles.header}>
        <Text style={styles.title}>Transaction</Text>
      </View>
 
      <View style={styles.paperPlane}>
        <Text style={styles.plane}></Text>
      </View>
 
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Categories you chose</Text>
 
        <View style={styles.inputBox}>
          <Text style={styles.categoryIcon}></Text>
          <Text style={styles.inputText}>Groceries</Text>
          <Text style={styles.close}>x</Text>
        </View>
 
        <Text style={styles.sectionTitle}>Receiver</Text>
 
        <View style={styles.inputBox}>
          <View style={styles.receiverImage}>
            <Text></Text>
          </View>
 
          <Text style={styles.inputText}>Lucia Pocasan­gre</Text>
          <Text style={styles.close}>x</Text>
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