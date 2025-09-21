import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Building, CheckCircle, AlertCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface SignupModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  company: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignupModal({ onClose, onSuccess }: SignupModalProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { signUp, signIn } = useUser();
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password strength validation
  const validatePassword = (password: string): string[] => {
    const issues = [];
    if (password.length < 8) issues.push('Minimaal 8 karakters');
    if (!/[A-Z]/.test(password)) issues.push('Minimaal 1 hoofdletter');
    if (!/[a-z]/.test(password)) issues.push('Minimaal 1 kleine letter');
    if (!/\d/.test(password)) issues.push('Minimaal 1 cijfer');
    return issues;
  };

  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        return value.trim().length < 2 ? 'Voornaam moet minimaal 2 karakters bevatten' : undefined;
      case 'lastName':
        return value.trim().length < 2 ? 'Achternaam moet minimaal 2 karakters bevatten' : undefined;
      case 'email':
        if (!value.trim()) return 'E-mailadres is verplicht';
        return !emailRegex.test(value) ? 'Ongeldig e-mailadres' : undefined;
      case 'password':
        const passwordIssues = validatePassword(value);
        return passwordIssues.length > 0 ? passwordIssues.join(', ') : undefined;
      case 'confirmPassword':
        return value !== formData.password ? 'Wachtwoorden komen niet overeen' : undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Real-time validation for password confirmation
    if (name === 'password' && formData.confirmPassword) {
      const confirmError = formData.confirmPassword !== value ? 'Wachtwoorden komen niet overeen' : undefined;
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!isLogin) {
      newErrors.firstName = validateField('firstName', formData.firstName);
      newErrors.lastName = validateField('lastName', formData.lastName);
      newErrors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);
    }

    newErrors.email = validateField('email', formData.email);
    newErrors.password = validateField('password', formData.password);

    if (!isLogin && !agreedToTerms) {
      newErrors.general = 'Je moet akkoord gaan met de algemene voorwaarden';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Er is een fout opgetreden. Probeer het opnieuw.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: ''
    });
    setErrors({});
    setAgreedToTerms(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#454545] mb-2">
              {isLogin ? 'Welkom Terug!' : 'Start je gratis proefperiode'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Log in om door te gaan naar je dashboard' 
                : 'Begin direct met het genereren van professionele ISO documenten'
              }
            </p>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{errors.general}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-[#454545] mb-2">
                    Voornaam *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Jan"
                      required
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-[#454545] mb-2">
                    Achternaam *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="van der Berg"
                      required
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-[#454545] mb-2">
                    Bedrijfsnaam (optioneel)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Mijn Bedrijf B.V."
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#454545] mb-2">
                E-mailadres *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="jan@bedrijf.nl"
                  required
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#454545] mb-2">
                Wachtwoord *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={isLogin ? "Je wachtwoord" : "Minimaal 8 karakters"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-[#454545] mb-2">
                  Bevestig wachtwoord *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Herhaal je wachtwoord"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Terms Agreement */}
            {!isLogin && (
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Ik ga akkoord met de{' '}
                  <a 
                    href="#" 
                    className="text-blue-600 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('/terms', '_blank');
                    }}
                  >
                    Algemene Voorwaarden
                  </a>
                  {' '}en het{' '}
                  <a 
                    href="#" 
                    className="text-blue-600 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('/privacy', '_blank');
                    }}
                  >
                    Privacybeleid
                  </a>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Inloggen...' : 'Account aanmaken...'}
                </>
              ) : (
                isLogin ? 'Inloggen' : 'Account aanmaken'
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? 'Nog geen account?' : 'Al een account?'}
              <button
                onClick={toggleMode}
                className="ml-2 text-blue-600 hover:underline font-medium"
              >
                {isLogin ? 'Registreer hier' : 'Log hier in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}