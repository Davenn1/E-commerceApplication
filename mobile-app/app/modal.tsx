import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, StyleSheet, TouchableOpacity, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useAppDispatch, useAppSelector } from './Redux/hook';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { RootStackScreenProps } from './Navigation/RootStackParamList';
import { useNavigation } from 'expo-router';


export type ModalParams = {
  setDetailUrl: undefined
}

function generateTitle (name:string) : string {
  if(name.length>30){
    return `${name.substring(0, 30)}...`
  }else{
    return name
  }
  
}

export default function ModalScreen({navigation, route} : RootStackScreenProps<'Modal'>) {
  const dispatch = useAppDispatch();
  const item = useAppSelector(state=>state.item.item)
  const navigations = useNavigation(); 
  return (
    <Provider store={store}>
    <View style={styles.productsContainer}>
        <FlatList data={item} numColumns={1} key={1}
        renderItem={({item})=>(
        <TouchableOpacity onPress={()=>{
          navigations.navigate('Sell', {name:item.name, price:item.price, description:item.description, image:item.image})
        }}>
          <View style={styles.itemContainerList}>
          
        <Image style={styles.image}source={{uri: item.image}} />

        <View style={styles.itemContainerText}>
          <Text style={styles.itemContainerProductText}>{generateTitle(item.name)}</Text>
          <Text style={styles.itemContainerPriceText}>{item.price}</Text>
          
        </View>

        </View>
        </TouchableOpacity>
        )} ></FlatList>
        </View>
        </Provider>
  );
}

const styles = StyleSheet.create({
    productsContainer:{
      overflow:"hidden",
      flexDirection:"column",
      width:500,
      height:"100%",
      background:"transparent",
    },
    headerContainerText:{
      fontSize:24,
      fontWeight:"bold",
      zIndex:2
    },
    itemContainerList:{
      width:320,
      height:125,
      alignItems:"center",
      flexDirection:"row",
      marginTop:20,
      borderRadius:10,
      shadowColor: "black",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation:5,
      marginLeft:40,
      marginBottom:10
    },
    image:{
      width:80,
      height:80,
      marginLeft:30
    },
    itemContainerText:{
      marginLeft:15,
      width:150
      
    },
    imageGrid:{
      width:80,
      height:80,
      marginLeft:15,
      marginTop:20
    },
    itemContainerTextGrid:{
      marginLeft:0,
      width:150,
      flex:1,
      alignItems:"center",
      justifyContent:"flex-start"
    },
    itemContainerProductText:{
      fontSize:16,
      fontWeight:"bold",
    },
    itemContainerPriceText:{
      fontSize:16
    },
    itemContainerProductTextGrid:{
      fontSize:14,
      fontWeight:"bold",
      textAlign:"center",
      marginTop:10
    },
    itemContainerPriceTextGrid:{
      fontSize:14,
      marginTop:10
    }
});
