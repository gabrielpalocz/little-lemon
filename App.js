import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import Onboarding from './src/screens/Onboarding';
import Profile from './src/screens/Profile';
import Home from './src/screens/Home';
import { Image } from 'react-native';
import AvatarProfile from './src/ui-component/AvatarProfile';

function LogoTitle() {
  return (
    <Image
      style={{ width: 250, height: 50 }}
      source={require('./assets/Logo.png')}
    />
  );
}

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

const AuthStack = () => {
  const { state } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {state.isLoading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : state.userToken == null ? (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerTitle: 'Welcome',
          }} />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: (props) => <LogoTitle {...props} />,
              headerTitleAlign: 'center',
              headerRight: () => (
                <AvatarProfile imageSize={40} />
              ),
            }}
          />
          <Stack.Screen name="Profile" component={Profile} />
        </>
      )}
    </Stack.Navigator>
  );
}
