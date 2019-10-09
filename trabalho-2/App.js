import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
 
import HomeScreen from './Home'
import OrgaoScreen from './Orgao'
import ViagemScreen from './Viagem'

 
const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Orgao: {screen: OrgaoScreen},
  Viagem: {screen: ViagemScreen},
});
 
const App = createAppContainer(MainNavigator);
export default App;
