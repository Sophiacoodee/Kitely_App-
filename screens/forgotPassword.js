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
import { useTranslation } from "react-i18next";
import styles from "./stylePassword";

export default function ForgotPasswordScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const { t } = useTranslation();

  const [emailToReset, setEmailToReset] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (!emailToReset.trim()) {
      Alert.alert(t('forgotPassword.errorTitle'), t('forgotPassword.errorEmailRequired'));
      return;
    }

    setLoading(true);

    sendPasswordResetEmail(auth, emailToReset.trim())
      .then(() => {
        Alert.alert(
          t('forgotPassword.successTitle'),
          t('forgotPassword.successMessage')
        );
        if (navigation) {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        Alert.alert(t('forgotPassword.errorTitle'), error.message);
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

            <Text style={styles.forgotTitle}>{t('forgotPassword.title')}</Text>
            <Text style={styles.forgotSubtitle}>
              {t('forgotPassword.subtitle')}
            </Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.forgotLabel}>{t('forgotPassword.emailLabel')}</Text>

              <View style={styles.inputContainer}>
                <Ionicons name="mail" size={18} color="#021533" />
                <TextInput
                  style={styles.input}
                  placeholder={t('forgotPassword.emailPlaceholder')}
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
                <Text style={styles.forgotButtonText}>{t('forgotPassword.sendButton')}</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>{t('forgotPassword.or')}</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              onPress={() => navigation && navigation.navigate("Login")}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Text style={styles.returnText}>{t('forgotPassword.returnLogin')}</Text>
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