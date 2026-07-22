'use client';

import { useState } from 'react';
import { Quiz } from '@/types';
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export default function QuizPlayer({ quiz }: { quiz: Quiz }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quiz.questions[currentIdx];

  if (!currentQuestion) return null;

  const handleSelect = (optionId: number) => {
    if (!isSubmitted) setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const option = currentQuestion.options.find((o) => o.id === selectedOption);
    if (option?.is_correct) {
      setScore((prev) => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 < quiz.questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="glass-panel border border-museum-border rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-museum-border pb-4">
        <div className="flex items-center gap-2 text-museum-red font-mono text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" /> Curator Test: {quiz.title}
        </div>
        {!quizFinished && (
          <span className="text-xs font-mono text-museum-muted">
            Question {currentIdx + 1} of {quiz.questions.length}
          </span>
        )}
      </div>

      {!quizFinished ? (
        <div className="space-y-6">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {currentQuestion.text}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              let btnStyle = "border-museum-border bg-museum-dark text-gray-300 hover:border-gray-500";
              
              if (isSubmitted) {
                if (option.is_correct) {
                  btnStyle = "border-green-500/50 bg-green-500/10 text-green-400";
                } else if (selectedOption === option.id) {
                  btnStyle = "border-red-500/50 bg-red-500/10 text-red-400";
                }
              } else if (selectedOption === option.id) {
                btnStyle = "border-museum-red bg-museum-red/10 text-white";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-lg border text-sm font-medium transition flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option.text}</span>
                  {isSubmitted && option.is_correct && <CheckCircle className="w-4 h-4 text-green-400" />}
                  {isSubmitted && selectedOption === option.id && !option.is_correct && <XCircle className="w-4 h-4 text-red-400" />}
                </button>
              );
            })}
          </div>

          {/* Explanation box after submit */}
          {isSubmitted && (
            <div className="p-4 rounded-lg bg-museum-black/60 border border-museum-border text-xs sm:text-sm text-gray-300 space-y-1">
              <span className="font-bold text-museum-gold uppercase font-mono block">Historical Explanation:</span>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Controls */}
          <div className="pt-2 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="bg-museum-red text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition"
              >
                Lock In Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-white text-museum-black px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
              >
                {currentIdx + 1 < quiz.questions.length ? 'Next Question &rarr;' : 'View Results'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="text-center py-8 space-y-4">
          <div className="text-4xl font-black text-white">
            {score} / {quiz.questions.length}
          </div>
          <h4 className="text-lg font-bold text-gray-200">
            {score === quiz.questions.length ? "Master of the Forbidden Archive! 🏆" : "Archival Novice. Keep reading!"}
          </h4>
          <p className="text-xs text-museum-muted max-w-md mx-auto">
            You've explored the hidden layers of this censored artifact. Continue exploring the museum wings to uncover more design secrets.
          </p>
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 border border-museum-border bg-museum-dark text-white px-5 py-2 rounded-lg text-xs font-semibold hover:border-gray-500 mt-4 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Retake Test
          </button>
        </div>
      )}
    </div>
  );
}