'use client'
import React from 'react';
import { Brain, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from './navbar';
import Footer from './Footer';

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
            <Navbar/>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl text-white mb-4">
              Notre Équipe
            </CardTitle>
            <CardDescription className="text-lg text-slate-300 max-w-2xl mx-auto">
              Découvrez les membres de notre équipe
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                <User className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Erwan Sagnardon</h3>
                <p className="text-slate-300">CEO (Chef de projet) et Développeur Web</p>
              </div>
              <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                <User className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Mathéo Fontaine</h3>
                <p className="text-slate-300">CTO (Directeur Technique) et Designer</p>
              </div>
              <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                <User className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Gabriel CHARPENTIER</h3>
                <p className="text-slate-300">Développeur Web</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

        <Footer/>

    </div>
  )
}

export default TeamPage;

