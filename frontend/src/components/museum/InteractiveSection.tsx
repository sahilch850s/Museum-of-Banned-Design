'use client';

import { useEffect, useState } from 'react';
import { Quiz } from '@/types';
import { getExhibitQuizzes } from '@/services/interactive';
import QuizPlayer from './QuizPlayer';
import ReflectionSection from './ReflectionSection';

export default function InteractiveSection({ exhibitId }: { exhibitId: number }) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    getExhibitQuizzes(exhibitId)
      .then(setQuizzes)
      .catch(console.error);
  }, [exhibitId]);

  return (
    <div className="space-y-12 pt-6">
      {/* Quiz Section (If any quiz exists for this exhibit) */}
      {quizzes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Curator's Knowledge Test</h3>
          {quizzes.map((quiz) => (
            <QuizPlayer key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}

      {/* Visitor Reflections Section */}
      <ReflectionSection exhibitId={exhibitId} />
    </div>
  );
}