import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FileText, Shield, Award, Globe, CheckCircle, Users, Clock, Download, ArrowRight, Bot, User, Send, MessageSquare, X, ChevronDown, ChevronUp, Zap, RefreshCw, CreditCard } from 'lucide-react';
import { UserProvider } from './contexts/UserContext';
import SignupModal from './components/SignupModal';
import Dashboard from './components/Dashboard';
import DashboardPage from './pages/DashboardPage';
import SignupPage from './pages/signup';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/LoginPage';
import QuestionnairePage from './pages/QuestionnairePage';
import DocumentTypePage from './pages/DocumentTypePage';
import ContactPage from './pages/ContactPage';
import DocumentEditPage from './pages/DocumentEditPage';
import SettingsPage from './pages/SettingsPage';
import FAQPage from './pages/FAQPage';
import EarlyAccessPage from './pages/EarlyAccessPage';
import SuccessPage from './pages/SuccessPage';

// Landing Page Component
function LandingPage() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [openFaqItems, setOpenFaqItems] = useState<number[]>([]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    // Navigate to dashboard after successful signup
    window.location.href = '/dashboard';
  };

  const toggleFaqItem = (index: number) => {
    setOpenFaqItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {showSignupModal && (
        <SignupModal 
          onClose={() => setShowSignupModal(false)} 
          onSuccess={handleSignupSuccess}
        />
      )}

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-4 w-full">
        <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ISO Generator</h1>
              <p className="text-sm text-white/80">Nederlandse ISO Documenten</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="inline-block bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-center"
            >
              Log In
            </Link>
            <Link
              to="/early-access"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden min-h-screen relative">
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-32 left-1/3 w-16 h-16 bg-white/10 transform rotate-45 blur-sm"></div>
        <div className="absolute bottom-32 right-1/4 w-20 h-20 bg-white/15 transform rotate-12 blur-sm"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-white/20 transform rotate-45"></div>
        
        {/* Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-white/10"></div>
        
        <div className="max-w-[1400px] mx-auto px-8">
          <section className="relative pt-40 pb-72 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>
                        Start je ISO-reis vandaag
                      </span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-semibold text-white leading-tight">
                      Genereer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">ISO Documenten</span> in Minuten
                    </h1>
                    <p className="text-xl text-white/90 leading-relaxed">
                      Maak professionele ISO 9001, 27001 en 14001 documenten met AI. 
                      Volledig in het Nederlands, audit-klaar en direct implementeerbaar.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/early-access"
                      className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group hover:scale-105"
                    >
                      Sign Up Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="flex items-center space-x-8 text-sm text-white/80">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-white mr-2" />
                      Vertrouwd door professionals
                    </div>
                  </div>
                </div>

                {/* Document Previews */}
                <div className="relative h-[450px] lg:h-[600px] mt-8 lg:mt-0">
                  {/* Floating blur elements */}
                  <div className="absolute top-10 left-5 w-24 h-24 lg:top-20 lg:left-10 lg:w-32 lg:h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-5 w-32 h-32 lg:bottom-20 lg:right-10 lg:w-40 lg:h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
                  
                  {/* Document 1 - ISO 27001 (Background) */}
                  <div className="relative">
                    <div className="absolute top-8 left-8 w-[420px] h-[580px] bg-white rounded-2xl shadow-xl transform rotate-6 hover:rotate-3 transition-all duration-500 z-10">
                      <div className="p-6 h-full overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                              <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ISO 27001</h3>
                            </div>
                          </div>
                          <div className="text-right text-xs text-gray-500">
                            <p>TechCorp B.V.</p>
                            <p>Versie 2.1</p>
                            <p>15 jan 2025</p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4 text-sm text-gray-700">
                          <div>
                            <h4 className="font-semibold text-blue-600 mb-2">1. Introductie</h4>
                            <p className="leading-relaxed">
                              Dit informatiebeveiligingsbeleid beschrijft hoe TechCorp B.V. omgaat met de vertrouwelijkheid, 
                              integriteit en beschikbaarheid van haar informatie-assets. Het beleid is bedoeld voor alle 
                              medewerkers, externe contractanten en derde partijen die met gevoelige informatie werken.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-blue-600 mb-2">2. Risicobeoordelingscriteria</h4>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                              <ul className="space-y-1 text-xs">
                                <li>• <strong>Hoog risico:</strong> Potentiële impact op bedrijfscontinuïteit</li>
                                <li>• <strong>Gemiddeld risico:</strong> Beperkte operationele impact</li>
                                <li>• <strong>Laag risico:</strong> Minimale gevolgen voor organisatie</li>
                                <li>• <strong>Acceptabel risico:</strong> Binnen gestelde tolerantiegrenzen</li>
                                <li>• <strong>Onaanvaardbaar:</strong> Onmiddellijke actie vereist</li>
                              </ul>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-blue-600 mb-2">3. Geïdentificeerde Risico's</h4>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span>Ongeautoriseerde toegang tot systemen</span>
                                <span className="text-red-600 font-medium">HOOG</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Malware en ransomware aanvallen</span>
                                <span className="text-red-600 font-medium">HOOG</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Datalekken door menselijke fouten</span>
                                <span className="text-orange-600 font-medium">GEMIDDELD</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Fysieke beveiliging kantoorpanden</span>
                                <span className="text-orange-600 font-medium">GEMIDDELD</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-xs text-gray-400 border-t pt-3">
                          <span>TechCorp B.V. - Classificatie: Intern gebruik</span>
                          <span>Pagina 1 van 24</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document 2 - ISO 9001 (Foreground) */}
                  <div className="absolute top-16 right-0 w-[420px] h-[580px] bg-white rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-all duration-500 z-20">
                    <div className="p-6 h-full overflow-hidden">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ISO 9001</h3>
                            <p className="text-sm text-gray-600">Kwaliteitsmanagement</p>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          <p>InnovatieHub B.V.</p>
                          <p>Versie 3.0</p>
                          <p>12 jan 2025</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4 text-sm text-gray-700">
                        <div>
                          <h4 className="font-semibold text-blue-600 mb-2">1. Kwaliteitsbeleid</h4>
                          <p className="leading-relaxed">
                            InnovatieHub B.V. streeft naar continue verbetering van onze producten en diensten door 
                            middel van een effectief kwaliteitsmanagementsysteem. Wij zijn toegewijd aan het overtreffen 
                            van klantverwachtingen en het naleven van alle toepasselijke wet- en regelgeving.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-blue-600 mb-2">2. Kernprocessen</h4>
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                            <ul className="space-y-1 text-xs">
                              <li>• <strong>Productontwerp:</strong> Innovatieve oplossingen ontwikkelen</li>
                              <li>• <strong>Inkoop:</strong> Kwaliteitsgerichte leveranciersselectie</li>
                              <li>• <strong>Productie:</strong> Gecontroleerde vervaardigingsprocessen</li>
                              <li>• <strong>Kwaliteitscontrole:</strong> Systematische product inspectie</li>
                              <li>• <strong>Klantenservice:</strong> Proactieve klantondersteuning</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-blue-600 mb-2">3. Organisatiestructuur</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span>Kwaliteitsmanager</span>
                                <span className="text-blue-600 font-medium">J. van der Berg</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Procesverantwoordelijke</span>
                                <span className="text-blue-600 font-medium">M. Janssen</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Auditcoördinator</span>
                                <span className="text-blue-600 font-medium">S. de Vries</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Documentbeheerder</span>
                                <span className="text-blue-600 font-medium">R. Bakker</span>
                              </div>
                          </div>
                        </div>

                      </div>

                      {/* Footer */}
                      <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-xs text-gray-400 border-t pt-3">
                        <span>InnovatieHub B.V. - ISO 9001:2015</span>
                        <span>Pagina 1 van 18</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-0 -mt-24 relative z-10">
        <section className="pt-16 pb-32">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="mb-16">
                <div className="mb-16">
                  <div className="inline-flex items-center text-sm font-medium mb-6 -ml-2 pl-0 pr-2">
                    <Award className="w-4 h-4 mr-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" style={{ fontSize: '12px', fontWeight: '500' }}>
                      ONZE OPLOSSINGEN
                    </span>
                  </div>
                  <h2 className="text-4xl font-medium text-[#454545] mb-4 px-2">
                    Versnel uw ISO-certificering.
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Automated workflows */}
                <div className="flex flex-col items-start p-4 rounded-xl">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-start justify-start flex-shrink-0 mb-4 pl-0 pt-2">
                    <CreditCard className="w-10 h-10 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#454545] mb-2">90% Minder Kosten</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Bespaar aanzienlijk op consultancykosten en tijd met onze geautomatiseerde documentgeneratie.
                    </p>
                  </div>
                </div>

                {/* Easy document management */}
                <div className="flex flex-col items-start p-4 rounded-xl">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-start justify-start flex-shrink-0 mb-4 pl-0 pt-2">
                    <Clock className="w-10 h-10 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#454545] mb-2">Document in 30 Minuten</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Genereer audit-klare ISO documenten in recordtijd, van start tot finish.
                    </p>
                  </div>
                </div>

                {/* Unmatched security */}
                <div className="flex flex-col items-start p-4 rounded-xl">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-start justify-start flex-shrink-0 mb-4 pl-0 pt-2">
                    <CheckCircle className="w-10 h-10 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#454545] mb-2">100% ISO Compliant</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Onze AI zorgt ervoor dat elk gegenereerd document volledig voldoet aan de nieuwste ISO standaarden.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* AI Assistant Header Section */}
      <div className="max-w-[1200px] mx-auto bg-white px-4 sm:px-0">
        <section className="py-16 text-center">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium mb-3">
              <Bot className="w-4 h-4 mr-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" style={{ fontSize: '12px', fontWeight: '500' }}>
                AI ASSISTENT
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#454545] mb-2 leading-tight">
              Van Vraag tot <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Audit-Klaar Document</span>
            </h2>
            <p className="text-base lg:text-lg text-[#6B7280] max-w-3xl mx-auto leading-relaxed mb-4">
              Beantwoord enkele gerichte vragen en ontvang binnen minuten een volledig audit-klaar ISO document, specifiek voor jouw organisatie.
            </p>
          </div>
        </section>
      </div>

      {/* Step 1 Section */}
      <div className="max-w-[1200px] mx-auto bg-white px-4 sm:px-0">
        <section className="py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Chat Interface Mockup */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
                
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">ISO 9001 Generator</h3>
                        <p className="text-blue-100 text-sm">Kwaliteitsmanagement</p>
                      </div>
                    </div>
                    <div className="text-white text-sm">Vraag 3 van 21</div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-6 space-y-4 h-80 overflow-y-auto bg-gray-50">
                    {/* Bot Message */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-3 max-w-xs shadow-sm">
                        <p className="text-[#454545] text-sm">
                          Wat zijn de belangrijkste producten of diensten die je levert aan klanten?
                        </p>
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-4 py-3 max-w-xs">
                        <p className="text-white text-sm">
                          Wij leveren software ontwikkeling en IT consultancy diensten aan MKB bedrijven. Onze focus ligt op webapplicaties en digitale transformatie projecten.
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Bot Follow-up */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-3 max-w-xs shadow-sm">
                        <p className="text-[#454545] text-sm">
                          Perfect! Wie zijn je belangrijkste klanten of doelgroepen en wat verwachten zij van je organisatie?
                        </p>
                      </div>
                    </div>

                    {/* Typing Indicator */}
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span>AI is aan het typen...</span>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2">
                        <p className="text-gray-500 text-sm">Type je antwoord hier...</p>
                      </div>
                      <button className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200 hidden md:block">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm font-semibold text-[#454545]">86% Voltooid</p>
                      <p className="text-xs text-gray-600">18 van 21 vragen</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200 hidden md:block">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-semibold text-[#454545]">~5 min</p>
                      <p className="text-xs text-gray-600">Resterende tijd</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 1 Content */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#454545] mb-4">Beantwoord Slimme Vragen</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">Onze AI stelt gerichte vragen over je organisatie, processen en doelstellingen. Geen complexe formulieren - gewoon een natuurlijk gesprek dat je document vormgeeft.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Step 2 Section */}
      <div className="max-w-[1200px] mx-auto bg-white px-4 sm:px-0">
        <section className="py-32">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Step 2 Content */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#454545] mb-4">Real-time Document Aanpassing</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">Selecteer tekst in het document en laat AI het automatisch verbeteren. Van simpele zinnen naar professionele ISO-conforme content met één klik.</p>
                  </div>
                </div>
              </div>

              {/* Document Preview */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
                
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  {/* Document Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">ISO 9001 Document</h3>
                        <p className="text-blue-100 text-sm">Kwaliteitsbeleid</p>
                      </div>
                    </div>
                    <div className="text-white text-sm">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Live Edit</span>
                    </div>
                  </div>

                  {/* Document Content */}
                  <div className="px-6 py-6">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 min-h-[300px]">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Kwaliteitsbeleid</h4>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            {/* Original Text */}
                            <p className="text-gray-700 leading-relaxed mb-3">
                              <span className="line-through text-gray-400">
                                Ons bedrijf wil goede kwaliteit leveren. We proberen altijd het beste te doen voor onze klanten. 
                                We luisteren naar feedback en verbeteren ons werk steeds.
                              </span>
                            </p>
                            
                            {/* New Text with Animation */}
                            <p className="text-gray-800 leading-relaxed">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded animate-pulse">
                                InnovatieHub B.V. streeft naar excellente kwaliteitsstandaarden in alle aspecten van onze bedrijfsvoering. 
                                Wij zijn toegewijd aan het leveren van hoogwaardige producten en diensten die voldoen aan en overtreffen 
                                de verwachtingen van onze klanten. Door continue verbetering van onze processen en systemen, 
                                waarborgen wij consistente kwaliteit en klanttevredenheid.
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Tekst succesvol verbeterd</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Status */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200 hidden md:block">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-sm font-semibold text-[#454545]">AI Rewriting</p>
                      <p className="text-xs text-gray-600">Voltooid</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Step 3 Section */}
      <div className="max-w-[1200px] mx-auto bg-white px-4 sm:px-0">
        <section className="py-32">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Document Preview with Download Options */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
                
                <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-500">ISO 9001 Document</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Kwaliteitsbeleid</h3>
                    <p className="text-gray-600 text-sm mb-4">InnovatieHub B.V. streeft naar excellente kwaliteitsstandaarden...</p>
                    <div className="flex space-x-2">
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        📄 PDF
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        📝 Word
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Document Klaar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Step 3 Text */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#454545] mb-4">Download je Document</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">Download je volledig gepersonaliseerde ISO document in het formaat dat jij nodig hebt. Kies uit PDF voor presentaties of Word voor verdere bewerking.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Documents Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden" style={{marginTop: '120px', marginBottom: '120px'}}>
        <section className="py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Alle <span className="text-white">ISO 9001 Documenten</span>
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Genereer alle benodigde documenten voor een complete ISO 9001 certificering
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Document 1 - Kwaliteitshandboek */}
              <div className="bg-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Kwaliteitshandboek</h3>
                    <p className="text-white/80 text-sm">Complete ISO 9001 basis</p>
                  </div>
                </div>
                <p className="text-white/90 mb-6 leading-relaxed flex-grow">
                  Het fundament van je kwaliteitssysteem. Bevat alle beleidslijnen, processen en verantwoordelijkheden.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Kwaliteitsbeleid & doelstellingen</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Organisatiestructuur & rollen</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Procesbeschrijvingen</span>
                  </li>
                </ul>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-white/60 text-sm">~25 pagina's</span>
                  <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Basis document
                  </div>
                </div>
              </div>

              {/* Document 2 - Procedures Document */}
              <div className="bg-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Procedures Document</h3>
                    <p className="text-white/80 text-sm">Gedetailleerde werkwijzen</p>
                  </div>
                </div>
                <p className="text-white/90 mb-6 leading-relaxed flex-grow">
                  Stap-voor-stap instructies voor alle belangrijke processen in je organisatie.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Inkoop & leveranciersbeheer</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Klachtenafhandeling</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Correctieve maatregelen</span>
                  </li>
                </ul>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-white/60 text-sm">~18 pagina's</span>
                  <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Proces document
                  </div>
                </div>
              </div>

              {/* Document 3 - Interne Audit Planning & Checklist */}
              <div className="bg-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Interne Audit Planning</h3>
                    <p className="text-white/80 text-sm">& Checklist</p>
                  </div>
                </div>
                <p className="text-white/90 mb-6 leading-relaxed flex-grow">
                  Complete planning en checklist voor het uitvoeren van interne audits volgens ISO 9001.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Audit planning & planning</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Volledige audit checklist</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Rapportage templates</span>
                  </li>
                </ul>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-white/60 text-sm">~12 pagina's</span>
                  <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Audit document
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Comparison Section */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50" style={{marginTop: '-120px', marginBottom: '120px'}}>
        <section className="py-24" style={{paddingTop: '168px'}}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#454545] mb-4">
                Kies voor <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Automatisatie</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stop met handmatig documenten maken. Laat AI het werk voor je doen.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Traditional Method */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">Traditionele Methode</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-600">
                      <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                      <span>40+ uur handmatig werk</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                      <span>€2000+ consultancy kosten</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                      <span>Complexe Word templates</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                      <span>Risico op compliance fouten</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                      <span>Weken/maanden wachttijd</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                      <span>Handmatige updates nodig</span>
                    </li>
                  </ul>
                </div>

                {/* ISO Generator */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 border-2 border-white/30 relative transform scale-105 flex flex-col h-full shadow-2xl transition-all duration-300 hover:scale-110">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Aanbevolen
                    </span>
                  </div>
                  
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">ISO Generator</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    <li className="flex items-center text-white/90">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>30 minuten totale tijd</span>
                    </li>
                    <li className="flex items-center text-white/90">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>€99 per maand</span>
                    </li>
                    <li className="flex items-center text-white/90">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>AI-begeleide vragenflow</span>
                    </li>
                    <li className="flex items-center text-white/90">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>100% ISO compliant</span>
                    </li>
                    <li className="flex items-center text-white/90">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Direct beschikbaar</span>
                    </li>
                    <li className="flex items-center text-white/90">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Automatische updates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Try Now Section */}
      <div className="max-w-[1200px] mx-auto bg-white px-4 sm:px-0" style={{marginTop: '80px', marginBottom: '80px'}}>
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-12 text-center">
              <h2 className="text-3xl font-bold text-[#454545] mb-4">
                Ontvang direct je <span className="underline decoration-pink-300 decoration-2">ISO document</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Beantwoord enkele gerichte vragen over je organisatie en ontvang binnen minuten een volledig audit-klaar ISO document, specifiek voor jouw bedrijf.
              </p>
              <button 
                onClick={() => window.location.href = '/early-access'}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ISO Document Genereren
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
        <footer className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">ISO Generator</h3>
                  <p className="text-blue-100 text-sm">Kwaliteitsmanagement</p>
                </div>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed max-w-md">
                Maak binnen minuten een volledig audit-klaar ISO document, specifiek voor jouw organisatie. 
                Geen complexe formulieren - gewoon slimme vragen en AI-powered documentatie.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-blue-100 hover:text-white transition-colors text-sm">Contact</Link></li>
                <li><a href="mailto:support@isogenerator.nl" className="text-blue-100 hover:text-white transition-colors text-sm">Email Support</a></li>
                <li><a href="tel:+31612345678" className="text-blue-100 hover:text-white transition-colors text-sm">Telefoon</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-100 text-sm">
                © 2024 ISO Generator. Alle rechten voorbehouden.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Main App Component with Routes
function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard onBackToLanding={() => window.location.href = '/'} />} />
        <Route path="/dashboard-overview" element={<DashboardPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/questionnaire/:isoType/:documentType" element={<QuestionnairePage />} />
        <Route path="/questionnaire/:isoType/:documentType/:documentId" element={<QuestionnairePage />} />
        <Route path="/document-type/:isoType" element={<DocumentTypePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/document/:id" element={<DocumentEditPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/early-access" element={<EarlyAccessPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;