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
  TrendingUp,
  Clock,
  CheckCircle,
  Target,
  Users,
  Zap,
  Star,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function DashboardPage() {
  const { user, documents, signOut } = useUser();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  // Calculate statistics
  const totalDocuments = documents.length;
  const completedDocuments = documents.filter(doc => doc.status === 'Voltooid').length;
  const conceptDocuments = documents.filter(doc => doc.status === 'Concept').length;
  const thisMonthDocuments = documents.filter(doc => {
    const docDate = new Date(doc.created_at);
    const now = new Date();
    return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear();
  }).length;

  // Calculate completion rate
  const completionRate = totalDocuments > 0 ? Math.round((completedDocuments / totalDocuments) * 100) : 0;

  // Recent activity (mock data for now)
  const recentActivity = [
    {
      id: 1,
      type: 'document_created',
      title: 'ISO 9001 Kwaliteitshandboek',
      time: '2 uur geleden',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 2,
      type: 'document_completed',
      title: 'ISO 27001 Beveiligingsbeleid',
      time: '1 dag geleden',
      icon: CheckCircle,
      color: 'blue'
    },
    {
      id: 3,
      type: 'document_updated',
      title: 'ISO 9001 Procedures',
      time: '3 dagen geleden',
      icon: Edit3,
      color: 'blue'
    }
  ];

  const valueMetrics = [
    {
      title: 'Tijd Bespaard',
      value: '24 uur',
      description: 'Gemiddeld per document',
      icon: Clock,
      color: 'blue',
      trend: '+15%'
    },
    {
      title: 'Kwaliteit Verhoogd',
      value: '95%',
      description: 'Compliance score',
      icon: Target,
      color: 'blue',
      trend: '+8%'
    },
    {
      title: 'Kosten Bespaard',
      value: '€2,400',
      description: 'Per maand',
      icon: TrendingUp,
      color: 'blue',
      trend: '+22%'
    },
    {
      title: 'Productiviteit',
      value: '3.2x',
      description: 'Sneller dan handmatig',
      icon: Zap,
      color: 'blue',
      trend: '+12%'
    }
  ];

  const features = [
    {
      title: 'Geautomatiseerde Generatie',
      description: 'Genereer professionele ISO documenten in minuten in plaats van uren',
      icon: Zap,
      color: 'blue'
    },
    {
      title: 'Compliance Garantie',
      description: 'Alle documenten voldoen aan de nieuwste ISO standaarden',
      icon: Shield,
      color: 'blue'
    },
    {
      title: 'Slimme Templates',
      description: 'AI-gestuurde templates die zich aanpassen aan jouw organisatie',
      icon: Star,
      color: 'blue'
    },
    {
      title: 'Real-time Samenwerking',
      description: 'Werk samen met je team aan documenten in real-time',
      icon: Users,
      color: 'blue'
    }
  ];

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      onClick: () => {
        setIsSidebarOpen(false);
      }
    },
    {
      icon: FileText,
      label: 'Documenten',
      onClick: () => {
        setIsSidebarOpen(false);
        navigate('/dashboard');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-purple-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-36 bg-white shadow-lg z-50 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center space-x-1">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <div>
                <h1 className="text-xs font-bold text-gray-900">ISO Generator</h1>
                <p className="text-xs text-gray-600">Document Management</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-3">
            <div className="space-y-1 px-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded transition-all duration-200 ${
                    item.label === 'Dashboard'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center transition-all duration-200 ${
                    item.label === 'Dashboard'
                      ? 'bg-white/20'
                      : 'bg-gradient-to-br from-blue-600 to-indigo-600 group-hover:from-purple-600 group-hover:to-indigo-600'
                  }`}>
                    <item.icon className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="p-2 border-t border-gray-200">
            <div className="flex items-center space-x-1 p-1.5 rounded bg-gray-50">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-5 h-5 rounded-full object-cover border border-white shadow-sm"
                />
              ) : (
                <div className="w-5 h-5 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-2.5 h-2.5 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">
                  {user ? `${user.firstName} ${user.lastName}` : 'Gebruiker'}
                </p>
                <p className="text-xs text-gray-600 truncate">{user?.company || 'Geen bedrijf'}</p>
              </div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-0.5 hover:bg-gray-200 rounded transition-colors"
              >
                <ChevronDown className={`w-2.5 h-2.5 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Profile Dropdown */}
            {isDropdownOpen && (
              <div className="mt-1 bg-white rounded shadow-lg border border-gray-200 py-1">
                <Link
                  to="/settings"
                  className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="w-2.5 h-2.5" />
                  <span>Instellingen</span>
                </Link>
                
                <Link
                  to="/faq"
                  className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <HelpCircle className="w-2.5 h-2.5" />
                  <span>FAQ</span>
                </Link>
                
                <Link
                  to="/contact"
                  className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <MessageSquare className="w-2.5 h-2.5" />
                  <span>Contact</span>
                </Link>
                
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center space-x-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut className="w-2.5 h-2.5" />
                    <span>Uitloggen</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Close button for mobile */}
          <div className="p-2 border-t border-gray-200 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-full p-1 flex items-center justify-center"
            >
              <X className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-2 left-2 z-40 lg:hidden p-1 bg-white rounded shadow-lg"
      >
        <Menu className="w-3 h-3 text-gray-600" />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-36">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-5 py-6">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Dashboard</h1>
            <p className="text-xs text-gray-600">Welkom terug, {user?.firstName || 'Gebruiker'}! Hier is een overzicht van je voortgang.</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-white rounded shadow-lg p-3 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Totaal Documenten</p>
                  <p className="text-lg font-bold text-[#454545]">{totalDocuments}</p>
                </div>
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                  <FileText className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded shadow-lg p-3 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Voltooid</p>
                  <p className="text-lg font-bold text-[#454545]">{completedDocuments}</p>
                  <p className="text-xs text-blue-600 mt-0.5">{completionRate}% voltooiing</p>
                </div>
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded shadow-lg p-3 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">In Concept</p>
                  <p className="text-lg font-bold text-[#454545]">{conceptDocuments}</p>
                </div>
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                  <Edit3 className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded shadow-lg p-3 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Deze Maand</p>
                  <p className="text-lg font-bold text-[#454545]">{thisMonthDocuments}</p>
                </div>
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Value Metrics */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Toegevoegde Waarde</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {valueMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded shadow-lg p-3 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                      <metric.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">
                      {metric.trend}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-0.5">{metric.value}</h3>
                  <p className="text-xs font-medium text-gray-700 mb-0.5">{metric.title}</p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Benefits */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Waarom ISO Generator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded shadow-lg p-3 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Recente Activiteit</h2>
            <div className="bg-white rounded shadow-lg border border-gray-200">
              <div className="p-3">
                <div className="space-y-1.5">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-2 p-1.5 rounded hover:bg-gray-50 transition-colors">
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                        <activity.icon className="w-2.5 h-2.5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Snelle Acties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button 
                onClick={() => navigate('/questionnaire/9001')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-left"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                    <FileText className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold">Nieuw ISO 9001 Document</h3>
                    <p className="text-xs text-blue-100">Start met kwaliteitsmanagement</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => navigate('/questionnaire/27001')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-left"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold">Nieuw ISO 27001 Document</h3>
                    <p className="text-xs text-blue-100">Start met informatiebeveiliging</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => navigate('/settings')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-left"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                    <Settings className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold">Instellingen</h3>
                    <p className="text-xs text-blue-100">Beheer je account</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
