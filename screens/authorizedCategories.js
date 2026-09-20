import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
<<<<<<< HEAD
  Alert,
  useWindowDimensions,
=======
>>>>>>> rodrigo
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const INITIAL_CATEGORIES = [
  { name: "Food", icon: "cart-outline", enabled: true, translationKey: "food" },
  { name: "Medicine", icon: "medical-outline", enabled: true, translationKey: "medicine" },
  { name: "Education", icon: "school-outline", enabled: true, translationKey: "education" },
  { name: "Entertainment", icon: "film-outline", enabled: true, translationKey: "entertainment" },
  { name: "Construction", icon: "construct-outline", enabled: false, translationKey: "construction" },
  { name: "Pet supplies", icon: "paw-outline", enabled: false, translationKey: "petSupplies" },
  { name: "Clothes", icon: "shirt-outline", enabled: true, translationKey: "clothes" },
];

export default function AuthorizedCategories({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const { t } = useTranslation();

  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

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

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem(
        "@user_categories",
        JSON.stringify(categories)
      );
      navigation.navigate("HomeStore");
    } catch (e) {
      Alert.alert(t('authorizedCategories.errorTitle'), t('authorizedCategories.errorSaveMessage'));
    }
  };

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.headerWrapper, isTablet && styles.headerWrapperTablet]}>
          <Text style={styles.title}>{t('authorizedCategories.title')}</Text>
          <Text style={styles.subtitle}>
            {t('authorizedCategories.subtitle')}
=======
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Authorized Categories
        </Text>
 
        <Text style={styles.subtitle}>
          Choose the categories you want{"\n"}
          to allow for transactions
        </Text>
      </View>
 
      <View style={styles.card}>
        {categories.map((category, index) => (
          <View style={styles.categoryRow} key={category.name}>
 
            <View style={styles.categoryInfo}>
              <Ionicons
                name={category.icon}
                size={32}
                color="#021533"
              />
 
              <Text style={styles.categoryName}>
                {category.name}
              </Text>
            </View>
 
            <Switch
              value={category.enabled}
              onValueChange={() => toggleCategory(index)}
              trackColor={{
                false: "#FFFFFF",
                true: "#55C900",
              }}
              thumbColor="#FFFFFF"
            />
 
          </View>
        ))}
 
        
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>
            Save changes
>>>>>>> rodrigo
          </Text>
        </View>
      </View>

<<<<<<< HEAD
      <ScrollView
        style={styles.card}
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mainWrapper, isTablet && styles.mainWrapperTablet]}>
          {categories.map((category, index) => (
            <View style={styles.categoryRow} key={category.name}>
              <View style={styles.categoryInfo}>
                <Ionicons name={category.icon} size={30} color="#021533" />
                <Text style={styles.categoryName}>
                  {t(`authorizedCategories.list.${category.translationKey}`, { defaultValue: category.name })}
                </Text>
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
            <Text style={styles.saveText}>{t('authorizedCategories.saveChanges')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
=======
    </ScrollView>
>>>>>>> rodrigo
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
  headerWrapper: {
    width: "100%",
    alignItems: "center",
  },
  headerWrapperTablet: {
    maxWidth: 600,
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
  scrollContentTablet: {
    alignItems: "center",
  },
  mainWrapper: {
    width: "100%",
  },
  mainWrapperTablet: {
    maxWidth: 600,
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