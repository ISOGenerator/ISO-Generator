import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Shield, 
  Award, 
  Globe, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2,
  ArrowLeft,
  User,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  LayoutDashboard,
  Menu,
  X,
  Clock,
  Target,
  TrendingUp,
  Zap,
  Star,
  Users,
  CheckCircle,
  Calendar,
  Download,
  ChevronRight,
  BarChart3,
  Maximize2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

// Icon mapping for retrieving stored icons
const lucideIconMap = {
  Shield,
  Award,
  Globe,
  FileText
};

interface DashboardProps {
  onBackToLanding: () => void;
}

export default function Dashboard({ onBackToLanding }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'generate' | 'templates'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedISO, setSelectedISO] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, documents, signOut, deleteDocument } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50',
      purple: 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50',
      green: 'from-green-500 to-green-600 text-green-600 bg-green-50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const documentTypes = {
    '27001': [
      {
        id: 'information-security-policy',
        name: 'Informatiebeveiligingsbeleid',
        description: 'Het hoofddocument dat het informatiebeveiligingsbeleid van uw organisatie beschrijft',
        questions: 24,
        estimatedTime: '15-20 minuten'
      },
      {
        id: 'risk-management',
        name: 'Risicomanagement Plan',
        description: 'Een uitgebreid plan voor het identificeren, beoordelen en beheren van informatiebeveiligingsrisico\'s',
        questions: 18,
        estimatedTime: '12-15 minuten'
      },
      {
        id: 'incident-response',
        name: 'Incident Response Plan',
        description: 'Procedures en richtlijnen voor het omgaan met informatiebeveiligingsincidenten',
        questions: 16,
        estimatedTime: '10-12 minuten'
      }
    ],
    '9001': [
      {
        id: 'quality-handbook',
        name: 'Kwaliteitshandboek',
        description: 'Het hoofddocument dat het kwaliteitsmanagementsysteem van uw organisatie beschrijft',
        questions: 21,
        estimatedTime: '15-18 minuten'
      },
      {
        id: 'version-control',
        name: 'Versiebeheer',
        description: 'Procedures voor het beheren van documentversies en wijzigingen',
        questions: 12,
        estimatedTime: '8-10 minuten'
      },
      {
        id: 'process-documentation',
        name: 'Procesdocumentatie',
        description: 'Gedetailleerde beschrijvingen van alle kwaliteitsprocessen',
        questions: 25,
        estimatedTime: '18-22 minuten'
      }
    ]
  };

  const handleISOClick = (isoType: string) => {
    setSelectedISO(isoType);
  };

  const handleDocumentTypeSelect = (isoType: string, documentType: string) => {
    navigate(`/questionnaire/${isoType}/${documentType}`);
  };

  const handleBackToISOSelection = () => {
    setSelectedISO(null);
  };

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      onClick: () => {
        setIsSidebarOpen(false);
        setActiveTab('overview');
      }
    },
    {
      icon: Settings,
      label: 'Instellingen',
      onClick: () => {
        setIsSidebarOpen(false);
        navigate('/settings');
      }
    },
    {
      icon: User,
      label: 'Profiel',
      onClick: () => {
        setIsSidebarOpen(false);
        setIsDropdownOpen(true);
      }
    }
  ];

  // Calculate statistics for overview
  const totalDocuments = documents.length;
  const completedDocuments = documents.filter(doc => doc.status === 'Voltooid').length;
  const conceptDocuments = documents.filter(doc => doc.status === 'Concept').length;
  const thisMonthDocuments = documents.filter(doc => {
    const docDate = new Date(doc.created);
    const now = new Date();
    return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear();
  }).length;
  const completionRate = totalDocuments > 0 ? Math.round((completedDocuments / totalDocuments) * 100) : 0;

  // Get current date
  const currentDate = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayName = dayNames[currentDate.getDay()];
  const monthName = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${dayName}, ${monthName} ${day}, ${year}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-purple-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white z-50 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 pt-12">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ISO Generator</h1>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-4">
            <div className="space-y-1 px-4">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === 'overview' && item.label === 'Dashboard'
                      ? 'bg-blue-600 text-white'
                      : activeTab === 'generate' && item.label === 'Nieuw Document'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="p-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/50">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user ? `${user.firstName} ${user.lastName}` : 'Gebruiker'}
                </p>
                <p className="text-xs text-gray-600 truncate">{user?.company || 'Geen bedrijf'}</p>
              </div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-1 hover:bg-white/50 rounded transition-colors"
              >
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Profile Dropdown */}
            {isDropdownOpen && (
              <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>Instellingen</span>
                </Link>
                
                <Link
                  to="/faq"
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>FAQ</span>
                </Link>
                
                <Link
                  to="/contact"
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
                
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Uitloggen</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Close button for mobile */}
          <div className="p-4 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-full p-2 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-40 lg:hidden p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content with left margin for sidebar */}
      <div className="lg:ml-64">
        <div className="px-6 sm:px-8 lg:px-10 py-6 bg-gradient-to-r from-white via-blue-50 to-purple-50 min-h-screen">
          {/* Top Header */}
          <div className="flex items-center justify-between mb-6 mt-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Hey, {user?.firstName || 'Gebruiker'}!</h2>
                <p className="text-sm text-gray-600">{formattedDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Start searching here..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                />
              </div>
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Welcome Alert Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Welkom terug, {user?.firstName || 'Gebruiker'}!</h3>
                  <p className="text-gray-600">Je hebt {totalDocuments} documenten en {completionRate}% is voltooid. Blijf op schema!</p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Bekijk Details
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Totaal Documenten</p>
                  <p className="text-3xl font-bold text-gray-900">{totalDocuments}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">Alle documenten</span>
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <Maximize2 className="w-3 h-3 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Voltooid</p>
                  <p className="text-3xl font-bold text-gray-900">{completedDocuments}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">Klaar voor gebruik</span>
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <Maximize2 className="w-3 h-3 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Concept</p>
                  <p className="text-3xl font-bold text-gray-900">{conceptDocuments}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">In bewerking</span>
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <Maximize2 className="w-3 h-3 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Deze Maand</p>
                  <p className="text-3xl font-bold text-gray-900">{thisMonthDocuments}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">Nieuwe documenten</span>
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <Maximize2 className="w-3 h-3 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('generate')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === 'generate'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Nieuw Document
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Zoek documenten..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('generate')}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105">
                      <Plus className="w-4 h-4" />
                      <span>Nieuw Document</span>
                    </button>
                  </div>

                  {/* Documents List */}
                  {filteredDocuments.length > 0 ? (
                    <div className="space-y-4">
                      {filteredDocuments.map((doc) => {
                        const IconComponent = lucideIconMap[doc.icon as keyof typeof lucideIconMap] || FileText;
                        const colorClasses = getColorClasses(doc.color);
                        
                        return (
                          <div key={doc.id} className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gray-50 hover:bg-white shadow-md">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} rounded-lg flex items-center justify-center`}>
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>{doc.company}</span>
                                    <span>•</span>
                                    <span>{doc.created}</span>
                                    <span>•</span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                      doc.status === 'Voltooid' 
                                        ? 'bg-green-100 text-green-800' 
                                        : doc.status === 'Concept'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {doc.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {doc.status === 'Concept' ? (
                                  <button 
                                    onClick={() => navigate(`/questionnaire/${doc.type.split(' ')[1]}/${doc.id}`)}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-sm shadow-md hover:shadow-lg hover:scale-105"
                                  >
                                    Hervatten
                                  </button>
                                ) : doc.status === 'Voltooid' ? (
                                  <button 
                                    onClick={() => navigate(`/document/edit/${doc.id}`)}
                                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 text-sm shadow-md hover:shadow-lg hover:scale-105"
                                  >
                                    Bewerken
                                  </button>
                                ) : null}
                                <button 
                                  onClick={() => {
                                    if (window.confirm('Weet je zeker dat je dit document wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.')) {
                                      deleteDocument(doc.id);
                                    }
                                  }}
                                  className="p-2 hover:bg-red-100 rounded-lg transition-all duration-300 hover:scale-110"
                                  title="Document verwijderen"
                                >
                                  <Trash2 className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Geen documenten gevonden</h3>
                      <p className="text-gray-600 mb-8 text-lg">
                        Je hebt nog geen documenten aangemaakt. Begin met het genereren van je eerste ISO document.
                      </p>
                      <button 
                        onClick={() => setActiveTab('generate')}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl hover:scale-105 text-lg">
                        <Plus className="w-5 h-5" />
                        <span>Nieuw Document</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'generate' && (
                <div className="text-center py-16">
                  {/* Header Section - Only show when no ISO is selected */}
                  {!selectedISO && (
                    <>
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Plus className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">Nieuw Document Genereren</h3>
                      <p className="text-gray-600 mb-8 text-lg">Kies een ISO standaard om te beginnen</p>
                    </>
                  )}

                  {/* ISO Selection View */}
                  {!selectedISO && (
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <div 
                        onClick={() => handleISOClick('27001')}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105">
                        <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                        <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                          ISO 27001
                          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium ml-3">BETA</span>
                        </h4>
                        <p className="text-gray-600">Informatiebeveiliging</p>
                      </div>
                      
                      <div 
                        onClick={() => handleISOClick('9001')}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105">
                        <Award className="w-16 h-16 text-purple-600 mx-auto mb-6" />
                        <h4 className="font-semibold text-gray-900 mb-3 text-lg">ISO 9001</h4>
                        <p className="text-gray-600">Kwaliteitsmanagement</p>
                      </div>
                    </div>
                  )}

                  {/* Document Types View */}
                  {selectedISO && (
                    <div className="max-w-5xl mx-auto">
                      <div className="flex items-center justify-center mb-8">
                        <button
                          onClick={handleBackToISOSelection}
                          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-6"
                        >
                          <ArrowLeft className="w-6 h-6 mr-2" />
                          <span className="font-medium text-lg">Terug</span>
                        </button>
                        <h4 className="text-xl font-semibold text-gray-900">
                          {selectedISO === '27001' ? 'ISO 27001 - Informatiebeveiliging' : 'ISO 9001 - Kwaliteitsmanagement'}
                        </h4>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documentTypes[selectedISO as keyof typeof documentTypes].map((docType) => (
                          <div
                            key={docType.id}
                            onClick={() => handleDocumentTypeSelect(selectedISO, docType.id)}
                            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                          >
                            <div className="text-center">
                              <div className={`w-14 h-14 bg-gradient-to-br ${
                                selectedISO === '27001' ? 'from-blue-500 to-blue-600' : 'from-purple-500 to-purple-600'
                              } rounded-lg flex items-center justify-center mx-auto mb-4`}>
                                <FileText className="w-7 h-7 text-white" />
                              </div>
                              <h5 className="font-semibold text-gray-900 mb-3">{docType.name}</h5>
                              <p className="text-sm text-gray-600 mb-4">{docType.description}</p>
                              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                                <span>{docType.questions} vragen</span>
                                <span>•</span>
                                <span>{docType.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}