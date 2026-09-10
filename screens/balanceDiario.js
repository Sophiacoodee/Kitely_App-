import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-gifted-charts";

export default function BalanceDiario({ navigation }) {
  const { width } = useWindowDimensions();

  // Cálculo del ancho dinámico para la gráfica considerando márgenes internos
  const chartWidth = Math.min(width - 80, 500);

  const datosGrafica = [
    { value: 120 },
    { value: 60 },
    { value: 150 },
    { value: 90 },
    { value: 180 },
    { value: 130 },
    { value: 170 },
  ];

  const transaccionesEjemplo = [
    { id: "1", nombre: "Juan Armando", monto: 25.0 },
    { id: "2", nombre: "Pablo Ramírez", monto: 55.0 },
    { id: "3", nombre: "Joaquín Hernandez", monto: 15.0 },
    { id: "4", nombre: "Pablo Escobar", monto: 20.0 },
    { id: "5", nombre: "Leonardo de León", monto: 125.0 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitulo}>Daily Balance</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tarjeta}>
          <Text style={styles.tarjetaTitulo}>Balance</Text>
          <Text style={styles.tarjetaSubtitulo}>Today's running total</Text>
          <Text style={styles.tarjetaMonto}>$ 240.50</Text>

          {/* Contenedor de la Gráfica */}
          <View style={styles.chartContainer}>
            <LineChart
              data={datosGrafica}
              width={chartWidth}
              height={120}
              color="#55C900"
              thickness={3}
              initialSpacing={15}
              endSpacing={15}
              spacing={(chartWidth - 30) / (datosGrafica.length - 1)}
              hideDataPoints={false}
              dataPointsColor="#55C900"
              dataPointsRadius={4}
              hideRules
              hideYAxisText
              yAxisThickness={0}
              xAxisThickness={1}
              xAxisColor="#E5E7EB"
              xAxisLabelTextStyle={{
                color: "#9AA5AD",
                fontSize: 11,
                fontWeight: "500",
              }}
              xAxisLabelTexts={["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]}
            />
          </View>

          {/* Transacciones */}
          <Text style={styles.seccionTitulo}>
            {`${transaccionesEjemplo.length} transactions completed`}
          </Text>

          {transaccionesEjemplo.map((t) => (
            <View style={styles.filaTransaccion} key={t.id}>
              <Text style={styles.nombreTransaccion}>{t.nombre}</Text>
              <Text style={styles.montoTransaccion}>
                {`$${t.monto.toFixed(2)}`}
              </Text>
            </View>
          ))}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation?.navigate("AllTransactions")}
          >
            <Text style={styles.verTodas}>View all transactions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021B42",
  },
  headerTitulo: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tarjetaTitulo: {
    color: "#021B42",
    fontSize: 20,
    fontWeight: "bold",
  },
  tarjetaSubtitulo: {
    color: "#667085",
    fontSize: 13,
    marginTop: 2,
  },
  tarjetaMonto: {
    color: "#021B42",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 15,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    width: "100%",
  },
  seccionTitulo: {
    color: "#021B42",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  filaTransaccion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  nombreTransaccion: {
    color: "#021B42",
    fontSize: 15,
    fontWeight: "500",
  },
  montoTransaccion: {
    color: "#021B42",
    fontSize: 15,
    fontWeight: "700",
  },
  verTodas: {
    color: "#55C900",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    paddingVertical: 5,
  },
});