import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

export type Photo = {
  description: string;
  id: number;
  title: string;
  url: string;
  user: number;
};

export type RootStackParamList = {
  ImageListScreen: undefined;
  ImageDetailScreen: {image: Photo};
};

export type ImageListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ImageDetailScreen'
>;

export type ImageDetailScreenScreenRouteProp = RouteProp<
  RootStackParamList,
  'ImageDetailScreen'
>;
