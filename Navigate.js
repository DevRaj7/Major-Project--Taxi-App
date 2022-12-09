import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from  '@react-navigation/stack';

import SignUp from './screens/SignUp';
import Login from './screens/Login';
import SignUpSelector from './screens/SignUpSelector'
import RiderSignUp from './screens/RiderSignUp';
const Stack = createStackNavigator();

const Navigate = props => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="SignUpSelector" component={SignUpSelector} options={{headerShown: false}} />
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
                <Stack.Screen name="RiderSignUp" component={RiderSignUp} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigate;