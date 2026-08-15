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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

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

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      Alert.alert("Welcome back!", `Logged in as: ${user.email}`);


      if (navigation) navigation.navigate("Home");
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        Alert.alert(
          "Login Failed",
          "Invalid email or password. Please try again."
        );
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue using Kitely.
          </Text>

          <View style={styles.fieldContainer}>
            <CustomInput
              icon="mail"
              placeholder="Enter your email"
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

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation && navigation.navigate("Registro")
              }
            >
              <Text style={styles.signUp}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>

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
            width="95"
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
    height: "25%",
    backgroundColor: "#021B42",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  logo: {
    width: 165,
    height: 90,
    resizeMode: "contain",
  },
  whitePanel: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    overflow: "hidden",
  },
  content: {
    paddingHorizontal: 35,
    paddingTop: 38,
    zIndex: 5,
  },
  title: {
    fontSize: 29,
    fontWeight: "700",
    color: "#021533",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#667085",
    marginBottom: 25,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    height: 55,
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
    marginLeft: 8,
    paddingVertical: 0,
  },
  button: {
    height: 57,
    backgroundColor: "#55C900",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    zIndex: 10,
  },
  footerText: {
    color: "#8A8A8A",
    fontSize: 16,
  },
  signUp: {
    color: "#173C53",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 7,
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
    bottom: -4,
    left: "15%",
  },
});