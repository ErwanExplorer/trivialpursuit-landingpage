'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Star,
  ArrowRight,
  RotateCcw,
  Home,
  Target,
  Zap,
  Award
} from 'lucide-react'

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    category: "IA et Robotique",
    question: "Qu’est-ce que l’apprentissage supervisé en intelligence artificielle ?",
    options: [
      "Un apprentissage sans données étiquetées",
      "Un apprentissage avec des données étiquetées",
      "Un apprentissage basé sur des règles fixes",
      "Un apprentissage uniquement pour les robots"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "L’apprentissage supervisé utilise des données étiquetées (entrées avec sorties correspondantes) pour entraîner un modèle à prédire des résultats, comme dans la classification ou la régression."
  },
  {
    id: 2,
    category: "IA et Robotique",
    question: "Quel est le rôle principal d’un capteur dans un robot ?",
    options: [
      "Exécuter des commandes",
      "Fournir de l’énergie",
      "Collecter des données de l’environnement",
      "Stocker des programmes"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Les capteurs d’un robot, comme les capteurs de proximité ou de vision, collectent des données sur l’environnement pour permettre au robot de prendre des décisions ou d’agir."
  },
  {
    id: 3,
    category: "IA et Robotique",
    question: "Que signifie l’acronyme RNN en IA ?",
    options: [
      "Random Neural Network",
      "Recurrent Neural Network",
      "Robotic Neural Node",
      "Regression Neural Network"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "RNN (Recurrent Neural Network) est un type de réseau neuronal utilisé pour traiter des données séquentielles, comme les séries temporelles ou le texte, grâce à ses boucles de rétroaction."
  },
  {
    id: 4,
    category: "IA et Robotique",
    question: "Quel composant d’un robot est responsable de ses mouvements physiques ?",
    options: [
      "Microcontrôleur",
      "Actionneur",
      "Capteur",
      "Processeur graphique"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Les actionneurs, comme les moteurs ou les servomoteurs, convertissent les signaux électriques en mouvements physiques, permettant au robot de se déplacer ou d’interagir."
  },
  {
    id: 5,
    category: "IA et Robotique",
    question: "Qu’est-ce que le 'deep learning' ?",
    options: [
      "Un algorithme de tri",
      "Un type de réseau neuronal à plusieurs couches",
      "Un logiciel de simulation robotique",
      "Un protocole de communication"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Le deep learning utilise des réseaux neuronaux profonds avec plusieurs couches pour extraire des caractéristiques complexes des données, comme dans la reconnaissance d’images."
  },
  {
    id: 6,
    category: "IA et Robotique",
    question: "Quel est un défi majeur dans la robotique autonome ?",
    options: [
      "Augmenter la vitesse des processeurs",
      "Naviguer dans des environnements imprévisibles",
      "Réduire la taille des batteries",
      "Simplifier les interfaces utilisateur"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "La navigation dans des environnements dynamiques et imprévisibles, comme éviter des obstacles en temps réel, est un défi clé pour les robots autonomes."
  },
  {
    id: 7,
    category: "IA et Robotique",
    question: "Quel algorithme est souvent utilisé pour l’apprentissage par renforcement ?",
    options: [
      "K-Means",
      "Q-Learning",
      "SVM",
      "Gradient Boosting"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Q-Learning est un algorithme d’apprentissage par renforcement qui permet à un agent d’apprendre une politique optimale en explorant et exploitant des récompenses."
  },
  {
    id: 8,
    category: "IA et Robotique",
    question: "Quel type de capteur est utilisé pour détecter la distance dans un robot ?",
    options: [
      "Capteur thermique",
      "Capteur ultrasonique",
      "Capteur de pression",
      "Capteur magnétique"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Les capteurs ultrasoniques mesurent la distance en émettant des ondes sonores et en calculant le temps de retour de l’écho, souvent utilisés dans les robots."
  },
  {
    id: 9,
    category: "IA et Robotique",
    question: "Qu’est-ce que la 'vision par ordinateur' en IA ?",
    options: [
      "Un système de stockage de données visuelles",
      "L’analyse et l’interprétation d’images par des algorithmes",
      "Un type de capteur optique",
      "Un protocole de communication visuelle"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "La vision par ordinateur permet aux machines d’interpréter des images ou des vidéos, par exemple pour reconnaître des objets ou détecter des mouvements."
  },
  {
    id: 10,
    category: "IA et Robotique",
    question: "Quel est un exemple d’application de l’IA dans la robotique ?",
    options: [
      "Gestion de bases de données",
      "Navigation autonome de drones",
      "Compression de fichiers",
      "Cryptage des communications"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "L’IA est utilisée dans la navigation autonome des drones pour traiter les données des capteurs et prendre des décisions en temps réel, comme éviter les obstacles."
  },
  {
    id: 11,
    category: "IA et Robotique",
    question: "Que signifie 'IA' ?",
    options: [
      "Ingénierie Avancée",
      "Intelligence Artificielle",
      "Interface Automatisée",
      "Instruction Adaptée"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "IA signifie 'Intelligence Artificielle', une discipline visant à créer des systèmes capables de simuler l’intelligence humaine."
  },
  {
    id: 12,
    category: "IA et Robotique",
    question: "Quel est le but principal de l’IA ?",
    options: [
      "Créer des virus",
      "Produire de l’électricité",
      "Reproduire ou simuler l’intelligence humaine",
      "Remplacer les écrans"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "L’IA cherche à reproduire ou simuler des capacités humaines comme le raisonnement, la perception ou la prise de décision."
  },
  {
    id: 13,
    category: "IA et Robotique",
    question: "Quel langage est souvent utilisé en IA ?",
    options: [
      "HTML",
      "Python",
      "CSS",
      "PHP"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Python est largement utilisé en IA grâce à ses bibliothèques puissantes comme TensorFlow, PyTorch ou Scikit-learn."
  },
  {
    id: 14,
    category: "IA et Robotique",
    question: "Qu’est-ce qu’un robot ?",
    options: [
      "Un humain déguisé",
      "Une machine capable d’exécuter des tâches automatiquement",
      "Un jouet connecté uniquement",
      "Un type de logiciel antivirus"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Un robot est une machine programmable capable d’effectuer des tâches automatiquement, souvent avec des capteurs et des actionneurs."
  },
  {
    id: 15,
    category: "IA et Robotique",
    question: "Quel domaine ne fait PAS partie de l’IA ?",
    options: [
      "Maçonnerie",
      "Traitement du langage",
      "Vision par ordinateur",
      "Apprentissage automatique"
    ],
    correctAnswer: 0,
    difficulty: "Débutant",
    explanation: "La maçonnerie est un métier manuel, tandis que le traitement du langage, la vision par ordinateur et l’apprentissage automatique sont des sous-domaines de l’IA."
  },
  {
    id: 16,
    category: "IA et Robotique",
    question: "Quel est le rôle des capteurs dans un robot ?",
    options: [
      "Émettre du son",
      "Recevoir des informations sur l’environnement",
      "Envoyer des emails",
      "Créer du texte"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Les capteurs collectent des informations sur l’environnement (distance, lumière, température, etc.) pour guider les actions du robot."
  },
  {
    id: 17,
    category: "IA et Robotique",
    question: "Quelle IA a battu le champion du monde de Go en 2016 ?",
    options: [
      "Watson",
      "AlphaGo",
      "Deep Blue",
      "Sophia"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "AlphaGo, développé par DeepMind, a battu le champion du monde de Go, Lee Sedol, en 2016, marquant une avancée majeure en IA."
  },
  {
    id: 18,
    category: "IA et Robotique",
    question: "Quel est un type courant d’apprentissage en IA ?",
    options: [
      "Apprentissage vocal",
      "Apprentissage par dessin",
      "Apprentissage supervisé",
      "Apprentissage manuscrit"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "L’apprentissage supervisé est un type courant d’IA où un modèle est entraîné avec des données étiquetées pour prédire des résultats."
  },
  {
    id: 19,
    category: "IA et Robotique",
    question: "À quoi sert la vision par ordinateur ?",
    options: [
      "À écouter de la musique",
      "À analyser le son",
      "À comprendre des images ou vidéos",
      "À traduire des textes"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "La vision par ordinateur analyse et interprète des images ou vidéos pour identifier des objets, des visages ou des mouvements."
  },
  {
    id: 20,
    category: "IA et Robotique",
    question: "Quelle partie d’un robot permet de bouger ?",
    options: [
      "La batterie",
      "Les capteurs",
      "Les actionneurs",
      "L’antenne"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Les actionneurs, comme les moteurs ou servomoteurs, permettent au robot de bouger en convertissant l’énergie en mouvement."
  },
  {
    id: 21,
    category: "IA et Robotique",
    question: "Qu’est-ce qu’un réseau de neurones artificiels ?",
    options: [
      "Un type de câble",
      "Un modèle inspiré du cerveau humain pour traiter des données",
      "Un outil de dessin",
      "Un antivirus"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un réseau de neurones artificiels est un modèle informatique inspiré du cerveau humain, utilisé pour traiter des données complexes."
  },
  {
    id: 22,
    category: "IA et Robotique",
    question: "Quel est le rôle d’un algorithme dans une IA ?",
    options: [
      "Installer des programmes",
      "Prendre des décisions à partir de données",
      "Afficher des couleurs",
      "Télécharger des fichiers"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un algorithme en IA traite les données pour prendre des décisions, prédire des résultats ou effectuer des tâches spécifiques."
  },
  {
    id: 23,
    category: "IA et Robotique",
    question: "Quel type d'IA consiste à imiter l’intelligence humaine dans des tâches précises ?",
    options: [
      "IA forte",
      "IA faible (ou étroite)",
      "IA biologique",
      "IA universelle"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "L’IA faible (ou étroite) est conçue pour exécuter des tâches spécifiques, comme la reconnaissance vocale, contrairement à l’IA forte qui vise une intelligence générale."
  },
  {
    id: 24,
    category: "IA et Robotique",
    question: "Un robot aspirateur utilise principalement :",
    options: [
      "Des bras mécaniques",
      "Une vision thermique",
      "Des capteurs de distance et de mouvement",
      "Une imprimante intégrée"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Les robots aspirateurs utilisent des capteurs de distance et de mouvement pour naviguer et éviter les obstacles dans un environnement."
  },
  {
    id: 25,
    category: "IA et Robotique",
    question: "Qu’est-ce que le machine learning ?",
    options: [
      "L’apprentissage des humains par des robots",
      "Une technologie de stockage",
      "L’apprentissage automatique par les machines",
      "Un site de téléchargement"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Le machine learning permet aux machines d’apprendre automatiquement à partir de données sans être explicitement programmées."
  },
  {
    id: 26,
    category: "IA et Robotique",
    question: "Qu’est-ce que l’IA générative ?",
    options: [
      "Une IA qui consomme beaucoup d’énergie",
      "Une IA spécialisée dans la traduction",
      "Une IA capable de créer du contenu (texte, image, audio, etc.)",
      "Une IA de sécurité"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "L’IA générative crée du contenu original, comme du texte (ChatGPT) ou des images (DALL-E), à partir de données apprises."
  },
  {
    id: 27,
    category: "IA et Robotique",
    question: "Quel est le principal inconvénient des IA actuelles ?",
    options: [
      "Elles ne peuvent pas se connecter à Internet",
      "Elles sont toujours exactes",
      "Elles peuvent être biaisées par les données",
      "Elles fonctionnent sans électricité"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Les IA peuvent être biaisées si elles sont entraînées sur des données biaisées, ce qui peut affecter leurs décisions ou prédictions."
  },
  {
    id: 28,
    category: "IA et Robotique",
    question: "Comment appelle-t-on une machine autonome capable de prendre des décisions en temps réel ?",
    options: [
      "Un automate",
      "Une tablette",
      "Un robot autonome",
      "Un GPS"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Un robot autonome utilise des capteurs et des algorithmes pour prendre des décisions en temps réel sans intervention humaine."
  },
  {
    id: 29,
    category: "IA et Robotique",
    question: "Quel domaine est lié à l’IA conversationnelle ?",
    options: [
      "Photographie",
      "Traitement du langage naturel (NLP)",
      "Gestion réseau",
      "Gravure laser"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "L’IA conversationnelle repose sur le traitement du langage naturel (NLP) pour comprendre et répondre aux interactions humaines."
  },
  {
    id: 30,
    category: "IA et Robotique",
    question: "Quel est le rôle d’un actuateur dans un robot ?",
    options: [
      "Afficher des images",
      "Convertir un signal en mouvement (ex : moteur, servo)",
      "Analyser des données",
      "Traduire des textes"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un actuateur convertit un signal électrique en mouvement physique, comme un moteur qui fait tourner les roues d’un robot."
  },
  {
    id: 31,
    category: "IA et Robotique",
    question: "Qu’est-ce que le deep learning ?",
    options: [
      "Un logiciel de dessin",
      "Une forme avancée de machine learning basée sur les réseaux de neurones profonds",
      "Un type de virus",
      "Une méthode de traduction"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Le deep learning est une branche du machine learning utilisant des réseaux de neurones profonds pour traiter des données complexes."
  },
  {
    id: 32,
    category: "IA et Robotique",
    question: "Quelle loi encadre l’usage des robots autonomes dans l’éthique ?",
    options: [
      "Code Napoléon",
      "Les trois lois de la robotique (Asimov)",
      "Loi de Moore",
      "Loi de Turing"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Les trois lois de la robotique d’Isaac Asimov sont des principes éthiques fictifs mais influents pour guider le comportement des robots."
  },
  {
    id: 33,
    category: "IA et Robotique",
    question: "Quelle entreprise a conçu ChatGPT ?",
    options: [
      "Google",
      "Meta",
      "OpenAI",
      "Amazon"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "OpenAI est l’entreprise à l’origine de ChatGPT, un modèle d’IA conversationnelle basé sur l’architecture GPT."
  },
  {
    id: 34,
    category: "IA et Robotique",
    question: "Un bras robotisé dans une usine utilise principalement :",
    options: [
      "L’IA forte",
      "La robotique industrielle avec contrôle automatisé",
      "Le deepfake",
      "L’impression 3D"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Les bras robotisés en usine utilisent la robotique industrielle avec des systèmes de contrôle automatisé pour des tâches précises."
  },
  {
    id: 35,
    category: "IA et Robotique",
    question: "Qu’est-ce qu’un drone autonome utilise pour s’orienter ?",
    options: [
      "Un micro",
      "Une boussole",
      "Un GPS et des capteurs (gyroscope, caméra, lidar, etc.)",
      "Un joystick"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Un drone autonome s’oriente grâce à un GPS et des capteurs comme des gyroscopes, caméras ou lidars pour naviguer précisément."
  },
  {
    id: 36,
    category: "IA et Robotique",
    question: "Quelle est la différence entre IA faible et IA forte ?",
    options: [
      "L’IA forte peut raisonner et comprendre, l’IA faible exécute des tâches précises",
      "L’IA faible est plus rapide",
      "L’IA forte ne fait que traduire",
      "Aucune différence"
    ],
    correctAnswer: 0,
    difficulty: "Avancé",
    explanation: "L’IA forte vise une intelligence générale proche de l’humain, tandis que l’IA faible est spécialisée dans des tâches spécifiques."
  },
  {
    id: 37,
    category: "IA et Robotique",
    question: "Quelle est la fonction du LIDAR dans un robot ?",
    options: [
      "Lire des codes QR",
      "Mesurer la distance avec un laser pour cartographier l’environnement",
      "Écouter le son",
      "Créer des images 3D"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Le LIDAR utilise des lasers pour mesurer les distances et créer une carte 3D de l’environnement, essentiel pour la navigation."
  },
  {
    id: 38,
    category: "IA et Robotique",
    question: "Qu’est-ce qu’un chatbot ?",
    options: [
      "Un programme malveillant",
      "Un robot physique",
      "Une IA capable de converser automatiquement avec un humain",
      "Un moteur de recherche"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Un chatbot est une IA conversationnelle qui interagit avec les humains via du texte ou de la voix, comme pour répondre à des questions."
  },
  {
    id: 39,
    category: "IA et Robotique",
    question: "Quelle est la limite des IA actuelles ?",
    options: [
      "Elles sont immortelles",
      "Elles n’ont pas de conscience ou de compréhension réelle",
      "Elles créent des émotions humaines",
      "Elles peuvent se reproduire seules"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Les IA actuelles n’ont pas de conscience ni de compréhension réelle; elles se basent sur des modèles statistiques pour fonctionner."
  },
  {
    id: 40,
    category: "IA et Robotique",
    question: "Pourquoi entraîne-t-on une IA ?",
    options: [
      "Pour lui donner un antivirus",
      "Pour la rendre plus légère",
      "Pour qu’elle apprenne à effectuer une tâche avec précision",
      "Pour changer son apparence"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "L’entraînement d’une IA consiste à ajuster ses paramètres pour qu’elle effectue une tâche spécifique avec précision à partir de données."
  }
]

type QuizState = 'start' | 'playing' | 'finished'

export default function QuizSoloAIandRobotics() {
  const router = useRouter()
  const [quizState, setQuizState] = useState<QuizState>('start')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)

  // Timer effect
  useEffect(() => {
    if (quizState === 'playing' && timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp()
    }
  }, [timeLeft, quizState, isAnswered])

  const startQuiz = () => {
    setQuizState('playing')
    setCurrentQuestion(0)
    setUserAnswers([])
    setScore(0)
    setTimeLeft(30)
    setIsAnswered(false)
    setShowExplanation(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return
    
    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answerIndex
    setUserAnswers(newAnswers)
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    
    setShowExplanation(true)
  }

  const handleTimeUp = () => {
    if (isAnswered) return
    
    setIsAnswered(true)
    setSelectedAnswer(-1)
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = -1
    setUserAnswers(newAnswers)
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setShowExplanation(false)
      setTimeLeft(30)
    } else {
      setQuizState('finished')
    }
  }

  const resetQuiz = () => {
    setQuizState('start')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setUserAnswers([])
    setShowExplanation(false)
    setTimeLeft(30)
    setScore(0)
    setIsAnswered(false)
  }

  const getScoreLevel = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return { level: "Expert", color: "text-green-400", icon: <Trophy className="h-6 w-6" /> }
    if (percentage >= 60) return { level: "Avancé", color: "text-blue-400", icon: <Star className="h-6 w-6" /> }
    if (percentage >= 40) return { level: "Intermédiaire", color: "text-yellow-400", icon: <Target className="h-6 w-6" /> }
    return { level: "Débutant", color: "text-red-400", icon: <Zap className="h-6 w-6" /> }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermédiaire': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avancé': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Page de démarrage
  if (quizState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              className="text-white hover:text-purple-300 mb-4"
              onClick={() => router.push('/')}
            >
              <Home className="h-4 w-4 mr-2" />
              Retour à l&apos;accueil
            </Button>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white mb-4">
                Test de Niveau - IA et Robotique
              </CardTitle>
              <CardDescription className="text-lg text-slate-300 max-w-2xl mx-auto">
                Plonge dans le futur avec ce quiz sur l’IA et la robotique ! 40 questions pour tester tes skills en intelligence artificielle et systèmes robotisés. Ready pour le challenge ?
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Durée</h3>
                  <p className="text-slate-300">30 sec/question</p>
                </div>
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Questions</h3>
                  <p className="text-slate-300">40 questions</p>
                </div>
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Award className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Évaluation</h3>
                  <p className="text-slate-300">Niveau personnalisé</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Domaine couvert
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                    IA et Robotique
                  </Badge>
                </div>
              </div>

              <div className="text-center pt-6">
                <Button 
                  onClick={startQuiz}
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-12 py-4 text-lg"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Lancer le quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Page de quiz
  if (quizState === 'playing') {
    const question = questions[currentQuestion]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white">
                <span className="text-sm text-slate-400">Question</span>
                <span className="text-2xl font-bold ml-2">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className={getDifficultyColor(question.difficulty)}>
                  {question.difficulty}
                </Badge>
                <div className="flex items-center text-white">
                  <Clock className="h-5 w-5 mr-2 text-purple-400" />
                  <span className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-400' : ''}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                  {question.category}
                </Badge>
                <div className="text-slate-400 text-sm">
                  Score: {score}/{currentQuestion + (isAnswered ? 1 : 0)}
                </div>
              </div>
              <CardTitle className="text-2xl text-white leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  let buttonClass = "w-full p-4 text-left border-2 transition-all duration-300 "
                  
                  if (showExplanation) {
                    if (index === question.correctAnswer) {
                      buttonClass += "border-green-500 bg-green-500/20 text-green-300"
                    } else if (index === selectedAnswer && index !== question.correctAnswer) {
                      buttonClass += "border-red-500 bg-red-500/20 text-red-300"
                    } else {
                      buttonClass += "border-slate-600 bg-slate-700/30 text-slate-400"
                    }
                  } else {
                    if (selectedAnswer === index) {
                      buttonClass += "border-purple-500 bg-purple-500/20 text-white"
                    } else {
                      buttonClass += "border-slate-600 bg-slate-700/30 text-white hover:border-purple-400 hover:bg-purple-500/10"
                    }
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option}</span>
                        {showExplanation && index === question.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                        {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                    </Button>
                  )
                })}
              </div>

              {showExplanation && (
                <Card className="bg-slate-700/30 border-slate-600 mt-6">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Explication</h4>
                        <p className="text-slate-300">{question.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {showExplanation && (
                <div className="text-center pt-6">
                  <Button 
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        Question suivante
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Voir les résultats
                        <Trophy className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Page des résultats
  if (quizState === 'finished') {
    const scoreLevel = getScoreLevel()
    const percentage = (score / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className={`h-20 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 ${scoreLevel.color}`}>
                {scoreLevel.icon}
              </div>
              <CardTitle className="text-4xl text-white mb-4">
                Quiz Terminé !
              </CardTitle>
              <CardDescription className="text-xl text-slate-300">
                Voilà ton score et ton niveau en IA et Robotique !
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="text-center bg-slate-700/30 rounded-lg p-8">
                <div className="text-6xl font-bold text-white mb-2">
                  {score}/{questions.length}
                </div>
                <div className="text-2xl text-slate-300 mb-4">
                  {percentage.toFixed(0)}% de réussite
                </div>
                <Badge className={`text-lg px-4 py-2 ${scoreLevel.color.replace('text-', 'bg-').replace('-400', '-500/20')} border-current`}>
                  Niveau: {scoreLevel.level}
                </Badge>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Détail des réponses</h3>
                <div className="space-y-3">
                  {questions.map((question, index) => {
                    const userAnswer = userAnswers[index]
                    const isCorrect = userAnswer === question.correctAnswer
                    const wasTimeout = userAnswer === -1

                    return (
                      <div key={question.id} className="bg-slate-700/30 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              isCorrect ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                              {isCorrect ? (
                                <CheckCircle className="h-5 w-5 text-white" />
                              ) : (
                                <XCircle className="h-5 w-5 text-white" />
                              )}
                            </div>
                            <span className="text-white font-medium">Question {index + 1}</span>
                          </div>
                          <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">{question.question}</p>
                        <div className="text-sm">
                          {wasTimeout ? (
                            <span className="text-red-400">Temps écoulé</span>
                          ) : (
                            <>
                              <span className="text-slate-400">Votre réponse: </span>
                              <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                                {question.options[userAnswer]}
                              </span>
                            </>
                          )}
                          {!isCorrect && (
                            <>
                              <br />
                              <span className="text-slate-400">Bonne réponse: </span>
                              <span className="text-green-400">{question.options[question.correctAnswer]}</span>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Refaire le quiz
                </Button>
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => router.push('/')}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Retour à l&apos;accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}