// #6 Email Authentication using Firebase Authentication in React Native App
// https://aboutreact.com/react-native-firebase-authentication/
import "react-native-gesture-handler";

// Import React and Component
import React from "react";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import SignUpSelector from './screens/SignUpSelector'
import RiderSignUp from './screens/RiderSignUp';
import Home from './screens/Home'
import SplashScreen from "./screens/SplashScreen";
import RiderHome from "./screens/RiderHome";
import Login1 from "./screens/Login1";
import Login2 from "./screens/Login2";
const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
   
            <Stack.Navigator initialRouteName="login">
                <Stack.Screen name="login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="SignUpSelector" component={SignUpSelector} options={{headerShown: false}} />
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
                <Stack.Screen name="RiderSignUp" component={RiderSignUp} options={{headerShown: false}} />
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
                <Stack.Screen name="RiderHome" component={RiderHome} options={{headerShown: false}} />
                <Stack.Screen name="Login1" component={Login1} options={{headerShown: false}} />
                <Stack.Screen name="Login2" component={Login2} options={{headerShown: false}} />
            </Stack.Navigator>
        
  );
};

/* Main Navigator */
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="RiderHome" component={RiderHome} options={{headerShown: false}} />
        <Stack.Screen name="login1" component={Login1} options={{headerShown: false}} />
        <Stack.Screen name="login2" component={Login2} options={{headerShown: false}} />
      
    </Stack.Navigator>
</NavigationContainer>
  );
};

export default App;