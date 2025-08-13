"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Trophy, Star, BookOpen, Target, Award, CheckCircle, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Quiz {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  difficulty: string
  points: number
  icon: string
}

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export default function HealthQuiz() {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userLevel, setUserLevel] = useState(3)
  const [totalPoints, setTotalPoints] = useState(1250)
  const [completedQuizzes, setCompletedQuizzes] = useState(12)
  const [dailyChallengeProgress, setDailyChallengeProgress] = useState(1)

  const quizData: Quiz[] = [
    {
      id: "heart-health",
      title: "Heart Health Basics",
      description: "Learn about cardiovascular health and prevention",
      difficulty: "Beginner",
      points: 100,
      icon: "❤️",
      questions: [
        {
          question: "What is the recommended amount of moderate exercise per week for adults?",
          options: ["30 minutes per week", "150 minutes per week", "300 minutes per week", "60 minutes per day"],
          correct: 1,
          explanation:
            "The CDC recommends at least 150 minutes of moderate-intensity aerobic activity per week for adults.",
        },
        {
          question: "Which of these foods is best for heart health?",
          options: ["Fried chicken", "Salmon", "White bread", "Processed meats"],
          correct: 1,
          explanation:
            "Salmon is rich in omega-3 fatty acids, which are beneficial for heart health and can help reduce inflammation.",
        },
        {
          question: "What is considered a normal resting heart rate for adults?",
          options: ["40-50 bpm", "60-100 bpm", "100-120 bpm", "120-140 bpm"],
          correct: 1,
          explanation: "A normal resting heart rate for adults ranges from 60 to 100 beats per minute.",
        },
      ],
    },
    {
      id: "nutrition",
      title: "Nutrition Fundamentals",
      description: "Test your knowledge of healthy eating habits",
      difficulty: "Intermediate",
      points: 150,
      icon: "🥗",
      questions: [
        {
          question: "How many servings of fruits and vegetables should adults eat daily?",
          options: ["2-3 servings", "5-9 servings", "10-12 servings", "1-2 servings"],
          correct: 1,
          explanation: "Adults should aim for 5-9 servings of fruits and vegetables daily for optimal nutrition.",
        },
        {
          question: "Which nutrient is the body's primary source of energy?",
          options: ["Protein", "Fat", "Carbohydrates", "Vitamins"],
          correct: 2,
          explanation: "Carbohydrates are the body's primary and preferred source of energy.",
        },
      ],
    },
    {
      id: "mental-health",
      title: "Mental Health Awareness",
      description: "Understanding mental wellness and self-care",
      difficulty: "Beginner",
      points: 120,
      icon: "🧠",
      questions: [
        {
          question: "Which of these is a healthy way to manage stress?",
          options: [
            "Avoiding all stressful situations",
            "Deep breathing exercises",
            "Drinking alcohol",
            "Isolating yourself",
          ],
          correct: 1,
          explanation: "Deep breathing exercises are a proven technique to help manage stress and anxiety.",
        },
        {
          question: "How much sleep do most adults need per night?",
          options: ["4-5 hours", "6-7 hours", "7-9 hours", "10-12 hours"],
          correct: 2,
          explanation: "Most adults need 7-9 hours of quality sleep per night for optimal health and wellbeing.",
        },
      ],
    },
    {
      id: "exercise",
      title: "Exercise & Fitness",
      description: "Physical activity guidelines and benefits",
      difficulty: "Intermediate",
      points: 80,
      icon: "💪",
      questions: [
        {
          question: "What type of exercise helps build bone density?",
          options: ["Swimming", "Weight-bearing exercises", "Stretching", "Meditation"],
          correct: 1,
          explanation:
            "Weight-bearing exercises like walking, running, and resistance training help build and maintain bone density.",
        },
      ],
    },
  ]

  const achievements = [
    { title: "First Quiz Complete", description: "Completed your first health quiz", earned: true },
    { title: "Heart Health Expert", description: "Scored 90%+ on heart health quiz", earned: true },
    { title: "Nutrition Novice", description: "Completed 3 nutrition quizzes", earned: false },
    { title: "Wellness Warrior", description: "Earned 1000 total points", earned: true },
  ]

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizCompleted(false)

    toast({
      title: "Quiz Started!",
      description: `Starting ${quiz.title} - Good luck!`,
    })
  }

  const selectAnswer = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null || !currentQuiz) return

    const isCorrect = selectedAnswer === currentQuiz.questions[currentQuestion].correct
    if (isCorrect) {
      setScore(score + 1)
    }

    setShowExplanation(true)

    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect ? "Great job!" : "Don't worry, keep learning!",
      variant: isCorrect ? "default" : "destructive",
    })
  }

  const nextQuestion = () => {
    if (!currentQuiz) return

    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      completeQuiz()
    }
  }

  const completeQuiz = () => {
    if (!currentQuiz) return

    const percentage = Math.round((score / currentQuiz.questions.length) * 100)
    const pointsEarned = Math.round((percentage / 100) * currentQuiz.points)

    setQuizCompleted(true)
    setTotalPoints(totalPoints + pointsEarned)
    setCompletedQuizzes(completedQuizzes + 1)

    // Update daily challenge progress
    if (dailyChallengeProgress < 2) {
      setDailyChallengeProgress(dailyChallengeProgress + 1)
    }

    // Check for level up
    if (totalPoints + pointsEarned > userLevel * 500) {
      setUserLevel(userLevel + 1)
      toast({
        title: "Level Up!",
        description: `Congratulations! You've reached Level ${userLevel + 1}!`,
      })
    }

    toast({
      title: "Quiz Complete!",
      description: `You scored ${percentage}% and earned ${pointsEarned} points!`,
    })
  }

  const resetQuiz = () => {
    setCurrentQuiz(null)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizCompleted(false)
  }

  const sampleQuestion = {
    question: "What is the recommended amount of moderate exercise per week for adults?",
    options: ["30 minutes per week", "150 minutes per week", "300 minutes per week", "60 minutes per day"],
    correct: 1,
    explanation: "The CDC recommends at least 150 minutes of moderate-intensity aerobic activity per week for adults.",
  }

  if (currentQuiz && !quizCompleted) {
    const question = currentQuiz.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{currentQuiz.title}</h1>
              <Button variant="outline" onClick={resetQuiz}>
                Exit Quiz
              </Button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {currentQuiz.questions.length}
              </span>
              <div className="flex-1">
                <Progress value={progress} className="h-2" />
              </div>
              <span className="text-sm text-gray-600">
                Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
              </span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 text-left border rounded-lg transition-colors ${
                      selectedAnswer === index
                        ? showExplanation
                          ? index === question.correct
                            ? "bg-green-100 border-green-500 text-green-800"
                            : "bg-red-100 border-red-500 text-red-800"
                          : "bg-purple-100 border-purple-500"
                        : showExplanation && index === question.correct
                          ? "bg-green-100 border-green-500 text-green-800"
                          : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                      <span>{option}</span>
                      {showExplanation && index === question.correct && (
                        <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                      )}
                      {showExplanation && selectedAnswer === index && index !== question.correct && (
                        <X className="h-5 w-5 text-red-600 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showExplanation && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                  <p className="text-blue-700">{question.explanation}</p>
                </div>
              )}

              <div className="flex justify-between">
                <div></div>
                {!showExplanation ? (
                  <Button onClick={submitAnswer} disabled={selectedAnswer === null}>
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={nextQuestion}>
                    {currentQuestion < currentQuiz.questions.length - 1 ? "Next Question" : "Complete Quiz"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (quizCompleted && currentQuiz) {
    const percentage = Math.round((score / currentQuiz.questions.length) * 100)
    const pointsEarned = Math.round((percentage / 100) * currentQuiz.points)

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>
              <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
              <CardDescription className="text-lg">Great job on completing {currentQuiz.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{score}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{percentage}%</div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{pointsEarned}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={resetQuiz} className="mr-3">
                  Take Another Quiz
                </Button>
                <Button variant="outline" onClick={resetQuiz}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Quiz & Learning</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your health knowledge, learn new facts, and earn rewards while building healthier habits
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Available Quizzes
                </CardTitle>
                <CardDescription>Choose a topic to test your knowledge and learn something new</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {quizData.map((quiz) => (
                    <div key={quiz.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{quiz.icon}</span>
                          <div>
                            <h3 className="font-semibold">{quiz.title}</h3>
                            <Badge variant="outline" className="mt-1">
                              {quiz.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{quiz.questions.length} questions</div>
                          <div className="text-sm font-semibold text-purple-600">{quiz.points} pts</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
                      <Button size="sm" className="w-full" onClick={() => startQuiz(quiz)}>
                        Start Quiz
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Sample Question
                </CardTitle>
                <CardDescription>Try this sample question from our Heart Health quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">{sampleQuestion.question}</h3>
                  <div className="space-y-2">
                    {sampleQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          toast({
                            title: index === sampleQuestion.correct ? "Correct!" : "Try Again",
                            description:
                              index === sampleQuestion.correct
                                ? sampleQuestion.explanation
                                : "That's not quite right. The correct answer is B.",
                          })
                        }
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </button>
                    ))}
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm">
                      <strong>Answer:</strong> B. 150 minutes per week
                    </p>
                    <p className="text-sm mt-2">{sampleQuestion.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">Level {userLevel}</div>
                  <div className="text-sm text-gray-600">Health Knowledge Explorer</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to Level {userLevel + 1}</span>
                    <span>{Math.round(((totalPoints % 500) / 500) * 100)}%</span>
                  </div>
                  <Progress value={((totalPoints % 500) / 500) * 100} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{totalPoints}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{completedQuizzes}</div>
                    <div className="text-sm text-gray-600">Quizzes Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Star className={`h-4 w-4 ${achievement.earned ? "text-yellow-500" : "text-gray-400"}`} />
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-4xl">🎯</div>
                  <h3 className="font-semibold">Complete 2 Quizzes Today</h3>
                  <p className="text-sm text-gray-600">Earn bonus 50 points</p>
                  <div className="text-sm">Progress: {dailyChallengeProgress}/2</div>
                  <Progress value={(dailyChallengeProgress / 2) * 100} className="h-2" />
                  {dailyChallengeProgress >= 2 && (
                    <Badge className="bg-green-100 text-green-800">Challenge Complete! 🎉</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
