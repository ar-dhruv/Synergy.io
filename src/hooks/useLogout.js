import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false); //STATES FOR CLEAN-UP FUNCTION
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //TRYING TO LOGOUT THE USER
    try {

      //WE CHANGE BACK THE ONLINE STATUS OF USER TO FALSE BEFORE LOGGING THEM OFF
      //THIS IS BECAUSE OF THE FIRESTORE RULES...THAT IS USER WILL NOT BE ALLOWED TO CHANGE ITS ANY DATA IF HE'S LOGGED OUT SO CAHNGE ONLINE STATUS BEFORE LOGGING OUT
      const { uid } = user;
      await projectFirestore
        .collection("users")
        .doc(uid)
        .update({ online: false });

      await projectAuth.signOut();

      //DISPATCHING THE LOGOUT ACTION & WE DONT NEED ANY PAYLOAD FOR LOGGING OUT JUST THE ACTION TYPE
      dispatch({ type: "LOGOUT" });

      //UPDATE STATE
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      //AFTER DISPATCHING THE LOGOUT ACTION WE SET ISPENDING TO BE FALSE AND ERROR TO BE NULL
    } catch (err) {
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

  return { logout, error, isPending };
};
