import { 
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform,
} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { theme } from '../config/theme';
import { db } from '../config/firebase.config';

export function ScreenName({navigation}) {

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                
            </View>    
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container:{
        flex:1,
        paddingHorizontal:8,
        flexDirection:'column',
        gap:16,
    },
})