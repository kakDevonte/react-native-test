import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ImageListScreenNavigationProp, Photo} from '../../shared/types';

type Props = {
  images: Photo[];
  loading: boolean;
  onEndReached: () => void;
};

const ImageList = ({images, loading, onEndReached}: Props) => {
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
        data={images}
        key={numColumns}
        numColumns={numColumns}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
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
