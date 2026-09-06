import type { ReactNode } from 'react'
import type { Screen } from '../types'
import { DashboardScreen, DriveDetailsScreen, PeopleScreen, ReviewsScreen, ScenesScreen, SearchScreen, SettingsScreen } from '../screens'

type ScreenRegistryOptions = {
  language: 'en' | 'ar'
  onLanguage: (value: string) => void
  onNavigate: (screen: Screen) => void
  onTheme: (value: string) => void
  theme: string
}

export function createScreenRegistry({ language, onLanguage, onNavigate, onTheme, theme }: ScreenRegistryOptions): Record<Screen, ReactNode> {
  return {
    dashboard: <DashboardScreen onOpenDrive={() => onNavigate('drive')} />,
    drive: <DriveDetailsScreen onBack={() => onNavigate('dashboard')} />,
    search: <SearchScreen />,
    scenes: <ScenesScreen />,
    people: <PeopleScreen />,
    reviews: <ReviewsScreen />,
    settings: <SettingsScreen theme={theme} onTheme={onTheme} language={language} onLanguage={onLanguage} />,
  }
}
