import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./src/screens/HomeScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PerfilScreen from "./src/screens/PerfilScreen";
import FavoritosScreen from "./src/screens/FavoritosScreen";
import SplashScreen from "./src/screens/SplashScreen";
import CatalogoScreen from "./src/screens/CatalogoScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ title: "Página Inicial", headerShown: false }}
      />
      <Stack.Screen
        name="CadastroScreen"
        component={CadastroScreen}
        options={{ title: "CadastroScreen", headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "LoginScreen", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#393357",
        tabBarInactiveTintColor: "#5a5177",
        tabBarStyle: {
          backgroundColor: "#f8f8f8",
          borderTopWidth: 0,
          elevation: 0,
          paddingHorizontal: 20,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Catálogo de Unhas"
        component={CatalogoScreen}
        options={({ navigation }) => ({
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums" size={size} color={color} />
          ),
          headerTitleAlign: "center",
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            />
          ),
        })}
      />
     
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={({ navigation }) => ({
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
          headerTitleAlign: "center",
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Editar Perfil"
        component={PerfilScreen}
        options={({ navigation }) => ({
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerTitleAlign: "center",
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AppTabs" component={AppTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
