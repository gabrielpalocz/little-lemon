import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { AuthContext } from "../context/AuthContext";
import { useNavigation, useRoute } from '@react-navigation/native';

const AvatarProfile = ({ imageUri, imageSize, firstName, lastName }) => {
  const { userProfile, userData } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();

  // Validate if the prop comes, otherwise take from context
  const validImageUri = imageUri !== undefined ? imageUri : userProfile?.imageUri;
  const validFirstName = firstName !== undefined ? firstName : userProfile?.firstName || userData?.firstName;
  const validLastName = lastName !== undefined ? lastName : userProfile?.lastName;

  // Generate initials based on first and last name
  const getInitials = () => {
    const firstInitial = validFirstName?.charAt(0).toUpperCase() || '';
    const lastInitial = validLastName?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  };

  const onPress = () => {
    if (route.name !== 'Profile') {
      navigation.navigate('Profile');
    }
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={route.name === 'Profile'}>
      <View style={styles.container}>
        {validImageUri ? (
          // Show image if exists
          <Avatar.Image size={imageSize} source={{ uri: validImageUri }} style={styles.avatar} />
        ) : (
          // Show initials if no image
          <Avatar.Text size={imageSize} color='white' label={getInitials()} style={styles.avatar} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    color: 'white',
    backgroundColor: '#62d6c4', // Background color of avatar image with text
  }
});

export default AvatarProfile;
