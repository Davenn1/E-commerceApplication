import { View, Text, Image, Alert } from "react-native";
import { RootStackScreenProps } from "../Navigation/RootStackParamList";
import { Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { getOneData } from "./ApiQuery";
import { useState } from "react";
import { minus, plus } from "../Redux/cashSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { add, remove } from "../Redux/itemSlice";

export type DetailSellParams = {
    name : string,
    price : number,
    description : string,
    image : string
}
const DetailSell = ({navigation, route} : RootStackScreenProps<'Sell'>)=>{
    
    const dispatch = useAppDispatch();
    const cash = useAppSelector(state=>state.cash)

    const data = route.params;
    return (
        <View style={{backgroundColor:"white"}}>
         
        <View style={styles.detailContainer}>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate("Image", {image:data.image})}} ><Image style = {styles.image} source={{uri: data.image}}/></TouchableOpacity>
            </View>

            <View style={styles.separator}   />

            <View style={styles.descriptionContainer}>
                <View style={styles.descriptionName}>
                    <Text style={styles.descriptionNameText}>{data.name}</Text>
                </View>

                <View style={styles.descriptionPriceContainer}>
                    <Text style={styles.descriptionPrice}>Price</Text>
                    <Text style={styles.descriptionPriceText}>{data.price}</Text>
                </View>

                <View style={styles.descriptionText}>
                    <Text style={styles.descriptionTextDescription}>Description</Text>
                    <Text style={styles.descriptionTextText}>{data.description}</Text>
                </View>

                <TouchableOpacity onPress={()=>{
                    let cashes = cash.cash + data.price;
                Alert.alert("Success", `${data.name} was sold successfully Your current balance is ${cashes.toFixed(2)}`, [{
                    text:'Ok', onPress:()=>{navigation.goBack()}
                }])
                dispatch(plus(data.price))
                dispatch(remove({name:data.name, price:data.price, description:data.description, image:data.image}))}}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Sell</Text>
                    </View>
                </TouchableOpacity>
               
            </View>

            
        </View>
        

        

        </View>
    )
}


const styles = StyleSheet.create({
    detailContainer:{
        width:"100%",
        height:"100%"
    },
    imageContainer:{
        width:"100%",
        height:150,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
    },
    image:{
        width:170,
        height:170,
        marginTop:50
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
        color:"grey"
    },
    descriptionContainer:{
        width:"90%",
        marginLeft:20,
        marginTop:20,
        backgroundColor:"transparent"
    },
    descriptionName:{
        width:"100%",
        backgroundColor:"transparent"
    },
    descriptionNameText:{
        fontSize:20,
        fontWeight:"bold",
        backgroundColor:"transparent"
    },
    descriptionPriceContainer:{
        width:"100%",
        marginTop:30,
        backgroundColor:"transparent"
    },
    descriptionPrice:{
        fontSize : 16 ,
        backgroundColor:"transparent"
    },
    descriptionPriceText:{
        fontSize:20,
        fontWeight:"bold",
        backgroundColor:"transparent"
    },
    descriptionText:{
        width:"100%",
        backgroundColor:"transparent"
    },
    descriptionTextDescription:{
        fontSize:16,
        marginTop:30,
        backgroundColor:"transparent"
    },
    descriptionTextText:{
        fontSize:12,
        backgroundColor:"transparent"
    },
    buttonContainer:{
        marginTop:20,
        width:"50%",
        height:50,
        flex:0,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#8375a4",
        borderRadius:10,
        textAlign:"center",
        textAlignVertical:"center",
    },
    buttonText:{
        fontSize:24,
        fontWeight:"bold",
        color:"white"
    }
})


export default DetailSell;