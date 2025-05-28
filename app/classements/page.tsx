import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';

const Classement = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar />
            <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm mx-auto mt-10">
                <CardHeader className="text-center">
                    <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                        <Trophy className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-white">Classement par Tests Réussis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-white">
                        <h3 className="text-xl font-semibold mb-4">Classement actuel</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">1. Erwan - 100 tests réussis</span>
                                <span className="text-lg font-semibold">Temps : 10:45</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">2. Léa - 90 tests réussis</span>
                                <span className="text-lg font-semibold">Temps : 11:10</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">3. Théo - 85 tests réussis</span>
                                <span className="text-lg font-semibold">Temps : 11:30</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">4. Emma - 80 tests réussis</span>
                                <span className="text-lg font-semibold">Temps : 11:45</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">5. Maxime - 75 tests réussis</span>
                                <span className="text-lg font-semibold">Temps : 12:00</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Footer />
        </div>
    );
};

export default Classement;
