import api from './api';
import { Exhibit, Gallery } from '@/types';

export const getGalleries = async (): Promise<Gallery[]> => {
  const response = await api.get('/galleries/');
  return response.data;
};

export const getExhibits = async (params?: { gallery?: string; featured?: boolean }): Promise<Exhibit[]> => {
  const response = await api.get('/exhibits/', { params });
  return response.data;
};

export const getExhibitBySlug = async (slug: string): Promise<Exhibit> => {
  const response = await api.get(`/exhibits/${slug}/`);
  return response.data;
};