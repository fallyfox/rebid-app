import { View,SafeAreaView,StyleSheet,ActivityIndicator,Platform,StatusBar } from "react-native"
import { theme } from "../config/theme";

export function ScreenLoaderIndicator() {
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <View><ActivityIndicator size="large" color={theme.colors.navy} /></View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'white',
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
})