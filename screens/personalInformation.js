import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function PersonalInformationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = auth.currentUser;
      
      // 1. Cargar la imagen guardada de perfil específica para el usuario actual
      if (currentUser) {
        const savedImage = await AsyncStorage.getItem(`@user_profile_image_${currentUser.uid}`);
        if (savedImage) setProfileImage(savedImage);

        // 2. Cargar datos desde Firestore
        const docRef = doc(db, "Usuarios", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFullName(userData.nombre || currentUser.displayName || "");
          setEmail(userData.correo || currentUser.email || "");
          setIdNumber(userData.identidad || "");
          setDob(userData.fechaNacimiento || "");
          setCountry(userData.pais || "");
        } else {
          if (currentUser.displayName) setFullName(currentUser.displayName);
          if (currentUser.email) setEmail(currentUser.email);
        }
      } else {
        // 3. Respaldo desde AsyncStorage si no hay usuario en auth
        const savedUser = await AsyncStorage.getItem("@user_data");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          if (user.fullName) setFullName(user.fullName);
          if (user.email) setEmail(user.email);
          if (user.idNumber) setIdNumber(user.idNumber);
          if (user.dob) setDob(user.dob);
          if (user.country) setCountry(user.country);
        }
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name || name.trim() === "") return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Se requieren permisos para acceder a tu galería."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setProfileImage(selectedUri);

      // Guardar la imagen con una clave única vinculada al UID del usuario
      const currentUser = auth.currentUser;
      if (currentUser) {
        await AsyncStorage.setItem(
          `@user_profile_image_${currentUser.uid}`,
          selectedUri
        );
      } else {
        await AsyncStorage.setItem("@user_profile_image", selectedUri);
      }
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#55C900" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation && navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Personal Information</Text>
            <View style={styles.headerPlaceholder} />
          </View>

          {/* Avatar con Imagen o Iniciales */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={pickImage}
              style={styles.avatarWrapper}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{getInitials(fullName)}</Text>
                </View>
              )}
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <Text style={styles.userNameText}>
              {fullName !== "" ? fullName : "User"}
            </Text>
          </View>

          {/* Formulario de Solo Lectura */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full name</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={fullName}
                editable={false}
                placeholder="not provided"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={email}
                editable={false}
                placeholder="not provided"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Identity number</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={idNumber}
                editable={false}
                placeholder="not provided"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date of birth</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={dob}
                editable={false}
                placeholder="not provided"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={country}
                editable={false}
                placeholder="not provided"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021B42",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    marginTop: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerPlaceholder: {
    width: 28,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatarCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#D1E7DD",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#14452F",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#55C900",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#021B42",
  },
  userNameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 6,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#94A3B8",
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#0F172A",
  },
  disabledInput: {
    backgroundColor: "#1E293B",
    color: "#CBD5E1",
    borderWidth: 1,
    borderColor: "#334155",
  },
});