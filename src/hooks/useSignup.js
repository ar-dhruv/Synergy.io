import { useState, useEffect } from "react";
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  //STATES FOR ERROR AND PENDING
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false); //STATES FOR CLEAN-UP FUNCTION

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null); //WE RESET THE ERROR TO BE NULL EVERYTIME WE TRY TO SIGNUP
    setIsPending(true);

    try {
      //TRY TO SIGNUP THE USER
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      //THIS ERROR IS THROWN BY US IN CASES WE DONT GET BACK THE RES BACK eg. BAD NETWORK
      if (!res) {
        throw new Error("Could not complete signup");
      }

      //UPLOAD USER THUMBNAIL TO THE FIREBASE
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`; //WE UPLAOD THE IMAGE IN A THUMBNAILS FOLDER...INSIDE THERE IS ANOTHER FOLDER WITH A NAME OF THE USER ID AND THEN INSIDE THE TUMBNAIL IMAGE FILE WITH ITS ORIGINAL NAME
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgURL = await img.ref.getDownloadURL(); //WE STORE OUR THUMBNAIL IN THE FIREBASE AT uploadPath AS img & THEN GETS ITS URL AS imgURL

      //ADD DISPLAY NAME & DISPLAY IMAGE TO THE USER IN FIREBASE
      await res.user.updateProfile({
        displayName: displayName,
        photoURL: imgURL,
      });

      //CREATING A USER DOCUMNET & STORING IN FIRESTORE DATABASE SO THAT WE CAN HAVE ACCESS TO THE DISPLAY NAME IMAGE ETC OF A USER THAT IS NOT EVEN LOGGED IN BUT IS A PART OF THE TEAM SO THAT WE CAN DISPLAY THAT INFORMATION IN THE SIDEBAR
      await projectFirestore.collection("users").doc(res.user.uid).set({
        online: true,
        displayName: displayName,
        photoURL: imgURL,
      }); //WE CREATE USER DOCUMENTS INSIDE THE USERS COLLECTION WHERE EACH USER DOCUMNET WILL HAVE SAME ID AS THE USER ID ITS BELONGS

      //DISPATCHING THE LOGIN ACTION WITH PAYLOAD AS THE RES.USER RETURNED BY THE FIRESTORE
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      //IF THERE IS ERROR SIGNING UP THE USER UPDATE THE SETERROR AND SET
      //ISPENDING STATE TO BE FALSE
      //THIS ERROR WILL BE THROWN BY FIRESTORE...eg. PASSWORD TOO SHORT/EMAIL ALREADY TAKEN
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //CLEAN-UP FUNCTION
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
