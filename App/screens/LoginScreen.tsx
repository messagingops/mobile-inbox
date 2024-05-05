import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { YStack, Text, Image, Input, Button, Theme, ButtonIcon } from 'tamagui';
import { useFonts } from 'expo-font';
//import { Plus, ChevronLeft } from '@tamagui/lucide-icons';
import SegmentedInput from './SegmentedInput';

export default function App() {
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
  const [mobileNumber, setMobileNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1); // Track the step of the authentication process

  const handleSignIn = () => {
    // Validate mobile number (you can add your validation logic here)
    if (mobileNumber) {
      setStep(2); // Move to next step
    }
  };

  const handleVerifyCode = () => {
    // Validate verification code (you can add your validation logic here)
    if (verificationCode.length === 6) {
      // Move to next step or perform desired action after successful verification
      console.log("Verification Successful");
    }
  };

  return (
    <Theme name="light">
      <StatusBar style="auto" />
      {step === 1 && (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Image
            source={require('../assets/mobile_icon.png')}
            width={156}
            height={69}
            marginTop="-40%"
            marginBottom="10%" // Adjusted to move the image up
          />
          <Input
            backgroundColor={'white'}
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="numeric"
            maxLength={10} // Assuming mobile number is 10 digits
            width="82%"
            marginBottom="10%" // Adjusted to move the input field up
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
        <YStack flex={1} justifyContent="center" alignItems="center">
          {/* Your back button */}
          <Button
            onPress={() => setStep(1)}
            position="absolute"
            left={10}
            top={10}
          />
          <Text
            color={'#505050'}
            style={{ 
              fontFamily: 'poppins-bold',
              fontWeight: '700',
              fontSize: 24,
            }}
            textAlign="center"
            marginBottom="2%" // Adjusted to move the text up
            marginTop="-35%"
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
            marginBottom="10%" // Adjusted to move the text up
          >
            Please enter the 6-digit code we sent to your phone number
          </Text>
          <SegmentedInput length={6} onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          } } />
          <Button
            onPress={handleVerifyCode}
            backgroundColor="#EFE811"
            width="50%"
            height="4.5%"
          >
            Confirm
          </Button>
        </YStack>
      )}
    </Theme>
  );
}