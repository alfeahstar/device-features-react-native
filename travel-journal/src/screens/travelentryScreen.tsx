import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';
import { styles } from '../styles/travelentryStyle';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TravelEntryScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to allow notifications to proceed.');
      }

      if (Platform.OS !== 'web') {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
          Alert.alert('Sorry, we need camera and gallery permissions to make this work!');
        }
      }
    })();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);

  const takePicture = async () => {
    setIsLoading(true);
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0].uri) {
        setImage(result.assets[0].uri);
        await getLocation();
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture');
    } finally {
      setIsLoading(false);
    }
  };

  const selectPicture = async () => {
    setIsLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0].uri) {
        setImage(result.assets[0].uri);
        await getLocation();
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to select image');
    } finally {
      setIsLoading(false);
    }
  };

  const getLocation = async () => {
    setIsGeocoding(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addressResponse.length > 0) {
        const addr = addressResponse[0];
        const formattedAddress = [
          addr.name,
          addr.street,
          addr.city,
          addr.region,
          addr.country
        ]
        .filter(part => part && !part.match(/\d{5}/)) 
        .join(', ');
        setAddress(formattedAddress);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get location');
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleSaveEntry = async () => {
    if (!image || !address) {
      Alert.alert('Error', 'Please add an image and ensure address is detected');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      title,
      description,
      image,
      address,
      date: new Date().toISOString(), 
    };

    try {
      const saved = await AsyncStorage.getItem('travelEntries');
      const existingEntries = saved ? JSON.parse(saved) : [];
      const updatedEntries = [...existingEntries, newEntry];
      await AsyncStorage.setItem('travelEntries', JSON.stringify(updatedEntries));
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'New Travel Entry Saved',
          body: 'You have successfully saved a new travel entry.',
          sound: 'default',
        },
        trigger: null,
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error saving entry:', error);
      Alert.alert('Error', 'Failed to save entry');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={
        theme === 'light'
          ? require('../../assets/img/bg2.png')
          : require('../../assets/img/bg3.png')
      }
      style={styles.bgImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.container}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Ionicons name="arrow-back" size={24} color={theme === 'light' ? '#000' : '#fff'} />
              </TouchableOpacity>

              <Text style={[styles.title, { color: theme === 'light' ? '#000' : '#fff' }]}>
                Add Travel Entry
              </Text>

              <View style={styles.imageContainer}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={[styles.imagePlaceholder, { borderColor: theme === 'light' ? '#664343' : 'rgb(225, 219, 206)' }]}>
                    <Text style={{ color: theme === 'light' ? '#000' : '#fff' }}>No image selected</Text>
                  </View>
                )}
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.cameraButton, { backgroundColor: theme === 'light' ? 'rgb(96, 60, 60)' : 'rgb(249, 249, 247)' }]}
                  onPress={takePicture}
                  disabled={isLoading}
                >
                  <Feather name="camera" size={20} color={theme === 'light' ? '#fff' : '#664343'} />
                  <Text style={[styles.buttonText, { color: theme === 'light' ? '#fff' : '#664343' }]}>
                    Take Photo
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.galleryButton, { backgroundColor: theme === 'light' ? '#3E3232' : 'rgb(202, 165, 142)' }]}
                  onPress={selectPicture}
                  disabled={isLoading}
                >
                  <Feather name="image" size={20} color={theme === 'light' ? '#fff' : '#664343'} />
                  <Text style={[styles.gallerybuttonText, { color: theme === 'light' ? '#fff' : 'rgb(67, 42, 42)' }]}>
                    Choose from Gallery
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={[styles.titleInput, {
                  color: theme === 'light' ? '#000' : '#fff',
                  borderColor: theme === 'light' ? '#664343' : 'rgb(225, 219, 206)',
                  backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.3)'
                }]}
                placeholder="Title of your travel entry"
                placeholderTextColor={theme === 'light' ? '#666' : '#aaa'}
                value={title}
                onChangeText={setTitle}
                maxLength={50}
              />

              <TextInput
                style={[styles.descriptionInput, {
                  color: theme === 'light' ? '#000' : '#fff',
                  borderColor: theme === 'light' ? '#664343' : 'rgb(225, 219, 206)',
                  backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.3)'
                }]}
                placeholder="Describe your travel experience..."
                placeholderTextColor={theme === 'light' ? '#666' : '#aaa'}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                maxLength={500}
              />

              <View style={[styles.addressContainer, {
                backgroundColor: theme === 'light' ? 'rgba(202, 195, 195, 0.7)' : 'rgba(46, 45, 45, 0.86)',
                borderColor: theme === 'light' ? '#ccc' : 'rgba(46, 45, 45, 0.86)'
              }]}>
                {isGeocoding ? (
                  <>
                    <ActivityIndicator size="small" color={theme === 'light' ? '#000' : '#fff'} />
                    <Text style={[styles.geocodingText, { color: theme === 'light' ? '#000' : '#fff', marginLeft: 8 }]}>
                      Getting address...
                    </Text>
                  </>
                ) : address ? (
                  <Text style={[styles.addressText, { color: theme === 'light' ? '#000' : '#fff' }]}>
                    📍 {address}
                  </Text>
                ) : (
                  <Text style={[styles.placeholderText, { color: theme === 'light' ? '#666' : '#aaa' }]}>
                    Location will appear here
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={[styles.saveButton, {
                  backgroundColor: theme === 'light' ? '#664343' : 'rgb(225, 219, 206)',
                  opacity: (!image || isLoading || isGeocoding) ? 0.6 : 1
                }]}
                onPress={handleSaveEntry}
                disabled={!image || isLoading || isGeocoding}
              >
                <Text style={[styles.saveButtonText, { color: theme === 'light' ? '#fff' : '#664343' }]}>
                  {isLoading ? 'Saving...' : 'Save Entry'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default TravelEntryScreen;