import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  fullBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#604b39',
    padding: 10,
    borderRadius: 5,
    position: 'absolute', 
    top: '60%',
    left: '56%', 
    transform: [{ translateX: -100 }, { translateY: -25 }], 
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8,
    shadowRadius: 5, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Times New Roman',
  },
});
