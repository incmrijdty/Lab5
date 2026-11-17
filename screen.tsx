import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

const lightColors = {
  background: '#F4F6FB',
  surface: '#FFFFFF',
  text: '#182033',
  muted: '#747D91',
  border: '#DDE2EC',
  primary: '#5B5FEF',
  buttonText: '#FFFFFF',
};

const darkColors = {
  background: '#111522',
  surface: '#1C2233',
  text: '#F4F6FB',
  muted: '#A5AEC1',
  border: '#343C50',
  primary: '#777BFF',
  buttonText: '#FFFFFF',
};

export default function WelcomeScreen() {
  const { t, i18n } = useTranslation();
  const [playerName, setPlayerName] = useState('');
  const [isDark, setIsDark] = useState(false);
  const colors = isDark ? darkColors : lightColors;

  const toggleLanguage = () => {
    const nextLanguage = i18n.language.startsWith('pl') ? 'en' : 'pl';
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🎮</Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{t('title')}</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>{t('subtitle')}</Text>

          <Text style={[styles.label, { color: colors.text }]}>{t('nameLabel')}</Text>
          <TextInput
            accessibilityLabel={t('nameLabel')}
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={setPlayerName}
            placeholder={t('namePlaceholder')}
            placeholderTextColor={colors.muted}
            returnKeyType="done"
            style={[
              styles.input,
              { backgroundColor: colors.background, borderColor: colors.border, color: colors.text },
            ]}
            value={playerName}
          />

          <TouchableOpacity
            accessibilityRole="button"
            onPress={toggleLanguage}
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              {t('languageButton')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => setIsDark((current) => !current)}
            style={[styles.secondaryButton, { borderColor: colors.border }]}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
              {t(isDark ? 'lightThemeButton' : 'darkThemeButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    borderRadius: 28,
    padding: 28,
    shadowColor: '#182033',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 5,
  },
  iconCircle: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 36,
    backgroundColor: '#EEEFFF',
    marginBottom: 20,
  },
  icon: {
    fontSize: 34,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
