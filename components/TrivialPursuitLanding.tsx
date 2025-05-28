'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Users, 
  Trophy, 
  Code, 
  Cpu, 
  Database, 
  Shield, 
  Globe, 
  Star,
  Play,
  UserPlus,
  ArrowRight,
  Zap,
  Target,
  Award
} from 'lucide-react'
import Navbar from './navbar'
import Footer from './Footer'

export default function TrivialPursuitLanding() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Quiz Interactifs",
      description: "Des questions captivantes sur tous les domaines de l'informatique"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multijoueur",
      description: "Créez ou rejoignez des parties avec vos amis et collègues"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Classements",
      description: "Suivez votre progression et défiez les meilleurs joueurs"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Temps Réel",
      description: "Parties en direct avec système de points instantané"
    }
  ]

  const categories = [
    { icon: <Code className="h-5 w-5" />, name: "Programmation", color: "bg-blue-500", onClick: () => window.location.href = '/quiz-programmation' },
    { icon: <Database className="h-5 w-5" />, name: "Culture Geek", color: "bg-green-500", onClick: () => window.location.href = '/culturegeek' },
    { icon: <Shield className="h-5 w-5" />, name: "Cybersécurité", color: "bg-red-500", onClick: () => window.location.href = '/quiz-cybersecurite' },
    { icon: <Cpu className="h-5 w-5" />, name: "Hardware", color: "bg-purple-500", onClick: () => window.location.href = '/hardware' },
    { icon: <Globe className="h-5 w-5" />, name: "Réseaux", color: "bg-orange-500", onClick: () => window.location.href = '/reseau' },
    { icon: <Brain className="h-5 w-5" />, name: "IA & Robotique (NOUVEAU !)", color: "bg-pink-500", onClick: () => window.location.href = '/ia' }
  ]

  const stats = [
    { number: "500+", label: "Questions" },
    { number: "1000+", label: "Joueurs" },
    { number: "50+", label: "Parties/jour" },
    { number: "6", label: "Catégories" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
     <Navbar/>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30">
            <Star className="h-3 w-3 mr-1" />
            Nouveau : Mode Multijoueur disponible !
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Le Trivial Pursuit de
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}l'Informatique
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Testez vos connaissances tech, défiez vos amis et grimpez dans les classements. 
            De la programmation à l'IA, explorez tous les univers de l'informatique !
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => window.location.href = '/quiz-solo'}
            >
              <Play className={`h-5 w-5 mr-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              Commencer à jouer
            </Button>
            <a 
              href="http://192.168.1.147:5000" 
              className="inline-flex items-center px-8 py-4 border-2 border-purple-400 text-purple-300 hover:bg-purple-600/20 text-lg"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Rejoindre le nouveau mode multijoueur
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pourquoi choisir Trivial Pursuit SN ?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Une expérience de quiz unique, conçue pour les passionnés de technologie
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Explorez nos catégories
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            6 domaines techniques pour tester toutes vos compétences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer group" onClick={category.onClick}>
              <CardContent className="p-6 flex items-center space-x-4">
                <div className={`h-12 w-12 ${category.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                  <p className="text-slate-400">25+ questions</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400 ml-auto group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Comment ça marche ?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Connectez-vous</h3>
            <p className="text-slate-300">Créez votre compte et personnalisez votre profil de joueur</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Rejoignez une partie</h3>
            <p className="text-slate-300">Créez votre propre quiz ou rejoignez une partie existante</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Gagnez des points</h3>
            <p className="text-slate-300">1 point par bonne réponse, montez dans le classement !</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <Target className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à tester vos connaissances ?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de développeurs, étudiants et professionnels IT qui s'amusent tout en apprenant
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-12 py-4 text-lg"
              onClick={() => window.location.href = '/quiz-solo'}
            >
              <Award className="h-5 w-5 mr-2" />
              Commencer maintenant
            </Button>
          </CardContent>
        </Card>
      </section>
     
     <Footer/>

    </div>
  )
}