import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, FileText, Shield, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Wat is ISO Generator en hoe werkt het?",
    answer: "ISO Generator is een AI-gedreven platform dat je helpt bij het genereren van professionele ISO documenten in het Nederlands. Je beantwoordt een reeks gerichte vragen over jouw organisatie, waarna onze AI een volledig gepersonaliseerd document genereert dat voldoet aan de ISO standaarden.",
    category: "Algemeen"
  },
  {
    id: 2,
    question: "Welke ISO standaarden worden ondersteund?",
    answer: "Momenteel ondersteunen we ISO 9001 (Kwaliteitsmanagement), ISO 27001 (Informatiebeveiliging) en ISO 14001 (Milieumanagement). ISO 27001 en 14001 zijn momenteel in BETA fase. We werken aan uitbreiding naar andere ISO standaarden.",
    category: "Algemeen"
  },
  {
    id: 3,
    question: "Zijn de gegenereerde documenten audit-klaar?",
    answer: "Ja, alle documenten die door ISO Generator worden gemaakt, voldoen volledig aan de nieuwste ISO standaarden en zijn audit-klaar. Ze bevatten alle vereiste elementen en zijn gestructureerd volgens de officiële ISO richtlijnen.",
    category: "Kwaliteit"
  },
  {
    id: 4,
    question: "Kan ik de gegenereerde documenten bewerken?",
    answer: "Absoluut! Na het genereren kun je alle documenten volledig bewerken met onze ingebouwde rich text editor. Je kunt tekst aanpassen, formatteren, secties toevoegen of verwijderen, en het document volledig naar jouw wensen aanpassen.",
    category: "Bewerking"
  },
  {
    id: 5,
    question: "In welke formaten kan ik mijn documenten exporteren?",
    answer: "Je kunt je documenten exporteren als PDF voor professionele presentatie en archivering, of als Word document voor verdere bewerking. Beide formaten behouden de volledige opmaak en structuur.",
    category: "Export"
  },
  {
    id: 6,
    question: "Hoe lang duurt het om een document te genereren?",
    answer: "Het beantwoorden van de vragenlijst duurt gemiddeld 15-20 minuten, afhankelijk van de ISO standaard. Het daadwerkelijke genereren van het document gebeurt binnen enkele minuten nadat je alle vragen hebt beantwoord.",
    category: "Proces"
  },
  {
    id: 7,
    question: "Kan ik mijn voortgang opslaan en later verdergaan?",
    answer: "Ja, je kunt je voortgang op elk moment opslaan als concept. Je kunt later terugkeren naar je dashboard en verdergaan waar je gebleven was. Alle antwoorden worden automatisch bewaard.",
    category: "Proces"
  },
  {
    id: 8,
    question: "Wat gebeurt er met mijn bedrijfsgegevens?",
    answer: "We nemen privacy en gegevensbescherming zeer serieus. Alle informatie die je invoert wordt veilig opgeslagen en wordt alleen gebruikt voor het genereren van jouw documenten. We delen geen gegevens met derden en je behoudt volledige controle over je informatie.",
    category: "Privacy"
  },
  {
    id: 9,
    question: "Kan ik documenten voor meerdere locaties of afdelingen maken?",
    answer: "Ja, je kunt voor elke locatie, afdeling of business unit een apart document genereren. Elk document wordt aangepast aan de specifieke context en behoeften van die organisatie-eenheid.",
    category: "Organisatie"
  },
  {
    id: 10,
    question: "Bieden jullie ondersteuning bij implementatie?",
    answer: "Voor Enterprise klanten bieden we uitgebreide ondersteuning, inclusief een dedicated account manager. Voor andere plannen kun je contact opnemen via ons contactformulier voor vragen over implementatie.",
    category: "Ondersteuning"
  },
  {
    id: 11,
    question: "Hoe vaak worden de ISO standaarden geüpdatet?",
    answer: "We houden onze templates en vragenlijsten up-to-date met de nieuwste versies van de ISO standaarden. Updates worden automatisch doorgevoerd en bestaande gebruikers worden geïnformeerd over belangrijke wijzigingen.",
    category: "Updates"
  },
  {
    id: 12,
    question: "Kan ik mijn abonnement op elk moment opzeggen?",
    answer: "Ja, je kunt je abonnement op elk moment opzeggen. Er zijn geen langetermijncontracten. Na opzegging behoud je toegang tot je documenten tot het einde van je factureringsperiode.",
    category: "Facturering"
  },
  {
    id: 13,
    question: "Wat is het verschil tussen de verschillende plannen?",
    answer: "Het Starter plan is perfect voor eenmalig gebruik, het Professional plan biedt maandelijkse toegang met meer documenten en features, en het Enterprise plan is voor grote organisaties met onbeperkte documenten en dedicated ondersteuning.",
    category: "Plannen"
  },
  {
    id: 14,
    question: "Kan ik een demo aanvragen?",
    answer: "Ja, je kunt een demo aanvragen via ons contactformulier. We plannen graag een persoonlijke demonstratie waarin we de mogelijkheden van ISO Generator laten zien en je vragen beantwoorden.",
    category: "Demo"
  },
  {
    id: 15,
    question: "Werken jullie samen met certificeringsinstanties?",
    answer: "Onze documenten zijn ontwikkeld volgens de officiële ISO richtlijnen en worden geaccepteerd door alle erkende certificeringsinstanties. We hebben geen exclusieve partnerships, maar onze documenten voldoen aan alle audit-eisen.",
    category: "Certificering"
  }
];

const categories = ["Alle", "Algemeen", "Kwaliteit", "Bewerking", "Export", "Proces", "Privacy", "Organisatie", "Ondersteuning", "Updates", "Facturering", "Plannen", "Demo", "Certificering"];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#454545]">ISO Generator</h1>
                <p className="text-sm text-gray-600">Veelgestelde Vragen</p>
              </div>
            </Link>
            <Link 
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Terug naar Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-[#454545] mb-4">
            Veelgestelde <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Vragen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vind snel antwoorden op de meest gestelde vragen over ISO Generator en onze diensten.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Zoek in veelgestelde vragen..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <HelpCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#454545] text-left">{item.question}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{item.category}</span>
                    </div>
                  </div>
                  <div>
                    {openItems.includes(item.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {openItems.includes(item.id) && (
                  <div className="px-6 pb-4">
                    <div className="pl-12">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#454545] mb-2">Geen resultaten gevonden</h3>
              <p className="text-gray-600 mb-6">
                Probeer een andere zoekterm of selecteer een andere categorie.
              </p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-[#454545] mb-6 text-center">Nog steeds vragen?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/contact"
              className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-[#454545] mb-2">Contact Opnemen</h4>
              <p className="text-sm text-gray-600 text-center">Stuur ons een bericht voor persoonlijke ondersteuning</p>
            </Link>

            <Link
              to="/dashboard"
              className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-[#454545] mb-2">Start Genereren</h4>
              <p className="text-sm text-gray-600 text-center">Begin direct met het maken van je eerste document</p>
            </Link>

            <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-[#454545] mb-2">Documentatie</h4>
              <p className="text-sm text-gray-600 text-center">Uitgebreide handleidingen en tutorials (binnenkort)</p>
            </div>
          </div>
        </div>

        {/* Popular ISO Standards */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-[#454545] mb-6 text-center">Ondersteunde ISO Standaarden</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-white rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#454545]">ISO 27001</h4>
                <p className="text-sm text-gray-600">Informatiebeveiliging</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">BETA</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#454545]">ISO 9001</h4>
                <p className="text-sm text-gray-600">Kwaliteitsmanagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}