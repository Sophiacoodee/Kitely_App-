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
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function PublicProfileScreen({ navigation, route }) {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const targetUserId = route?.params?.userId || auth.currentUser?.uid;

  useEffect(() => {
    loadUserData();
  }, [targetUserId]);

  const loadUserData = async () => {
    try {
      if (targetUserId) {
        const docRef = doc(db, "Usuarios", targetUserId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFullName(userData.nombre || "");
          setCountry(userData.pais || "");

          if (userData.fotoPerfil) {
            setProfileImage(userData.fotoPerfil);
          } else {
            const savedImage = await AsyncStorage.getItem(
              `@user_profile_image_${targetUserId}`
            );
            if (savedImage) setProfileImage(savedImage);
          }
        }
      } else {
        const savedUser = await AsyncStorage.getItem("@user_data");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          if (user.fullName) setFullName(user.fullName);
          if (user.country) setCountry(user.country);
        }
      }
    } catch (error) {
      console.error("Error al cargar la información del usuario:", error);
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
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation && navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t("personalInformation.title")}</Text>
            <View style={styles.headerPlaceholder} />
          </View>

          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{getInitials(fullName)}</Text>
                </View>
              )}
            </View>

            <Text style={styles.userNameText}>
              {fullName !== "" ? fullName : t("personalInformation.userFallback")}
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t("personalInformation.fullName")}</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={fullName}
                editable={false}
                placeholder={t("personalInformation.placeholder")}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t("personalInformation.country")}</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={country}
                editable={false}
                placeholder={t("personalInformation.placeholder")}
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