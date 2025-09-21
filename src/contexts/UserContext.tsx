import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, Profile, Document } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  avatar?: string;
  createdAt: string;
}

interface UserContextType {
  user: UserData | null;
  documents: Document[];
  isLoggedIn: boolean;
  loading: boolean;
  signUp: (email: string, password: string, userData: { firstName: string; lastName: string; company?: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveDocument: (document: Omit<Document, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateDocument: (documentId: string, updates: Partial<Document>) => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
  getDocument: (documentId: string) => Document | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data voor social media screenshot
  const mockUser: UserData = {
    id: '1',
    firstName: 'Sarah',
    lastName: 'van der Berg',
    email: 'sarah@innovatiehub.nl',
    company: 'InnovatieHub B.V.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    createdAt: new Date().toISOString()
  };

  const mockDocuments: Document[] = [
    {
      id: '1',
      user_id: '1',
      title: 'ISO 9001 Kwaliteitshandboek',
      type: 'ISO 9001',
      company: 'InnovatieHub B.V.',
      status: 'Voltooid',
      icon: '📄',
      color: 'blue',
      current_question_index: 25,
      answers: {},
      editable_content: 'Kwaliteitsbeleid voor InnovatieHub B.V.',
      progress: 100,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dagen geleden
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 dag geleden
    },
    {
      id: '2',
      user_id: '1',
      title: 'ISO 27001 Beveiligingsbeleid',
      type: 'ISO 27001',
      company: 'InnovatieHub B.V.',
      status: 'Voltooid',
      icon: '🛡️',
      color: 'green',
      current_question_index: 18,
      answers: {},
      editable_content: 'Informatiebeveiligingsbeleid',
      progress: 100,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 dagen geleden
      updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 dagen geleden
    },
    {
      id: '3',
      user_id: '1',
      title: 'ISO 9001 Procedures',
      type: 'ISO 9001',
      company: 'InnovatieHub B.V.',
      status: 'Concept',
      icon: '📋',
      color: 'purple',
      current_question_index: 12,
      answers: {},
      editable_content: 'Werkprocedures en instructies',
      progress: 75,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 dag geleden
      updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 uur geleden
    },
    {
      id: '4',
      user_id: '1',
      title: 'ISO 14001 Milieubeleid',
      type: 'ISO 14001',
      company: 'InnovatieHub B.V.',
      status: 'Concept',
      icon: '🌱',
      color: 'green',
      current_question_index: 8,
      answers: {},
      editable_content: 'Milieumanagementsysteem',
      progress: 45,
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 uur geleden
      updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() // 1 uur geleden
    },
    {
      id: '5',
      user_id: '1',
      title: 'ISO 45001 Veiligheidsbeleid',
      type: 'ISO 45001',
      company: 'InnovatieHub B.V.',
      status: 'Concept',
      icon: '⚠️',
      color: 'orange',
      current_question_index: 5,
      answers: {},
      editable_content: 'Arbeidsveiligheid en gezondheid',
      progress: 25,
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minuten geleden
      updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString() // 10 minuten geleden
    }
  ];

  useEffect(() => {
    // Simuleer loading
    const timer = setTimeout(() => {
      setUser(mockUser);
      setDocuments(mockDocuments);
      setIsLoggedIn(true);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signUp = async (email: string, password: string, userData: { firstName: string; lastName: string; company?: string }) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            company: userData.company
          }
        }
      });

      if (error) throw error;
    } catch (error) {
      console.warn('Supabase signup failed, using mock:', error);
      // Fallback naar mock
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: UserData = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: email,
        company: userData.company,
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setIsLoggedIn(true);
    }
    
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error) {
      console.warn('Supabase signin failed, using mock:', error);
      // Fallback naar mock
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: UserData = {
        id: Date.now().toString(),
        firstName: 'Test',
        lastName: 'User',
        email: email,
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setIsLoggedIn(true);
    }
    
    setLoading(false);
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.warn('Supabase signout failed, using mock:', error);
      // Fallback naar mock
      setUser(null);
      setIsLoggedIn(false);
      setDocuments([]);
    }
  };

  const saveDocument = async (documentData: Omit<Document, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not logged in');

    try {
      const { data, error } = await supabase
        .from('documents')
        .insert({
          ...documentData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setDocuments(prev => [data, ...prev]);
      }
    } catch (error) {
      console.warn('Supabase save document failed, using mock:', error);
      // Fallback naar mock
      const newDoc: Document = {
        ...documentData,
        id: Date.now().toString(),
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setDocuments(prev => [newDoc, ...prev]);
    }
  };

  const updateDocument = (documentId: string, updates: Partial<Document>) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId ? { ...doc, ...updates } : doc
      )
    );
  };

  const deleteDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const getDocument = (documentId: string): Document | undefined => {
    return documents.find(doc => doc.id === documentId);
  };

  const value: UserContextType = {
    user,
    documents,
    isLoggedIn,
    loading,
    signUp,
    signIn,
    signOut,
    saveDocument,
    updateDocument,
    deleteDocument,
    getDocument
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};