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
    category: "Programmation",
    question: "Comment faire clignoter une LED avec Arduino ?",
    options: [
      "Il suffit donc d'appliquer une tension de 12V (HIGH) sur le port 13 pour l'allumer, ou une tension de 0V (LOW) pour l'éteindre.",
      "Il suffit donc d'appliquer une tension de 5V (HIGH) sur le port 13 (l'anode de la LED) pour l'allumer, ou une tension de 0V (LOW) pour l'éteindre.",
      "Il suffit donc d'appliquer une tension de 5V (LOW) sur le port 13 (l'anode de la LED) pour l'allumer, ou une tension de 0V (HIGH) pour l'éteindre.",
      "Il suffit donc d'appliquer une tension de 2V (HIGH) sur le port 13 pour l'allumer, ou une tension de 0V (LOW) pour l'éteindre."
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Pour faire clignoter une LED avec Arduino, on utilise une tension de 5V (HIGH) sur le port 13 pour l'allumer et 0V (LOW) pour l'éteindre, généralement via la fonction digitalWrite()."
  },
  {
    id: 2,
    category: "Programmation",
    question: "Qu’est-ce qu’une “boucle” en programmation ?",
    options: [
      "Une instruction qui arrête l'exécution du programme.",
      "Une répétition d'action dans un programme.",
      "Une manière de déclarer une variable.",
      "Une fonction qui affiche du texte à l'écran."
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Une boucle permet de répéter un bloc de code plusieurs fois jusqu'à ce qu'une condition soit remplie, comme avec 'for' ou 'while'."
  },
  {
    id: 3,
    category: "Programmation",
    question: "Qu'est-ce qu'un langage de balisage côté serveur ?",
    options: [
      "HTML",
      "CSS",
      "PHP",
      "JavaScript"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "PHP est un langage de script côté serveur utilisé pour générer du contenu dynamique sur des sites web."
  },
  {
    id: 4,
    category: "Programmation",
    question: "Quel est le langage de programmation de base pour le développement Android?",
    options: [
      "Swift",
      "Python",
      "Java",
      "C#"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Java a longtemps été le langage principal pour le développement Android, bien que Kotlin soit désormais également populaire."
  },
  {
    id: 5,
    category: "Programmation",
    question: "Que signifie le terme “opensource” ?",
    options: [
      "Un logiciel propriétaire dont le code est secret.",
      "Fait référence à quelque chose que les gens peuvent modifier et partager parce que sa conception est accessible au public.",
      "Un type de licence logicielle payante.",
      "Un logiciel uniquement disponible sur des systèmes d'exploitation spécifiques."
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Un logiciel open source permet à quiconque d'accéder, de modifier et de partager son code source librement."
  },
  {
    id: 6,
    category: "Programmation",
    question: "Qu’est-ce que le cloud computing et comment cela se rapporte-t-il aux réseaux informatiques ?",
    options: [
      "Un nouveau type de matériel informatique.",
      "Un modèle technologique permettant l'accès à distance à des ressources informatiques partagées via Internet.",
      "Un protocole de sécurité pour les réseaux.",
      "Une méthode de compression de données."
    ],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Le cloud computing fournit des services comme le stockage ou la puissance de calcul via Internet, s'appuyant sur des réseaux informatiques."
  },
  {
    id: 7,
    category: "Programmation",
    question: "Qu’est-ce que le langage de programmation C++ ?",
    options: [
      "Un langage de balisage pour les pages web.",
      "Un langage de programmation compilé permettant la programmation sous de multiples paradigmes.",
      "Un langage de script côté client.",
      "Un langage de base de données."
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "C++ est un langage compilé polyvalent, utilisé pour la programmation système, les jeux et les applications performantes."
  },
  {
    id: 8,
    category: "Programmation",
    question: "Que signifie l’acronyme “HTML” ?",
    options: [
      "HyperText Modern Language",
      "High-level Text Machine Language",
      "HyperText Markup Language",
      "Hyperlink and Text Management Language"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "HTML (HyperText Markup Language) est utilisé pour structurer le contenu des pages web."
  },
  {
    id: 9,
    category: "Programmation",
    question: "Quel est le langage de programmation principalement utilisé pour le développement de sites web côté client ?",
    options: [
      "Python",
      "Ruby",
      "JavaScript",
      "C#"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "JavaScript permet d'ajouter de l'interactivité aux pages web côté client."
  },
  {
    id: 10,
    category: "Programmation",
    question: "Quel est le langage de programmation de base pour le développement iOS?",
    options: [
      "Java",
      "Kotlin",
      "Swift",
      "TypeScript"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Swift est le langage principal d'Apple pour le développement d'applications iOS et macOS."
  },
  {
    id: 11,
    category: "Programmation",
    question: "Quel est le framework de programmation de base pour le développement iOS et Android en simultané ?",
    options: [
      "Angular",
      "Vue.js",
      "React Native",
      "Flutter"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "React Native permet de développer des applications mobiles pour iOS et Android avec une seule base de code."
  },
  {
    id: 12,
    category: "Programmation",
    question: "Quel est le framework pour la base pour le développement d'application web ?",
    options: [
      "Django",
      "Ruby on Rails",
      "ReactJS",
      "Spring"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "ReactJS est une bibliothèque JavaScript populaire pour créer des interfaces utilisateur dynamiques pour le web."
  },
  {
    id: 13,
    category: "Programmation",
    question: "Quel est le langage pour rajouter du style dans une page web ?",
    options: [
      "HTML",
      "JavaScript",
      "CSS",
      "PHP"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "CSS (Cascading Style Sheets) est utilisé pour styliser les éléments HTML sur une page web."
  },
  {
    id: 14,
    category: "Programmation",
    question: "Que veut dire l'abréviation 'CSS' ?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Syntax",
      "Colorful Styling Standards"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "CSS signifie Cascading Style Sheets, utilisé pour la mise en forme des pages web."
  },
  {
    id: 15,
    category: "Programmation",
    question: "Comment s’appelle l’erreur dans un programme qui empêche son bon fonctionnement ?",
    options: [
      "Une fonctionnalité",
      "Un Bug",
      "Une alerte",
      "Une mise à jour"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Un bug est une erreur dans le code qui provoque un comportement inattendu ou incorrect."
  },
  {
    id: 16,
    category: "Programmation",
    question: "En C++ que permet la commande `digitalWrite()` ?",
    options: [
      "Permet de lire une valeur digitale sur une broche.",
      "Permet d'écrire une valeur digitale sur une broche.",
      "Permet de définir une broche comme entrée.",
      "Permet de créer un délai."
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "digitalWrite() définit l'état (HIGH ou LOW) d'une broche digitale sur Arduino."
  },
  {
    id: 17,
    category: "Programmation",
    question: "Que permet la balise `<a>` en HTML ?",
    options: [
      "Rajouter une image",
      "Rajouter un lien externe",
      "Rajouter un titre",
      "Rajouter une liste"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "La balise `<a>` crée un hyperlien vers une autre page ou ressource."
  },
  {
    id: 18,
    category: "Programmation",
    question: "Dans quel langage de programmation la syntaxe 'SELECT * FROM table_name' est-elle utilisée ?",
    options: [
      "Python",
      "Java",
      "SQL",
      "C++"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "SQL est utilisé pour interroger des bases de données relationnelles."
  },
  {
    id: 19,
    category: "Programmation",
    question: "Qu’est-ce qu’incrémenter ?",
    options: [
      "Le fait de soustraire 1 à une variable.",
      "Le fait de multiplier une variable par 2.",
      "Le fait d'ajouter +1 à une variable.",
      "Le fait de diviser une variable par 2."
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Incrémenter signifie augmenter la valeur d'une variable de 1, souvent avec ++."
  },
  {
    id: 20,
    category: "Programmation",
    question: "Quelle est le rôle d’une fonction dans un programme ?",
    options: [
      "De stocker des données temporaires.",
      "De déclarer des variables globales.",
      "Est une instruction qui peut être appelée par son nom à n'importe quel endroit et autant de fois que l'on veut.",
      "De gérer les erreurs du programme."
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Une fonction regroupe du code réutilisable qui peut être appelé à volonté."
  },
  {
    id: 21,
    category: "Programmation",
    question: "Qu’est-ce qu’un algorigramme ?",
    options: [
      "Un langage de programmation.",
      "La représentation visuelle d'un algorithme.",
      "Une base de données.",
      "Un type de réseau informatique."
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un algorigramme illustre graphiquement les étapes d'un algorithme."
  },
  {
    id: 22,
    category: "Programmation",
    question: "Que permet la balise `<p>` en HTML ?",
    options: [
      "Affiche un titre",
      "Affiche une image",
      "Affiche un paragraphe texte",
      "Affiche une liste"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "La balise `<p>` définit un paragraphe de texte en HTML."
  },
  {
    id: 23,
    category: "Programmation",
    question: "En C++ que permet la commande `printf` ?",
    options: [
      "Permet de lire une entrée utilisateur.",
      "Permet de calculer une somme.",
      "Permet d'afficher une valeur.",
      "Permet de créer un fichier."
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "printf() affiche du texte formaté dans la console."
  },
  {
    id: 24,
    category: "Programmation",
    question: "Qu'est-ce qu'un IDE ?",
    options: [
      "Un système d'exploitation.",
      "Un langage de programmation.",
      "Logiciel de développement intégré.",
      "Un type de base de données."
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Un IDE fournit des outils comme un éditeur de code, un débogueur et un compilateur."
  },
  {
    id: 25,
    category: "Programmation",
    question: "Quel type de variable permet de stocker des caractères alphanumériques ?",
    options: [
      "Integer",
      "Boolean",
      "Float",
      "String (ou CHAR)"
    ],
    correctAnswer: 3,
    difficulty: "Débutant",
    explanation: "String ou CHAR stocke des caractères comme du texte ou des symboles."
  },
  {
    id: 26,
    category: "Programmation",
    question: "Quel langage est principalement utilisé pour le développement d’applications Android ?",
    options: ["Swift", "JavaScript", "Java", "C#"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Java est historiquement le langage principal pour les applications Android, bien que Kotlin gagne en popularité."
  },
  {
    id: 27,
    category: "Programmation",
    question: "Que signifie “HTML” ?",
    options: [
      "Hyperlink and Text Markup Language",
      "HyperText Markup Language",
      "Hyper Transfer Machine Language",
      "High Text Markup Language"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "HTML (HyperText Markup Language) structure le contenu des pages web."
  },
  {
    id: 28,
    category: "Programmation",
    question: "Quel langage est utilisé pour styler les pages web ?",
    options: ["HTML", "Python", "CSS", "SQL"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "CSS applique des styles comme les couleurs et les mises en page aux pages web."
  },
  {
    id: 29,
    category: "Programmation",
    question: "Qu’est-ce qu’une “variable” en programmation ?",
    options: [
      "Une fonction",
      "Un type de boucle",
      "Un emplacement mémoire pour stocker une donnée",
      "Un langage"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Une variable est un espace mémoire nommé pour stocker des données."
  },
  {
    id: 30,
    category: "Programmation",
    question: "Que signifie “IDE” ?",
    options: [
      "Integrated Development Environment",
      "Internal Data Editor",
      "Internet Data Exchange",
      "Integrated Development Environment"
    ],
    correctAnswer: 0,
    difficulty: "Débutant",
    explanation: "IDE signifie Integrated Development Environment, un outil pour coder et déboguer."
  },
  {
    id: 31,
    category: "Programmation",
    question: "En programmation orientée objet, comment appelle-t-on une “classe” ?",
    options: [
      "Un type de variable",
      "Une fonction spéciale",
      "Un modèle pour créer des objets",
      "Un logiciel de programmation"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Une classe est un modèle définissant les propriétés et comportements des objets."
  },
  {
    id: 32,
    category: "Programmation",
    question: "Quelle est la syntaxe correcte pour un commentaire en Python ?",
    options: [
      "// Ceci est un commentaire",
      "# Ceci est un commentaire",
      "<!-- Ceci est un commentaire -->",
      "/* Ceci est un commentaire */"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "En Python, les commentaires commencent par #."
  },
  {
    id: 33,
    category: "Programmation",
    question: "Quel langage est souvent utilisé pour l’intelligence artificielle ?",
    options: ["JavaScript", "Ruby", "Python", "PHP"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Python est populaire en IA grâce à ses bibliothèques comme TensorFlow et PyTorch."
  },
  {
    id: 34,
    category: "Programmation",
    question: "Quel symbole est utilisé pour concaténer des chaînes en JavaScript ?",
    options: ["+", "&", "+", "."],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Le symbole + concatène des chaînes en JavaScript, comme 'Hello' + 'World'."
  },
  {
    id: 35,
    category: "Programmation",
    question: "Que fait une boucle “for” ?",
    options: [
      "Interrompt un programme",
      "Définit une fonction",
      "Répète un bloc d’instructions un certain nombre de fois",
      "Affiche un message"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Une boucle for répète du code un nombre défini de fois."
  },
  {
    id: 36,
    category: "Programmation",
    question: "Que signifie “API” en programmation ?",
    options: [
      "Application Programming Interface",
      "Automated Process Interface",
      "Advanced Programming Input",
      "Application Performance Indicator"
    ],
    correctAnswer: 0,
    difficulty: "Intermédiaire",
    explanation: "Une API permet à différentes applications de communiquer entre elles."
  },
  {
    id: 37,
    category: "Programmation",
    question: "Quel type de données est “booléen” ?",
    options: ["Texte", "Nombre entier", "Vrai ou faux", "Liste"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Un booléen représente une valeur logique : vrai (true) ou faux (false)."
  },
  {
    id: 38,
    category: "Programmation",
    question: "Quel langage est utilisé côté serveur pour le web ?",
    options: ["HTML", "CSS", "PHP", "JavaScript (frontend)"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "PHP est un langage côté serveur pour générer du contenu web dynamique."
  },
  {
    id: 39,
    category: "Programmation",
    question: "Quel mot-clé permet de définir une fonction en JavaScript ?",
    options: ["func", "define", "function", "method"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Le mot-clé function définit une fonction en JavaScript."
  },
  {
    id: 40,
    category: "Programmation",
    question: "Qu’est-ce qu’une “exception” en programmation ?",
    options: [
      "Un type de variable",
      "Une fonction spéciale",
      "Une erreur détectée pendant l’exécution",
      "Un commentaire"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Une exception est une erreur qui survient lors de l'exécution d'un programme."
  },
  {
    id: 41,
    category: "Programmation",
    question: "Quelle est la différence entre un “compilateur” et un “interpréteur” ?",
    options: [
      "Ils sont identiques",
      "L’un traduit en langage machine, l’autre ne traduit pas",
      "Le compilateur traduit tout le code avant l’exécution, l’interpréteur traduit ligne par ligne",
      "Le compilateur est plus lent"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Un compilateur traduit tout le code en une seule fois, un interpréteur ligne par ligne."
  },
  {
    id: 42,
    category: "Programmation",
    question: "Quel langage est utilisé pour les bases de données relationnelles ?",
    options: ["HTML", "SQL", "Python", "C++"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "SQL gère les bases de données relationnelles."
  },
  {
    id: 43,
    category: "Programmation",
    question: "Quel mot-clé est utilisé pour créer une boucle infinie en Python ?",
    options: ["while False:", "for i in range(0):", "while True:", "loop forever"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "while True: crée une boucle infinie en Python."
  },
  {
    id: 44,
    category: "Programmation",
    question: "Qu’est-ce qu’un “tableau” (array) ?",
    options: [
      "Une variable unique",
      "Un type de boucle",
      "Une structure de données qui stocke plusieurs éléments dans un ordre indexé",
      "Un logiciel"
    ],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Un tableau stocke plusieurs éléments accessibles par des indices."
  },
  {
    id: 45,
    category: "Programmation",
    question: "Que fait l’instruction “return” dans une fonction ?",
    options: [
      "Commence une fonction",
      "Renvoie une valeur et termine la fonction",
      "Déclare une variable",
      "Affiche un message"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "return renvoie une valeur et met fin à l'exécution de la fonction."
  },
  {
    id: 46,
    category: "Programmation",
    question: "Quel langage est le plus utilisé pour le développement web côté client ?",
    options: ["Python", "Java", "JavaScript", "C#"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "JavaScript est essentiel pour l'interactivité côté client sur le web."
  },
  {
    id: 47,
    category: "Programmation",
    question: "Que signifie “OOP” en programmation ?",
    options: [
      "Operation of Programming",
      "Object-Oriented Programming (programmation orientée objet)",
      "Open Office Protocol",
      "Online Object Process"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "OOP est un paradigme basé sur des objets et des classes."
  },
  {
    id: 48,
    category: "Programmation",
    question: "Qu’est-ce qu’une “fonction récursive” ?",
    options: [
      "Une fonction sans arguments",
      "Une fonction qui ne retourne rien",
      "Une fonction qui s’appelle elle-même",
      "Une fonction qui ne peut pas être appelée"
    ],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Une fonction récursive s'appelle elle-même pour résoudre un problème."
  },
  {
    id: 49,
    category: "Programmation",
    question: "Quel est le rôle d’un “débogueur” (debugger) ?",
    options: [
      "Compiler le code",
      "Trouver et corriger les erreurs dans un programme",
      "Optimiser le code",
      "Écrire du code automatiquement"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un débogueur aide à identifier et corriger les bugs dans le code."
  },
  {
    id: 50,
    category: "Programmation",
    question: "Quel langage a été développé par Guido van Rossum ?",
    options: ["Java", "Python", "Ruby", "PHP"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Guido van Rossum a créé Python, un langage simple et puissant."
  },
  {
    id: 51,
    category: "Programmation",
    question: "Quel symbole est utilisé pour les commentaires multi-lignes en JavaScript ?",
    options: ["//", "/* … */", "<!-- … -->", "# …"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "/* … */ est utilisé pour les commentaires multi-lignes en JavaScript."
  },
  {
    id: 52,
    category: "Programmation",
    question: "Quelle structure de données utilise une LIFO (Last In First Out) ?",
    options: ["File (Queue)", "Pile (Stack)", "Tableau (Array)", "Liste chaînée"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Une pile (stack) suit le principe LIFO, où le dernier élément ajouté est le premier retiré."
  },
  {
    id: 53,
    category: "Programmation",
    question: "Quel mot-clé est utilisé en Java pour hériter d’une classe ?",
    options: ["implements", "extends", "inherits", "super"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "extends permet à une classe Java d'hériter d'une autre classe."
  },
  {
    id: 54,
    category: "Programmation",
    question: "Quel est le rôle d’un “framework” ?",
    options: [
      "Compiler le code",
      "Gérer les bases de données",
      "Fournir une structure et des outils pour faciliter le développement",
      "Tester le code"
    ],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Un framework fournit des outils et une structure pour accélérer le développement."
  },
  {
    id: 55,
    category: "Programmation",
    question: "Quelle est la différence entre “==” et “===” en JavaScript ?",
    options: [
      "Ils sont identiques",
      "“==” compare les valeurs, “===” compare valeurs et types",
      "“==” compare types, “===” compare valeurs",
      "Aucun des deux n’est utilisé"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "=== vérifie à la fois la valeur et le type, contrairement à == qui ne vérifie que la valeur."
  }
]

type QuizState = 'start' | 'playing' | 'finished'

export default function QuizProgrammation() {
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
    setShuffledQuestions(shuffled.slice(0, 25)) // Prendre 25 questions aléatoires
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
    setShuffledQuestions(shuffled.slice(0, 25))
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
                Test de Niveau - Programmation
              </CardTitle>
              <CardDescription className="text-lg text-slate-300 max-w-2xl mx-auto">
                Mets tes skills en prog au défi ! 25 questions random pour tester ton niveau, du noob au pro. Prêt à coder dans ta tête ? 🚀
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
                  <p className="text-slate-300">25 questions</p>
                </div>
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Award className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Évaluation</h3>
                  <p className="text-slate-300">Niveau personnalisé</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Domaines couverts
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Web', 'Mobile', 'IA', 'Systèmes', 'Algo'].map((category) => (
                    <Badge key={category} variant="outline" className="border-purple-500/30 text-purple-300">
                      {category}
                    </Badge>
                  ))}
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
  if (quizState === 'playing' && shuffledQuestions.length > 0) {
    const question = shuffledQuestions[currentQuestion]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
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
                  <Clock className="h-5 w-5 mr-2 text-purple-400" />
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
                <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                  <Brain className="h-4 w-4 mr-1" />
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
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className={`h-20 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6`}>
                {scoreLevel.icon}
              </div>
              <CardTitle className="text-4xl text-white mb-4">
                Quiz Terminé ! 🎮
              </CardTitle>
              <CardDescription className="text-xl text-slate-300">
                Check ton niveau de codeur 🔥
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

              <div className="text-center bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {percentage >= 80 ? "🏆 Master du code !" : 
                   percentage >= 60 ? "👍 Solide, t’assures !" : 
                   percentage >= 40 ? "🔥 Pas mal, keep going !" : "💪 T’es sur la bonne voie !"}
                </h3>
                <p className="text-slate-300">
                  {percentage >= 80 ? "T’es un crack, le monde du dev t’attend !" : 
                   percentage >= 60 ? "T’as de bonnes bases, continue à grinder !" : 
                   percentage >= 40 ? "T’es dans le game, encore un peu de pratique et t’y es !" : "Chaque ligne de code te rapproche du level up !"}
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
                              <span className="text-slate-400">Ta réponse : </span>
                              <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                                {question.options[userAnswer]}
                              </span>
                            </>
                          )}
                          {!isCorrect && (
                            <>
                              <br />
                              <span className="text-slate-400">Bonne réponse : </span>
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
                  Rejouer
                </Button>
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => router.push('/')}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Retour home
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