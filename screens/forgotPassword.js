import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import styles from "./stylePassword";

export default function ForgotPasswordScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  const [emailToReset, setEmailToReset] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (!emailToReset.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setLoading(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={responsiveStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#021B42" />
      <ScrollView
        contentContainerStyle={responsiveStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.forgotContainer,
            isTablet && responsiveStyles.tabletWrapper,
          ]}
        >
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
                  editable={!loading}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.forgotButton,
                loading && responsiveStyles.disabledButton,
              ]}
              onPress={handleSendCode}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.forgotButtonText}>Send link</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              onPress={() => navigation && navigation.navigate("Login")}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Text style={styles.returnText}>Return to log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const responsiveStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#021B42",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  tabletWrapper: {
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
});