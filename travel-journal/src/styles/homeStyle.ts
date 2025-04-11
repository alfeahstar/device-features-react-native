import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width,
    height,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    fontFamily: 'Times New Roman',
    color: '#503C3C',
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  entryContainer: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  entryImage: {
    width: '100%',
    height: 300,
    borderRadius: 6,
    marginBottom: 8,
  },
  textContainer: {
    paddingHorizontal: 4,
  },
  titleDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  emptyTitle: {
    flex: 1, 
  },
  entryDate: {
    fontSize: 12,
    textAlign: 'right', 
    marginLeft: 8,
  },
  entryAddress: {
    fontSize: 14,
    marginBottom: 8,
  },
  entryDescription: {
    fontSize: 14,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEntriesText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
  },
  createEntryButton: {
    position: 'absolute',
    bottom: 40,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});