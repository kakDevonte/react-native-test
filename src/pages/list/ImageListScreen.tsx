import React, {useState, useEffect, useCallback} from 'react';
import ImageList from './ImageList';
import {Photo} from '../../shared/types';

type ApiResponse = {
  limit: number;
  message: string;
  offset: number;
  photos: Photo[];
  success: boolean;
  total_photos: number;
};

const HomeScreen = () => {
  const [images, setImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(loading);
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=${limit}`,
      );
      const data: ApiResponse = await response.json();
      setImages(prevImages => [...prevImages, ...data.photos]);
      setTotal(data.total_photos);
      setOffset(prevOffset => prevOffset + limit);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = useCallback(() => {
    if (!loading && images.length < total) {
      fetchData();
    }
  }, [images, total, loading]);

  return (
    <ImageList
      images={images}
      loading={loading}
      onEndReached={handleEndReached}
    />
  );
};

export default HomeScreen;
