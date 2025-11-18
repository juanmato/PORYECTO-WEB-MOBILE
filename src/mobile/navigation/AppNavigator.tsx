import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/Colors';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ServicesScreen } from '../screens/ServicesScreen';
import { ServiceDetailScreen } from '../screens/ServiceDetailScreen';
import { NewServiceScreen } from '../screens/NewServiceScreen';
import { NewQuoteScreen } from '../screens/NewQuoteScreen';
import { MyQuotesScreen } from '../screens/MyQuotesScreen';
import { InsumosScreen } from '../screens/InsumosScreen';
import { NewInsumoScreen } from '../screens/NewInsumoScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray400,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
        }}
      />
      
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarLabel: user?.role === 'solicitante' ? 'Mis Servicios' : 'Servicios',
          tabBarIcon: ({ color }) => <TabIcon icon="📋" color={color} />,
        }}
      />

      {user?.role === 'proveedor_servicio' && (
        <Tab.Screen
          name="MyQuotes"
          component={MyQuotesScreen}
          options={{
            tabBarLabel: 'Cotizaciones',
            tabBarIcon: ({ color }) => <TabIcon icon="📝" color={color} />,
          }}
        />
      )}

      {user?.role === 'proveedor_insumos' && (
        <Tab.Screen
          name="Insumos"
          component={InsumosScreen}
          options={{
            tabBarLabel: 'Insumos',
            tabBarIcon: ({ color }) => <TabIcon icon="📦" color={color} />,
          }}
        />
      )}
    </Tab.Navigator>
  );
}

function TabIcon({ icon, color }: { icon: string; color: string }) {
  return <Text style={{ fontSize: 24 }}>{icon}</Text>;
}

export function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
              name="ServiceDetail"
              component={ServiceDetailScreen}
              options={{ headerShown: true, title: 'Detalle del Servicio' }}
            />
            <Stack.Screen
              name="NewService"
              component={NewServiceScreen}
              options={{ headerShown: true, title: 'Nuevo Servicio' }}
            />
            <Stack.Screen
              name="NewQuote"
              component={NewQuoteScreen}
              options={{ headerShown: true, title: 'Nueva Cotización' }}
            />
            <Stack.Screen
              name="NewInsumo"
              component={NewInsumoScreen}
              options={{ headerShown: true, title: 'Nuevo Insumo' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}