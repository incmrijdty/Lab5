import { useTranslation } from 'react-i18next';

type InterpolationValues = Record<string, string | number>;

export function useGameTranslation() {
  const { t } = useTranslation();

  return (key: string, values?: InterpolationValues) => t(key, values);
}
