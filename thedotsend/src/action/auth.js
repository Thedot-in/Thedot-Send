import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import Snackbar from 'react-native-snackbar';



export const googleSignin = () => async(dispatch) => {

    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // console.log("Yes", userInfo);

        const googleCredential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken);
        firebase.auth().signInWithCredential(googleCredential).then(user => {
            Snackbar.show({
                text: 'Signin success',
                textColor: 'white',
                backgroundColor: 'green'
            })

        }).catch(err => {
            console.log(err)
        })


    } catch (error) {
        console.log("Signin Error : ", error);

        Snackbar.show({
            text: 'Signin error',
            textColor: 'white',
            backgroundColor: 'red'
        })
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow


        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error);

            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error);

            // play services not available or outdated
        } else {
            // some other error happened
            console.log(error);

        }
    }
}

export const googleSignout = () => async(dispatch) => {
    // console.log("Logout clicked")
    try {
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        console.log("Yes");
        firebase.auth().signOut().then(
            Snackbar.show({
                text: 'Signout sucess',
                textColor: 'white',
                backgroundColor: 'green'
            })
        )

    } catch (error) {
        console.log(error)

    }
}