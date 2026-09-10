import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "../firebase/config";
import styles from "./styleRegistro";

const CustomInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  icon,
  keyboardType = "default",
  editable = true,
  onPress,
}) => (
  <TouchableOpacity
    activeOpacity={onPress ? 0.7 : 1}
    onPress={onPress}
    style={styles.inputContainer}
  >
    <Ionicons name={icon} size={20} color="#021533" />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#A0A0A0"
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      editable={editable && !onPress}
      pointerEvents={onPress ? "none" : "auto"}
    />
  </TouchableOpacity>
);

export default function RegistroScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [dob, setDob] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [country, setCountry] = useState("El Salvador");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
      setDob(formattedDate);
    }
  };

  const handleRegister = async () => {
    if (
      !fullName.trim() ||
      !idNumber.trim() ||
      !dob.trim() ||
      !email.trim() ||
      !password
    ) {
      Alert.alert("Incomplete Fields", "Please fill in all fields.");
      return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(fullName)) {
      Alert.alert("Invalid Name", "Name must only contain letters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must contain at least one uppercase letter."
      );
      return;
    }

    if (!/[$#/&?@!]/.test(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must contain at least one special character."
      );
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
        fechaNacimiento: dob,
        pais: country,
        correo: email,
        uid: user.uid,
      });

      await AsyncStorage.setItem(
        "@user_data",
        JSON.stringify({
          fullName,
          idNumber,
          dob,
          country,
          email,
        })
      );

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
          resizeMode="contain"
        />
      </View>

      <View style={styles.whitePanel}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Send and receive support{"\n"}with purpose.
            </Text>

            {/* Full Name */}
            <View style={styles.fieldContainer}>
              <CustomInput
                icon="person"
                placeholder="Enter your complete name"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Identity Number */}
            <View style={styles.fieldContainer}>
              <CustomInput
                icon="card-outline"
                placeholder="Enter your identity number"
                value={idNumber}
                onChangeText={setIdNumber}
                keyboardType="numeric"
              />
            </View>

            {/* Date of Birth con Calendario */}
            <View style={styles.fieldContainer}>
              <CustomInput
                icon="calendar-outline"
                placeholder="Select date of birth"
                value={dob}
                editable={false}
                onPress={() => setShowDatePicker(true)}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            {/* Country Selector */}
            <View style={styles.fieldContainer}>
              <Text
                style={{
                  fontSize: 13,
                  color: "#021533",
                  marginBottom: 6,
                  fontWeight: "600",
                }}
              >
                Select Country
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginRight: 6,
                    paddingVertical: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor:
                      country === "El Salvador" ? "#021533" : "#D1D5DB",
                    backgroundColor:
                      country === "El Salvador" ? "#021533" : "#F3F4F6",
                    alignItems: "center",
                  }}
                  onPress={() => setCountry("El Salvador")}
                >
                  <Text
                    style={{
                      color: country === "El Salvador" ? "#FFFFFF" : "#374151",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    {"\uD83C\uDDF8\uD83C\uDDFB"} El Salvador
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginLeft: 6,
                    paddingVertical: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor:
                      country === "United States" ? "#021533" : "#D1D5DB",
                    backgroundColor:
                      country === "United States" ? "#021533" : "#F3F4F6",
                    alignItems: "center",
                  }}
                  onPress={() => setCountry("United States")}
                >
                  <Text
                    style={{
                      color:
                        country === "United States" ? "#FFFFFF" : "#374151",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    {"\uD83C\uDDFA\uD83C\uDDF8"} United States
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <CustomInput
                icon="mail"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            {/* Password */}
            <View style={styles.fieldContainer}>
              <CustomInput
                icon="lock-closed"
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation && navigation.navigate("Login")}
              >
                <Text style={styles.signUp}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}