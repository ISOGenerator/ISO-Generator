import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowUp,
  ArrowDown,
  Plus,
  FileText,
  BookOpen,
  ChevronRight,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  RefreshCw,
  Clock,
  AlertCircle,
  FileDown,
  CheckCircle,
  Circle,
  AlertTriangle,
  X,
  Bot,
  User,
  Send,
  MessageSquare,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Minus
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useUser } from '../contexts/UserContext';

// Chapter structure for ISO 9001
interface ChapterSection {
  id: string;
  title: string;
  suggestions: string[];
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  sections: ChapterSection[];
}

const ISO_9001_CHAPTERS: Chapter[] = [
  {
    id: 'introduction',
    number: '',
    title: 'Inleiding',
    shortTitle: 'Inleiding',
    sections: [
      {
        id: 'intro-general',
        title: 'Algemene Inleiding',
        suggestions: [
          'Dit document beschrijft het kwaliteitsmanagementsysteem conform ISO 9001:2015.',
          'Het systeem is ontwikkeld om consistente kwaliteit te waarborgen.',
          'Alle medewerkers zijn betrokken bij de implementatie van dit systeem.',
          'Dit document wordt jaarlijks geëvalueerd en bijgewerkt.'
        ]
      }
    ]
  },
  {
    id: 'company-info',
    number: '1',
    title: 'Bedrijfsinformatie',
    shortTitle: 'Bedrijfsinfo',
    sections: [
      {
        id: 'company-profile',
        title: 'Bedrijfsprofiel',
        suggestions: [
          'Onze organisatie is gespecialiseerd in het leveren van hoogwaardige diensten.',
          'Het bedrijf werd opgericht met als doel excellente klantenservice te bieden.',
          'Wij bedienen klanten in verschillende marktsegmenten.',
          'Onze kernwaarden zijn kwaliteit, betrouwbaarheid en klanttevredenheid.'
        ]
      },
      {
        id: 'organizational-structure',
        title: 'Organisatiestructuur',
        suggestions: [
          'De organisatie heeft een platte structuur met korte communicatielijnen.',
          'Elke afdeling heeft duidelijk gedefinieerde verantwoordelijkheden.',
          'Het management zorgt voor adequate middelen en ondersteuning.',
          'Rapportagelijnen zijn helder gedefinieerd en gedocumenteerd.'
        ]
      }
    ]
  },
  {
    id: 'scope',
    number: '2',
    title: 'Toepassingsgebied',
    shortTitle: 'Scope',
    sections: [
      {
        id: 'scope-definition',
        title: 'Definitie Toepassingsgebied',
        suggestions: [
          'Het kwaliteitsmanagementsysteem is van toepassing op alle kernprocessen.',
          'Alle locaties en afdelingen vallen onder dit toepassingsgebied.',
          'Het systeem omvat de gehele keten van ontwerp tot levering.',
          'Uitsluitingen zijn beperkt en goed onderbouwd conform ISO 9001.'
        ]
      }
    ]
  },
  {
    id: 'quality-policy',
    number: '3',
    title: 'Kwaliteitsbeleid',
    shortTitle: 'Beleid',
    sections: [
      {
        id: 'policy-statement',
        title: 'Beleidverklaring',
        suggestions: [
          'Wij streven naar continue verbetering van onze producten en diensten.',
          'Klanttevredenheid staat centraal in al onze activiteiten.',
          'Alle medewerkers zijn betrokken bij het realiseren van kwaliteitsdoelstellingen.',
          'Wij naleven alle toepasselijke wet- en regelgeving.'
        ]
      },
      {
        id: 'policy-objectives',
        title: 'Beleidsdoelstellingen',
        suggestions: [
          'Onze doelstellingen zijn SMART geformuleerd en meetbaar.',
          'Doelstellingen worden jaarlijks geëvalueerd en bijgesteld.',
          'Alle afdelingen dragen bij aan het behalen van de doelstellingen.',
          'Voortgang wordt maandelijks gemonitord en gerapporteerd.'
        ]
      }
    ]
  },
  {
    id: 'organization',
    number: '4',
    title: 'Organisatie en Verantwoordelijkheden',
    shortTitle: 'Organisatie',
    sections: [
      {
        id: 'roles-responsibilities',
        title: 'Rollen en Verantwoordelijkheden',
        suggestions: [
          'Elke functie heeft duidelijk gedefinieerde verantwoordelijkheden.',
          'Bevoegdheden zijn gedelegeerd op het juiste organisatieniveau.',
          'De kwaliteitsmanager rapporteert direct aan de directie.',
          'Alle medewerkers kennen hun rol in het kwaliteitssysteem.'
        ]
      }
    ]
  },
  {
    id: 'processes',
    number: '5',
    title: 'Processen',
    shortTitle: 'Processen',
    sections: [
      {
        id: 'core-processes',
        title: 'Kernprocessen',
        suggestions: [
          'Alle kernprocessen zijn geïdentificeerd en gedocumenteerd.',
          'Procesinteracties zijn in kaart gebracht en beheerst.',
          'Elke proces heeft gedefinieerde input- en outputcriteria.',
          'Proceseffectiviteit wordt regelmatig gemeten en geëvalueerd.'
        ]
      },
      {
        id: 'process-monitoring',
        title: 'Procesmonitoring',
        suggestions: [
          'Kritieke procespunten worden continu gemonitord.',
          'Afwijkingen worden direct gesignaleerd en gecorrigeerd.',
          'Procesdata wordt systematisch verzameld en geanalyseerd.',
          'Verbetermaatregelen worden geïmplementeerd op basis van data.'
        ]
      }
    ]
  },
  {
    id: 'document-control',
    number: '6',
    title: 'Documentbeheer',
    shortTitle: 'Documentbeheer',
    sections: [
      {
        id: 'document-management',
        title: 'Documentbeheer',
        suggestions: [
          'Alle documenten zijn gecontroleerd en goedgekeurd voor gebruik.',
          'Versiebeheer zorgt ervoor dat actuele documenten beschikbaar zijn.',
          'Verouderde documenten worden tijdig ingetrokken.',
          'Documentwijzigingen worden systematisch beheerd en gecommuniceerd.'
        ]
      }
    ]
  },
  {
    id: 'risk-management',
    number: '7',
    title: 'Risicomanagement',
    shortTitle: 'Risicomanagement',
    sections: [
      {
        id: 'risk-assessment',
        title: 'Risicobeoordeling',
        suggestions: [
          'Risico\'s en kansen worden systematisch geïdentificeerd.',
          'Risicobeoordelingen worden regelmatig uitgevoerd en bijgewerkt.',
          'Beheersmaatregelen zijn geïmplementeerd voor significante risico\'s.',
          'De effectiviteit van risicobeheersing wordt gemonitord.'
        ]
      }
    ]
  },
  {
    id: 'performance-indicators',
    number: '8',
    title: 'Prestatie-indicatoren',
    shortTitle: 'KPI\'s',
    sections: [
      {
        id: 'kpis',
        title: 'Prestatie-indicatoren',
        suggestions: [
          'KPI\'s zijn gedefinieerd voor alle kritieke processen.',
          'Meetresultaten worden regelmatig geanalyseerd en gerapporteerd.',
          'Trends worden geïdentificeerd en besproken in managementreviews.',
          'Correctieve acties worden genomen bij afwijkende prestaties.'
        ]
      }
    ]
  },
  {
    id: 'internal-audit',
    number: '9',
    title: 'Interne Audit',
    shortTitle: 'Audit',
    sections: [
      {
        id: 'audit-program',
        title: 'Auditprogramma',
        suggestions: [
          'Interne audits worden uitgevoerd volgens een jaarplanning.',
          'Auditors zijn competent en onafhankelijk van het geauditeerde gebied.',
          'Auditresultaten worden gerapporteerd aan het management.',
          'Correctieve acties worden opgevolgd tot effectieve implementatie.'
        ]
      }
    ]
  },
  {
    id: 'management-review',
    number: '10',
    title: 'Managementreview',
    shortTitle: 'Review',
    sections: [
      {
        id: 'review-process',
        title: 'Review Proces',
        suggestions: [
          'Managementreviews worden minimaal jaarlijks uitgevoerd.',
          'Alle relevante informatie wordt meegenomen in de review.',
          'Besluiten en acties worden gedocumenteerd en opgevolgd.',
          'De geschiktheid van het kwaliteitssysteem wordt beoordeeld.'
        ]
      }
    ]
  },
  {
    id: 'improvement',
    number: '11',
    title: 'Verbetering',
    shortTitle: 'Verbetering',
    sections: [
      {
        id: 'continuous-improvement',
        title: 'Continue Verbetering',
        suggestions: [
          'Continue verbetering is geïntegreerd in alle bedrijfsprocessen.',
          'Verbetervoorstellen van medewerkers worden aangemoedigd.',
          'Verbeterprojecten worden systematisch uitgevoerd en geëvalueerd.',
          'Geleerde lessen worden gedeeld binnen de organisatie.'
        ]
      }
    ]
  },
  {
    id: 'implementation',
    number: '12',
    title: 'Implementatie',
    shortTitle: 'Implementatie',
    sections: [
      {
        id: 'implementation-plan',
        title: 'Implementatieplan',
        suggestions: [
          'De implementatie volgt een gestructureerd plan met mijlpalen.',
          'Alle medewerkers ontvangen adequate training en ondersteuning.',
          'Voortgang wordt regelmatig gemonitord en bijgestuurd.',
          'Succesvolle implementatie wordt gevalideerd door interne audits.'
        ]
      }
    ]
  }
];

const PAGE_HEIGHT_PX = 1123; // A4 page height in pixels

export default function DocumentEditPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const { user, getDocument, updateDocument } = useUser();
  const quillRef = useRef<ReactQuill>(null);
  
  // Document state
  const [documentData, setDocumentData] = useState<any>(null);
  const [editorContent, setEditorContent] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showLayoutWarning, setShowLayoutWarning] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Chapter navigator state
  const [currentSidebarView, setCurrentSidebarView] = useState<'chapters' | 'sections'>('chapters');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  const [showDocumentAnalysis, setShowDocumentAnalysis] = useState(true);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hallo! Ik ben je AI-assistent voor documentbewerking. Ik kan je helpen met het herschrijven, verbeteren of uitbreiden van secties in je ISO document. Wat wil je dat ik voor je doe?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Resize state
  const [chatWidth, setChatWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  
  // Zoom state
  const [documentZoom, setDocumentZoom] = useState(100);
  
  // Document analysis state
  const [wordCount, setWordCount] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [emptySections, setEmptySections] = useState(0);
  const [lastModified, setLastModified] = useState<Date>(new Date());
  
  // Load document data
  useEffect(() => {
    if (documentId && user) {
      const doc = getDocument(documentId);
      if (doc) {
        setDocumentData(doc);
        setEditorContent(doc.editableContent || getDefaultContent(doc.type));
      }
    } else {
      // New document
      setEditorContent(getDefaultContent('ISO 9001'));
    }
  }, [documentId, user, getDocument]);

  // Calculate total pages based on content height
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const editorElement = editor.root;
      const contentHeight = editorElement.scrollHeight;
      const calculatedPages = Math.max(1, Math.ceil(contentHeight / PAGE_HEIGHT_PX));
      setTotalPages(calculatedPages);
    }
  }, [editorContent]);

  // Handle page navigation with smooth scrolling
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const editorElement = editor.root;
      const scrollTop = (currentPage - 1) * PAGE_HEIGHT_PX;
      editorElement.style.transform = `translateY(-${scrollTop}px)`;
    }
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        setCurrentPage(prev => Math.max(1, prev - 1));
      } else if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  // Update document analysis when content changes
  useEffect(() => {
    if (editorContent) {
      // Calculate word count (remove HTML tags)
      const textContent = editorContent.replace(/<[^>]*>/g, '');
      const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
      
      // Calculate completion percentage based on content sections
      const sections = editorContent.split('<h1>').length - 1;
      const filledSections = editorContent.split('<h1>').filter(section => 
        section.replace(/<[^>]*>/g, '').trim().length > 50
      ).length;
      
      const percentage = sections > 0 ? Math.round((filledSections / sections) * 100) : 0;
      setCompletionPercentage(percentage);
      setEmptySections(Math.max(0, sections - filledSections));
      setLastModified(new Date());
    }
  }, [editorContent]);

  const getDefaultContent = (type: string) => {
    // Page 1: Title Page
    let content = `
      <div style="page-break-after: always; text-align: center; min-height: ${PAGE_HEIGHT_PX}px; display: flex; flex-direction: column; justify-content: space-between; padding: 100px 40px 40px 40px; box-sizing: border-box;">
        <div>
          <h1 style="color: #1e40af; font-size: 28pt; font-weight: bold; margin-bottom: 20px;">${type} Managementsysteem</h1>
          <h2 style="color: #374151; font-size: 18pt; font-weight: normal; margin-bottom: 40px;">Kwaliteitshandboek</h2>
          <div style="border: 2px solid #e5e7eb; border-radius: 12px; padding: 40px; margin: 0 auto; max-width: 400px; background-color: #f9fafb;">
            <p style="font-size: 14pt; color: #374151; margin-bottom: 15px;"><strong>Organisatie:</strong></p>
            <p style="font-size: 12pt; color: #6b7280; margin-bottom: 25px;">[Bedrijfsnaam]</p>
            
            <p style="font-size: 14pt; color: #374151; margin-bottom: 15px;"><strong>Document Versie:</strong></p>
            <p style="font-size: 12pt; color: #6b7280; margin-bottom: 25px;">1.0</p>
            
            <p style="font-size: 14pt; color: #374151; margin-bottom: 15px;"><strong>Datum:</strong></p>
            <p style="font-size: 12pt; color: #6b7280; margin-bottom: 25px;">${new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <p style="font-size: 14pt; color: #374151; margin-bottom: 15px;"><strong>Status:</strong></p>
            <p style="font-size: 12pt; color: #059669; font-weight: bold;">Concept</p>
          </div>
        </div>
        
        <div>
          <p style="font-size: 10pt; color: #9ca3af; font-style: italic;">
            Dit document is gegenereerd met ISO Generator<br/>
            Vertrouwelijk - Alleen voor intern gebruik
          </p>
        </div>
      </div>
    `;

    // Page 2: Introduction
    const introChapter = ISO_9001_CHAPTERS.find(ch => ch.id === 'introduction');
    const introContent = introChapter?.sections[0]?.suggestions[0] || `Dit document beschrijft het ${type} managementsysteem van onze organisatie.`;
    
    content += `
      <div style="page-break-before: always; min-height: ${PAGE_HEIGHT_PX}px; padding: 40px; box-sizing: border-box;">
        <h1 style="color: #9639ef; font-size: 14pt; font-weight: bold; margin-bottom: 16px;">Inleiding</h1>
        <p style="font-size: 11pt; color: #4a4a4a; line-height: 1.6;">${introContent}</p>
      </div>
    `;

    // Pages 3+: Two chapters per page
    const numberedChapters = ISO_9001_CHAPTERS.filter(ch => ch.number && ch.number !== '');
    
    for (let i = 0; i < numberedChapters.length; i += 2) {
      content += `
        <div style="page-break-before: always; min-height: ${PAGE_HEIGHT_PX}px; padding: 40px; box-sizing: border-box;">
      `;
      
      // First chapter of the pair
      const firstChapter = numberedChapters[i];
      if (firstChapter) {
        const firstContent = firstChapter.sections[0]?.suggestions[0] || `Informatie over ${firstChapter.title.toLowerCase()}...`;
        content += `
          <h1 style="color: #9639ef; font-size: 14pt; font-weight: bold; margin-bottom: 16px;">${firstChapter.number}. ${firstChapter.title}</h1>
          <p style="font-size: 11pt; color: #4a4a4a; line-height: 1.6; margin-bottom: 32px;">${firstContent}</p>
        `;
      }
      
      // Second chapter of the pair (if exists)
      const secondChapter = numberedChapters[i + 1];
      if (secondChapter) {
        const secondContent = secondChapter.sections[0]?.suggestions[0] || `Informatie over ${secondChapter.title.toLowerCase()}...`;
        content += `
          <h1 style="color: #9639ef; font-size: 14pt; font-weight: bold; margin-bottom: 16px;">${secondChapter.number}. ${secondChapter.title}</h1>
          <p style="font-size: 11pt; color: #4a4a4a; line-height: 1.6;">${secondContent}</p>
        `;
      }
      
      content += `
        </div>
      `;
    }

    return content;
  };

  // Calculate chapter progress based on content
  const calculateChapterProgress = (chapterId: string, chapterTitle: string): 'empty' | 'partial' | 'complete' => {
    if (!editorContent) return 'empty';
    
    // Find the chapter heading in the content
    const headingPattern = new RegExp(`<h1[^>]*>${chapterTitle}</h1>`, 'i');
    const match = editorContent.match(headingPattern);
    
    if (!match) return 'empty';
    
    // Extract content from this heading to the next heading or end of document
    const startIndex = match.index! + match[0].length;
    const nextHeadingMatch = editorContent.slice(startIndex).match(/<h1[^>]*>/);
    const endIndex = nextHeadingMatch ? startIndex + nextHeadingMatch.index! : editorContent.length;
    
    const chapterContent = editorContent.slice(startIndex, endIndex);
    const textContent = chapterContent.replace(/<[^>]*>/g, '').trim();
    const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
    
    if (wordCount < 10) return 'empty';
    if (wordCount < 50) return 'partial';
    return 'complete';
  };

  const getProgressColor = (progress: 'empty' | 'partial' | 'complete') => {
    switch (progress) {
      case 'complete': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-orange-600 bg-orange-100';
      case 'empty': return 'text-gray-400 bg-gray-100';
    }
  };

  const getProgressIcon = (progress: 'empty' | 'partial' | 'complete') => {
    switch (progress) {
      case 'complete': return CheckCircle;
      case 'partial': return AlertTriangle;
      case 'empty': return Circle;
    }
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleInsertSuggestion = (suggestion: string) => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      const index = range ? range.index : quill.getLength();
      
      quill.insertText(index, suggestion + ' ');
      quill.setSelection(index + suggestion.length + 1);
    }
  };

  const handleDownloadPdf = () => {
    // Create print-optimized content for PDF generation
    const printContent = `
      <html>
        <head>
          <title>${documentData?.title || 'Document'}</title>
          <style>
            @page { margin: 2cm; }
            body { 
              font-family: 'Poppins', Arial, sans-serif; 
              margin: 0; 
              line-height: 1.6;
              color: #374151;
            }
            h1 { color: #9639ef; font-size: 14pt; font-weight: bold; }
            h2 { color: #595959; font-size: 11pt; font-weight: bold; }
            p { font-size: 11pt; color: #4a4a4a; line-height: 1.6; }
            .page-break { page-break-before: always; }
          </style>
        </head>
        <body>
          ${editorContent}
        </body>
      </html>
    `;
    
    // Open print dialog for PDF generation
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
    setShowDownloadDropdown(false);
  };

  const handleDownloadWord = () => {
    // Export as HTML file with .doc extension for Word compatibility
    const wordContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${documentData?.title || 'Document'}</title>
          <style>
            body { font-family: 'Poppins', Arial, sans-serif; margin: 40px; }
            h1 { color: #9639ef; font-size: 14pt; font-weight: bold; }
            h2 { color: #595959; font-size: 11pt; font-weight: bold; }
            p { font-size: 11pt; color: #4a4a4a; line-height: 1.6; }
          </style>
        </head>
        <body>
          ${editorContent}
        </body>
      </html>
    `;
    
    const blob = new Blob([wordContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentData?.title || 'Document'}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowDownloadDropdown(false);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${documentData?.title || 'Document'}</title>
            <style>
              @page { margin: 2cm; }
              body { 
                font-family: 'Poppins', Arial, sans-serif; 
                margin: 0; 
                line-height: 1.6;
                color: #374151;
              }
              h1 { color: #9639ef; font-size: 14pt; font-weight: bold; }
              h2 { color: #595959; font-size: 11pt; font-weight: bold; }
              p { font-size: 11pt; color: #4a4a4a; line-height: 1.6; }
              .page-break { page-break-before: always; }
            </style>
          </head>
          <body>
            ${editorContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
    setShowDownloadDropdown(false);
  };

  const handleSaveAsTemplate = () => {
    // Simulate saving as template (would require backend integration)
    alert(`Document "${documentData?.title || 'Nieuw Document'}" opgeslagen als template!`);
    setShowDownloadDropdown(false);
  };

  const handleChapterClick = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setCurrentSidebarView('sections');
  };

  const handleBackToChapters = () => {
    setCurrentSidebarView('chapters');
    setSelectedChapterId('');
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddNewPage = () => {
    const newContent = editorContent + '\n\n<div style="page-break-before: always;"></div>\n\n<h1 style="color: #9639ef; font-size: 14pt; font-weight: bold;">Nieuwe Sectie</h1>\n<p style="font-size: 11pt; color: #4a4a4a;">Begin hier met typen...</p>';
    setEditorContent(newContent);
  };

  // Chat functions
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Ik kan je helpen met het herschrijven van die sectie. Hier is een verbeterde versie:",
        "Laat me die tekst voor je verbeteren en meer professioneel maken:",
        "Ik zie wat je bedoelt. Hier is een herziene versie die beter aansluit bij ISO standaarden:",
        "Goede vraag! Hier is een uitgebreidere en duidelijkere versie:",
        "Ik kan die sectie voor je uitbreiden met meer detail en professionaliteit:"
      ];

      const suggestions = [
        "Deze sectie beschrijft de kernprocessen van onze organisatie en hoe deze bijdragen aan het behalen van onze kwaliteitsdoelstellingen. Alle processen zijn geïdentificeerd, gedocumenteerd en worden regelmatig geëvalueerd voor continue verbetering.",
        "Onze organisatie heeft een gestructureerde aanpak voor het beheren van documenten en records. Dit omvat het identificeren, goedkeuren, distribueren, beheren en archiveren van alle relevante documenten volgens vastgestelde procedures.",
        "Het risicomanagementproces is geïntegreerd in alle bedrijfsactiviteiten en omvat de systematische identificatie, beoordeling, beheersing en monitoring van risico's en kansen die van invloed kunnen zijn op het behalen van onze doelstellingen.",
        "Deze sectie beschrijft hoe wij de effectiviteit van ons kwaliteitsmanagementsysteem meten en monitoren. We gebruiken verschillende prestatie-indicatoren en voeren regelmatig managementreviews uit om continue verbetering te waarborgen.",
        "Onze interne auditprocedure zorgt ervoor dat het kwaliteitsmanagementsysteem regelmatig wordt geëvalueerd op geschiktheid, toereikendheid en effectiviteit. Audits worden uitgevoerd door gekwalificeerde en onafhankelijke auditors."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant' as const,
        content: `${randomResponse}\n\n"${randomSuggestion}"\n\nWil je dat ik deze tekst in je document invoeg, of wil je dat ik iets anders aanpas?`,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Zoom functions
  const handleZoomIn = () => {
    setDocumentZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setDocumentZoom(prev => Math.max(prev - 10, 50));
  };

  const handleZoomReset = () => {
    setDocumentZoom(100);
  };

  // Resize functions
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const newWidth = window.innerWidth - e.clientX;
    const clampedWidth = Math.max(250, Math.min(600, newWidth));
    setChatWidth(clampedWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'ordered',
    'indent',
    'color', 'background',
    'align',
    'link'
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Terug naar Dashboard</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            <h1 className="text-xl font-semibold text-[#454545]">
              ISO 9001 Document Editor
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                disabled={documentZoom <= 50}
                className="p-1.5 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
                title="Zoom uit"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-2 text-sm font-medium min-w-[3rem] text-center">
                {documentZoom}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={documentZoom >= 200}
                className="p-1.5 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
                title="Zoom in"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomReset}
                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                title="Reset zoom"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Download Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showDownloadDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                    <FileDown className="w-4 h-4" />
                    <span>Download als PDF</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Download als Word</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Fixed Height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Pages */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Pages Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#454545] flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Pagina's
              </h2>
              <button
                onClick={handleAddNewPage}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Nieuwe pagina toevoegen"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Pages List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {ISO_9001_CHAPTERS.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => handlePageClick(index)}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    currentPage === index
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">
                        {chapter.number && `${chapter.number}. `}{chapter.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {chapter.sections.length} secties
                      </div>
                    </div>
                    {currentPage === index && (
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Document Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Document Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#454545]">
                {ISO_9001_CHAPTERS[currentPage]?.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{wordCount.toLocaleString()} woorden</span>
                <span>•</span>
                <span>{completionPercentage}% voltooid</span>
              </div>
            </div>
          </div>

          {/* Document Content - Scrollable with Zoom */}
          <div className="flex-1 overflow-auto bg-gray-100 p-4">
            <div 
              className="bg-white shadow-lg mx-auto"
              style={{ 
                width: '210mm',
                minHeight: '297mm',
                transform: `scale(${documentZoom / 100})`,
                transformOrigin: 'top center',
                marginBottom: `${(documentZoom - 100) * 2}px`
              }}
            >
              <div className="p-8">
                <ReactQuill
                  value={editorContent}
                  onChange={setEditorContent}
                  modules={modules}
                  formats={formats}
                  placeholder="Begin met typen..."
                  style={{ 
                    height: 'calc(297mm - 4rem)',
                    border: 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Chat */}
        <div className="relative">
          {/* Resize Handle */}
          <div
            className={`absolute left-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors ${
              isResizing ? 'bg-blue-500' : 'bg-gray-200'
            }`}
            onMouseDown={handleMouseDown}
          />
          
          {/* Chat Sidebar */}
          <div 
            className="bg-white border-l border-gray-200 flex flex-col h-full"
            style={{ width: `${chatWidth}px` }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
                    <p className="text-sm text-gray-500">Document Editor</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[85%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-br from-blue-600 to-indigo-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message */}
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-900 border border-gray-200'
                    }`}>
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </div>
                      
                      {/* Message Actions */}
                      {message.type === 'assistant' && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => copyToClipboard(message.content)}
                              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                              title="Kopiëren"
                            >
                              <Copy className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                              <ThumbsUp className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                              <ThumbsDown className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                          <div className="text-xs text-gray-400">
                            {message.timestamp.toLocaleTimeString('nl-NL', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      )}
                      
                      {message.type === 'user' && (
                        <div className="text-xs text-blue-100 mt-2">
                          {message.timestamp.toLocaleTimeString('nl-NL', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
              <div className="relative">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Stel een vraag over je document..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isTyping}
                  className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {[
                    "Herschrijf deze sectie",
                    "Maak professioneler",
                    "Voeg detail toe",
                    "Verbeter structuur"
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setChatInput(action)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs transition-colors border border-gray-200"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}