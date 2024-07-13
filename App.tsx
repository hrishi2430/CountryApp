import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'; import { Provider } from 'react-redux';

import store from './src/redux/strore';
import CountryListScreen from './src/screens/CountryListScreen';
import CountryDetailScreen from './src/screens/CountryDetailScreen';

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CountryList">
          <Stack.Screen name="CountryList" component={CountryListScreen} options={{ title: 'World contries' }} />
          <Stack.Screen
            name="CountryDetail"
            component={CountryDetailScreen}
            options={() => ({
              headerLeftLabelVisible: false,
              ...TransitionPresets.DefaultTransition, // Optional: Add transition preset
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
