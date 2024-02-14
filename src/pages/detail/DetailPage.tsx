import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  useColorScheme,
  Modal,
} from 'react-native';
import {ImageDetailScreenScreenRouteProp} from '../../shared/types';

const ImageDetailScreen = () => {
  const [resize, setResize] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute<ImageDetailScreenScreenRouteProp>();
  const isDarkMode = useColorScheme() === 'dark';

  const {image} = route.params;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={backgroundStyle}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <Image
          source={{uri: image.url}}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text
          style={[
            styles.title,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {image.title}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {image.description}
        </Text>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.resizeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setResize(!resize)}>
            <Text style={styles.closeText}>Resize</Text>
          </TouchableOpacity>
          <Image
            style={resize ? styles.resizeImage : styles.modalImage}
            source={{uri: image.url}}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').width - 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  resizeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  modalImage: {
    width: '90%',
    height: '90%',
  },
  resizeImage: {
    width: '190%',
    height: '190%',
  },
});

export default ImageDetailScreen;
