import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0A192F",
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pieChartPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesList: {
    flex: 1,
    marginLeft: 15,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryName: {
    flex: 1,
    fontSize: 13,
    fontWeight: "bold",
  },
  categoryPercent: {
    fontSize: 12,
    color: "#666",
    marginRight: 8,
  },
  categoryAmount: {
    fontSize: 13,
    fontWeight: "bold",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  transSubtitle: {
    fontSize: 11,
    color: "#55C900",
  },
  transAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  transStatus: {
    fontSize: 10,
    color: "#888",
  },
});