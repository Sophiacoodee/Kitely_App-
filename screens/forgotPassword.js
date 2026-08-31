import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import styles from "./stylePassword";

export default function ForgotPasswordScreen({ navigation }) {
  const [emailToReset, setEmailToReset] = useState("");

  const handleSendCode = () => {
    if (!emailToReset.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    sendPasswordResetEmail(auth, emailToReset.trim())
      .then(() => {
        Alert.alert(
          "Success",
          "Check your email for instructions to reset your password"
        );
        if (navigation) {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.forgotContainer}>
      <View style={styles.forgotContent}>
        <View style={styles.forgotIconContainer}>
          <Ionicons name="lock-closed" size={60} color="#FFFFFF" />
        </View>

        <Text style={styles.forgotTitle}>Forgot your password?</Text>
        <Text style={styles.forgotSubtitle}>
          Enter your email address and we'll send you a link to recover it.
        </Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.forgotLabel}>Email address</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={18} color="#021533" />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#A0A0A0"
              value={emailToReset}
              onChangeText={setEmailToReset}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.forgotButton} onPress={handleSendCode}>
          <Text style={styles.forgotButtonText}>Send link</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity
          onPress={() => navigation && navigation.navigate("Login")}
        >
          <Text style={styles.returnText}>Return to log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}