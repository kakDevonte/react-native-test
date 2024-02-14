import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Props = {
  url: string;
  open: boolean;
  setOpen: (flag: boolean) => void;
};

export const ImageModal = ({url, open, setOpen}: Props) => {
  const [resize, setResize] = useState(false);

  return (
    <Modal
      visible={open}
      transparent={true}
      onRequestClose={() => setOpen(false)}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.resizeButton}
          onPress={() => setOpen(false)}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setResize(!resize)}>
          <Text style={styles.closeText}>Resize</Text>
        </TouchableOpacity>
        <Image
          style={resize ? styles.resizeImage : styles.modalImage}
          source={{uri: url}}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
