import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from '../pages/Feed';
import logo from '../assets/instagram.png';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
        screenOptions={{
            headerTitle:(<Image source={logo} />),
            headerTitleAlign:'center',
            headerStyle:{
                backgroundColor:'#F5F5F5'
            },
            cardStyle:{backgroundColor:'#FFF'}
        }}
    >
        <Auth.Screen name="Feed" component={Feed} />
    </Auth.Navigator>
)

export default AuthRoutes;