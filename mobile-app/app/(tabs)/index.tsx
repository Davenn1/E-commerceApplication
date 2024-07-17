import { ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import SearchIcon from '../../src/SearchIcon';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Link, useNavigation } from 'expo-router';
import ListViewIcon from '../../src/ListViewIcon';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getDatas } from './ApiQuery';
import GridViewIcon from '../../src/GridViewIcon';
import { useState } from 'react';
import { RootStackScreenProps } from '../Navigation/RootStackParamList';
import Cash from '../Cash/Cash';


export type HomeParams = {
  setDetailUrl: undefined
}



function generateTitle (name:string) : string {
  if(name.length>30){
    return `${name.substring(0, 30)}...`
  }else{
    return name
  }
  
}

export default function TabOneScreen({navigation, route} : RootStackScreenProps<'Home'>) {
  const query = useQuery({
    queryKey:['products'],
    queryFn: getDatas
  })
  
let listContainer = {
  list : <ListViewIcon/>,
  grid : <GridViewIcon />
} 




  let [numCol, setNumCol] = useState<boolean>(true);
  let [listForm, setListForm] = useState<any>(styles.itemContainerList);
  let [listContainers, setListContainers] = useState<any>(listContainer.list);
  let [image, setImage] = useState<any>(styles.image);
  let [itemContainer, setItemContainer] = useState<any>(styles.itemContainerText);
  let [itemContainerText, setItemContainerText] = useState<any>(styles.itemContainerProductText);
  let [itemContainerPrice, setItemContainerPrice] = useState<any>(styles.itemContainerPriceText);
  const [value, onChangeText] = useState<any>();
  const arrayValue = query.data;
  let [changeableArray, setchangeableArray] = useState<any>(query.data);
  let [selectedArray, setSelectedArray] = useState<any>("none");

  let handlerList = ()=>{
    if(numCol==true){
      setNumCol(false)
      setListForm(styles.itemContainerGrid)
      setListContainers(listContainer.grid)
      setImage(styles.imageGrid)
      setItemContainer(styles.itemContainerTextGrid)
      setItemContainerText(styles.itemContainerProductTextGrid)
      setItemContainerPrice(styles.itemContainerPriceTextGrid)
    }else{
      setNumCol(true)
      setListForm(styles.itemContainerList)
      setListContainers(listContainer.list)
      setImage(styles.image)
      setItemContainer(styles.itemContainerText)
      setItemContainerText(styles.itemContainerProductText)
      setItemContainerPrice(styles.itemContainerPriceText)
    }
   
  }
  return (
    
    <View style={styles.container}>
      <View style={styles.priceContainer}>
          <Cash/>
          <Text style={styles.myCoins}>My Coins</Text>
        </View>

      <View style={styles.inputStuffContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.searchContainer}>
          <TouchableOpacity>
            <TouchableOpacity onPress={
              ()=>{
                if(value==""){
                  const find = arrayValue;
                  setSelectedArray(find)
                }else{
                const find = arrayValue?.length>0 ? arrayValue?.filter((u:any)=>u?.title === value) : undefined;
                setSelectedArray(find)
                }
                
              }

            }><SearchIcon/></TouchableOpacity>
          </TouchableOpacity>
          </View>
          <TextInput editable
          onChangeText={text => onChangeText(text)}
          value={value}
        multiline removeClippedSubviews={false}  style={styles.input} placeholder="Search Product.."></TextInput>
        </View>

        <Link style={styles.productLink} href="/modal">
          <Text style={styles.productLinkText}>My Products</Text>
        </Link>

        
      </View>
      
      <View style={styles.stuffContainer}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.headerContainerText}>Available Products</Text>
          <TouchableOpacity onPress={handlerList}>{listContainers}</TouchableOpacity>
        </View>

        <View style={styles.productsContainer}>
        <FlatList data={selectedArray === "none" ? query.data : selectedArray} numColumns={numCol?1:2} key={numCol?0:1}
        renderItem={({item})=>(

        <TouchableOpacity onPress={()=>{
          navigation.navigate('Detail', {url:item.id})
        }}>
          <View style={listForm}>
          
        <Image style={image}source={{uri: item.image}} />

        <View style={itemContainer}>
          <Text style={itemContainerText}>{generateTitle(item.title)}</Text>
          <Text style={itemContainerPrice}>{item.price}</Text>
          
        </View>

        </View>
        </TouchableOpacity>
        )} ></FlatList>
        </View>
        
      </View>
      
      
      
      <View style={styles.miniContainer} >
        <TouchableOpacity onPress={()=>{navigation.navigate("MiniGame")}}>
        <Image style={styles.miniContainerImage} source={require("../../src/egg-full.png")}/>
        </TouchableOpacity>
      </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    width:"100%",
    height:"100%",
    backgroundColor:"#8375a4"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputStuffContainer:{
    width:"100%",
    height:135,
    backgroundColor:"#8375a4",
    flex:0,
    alignItems:"flex-start",
    justifyContent:"center",
    flexDirection:"column",
    marginLeft:30
  },
  inputContainer:{
    width:"85%",
    height:50,
    backgroundColor:"white",
    borderRadius:20,
    marginTop:20,
    alignItems:"center",
    justifyContent:"flex-start",
    flexDirection:"row"

  },
  input:{
    width:270,
    height:"100%",
    fontSize:18
  },
  
  searchContainer:{
    width:10,
    height:10,
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"transparent"
  },
  productLink:{
    marginTop:20,
    width:155,
    height:50,
    backgroundColor:"white",
    borderRadius:10,
    textAlign:"center",
    textAlignVertical:"center"
  },
  productLinkText:{
    fontSize:18,
    fontWeight:"500"
  },
  stuffContainer: {
    width:"100%",
    marginTop:20,
    height:575,
    backgroundColor:"white",
    borderTopLeftRadius: 10,
    borderTopRightRadius:10, 
    paddingTop:30,
    paddingLeft:20,
    paddingRight:20
  },
  priceContainer: {
    position:"absolute",
    width:125,
    height:75,
    borderRadius:10,
    zIndex:2,
    transform:[{translateX:240}, {translateY:95}],
    shadowColor: "black",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation:10,
    textAlign:"center",
    textAlignVertical:"center",
  },
  priceText:{
    fontSize:32,
    fontWeight:"bold",
    color: "#a26fdb",
    textAlign:"right",
    marginRight:10
  },
  myCoins:{
    fontSize:16,
    fontWeight:"500",
    textAlign:"right",
    marginRight:10
  },
  headerContainer:{
    width:"100%",
    height:50,
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row",
    marginTop:0,
  },
  productsContainer:{
    flexDirection:"column",
    marginTop:10,
    width:400,
    height:"88%",
    marginLeft:10
  },
  headerContainerText:{
    fontSize:24,
    fontWeight:"bold",
    zIndex:2
  },
  itemContainerList:{
    width:320,
    height:115,
    alignItems:"center",
    flexDirection:"row",
    marginTop:10,
    borderRadius:10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation:5,
    marginLeft:8,
    marginBottom:5
  },
  itemContainerGrid:{
    width:160,
    height:180,
    alignItems:"center",
    flexDirection:"column",
    marginTop:10,
    borderRadius:10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation:5,
    marginLeft:5,
    marginBottom:5
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
  },
  miniContainer:{
    position:"absolute",
    width:60,
    height:60,
    borderRadius:50,
    flex:0,
    justifyContent:"center",
    alignItems:"center",
    zIndex:2,
    transform:[{translateX:300}, {translateY:630}],
    borderWidth: 1,
    borderColor:"grey"
  },
  miniContainerImage:{
    width:30,
    height:30
  }
});
