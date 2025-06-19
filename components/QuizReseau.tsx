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
    category: "Réseaux",
    question: "Combien d'octets compte une adresse IPv4 ?",
    options: ["2 octets", "4 octets", "6 octets", "8 octets"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Une adresse IPv4 est composée de 32 bits, soit 4 octets (4 x 8 bits). Chaque octet est représenté par un nombre décimal de 0 à 255, séparé par des points."
  },
  {
    id: 2,
    category: "Réseaux",
    question: "Que signifie DNS ?",
    options: ["Dynamic Network Service", "Domain Name System", "Data Network Standard", "Distributed Name Server"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "DNS (Domain Name System) est un protocole qui traduit les noms de domaine (comme www.google.com) en adresses IP utilisables par les ordinateurs."
  },
  {
    id: 3,
    category: "Réseaux",
    question: "Qu’est-ce qu’un pare-feu informatique ?",
    options: [
      "Un logiciel de sauvegarde de données",
      "Un dispositif qui contrôle et filtre le trafic réseau",
      "Un programme d’analyse de performance",
      "Un système de cryptage des données"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un pare-feu informatique est un dispositif ou logiciel qui surveille et contrôle le trafic réseau selon des règles de sécurité, bloquant les accès non autorisés."
  },
  {
    id: 4,
    category: "Réseaux",
    question: "Qu’est-ce qu’un VLAN ?",
    options: [
      "Un réseau physique séparé",
      "Un réseau local virtuel segmenté logiquement",
      "Un protocole de routage",
      "Un type de câble réseau"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un VLAN (Virtual Local Area Network) permet de segmenter logiquement un réseau physique en plusieurs réseaux virtuels, améliorant la gestion et la sécurité."
  },
  {
    id: 5,
    category: "Réseaux",
    question: "Quelle est la différence entre les protocoles TELNET et SSH ?",
    options: [
      "TELNET est sécurisé, SSH ne l’est pas",
      "SSH utilise le cryptage, TELNET ne l’utilise pas",
      "TELNET est plus rapide, SSH est plus lent",
      "Aucune différence, ils sont identiques"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "SSH (Secure Shell) utilise le cryptage pour sécuriser les communications, contrairement à TELNET qui transmet les données en texte brut, le rendant vulnérable aux interceptions."
  },
  {
    id: 6,
    category: "Réseaux",
    question: "Qu’est-ce qu’un réseau informatique ?",
    options: [
      "Un ensemble de télévisions connectées",
      "Une collection de sites web",
      "Un ensemble de câbles électriques",
      "Un ensemble d’ordinateurs et de périphériques interconnectés"
    ],
    correctAnswer: 3,
    difficulty: "Débutant",
    explanation: "Un réseau informatique est un ensemble d’ordinateurs et de périphériques interconnectés permettant le partage de données et de ressources."
  },
  {
    id: 7,
    category: "Réseaux",
    question: "Que signifie l'acronyme 'LAN' ?",
    options: [
      "Local Area Network",
      "Light Application Network",
      "Long Area Network",
      "Logical Access Network"
    ],
    correctAnswer: 0,
    difficulty: "Débutant",
    explanation: "LAN (Local Area Network) désigne un réseau local qui connecte des appareils dans une zone géographique restreinte, comme un bureau ou une maison."
  },
  {
    id: 8,
    category: "Réseaux",
    question: "Que signifie 'Wi-Fi' ?",
    options: [
      "Wireless Fidelity",
      "Wide Fiber Internet",
      "Web Interface File",
      "Wired Fidelity"
    ],
    correctAnswer: 0,
    difficulty: "Débutant",
    explanation: "Wi-Fi (Wireless Fidelity) est une technologie permettant une connexion sans fil à un réseau, souvent utilisée pour accéder à Internet."
  },
  {
    id: 9,
    category: "Réseaux",
    question: "Quelle est la différence entre un switch et un hub ?",
    options: [
      "Le hub est plus intelligent que le switch",
      "Le switch envoie les données au bon destinataire, le hub à tous",
      "Ils sont identiques",
      "Le switch est plus lent qu’un hub"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Un switch envoie les données uniquement au destinataire prévu, tandis qu’un hub diffuse les données à tous les appareils connectés, ce qui le rend moins efficace."
  },
  {
    id: 10,
    category: "Réseaux",
    question: "Qu’est-ce qu’une adresse IP ?",
    options: [
      "Une adresse unique identifiant un appareil sur un réseau",
      "Un type de virus",
      "Un nom de domaine",
      "Une boîte mail"
    ],
    correctAnswer: 0,
    difficulty: "Débutant",
    explanation: "Une adresse IP est un identifiant unique attribué à chaque appareil sur un réseau pour permettre la communication."
  },
  {
    id: 11,
    category: "Réseaux",
    question: "Quel est le rôle d’un routeur dans un réseau ?",
    options: [
      "Relier plusieurs réseaux et acheminer les données",
      "Fournir de l’électricité aux câbles",
      "Créer des pages web",
      "Convertir les adresses IP en noms"
    ],
    correctAnswer: 0,
    difficulty: "Débutant",
    explanation: "Un routeur relie différents réseaux et achemine les données entre eux en fonction des adresses IP."
  },
  {
    id: 12,
    category: "Réseaux",
    question: "Que veut dire 'IP' dans 'adresse IP' ?",
    options: [
      "Internet Protocol",
      "Internal Port",
      "International Packet",
      "Input Provider"
    ],
    correctAnswer: 0,
    difficulty: "Débutant",
    explanation: "IP signifie Internet Protocol, un ensemble de règles pour l’adressage et l’acheminement des données sur Internet."
  },
  {
    id: 13,
    category: "Réseaux",
    question: "Quelle est la différence entre IPv4 et IPv6 ?",
    options: [
      "IPv6 est plus ancien",
      "IPv4 utilise 64 bits",
      "IPv4 utilise 32 bits, IPv6 utilise 128 bits",
      "IPv6 est uniquement pour les smartphones"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "IPv4 utilise des adresses de 32 bits, tandis qu’IPv6 utilise des adresses de 128 bits, offrant plus d’adresses possibles."
  },
  {
    id: 14,
    category: "Réseaux",
    question: "Que signifie 'DNS' ?",
    options: [
      "Domain Name System",
      "Digital Network Server",
      "Data Number Service",
      "Download Network System"
    ],
    correctAnswer: 0,
    difficulty: "Débutant",
    explanation: "DNS (Domain Name System) traduit les noms de domaine en adresses IP pour permettre la navigation sur Internet."
  },
  {
    id: 15,
    category: "Réseaux",
    question: "À quoi sert une box Internet chez un particulier ?",
    options: [
      "Se connecter à Internet et gérer le réseau local",
      "Regarder la télévision",
      "Stocker des vidéos",
      "Augmenter le volume sonore de l’ordinateur"
    ],
    correctAnswer: 0,
    difficulty: "Débutant",
    explanation: "Une box Internet permet de se connecter à Internet et de gérer le réseau local, en fournissant des services comme le Wi-Fi et la téléphonie."
  },
  {
    id: 16,
    category: "Réseaux",
    question: "Quelle est la plage d'adresses IP privées ?",
    options: [
      "192.0.0.0 à 192.255.255.255",
      "8.8.8.8 à 8.8.8.255",
      "10.0.0.0 à 10.255.255.255 / 172.16.0.0 à 172.31.255.255 / 192.168.0.0 à 192.168.255.255",
      "1.1.1.1 à 1.1.1.255"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Les plages d'adresses IP privées sont définies par les standards RFC 1918 : 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255 et 192.168.0.0–192.168.255.255."
  },
  {
    id: 17,
    category: "Réseaux",
    question: "Qu’est-ce que le protocole DHCP ?",
    options: [
      "Il attribue automatiquement des adresses IP aux appareils",
      "Il crypte les fichiers",
      "Il héberge des sites web",
      "Il bloque les virus"
    ],
    correctAnswer: 0,
    difficulty: "Intermédiaire",
    explanation: "DHCP (Dynamic Host Configuration Protocol) attribue automatiquement des adresses IP et autres paramètres réseau aux appareils."
  },
  {
    id: 18,
    category: "Réseaux",
    question: "Citez deux couches du modèle OSI.",
    options: [
      "Clé et Socket",
      "Transport et Réseau",
      "Adresse et Liaison",
      "IP et MAC"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Le modèle OSI comprend sept couches, dont la couche Transport (ex. TCP) et la couche Réseau (ex. IP)."
  },
  {
    id: 19,
    category: "Réseaux",
    question: "Quel est le rôle du protocole TCP ?",
    options: [
      "Créer des sites web",
      "Diffuser des vidéos",
      "Assurer une communication fiable et ordonnée",
      "Bloquer les spams"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "TCP (Transmission Control Protocol) garantit une communication fiable en assurant l’ordre des données et la retransmission en cas de perte."
  },
  {
    id: 20,
    category: "Réseaux",
    question: "Quelle est la différence entre TCP et UDP ?",
    options: [
      "TCP est fiable, UDP est plus rapide mais sans vérification",
      "UDP est plus sécurisé",
      "TCP n’est utilisé que pour le Wi-Fi",
      "UDP ne fonctionne qu’en local"
    ],
    correctAnswer: 0,
    difficulty: "Intermédiaire",
    explanation: "TCP est fiable avec contrôle d’erreurs, tandis qu’UDP est plus rapide mais ne vérifie pas la réception correcte des données."
  },
  {
    id: 21,
    category: "Réseaux",
    question: "Qu’est-ce qu’un pare-feu (firewall) ?",
    options: [
      "Un système de filtrage du trafic réseau",
      "Un antivirus",
      "Un câble spécial",
      "Un navigateur"
    ],
    correctAnswer: 0,
    difficulty: "Intermédiaire",
    explanation: "Un pare-feu filtre le trafic réseau selon des règles pour protéger un réseau ou un appareil contre les accès non autorisés."
  },
  {
    id: 22,
    category: "Réseaux",
    question: "Comment reconnaître une adresse IP publique ?",
    options: [
      "Elle commence toujours par 127",
      "Elle est en IPv6 uniquement",
      "Elle n’appartient pas aux plages privées",
      "Elle finit toujours par 1"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Une adresse IP publique est une adresse qui n’appartient pas aux plages privées définies par RFC 1918."
  },
  {
    id: 23,
    category: "Réseaux",
    question: "Quelle commande Windows permet de tester la connectivité ?",
    options: [
      "netstat",
      "ipconfig",
      "traceroute",
      "ping"
    ],
    correctAnswer: 3,
    difficulty: "Intermédiaire",
    explanation: "La commande 'ping' teste la connectivité entre deux appareils en envoyant des paquets et en mesurant le temps de réponse."
  },
  {
    id: 24,
    category: "Réseaux",
    question: "Qu’est-ce qu’un VPN ?",
    options: [
      "Une boîte de connexion",
      "Un réseau privé virtuel chiffré",
      "Un câble Ethernet",
      "Un type de pare-feu"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un VPN (Virtual Private Network) crée un tunnel chiffré pour sécuriser et anonymiser les connexions sur un réseau."
  },
  {
    id: 25,
    category: "Réseaux",
    question: "Quelle est la fonction du protocole ARP ?",
    options: [
      "Gérer les mails",
      "Convertir un nom de domaine",
      "Associer une IP à une adresse MAC",
      "Crypter les paquets"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "ARP (Address Resolution Protocol) associe une adresse IP à une adresse MAC pour permettre la communication sur un réseau local."
  },
  {
    id: 26,
    category: "Réseaux",
    question: "Différence entre un réseau en étoile et un réseau en bus ?",
    options: [
      "Bus = plus rapide",
      "Étoile = point central, Bus = câble partagé",
      "Bus = uniquement sans fil",
      "Étoile = pas de câblage"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Un réseau en étoile utilise un point central (switch/routeur), tandis qu’un réseau en bus partage un seul câble entre tous les appareils."
  },
  {
    id: 27,
    category: "Réseaux",
    question: "Que se passe-t-il lors d'une résolution DNS ?",
    options: [
      "Le nom de domaine est traduit en adresse IP",
      "L’adresse IP est cryptée",
      "Le site web est compressé",
      "L’ordinateur est redémarré"
    ],
    correctAnswer: 0,
    difficulty: "Avancé",
    explanation: "La résolution DNS traduit un nom de domaine en une adresse IP pour permettre la connexion à un serveur."
  },
  {
    id: 28,
    category: "Réseaux",
    question: "Donnez la structure d’un paquet IP.",
    options: [
      "Login – Password – Data",
      "Source MAC – Source IP – DNS",
      "En-tête (source, destination, TTL) + données",
      "Nom – Port – Protocole"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Un paquet IP comprend un en-tête (avec adresses source/destination, TTL, etc.) et les données transportées."
  },
  {
    id: 29,
    category: "Réseaux",
    question: "Qu’est-ce qu’un VLAN ?",
    options: [
      "Un type de câble",
      "Un réseau logique virtuel isolé sur un réseau physique",
      "Un protocole de messagerie",
      "Un pare-feu d’entreprise"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Un VLAN (Virtual Local Area Network) isole logiquement des segments de réseau sur une infrastructure physique."
  },
  {
    id: 30,
    category: "Réseaux",
    question: "Quel est le rôle du protocole BGP ?",
    options: [
      "Gérer la messagerie privée",
      "Gérer le routage entre les grands réseaux (AS)",
      "Sauvegarder les fichiers",
      "Générer des mots de passe"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "BGP (Border Gateway Protocol) gère le routage entre des systèmes autonomes (AS) sur Internet."
  },
  {
    id: 31,
    category: "Réseaux",
    question: "Qu’est-ce qu’une adresse MAC ?",
    options: [
      "Une adresse de messagerie",
      "Une adresse IP secondaire",
      "Une adresse physique d’interface réseau",
      "Une marque de routeur"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Une adresse MAC est une adresse physique unique attribuée à une interface réseau pour l’identification au niveau de la couche liaison."
  },
  {
    id: 32,
    category: "Réseaux",
    question: "Quel protocole est utilisé pour envoyer des e-mails ?",
    options: [
      "POP3",
      "IMAP",
      "SMTP",
      "FTP"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "SMTP (Simple Mail Transfer Protocol) est utilisé pour envoyer des e-mails, tandis que POP3 et IMAP servent à les récupérer."
  },
  {
    id: 33,
    category: "Réseaux",
    question: "Quelle commande affiche la config réseau sous Windows ?",
    options: [
      "ping",
      "cmd",
      "ipconfig",
      "netstart"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "La commande 'ipconfig' affiche les informations de configuration réseau sous Windows, comme l’adresse IP et la passerelle."
  },
  {
    id: 34,
    category: "Réseaux",
    question: "À quoi sert le protocole HTTPS ?",
    options: [
      "Sécuriser les échanges HTTP avec chiffrement SSL/TLS",
      "Héberger les sites",
      "Remplacer le DNS",
      "Augmenter le débit"
    ],
    correctAnswer: 0,
    difficulty: "Avancé",
    explanation: "HTTPS (HTTP Secure) utilise SSL/TLS pour chiffrer les échanges HTTP, assurant la sécurité des données sur le web."
  },
  {
    id: 35,
    category: "Réseaux",
    question: "Qu’est-ce qu’un proxy ?",
    options: [
      "Un virus informatique",
      "Un serveur intermédiaire qui filtre ou anonymise la connexion",
      "Un câble de transmission",
      "Un type de logiciel bureautique"
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Un proxy agit comme un intermédiaire entre un client et un serveur, pouvant filtrer ou anonymiser les connexions."
  }
]

type QuizState = 'start' | 'playing' | 'finished'

export default function QuizSolo() {
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
              Retour à l'accueil
            </Button>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white mb-4">
                Test de Niveau - Réseaux
              </CardTitle>
              <CardDescription className="text-lg text-slate-300 max-w-2xl mx-auto">
                Mets tes skills en réseaux à l'épreuve avec ce quiz next-gen ! 
                35 questions pour tester tes connaissances en networking.
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
                  <p className="text-slate-300">35 questions</p>
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
                    Réseaux
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
                Voilà ton score et ton niveau en réseaux !
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
                  Retour à l'accueil
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