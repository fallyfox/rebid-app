import { useState } from 'react';
import { 
    View,
    Text,
    Alert,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { theme } from '../config/theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import { db } from '../config/firebase.config';
import { doc,updateDoc } from 'firebase/firestore';
import { categories } from '../assets/categories';
import { ScreenLoaderIndicatorOpacity } from '../utilities/screen-loader-indicator-with-opacity';

const schema = yup.object().shape({
    title:yup.string().min(16).max(60).required(),
    description:yup.string().min(16).max(1200).required(),
    initialPrice:yup.number().min(10).required(),
    initialPrice:yup.number().min(1).required(),
    photoUrl:yup.string().required(),
    endDate:yup.string().required(),
});

export function UpdateAuction({navigation,route}) {
    const {docuid,docData} = route.params;
    const [categorySelected,setCategorySelected] = useState(docData.category);
    const [showLoader,setShowLoader] = useState(false);

    console.log(docuid,docData);

    const handleUpdateAuction = async (title,description,photoUrl,endDate) => {
        setShowLoader(true);

        await updateDoc(doc(db,'auctions',docuid),{
            title:title,
            description:description,
            photoUrl:photoUrl,
            category:categorySelected,
            endDate:Number(endDate)
        })
        .then(() => {
            setShowLoader(false);

            Alert.alert(
                'Info',
                'Your auction was update',
                [{
                    text:'Dismiss',
                }]
            )
        })
        .catch((e) => {
            setShowLoader(false);
            
            Alert.alert(
                'Info',
                'An error has occured!',
                [{
                    text:'Dismiss',
                    onPress:console.error(e)
                }]
            )
        })
    }

    return (
        <>
        <ScreenLoaderIndicatorOpacity controlState={showLoader}/>
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>

                <Text style={{
                    color:theme.colors.navy,
                    fontSize:22,
                }}>Update your auction</Text>

                <View style={styles.form}>
                    <Formik
                        initialValues={{
                            title:'',
                            description:'',
                            photoUrl:'',
                            endDate:''
                        }}
                        onSubmit={values => {
                            const dateToTStamp = new Date(`${values.endDate}`).getTime();
                            handleUpdateAuction(values.title,values.description,values.photoUrl,dateToTStamp);
                        }}
                        validationSchema={schema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, touched,errors }) => (
                            <>
                             <View>
                                <TextInput
                                mode='outlined'
                                value={values.title}
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                placeholder='auction title'/>
                                {errors.title && touched.title 
                                ? <Text style={styles.errorText}>{errors.title}</Text> 
                                : null}
                            </View>
                             <View>
                                <TextInput
                                mode='outlined'
                                multiline={true}
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                placeholder='describe your auction'/>
                                {errors.description && touched.description 
                                ? <Text style={styles.errorText}>{errors.description}</Text> 
                                : null}
                            </View>
                            <View>
                                <TextInput
                                mode='outlined'
                                value={values.photoUrl}
                                onChangeText={handleChange('photoUrl')}
                                onBlur={handleBlur('photoUrl')}
                                placeholder='link to your photo'/>
                                {errors.photoUrl && touched.photoUrl 
                                ? <Text style={styles.errorText}>{errors.photoUrl}</Text> 
                                : null}
                            </View>
                            <View>
                                <TextInput
                                mode='outlined'
                                value={values.endDate}
                                onChangeText={handleChange('endDate')}
                                onBlur={handleBlur('endDate')}
                                placeholder='eg MM/DD/YYYY'/>
                                {errors.endDate && touched.endDate 
                                ? <Text style={styles.errorText}>{errors.endDate}</Text> 
                                : null}
                            </View>

                            <View style={{
                                backgroundColor:theme.colors.dullRed1,
                                padding:8,
                                borderRadius:8,
                                display:categorySelected ? 'flex' : 'none',
                            }}>
                                <Text style={{color:'white'}}>Category: {categorySelected}</Text>
                            </View>

                            <View style={{
                                flexDirection:'row',
                                flexWrap:'wrap',
                                gap:8,
                                paddingVertical:8
                                }}>
                                {
                                    categories.map(cat => (
                                        <TouchableOpacity 
                                        key={cat.id}
                                        style={{
                                            backgroundColor:theme.colors.navy,
                                            minWidth:84,
                                            paddingVertical:12,
                                            paddingHorizontal:8,
                                            borderRadius:50,
                                        }}
                                        onPress={() => setCategorySelected(cat.title.toLowerCase())}>
                                            <Text
                                            style={{color:'white',textAlign:'center'}}>{cat.title}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>

                            <Button 
                            mode='contained'
                            buttonColor={theme.colors.navy}
                            textColor={theme.colors.dullRed0}
                            style={{paddingVertical:8}}
                            onPress={handleSubmit}>Update Auction</Button>
                            </>
                        )}
                    </Formik>
                </View>
            </View>    
        </SafeAreaView>
        </>
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
    form:{
        flexDirection:'column',
        gap:8,
    },
    errorText:{
        fontSize:12,
        color:theme.colors.red,
    },
})