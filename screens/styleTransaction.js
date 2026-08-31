import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
 
  header: {
    alignItems: "center",
    paddingTop: 20,
  },
 
  title: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "600",
  },
 
  paperPlane: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
 
  plane: {
    color: "#ffffff",
    fontSize: 90,
    transform: [{ rotate: "-25deg" }],
  },
 
  card: {
    flex: 1,
    backgroundColor: "#173C53",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
 
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 8,
  },
 
  inputBox: {
    height: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 5,
  },
 
  categoryIcon: {
    fontSize: 25,
    marginRight: 15,
  },
 
  receiverImage: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#dddddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
 
  inputText: {
    flex: 1,
    color: "#343434",
    fontSize: 16,
  },
 
  close: {
    color: "#555555",
    fontSize: 24,
  },
 
  amountBox: {
    height: 55,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
 
  amount: {
    flex: 1,
    fontSize: 18,
    color: "#333333",
  },
 
  currency: {
    fontSize: 16,
    color: "#555555",
  },
 
  continueButton: {
    height: 50,
    backgroundColor: "#55C900",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
 
  continueText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});