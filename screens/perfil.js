import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';

export default function PerfilScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topHeader}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.profileTitle}>Profile</Text>
            <Text style={styles.profileSubtitle}>Manage your account</Text>
          </View>
        </View>

        <View style={styles.whitePanel}>

          <TouchableOpacity style={styles.menuOption} activeOpacity={0.7}>
            <FontAwesome5 name="user-alt" size={20} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Personal information</Text>
              <Text style={styles.optionSubtitle}>View your information</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.menuOption}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MetodosPagos')}
          >
            <Ionicons name="card" size={22} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Payment methods</Text>
              <Text style={styles.optionSubtitle}>Manage your cards and accounts</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity style={styles.menuOption} activeOpacity={0.7}>
            <Ionicons name="notifications" size={22} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Notifications</Text>
              <Text style={styles.optionSubtitle}>View your alerts</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity style={styles.menuOption} activeOpacity={0.7}>
            <Ionicons name="help-circle" size={24} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Help</Text>
              <Text style={styles.optionSubtitle}>Go to support</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
          <View style={styles.separator} />


          <TouchableOpacity
            onPress={() => navigation.navigate("AboutUs")}
          >
            <Ionicons name="information-circle" size={24} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>About Kitely</Text>
              <Text style={styles.optionSubtitle}>App version 1.00</Text>
            </View>
            <Ionicons name="" size={22} color="#021B42" />
          </TouchableOpacity>

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
  },

  topHeader: {
    backgroundColor: '#021B42',
    paddingHorizontal: 25,
    paddingTop: 70,
    paddingBottom: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 16,
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },

  whitePanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
  },
  icon: {
    width: 32,
    textAlign: 'center',
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#021B42',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#8A94A6',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#021533',
    marginVertical: 2,
  },
});