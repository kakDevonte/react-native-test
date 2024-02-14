import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  useColorScheme,
} from 'react-native';
import {ImageListScreenNavigationProp, Photo} from '../../shared/types';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type Props = {
  images: Photo[];
  loading: boolean;
  onEndReached: () => void;
};

const ImageList: React.FC<Props> = ({images, loading, onEndReached}) => {
  const navigation = useNavigation<ImageListScreenNavigationProp>();
  const [numColumns, setNumColumns] = useState(1);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const toggleNumColumns = () => {
    setNumColumns(numColumns === 1 ? 2 : 1);
  };

  const handleImagePress = (image: Photo) => {
    navigation.navigate('ImageDetailScreen', {image: image});
  };

  const renderItem = ({item}: {item: Photo}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleImagePress(item)}>
      <Image source={{uri: item.url}} style={styles.image} />
    </TouchableOpacity>
  );

  console.log('images', images);

  return (
    <View style={[styles.container, backgroundStyle]}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleNumColumns}>
        <Text style={styles.toggleText}>
          {numColumns === 1
            ? 'Показать в две колонки'
            : 'Показать в одну колонку'}
        </Text>
      </TouchableOpacity>
      <FlatList
        key={numColumns}
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        numColumns={numColumns}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#2f67ea',
    marginBottom: 10,
  },
  toggleText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ImageList;
