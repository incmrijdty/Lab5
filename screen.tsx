import React from 'react';
import { useGameTranslation } from './hooks/useGameTranslation';
import WelcomeLayout from './components/WelcomeLayout';
import { WelcomeCopy } from './components/screenCopy';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const translate = useGameTranslation();
  const copy: WelcomeCopy = {
    title: translate('welcome.title'),
    subtitle: translate('welcome.subtitle'),
    nameLabel: translate('welcome.nameLabel'),
    namePlaceholder: translate('welcome.namePlaceholder'),
    classLabel: translate('welcome.classLabel'),
    classes: {
      warrior: translate('welcome.classes.warrior'),
      mage: translate('welcome.classes.mage'),
      ranger: translate('welcome.classes.ranger'),
    },
    languageLabel: translate('welcome.languageLabel'),
    themeLabel: translate('welcome.themeLabel'),
    lightTheme: translate('welcome.lightTheme'),
    darkTheme: translate('welcome.darkTheme'),
    startButton: translate('welcome.startButton'),
    nameRequired: translate('welcome.nameRequired'),
    languageError: translate('welcome.languageError'),
  };

  return <WelcomeLayout copy={copy} onStart={onStart} />;
}
