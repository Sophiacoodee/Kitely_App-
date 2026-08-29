import React, { useState, useEffect } from "react"; // Agregue este nuevo Usestate y UseEffect
import {
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
import { PieChart } from "react-native-gifted-charts";//librería
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config"; // --Aqui se ajusta la ruta por si el config.js esta en otro lugar
import styles from "./styleTransmitterHome";

const coloresPorCategoria = { // -colores determinados para cada categoria
  Food: "#8A56AC",
  Medicine: "#FFC107",
  Construction: "#00BFA5",
};

const QuickActionButton = ({ icon, label, iconFamily: IconComponent, iconColor = "#021B42", onPress }) => (
  <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
    <IconComponent name={icon} size={26} color={iconColor} />
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);


export default function HomeScreen({ navigation, route }) {
  //Nuevo este bloque entrará antes de return para obtener los datos de la base de datos
  const { usuarioId } = route?.params || {};
  const [usuario, setUsuario] = useState(null);
  const [categoriasGasto, setCategoriasGasto] = useState([]);
  const [actividadReciente, setActividadReciente] = useState([]);

  useEffect(() => {
    async function cargarDatos () {

      //paso 1 de traer al usuario
      const refUsuario = doc(db, "Usuarios", usuarioId);
      const snapUsuario = await getDoc(refUsuario);
      const datosUsuario = { id: snapUsuario.id, ...snapUsuario.data() };

      // paso 2 aca se calcula el saldo sumando sus remesas
      const qRemesas = query(collection(db, "remesas"), where("usuario", "==", usuarioId)); // justra el filtro segun modelo real
      const snapRemesas = await getDocs(qRemesas);
      let saldoTotal = 0;
      snapRemesas.forEach((r) => {
        saldoTotal += r.data().monto_total;
      });
      
      setUsuario({ ...datosUsuario, saldoDisponible: saldoTotal });

      // paso 3 aca se traen las transacciones para la grafica y actividad reciente
      const qTransacciones = query(collection(db, "transacciones"));
      const snapTransacciones = await getDocs(qTransacciones);

      const totalesPorCategoria = {};
      const listaActividad = [];
      snapTransacciones.forEach((t) => {
        const data = t.data();
        totalesPorCategoria[data.categoria] = (totalesPorCategoria[data.categoria] || 0) + data.monto_transacciones;
        listaActividad.push(data);
      });

        const totalGeneral = Object.values(totalesPorCategoria).reduce((a , b) => a + b, 0);
        const categorias = Object.entries(totalesPorCategoria).map((nombre, monto) => ({
          nombre,
          monto, porcentaje: Math.round((monto / totalGeneral) * 100),
        }));

        setCategoriasGasto(categorias);
        setActividadReciente(listaActividad.slice(0, 5));// solo las 5 mas recientes
        }

    cargarDatos();
  }, [usuarioId]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topSection}>
          <View style={styles.headerTopBar}>
            <View />
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Hello, {usuario?.nombre}!</Text>
            <Text style={styles.subtitleText}>
              Transparent remittances,{"\n"}stronger connections.
            </Text>
          </View>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>${usuario?.saldoDisponible?.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.whitePanel}>
          <View style={styles.quickActionsRow}>
            <QuickActionButton
              icon="paper-plane"
              label="Send Remittance"
              iconFamily={FontAwesome5}
              iconColor="#55C900"
              onPress={() => navigation.navigate("SendRemittance")}
            />
            <QuickActionButton
              icon="people-outline"
              label="Beneficiaries"
              iconFamily={Ionicons}
              iconColor="#021B42"
              onPress={() => navigation.navigate("Beneficiaries")}
            />
            <QuickActionButton
              icon="history"
              label="History"
              iconFamily={MaterialIcons}
              iconColor="#021B42"
              onPress={() => navigation.navigate("History")}
            />
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Spending by Category</Text>

            <View style={styles.chartRow}>
              <PieChart
                data={categoriasGasto.map((cat) => ({
                  value: cat.monto,
                  color: coloresPorCategoria[cat.nombre] || "#CCCCCC",
                }))}
                radius={35}
              />

              <View style={styles.categoriesList}>
                {categoriasGasto.map((cat) => (
                  <View style={styles.categoryRow} key={cat.nombre}>
                    <View
                      style={[
                        styles.dot,
                        { backgroundColor: coloresPorCategoria[cat.nombre] || "#CCCCCC" },
                      ]}
                    />
                    <Text style={styles.categoryName}>{cat.nombre}</Text>
                    <Text style={styles.categoryPercent}>{cat.porcentaje}%</Text>
                    <Text style={styles.categoryAmount}>${cat.monto.toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            {actividadReciente.map((actividad, index) => (
              <View style={styles.transactionItem} key={index}>
                <View style={styles.transactionLeft}>
                  <Ionicons name="home-outline" size={24} color="#0A192F" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.transTitle}>{actividad.nombreComercio || actividad.categoria || "Transaction"}</Text>
                    <Text style={styles.transSubtitle}>
                      {(actividad.categoriaNombre || actividad.categoria || "General")} • {actividad.fecha || ""}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.transAmount}>
                    ${(actividad.monto_transacciones ?? actividad.monto_total ?? 0).toFixed(2)}
                  </Text>
                  <Text style={styles.transStatus}>Completed</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}