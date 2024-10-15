import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { validateEmail, validateNameEmpty } from '../utils/validations';
import { AuthContext } from "../context/AuthContext";

export default function Onboarding({ navigation }) {
  const { signIn } = useContext(AuthContext);

  const [onboardingInputs, setOnboardingInputs] = useState({
    firstName: '',
    email: '',
  });

  const handleForm = (key, value) => {
    setOnboardingInputs((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const isNameValid = validateNameEmpty(onboardingInputs.firstName);
  const isEmailValid = validateEmail(onboardingInputs.email);

  const handleOnboarding = (data) => {
    // Simulate login to go to the Home screen
    signIn(data);
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logoHeader}
          source={require('../../assets/Logo.png')}
        />
      </View>
      <View style={styles.inputsContainer}>
        <View style={styles.inputsContainerViews}>
          <Text style={styles.upText}>Let us get to know you</Text>
        </View>
        <View style={styles.inputsContainerViews}>
          <Text style={styles.inputTexts} fontSize={20}>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleForm('firstName', value)}
            placeholder={"Type your first name"}
          />
          <Text style={styles.inputTexts}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleForm('email', value)}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder={"Type your email"}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => handleOnboarding(onboardingInputs)}
          title="Next"
          color="#495e57"
          accessibilityLabel="Go next to profile view"
          disabled={!(isNameValid && isEmailValid)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dee3e9',
    paddingVertical: 10
  },
  logoHeader: {
    width: 350,
    height: 70,
    resizeMode: 'contain'
  },
  inputsContainer: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#cbd2d9',
  },
  inputsContainerViews: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cbd2d9',
    paddingHorizontal: 40
  },
  upText: {
    fontSize: 30
  },
  inputTexts: {
    fontSize: 25,
    marginBottom: 15
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#3A3A3A',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#f1f4f7',
    paddingHorizontal: 30
  }
});
