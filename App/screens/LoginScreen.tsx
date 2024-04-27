import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { XStack, YStack, Text, Image, Input, Button, Theme, createFont } from 'tamagui';

export default function App() {
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
          <Text
            color={'#505050'}
            fontFamily='$body' // Use the custom Poppins font
            fontSize={24}
            lineHeight={36}
            fontWeight='700'
            textAlign="center"
            marginBottom="10%" // Adjusted to move the text up
          >
            Verify Your Account
          </Text>
          <Input
            placeholder="Enter Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
            maxLength={6} // Assuming verification code is 6 digits
            width="82%"
            marginBottom="10%" // Adjusted to move the input field up
          />
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