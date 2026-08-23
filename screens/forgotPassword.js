import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { Alert } from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../firebase/config";
 
import { Alert } from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import bcrypt from "bcryptjs";
 
export const recuperarContrasena = async (
  correo,
  nuevaContrasena
) => {
  try {
    const correoLimpio = correo.trim().toLowerCase();
 
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (!formatoCorreo.test(correoLimpio)) {
      Alert.alert("Error", "Ingresa un correo válido.");
      return;
    }
 
    if (nuevaContrasena.length < 6) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }
 
    if (!/[0-9]/.test(nuevaContrasena)) {
      Alert.alert(
        "Error",
        "La contraseña debe contener al menos un número."
      );
      return;
    }
 
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(nuevaContrasena)) {
      Alert.alert(
        "Error",
        "La contraseña debe contener un carácter especial."
      );
      return;
    }
 
    const usuariosRef = collection(db, "Usuarios");
 
    const consulta = query(
      usuariosRef,
      where("correo", "==", correoLimpio)
    );
 
    const resultado = await getDocs(consulta);
 
    if (resultado.empty) {
      Alert.alert(
        "Error",
        "El correo no está registrado."
      );
      return;
    }
 
    const salt = bcrypt.genSaltSync(10);
 
    const contrasenaHash = bcrypt.hashSync(
      nuevaContrasena,
      salt
    );
 
    const usuario = resultado.docs[0];
 
    await updateDoc(usuario.ref, {
      contrasena_hash: contrasenaHash,
    });
 
    Alert.alert(
      "Éxito",
      "La contraseña fue actualizada correctamente."
    );
 
  } catch (error) {
    console.error(error);
 
    Alert.alert(
      "Error",
      "No se pudo actualizar la contraseña."
    );
  }
};
 
export const recuperarContrasena = async (
  correo,
  nuevaContrasena
) => {
import styles from "./stylePassword";

export default function ForgotPasswordScreen({ navigation }) {
  const [emailToReset, setEmailToReset] = useState("");

  const handleSendCode = () => {
    if (!emailToReset) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    sendPasswordResetEmail(auth, emailToReset)
      .then(() => {
        Alert.alert("Success", "Check your email for instructions to reset your password");
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


  try {
    const correoLimpio = correo.trim().toLowerCase();
 
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (!formatoCorreo.test(correoLimpio)) {
      Alert.alert("Error", "Ingresa un correo válido.");
      return;
    }
 
    if (nuevaContrasena.length < 6) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }
 
    if (!/[0-9]/.test(nuevaContrasena)) {
      Alert.alert(
        "Error",
        "La contraseña debe contener al menos un número."
      );
      return;
    }
 
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(nuevaContrasena)) {
      Alert.alert(
        "Error",
        "La contraseña debe contener un carácter especial."
      );
      return;
    }
 
    const usuariosRef = collection(db, "Usuarios");
 
    const consulta = query(
      usuariosRef,
      where("correo", "==", correoLimpio)
    );
 
    const resultado = await getDocs(consulta);
 
    if (resultado.empty) {
      Alert.alert(
        "Error",
        "El correo no está registrado."
      );
      return;
    }
 
    const salt = bcrypt.genSaltSync(10);
 
    const contrasenaHash = bcrypt.hashSync(
      nuevaContrasena,
      salt
    );
 
    const usuario = resultado.docs[0];
 
    await updateDoc(usuario.ref, {
      contrasena_hash: contrasenaHash,
    });
 
    Alert.alert(
      "Éxito",
      "La contraseña fue actualizada correctamente."
    );
 
  } catch (error) {
    console.error(error);
 
    Alert.alert(
      "Error",
      "No se pudo actualizar la contraseña."
    );
  }
};

const styles = StyleSheet.create({
  forgotContainer: {
    flex: 1,
    backgroundColor: "#021B42",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  forgotContent: {
    alignItems: "center",
    width: "100%",
  },
  forgotIconContainer: {
    marginBottom: 20,
  },
  forgotTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },
  forgotSubtitle: {
    fontSize: 14,
    color: "#A0ABC0",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  fieldContainer: {
    marginBottom: 20,
    width: "100%",
  },
  forgotLabel: {
    color: "#FFFFFF",
    marginBottom: 8,
    fontSize: 15,
    marginLeft: 4,
  },
  inputContainer: {
    height: 58,
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
    marginLeft: 13,
    paddingVertical: 0,
  },
  forgotButton: {
    height: 57,
    backgroundColor: "#55C900",
    width: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  forgotButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#2C4066",
  },
  orText: {
    color: "#A0ABC0",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  returnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

