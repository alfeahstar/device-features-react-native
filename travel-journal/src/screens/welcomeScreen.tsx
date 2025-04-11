import React from 'react';
import { ImageBackground, TouchableOpacity, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={require('../../assets/img/bg.png')}
      style={globalStyles.fullBackground}
      resizeMode="cover"
    >
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Home')} 
      >
        <Text style={globalStyles.buttonText}>Start Your Journey</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default WelcomeScreen;
