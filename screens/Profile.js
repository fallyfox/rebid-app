import { useState,useEffect } from 'react';
import { 
    View,
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform,
} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { theme } from '../config/theme';
import { db } from '../config/firebase.config';
import { CommaSepNum } from '../utilities/comma-sep-num';
import { getDoc,doc,getDocs,collection } from 'firebase/firestore';

const userUID = 'MqFcmcotWvRoTtHd1s91lR81yi13';//REMEMBER TO UPDATE AND DELETE

export function Profile({navigation}) {
    const [user,setUser] = useState({});
    const [users,setUsers] = useState([]);

    console.log('>> USER RESULT >>>',user.firstName);//DELETE AFTER USE

    // GET A SINGLE DOCUMENT
    const getUser = async () => {
        await getDoc(doc(db,'users',userUID))
        .then(onSnap => setUser(onSnap.data()))
        .catch(e => console.error(e))
    }
    getUser();//Call function to 

    // const getUsers = async () => {
    //     const onSnap = await getDocs(collection(db,'users'));
    //     setUsers(onSnap.docs.map(doc => {
    //         return {
    //             id:doc.id,
    //             data:{
    //                 ...doc.data()
    //             }
    //         }
    //     }))
    // }
    // getUsers();


    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image 
                    width={80}
                    height={80}
                    style={styles.profileImg}
                    source={require('../assets/user.jpg')}
                    alt='user photo'/>

                    <Text style={styles.title}>Mario Freeman</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}>Earned</Text>
                            <Text style={styles.infoText}>₦{CommaSepNum(213000)}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.body}>
                    {/* row of two equal button */}
                    {/* span through button */}
                </View>
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
    header:{

    },
    profileImg:{

    },
    title:{

    },
    infoRow:{

    },
    info:{

    },
    infoTitle:{

    },
    infoText:{

    },
    body:{

    }
})