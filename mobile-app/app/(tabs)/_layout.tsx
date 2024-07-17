import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Alert, BackHandler, Button, Modal, Pressable, useColorScheme } from 'react-native';
import { Platform, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabOneScreen from '.';
import { RootStackParamList, RootStackScreenProps } from '../Navigation/RootStackParamList';
import Detail from './Details';
import { store } from '../Redux/store';
import { Provider } from 'react-redux'
import DetailSell from './DetailSell';
import ModalScreen from '../modal';
import MiniGame from './MiniGame';
import ImageDetails from './ImageDetails';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}




export default function TabLayout() {
  


  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
   <Provider store={store}> 
    <QueryClientProvider client={queryClient} >
    <Stack.Navigator>
      <Stack.Screen  name = "Home" component={TabOneScreen} options={{
        headerRight: ()=>(<Button  color="#8375a4" title="Back" onPress={()=>{Alert.alert("Exit App", "Are you sure you want to exit StoreEgg?", [{
          text:"Cancel",
          onPress:()=>null,
          style:"cancel"
        },
      {
        text:"Yes",
        onPress:()=>BackHandler.exitApp()
      }])}} />)
      }}></Stack.Screen>
      <Stack.Screen  name = "Detail" component={Detail}></Stack.Screen>
      <Stack.Screen name="Modal" component={ModalScreen} options={{ title:'My Products'}} />
      <Stack.Screen  name = "Sell" component={DetailSell}></Stack.Screen>    
      <Stack.Screen  name = "MiniGame" component={MiniGame}></Stack.Screen>
      <Stack.Screen name="Image" component={ImageDetails}></Stack.Screen>     
    </Stack.Navigator> 
    
    </QueryClientProvider>
    
    </Provider>
    
  );
}

const styles = StyleSheet.create({

})
