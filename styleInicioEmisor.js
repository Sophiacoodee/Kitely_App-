import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021B42",
  },
  // Header Azul
  topSection: {
    backgroundColor: "#021B42",
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: 25,
  },
  headerTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 110,
    height: 50,
    resizeMode: "contain",
  },
  notificationButton: {
    padding: 4,
  },
  welcomeContainer: {
    marginBottom: 18,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.85,
    lineHeight: 18,
  },
  balanceContainer: {
    marginTop: 5,
  },
  balanceLabel: {
    fontSize: 13,
    color: "#55C900",
    fontWeight: "600",
    marginBottom: 2,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  whitePanel: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#021533",
    marginBottom: 15,
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionCard: {
    backgroundColor: "#FFFFFF",
    width: (width - 40 - 24) / 3,
    height: 95,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    // Sombras
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionLabel: {
    fontSize: 11,
    color: "#021533",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
});

export default styles;