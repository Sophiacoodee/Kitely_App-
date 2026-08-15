import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path, Polygon } from "react-native-svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const CustomInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  icon,
  keyboardType = "default",
}) => (
  <View style={styles.inputContainer}>
    <Ionicons name={icon} size={20} color="#021533" />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#A0A0A0"
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

export default function RegistroScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !idNumber || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "Usuarios", user.uid), {
        nombre: fullName,
        identidad: idNumber,
        correo: email,
        uid: user.uid,
      });

      Alert.alert("Success!", "User registered successfully.");

      if (navigation) navigation.navigate("Login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Email Exists", "This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Invalid Email", "The email entered is not valid.");
      } else if (error.code === "auth/weak-password") {
        Alert.alert(
          "Weak Password",
          "Password must be at least 6 characters long."
        );
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header Section */}
      <View style={styles.topSection}>
        <Image
          source={require("../assets/KITELY.png")}
          style={styles.logo}
        />
      </View>

      {/* Main White Card Panel */}
      <View style={styles.whitePanel}>
        <View style={styles.content}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            Send and receive support{"\n"}with purpose.
          </Text>

          <View style={styles.fieldContainer}>
            <CustomInput
              icon="person"
              placeholder="Enter your complete name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.fieldContainer}>
            <CustomInput
              icon="eye-off-outline"
              placeholder="Enter your identity number"
              value={idNumber}
              onChangeText={setIdNumber}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.fieldContainer}>
            <CustomInput
              icon="mail"
              placeholder="Enter your gmail or username"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.fieldContainer}>
            <CustomInput
              icon="lock-closed"
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation && navigation.navigate("Login")}>
              <Text style={styles.signUp}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Decorative Wave & Kite */}
        <View style={styles.decoration} pointerEvents="none">
          <Svg
            width="100%"
            height="125"
            viewBox="0 0 400 125"
            style={styles.wave}
          >
            <Path
              d="M0 72 C75 67 125 83 190 82 C275 80 325 50 400 10 L400 125 L0 125 Z"
              fill="#D8D4FF"
            />
            <Path
              d="M0 91 C75 86 125 101 190 100 C275 98 325 69 400 28 L400 125 L0 125 Z"
              fill="#BDB7F5"
            />
          </Svg>

          <Svg
            width="100"
            height="120"
            viewBox="0 0 95 120"
            style={styles.kite}
          >
            <Polygon
              points="48,10 72,32 50,55 27,32"
              fill="none"
              stroke="#55A605"
              strokeWidth="3"
            />
            <Path
              d="M48 10 L50 55"
              fill="none"
              stroke="#55A605"
              strokeWidth="3"
            />
            <Path
              d="M50 55 C55 68 51 75 42 82 C32 89 23 86 16 94 C10 101 13 108 7 116"
              fill="none"
              stroke="#55A605"
              strokeWidth="3"
            />
            <Polygon
              points="17,89 27,97 23,108 13,101 14,92"
              fill="none"
              stroke="#55A605"
              strokeWidth="2.5"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021B42",
  },
  topSection: {
    height: "22%",
    backgroundColor: "#021B42",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  logo: {
    width: 170,
    height: 85,
    resizeMode: "contain",
  },
  whitePanel: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 35,
    zIndex: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#021533",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#667085",
    lineHeight: 20,
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  inputContainer: {
    height: 56,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#021533",
    marginLeft: 12,
    paddingVertical: 0,
  },
  button: {
    height: 56,
    backgroundColor: "#55C900",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    zIndex: 10,
  },
  footerText: {
    color: "#8A8A8A",
    fontSize: 15,
  },
  signUp: {
    color: "#021533",
    fontSize: 15,
    fontWeight: "700",
  },
  decoration: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 135,
    zIndex: 1,
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  kite: {
    position: "absolute",
    bottom: -10,
    left: "18%",
  },
});