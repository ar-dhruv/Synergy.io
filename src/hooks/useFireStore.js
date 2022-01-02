import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firbase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING": //THE LOADING CASE , STTING THE ISPENDING TO BE TRUE WITH CURRENT STATE PROPERTIES
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };

    case "ADDED_DOCUMENT": //ADDING DOCUMENT CASE , WE SUCCESSFULLY ADDED A DOCUMENT HENCE THE FOLLOWING STATE PROPERTY CHANGES
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };

    case "ERROR": //ERROR STATE , SETTING ERROR TO BE ACTION.PAYLOAD i.e THE ERROR MEASSAGE IN THE CATCH BLOCK
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false); //STATE USED FOR CLEANUP FUNCTION...SET TRUE WHEN THE COMPONENT USE THIS HOOK UNMOUNTS

  //COLLECTION REFERENCE
  const ref = projectFirestore.collection(collection);

  //ONLY DISPATCH IF THE COMPONENT IS STILL MOUNTED i.e ISCANCELLED IS FALSE
  const dispatchIFNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // ADD DOCUMENT
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    //TRING TO ADD A NEW DOCUMENT
    try {
      const createdAt = timestamp.fromDate(new Date()); //ADDING THE CURRENT DATE & TIME AS PARAMETER TO THE THE TIMESTAMP IN THE VARIABLE CREATEDAT
      const addedDocument = await ref.add({ ...doc, createdAt }); //ADDING THE CURRENT DOC BY SPREADING ITS PROPERTIES AND A TIMESTAMP AT WHICH ITS WAS CREATED
      dispatchIFNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIFNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // DELETE DOCUMENT
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIFNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (err) {
      dispatchIFNotCancelled({ type: "ERROR", payload: "Could not delete" });
    }
  };

  //CLEAN-UP FUNCTION
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
