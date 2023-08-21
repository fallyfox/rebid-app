import { View,SafeAreaView,StyleSheet } from 'react-native';

export function CreateAccount() {
    return (
        <SafeAreaView style={styles.wrapper}>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
})