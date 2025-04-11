import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Times New Roman',
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cameraButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  galleryButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  gallerybuttonText: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 13,
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  addressContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    minHeight: 50,
  },
  addressText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  descriptionInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  saveButton: {
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  geocodingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  geocodingText: {
    marginLeft: 10,
  },
});
