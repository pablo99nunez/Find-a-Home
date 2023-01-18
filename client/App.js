import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./src/Components/Home/Home";
import LandingPage from './src/Components/LandingPage/LandingPage';
import Welcome from './src/Components/WelcomePage/WelcomePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LandigPage"
          component={LandingPage}
          initialParams={{ fromChild: 'Initial' }}
        />
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} />
        <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}