import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, BookOpen, Settings, Shield, Award, Globe, Clock, ArrowRight } from 'lucide-react';

interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  questions: number;
  estimatedTime: string;
}

const DOCUMENT_TYPES = {
  '27001': [
    {
      id: 'information-security-policy',
      name: 'Informatiebeveiligingsbeleid',
      description: 'Het hoofddocument dat het informatiebeveiligingsbeleid van uw organisatie beschrijft',
      icon: Shield,
      questions: 24,
      estimatedTime: '15-20 minuten'
    },
    {
      id: 'risk-management',
      name: 'Risicomanagement Plan',
      description: 'Een uitgebreid plan voor het identificeren, beoordelen en beheren van informatiebeveiligingsrisico\'s',
      icon: FileText,
      questions: 18,
      estimatedTime: '12-15 minuten'
    },
    {
      id: 'incident-response',
      name: 'Incident Response Plan',
      description: 'Procedures en richtlijnen voor het omgaan met informatiebeveiligingsincidenten',
      icon: Settings,
      questions: 16,
      estimatedTime: '10-12 minuten'
    }
  ],
  '9001': [
    {
      id: 'quality-handbook',
      name: 'Kwaliteitshandboek',
      description: 'Het hoofddocument dat het kwaliteitsmanagementsysteem van uw organisatie beschrijft',
      icon: BookOpen,
      questions: 21,
      estimatedTime: '15-18 minuten'
    },
    {
      id: 'version-control',
      name: 'Versiebeheer',
      description: 'Procedures voor het beheren van documentversies en wijzigingen',
      icon: FileText,
      questions: 12,
      estimatedTime: '8-10 minuten'
    },
    {
      id: 'process-documentation',
      name: 'Procesdocumentatie',
      description: 'Gedetailleerde beschrijvingen van alle kwaliteitsprocessen',
      icon: Settings,
      questions: 25,
      estimatedTime: '18-22 minuten'
    }
  ],
  '14001': [
    {
      id: 'environmental-policy',
      name: 'Milieubeleid',
      description: 'Het hoofddocument dat het milieumanagementsysteem van uw organisatie beschrijft',
      icon: Globe,
      questions: 22,
      estimatedTime: '16-20 minuten'
    },
    {
      id: 'environmental-management',
      name: 'Milieumanagement Plan',
      description: 'Een uitgebreid plan voor milieumanagement en duurzaamheid',
      icon: FileText,
      questions: 20,
      estimatedTime: '14-18 minuten'
    }
  ]
};

export default function DocumentTypePage() {
  const { isoType } = useParams<{ isoType: string }>();
  const navigate = useNavigate();

  const getISOInfo = () => {
    switch (isoType) {
      case '27001':
        return { name: 'ISO 27001', title: 'Informatiebeveiliging', icon: Shield, color: 'blue' };
      case '9001':
        return { name: 'ISO 9001', title: 'Kwaliteitsmanagement', icon: Award, color: 'purple' };
      case '14001':
        return { name: 'ISO 14001', title: 'Milieumanagement', icon: Globe, color: 'green' };
      default:
        return { name: 'ISO 27001', title: 'Informatiebeveiliging', icon: Shield, color: 'blue' };
    }
  };

  const isoInfo = getISOInfo();
  const IconComponent = isoInfo.icon;
  const documentTypes = DOCUMENT_TYPES[isoType as keyof typeof DOCUMENT_TYPES] || DOCUMENT_TYPES['27001'];

  const handleDocumentTypeSelect = (documentType: DocumentType) => {
    navigate(`/questionnaire/${isoType}/${documentType.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Terug naar Dashboard</span>
              </button>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${
                  isoInfo.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  isoInfo.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  'from-green-500 to-green-600'
                } rounded-xl flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#454545]">
                    {isoInfo.name} Document Types
                    {(isoInfo.name === 'ISO 27001' || isoInfo.name === 'ISO 14001') && (
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-medium ml-2">BETA</span>
                    )}
                  </h1>
                  <p className="text-sm text-gray-600">{isoInfo.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#454545] mb-2">
            Kies een document type
          </h2>
          <p className="text-gray-600">
            Selecteer het type document dat u wilt genereren voor {isoInfo.name}
          </p>
        </div>

        {/* Document Types Grid */}
        <div className="grid gap-6">
          {documentTypes.map((docType) => {
            const DocIcon = docType.icon;
            return (
              <div
                key={docType.id}
                onClick={() => handleDocumentTypeSelect(docType)}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    isoInfo.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    isoInfo.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-green-500 to-green-600'
                  } rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <DocIcon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#454545] mb-2">
                      {docType.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {docType.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{docType.questions} vragen</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{docType.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Hoe werkt het?
              </h4>
              <p className="text-sm text-blue-800">
                Na het selecteren van een document type wordt u door een reeks vragen geleid. 
                Uw antwoorden worden gebruikt om een gepersonaliseerd document te genereren dat 
                perfect aansluit bij uw organisatie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


