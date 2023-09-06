import * as React from 'react';
import { 
    View,
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Platform,
} from 'react-native';
import { theme } from '../config/theme';
import { db } from '../config/firebase.config';
import { getDocs,collection } from 'firebase/firestore';
import { CommaSepNum } from '../utilities/comma-sep-num';
import { ScreenLoaderIndicator } from '../utilities/screen-loader-indicator';

export function Auctions({navigation}) {
    const [auctions,setAuctions] = React.useState([]);

    const getAuctions = async () => {
        const onSnap = await getDocs(collection(db,'auctions'))
        setAuctions(onSnap.docs.map(doc => {
            return {
                id:doc.id,
                data:{
                    ...doc.data()
                }
            }
        }))
    }
    getAuctions();

    return (
        auctions.length > 0 
        ?
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <View style={{marginTop:16}}>
                    <FlatList
                    data={auctions}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                        style={[
                            styles.expItem,
                            {backgroundColor:theme.colors.navy,marginBottom:8,}
                            ]}>
                            <Image
                            style={styles.productImg}
                            source={{uri:item.data.photoUrl}}/>
                            <View style={styles.expItemsDetailsBlk}>
                                <Text style={{fontSize:12,color:theme.colors.dullRed0}}>Ending in 1d 5hrs 32min 44secs</Text>
                                <Text style={{fontSize:16,color:theme.colors.dullRed1}}>{item.data.title.length > 24 ? item.data.title.slice(0,24)+'...' : item.data.title}</Text>
                                <Text style={{fontSize:20,fontWeight:'600',color:theme.colors.dullRed1}}>₦{CommaSepNum(item.data.initialPrice)}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    key={({item}) => item.id}/>
                </View>
            </View>    
        </SafeAreaView>
        :
        <ScreenLoaderIndicator/>
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
    },
    expItem:{
        flexDirection:'row',
        gap:12,
        borderRadius:8,
        padding:8,
    },
    productImg:{
        width:80,
        height:100,
        borderRadius:8
    },
    recentBlock:{
        flex:2,
        paddingTop:8,
        flexDirection:'column',
        justifyContent:'center',
        gap:8
    },
})