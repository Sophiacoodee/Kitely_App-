import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function inicioReceptorScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#021B42", "#061F4A"]}
        style={styles.header}
      >
        <Image
          source={require("../../assets/images/KITELY.png")}
          style={styles.logo}
        />

        <Text style={styles.greeting}>Hello, Sandra!</Text>

        <Text style={styles.subtitle}>
          Transparent remittances, stronger{"\n"}
          connections.
        </Text>

        <TouchableOpacity style={styles.profileButton}>
          <Ionicons
            name="person"
            size={34}
            color="#021B42"
          />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.whiteContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons
              name="people"
              size={32}
              color="#021B42"
            />
            <Text style={styles.buttonText}>
              Beneficiaries
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Ionicons
              name="qr-code"
              size={32}
              color="#021B42"
            />
            <Text style={styles.buttonText}>
              Scan Code
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Ionicons
              name="time"
              size={34}
              color="#021B42"
            />
            <Text style={styles.buttonText}>
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 330,
    paddingHorizontal: 32,
    paddingTop: 35,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    position: "relative",
  },

  logo: {
    width: 175,
    height: 70,
    resizeMode: "contain",
    marginBottom: 28,
  },

  greeting: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 22,
    color: "#FFFFFF",
    marginTop: 5,
    lineHeight: 30,
  },

  profileButton: {
    position: "absolute",
    right: 30,
    top: 75,
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  whiteContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -5,
    paddingTop: 25,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 25,
  },

  menuButton: {
    width: 105,
    height: 108,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },

  buttonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#021B42",
    textAlign: "center",
  },
});