import React from 'react';
import { AppContext } from '../config/app-context';
import  { Paystack }  from 'react-native-paystack-webview';
import { View } from 'react-native';
import { paystackPublicKey } from '../config/paystack_pub_key.config';

export function Pay({navigation,route}) {
    const {id,amount} = route.params;
    const {user} = React.useContext(AppContext);
    
    return (
        <View style={{ flex: 1 }}>
            <Paystack  
                paystackKey={paystackPublicKey}
                amount={amount}
                billingEmail={JSON.parse(user).user_email}
                activityIndicatorColor="green"
                onCancel={(e) => {
                    // handle response here
                    navigation.navigate('my-home')
                }}
                onSuccess={(res) => {
                    //write the database payments details

                    navigation.navigate('my-home')
                }}
                autoStart={true}
            />
        </View>
    );
}