import { createContext, useReducer, useEffect } from "react";
import { projectAuth } from "../firbase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }; //WHEN WE DISPATCH A LOGIN ACTION WE RETURN A NEW STATE IN A FORM OF OBJECT WITH CURRENT STATE PROPERTIES SPREADED AND UPDATING THE USER TO ACTION'S PAYLOAD

    case "LOGOUT":
      return { ...state, user: null }; //WHEN WE DISPATCH THE LOGOUT ACTION THE WE SET THE CURRENT STATE PROPERTIES WITH THE UPDATED USER TO BE NULL

    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};