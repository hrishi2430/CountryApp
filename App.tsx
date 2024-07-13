import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import store from './src/redux/strore';
import CountryListScreen from './src/screens/CountryListScreen';
import CountryDetailScreen from './src/screens/CountryDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CountryList" component={CountryListScreen} options={{title:'World Countries'}}/>
          <Stack.Screen name="CountryDetail" component={CountryDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
