import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021B42",
  },
  scrollContent: {
    flexGrow: 1,
  },

  topSection: {
    backgroundColor: "#021B42",
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? 20 : 10,
    paddingBottom: 25,
  },
  headerTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  notificationButton: {
    padding: 4,
  },
  welcomeContainer: {
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitleText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
    lineHeight: 18,
  },
  balanceContainer: {
    marginTop: 5,
  },
  balanceLabel: {
    fontSize: 12,
    color: "#55C900",
    fontWeight: "600",
    fontStyle: "italic",
  },
  balanceAmount: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 2,
  },

  whitePanel: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  quickActionCard: {
    backgroundColor: "#FFFFFF",
    width: (width - 40 - 24) / 3,
    height: 90,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#021B42",
    textAlign: "center",
    marginTop: 6,
  },

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