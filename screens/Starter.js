import { View,Text,ImageBackground,StyleSheet } from "react-native";
import { theme } from "../config/theme";
import { Button } from "react-native-paper";

export function Starter({navigation}) {
    return (
        <ImageBackground
        source={require('../assets/rebid_intro_bg.jpg')}
        style={styles.bg}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.brandName}>Welcome to Rebid</Text>
                    <Text style={styles.subTitle}>
                        Buy auctioned products, and create auctions on the go
                    </Text>
                </View>

                <Button 
                mode="contained"
                onPress={() => navigation.navigate('my-home')}>CONTINUE</Button>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    bg:{
        flex:1,
    },
    container:{
        flex:1,
        //ADD THIS TOO
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:"rgba(238,226,222,0.5)"
    },
    brandName:{
        fontSize:38,
        color:theme.colors.navy,
        fontWeight:'bold',
        textAlign:'center'
    },
    subTitle:{
        fontSize:24,
        color:theme.colors.navy,
        textAlign:'center'
    }
})