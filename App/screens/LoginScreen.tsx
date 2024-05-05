import React, { useState } from 'react';
//import { Plus } from '@tamagui/lucide-icons'
import { StatusBar} from 'expo-status-bar';
import { XStack, YStack, Text, Image, Input, Button, Theme, createFont } from 'tamagui';
import { useFonts } from 'expo-font';
import SegmentedInput from './SegmentedInput';

export default function App() {
  const [fontsLoaded] = useFonts({
    // Your font imports...
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
          {/* Your back button */}
          <Button
            //icon="arrow-back"
            onPress={() => {}}
            position="absolute"
            left={10}
            top={10}
          />
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
            //icon="arrow-back"
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
          <SegmentedInput length={6} onChange={setVerificationCode} />
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
