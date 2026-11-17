import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  fallbackLng: 'pl',
  lng: 'pl',
  resources: {
    en: {
      translation: {
        title: 'Welcome to the game',
        subtitle: 'Set up your profile and get ready to play.',
        nameLabel: 'Player name',
        namePlaceholder: 'Enter your name',
        languageButton: 'Switch language · PL / EN',
        darkThemeButton: 'Switch to dark theme',
        lightThemeButton: 'Switch to light theme',
      },
    },
    pl: {
      translation: {
        title: 'Witaj w grze',
        subtitle: 'Ustaw swój profil i przygotuj się do gry.',
        nameLabel: 'Imię gracza',
        namePlaceholder: 'Wpisz swoje imię',
        languageButton: 'Zmień język · PL / EN',
        darkThemeButton: 'Włącz ciemny motyw',
        lightThemeButton: 'Włącz jasny motyw',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
