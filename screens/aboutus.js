import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

export default function AboutUsScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet,
        ]}
      >
        <View style={[styles.mainWrapper, isTablet && styles.mainWrapperTablet]}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/kitelyBR.png')}
              style={[styles.logoImage, isTablet && styles.logoImageTablet]}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.headerTitle}>About us</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Our Mission</Text>
            <Text style={styles.cardBody}>
              We transform the traditional remittance model in El Salvador by
              offering a transparent and secure platform. We make sure that the
              effort of those sending money from abroad turns into direct
              well-being through exchanges in key areas.
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/transferencia.png')}
              style={[styles.illustration, isTablet && styles.illustrationTablet]}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  scrollContentTablet: {
    justifyContent: 'center',
    paddingVertical: 60,
  },
  mainWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  mainWrapperTablet: {
    maxWidth: 560,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoImage: {
    marginTop: 10,
    width: 280,
    height: 70,
  },
  logoImageTablet: {
    width: 360,
    height: 90,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#082147',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  cardBody: {
    fontSize: 17,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 26,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  illustration: {
    width: '100%',
    maxWidth: 280,
    height: 220,
  },
  illustrationTablet: {
    maxWidth: 340,
    height: 260,
  },
});