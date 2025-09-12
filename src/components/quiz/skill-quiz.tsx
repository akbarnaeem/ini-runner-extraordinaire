import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  category: 'technical' | 'soft' | 'domain';
  options: {
    text: string;
    value: number;
  }[];
}

interface SkillQuizProps {
  onComplete?: (results: { [category: string]: number }) => void;
}

export const SkillQuiz: React.FC<SkillQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "How comfortable are you with Python programming?",
      category: "technical",
      options: [
        { text: "Never used it", value: 1 },
        { text: "Basic syntax and simple scripts", value: 2 },
        { text: "Can build applications and use libraries", value: 3 },
        { text: "Advanced features and optimization", value: 4 },
        { text: "Expert level, contribute to frameworks", value: 5 }
      ]
    },
    {
      id: 2,
      question: "How would you rate your experience with machine learning?",
      category: "technical",
      options: [
        { text: "No experience", value: 1 },
        { text: "Understand basic concepts", value: 2 },
        { text: "Built some models with guidance", value: 3 },
        { text: "Independently develop ML solutions", value: 4 },
        { text: "Design complex ML architectures", value: 5 }
      ]
    },
    {
      id: 3,
      question: "How effectively can you communicate technical concepts to non-technical stakeholders?",
      category: "soft",
      options: [
        { text: "Very difficult for me", value: 1 },
        { text: "Can explain with some effort", value: 2 },
        { text: "Usually clear and understandable", value: 3 },
        { text: "Very effective communicator", value: 4 },
        { text: "Excel at making complex topics accessible", value: 5 }
      ]
    },
    {
      id: 4,
      question: "How comfortable are you leading a team or project?",
      category: "soft",
      options: [
        { text: "Prefer to follow others", value: 1 },
        { text: "Can lead when necessary", value: 2 },
        { text: "Comfortable in leadership roles", value: 3 },
        { text: "Natural leader, others seek my guidance", value: 4 },
        { text: "Experienced leader with proven track record", value: 5 }
      ]
    },
    {
      id: 5,
      question: "What's your experience with data analysis and visualization?",
      category: "domain",
      options: [
        { text: "No formal experience", value: 1 },
        { text: "Basic Excel and simple charts", value: 2 },
        { text: "Can use tools like Tableau or PowerBI", value: 3 },
        { text: "Advanced analytics and custom visualizations", value: 4 },
        { text: "Expert in multiple tools and statistical methods", value: 5 }
      ]
    },
    {
      id: 6,
      question: "How familiar are you with cloud platforms (AWS, Azure, GCP)?",
      category: "technical",
      options: [
        { text: "Never used cloud services", value: 1 },
        { text: "Basic understanding of concepts", value: 2 },
        { text: "Can deploy simple applications", value: 3 },
        { text: "Comfortable with multiple services", value: 4 },
        { text: "Design cloud architectures", value: 5 }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeQuiz = () => {
    const results = calculateResults();
    setIsCompleted(true);
    onComplete?.(results);
  };

  const calculateResults = () => {
    const categoryScores: { [category: string]: number[] } = {
      technical: [],
      soft: [],
      domain: []
    };

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        categoryScores[question.category].push(answer);
      }
    });

    const results: { [category: string]: number } = {};
    Object.keys(categoryScores).forEach(category => {
      const scores = categoryScores[category];
      if (scores.length > 0) {
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        results[category] = Math.round((average / 5) * 100);
      }
    });

    return results;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
  };

  const getSkillLevel = (score: number) => {
    if (score >= 80) return { level: 'Expert', color: 'career-expert' };
    if (score >= 65) return { level: 'Advanced', color: 'career-advanced' };
    if (score >= 50) return { level: 'Intermediate', color: 'career-intermediate' };
    return { level: 'Beginner', color: 'career-beginner' };
  };

  if (isCompleted) {
    const results = calculateResults();
    
    return (
      <Card className="career-shadow border-0">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 success-gradient rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-skill bg-clip-text text-transparent">
            Quiz Completed!
          </CardTitle>
          <CardDescription className="text-base">
            Here's your skill assessment breakdown
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {Object.entries(results).map(([category, score]) => {
              const skillInfo = getSkillLevel(score);
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{category} Skills</span>
                    <Badge className={`bg-${skillInfo.color} text-white border-0`}>
                      {skillInfo.level}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <Progress value={score} className="h-3" />
                    <p className="text-right text-sm text-muted-foreground">{score}%</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex space-x-3">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button className="flex-1 hero-gradient text-white border-0">
              View Recommendations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQ.id];

  return (
    <Card className="career-shadow border-0">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <Badge variant="outline" className="border-primary text-primary">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <Badge variant="outline" className={`border-${currentQ.category === 'technical' ? 'tech-skill' : currentQ.category === 'soft' ? 'soft-skill' : 'domain-skill'} text-${currentQ.category === 'technical' ? 'tech-skill' : currentQ.category === 'soft' ? 'soft-skill' : 'domain-skill'}`}>
            {currentQ.category} skill
          </Badge>
        </div>
        <Progress value={progress} className="h-2 mb-6" />
        <CardTitle className="text-xl leading-relaxed">{currentQ.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                selectedAnswer === option.value
                  ? 'border-primary bg-primary/5 career-shadow'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {selectedAnswer === option.value ? (
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className="text-sm">{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={!selectedAnswer}
            className="hero-gradient text-white border-0"
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};