import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
<<<<<<< HEAD
import MessageReactions from './components/MessageReactions';
=======
>>>>>>> b5f6c9215b50d86f37ef2e9d247002cc50e84281

const { Navigator, Screen } = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C6BED' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white'
}

export default function App() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={globalScreenOptions}>
        <Screen name='Login' component={LoginScreen} />
        <Screen name='Register' component={RegisterScreen} />
        <Screen name='Home' component={HomeScreen} />
        <Screen name='AddChat' component={AddChatScreen} />
        <Screen name='Chat' component={ChatScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
