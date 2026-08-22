import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import styles from "./styleHome";

const QuickActionButton = ({ icon, label, iconFamily: IconComponent }) => (
  <TouchableOpacity style={styles.quickActionCard}>
    <IconComponent name={icon} size={28} color="#55C900" />
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.topSection}>
        <View style={styles.headerTopBar}>
          <Image
            source={require("../assets/KITELY.png")}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Hello, Emiliano!</Text>
          <Text style={styles.subtitleText}>
            Transparent remittances,{"\n"}stronger connections.
          </Text>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>$316.00</Text>
        </View>
      </View>

      <View style={styles.whitePanel}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsContainer}>
            <QuickActionButton
              icon="paper-plane"
              label="Send Remittance"
              iconFamily={FontAwesome5}
            />
            <QuickActionButton
              icon="people-outline"
              label="Beneficiaries"
              iconFamily={Ionicons}
            />
            <QuickActionButton
              icon="history"
              label="History"
              iconFamily={MaterialIcons}
            />
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}