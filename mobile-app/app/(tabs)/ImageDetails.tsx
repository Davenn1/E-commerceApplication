import { View, Image , Text} from "react-native";
import { RootStackParamList, RootStackScreenProps } from "../Navigation/RootStackParamList";
import { Platform, StyleSheet } from 'react-native';

export type ImageDetailsParams = {
    image : string
}

const ImageDetails = ({navigation, route}:RootStackScreenProps<"Image">)=>{
    return (
        <View style={styles.container}>
            <Image style={styles.Image} source={{uri: route.params.image}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:400,
        height:800,
        backgroundColor:"white",
        display:"flex",
        alignItems:"center"
        
    },
    Image:{
        width:370,
        height:370,
        marginTop:150
    }
})


export default ImageDetails;