import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

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

const INITIAL_TRANSACTIONS = [
  {
    id: "1",
    name: "Walmart",
    category: "Groceries",
    location: "San Salvador",
    time: "10:24 am",
    amount: "$25.00",
    date: "2026-05-22",
  },
  {
    id: "2",
    name: "Farmacia Don Bosco",
    category: "Medicine",
    location: "San Salvador",
    time: "10:45 am",
    amount: "$25.00",
    date: "2026-05-22",
  },
  {
    id: "3",
    name: "Maxi Despensa",
    category: "Groceries",
    location: "San Salvador",
    time: "4:30 pm",
    amount: "$25.00",
    date: "2026-05-22",
  },
  {
    id: "4",
    name: "Vidrí",
    category: "Construction",
    location: "San Salvador",
    time: "2:15 pm",
    amount: "$25.00",
    date: "2026-05-22",
  },
];

const CATEGORIES = ["All", "Groceries", "Medicine", "Construction"];

export default function AllTransactions({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date("2026-05-22"));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
    }
  };

  const filteredTransactions = INITIAL_TRANSACTIONS.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesDate =
      item.date === dayjs(selectedDate).format("YYYY-MM-DD");
    return matchesCategory && matchesDate;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#021B42" />
        </TouchableOpacity>
        <Text style={styles.title}>All the transactions</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Subheader con botón de filtro */}
        <View style={styles.historyHeader}>
          <Text style={styles.history}>
            History {selectedCategory !== "All" && `(${selectedCategory})`}
          </Text>
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <Ionicons name="filter-outline" size={24} color="#021533" />
          </TouchableOpacity>
        </View>

        {/* Caja de selección de fecha */}
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.date}>
            {dayjs(selectedDate).format("MMM DD, YYYY")}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#55C900" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Lista de transacciones */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
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
            ))
          ) : (
            <Text style={styles.emptyText}>
              No transactions found for this date.
            </Text>
          )}
        </ScrollView>
      </View>

      {/* Modal de Filtros de Categoría */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Category</Text>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterOption,
                  selectedCategory === cat && styles.activeFilterOption,
                ]}
                onPress={() => {
                  setSelectedCategory(cat);
                  setShowFilterModal(false);
                }}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedCategory === cat && styles.activeFilterText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021B42",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  backButton: {
    padding: 4,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
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
    fontSize: 22,
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
  emptyText: {
    textAlign: "center",
    color: "#A0ABC0",
    marginTop: 30,
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#021533",
    marginBottom: 15,
    textAlign: "center",
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  activeFilterOption: {
    backgroundColor: "#EEFAD8",
  },
  filterText: {
    fontSize: 16,
    color: "#021533",
  },
  activeFilterText: {
    fontWeight: "bold",
    color: "#55C900",
  },
});