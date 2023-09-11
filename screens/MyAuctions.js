import { useState } from "react";
import { View,StyleSheet,TouchableOpacity,Text,StatusBar,Platform,SafeAreaView } from "react-native";
import { db } from "../config/firebase.config";
import { getDocs,collection,query,where,orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function MyAuctions() {
    const [myAuctions,setMyAuctions] = useState([]);
    const [UID,setUID] = useState(null);

    const getMyUID = async () => {
        const user = await AsyncStorage.getItem('user');
        let uid = JSON.parse(user);

        setUID(uid.user_uid)
    }
    getMyUID()

    const getMyAuctions = async () => {
        const q = query(collection(db,'auctions'),where('createdBy','==',UID));
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

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "rgba(238,226,222,0.5)",
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
})