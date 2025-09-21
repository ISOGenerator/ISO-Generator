import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, Mail, Lock, Star, ArrowRight, User, Building, Play, ArrowLeft } from 'lucide-react';

export default function EarlyAccessPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleJoinWaitingList = async () => {
    if (!email || !firstName || !lastName) {
      alert('Vul alle verplichte velden in');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Hier zou je de gegevens naar je database/email service sturen
      console.log('Wachtlijst registratie:', { email, firstName, lastName, company });
      
      // Simuleer API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Er is een fout opgetreden bij het registreren');
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/20 rounded-2xl p-8 border border-white/20 shadow-lg">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Je staat op de wachtlijst!</h2>
            <p className="text-white/80 mb-6">
              Bedankt voor je interesse! We sturen je een email zodra de Professional Plan beschikbaar is.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
                setFirstName('');
                setLastName('');
                setCompany('');
              }}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Nog iemand toevoegen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600">
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
        </div>
        {/* Header bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30"></div>
      </header>

      {/* 50/50 Split Layout - No gap */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-blue-600 to-indigo-600 relative">
        {/* Left Side - Wachtlijst Registratie (50%) - Desktop only */}
        <div className="hidden lg:flex w-1/2 items-center justify-center pt-20 pb-6 px-6">
          <div className="max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-white/20 text-white rounded-full text-xs font-semibold mb-3">
                <Star className="w-3 h-3 mr-1.5 text-yellow-300" />
                <span>WACHTLIJST</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Professional
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                  Plan
                </span>
              </h1>
              <p className="text-sm text-white/80">Word een van de eerste gebruikers</p>
            </div>

            <div className="bg-white/20 rounded-2xl p-6 mb-4 border border-white/20 shadow-lg">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <span className="text-lg text-white/60 line-through">€99</span>
                  <span className="text-2xl font-bold text-white">€49</span>
                </div>
                <p className="text-xs text-white/70">50% korting - Early Access</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 mb-6">
                <div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Voornaam *"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Achternaam *"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email adres *"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Bedrijf (optioneel)"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleJoinWaitingList}
                  disabled={isProcessing}
                  className="w-full bg-white text-blue-600 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail className="w-5 h-5" />
                  <span>{isProcessing ? 'Registreren...' : 'Meld je aan voor wachtlijst'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center space-x-2 text-xs text-white/70">
                  <Lock className="w-3 h-3" />
                  <span>Je gegevens zijn veilig</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-white/70 flex items-center justify-center space-x-1">
                <span className="text-yellow-300">🚀</span>
                <span><span className="font-semibold text-white">50+ professionals</span> gingen je al voor!</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Video Tutorial (50%) - Desktop only */}
        <div className="hidden lg:flex w-1/2 items-start justify-center pt-48 pb-6 px-6 relative">
          {/* Back to Dashboard Button */}
          <button 
            onClick={() => {
              console.log('Navigating to landing page...');
              navigate('/');
            }}
            className="absolute top-8 right-8 z-50 flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white hover:bg-white/30 transition-colors text-sm font-medium border border-white/30"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Terug naar Home</span>
          </button>

          <div className="w-full max-w-xl">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Van Vraag tot Audit-Klaar Document
            </h2>
            <p className="text-white/80 text-center mb-6 text-sm leading-relaxed">
              Zie hoe onze AI in slechts 3 stappen uw complete ISO 9001 document genereert. 
              Geen complexe formulieren, geen uren werk - gewoon slimme vragen en direct resultaat.
            </p>
            <video
              className="w-full rounded-lg shadow-lg mb-6"
              controls
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              Je browser ondersteunt geen video element.
            </video>
            
            {/* Steps - Horizontal */}
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <div className="w-6 h-6 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
                  1
                </div>
                <p className="text-xs text-white/80 font-medium">Beantwoord vragen</p>
              </div>
              
              <div className="w-8 h-px bg-white/40 mx-2"></div>
              
              <div className="text-center flex-1">
                <div className="w-6 h-6 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
                  2
                </div>
                <p className="text-xs text-white/80 font-medium">Pas document aan</p>
              </div>
              
              <div className="w-8 h-px bg-white/40 mx-2"></div>
              
              <div className="text-center flex-1">
                <div className="w-6 h-6 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
                  3
                </div>
                <p className="text-xs text-white/80 font-medium">Download</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden w-full">
          {/* Mobile Video Section */}
          <div className="pt-32 pb-8 px-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Van Vraag tot Audit-Klaar Document
            </h2>
            <video
              className="w-full rounded-lg shadow-lg"
              controls
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              Je browser ondersteunt geen video element.
            </video>
          </div>

          {/* Mobile Wachtlijst Section */}
          <div className="py-8 px-6">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-4">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/20 text-white rounded-full text-xs font-semibold mb-3">
                  <Star className="w-3 h-3 mr-1.5 text-yellow-300" />
                  <span>WACHTLIJST</span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Professional
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                    Plan
                  </span>
                </h1>
                <p className="text-sm text-white/80">Word een van de eerste gebruikers</p>
              </div>

              <div className="bg-white/20 rounded-2xl p-6 mb-4 border border-white/20 shadow-lg">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <span className="text-lg text-white/60 line-through">€99</span>
                    <span className="text-2xl font-bold text-white">€49</span>
                  </div>
                  <p className="text-xs text-white/70">50% korting - Early Access</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-3 mb-6">
                  <div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Voornaam *"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Achternaam *"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email adres *"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Bedrijf (optioneel)"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleJoinWaitingList}
                    disabled={isProcessing}
                    className="w-full bg-white text-blue-600 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{isProcessing ? 'Registreren...' : 'Meld je aan voor wachtlijst'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center justify-center space-x-2 text-xs text-white/70">
                    <Lock className="w-3 h-3" />
                    <span>Je gegevens zijn veilig</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-white/70 flex items-center justify-center space-x-1">
                  <span className="text-yellow-300">🚀</span>
                  <span><span className="font-semibold text-white">50+ professionals</span> gingen je al voor!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

