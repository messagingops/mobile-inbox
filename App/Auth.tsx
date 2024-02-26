import {
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        updateProfile,
    } from "firebase/auth";
    import { auth, db } from "./firebaseConfig";
    import { FirebaseError } from "firebase/app";
    import { getFirestore, setDoc, doc } from "firebase/firestore";
    import AsyncStorage from "@react-native-async-storage/async-storage";
    
    export type SignUpProps = {
        email: string;
        password: string;
        setError: React.Dispatch<React.SetStateAction<string>>;
    };
    
    export const signUpUser = ({
        email,
        password,
        setError,
}: SignUpProps) => {
        createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                        const user = userCredential.user;

                        setDoc(doc(db, "users", userCredential.user.uid), {
                                email: email,
                        }).catch((error: FirebaseError) => authError(error, setError));
                });
}; 
    
    export const signInUser = (
        email: string,
        password: string,
        setError: React.Dispatch<React.SetStateAction<string>>
    ) => {
        signInWithEmailAndPassword(auth, email, password).catch(
            (error: FirebaseError) => authError(error, setError)
        );
    };
    
    export const signOutUser = (
        setError: React.Dispatch<React.SetStateAction<string>>
    ) => {
        
        AsyncStorage.removeItem("user");
        
        signOut(auth).catch((error: FirebaseError) => authError(error, setError));
    };
    
    const authError = (
        error: FirebaseError,
        setError: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const errorCode: string = error.code;
        setError(errorCode.split("/")[1].replace(/-/g, " "));
    
    };
  
  
  
  