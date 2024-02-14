import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageListScreen from './src/pages/list/ImageListScreen';
import ImageDetailScreen from './src/pages/detail/DetailPage';
import {RootStackParamList} from './src/shared/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ImageListScreen"
          options={{headerShown: false}}
          component={ImageListScreen}
        />
        <Stack.Screen
          name="ImageDetailScreen"
          options={{headerShown: false}}
          component={ImageDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
