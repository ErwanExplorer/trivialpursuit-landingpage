"use client"
import React from 'react';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    return (
        <>
    {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white"  onClick={() => router.push('/')}
          >TechTrivia</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-purple-300">
              À propos
            </Button>
            <Button variant="ghost" className="text-white hover:text-purple-300" onClick={() => window.location.href = '/classements'}>
              Classements
            </Button>
            <Button variant="ghost" className="text-white hover:text-purple-300" onClick={() => window.location.href = '/teams'}>
              Notre Équipe
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => window.location.href = 'http://192.168.1.147:5000'}>
              Rejoindre le nouveau mode multijoueur
            </Button>
          </div>
        </div>
      </nav>
        </>
    );
};

export default Navbar;