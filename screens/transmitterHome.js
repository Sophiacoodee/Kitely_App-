import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import styles from './styleTransmitterHome';

const QuickActionButton = ({ icon, label, iconFamily: IconComponent }) => (
  <TouchableOpacity style={styles.quickActionCard}>
    <IconComponent name={icon} size={28} color="#55C900" />
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

            {/* Seccion 1: Spanding by Category */}
            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>Spanding by Category</Text>

              <View style={styles.chartRow}>
                {/* Circulo simulando el grafico de pastel */}
                <View style={styles.pieChartPlaceholder}>
                  <Text style={{ fontSize: 10, color: "#888" }}>Pie Chart</Text>
                </View>

                {/* Lista de categorias */}
                <View style={styles.categoriesList}>
                  <View style={styles.categoryRow}>
                    <View style={[styles.dot, { backgroundColor: "#8A56AC" }]} />
                    <Text style={styles.categoryName}>Food</Text>
                    <Text style={styles.categoryPercent}>64%</Text>
                    <Text style={styles.categoryAmount}>$42.00</Text>
                  </View>

                  <View style={styles.categoryRow}>
                    <View style={[styles.dot, { backgroundColor: "#FFC107" }]} />
                    <Text style={styles.categoryName}>Medicine</Text>
                    <Text style={styles.categoryPercent}>11%</Text>
                    <Text style={styles.categoryAmount}>$16.00</Text>
                  </View>

                  <View style={styles.categoryRow}>
                    <View style={[styles.dot, { backgroundColor: "#00BFA5" }]} />
                    <Text style={styles.categoryName}>Construction</Text>
                    <Text style={styles.categoryPercent}>25%</Text>
                    <Text style={styles.categoryAmount}>$258.00</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Seccion 2: Historial de Transacciones */}
            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>Spanding by Category</Text>

              {/* Item 1 */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <Ionicons name="home-outline" size={24} color="#0A192F" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.transTitle}>Walmart</Text>
                    <Text style={styles.transSubtitle}>Food • Today, 10:24 AM</Text>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.transAmount}>-$42.00</Text>
                  <Text style={styles.transStatus}>Completed</Text>
                </View>
              </View>

              {/* Item 2 */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <Ionicons name="heart-outline" size={24} color="#0A192F" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.transTitle}>Pharmacy Vida Nueva</Text>
                    <Text style={styles.transSubtitle}>Medicine • Yesterday, 4:32 PM</Text>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.transAmount}>-$42.00</Text>
                  <Text style={styles.transStatus}>Completed</Text>
                </View>
              </View>

              {/* Item 3 */}
              <View style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <Octicons name="container" size={24} color="#0A192F" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.transTitle}>Vidrí</Text>
                    <Text style={styles.transSubtitle}>Construction • 12 Jul 2024</Text>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.transAmount}>-$42.00</Text>
                  <Text style={styles.transStatus}>Completed</Text>
                </View>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}