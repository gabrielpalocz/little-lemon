import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerButton({ onImagePicked }) {
  const pickImage = async () => {
    // Check permission when button is pressed
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'Access to your gallery is required to select an image.'
      );
      return;
    }

    // Open gallery if permissions are granted
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" buttonColor="#495e57" onPress={pickImage}>
        Change
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
