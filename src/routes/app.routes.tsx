import React from "react";
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons/';
import { useTheme } from "styled-components";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";
import { Poppins_500Medium_Italic } from "@expo-google-fonts/poppins";

export function AppRoutes() {
    const theme = useTheme();
    return (
        <Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: theme.colors.shape,
                tabBarInactiveTintColor: theme.colors.text_black_transparent,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    position: 'relative',
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 60,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    backgroundColor: theme.colors.background,
                },
            }}
        >
            <Screen
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons 
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                            
                        />
                    )
                }}
            />
            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons 
                            name="attach-money"
                            size={size}
                            color={color}
                            
                        />
                    )
                }}
            />
            <Screen
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons 
                            name="pie-chart"
                            size={size}
                            color={color}
                            
                        />
                    )
                }}
            />
        </Navigator>
    )
}