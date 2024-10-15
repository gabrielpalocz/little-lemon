import React, { createContext, useReducer, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

const initialUserData = {
  name: '',
  email: '',
}

const initialProfileData = {
  imageUri: null,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  checkOrder: true,
  checkPass: true,
  checkSpecial: true,
  checkNews: true,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const [userData, setUserData] = useState(initialUserData);

  const [userProfile, setUserProfile] = useState(initialProfileData);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = null;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        const storedUserData = await SecureStore.getItemAsync('userOnboardingData');
        if (storedUserData) {
          // If there is data, we consider the token to be valid
          userToken = 'dummy-auth-token';
          setUserData(JSON.parse(storedUserData));
        }

      } catch (e) {
        // Restoring token failed
        console.error('Error restoring token:', e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  // Function to load data from SecureStore
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedProfileData = await SecureStore.getItemAsync('userProfileData');
        if (storedProfileData) {
          setUserProfile(JSON.parse(storedProfileData));
        }
      } catch (e) {
        console.error('Error loading user data from SecureStore:', e);
      }
    };

    loadUserData();
  }, []);

  const authContext = useMemo(
    () => ({
      saveUserProfileData: async (data) => {
        try {
          await SecureStore.setItemAsync('userProfileData', JSON.stringify(data));
          setUserProfile(data);
        } catch (e) {
          console.error('Error saving user data to SecureStore:', e);
        }
      },
      signIn: async (data) => {
        let userToken = null;
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        // User onboarding data is stored here in SecureStore
        try {
          await SecureStore.setItemAsync('userOnboardingData', JSON.stringify(data));
        } catch (e) {
          console.error('Error saving user data to SecureStore:', e);
        }
        userToken = 'dummy-auth-token';
        setUserData(data);
        // Simulate the token
        dispatch({ type: 'SIGN_IN', token: userToken });
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync('userProfileData');
          await SecureStore.deleteItemAsync('userOnboardingData');
          setUserData(initialUserData);
          setUserProfile(initialProfileData);
          dispatch({ type: 'SIGN_OUT' })
        } catch (e) {
          console.error('Error deleting user data to SecureStore:', e);
        }
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ state, userData, userProfile, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
};
