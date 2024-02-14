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
} from 'react-native';
import {ImageDetailScreenScreenRouteProp} from '../../shared/types';
import {ImageModal} from './ImageModal';

const ImageDetailScreen = () => {
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
      <ImageModal
        url={image.url}
        open={modalVisible}
        setOpen={flag => setModalVisible(flag)}
      />
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
});

export default ImageDetailScreen;
