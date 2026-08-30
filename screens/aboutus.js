import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
 
const { width } = Dimensions.get("window");
 
export default function AboutUsScreen() {
  return (
    <LinearGradient
      colors={["#001436", "#001436", "#001436", "#0A3D91"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
 
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/kitelyBR.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
 
 
        <Text style={styles.title}>About us</Text>
 
        {/* TARJETA OUR MISSION */}
        <View style={styles.missionCard}>
 
          <Text style={styles.missionTitle}>
            Our Mission
          </Text>
 
          <Text style={styles.missionText}>
            We transform the traditional remittance model in El Salvador by
            offering a transparent and secure platform. We make sure that the
            effort of those sending money from abroad turns into direct
            well-being through exchanges in key areas.
          </Text>
 
        </View>
 
      </ScrollView>
    </LinearGradient>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
  scrollContent: {
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 60,
  },
 
 
 
  logoContainer: {
    width: "90%",
    height: 145,
    alignItems: "center",
    justifyContent: "center",
  },
 
  logo: {
    width: 300,
    height: 135,
  },
 
 
 
  imageContainer: {
    width: width * 0.90,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
  },
 
  aboutImage: {
    width: width * 0.88,
    height: 300,
  },
 
 
 
  title: {
    color: "#FFFFFF",
    fontSize: 52,
    fontWeight: "300",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 45,
  },
 
 
  missionCard: {
    width: "84%",
    backgroundColor: "#001841",
    borderRadius: 40,
    paddingHorizontal: 30,
    paddingVertical: 35,
 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
  },
 
  missionTitle: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 18,
  },
 
  missionText: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 34,
    fontWeight: "300",
    textAlign: "left",
  },
});
 
 
 