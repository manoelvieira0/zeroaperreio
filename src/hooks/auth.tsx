import React, { createContext, ReactNode, useContext, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session';
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthorizationResponse{
    params: {
        access_token: string;
    },
    type: string;
}


interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>
}

WebBrowser.maybeCompleteAuthSession()


const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    const userStorageKey = '@gofinances:user';

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const { type, params } = (await AuthSession.startAsync({
                authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`,
              })) as AuthorizationResponse;

            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json();
                
                const loadedUser: User = {
                    id: String(userInfo.id),
                    name: userInfo.given_name,
                    email: userInfo.email,
                    photo: userInfo.picture,
                  };

                setUser(loadedUser);
                console.log(userInfo)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(loadedUser));
            }

        } catch (error) {
            throw new Error(error as string);
        }
    } 

    useEffect(() => {
        async function loadUserStorageDate() {
            const userStoraged = await AsyncStorage.getItem(userStorageKey);
            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged)
            }
            setUserStorageLoading(false)
        }
        loadUserStorageDate()
    },[])

    return (
        <AuthContext.Provider value={
            { user, signInWithGoogle }
        }>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }
