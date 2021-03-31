import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components/native';


export const StatusBar = () => {
  const { colors } = useTheme();

  return <ExpoStatusBar style="light" backgroundColor={colors.primary} />;
};

