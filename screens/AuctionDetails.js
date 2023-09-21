import { useState,useContext,useEffect } from "react";
import { AppContext } from "../config/app-context";
import { View,StyleSheet,TouchableOpacity,ImageBackground,Text,StatusBar,Platform,SafeAreaView,Alert,ScrollView } from "react-native";
import { db } from "../config/firebase.config";
import { onSnapshot,collection,query,where,orderBy,getDoc,doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { theme } from "../config/theme";
import { getRemainingTime } from "../utilities/time-remaining";
import { CommaSepNum } from "../utilities/comma-sep-num";
import { ScreenLoaderIndicatorOpacity } from "../utilities/screen-loader-indicator-with-opacity";

export function AuctionDetails({navigation,route}) {
    const {auctionData} = route.params;
    const [showLoader,setShowLoader] = useState(false);
    const [bid,setBid] = useState(0);

    return (
        <>
        <ScreenLoaderIndicatorOpacity controlState={showLoader}/>
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <ScrollView>
                    <ImageBackground
                    source={{uri:auctionData.photoUrl}}
                    style={styles.productImg}>
                        <View style={styles.layer}>
                            <Text style={styles.title}>{auctionData.title}</Text>
                            <Text style={styles.currentBid}>Current bid: ₦{CommaSepNum(780084)}</Text>
                        </View>    
                    </ImageBackground>

                    <Text style={styles.desc}>{auctionData.description}</Text>

                    <View style={styles.bidBlock}>
                        <View style={styles.bid}>
                            <Text style={styles.increText}>₦{CommaSepNum(bid)}</Text>
                        </View>

                        <View style={styles.incrementBlock}>
                            <TouchableOpacity style={styles.add} 
                            onPress={() => setBid(bid+auctionData.bidIncrement)}>
                                <Text style={styles.increText}>+{auctionData.bidIncrement}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.minus}
                            onPress={() => setBid(bid-auctionData.bidIncrement)}>
                                <Text style={styles.increText}>-{auctionData.bidIncrement}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.bidSubmit}>
                            <Text style={styles.increText}>PLACE BID</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView> 
            </View>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
    productImg:{
        height:420,
        justifyContent:'flex-end'
    },
    desc:{
        marginTop:20
    }, 
    layer:{
        paddingHorizontal:16,
        paddingTop:8,
        backgroundColor:'rgba(92,92,92,0.5)'
    },
    title:{
        fontSize:28,
        color:'white'
    },
    currentBid:{
        fontSize:20,
        color:theme.colors.dullRed0,
    },
    bid:{
        height:60,
        borderRadius:50,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20,
    },
    bidBlock:{
        marginTop:20,
    },
    incrementBlock:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    add:{
        width:'49%',
        height:48,
        borderTopLeftRadius:50,
        backgroundColor:theme.colors.dullRed1,
        justifyContent:'center',
        alignItems:'center'
    },
    minus:{
        width:'49%',
        height:48,
        borderTopRightRadius:50,
        backgroundColor:theme.colors.navy,
        justifyContent:'center',
        alignItems:'center'
    },
    bidSubmit:{
        height:48,
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    increText:{
        fontSize:22,
        color:'white'
    }
})