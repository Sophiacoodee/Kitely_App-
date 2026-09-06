import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const INITIAL_CATEGORIES = [
  { name: "Food", icon: "cart-outline", enabled: true },
  { name: "Medicine", icon: "medical-outline", enabled: true },
  { name: "Education", icon: "school-outline", enabled: true },
  { name: "Entertainment", icon: "film-outline", enabled: true },
  { name: "Construction", icon: "construct-outline", enabled: false },
  { name: "Pet supplies", icon: "paw-outline", enabled: false },
  { name: "Clothes", icon: "shirt-outline", enabled: true },
];

export default function AuthorizedCategories({ navigation }) {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  // Cargar categorías guardadas cuando la pantalla se abre
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const savedCategories = await AsyncStorage.getItem("@user_categories");
      if (savedCategories !== null) {
        setCategories(JSON.parse(savedCategories));
      }
    } catch (e) {
      console.error("Error al cargar categorías", e);
    }
  };

  const toggleCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].enabled = !updatedCategories[index].enabled;
    setCategories(updatedCategories);
  };

  // Guardar cambios en el almacenamiento persistente
  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem(
        "@user_categories",
        JSON.stringify(categories)
      );
      // Redirigir a HomeStore después de guardar
      navigation.navigate("HomeStore");
    } catch (e) {
      Alert.alert("Error", "No se pudieron guardar los cambios");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Authorized Categories</Text>
        <Text style={styles.subtitle}>
          Choose the categories you want{"\n"}
          to allow for transactions
        </Text>
      </View>

      <ScrollView
        style={styles.card}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category, index) => (
          <View style={styles.categoryRow} key={category.name}>
            <View style={styles.categoryInfo}>
              <Ionicons name={category.icon} size={30} color="#021533" />
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>

            <Switch
              value={category.enabled}
              onValueChange={() => toggleCategory(index)}
              trackColor={{
                false: "#E0E0E0",
                true: "#55C900",
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        ))}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveText}>Save changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#021533",
    height: 240,
    paddingTop: 60,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    color: "#B9C1D0",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryName: {
    fontSize: 18,
    color: "#021533",
    fontWeight: "500",
    marginLeft: 20,
  },
  saveButton: {
    backgroundColor: "#55C900",
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});