import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { YStack, Text, Image, Input, Button, Theme, XStack } from 'tamagui';
import { useFonts } from 'expo-font';
import SegmentedInput from './SegmentedInput';
import { useNavigation } from '@react-navigation/native';

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { firebaseConfig } from '../firebase/firebaseConfig';
firebase.initializeApp(firebaseConfig);

export default function AuthScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "poppins-black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
    "poppins-black-italic": require("../assets/fonts/Poppins/Poppins-BlackItalic.ttf"),
    "poppins-bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "poppins-bold-italic": require("../assets/fonts/Poppins/Poppins-BoldItalic.ttf"),
    "poppins-extra-bold": require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    "poppins-extra-bold-italic": require("../assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf"),
    "poppins-extra-light": require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    "poppins-extra-light-italic": require("../assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf"),
    "poppins-italic": require("../assets/fonts/Poppins/Poppins-Italic.ttf"),
    "poppins-light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "poppins-light-italic": require("../assets/fonts/Poppins/Poppins-LightItalic.ttf"),
    "poppins-medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "poppins-medium-italic": require("../assets/fonts/Poppins/Poppins-MediumItalic.ttf"),
    "poppins-regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "poppins-semi-bold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "poppins-semi-bold-italic": require("../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf"),
    "poppins-thin": require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
    "poppins-thin-italic": require("../assets/fonts/Poppins/Poppins-ThinItalic.ttf")
  });
  const recaptchaVerifier: any = React.useRef(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber]: any = React.useState();
  const [verificationId, setVerificationId]: any = React.useState();
  const [verificationCode, setVerificationCode]: any = React.useState();
  const [message, showMessage]: any = React.useState();
  const attemptInvisibleVerification = false;
  const [faled, setFaled] = useState(false);


  const handleSignIn = async () => {
    if (mobileNumber) {
      try {
        const formattedMobileNumber = `+1${mobileNumber}`;
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
          formattedMobileNumber,
          recaptchaVerifier.current
        );
        setVerificationId(verificationId);
        setStep(2);
      }
      catch (error) {
        console.log(error);
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await firebase.auth().signInWithCredential(credential);
      navigation.navigate('Main');
    }
    catch (error) {
      console.log(error);
      setFaled(true);
    }
  };

  return (
    <Theme name="light">
      <StatusBar style="auto" />
      {step === 1 && (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification={attemptInvisibleVerification}
          />
          <Image
            source={require('../assets/mobile_icon.png')}
            width={156}
            height={69}
            marginTop="-40%"
            marginBottom="10%"
          />
          <Input
            backgroundColor={'white'}
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="numeric"
            maxLength={10}
            width="82%"
            marginBottom="10%"
          />
          <Button
            onPress={handleSignIn}
            backgroundColor="#EFE811"
            width="50%"
            height="4.5%"
          >
            Sign In
          </Button>
        </YStack>
      )}
      {step === 2 && (
        <YStack flex={1} justifyContent="flex-start" alignItems="center">
          <XStack
            width="100%"
            paddingHorizontal="5%"
            paddingVertical="3%"
            justifyContent="flex-start"
            alignItems="flex-start" // Adjusted alignment
          >
            <Button
              onPress={() => setStep(1)}
              backgroundColor="transparent"
              marginTop="15%"
              width="15%"
              height="auto"
              paddingHorizontal="0"
              paddingVertical="0"
            >
              <Image
                source={require('../assets/back_icon.png')}
                width={24}
                height={24}
              />
            </Button>
          </XStack>
          <Text
            color={'#505050'}
            style={{
              fontFamily: 'poppins-bold',
              fontWeight: '700',
              fontSize: 24,
              marginTop: '40%', // Adjusted the marginTop
              marginBottom: '2%', // Added marginBottom
            }}
            textAlign="center"
          >
            Verify Your Account
          </Text>
          <Text
            color={'#707070'}
            style={{
              fontFamily: 'poppins-extralight',
              fontWeight: '400',
              fontSize: 14,
            }}
            textAlign="center"
            width="50%"
            marginBottom="10%"
          >
            Please enter the 6-digit code we sent to your phone number
          </Text>
          <SegmentedInput 
            length={6} 
            onChange={setVerificationCode} 
            failed={faled}
            />
          <Button
            onPress={handleVerifyCode}
            backgroundColor="#EFE811"
            width="50"
            height="4.5%"
          >
            Confirm
          </Button>
        </YStack>
      )}
    </Theme>
  );
}

