import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  forgotContainer: {
    flex: 1,
    backgroundColor: "#021B42",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  forgotContent: {
    alignItems: "center",
    width: "100%",
  },
  forgotIconContainer: {
    marginBottom: 20,
  },
  forgotTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },
  forgotSubtitle: {
    fontSize: 14,
    color: "#A0ABC0",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  fieldContainer: {
    marginBottom: 20,
    width: "100%",
  },
  forgotLabel: {
    color: "#FFFFFF",
    marginBottom: 8,
    fontSize: 15,
    marginLeft: 4,
  },
  inputContainer: {
    height: 58,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#021533",
    marginLeft: 13,
    paddingVertical: 0,
  },
  forgotButton: {
    height: 57,
    backgroundColor: "#55C900",
    width: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  forgotButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#2C4066",
  },
  orText: {
    color: "#A0ABC0",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  returnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;