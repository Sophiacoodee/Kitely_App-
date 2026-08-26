import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function RoleSelectionScreen({ navigation }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (!selectedRole) return;
    if (selectedRole === 'sender') {
      navigation.navigate('TransmitterHome');
    } else if (selectedRole === 'receiver') {
      navigation.navigate('InicioReceptor');
    } else if (selectedRole === 'store') {
      navigation.navigate('HomeStoreScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Please select your role to continue</Text>
      </View>

      <View style={styles.whitePanel}>
        <TouchableOpacity
          style={[styles.card, selectedRole === 'sender' && styles.cardSelected]}
          onPress={() => setSelectedRole('sender')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="send" size={28} color="#FFFFFF" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Sender</Text>
            <Text style={styles.cardSubtitle}>Send remittances to your relatives</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, selectedRole === 'receiver' && styles.cardSelected]}
          onPress={() => setSelectedRole('receiver')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="account-arrow-left" size={30} color="#FFFFFF" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Receiver</Text>
            <Text style={styles.cardSubtitle}>Get remittances transparently</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, selectedRole === 'store' && styles.cardSelected]}
          onPress={() => setSelectedRole('store')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5 name="store" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Store</Text>
            <Text style={styles.cardSubtitle}>Records the redeemed remittances</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !selectedRole && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
  },
  topHeader: {
    height: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
  whitePanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: 'flex-start',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardSelected: {
    borderColor: '#55C900',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#021B42',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#021024',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#556987',
    fontWeight: '500',
  },
  button: {
    height: 54,
    backgroundColor: '#55C900',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});