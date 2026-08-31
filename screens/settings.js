import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="user" size={20} color="#021024" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Account</Text>
          </View>
          
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Personal information</Text>
            <Ionicons name="chevron-forward" size={18} color="#021024" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.optionRow, styles.lastOptionRow]}>
            <Text style={styles.optionText}>Beneficiaries</Text>
            <Ionicons name="chevron-forward" size={18} color="#021024" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="shield-alt" size={20} color="#021024" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Security</Text>
          </View>
          
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Change password</Text>
            <Ionicons name="chevron-forward" size={18} color="#021024" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.optionRow, styles.lastOptionRow]}>
            <Text style={styles.optionText}>PIN and biometrics</Text>
            <Ionicons name="chevron-forward" size={18} color="#021024" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings-sharp" size={22} color="#021024" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Preferences</Text>
          </View>
          
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Language</Text>
            <Ionicons name="chevron-forward" size={18} color="#021024" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.optionRow, styles.lastOptionRow]}>
            <Text style={styles.optionText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={18} color="#021024" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="question-circle" size={22} color="#021024" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Help</Text>
          </View>
          
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Help center</Text>
            <Ionicons name="chevron-forward" size={18} color="#021024" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.optionRow, styles.lastOptionRow]}>
            <Text style={styles.optionText}>Contact support</Text>
            <Ionicons name="chevron-forward" size={18} color="#021024" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021024',
  },
  topSection: {
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 4,
  },
  bottomSection: {
    backgroundColor: '#F8FAF8',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    flex: 1,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  sectionIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#021024',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  lastOptionRow: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  optionText: {
    fontSize: 14,
    color: '#334155',
  },
});