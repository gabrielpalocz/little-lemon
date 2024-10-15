import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { MaskedTextInput } from "react-native-mask-text";
import AvatarProfile from "../ui-component/AvatarProfile";
import ImagePickerButton from "../ui-component/ImagePickerButton";
import { Checkbox, Button } from 'react-native-paper';

function Profile({ navigation }) {
  const {
    signOut,
    userData,
    userProfile,
    saveUserProfileData
  } = useContext(AuthContext);

  const [form, setForm] = useState({
    imageUri: userProfile?.imageUri || null,
    firstName: userProfile?.firstName || userData?.firstName,
    lastName: userProfile?.lastName || '',
    email: userProfile?.email || userData?.email,
    phoneNumber: userProfile?.phoneNumber || '',
    checkOrder: userProfile?.checkOrder,
    checkPass: userProfile?.checkPass,
    checkSpecial: userProfile?.checkSpecial,
    checkNews: userProfile?.checkNews,
  });

  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const submitForm = async (data) => {
    saveUserProfileData(data)
  };

  const removeValue = async () => {
    signOut();
  }

  const discardValues = async () => {
    setForm(userProfile);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Personal Information</Text>

      <View style={styles.imageView}>
        <AvatarProfile imageUri={form.imageUri} firstName={form.firstName} lastName={form.lastName} imageSize={80} />
        <ImagePickerButton onImagePicked={(value) => handleForm('imageUri', value)} />
        <Button mode="outlined" textColor="#1c1c1c" onPress={() => handleForm('imageUri', null)}>
          Remove
        </Button>
      </View>

      <Text style={styles.inputTexts} fontSize={20}>First Name</Text>
      <TextInput
        style={styles.input}
        value={form.firstName}
        onChangeText={(value) => handleForm('firstName', value)}
        placeholder={"Type your first name"}
      />
      <Text style={styles.inputTexts}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={form.lastName}
        onChangeText={(value) => handleForm('lastName', value)}
        placeholder={"Type your last name"}
      />
      <Text style={styles.inputTexts}>Email</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(value) => handleForm('email', value)}
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder={"Type your email"}
      />
      <Text style={styles.inputTexts} fontSize={20}>Phone number</Text>
      <MaskedTextInput
        mask="(999) 999-9999"
        value={form.phoneNumber}
        keyboardType="numeric"
        onChangeText={(value) => handleForm('phoneNumber', value)}
        style={styles.input}
        placeholder={"Type your phone number"}
      />

      <Text style={styles.notificationsText}>Email notifications</Text>

      <View style={{ alignItems: 'flex-start', marginBottom: 15 }}>
        <Checkbox.Item
          status={form.checkOrder ? 'checked' : 'unchecked'}
          label="Order Statuses"
          position="leading"
          onPress={() => {
            handleForm('checkOrder', !form.checkOrder);
          }}
        />
        <Checkbox.Item
          status={form.checkPass ? 'checked' : 'unchecked'}
          label="Password changes"
          position="leading"
          onPress={() => {
            handleForm('checkPass', !form.checkPass);
          }}
        />
        <Checkbox.Item
          status={form.checkSpecial ? 'checked' : 'unchecked'}
          label="Special offers"
          position="leading"
          onPress={() => {
            handleForm('checkSpecial', !form.checkSpecial);
          }}
        />
        <Checkbox.Item
          status={form.checkNews ? 'checked' : 'unchecked'}
          label="Newsletter"
          position="leading"
          onPress={() => {
            handleForm('checkNews', !form.checkNews);
          }}
        />
      </View>

      <Button mode="contained" buttonColor="#f4ce14" textColor="black" onPress={removeValue}>
        Log out
      </Button>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 }}>
        <Button mode="outlined" textColor="#1c1c1c" onPress={discardValues}>
          Discard Changes
        </Button>
        <Button mode="contained" buttonColor="#495e57" onPress={() => submitForm(form)}>
          Save changes
        </Button>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  titleText: {
    fontSize: 24,
    marginTop: 15,
    color: '#000000',
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  inputTexts: {
    fontSize: 15,
    marginBottom: 10
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
  notificationsText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#000000',
  },
});

export default Profile;
