import * as React from 'react';

import { StyleSheet, View, Text, Pressable } from 'react-native';
import {
  setEnvironment,
  isReadyToPay,
  EEnvironment,
} from 'react-native-google-pay-android';

export default function App() {
  const [isReadyGooglePay, setIsReadyGooglePay] =
    React.useState<boolean>(false);

  const func = async () => {
    setEnvironment(EEnvironment.ENVIRONMENT_PRODUCTION);

    const isReady = await isReadyToPay(
      ['MASTERCARD', 'VISA'],
      ['PAN_ONLY', 'CRYPTOGRAM_3DS']
    );

    console.log('isReady: ', isReady);

    setIsReadyGooglePay(isReady);
  };

  React.useEffect(() => {
    func();
  }, []);

  const onPressGooglePay = () => {};

  return (
    <View style={styles.container}>
      <Text>isReadyGooglePay: {isReadyGooglePay}</Text>

      {isReadyGooglePay && (
        <Pressable style={styles.googlePayButton} onPress={onPressGooglePay}>
          <Text style={styles.googlePayButtonText}>Google Pay</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googlePayButton: {
    marginTop: 20,
    width: 100,
    height: 30,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googlePayButtonText: {
    color: 'black',
  },
});
