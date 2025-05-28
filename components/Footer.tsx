import React from 'react';
import { Brain } from 'lucide-react';

const Footer = () => {
    return (
        <>
                  {/* Footer */}
      <footer className="border-t border-slate-800 mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Trivial Pursuit SN</span>
              </div>
              <p className="text-slate-400">
                Le quiz informatique qui défie vos connaissances techniques
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Jeu</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Créer une partie</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rejoindre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Classements</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Catégories</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Programmation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cybersécurité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Intelligence Artificielle</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Règles du jeu</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Trivial Pursuit SN. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
        </>
    );
};

export default Footer;