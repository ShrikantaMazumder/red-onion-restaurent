import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);




//Private Router
export const PrivateRoute =({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
        auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const getUser = user => {
    const {displayName,email,photoURL} = user;
    return {name:displayName,email,photo:photoURL};

}

const Auth = () => {
    const [user,setUser] = useState(null);

    //sign up with email pass
    const signUp = (usr) => {
      
        return firebase.auth().createUserWithEmailAndPassword(usr.email,usr.password)
        .then(response => {
          firebase.auth().currentUser.updateProfile({
            displayName:usr.name
          })
          .then(()=>{
            setUser(response.user)
            return response.user;
          })
        })
        .catch(err => {
          setUser(null);
        })
      }

      //Sign in with password

      const signIn = (usr) => {
        return firebase.auth().signInWithEmailAndPassword(usr.email, usr.password)
        .then(response => {
          setUser(response.user)
          return response.user;
        })
        .catch(error => {
          console.log(error);
        })
      }
    const signOut = () => {
        firebase.auth().signOut()
        .then(response => {
            setUser(null);
          })
          .catch(error => {
            console.log(error);
          });
    }
    
    useEffect(() =>{
        firebase.auth().onAuthStateChanged(function(usr) {
            if (usr) {
              const currentUser = getUser(usr);
              setUser(currentUser);
            } else {
              // No user is signed in.
            }
          });
    },[])

    return {
        user,
        signOut,
        signUp,
        signIn
    }
}
export default Auth;