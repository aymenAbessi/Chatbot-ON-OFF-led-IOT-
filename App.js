import LoginScreen from './screens/LoginScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login Screen" component={LoginScreen} />
      <Stack.Screen name="Home Screen" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}


