import { View, Text, Image } from "react-native";
import { RootStackScreenProps } from "../Navigation/RootStackParamList";
import { Platform, StyleSheet, Animated} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { getOneData } from "./ApiQuery";
import { useRef, useState } from "react";
import { minus, plus } from "../Redux/cashSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { add, remove } from "../Redux/itemSlice";


const styles = StyleSheet.create({
    mainContainer : {
        width:"100%",
        height:"100%",
        background:"white",
        flex:0,
        alignItems:"center",
    },
    coinContainer : {
        width:"80%",
        height:60,
        flex:0,
        alignItems:"center",
        justifyContent:"space-around",
        flexDirection:"row",
        marginTop:50
    },
    oneCoinContainer:{
        flex:0,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row"
    },
    coinImage : {
        width:50,
        height:50
    },
    coinText : {
        fontSize:20,
        marginLeft:5
    },
    prizeContainer:{
        width:"70%",
        flex:0,
        alignItems:"center",
        justifyContent:"center",
        marginTop:50
    },
    prizeHeader:{

    },
    prizeHeaderText:{
        fontSize:20,
        textAlign:"center"
    },
    prizeHeaderTextNone:{
        fontSize:20,
        textAlign:"center",
        display:"none"
    },
    prizeCongratulationNone:{
        display:"none"
    },
    prizeCongratulationFlex:{
        display:"flex",
        flex:0,
        alignItems:"center",
        justifyContent:"center"
    },
    eggImage:{
        marginTop:40,
    },
    eggImageSecond:{
        marginTop:20
    },
    prizeFooterNone:{
        display:"none"
    },
    prizeFooterFlex:{
        display:"flex"
    },
    getCoinImage : {
        width:80,
        height:80,
       
    },
    imageContainer:{
        width:"50%",
        flex:0,
        alignItems:"center",
    },
    congratulations:{
        fontSize:20
    },
    kindCoin:{
        fontSize:24
    },
    coinAdded:{
        fontSize:20,
        textAlign:"center",
        marginTop:20
    }

})


const imageRandom = ():number=>{
    const randomnumber = Math.floor((Math.random()*3));
    
    if(randomnumber == 0){
        

        {return 100};
    }else if(randomnumber == 1){
        

        {return 50};
    }else if(randomnumber == 2){
        

        {return 20};
    }

    {return 0};
}


const MiniGame = ()=>{

    

    













    const dispatch = useAppDispatch();
    
    
    const cash = useAppSelector(state=>state.cash)
    let [prizeHeader, setPrizeHeader] = useState<any>(styles.prizeHeaderText)
    let [kind, setKind] = useState<string>();
    let [kindNum, setKindNum] = useState<number>(); 
    let [Dis, setDis] = useState<any>(styles.prizeCongratulationNone);
    const [image, setImage] = useState<any>(<TouchableOpacity onPress={()=>{
        let randomNumber = imageRandom();
        

        if(randomNumber == 100){
            setImage(<><Image style={styles.getCoinImage} source={require("../../src/gold-coin.png")}/>
            <Image style={styles.eggImageSecond} source = {require("../../src/egg-broken.png")}/></>)
            setKind("Gold")
        }else if(randomNumber == 50){
            setImage(<><Image style={styles.getCoinImage} source={require("../../src/silver-coin.png")}/>
            <Image style={styles.eggImageSecond} source = {require("../../src/egg-broken.png")}/></>)
            setKind("Silver");
        }else if(randomNumber==20){
            setImage(<><Image style={styles.getCoinImage} source={require("../../src/bronze-coin.png")}/>
            <Image style={styles.eggImageSecond} source = {require("../../src/egg-broken.png")}/></>)
            setKind("Bronze");
        }

        
        setKindNum(randomNumber)
        dispatch(plus(randomNumber)) 
        setPrizeHeader(styles.prizeHeaderTextNone)
        setDis(styles.prizeCongratulationFlex)

    }}><Image style={styles.eggImage} source = {require("../../src/egg-full.png")} /></TouchableOpacity>)



    

    return (
        <View style = {styles.mainContainer}>
            <View style={styles.coinContainer}>
                <View style={styles.oneCoinContainer}>
                    <Image style={styles.coinImage} source={require("../../src/gold-coin.png")} / >
                    <Text style={styles.coinText} >100</Text>
                </View>
                <View style={styles.oneCoinContainer}>
                    <Image  style={styles.coinImage} source={require("../../src/silver-coin.png")} / >
                    <Text style={styles.coinText}>50</Text>
                </View>
                <View style={styles.oneCoinContainer}>
                    <Image  style={styles.coinImage} source={require("../../src/bronze-coin.png")} / >
                    <Text style={styles.coinText}>20</Text>
                </View>
            </View>

            <View style={styles.prizeContainer}>
                <View style={styles.prizeHeader}>
                    <Text  style={prizeHeader}>Click on the egg to get your price!</Text>
                    <View style={Dis}>
                        <Text style={styles.congratulations}>Congratulations</Text>
                        <Text style={styles.kindCoin}>You got a {kind} Coin</Text>
                    </View>
                </View>
                
                <Animated.View style={styles.imageContainer}>
                    
                    {image}
                    {/* <Image style={styles.eggImage} source = {require("../../src/egg-full.png")}/> */}
                </Animated.View>

                <View style={Dis}>
                    <Text style={styles.coinAdded}>{kindNum} Coins have been added to your balance</Text>
                </View>
            </View>
        </View>
    )
}



export default MiniGame;