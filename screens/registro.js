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
import styles from "./styleRegistro";

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
   
    if (!fullName.trim() || !idNumber.trim() || !email.trim() || !password) {
      Alert.alert("Incomplete Fields", "Please fill in all fields.");
      return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(fullName)) {
      Alert.alert("Invalid Name", "Name must only contain letters.");
      return;
    }


    if (!/[A-Z]/.test(password)) {
      Alert.alert("Invalid Password", "Password must contain at least one uppercase letter.");
      return;
    }

    
    if (!/[$#/&?@!]/.test(password)) {
      Alert.alert("Invalid Password", "Password must contain at least one special character.");
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

      <View style={styles.topSection}>
        <Image
          source={require("../assets/KITELY.png")}
          style={styles.logo}
        />
      </View>

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
              icon="card-outline"
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

        {/* Bottom screen design */}
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