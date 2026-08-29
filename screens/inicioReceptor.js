import React, {useState,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView, // 7PARA HACER SCROLL EN EL MAPA,GRAFICA Y LA ACTIVIDAD
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, {marker} from "react-native-maps";
// Agregue e importo el Pierchsrt 
import { PieChart } from "react-native-gifted-charts";  
// new 

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore" 
//aregado

import {db} from "..firebase/config";
//agregado los colores que se usaron en la pantalla de emisor
const coloresPorCategoria ={
  food: "#8A56AC",
  medicine: "#FFC107",
  construction: "#00BFA5",
}

export default function inicioReceptorScreen({ navigation, route }) {
  const {usuarioId} = route.params;
  const [usuario,setUsuario] = useState(null);
  const [comerciosCercanos, setComerciosCercanos] = useState([]);
  const [categoriasGasto, setCatgoriasGasto] = useState([]);
  const [actividadReciente, setActividadReciente] = useState([]);


  useEffect(() => {
    async function cargarDatos() {
      const refUsuario = doc(db, "Usuarios", usuarioId);

      // datos del usuario (del saludo)
      const snapUsuario = await getDoc(doc(db, "Usuarios", usuarioId));
      setUsuario(snapUsuario.data());

      // comercios reales para el mapa
      const snapComercios = await getDocs(collection(db, "comercios"));
      setComerciosCercanos(
        snapComercios.docs.map((c) => ({ id: c.id, ...c.data() }))
      );

      // remesas donde este usuario es el receptor
      const qRemesas = query(
        collection(db, "remesas"),
        where("id_receptor", "==", refUsuario)
      );
      const snapRemesas = await getDocs(qRemesas);
      const idsRemesas = snapRemesas.docs.map((r) => r.id);

      if (idsRemesas.length > 0) {
        // transacciones relacionadas a esas remesas
        const qTransacciones = query(
          collection(db, "transacciones"),
          where("id_remesa", "in", idsRemesas)
        );
        const snapTransacciones = await getDocs(qTransacciones);

        // grafica de gastos por categoria
        const totalesPorCategoria = {};
        const listaActividad = [];
        snapTransacciones.forEach((t) => {
          const data = t.data();
          totalesPorCategoria[data.categoriaNombre]=
          (totalesPorCategoria[data.categoriaNombre] || 0) +
          data.monto_transaccion;
          listaActividad.push({id: t.id, ...data});

        });

        const totalGeneral = Object.values(totalesPorCategoria).reduce(
          (a,b) => a + b, 0
        );
        const categorias = Object.entries(totalesPorCategoria).map(
          ([nombre,monto]) => ({
            nombre,
            monto,
            porcentaje:Math.round((monto / totalGeneral) * 100),
          })
        );


        setCategoriasGasto(categorias);
        setActividadReciente(listaActividad.slice(0, 5));
      }
    }

    cargarDatos();
  }, [usuarioId]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#021B42", "#061F4A"]}
        style={styles.header}
      >
        <Image
          source={require("../../assets/images/KITELY.png")}
          style={styles.logo}
        />

        <Text style={styles.greeting}>Hello, Sandra!</Text>

        <Text style={styles.subtitle}>
          Transparent remittances, stronger{"\n"}
          connections.
        </Text>

        <TouchableOpacity style={styles.profileButton}>
          <Ionicons
            name="person"
            size={34}
            color="#021B42"
          />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.whiteContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.whiteContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons
                name="people"
                size={32}
                color="#021B42"
              />
              <Text style={styles.buttonText}>
                Beneficiaries
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton}>
              <Ionicons
                name="qr-code"
                size={32}
                color="#021B42"
              />
              <Text style={styles.buttonText}>
                Scan Code
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton}>
              <Ionicons
                name="time"
                size={34}
                color="#021B42"
              />
              <Text style={styles.buttonText}>
                History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
//mapa de comercios cercanos

<view style={styles.mapContainer}>
  <MapView
  style={styles.map}
  InitialRegion ={{
    latitude: 13.6989,
    longitude: -89.1914,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
></MapView>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 330,
    paddingHorizontal: 32,
    paddingTop: 35,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    position: "relative",
  },

  logo: {
    width: 175,
    height: 70,
    resizeMode: "contain",
    marginBottom: 28,
  },

  greeting: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 22,
    color: "#FFFFFF",
    marginTop: 5,
    lineHeight: 30,
  },

  profileButton: {
    position: "absolute",
    right: 30,
    top: 75,
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  whiteContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -5,
    paddingTop: 25,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 25,
  },

  menuButton: {
    width: 105,
    height: 108,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },

  buttonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#021B42",
    textAlign: "center",
  },
});