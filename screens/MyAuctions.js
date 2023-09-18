import { useState,useContext } from "react";
import { AppContext } from "../config/app-context";
import { View,StyleSheet,TouchableOpacity,Image,FlatList,Text,StatusBar,Platform,SafeAreaView } from "react-native";
import { db } from "../config/firebase.config";
import { getDocs,collection,query,where,orderBy } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash,faPen } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../config/theme";
import { getRemainingTime } from "../utilities/time-remaining";
import { CommaSepNum } from "../utilities/comma-sep-num";

export function MyAuctions() {
    const [myAuctions,setMyAuctions] = useState([]);
    const {user} = useContext(AppContext);

    const getMyAuctions = async () => {
        const q = query(
            collection(db,'auctions'),
            where('createdBy','==',JSON.parse(user).user_uid),
            orderBy('createdAt','desc')
            );
        const onSnap = await getDocs(q);
        setMyAuctions(onSnap.docs.map(doc => {
            return {
                id:doc.id,
                data:{
                    ...doc.data()
                }
            }
        }))
    }
    getMyAuctions()

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.heading}>Auctions I created</Text>

                <View style={styles.myAuctionsBlock}>
                    <FlatList
                    data={myAuctions}
                    renderItem={({item}) => (
                        <View style={styles.auctionItem}>
                            <View style={styles.actionSection}>
                                <TouchableOpacity style={styles.actionCircle}>
                                    <FontAwesomeIcon 
                                    icon={faPen} 
                                    size={24}
                                    color={theme.colors.navy}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.auctionDetails}>
                                <Image
                                style={styles.productImg}
                                source={{uri:item.data.photoUrl}}/>
                                <View>
                                    <Text style={{fontSize:12,color:theme.colors.navy}}>
                                        {getRemainingTime(item.data.endDate)}
                                    </Text>
                                    <Text style={{fontSize:14,color:theme.colors.dullRed1}}>
                                        {item.data.title.length > 20 ? item.data.title.slice(0,20)+'...' : item.data.title}
                                    </Text>
                                    <Text style={{fontSize:20,fontWeight:'600',color:theme.colors.dullRed1}}>
                                        ₦{CommaSepNum(item.data.initialPrice)}
                                    </Text>
                                </View>
                            </View>
                            
                            <View style={styles.actionSection}>
                                <TouchableOpacity style={styles.actionCircle}>
                                    <FontAwesomeIcon
                                    icon={faTrash}
                                    size={24}
                                    color={theme.colors.navy}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    key={({item}) => item.id}/>
                </View>
            </View>
        </SafeAreaView>
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
    heading:{
        fontSize:22
    },
    auctionItem:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:8,
        padding:6,
        marginBottom:6
    },
    myAuctionsBlock:{
    
    },
    actionSection:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    auctionDetails:{
        flex:4,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        gap:4,
        marginHorizontal:4,
    },
    productImg:{
        width:80,
        height:100,
        borderRadius:8
    },
    actionCircle:{
        width:44,
        height:44,
        backgroundColor:theme.colors.dullRed0,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
    }
})