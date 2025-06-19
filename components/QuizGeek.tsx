'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Gamepad2, 
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
    category: "Culture Geek",
    question: "C'est quoi l'USB-C ?",
    options: [
      "Un ancien connecteur pour les téléphones",
      "Un connecteur universel réversible pour charger et transférer des données",
      "Un protocole de sécurité",
      "Un système d'exploitation"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "L'USB-C est un connecteur universel réversible qui permet de charger les appareils et de transférer des données à haute vitesse."
  },
  {
    id: 2,
    category: "Culture Geek",
    question: "Combien de systèmes d'exploitation Apple a-t-il créés ?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Apple a créé 4 systèmes d'exploitation principaux : macOS, iOS, watchOS et tvOS."
  },
  {
    id: 3,
    category: "Culture Geek",
    question: "En quelle année Apple a-t-il été fondé ?",
    options: ["1975", "1976", "1977", "1978"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Apple a été fondé en 1976 par Steve Jobs, Steve Wozniak et Ronald Wayne."
  },
  {
    id: 4,
    category: "Culture Geek",
    question: "En quelle année Facebook a-t-il été fondé ?",
    options: ["2003", "2004", "2005", "2006"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Facebook a été fondé en 2004 par Mark Zuckerberg à l'université Harvard."
  },
  {
    id: 5,
    category: "Culture Geek",
    question: "En quelle année Microsoft a-t-il été fondé ?",
    options: ["1974", "1975", "1976", "1977"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Microsoft a été fondé en 1975 par Bill Gates et Paul Allen."
  },
  {
    id: 6,
    category: "Culture Geek",
    question: "En quelle année Spotify a-t-il été fondé ?",
    options: ["2005", "2006", "2007", "2008"],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Spotify a été fondé en 2006 par Daniel Ek et Martin Lorentzon en Suède."
  },
  {
    id: 7,
    category: "Culture Geek",
    question: "En quelle année le moteur de recherche Google est-il sorti ?",
    options: ["1996", "1997", "1998", "1999"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Google a été lancé en 1998 par Larry Page et Sergey Brin à Stanford."
  },
  {
    id: 8,
    category: "Culture Geek",
    question: "En quelle année Windows XP est-il sorti ?",
    options: ["2000", "2001", "2002", "2003"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Windows XP a été lancé en 2001 et est devenu l'un des systèmes Windows les plus populaires."
  },
  {
    id: 9,
    category: "Culture Geek",
    question: "Qu'est-ce qu'un fichier ZIP ?",
    options: [
      "Un fichier image",
      "Un fichier de compression qui réduit la taille des données",
      "Un fichier vidéo",
      "Un fichier système"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Un fichier ZIP est un format de compression qui permet de réduire la taille des fichiers et de les regrouper en une seule archive."
  },
  {
    id: 10,
    category: "Culture Geek",
    question: "Quand Internet Explorer est-il mort ?",
    options: ["2020", "2021", "2022", "2023"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Internet Explorer a officiellement pris fin en 2022, remplacé définitivement par Microsoft Edge."
  },
  {
    id: 11,
    category: "Culture Geek",
    question: "Que signifie BIOS ?",
    options: [
      "Basic Input Output System",
      "Binary Internet Operating System",
      "Boot Initial Operating Software",
      "Base Information Output System"
    ],
    correctAnswer: 0,
    difficulty: "Intermédiaire",
    explanation: "BIOS signifie Basic Input Output System, c'est le firmware qui initialise l'ordinateur au démarrage."
  },
  {
    id: 12,
    category: "Culture Geek",
    question: "Que signifie HDMI ?",
    options: [
      "High Data Multimedia Interface",
      "High Definition Multimedia Interface",
      "High Digital Media Input",
      "Hard Drive Media Interface"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "HDMI signifie High Definition Multimedia Interface, c'est un standard pour transmettre audio et vidéo en haute définition."
  },
  {
    id: 13,
    category: "Culture Geek",
    question: "Que signifie USB ?",
    options: [
      "Universal System Bus",
      "Universal Serial Bus",
      "United System Bridge",
      "Universal Storage Bus"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "USB signifie Universal Serial Bus, c'est un standard de connectivité pour relier des périphériques à un ordinateur."
  },
  {
    id: 14,
    category: "Culture Geek",
    question: "Qui a créé ChatGPT ?",
    options: ["Google", "OpenAI", "Microsoft", "Meta"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "ChatGPT a été créé par OpenAI, une société de recherche en intelligence artificielle fondée en 2015."
  },
  {
    id: 15,
    category: "Culture Geek",
    question: "Qui a fondé Apple ?",
    options: [
      "Bill Gates et Paul Allen",
      "Steve Jobs et Steve Wozniak",
      "Larry Page et Sergey Brin",
      "Mark Zuckerberg"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Apple a été fondé par Steve Jobs, Steve Wozniak et Ronald Wayne (qui a rapidement vendu sa part)."
  },
  {
    id: 16,
    category: "Culture Geek",
    question: "Quelle entreprise a créé Windows ?",
    options: ["Apple", "IBM", "Microsoft", "Intel"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Microsoft a créé Windows, le système d'exploitation le plus utilisé sur les ordinateurs personnels."
  },
  {
    id: 17,
    category: "Culture Geek",
    question: "Quel système d’exploitation est le plus utilisé sur les ordinateurs personnels ?",
    options: ["Linux", "macOS", "Windows", "Chrome OS"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Windows est le système d'exploitation dominant sur les PC, avec une part de marché majoritaire."
  },
  {
    id: 18,
    category: "Culture Geek",
    question: "Qui est le cofondateur d’Apple avec Steve Jobs ?",
    options: ["Bill Gates", "Elon Musk", "Steve Wozniak", "Jeff Bezos"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Steve Wozniak, surnommé 'Woz', a cofondé Apple avec Steve Jobs et a conçu les premiers ordinateurs Apple."
  },
  {
    id: 19,
    category: "Culture Geek",
    question: "Quel langage de programmation est principalement utilisé pour le web côté client ?",
    options: ["Python", "JavaScript", "C++", "SQL"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "JavaScript est le langage principal pour le développement web côté client, permettant des interactions dynamiques sur les sites."
  },
  {
    id: 20,
    category: "Culture Geek",
    question: "Quelle entreprise a conçu les processeurs Core i3, i5 et i7 ?",
    options: ["AMD", "Intel", "Nvidia", "Qualcomm"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Intel est le fabricant des processeurs Core i3, i5 et i7, largement utilisés dans les PC."
  },
  {
    id: 21,
    category: "Culture Geek",
    question: "Que signifie 'URL' ?",
    options: [
      "Unique Routing Link",
      "Unified Resource Layer",
      "Uniform Resource Locator",
      "Universal Redirect Location"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "URL signifie Uniform Resource Locator, c'est l'adresse utilisée pour accéder à une ressource sur Internet."
  },
  {
    id: 22,
    category: "Culture Geek",
    question: "Quel navigateur a été développé par Mozilla ?",
    options: ["Edge", "Firefox", "Safari", "Opera"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Firefox est le navigateur web développé par la Mozilla Corporation, connu pour son respect de la vie privée."
  },
  {
    id: 23,
    category: "Culture Geek",
    question: "Qu’est-ce qu’un octet ?",
    options: [
      "Une puce informatique",
      "Une unité de stockage valant 8 bits",
      "Un protocole réseau",
      "Un langage machine"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Un octet est une unité de stockage numérique composée de 8 bits, utilisée pour représenter un caractère ou une donnée."
  },
  {
    id: 24,
    category: "Culture Geek",
    question: "Quel composant est essentiel pour exécuter des calculs dans un PC ?",
    options: ["Disque dur", "Processeur (CPU)", "Carte réseau", "Écran"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Le processeur (CPU) est le cerveau de l'ordinateur, chargé d'exécuter les calculs et les instructions."
  },
  {
    id: 25,
    category: "Culture Geek",
    question: "Quel est le principal langage utilisé pour interroger une base de données relationnelle ?",
    options: ["HTML", "Bash", "SQL", "CSS"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "SQL (Structured Query Language) est utilisé pour interroger et gérer les bases de données relationnelles."
  },
  {
    id: 26,
    category: "Culture Geek",
    question: "Quel est le rôle d’un système d’exploitation ?",
    options: [
      "Refroidir le processeur",
      "Gérer les ressources matérielles et logicielles d’un ordinateur",
      "Lancer des jeux",
      "Connecter à Internet"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un système d'exploitation gère les ressources matérielles (CPU, mémoire) et logicielles pour faire fonctionner un ordinateur."
  },
  {
    id: 27,
    category: "Culture Geek",
    question: "Quel est le nom complet de l’entreprise IBM ?",
    options: [
      "International Basic Machines",
      "International Business Machines",
      "Integrated Binary Machines",
      "Informatic Business Makers"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "IBM signifie International Business Machines, une entreprise historique dans l'informatique."
  },
  {
    id: 28,
    category: "Culture Geek",
    question: "Que signifie HTTPS ?",
    options: [
      "Hyper Transfer Page Script",
      "HyperText Transfer Protocol Secure",
      "Highly Typed Protocol Server",
      "Host TCP Secure"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "HTTPS (HyperText Transfer Protocol Secure) est une version sécurisée de HTTP, utilisant le chiffrement SSL/TLS."
  },
  {
    id: 29,
    category: "Culture Geek",
    question: "Quelle entreprise est propriétaire du système Android ?",
    options: ["Apple", "Google", "Microsoft", "Oracle"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Google est le propriétaire d'Android, un système d'exploitation mobile open-source."
  },
  {
    id: 30,
    category: "Culture Geek",
    question: "Quel est l’objectif d’un pare-feu (firewall) ?",
    options: [
      "Éteindre l’ordinateur en cas de surchauffe",
      "Contrôler les connexions réseau entrantes et sortantes",
      "Scanner les virus",
      "Crypter les fichiers"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un pare-feu contrôle les connexions réseau pour protéger un système contre les accès non autorisés."
  },
  {
    id: 31,
    category: "Culture Geek",
    question: "Qu’est-ce que Git ?",
    options: [
      "Un moteur de recherche",
      "Un langage de programmation",
      "Un système de gestion de versions",
      "Un navigateur"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Git est un système de gestion de versions permettant de suivre les modifications du code source."
  },
  {
    id: 32,
    category: "Culture Geek",
    question: "Quelle extension correspond à un fichier exécutable sous Windows ?",
    options: [".doc", ".exe", ".png", ".html"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "L'extension .exe désigne un fichier exécutable sous Windows, capable de lancer un programme."
  },
  {
    id: 33,
    category: "Culture Geek",
    question: "Que signifie 'CPU' ?",
    options: [
      "Central Power Unit",
      "Central Processing Unit",
      "Core Processor Utility",
      "Central Public Unit"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "CPU signifie Central Processing Unit, c'est le composant principal qui exécute les instructions d'un ordinateur."
  },
  {
    id: 34,
    category: "Culture Geek",
    question: "En quelle année a été fondée Microsoft ?",
    options: ["1985", "1980", "1975", "1990"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Microsoft a été fondé en 1975 par Bill Gates et Paul Allen."
  },
  {
    id: 35,
    category: "Culture Geek",
    question: "Quel système Linux est le plus utilisé pour les serveurs ?",
    options: ["Linux Mint", "Arch Linux", "Elementary OS", "Ubuntu Server"],
    correctAnswer: 3,
    difficulty: "Intermédiaire",
    explanation: "Ubuntu Server est une distribution Linux populaire pour les serveurs grâce à sa stabilité et son support."
  },
  {
    id: 36,
    category: "Culture Geek",
    question: "Quel est le rôle du DNS ?",
    options: [
      "Gérer les disques durs",
      "Traduire les noms de domaines en adresses IP",
      "Chiffrer les communications",
      "Protéger les emails"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Le DNS (Domain Name System) traduit les noms de domaines (comme google.com) en adresses IP utilisables par les machines."
  },
  {
    id: 37,
    category: "Culture Geek",
    question: "Qu’est-ce qu’une adresse MAC ?",
    options: [
      "Une adresse IP publique",
      "L’identifiant d’un disque dur",
      "L’identifiant physique unique d’une carte réseau",
      "L’adresse d’un site web"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Une adresse MAC (Media Access Control) est un identifiant unique attribué à une carte réseau pour la communication sur un réseau."
  },
  {
    id: 38,
    category: "Culture Geek",
    question: "Qui est considéré comme le père de l'informatique moderne ?",
    options: ["Tim Berners-Lee", "Dennis Ritchie", "Alan Turing", "Bill Gates"],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Alan Turing est considéré comme le père de l'informatique moderne pour ses travaux sur la théorie du calcul et la machine de Turing."
  },
  {
    id: 39,
    category: "Culture Geek",
    question: "Quel composant conserve les données en cas de coupure d’alimentation ?",
    options: ["RAM", "Disque dur ou SSD", "Processeur", "Carte mère"],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Les disques durs et SSD conservent les données de manière permanente, contrairement à la RAM qui est volatile."
  },
  {
    id: 40,
    category: "Culture Geek",
    question: "Que signifie 'BIOS' ?",
    options: [
      "Basic Integrated Output System",
      "Binary Input Output Structure",
      "Basic Input Output System",
      "Base Internal Operating System"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "BIOS (Basic Input Output System) est un firmware qui initialise le matériel au démarrage d’un ordinateur."
  },
  {
    id: 41,
    category: "Culture Geek",
    question: "Qu’est-ce qu’un protocole réseau ?",
    options: [
      "Un type de câble",
      "Un ensemble de règles pour la communication entre machines",
      "Un logiciel antivirus",
      "Une carte graphique"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Un protocole réseau définit les règles pour la communication entre appareils, comme TCP/IP pour Internet."
  },
  {
    id: 42,
    category: "Culture Geek",
    question: "Quel langage est utilisé pour les scripts en ligne de commande sous Linux ?",
    options: ["Python", "SQL", "Bash", "PHP"],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Bash (Bourne Again Shell) est le langage de script par défaut pour les commandes sous Linux."
  },
  {
    id: 43,
    category: "Culture Geek",
    question: "Que permet le protocole FTP ?",
    options: [
      "Chiffrer les messages",
      "Transférer des fichiers sur un réseau",
      "Gérer des emails",
      "Bloquer les virus"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "FTP (File Transfer Protocol) permet de transférer des fichiers entre un client et un serveur sur un réseau."
  },
  {
    id: 44,
    category: "Culture Geek",
    question: "Qu’est-ce qu’un 'cloud' en informatique ?",
    options: [
      "Une sauvegarde locale",
      "Un service distant de stockage ou de traitement de données",
      "Un type de processeur",
      "Une carte son"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Le cloud computing fournit des services de stockage et de calcul via des serveurs distants accessibles sur Internet."
  },
  {
    id: 45,
    category: "Culture Geek",
    question: "Quel outil de virtualisation est développé par Oracle ?",
    options: ["Hyper-V", "VMware", "Parallels", "VirtualBox"],
    correctAnswer: 3,
    difficulty: "Avancé",
    explanation: "VirtualBox est un outil de virtualisation open-source développé par Oracle."
  }
]

type QuizState = 'start' | 'playing' | 'finished'

export default function QuizCultureGeek() {
  const router = useRouter()
  const [quizState, setQuizState] = useState<QuizState>('start')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])

  // Mélanger les questions au démarrage
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled.slice(0, 10)) // Prendre 10 questions aléatoires
  }, [])

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
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled.slice(0, 10))
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
    
    if (answerIndex === shuffledQuestions[currentQuestion].correctAnswer) {
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
    if (currentQuestion < shuffledQuestions.length - 1) {
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
    const percentage = (score / shuffledQuestions.length) * 100
    if (percentage >= 80) return { level: "Geek Expert", color: "text-green-400", icon: <Trophy className="h-6 w-6" /> }
    if (percentage >= 60) return { level: "Geek Confirmé", color: "text-blue-400", icon: <Star className="h-6 w-6" /> }
    if (percentage >= 40) return { level: "Geek Débutant", color: "text-yellow-400", icon: <Target className="h-6 w-6" /> }
    return { level: "Novice", color: "text-red-400", icon: <Zap className="h-6 w-6" /> }
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              className="text-white hover:text-indigo-300 mb-4"
              onClick={() => router.push('/')}
            >
              <Home className="h-4 w-4 mr-2" />
              Retour à l&apos;accueil
            </Button>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white mb-4">
                Quiz Culture Geek
              </CardTitle>
              <CardDescription className="text-lg text-slate-300 max-w-2xl mx-auto">
                Testez vos connaissances sur l&apos;univers tech ! 
                Histoire de l&apos;informatique, grandes entreprises, technologies... 10 questions random pour un max de fun !
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Clock className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Durée</h3>
                  <p className="text-slate-300">30 sec/question</p>
                </div>
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Target className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Questions</h3>
                  <p className="text-slate-300">10 questions</p>
                </div>
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Award className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Thème</h3>
                  <p className="text-slate-300">Culture Geek</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Sujets abordés
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Histoire Tech', 'Entreprises', 'Acronymes', 'Systèmes', 'Hardware', 'Internet'].map((category) => (
                    <Badge key={category} variant="outline" className="border-indigo-500/30 text-indigo-300">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-center pt-6">
                <Button 
                  onClick={startQuiz}
                  size="lg" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-12 py-4 text-lg"
                >
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Commencer le quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Page de quiz
  if (quizState === 'playing' && shuffledQuestions.length > 0) {
    const question = shuffledQuestions[currentQuestion]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white">
                <span className="text-sm text-slate-400">Question</span>
                <span className="text-2xl font-bold ml-2">
                  {currentQuestion + 1}/{shuffledQuestions.length}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className={getDifficultyColor(question.difficulty)}>
                  {question.difficulty}
                </Badge>
                <div className="flex items-center text-white">
                  <Clock className="h-5 w-5 mr-2 text-indigo-400" />
                  <span className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-400' : ''}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>
            <Progress value={(currentQuestion / shuffledQuestions.length) * 100} className="h-2" />
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                  <Gamepad2 className="h-4 w-4 mr-1" />
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
                      buttonClass += "border-indigo-500 bg-indigo-500/20 text-white"
                    } else {
                      buttonClass += "border-slate-600 bg-slate-700/30 text-white hover:border-indigo-400 hover:bg-indigo-500/10"
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
                      <div className="h-6 w-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">💡</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Le saviez-vous ?</h4>
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
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {currentQuestion < shuffledQuestions.length - 1 ? (
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
  if (quizState === 'finished' && shuffledQuestions.length > 0) {
    const scoreLevel = getScoreLevel()
    const percentage = (score / shuffledQuestions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className={`h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6`}>
                {scoreLevel.icon}
              </div>
              <CardTitle className="text-4xl text-white mb-4">
                Quiz Terminé ! 🎮
              </CardTitle>
              <CardDescription className="text-xl text-slate-300">
                Découvrez votre niveau de culture geek
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="text-center bg-slate-700/30 rounded-lg p-8">
                <div className="text-6xl font-bold text-white mb-2">
                  {score}/{shuffledQuestions.length}
                </div>
                <div className="text-2xl text-slate-300 mb-4">
                  {percentage.toFixed(0)}% de réussite
                </div>
                <Badge className={`text-lg px-4 py-2 ${scoreLevel.color.replace('text-', 'bg-').replace('-400', '-500/20')} border-current`}>
                  Niveau: {scoreLevel.level}
                </Badge>
              </div>

              <div className="text-center bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {percentage >= 80 ? "🏆 Incroyable !" : 
                   percentage >= 60 ? "👍 Bien joué !" : 
                   percentage >= 40 ? "🔥 Pas mal !" : "💪 Continue comme ça !"}
                </h3>
                <p className="text-slate-300">
                  {percentage >= 80 ? "Tu es un vrai geek ! Tes connaissances tech sont impressionnantes." : 
                   percentage >= 60 ? "Tu maîtrises bien la culture geek, continue à explorer !" : 
                   percentage >= 40 ? "Tu as de bonnes bases, il faut juste creuser un peu plus." : "L'univers tech n'a plus qu'à bien se tenir, tu progresses !"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Détail des réponses</h3>
                <div className="space-y-3">
                  {shuffledQuestions.map((question, index) => {
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
                            <span className="text-red-400">⏰ Temps écoulé</span>
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
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
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