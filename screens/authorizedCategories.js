import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
 
export default function AuthorizedCategories() {
  const [categories, setCategories] = useState([
    {
      name: "Groceries",
      icon: "cart-outline",
      enabled: true,
    },
    {
      name: "Health",
      icon: "heart-outline",
      enabled: true,
    },
    {
      name: "Pet supplies",
      icon: "paw-outline",
      enabled: false,
    },
  ]);
 
  const toggleCategory = (index) => {
    const updatedCategories = [...categories];
 
    updatedCategories[index].enabled =
      !updatedCategories[index].enabled;
 
    setCategories(updatedCategories);
  };
 
  return (
    <View style={styles.container}>
 
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
          </Text>
        </TouchableOpacity>
      </View>
 
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
    height: 300,
    paddingTop: 65,
    paddingHorizontal: 30,
    alignItems: "center",
  },
 
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
  },
 
  subtitle: {
    color: "#B9C1D0",
    fontSize: 17,
    textAlign: "center",
    lineHeight: 25,
  },
 
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 35,
    paddingTop: 35,
  },
 
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },
 
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
 
  categoryName: {
    fontSize: 19,
    color: "#6D6D6D",
    marginLeft: 25,
  },
 
  saveButton: {
    backgroundColor: "#55C900",
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
 
  saveText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
  