import React from 'react';
import { View, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default App;