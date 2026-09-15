import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase/config";
import styles from "./styleLogin";

const CustomInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  icon,
}) => (
  <View style={styles.inputContainer}>
    <Ionicons name={icon} size={18} color="#021533" />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#A0A0A0"
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
    />
  </View>
);

export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        t("login.incompleteTitle", { defaultValue: "Incomplete Fields" }),
        t("login.incompleteMsg", { defaultValue: "Please enter both email and password." })
      );
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      Alert.alert(
        t("login.welcome", { defaultValue: "Welcome!" }),
        `Logged in as: ${user.email}`
      );

      if (navigation) navigation.replace("Selectrol");
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        Alert.alert(
          t("login.loginFailedTitle", { defaultValue: "Login Failed" }),
          t("login.loginFailedMsg", { defaultValue: "Invalid email or password. Please try again." })
        );
      } else if (error.code === "auth/invalid-email") {
        Alert.alert(
          t("login.invalidEmailTitle", { defaultValue: "Invalid Email" }),
          t("login.invalidEmailMsg", { defaultValue: "Please enter a valid email address." })
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
          <Text style={styles.title}>{t("login.title")}</Text>
          <Text style={styles.subtitle}>
            {t("login.subtitle")}
          </Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>{t("login.emailLabel")}</Text>
            <CustomInput
              icon="mail"
              placeholder={t("login.emailPlaceholder")}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>{t("login.passLabel")}</Text>
            <CustomInput
              icon="lock-closed"
              placeholder={t("login.passPlaceholder")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={{ textAlign: "right", color: "#667085", marginTop: 3 }}>
              {t("login.forgotPass")}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>{t("login.loginButton")}</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{t("login.noAccount")}</Text>
            <TouchableOpacity
              onPress={() => navigation && navigation.navigate("Registro")}
            >
              <Text style={styles.signUp}>{t("login.signUp")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}