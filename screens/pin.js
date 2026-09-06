import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Pin({ navigation }) {
  const [pin, setPin] = useState("");

  const addNumber = (number) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + number);
    }
  };

  const deleteNumber = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  // Redirecciona automáticamente cuando se ingresan los 4 dígitos
  useEffect(() => {
    if (pin.length === 4) {
      const timer = setTimeout(() => {
        navigation?.navigate("Canje");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [pin, navigation]);

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Enter your PIN</Text>
          <Text style={styles.subtitle}>Enter your security PIN</Text>

          {/* CÍRCULOS DEL PIN */}
          <View style={styles.dots}>
            {[0, 1, 2, 3].map((index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index < pin.length ? styles.dotFilled : styles.dotEmpty,
                ]}
              />
            ))}
          </View>
        </View>

        {/* TECLADO */}
        <View style={styles.keyboardContainer}>
          {/* FILA 1 */}
          <View style={styles.row}>
            {numbers.slice(0, 3).map((number) => (
              <TouchableOpacity
                key={number}
                style={styles.numberButton}
                onPress={() => addNumber(number)}
                activeOpacity={0.7}
              >
                <Text style={styles.numberText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* FILA 2 */}
          <View style={styles.row}>
            {numbers.slice(3, 6).map((number) => (
              <TouchableOpacity
                key={number}
                style={styles.numberButton}
                onPress={() => addNumber(number)}
                activeOpacity={0.7}
              >
                <Text style={styles.numberText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* FILA 3 */}
          <View style={styles.row}>
            {numbers.slice(6, 9).map((number) => (
              <TouchableOpacity
                key={number}
                style={styles.numberButton}
                onPress={() => addNumber(number)}
                activeOpacity={0.7}
              >
                <Text style={styles.numberText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* FILA 4 */}
          <View style={styles.row}>
            <View style={styles.emptyButton} />

            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => addNumber("0")}
              activeOpacity={0.7}
            >
              <Text style={styles.numberText}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteNumber}
              activeOpacity={0.7}
            >
              <Ionicons name="backspace-outline" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021A4B",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center", // Centra verticalmente todo el contenido en la pantalla
    alignItems: "stretch",
    paddingHorizontal: 25,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#D0D7E3",
    fontSize: 16,
    fontWeight: "400",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 30,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  dotFilled: {
    backgroundColor: "#FFFFFF",
  },
  dotEmpty: {
    backgroundColor: "rgba(255, 255, 255, 0.35)",
  },
  keyboardContainer: {
    gap: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberButton: {
    width: "30%",
    height: 75,
    backgroundColor: "#D9D9D9",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyButton: {
    width: "30%",
    height: 75,
  },
  deleteButton: {
    width: "30%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    color: "#0F1E36",
    fontSize: 28,
    fontWeight: "700",
  },
});