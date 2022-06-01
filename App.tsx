import React from 'react';
import { AuthContext } from './src/AuthContext';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import { ThemeProvider } from 'styled-components';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';

import { SingIn } from './src/screens/SignIn';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar barStyle='light-content' backgroundColor="transparent" translucent />
          <AuthContext.Provider value={[]}>
            <SingIn />
          </AuthContext.Provider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

