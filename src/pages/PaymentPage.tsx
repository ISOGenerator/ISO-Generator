import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, CreditCard, Shield, Award, Globe, Users, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
  icon: React.ComponentType<any>;
}

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  // Get plan from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const planFromUrl = urlParams.get('plan') || 'professional';
    setSelectedPlan(planFromUrl);
  }, []);

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 39,
      period: 'per maand',
      description: 'Perfect voor kleine bedrijven die net beginnen met ISO certificering',
      features: [
        '10 documenten per maand',
        'ISO 9001 & 27001',
        'Email ondersteuning',
        'PDF & Word export',
        'Basis templates'
      ],
      color: 'blue',
      icon: Shield
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 99,
      period: 'per maand',
      description: 'Ideaal voor groeiende bedrijven met uitgebreide ISO behoeften',
      features: [
        '30 documenten per maand',
        'Alle ISO standaarden',
        'Prioriteit ondersteuning',
        'Custom templates',
        'API toegang',
        'Team collaboration',
        'Advanced analytics'
      ],
      popular: true,
      color: 'purple',
      icon: Award
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      period: 'per maand',
      description: 'Voor grote organisaties met complexe compliance vereisten',
      features: [
        'Onbeperkte documenten',
        'Alle ISO standaarden',
        '24/7 ondersteuning',
        'White-label oplossing',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security',
        'SLA garantie'
      ],
      color: 'green',
      icon: Globe
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleCheckout = async () => {
    if (!selectedPlan) {
      alert('Selecteer eerst een plan');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert(`Betaling succesvol! Je hebt nu toegang tot het ${selectedPlan} plan.`);
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Er is een fout opgetreden bij het verwerken van de betaling. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedPlan = () => {
    return plans.find(plan => plan.id === selectedPlan) || plans[1];
  };

  const getPlanColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      blue: isSelected 
        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' 
        : 'border-gray-200 hover:border-blue-300',
      purple: isSelected 
        ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500' 
        : 'border-gray-200 hover:border-purple-300',
      green: isSelected 
        ? 'border-green-500 bg-green-50 ring-2 ring-green-500' 
        : 'border-gray-200 hover:border-green-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const selectedPlanData = getSelectedPlan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#454545]">ISO Generator</h1>
                  <p className="text-sm text-gray-600">Kies je plan</p>
                </div>
              </Link>
            </div>
            <Link 
              to="/signup"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Terug</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Account aangemaakt</span>
            </div>
            <div className="w-16 h-0.5 bg-blue-200"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">2</span>
              </div>
              <span className="ml-2 text-sm font-medium text-blue-600">Plan selecteren</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 font-semibold text-sm">3</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Betaling</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plan Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#454545] mb-2">Kies je plan</h2>
              <p className="text-gray-600 mb-8">Selecteer het plan dat het beste bij jouw behoeften past</p>

              <div className="space-y-4">
                {plans.map((plan) => {
                  const IconComponent = plan.icon;
                  const isSelected = selectedPlan === plan.id;
                  
                  return (
                    <div
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${getPlanColorClasses(plan.color, isSelected)}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-6">
                          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Meest Populair
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${
                            plan.color === 'blue' ? 'from-blue-500 to-blue-600' :
                            plan.color === 'purple' ? 'from-purple-500 to-purple-600' :
                            'from-green-500 to-green-600'
                          } rounded-xl flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold text-[#454545]">{plan.name}</h3>
                              <div className="text-2xl font-bold text-[#454545]">
                                €{plan.price}
                                <span className="text-sm font-normal text-gray-600 ml-1">{plan.period}</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{plan.description}</p>
                            
                            <div className="grid md:grid-cols-2 gap-2">
                              {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected 
                            ? `border-${plan.color}-500 bg-${plan.color}-500` 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h3 className="text-xl font-bold text-[#454545] mb-6">Overzicht bestelling</h3>
              
              {/* User Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-[#454545] mb-2">Account details</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Naam:</strong> {user ? `${user.firstName} ${user.lastName}` : 'Niet ingelogd'}</p>
                  <p><strong>Email:</strong> {user?.email || 'Niet beschikbaar'}</p>
                  {user?.company && <p><strong>Bedrijf:</strong> {user.company}</p>}
                </div>
              </div>

              {/* Selected Plan */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-[#454545]">Geselecteerd plan:</span>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${
                      selectedPlanData.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      selectedPlanData.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      'from-green-500 to-green-600'
                    } rounded-lg flex items-center justify-center`}>
                      <selectedPlanData.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#454545]">{selectedPlanData.name}</h4>
                      <p className="text-sm text-gray-600">{selectedPlanData.period}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Maandelijks abonnement</span>
                    <span className="font-bold text-[#454545]">€{selectedPlanData.price}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#454545]">Totaal vandaag:</span>
                  <span className="text-2xl font-bold text-[#454545]">€{selectedPlanData.price}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Maandelijks gefactureerd
                </p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isLoading || !selectedPlan}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verwerken...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Ga verder naar betaling
                  </>
                )}
              </button>

              {/* Security Info */}
              <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                <Shield className="w-4 h-4 mr-1" />
                <span>Veilige betaling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
