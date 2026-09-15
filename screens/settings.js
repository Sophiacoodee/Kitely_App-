import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
} from 'react-native';
import {
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled((previousState) => !previousState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <Text style={styles.headerTitle}>{t('settings.headerTitle')}</Text>
          <Text style={styles.headerSubtitle}>{t('settings.headerSubtitle')}</Text>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="user" size={20} color="#021024" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>{t('settings.sectionAccount')}</Text>
            </View>

            <TouchableOpacity
              style={styles.optionRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('PersonalInformation')}
            >
              <Text style={styles.optionText}>{t('settings.personalInfo')}</Text>
              <Ionicons name="chevron-forward" size={18} color="#021024" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionRow, styles.lastOptionRow]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('FamilyTransmitter')}
            >
              <Text style={styles.optionText}>{t('settings.beneficiaries')}</Text>
              <Ionicons name="chevron-forward" size={18} color="#021024" />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="settings-sharp" size={22} color="#021024" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>{t('settings.sectionPreferences')}</Text>
            </View>

            <TouchableOpacity
              style={styles.optionRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Languaje')}
            >
              <Text style={styles.optionText}>{t('settings.language')}</Text>
              <Ionicons name="chevron-forward" size={18} color="#021024" />
            </TouchableOpacity>

            <View style={[styles.optionRow, styles.lastOptionRow]}>
              <Text style={styles.optionText}>{t('settings.notifications')}</Text>
              <Switch
                trackColor={{ false: '#CBD5E1', true: '#55C900' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#CBD5E1"
                onValueChange={toggleNotifications}
                value={notificationsEnabled}
              />
            </View>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="question-circle" size={22} color="#021024" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>{t('settings.sectionHelp')}</Text>
            </View>

            <TouchableOpacity
              style={styles.optionRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('HelpCenter')}
            >
              <Text style={styles.optionText}>{t('settings.helpCenter')}</Text>
              <Ionicons name="chevron-forward" size={18} color="#021024" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionRow, styles.lastOptionRow]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ContactUs')}
            >
              <Text style={styles.optionText}>{t('settings.contactSupport')}</Text>
              <Ionicons name="chevron-forward" size={18} color="#021024" />
            </TouchableOpacity>
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
  },
  topSection: {
    paddingTop: 40,
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
    paddingBottom: 60,
    flex: 1,
    minHeight: '100%',
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
    color: '#021B42',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignmentItems: 'center',
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