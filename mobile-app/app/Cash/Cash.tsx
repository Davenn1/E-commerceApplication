import { View, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../Redux/hook";


const Cash = ()=>{
    const dispatch = useAppDispatch();
    const cash = useAppSelector(state=>state.cash)
    return (
        <Text style={styles.priceText}>{cash.cash.toFixed(2)}</Text>
    )
}

export default Cash;
const styles = StyleSheet.create({
    priceText:{
        fontSize:32,
        fontWeight:"bold",
        color: "#8375a4",
        textAlign:"right",
        marginRight:10
      }
})