import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CharacterClass, useCharacter } from '../contexts/CharacterContext';
import { Language, useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { WelcomeCopy } from './screenCopy';

interface WelcomeLayoutProps {
  copy: WelcomeCopy;
  onStart: () => void;
}

export default function WelcomeLayout({ copy, onStart }: WelcomeLayoutProps) {
  const { language, setLanguage } = useLanguage();
  const { colors, theme, setTheme } = useTheme();
  const { draftName, setDraftName, draftClass, setDraftClass } = useCharacter();
  const [nameError, setNameError] = useState(false);
  const [languageError, setLanguageError] = useState(false);

  const chooseLanguage = async (nextLanguage: Language) => {
    try {
      await setLanguage(nextLanguage);
      setLanguageError(false);
    } catch (error) {
      console.error('Unable to change the game language.', error);
      setLanguageError(true);
    }
  };

  const handleStart = () => {
    if (!draftName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    onStart();
  };

  const renderOption = (label: string, selected: boolean, onPress: () => void) => (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.option,
        {
          backgroundColor: selected ? colors.selected : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}
    >
      <Text style={[styles.optionText, { color: selected ? colors.primary : colors.text }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const selectClass = (characterClass: CharacterClass) => setDraftClass(characterClass);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <View style={[styles.iconCircle, { backgroundColor: colors.selected }]}>
              <Text style={styles.icon}>🐉</Text>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>{copy.title}</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>{copy.subtitle}</Text>

            <Text style={[styles.label, { color: colors.text }]}>{copy.nameLabel}</Text>
            <TextInput
              accessibilityLabel={copy.nameLabel}
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => {
                setDraftName(value);
                setNameError(false);
              }}
              placeholder={copy.namePlaceholder}
              placeholderTextColor={colors.muted}
              returnKeyType="done"
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: nameError ? '#D94F5C' : colors.border,
                  color: colors.text,
                },
              ]}
              value={draftName}
            />
            {nameError ? (
              <Text style={styles.errorText}>{copy.nameRequired}</Text>
            ) : null}

            <Text style={[styles.label, { color: colors.text }]}>{copy.classLabel}</Text>
            <View style={styles.optionRow}>
              {(['warrior', 'mage', 'ranger'] as const).map((characterClass) =>
                renderOption(copy.classes[characterClass], draftClass === characterClass, () =>
                  selectClass(characterClass),
                ),
              )}
            </View>

            <Text style={[styles.label, styles.sectionLabel, { color: colors.text }]}>
              {copy.languageLabel}
            </Text>
            <View style={styles.optionRow}>
              {renderOption('Polski', language === 'pl', () => void chooseLanguage('pl'))}
              {renderOption('English', language === 'en', () => void chooseLanguage('en'))}
            </View>
            {languageError ? <Text style={styles.errorText}>{copy.languageError}</Text> : null}

            <Text style={[styles.label, styles.sectionLabel, { color: colors.text }]}>
              {copy.themeLabel}
            </Text>
            <View style={styles.optionRow}>
              {renderOption(copy.lightTheme, theme === 'light', () => setTheme('light'))}
              {renderOption(copy.darkTheme, theme === 'dark', () => setTheme('dark'))}
            </View>

            <TouchableOpacity
              accessibilityRole="button"
              onPress={handleStart}
              style={[styles.startButton, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.startButtonText, { color: colors.onPrimary }]}>
                {copy.startButton}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#182033',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 5,
  },
  iconCircle: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 32,
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 9,
  },
  sectionLabel: {
    marginTop: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    minHeight: 42,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  startButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  startButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  errorText: {
    color: '#D94F5C',
    fontSize: 13,
    marginTop: 6,
  },
});
