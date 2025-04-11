import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';
import { styles } from '../styles/homeStyle';

export type TravelEntry = {
  id: string;
  title: string;
  description: string;
  image: string;
  address: string;
  date: string;
};

const HomeScreen = ({ route }: any) => {
  const [travelEntries, setTravelEntries] = useState<TravelEntry[]>([]);
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const loadEntries = async () => {
    try {
      const saved = await AsyncStorage.getItem('travelEntries');
      const parsed = saved ? JSON.parse(saved) : [];
      setTravelEntries(parsed);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadEntries();
    }, [])
  );

  const handleRemove = async (id: string) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this travel entry?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: async () => {
            try {
              const updated = travelEntries.filter(entry => entry.id !== id);
              await AsyncStorage.setItem('travelEntries', JSON.stringify(updated));
              setTravelEntries(updated);
            } catch (err) {
              console.error('Error deleting entry:', err);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleLogout = () => {
    navigation.navigate('Welcome' as never);
  };

  const handleCreateEntry = () => {
    navigation.navigate('TravelEntry' as never);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: { item: TravelEntry }) => (
    <View
      style={[
        styles.entryContainer,
        { borderColor: theme === 'light' ? '#664343' : 'rgb(225, 219, 206)' },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.entryImage} />
        <TouchableOpacity
          style={[
            styles.removeButton,
            {
              borderColor: theme === 'light' ? '#664343' : 'rgb(11, 8, 0)',
            },
          ]}
          onPress={() => handleRemove(item.id)}
        >
          <Feather
            name="trash-2"
            size={20}
            color={theme === 'light' ? '#664343' : 'rgb(23, 16, 1)'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titleDateContainer}>
          {item.title ? (
            <Text style={[styles.entryTitle, { color: theme === 'light' ? '#000' : '#fff' }]}>
              {item.title}
            </Text>
          ) : (
            <View style={styles.emptyTitle} />
          )}
          <Text style={[styles.entryDate, { color: theme === 'light' ? '#666' : '#aaa' }]}>
            {formatDate(item.date)}
          </Text>
        </View>

        <Text style={[styles.entryAddress, { color: theme === 'light' ? '#000' : '#fff' }]}>
        📍 {item.address.replace(/\d{5},?\s*/g, '')} 
        </Text>

        {item.description && (
          <Text style={[styles.entryDescription, { color: theme === 'light' ? '#000' : '#fff' }]}>
            {item.description}
          </Text>
        )}
      </View>
    </View>
  );

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
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleTheme}>
          <Feather
            name={theme === 'light' ? 'moon' : 'sun'}
            size={24}
            color={theme === 'light' ? '#000' : '#fff'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
          <Ionicons name="log-out-outline" size={24} color={theme === 'light' ? '#000' : '#fff'} />
          <Text style={[styles.logoutText, { color: theme === 'light' ? '#000' : '#fff' }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.titleText, { color: theme === 'light' ? '#000' : '#fff' }]}>
        My Travel Journal
      </Text>

      {travelEntries.length === 0 ? (
        <Text style={[styles.noEntriesText, { color: theme === 'light' ? '#000' : '#fff' }]}>
          No Entries Yet!
        </Text>
      ) : (
        <FlatList
          data={travelEntries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={[
          styles.createEntryButton,
          { backgroundColor: theme === 'light' ? '#664343' : 'rgb(225, 219, 206)' },
        ]}
        onPress={handleCreateEntry}
      >
        <Feather name="plus" size={30} color={theme === 'light' ? '#fff' : '#664343'} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default HomeScreen;