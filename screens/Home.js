import { useContext,useEffect, useState } from "react";
import { AppContext } from "../config/app-context";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    TouchableOpacity,
    Image,
    FlatList,
    Alert
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { theme } from '../config/theme';
import { demoProducts } from '../assets/demo-products';
import { categories } from "../assets/categories";
import { CommaSepNum } from '../utilities/comma-sep-num';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Sell } from './Sell';
import { History } from './History';
import { Profile } from './Profile';
import { MyBids } from './MyBids';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDocs,collection,orderBy,query } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { ScreenLoaderIndicator } from "../utilities/screen-loader-indicator";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { getRemainingTime } from "../utilities/time-remaining";
import { MyAuctions } from "./MyAuctions";

const Tab = createBottomTabNavigator();

function MyHome({navigation}) {
    const { userToken,logout } = useContext(AppContext);
    const [auctions,setAuctions] = useState([]);
    const [expiringSoon,setExpiringSoon] = useState([]);
    
    const getAuctions = async () => {
        const q = query(collection(db,'auctions'),orderBy('createdAt','desc'));
        const onSnap = await getDocs(q);
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

    // sort existing auctions by endDate
    useEffect(() => {
            const sortedAuctions = auctions.sort((a,b) => {
            const previousDate = new Date(a.data.endDate).getTime();
            const currentDate = new Date(b.data.endDate).getTime();
    
            return currentDate - previousDate
        });
        setExpiringSoon(sortedAuctions);
    },[])

    // AUTHORIZATION
    const checkUserToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            !token ? navigation.navigate('signin') : null;
        } catch (error) {
            Alert.alert('Error','problem fetching authorization token @ home');
        }
    }

    useEffect(() => {
        checkUserToken();
    },[userToken]);
    //AUTHORIZATION

    return (
        auctions.length < 1
        ?
        <ScreenLoaderIndicator/>
        :
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={logout}>
                        <FontAwesomeIcon icon={faSignOut} color={theme.colors.navy} size={30}/>
                    </TouchableOpacity>
                    <Text style={styles.brandName}>Rebid</Text>
                </View>

                {/* categories block */}
                <View style={styles.categoriesBlock}>
                    {categories.map(cat => (
                        <TouchableOpacity 
                        style={styles.catOption} 
                        key={cat.id}
                        onPress={() => navigation.navigate('category',{
                            category:cat.title
                        })}>
                            <FontAwesomeIcon 
                            icon={cat.icon} 
                            size={40}
                            color={theme.colors.dullRed1}/>
                            <Text style={{fontSize:16,color:theme.colors.dullRed0}}>
                                {cat.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.expiringBlock}>
                    <Text style={styles.expSoonText}>Expiring soon</Text>
                    
                    <View>
                        <FlatList
                        data={expiringSoon}
                        renderItem={({item}) => (
                            <TouchableOpacity 
                            style={[
                                styles.expItem,
                                {width:340,backgroundColor:theme.colors.dullRed0,marginRight:18,}
                                ]}>
                                <Image
                                style={styles.productImg}
                                source={{uri:item.data.photoUrl}}/>
                                <View style={styles.expItemsDetailsBlk}>
                                    <Text style={{fontSize:12}}>{getRemainingTime(new Date(item.data.endDate).getTime())}</Text>
                                    <Text style={{fontSize:16}}>{item.data.title.length > 24 ? item.data.title.slice(0,24)+'...' : item.data.title}</Text>
                                    <Text style={{fontSize:20,fontWeight:'600'}}>₦{CommaSepNum(item.data.initialPrice)}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        key={({item}) => item.id}/>
                    </View>
                </View>

                <View style={styles.recentBlock}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.expSoonText}>Recent auctions</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('auctions')}>
                            <Text style={[styles.expSoonText,{color:theme.colors.dullRed1}]}>all auctions</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* recent auctions */}
                    <View>
                        <FlatList
                        data={auctions}
                        renderItem={({item}) => {
                            return (
                            <TouchableOpacity 
                            style={[
                                styles.expItem,
                                {backgroundColor:theme.colors.navy,marginBottom:8,}
                                ]}>
                                <Image
                                style={styles.productImg}
                                source={{uri:item.data.photoUrl}}/>
                                <View style={styles.expItemsDetailsBlk}>
                                    <Text style={{fontSize:12,color:theme.colors.dullRed0}}>
                                    {getRemainingTime(item.data.endDate)}
                                    </Text>
                                    <Text style={{fontSize:16,color:theme.colors.dullRed1}}>
                                        {item.data.title.length > 30 ? item.data.title.slice(0,30)+'...' : item.title}
                                    </Text>
                                    <Text style={{fontSize:20,fontWeight:'600',color:theme.colors.dullRed1}}>
                                        Initial price: ₦{CommaSepNum(item.data.initialPrice)}
                                    </Text>
                                    <Text style={{fontSize:20,fontWeight:'600',color:theme.colors.dullRed1}}>
                                        Bid increment: ₦{CommaSepNum(item.data.bidIncrement)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        key={({item}) => item.id}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export function Home() {
    return (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Sell') {
                iconName = focused ? 'ios-cart-sharp' : 'ios-cart-outline';
              } else if (route.name === 'Bids') {
                iconName = focused ? 'hammer' : 'hammer-outline';
              } else if (route.name === 'My auctions') {
                iconName = focused ? 'md-file-tray-stacked' : 'ios-file-tray-stacked-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.dullRed1,
            tabBarInactiveTintColor: 'gray',
          })}
        >
            <Tab.Screen name='Home' component={MyHome} options={{headerShown:false}} />
            <Tab.Screen name='Sell' component={Sell} options={{headerShown:false}} />
            <Tab.Screen name='Bids' component={MyBids} options={{headerShown:false}}/>
            <Tab.Screen name='My auctions' component={MyAuctions} options={{headerShown:false}}/>
            <Tab.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
        </Tab.Navigator>
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
    header:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    brandName:{
        fontSize:42,
        fontWeight:'bold',
        color:theme.colors.dullRed1
    },
    headerControls:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    expiringBlock:{
        flex:1.5,
        flexDirection:'column',
        justifyContent:'center',
        gap:8
    },
    expSoonText:{
        fontSize:20,
        fontWeight:'200'
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
    categoriesBlock:{
        flex:2,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
        alignContent:'center',
        gap:6
    },
    catOption:{
        height:120,
        width:'32%',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:theme.colors.navy,
        borderRadius:12,
        paddingHorizontal:8,
    }
})