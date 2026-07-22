import api from './api';
import { Quiz, Reflection } from '@/types';

export const getExhibitQuizzes = async (exhibitId: number): Promise<Quiz[]> => {
  const response = await api.get('/quizzes/', { params: { exhibit: exhibitId } });
  return response.data;
};

export const getExhibitReflections = async (exhibitId: number): Promise<Reflection[]> => {
  const response = await api.get('/reflections/', { params: { exhibit: exhibitId } });
  return response.data;
};

export const submitReflection = async (exhibitId: number, comment: string): Promise<Reflection> => {
  const response = await api.post('/reflections/', {
    exhibit: exhibitId,
    comment: comment,
  });
  return response.data;
};