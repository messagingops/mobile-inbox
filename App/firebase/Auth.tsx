import { signInWithPhoneNumber, signInWithCredential, ConfirmationResult, AuthCredential } from "firebase/auth";
// import { RecaptchaVerifier } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";
import { setDoc, doc, getDoc } from "firebase/firestore";

export type SignInProps = {
    phoneNumber: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
};

const authError = (
    error: FirebaseError,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    const errorCode = error.code || ''; // Use an empty string as default value if error.code is undefined
    setError(errorCode);
};


// export const signInUser = async ({
//     phoneNumber,
//     setError
// }: SignInProps) => {
//         try {
//             try {
//                 // Initialize RecaptchaVerifier with an empty string as the ID
//                 const recaptchaVerifier = new RecaptchaVerifier('', {
//                     size: 'invisible'
//                 });
        
//                 const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
//                 return confirmationResult;
//             } catch (error) {
//                 authError(error as FirebaseError, setError);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     export const confirmVerificationCode = async (confirmationResult: ConfirmationResult, setError: React.Dispatch<React.SetStateAction<string>>) => {
//         try {
//             // Confirm verification code and sign in
//             const credential = await signInWithCredential(auth, confirmationResult as unknown as AuthCredential);
//             return credential;
//         } catch (error) {
//             authError(error as FirebaseError, setError);
//         }
//     };

//     const registerPhoneNumber = async (phoneNumber: string) => {
//         try {
//             // Add phone number to users collection
//             await setDoc(doc(db, "users", phoneNumber), { phoneNumber });
//         } catch (error) {
//             console.error("Error registering phone number:", error);
//         }
//     }; 
