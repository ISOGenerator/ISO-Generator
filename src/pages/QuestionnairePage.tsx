import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Download, Bot, User, Send, CheckCircle, Clock, Edit3, MessageSquare, FileText, GripVertical } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export default function QuestionnairePage() {
  const { isoType, documentId } = useParams<{ isoType: string; documentId?: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const resizeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50); // Percentage
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [chatMode, setChatMode] = useState<'generator' | 'rewriter'>('generator');
  const [selectedText, setSelectedText] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hallo! Ik ga je helpen met het maken van je complete ISO 9001:2015 kwaliteitshandboek. Laten we beginnen met de eerste vraag:',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'assistant',
      content: 'Wat is de volledige naam van uw bedrijf?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [documentContent, setDocumentContent] = useState(`
    <div style="text-align: center; padding: 80px 40px; min-height: 297mm; display: flex; flex-direction: column; justify-content: center;">
      <h1 style="color: #1e40af; font-size: 32pt; font-weight: bold; margin-bottom: 30px; line-height: 1.2;">ISO 9001:2015<br/>Kwaliteitsmanagementsysteem</h1>
      <h2 style="color: #374151; font-size: 20pt; font-weight: normal; margin-bottom: 60px;">Kwaliteitshandboek</h2>
      
      <div style="border: 3px solid #2563eb; border-radius: 16px; padding: 50px; margin: 0 auto; max-width: 500px; background: linear-gradient(135deg, #f8faff 0%, #e0f2fe 100%); box-shadow: 0 20px 40px rgba(37, 99, 235, 0.1);">
        <div style="display: grid; gap: 30px; text-align: left;">
          <div>
            <p style="font-size: 16pt; color: #1e40af; font-weight: bold; margin-bottom: 8px;">Organisatie:</p>
            <p style="font-size: 14pt; color: #374151; margin-bottom: 0;">[BEDRIJFSNAAM]</p>
          </div>
          <div>
            <p style="font-size: 16pt; color: #1e40af; font-weight: bold; margin-bottom: 8px;">Adres:</p>
            <p style="font-size: 14pt; color: #374151; margin-bottom: 0;">[BEDRIJFSADRES]</p>
          </div>
          <div>
            <p style="font-size: 16pt; color: #1e40af; font-weight: bold; margin-bottom: 8px;">Document Versie:</p>
            <p style="font-size: 14pt; color: #374151; margin-bottom: 0;">1.0</p>
          </div>
          <div>
            <p style="font-size: 16pt; color: #1e40af; font-weight: bold; margin-bottom: 8px;">Datum:</p>
            <p style="font-size: 14pt; color: #374151; margin-bottom: 0;">${new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div>
            <p style="font-size: 16pt; color: #1e40af; font-weight: bold; margin-bottom: 8px;">Status:</p>
            <p style="font-size: 14pt; color: #059669; font-weight: bold; margin-bottom: 0;">Goedgekeurd</p>
          </div>
          <div>
            <p style="font-size: 16pt; color: #1e40af; font-weight: bold; margin-bottom: 8px;">Goedgekeurd door:</p>
            <p style="font-size: 14pt; color: #374151; margin-bottom: 0;">[DIRECTEUR_NAAM]</p>
            <p style="font-size: 12pt; color: #6b7280; margin-top: 4px;">Algemeen Directeur</p>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 60px;">
        <p style="font-size: 12pt; color: #6b7280; font-style: italic; line-height: 1.6;">
          Dit kwaliteitshandboek beschrijft het kwaliteitsmanagementsysteem van [BEDRIJFSNAAM]<br/>
          conform de eisen van ISO 9001:2015<br/>
          <br/>
          <strong>Vertrouwelijk - Alleen voor intern gebruik</strong>
        </p>
      </div>
    </div>

    <div style="page-break-before: always; padding: 40px; min-height: 297mm;">
      <h1 style="color: #1e40af; font-size: 18pt; font-weight: bold; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">Inhoudsopgave</h1>
      
      <div style="font-size: 12pt; line-height: 2; color: #374151;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0;">
          <span><strong>1. Inleiding</strong></span>
          <span>3</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>1.1 Doel van dit handboek</span>
          <span>3</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>1.2 Toepassingsgebied</span>
          <span>3</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; margin-top: 10px;">
          <span><strong>2. Organisatieprofiel</strong></span>
          <span>4</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>2.1 Bedrijfsinformatie</span>
          <span>4</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>2.2 Organisatiestructuur</span>
          <span>4</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>2.3 Producten en diensten</span>
          <span>5</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; margin-top: 10px;">
          <span><strong>3. Kwaliteitsbeleid en -doelstellingen</strong></span>
          <span>6</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>3.1 Kwaliteitsbeleid</span>
          <span>6</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>3.2 Kwaliteitsdoelstellingen</span>
          <span>7</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; margin-top: 10px;">
          <span><strong>4. Kwaliteitsmanagementsysteem</strong></span>
          <span>8</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>4.1 Algemene eisen</span>
          <span>8</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>4.2 Documentatie-eisen</span>
          <span>8</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>4.3 Procesaanpak</span>
          <span>9</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; margin-top: 10px;">
          <span><strong>5. Verantwoordelijkheid van het management</strong></span>
          <span>10</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>5.1 Managementbetrokkenheid</span>
          <span>10</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>5.2 Klantgerichtheid</span>
          <span>10</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>5.3 Verantwoordelijkheden en bevoegdheden</span>
          <span>11</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; margin-top: 10px;">
          <span><strong>6. Beheer van middelen</strong></span>
          <span>12</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>6.1 Terbeschikkingstelling van middelen</span>
          <span>12</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>6.2 Personeel</span>
          <span>12</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>6.3 Infrastructuur</span>
          <span>13</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; margin-top: 10px;">
          <span><strong>7. Productrealisatie</strong></span>
          <span>14</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>7.1 Planning van productrealisatie</span>
          <span>14</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>7.2 Klantgerelateerde processen</span>
          <span>15</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>7.3 Ontwerp en ontwikkeling</span>
          <span>16</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>7.4 Inkoop</span>
          <span>17</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>7.5 Productie en dienstverlening</span>
          <span>18</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; margin-top: 10px;">
          <span><strong>8. Meting, analyse en verbetering</strong></span>
          <span>19</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>8.1 Algemeen</span>
          <span>19</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>8.2 Bewaking en meting</span>
          <span>19</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>8.3 Beheersing van afwijkend product</span>
          <span>21</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>8.4 Analyse van gegevens</span>
          <span>21</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>8.5 Verbetering</span>
          <span>22</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; margin-top: 10px;">
          <span><strong>9. Bijlagen</strong></span>
          <span>23</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>9.1 Organisatieschema</span>
          <span>23</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>9.2 Processchema</span>
          <span>24</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 8px 0; padding-left: 20px;">
          <span>9.3 Documentenlijst</span>
          <span>25</span>
        </div>
      </div>
    </div>

    <div style="page-break-before: always; padding: 40px; min-height: 297mm;">
      <h1 style="color: #1e40af; font-size: 18pt; font-weight: bold; margin-bottom: 20px; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">1. Inleiding</h1>
      
      <h2 style="color: #374151; font-size: 14pt; font-weight: bold; margin: 25px 0 15px 0;">1.1 Doel van dit handboek</h2>
      <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
        Dit handboek is bedoeld om te laten zien hoe we kwaliteit waarborgen. We willen dat onze klanten tevreden zijn en dat onze processen goed lopen. Het handboek helpt ons om consistent te werken en problemen te voorkomen. We volgen de regels van ISO 9001:2015 om ervoor te zorgen dat alles goed gaat.
      </p>
      <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
        Het handboek toont aan hoe [BEDRIJFSNAAM] voldoet aan de eisen van ISO 9001:2015 en beschrijft de processen, procedures en verantwoordelijkheden die nodig zijn om consistente kwaliteit te leveren aan onze klanten. Het handboek wordt regelmatig geëvalueerd en bijgewerkt om ervoor te zorgen dat het actueel en effectief blijft.
      </p>
      
      <h2 style="color: #374151; font-size: 14pt; font-weight: bold; margin: 25px 0 15px 0;">1.2 Toepassingsgebied</h2>
      <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
        Het kwaliteitsmanagementsysteem van [BEDRIJFSNAAM] is van toepassing op [TOEPASSINGSGEBIED]. Het systeem omvat alle activiteiten die van invloed zijn op de kwaliteit van onze [PRODUCTEN_DIENSTEN] en de tevredenheid van onze klanten.
      </p>
      <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
        Het toepassingsgebied omvat de locatie(s) [LOCATIES] en alle processen die betrokken zijn bij [KERNPROCESSEN]. Eventuele uitsluitingen van ISO 9001:2015 eisen zijn gebaseerd op de aard van onze organisatie en producten/diensten en zijn volledig gerechtvaardigd.
      </p>
      
      <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-left: 4px solid #2563eb; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
        <p style="font-size: 11pt; color: #1e40af; line-height: 1.6; margin: 0; font-weight: 500;">
          <strong>Opmerking:</strong> Dit handboek is een levend document dat regelmatig wordt bijgewerkt om wijzigingen in onze organisatie, processen en de ISO 9001 norm te reflecteren. De meest actuele versie is altijd beschikbaar via [DOCUMENTBEHEERSYSTEEM].
        </p>
      </div>
    </div>

    <div style="page-break-before: always; padding: 40px; min-height: 297mm;">
      <h1 style="color: #1e40af; font-size: 18pt; font-weight: bold; margin-bottom: 20px; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">2. Organisatieprofiel</h1>
      
      <h2 style="color: #374151; font-size: 14pt; font-weight: bold; margin: 25px 0 15px 0;">2.1 Bedrijfsinformatie</h2>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        <table style="width: 100%; font-size: 11pt; color: #374151; line-height: 1.6;">
          <tr>
            <td style="font-weight: bold; width: 30%; padding: 8px 0; vertical-align: top;">Bedrijfsnaam:</td>
            <td style="padding: 8px 0;">[BEDRIJFSNAAM]</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0; vertical-align: top;">Adres:</td>
            <td style="padding: 8px 0;">[BEDRIJFSADRES]<br/>[POSTCODE] [PLAATS]</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0; vertical-align: top;">Telefoon:</td>
            <td style="padding: 8px 0;">[TELEFOONNUMMER]</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0; vertical-align: top;">E-mail:</td>
            <td style="padding: 8px 0;">[EMAIL]</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0; vertical-align: top;">Website:</td>
            <td style="padding: 8px 0;">[WEBSITE]</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0; vertical-align: top;">KvK nummer:</td>
            <td style="padding: 8px 0;">[KVK_NUMMER]</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0; vertical-align: top;">Opgericht:</td>
            <td style="padding: 8px 0;">[OPRICHTINGSDATUM]</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px 0; vertical-align: top;">Aantal medewerkers:</td>
            <td style="padding: 8px 0;">[AANTAL_MEDEWERKERS]</td>
          </tr>
        </table>
      </div>
      
      <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
        [BEDRIJFSNAAM] is gespecialiseerd in [SPECIALISATIE] en biedt [PRODUCTEN_DIENSTEN] aan [DOELGROEP]. Sinds onze oprichting in [OPRICHTINGSJAAR] hebben we ons ontwikkeld tot een betrouwbare partner voor onze klanten door [KERNWAARDEN] centraal te stellen in al onze activiteiten.
      </p>
      
      <h2 style="color: #374151; font-size: 14pt; font-weight: bold; margin: 25px 0 15px 0;">2.2 Organisatiestructuur</h2>
      <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
        Onze organisatie heeft een [ORGANISATIESTRUCTUUR] met duidelijk gedefinieerde rollen en verantwoordelijkheden. De algemeen directeur, [DIRECTEUR_NAAM], is eindverantwoordelijk voor het kwaliteitsmanagementsysteem en heeft de kwaliteitsmanager, [KWALITEITSMANAGER_NAAM], aangesteld om het systeem te beheren en te onderhouden.
      </p>
      
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        <h3 style="color: #1e40af; font-size: 12pt; font-weight: bold; margin-bottom: 15px;">Sleutelposities:</h3>
        <ul style="font-size: 11pt; color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;"><strong>Algemeen Directeur:</strong> [DIRECTEUR_NAAM] - Eindverantwoordelijkheid voor QMS</li>
          <li style="margin-bottom: 8px;"><strong>Kwaliteitsmanager:</strong> [KWALITEITSMANAGER_NAAM] - Beheer en onderhoud QMS</li>
          <li style="margin-bottom: 8px;"><strong>Operationeel Manager:</strong> [OPERATIONEEL_MANAGER] - Dagelijkse operaties</li>
          <li style="margin-bottom: 8px;"><strong>Hoofd Verkoop:</strong> [HOOFD_VERKOOP] - Klantrelaties en contracten</li>
          <li style="margin-bottom: 8px;"><strong>Hoofd Productie:</strong> [HOOFD_PRODUCTIE] - Productie en kwaliteitscontrole</li>
        </ul>
      </div>
      
      <h2 style="color: #374151; font-size: 14pt; font-weight: bold; margin: 25px 0 15px 0;">2.3 Producten en diensten</h2>
      <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
        [BEDRIJFSNAAM] levert de volgende producten en/of diensten aan haar klanten:
      </p>
      
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 4px solid #16a34a; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
        <ul style="font-size: 11pt; color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">[PRODUCT_DIENST_1] - [BESCHRIJVING_1]</li>
          <li style="margin-bottom: 8px;">[PRODUCT_DIENST_2] - [BESCHRIJVING_2]</li>
          <li style="margin-bottom: 8px;">[PRODUCT_DIENST_3] - [BESCHRIJVING_3]</li>
          <li style="margin-bottom: 8px;">[PRODUCT_DIENST_4] - [BESCHRIJVING_4]</li>
        </ul>
      </div>
      
      <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
        Onze klanten zijn voornamelijk [KLANTTYPE] in de sectoren [SECTOREN]. We bedienen zowel [MARKTTYPE] en hebben een sterke reputatie opgebouwd op het gebied van [STERKE_PUNTEN].
      </p>
    </div>
  `);
  
  const getISOInfo = () => {
    switch (isoType) {
      case '9001':
        return { name: 'ISO 9001', title: 'Kwaliteitsmanagement', icon: Award, color: 'blue' };
      case '27001':
        return { name: 'ISO 27001', title: 'Informatiebeveiliging', icon: Award, color: 'purple' };
      case '14001':
        return { name: 'ISO 14001', title: 'Milieumanagement', icon: Award, color: 'green' };
      default:
        return { name: 'ISO 9001', title: 'Kwaliteitsmanagement', icon: Award, color: 'blue' };
    }
  };

  const isoInfo = getISOInfo();

  const questions = [
    "Wat is de volledige naam van uw bedrijf?",
    "Wat is het adres van uw hoofdvestiging?",
    "Wat zijn de belangrijkste producten of diensten die u levert?",
    "Wie zijn uw belangrijkste klanten of doelgroepen?",
    "Hoeveel medewerkers heeft uw organisatie?",
    "Wat is uw specialisatie of kernactiviteit?",
    "In welke sectoren bent u actief?",
    "Wat zijn uw belangrijkste kwaliteitsdoelstellingen?",
    "Welke processen zijn het meest kritiek voor uw organisatie?",
    "Wie is de algemeen directeur van uw organisatie?",
    "Wie zal de kwaliteitsmanager zijn?",
    "Hoe meet u klanttevredenheid?",
    "Wat is uw aanpak voor continue verbetering?",
    "Welke certificeringen heeft u al?",
    "Wat zijn uw sterke punten als organisatie?",
    "Wat zijn de verplichte documenten en vastgelegde informatie die we nodig hebben om te voldoen aan ISO 9001:2015?"
  ];

  // Handle text selection in document
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const selectedText = selection.toString();
      setSelectedText(selectedText);
      setChatMode('rewriter');
      
      // Add message about selected text
      const selectionMessage = {
        id: Date.now().toString(),
        type: 'assistant' as const,
        content: `Ik zie dat u deze tekst heeft geselecteerd: "${selectedText}"\n\nHoe wilt u dat ik deze tekst verbeter? U kunt bijvoorbeeld vragen om:\n• Professioneler maken\n• Uitbreiden met meer detail\n• Herformuleren voor duidelijkheid\n• Aanpassen aan ISO standaarden`,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, selectionMessage]);
    }
  };

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

    if (chatMode === 'generator') {
      // Store answer and update document
      setAnswers(prev => ({ ...prev, [currentQuestion]: chatInput }));
      
      // Update document with user's answer
      let updatedContent = documentContent;
      
      // Replace placeholders based on question
      switch (currentQuestion) {
        case 0: // Bedrijfsnaam
          updatedContent = updatedContent.replace(/\[BEDRIJFSNAAM\]/g, chatInput);
          break;
        case 1: // Adres
          updatedContent = updatedContent.replace(/\[BEDRIJFSADRES\]/g, chatInput);
          break;
        case 2: // Producten/diensten
          updatedContent = updatedContent.replace(/\[PRODUCTEN_DIENSTEN\]/g, chatInput);
          break;
        case 3: // Klanten
          updatedContent = updatedContent.replace(/\[DOELGROEP\]/g, chatInput);
          break;
        case 4: // Aantal medewerkers
          updatedContent = updatedContent.replace(/\[AANTAL_MEDEWERKERS\]/g, chatInput);
          break;
        case 5: // Specialisatie
          updatedContent = updatedContent.replace(/\[SPECIALISATIE\]/g, chatInput);
          break;
        case 6: // Sectoren
          updatedContent = updatedContent.replace(/\[SECTOREN\]/g, chatInput);
          break;
        case 9: // Directeur
          updatedContent = updatedContent.replace(/\[DIRECTEUR_NAAM\]/g, chatInput);
          break;
        case 10: // Kwaliteitsmanager
          updatedContent = updatedContent.replace(/\[KWALITEITSMANAGER_NAAM\]/g, chatInput);
          break;
        case 15: // Verplichte documenten
          // Add a new section to the document about required documents
          const requiredDocsSection = `
            <div style="page-break-before: always; padding: 40px; min-height: 297mm;">
              <h1 style="color: #1e40af; font-size: 18pt; font-weight: bold; margin-bottom: 20px; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">Verplichte Documenten en Vastgelegde Informatie ISO 9001:2015</h1>
              
              <h2 style="color: #374151; font-size: 14pt; font-weight: bold; margin: 25px 0 15px 0;">Verplichte Documenten</h2>
              <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
                Volgens ISO 9001:2015 zijn de volgende documenten verplicht:
              </p>
              
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #1e40af; font-size: 12pt; font-weight: bold; margin-bottom: 15px;">1. Kwaliteitshandboek</h3>
                <p style="font-size: 11pt; color: #374151; line-height: 1.6; margin-bottom: 10px;">
                  Het kwaliteitshandboek beschrijft het kwaliteitsmanagementsysteem en hoe dit voldoet aan de eisen van ISO 9001:2015. Het moet de volgende elementen bevatten:
                </p>
                <ul style="font-size: 11pt; color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 5px;">Toepassingsgebied van het kwaliteitsmanagementsysteem</li>
                  <li style="margin-bottom: 5px;">Documentatie van de processen en hun onderlinge samenhang</li>
                  <li style="margin-bottom: 5px;">Interactie tussen de processen van het kwaliteitsmanagementsysteem</li>
                  <li style="margin-bottom: 5px;">Kwaliteitsbeleid en kwaliteitsdoelstellingen</li>
                </ul>
              </div>
              
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #1e40af; font-size: 12pt; font-weight: bold; margin-bottom: 15px;">2. Vastgelegde Informatie</h3>
                <p style="font-size: 11pt; color: #374151; line-height: 1.6; margin-bottom: 10px;">
                  De volgende vastgelegde informatie is verplicht volgens ISO 9001:2015:
                </p>
                <ul style="font-size: 11pt; color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 5px;"><strong>Kwaliteitsbeleid:</strong> Verklaring van de intenties en richting van de organisatie</li>
                  <li style="margin-bottom: 5px;"><strong>Kwaliteitsdoelstellingen:</strong> Doelstellingen die consistent zijn met het kwaliteitsbeleid</li>
                  <li style="margin-bottom: 5px;"><strong>Rol, verantwoordelijkheid en bevoegdheid:</strong> Duidelijke toewijzing van verantwoordelijkheden</li>
                  <li style="margin-bottom: 5px;"><strong>Competentie van personen:</strong> Bewijs van competentie van personen die werk uitvoeren</li>
                  <li style="margin-bottom: 5px;"><strong>Klantgerelateerde processen:</strong> Resultaten van de beoordeling van klantvereisten</li>
                  <li style="margin-bottom: 5px;"><strong>Design en ontwikkeling:</strong> Inputs, outputs, reviews, verificatie en validatie</li>
                  <li style="margin-bottom: 5px;"><strong>Inkoop:</strong> Evaluatie van leveranciers en resultaten van evaluaties</li>
                  <li style="margin-bottom: 5px;"><strong>Productie en dienstverlening:</strong> Kenmerken van producten en diensten</li>
                  <li style="margin-bottom: 5px;"><strong>Bewaking en meting:</strong> Kalibratie van meetapparatuur</li>
                  <li style="margin-bottom: 5px;"><strong>Interne audits:</strong> Resultaten van interne audits</li>
                  <li style="margin-bottom: 5px;"><strong>Managementreview:</strong> Resultaten van managementreviews</li>
                  <li style="margin-bottom: 5px;"><strong>Afwijkend product:</strong> Beschrijving van afwijkingen en genomen maatregelen</li>
                  <li style="margin-bottom: 5px;"><strong>Correctieve maatregelen:</strong> Resultaten van correctieve maatregelen</li>
                </ul>
              </div>
              
              <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-left: 4px solid #2563eb; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <p style="font-size: 11pt; color: #1e40af; line-height: 1.6; margin: 0; font-weight: 500;">
                  <strong>Belangrijke opmerking:</strong> De vastgelegde informatie moet worden beheerd volgens de eisen van paragraaf 7.5 van ISO 9001:2015, inclusief identificatie, beschrijving, format, distributie en toegankelijkheid.
                </p>
              </div>
              
              <h2 style="color: #374151; font-size: 14pt; font-weight: bold; margin: 25px 0 15px 0;">Aanbevolen Documenten</h2>
              <p style="font-size: 11pt; color: #374151; line-height: 1.8; margin-bottom: 20px; text-align: justify;">
                Hoewel niet verplicht, worden de volgende documenten sterk aanbevolen voor een effectief kwaliteitsmanagementsysteem:
              </p>
              
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <ul style="font-size: 11pt; color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 5px;">Procedures voor kritieke processen</li>
                  <li style="margin-bottom: 5px;">Werkinstructies voor complexe taken</li>
                  <li style="margin-bottom: 5px;">Formulieren en checklists</li>
                  <li style="margin-bottom: 5px;">Risico- en kansbeoordelingen</li>
                  <li style="margin-bottom: 5px;">Klanttevredenheidsonderzoeken</li>
                  <li style="margin-bottom: 5px;">Leverancierevaluaties</li>
                  <li style="margin-bottom: 5px;">Training en competentieplannen</li>
                  <li style="margin-bottom: 5px;">Correctieve en preventieve actieplannen</li>
                </ul>
              </div>
            </div>
          `;
          
          // Insert the new section before the last closing div
          const lastDivIndex = updatedContent.lastIndexOf('</div>');
          if (lastDivIndex !== -1) {
            updatedContent = updatedContent.slice(0, lastDivIndex) + requiredDocsSection + updatedContent.slice(lastDivIndex);
          }
          break;
      }
      
      setDocumentContent(updatedContent);

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          const nextQuestion = questions[currentQuestion + 1];
          const assistantMessage = {
            id: (Date.now() + 1).toString(),
            type: 'assistant' as const,
            content: `Perfect! Ik heb uw antwoord verwerkt in het document. ${nextQuestion}`,
            timestamp: new Date()
          };
          setChatMessages(prev => [...prev, assistantMessage]);
          setCurrentQuestion(prev => prev + 1);
        } else {
          const assistantMessage = {
            id: (Date.now() + 1).toString(),
            type: 'assistant' as const,
            content: 'Uitstekend! Ik heb alle informatie verwerkt. Uw ISO 9001:2015 kwaliteitshandboek is nu volledig gepersonaliseerd en klaar. U kunt nu tekst selecteren in het document en mij vragen om specifieke secties te herschrijven of verbeteren!',
            timestamp: new Date()
          };
          setChatMessages(prev => [...prev, assistantMessage]);
        }
        setIsTyping(false);
      }, 1500);
    } else {
      // AI Assistant logic - both rewriting and Q&A
      setTimeout(() => {
        const userInput = chatInput.toLowerCase();
        
        // Check if it's a question about ISO 9001 or quality management
        if (userInput.includes('iso') || userInput.includes('kwaliteit') || userInput.includes('management') || 
            userInput.includes('proces') || userInput.includes('certificering') || userInput.includes('audit') ||
            userInput.includes('documentatie') || userInput.includes('handboek') || userInput.includes('beleid') ||
            userInput.includes('doelstelling') || userInput.includes('risico') || userInput.includes('verbetering') ||
            userInput.includes('verplicht') || userInput.includes('document') || userInput.includes('vastgelegd')) {
          
          // ISO 9001 Q&A responses
          const isoResponses = [
            "ISO 9001:2015 vereist een kwaliteitshandboek dat het kwaliteitsmanagementsysteem beschrijft en hoe dit voldoet aan de norm. Verplichte vastgelegde informatie omvat: kwaliteitsbeleid en -doelstellingen, rol en verantwoordelijkheden, competentie van personen, klantgerelateerde processen, design en ontwikkeling, inkoop, productie en dienstverlening, bewaking en meting, interne audits, managementreview, afwijkend product, en correctieve maatregelen. Daarnaast zijn procedures voor documentbeheer, beheersing van vastgelegde informatie, interne audits, beheersing van afwijkend product, en correctieve maatregelen verplicht.",
            "De verplichte documenten voor ISO 9001:2015 zijn: 1) Kwaliteitshandboek - beschrijft het QMS en toepassingsgebied, 2) Kwaliteitsbeleid - verklaring van intenties, 3) Kwaliteitsdoelstellingen - meetbare doelen, 4) Procedures voor documentbeheer, 5) Procedures voor beheersing van vastgelegde informatie, 6) Procedures voor interne audits, 7) Procedures voor beheersing van afwijkend product, 8) Procedures voor correctieve maatregelen. Alle documenten moeten worden beheerd volgens paragraaf 7.5 van de norm.",
            "ISO 9001:2015 heeft minder verplichte documenten dan de vorige versie, maar vereist nog steeds vastgelegde informatie voor: kwaliteitsbeleid en doelstellingen, competentie van personeel, klantvereisten en hun beoordeling, design en ontwikkelingsinputs/outputs, leverancierevaluaties, product- en dienstkenmerken, kalibratie van meetapparatuur, auditresultaten, managementreviewresultaten, en correctieve acties. Het kwaliteitshandboek blijft verplicht maar kan compacter zijn.",
            "Voor ISO 9001:2015 certificering moet u minimaal documenteren: uw kwaliteitshandboek, uw kwaliteitsbeleid, uw kwaliteitsdoelstellingen, en procedures voor documentbeheer, interne audits, beheersing van afwijkend product, en correctieve maatregelen. Daarnaast moet u vastleggen: competentie van personeel, klantvereisten, design en ontwikkelingsresultaten, leverancierevaluaties, productkenmerken, kalibratiegegevens, auditresultaten, managementreviewresultaten, en genomen correctieve acties. De focus ligt op 'vastgelegde informatie' in plaats van alleen documenten.",
            "ISO 9001:2015 vereist een risicogebaseerde benadering waarbij u moet vastleggen hoe u risico's en kansen beheert. Verplichte documenten zijn: kwaliteitshandboek, kwaliteitsbeleid, kwaliteitsdoelstellingen, en procedures voor documentbeheer, interne audits, beheersing van afwijkend product, en correctieve maatregelen. Vastgelegde informatie moet omvatten: competentie van personeel, klantvereisten, design en ontwikkelingsresultaten, leverancierevaluaties, productkenmerken, kalibratiegegevens, auditresultaten, managementreviewresultaten, en correctieve acties. Alle informatie moet worden beheerd volgens paragraaf 7.5."
          ];
          
          const randomResponse = isoResponses[Math.floor(Math.random() * isoResponses.length)];
          
          const assistantMessage = {
            id: (Date.now() + 1).toString(),
            type: 'assistant' as const,
            content: `${randomResponse}\n\nHeeft u nog meer vragen over ISO 9001 of kwaliteitsmanagement? Of wilt u dat ik tekst in uw document herschrijf?`,
            timestamp: new Date()
          };
          
          setChatMessages(prev => [...prev, assistantMessage]);
        } else if (selectedText && selectedText.length > 0) {
          // Text rewriting logic
          const rewrittenTexts = [
            "Deze sectie beschrijft de fundamentele principes van ons kwaliteitsmanagementsysteem, dat strategisch is ontworpen om consistente excellentie te waarborgen in alle aspecten van onze bedrijfsvoering. Het systeem voldoet volledig aan de stringente eisen van ISO 9001:2015 en ondersteunt onze organisatie proactief bij het realiseren van haar strategische doelstellingen en het overtreffen van klantverwachtingen.",
            "Onze organisatie heeft zich onvoorwaardelijk gecommitteerd aan een cultuur van continue verbetering en operationele excellentie. We streven er consequent naar om de verwachtingen van onze klanten niet alleen te vervullen, maar systematisch te overtreffen door middel van innovatieve oplossingen, hoogwaardige producten en uitzonderlijke service. Deze toewijding vormt de onwrikbare kern van ons kwaliteitsbeleid en wordt dagelijks geoperationaliseerd in al onze processen.",
            "Het kwaliteitsmanagementsysteem van onze organisatie is gebaseerd op een procesgerichte benadering die alle kritieke aspecten van onze bedrijfsvoering omvat en integreert. Door systematische monitoring, grondige evaluatie en proactieve verbetering van onze processen, waarborgen wij dat onze producten en diensten consequent voldoen aan de hoogste kwaliteitsnormen en industriestandaarden.",
            "Wij erkennen dat kwaliteit niet alleen een verantwoordelijkheid is van een specifieke afdeling, maar een gedeelde commitment van alle medewerkers binnen onze organisatie. Door gerichte training, bewustwording en actieve betrokkenheid van ons personeel op alle niveaus, creëren we een omgeving waarin excellentie de norm is en continue verbetering een natuurlijk onderdeel vormt van onze bedrijfscultuur.",
            "Ons kwaliteitsbeleid is stevig gefundeerd op de bewezen principes van klantgerichtheid, inspirerend leiderschap, betrokkenheid van mensen, procesgerichte aanpak, continue verbetering, besluitvorming op basis van feiten en strategisch relatiebeheer. Deze principes vormen het solide fundament voor al onze activiteiten, beslissingen en toekomstgerichte initiatieven."
          ];

          const randomRewrite = rewrittenTexts[Math.floor(Math.random() * rewrittenTexts.length)];
          
          const assistantMessage = {
            id: (Date.now() + 1).toString(),
            type: 'assistant' as const,
            content: `Hier is een verbeterde, meer professionele versie van de geselecteerde tekst:\n\n"${randomRewrite}"\n\nWilt u dat ik deze tekst in uw document vervang, of wilt u dat ik het anders aanpak? U kunt ook specifiek vragen om het meer technisch, formeel, of juist toegankelijker te maken.`,
            timestamp: new Date()
          };

          setChatMessages(prev => [...prev, assistantMessage]);
        } else {
          // General assistant response
          const generalResponses = [
            "Ik begrijp uw vraag. Kunt u wat specifieker zijn? Ik kan u helpen met vragen over ISO 9001, kwaliteitsmanagement, documentatie, of het herschrijven van tekst in uw document.",
            "Dat is een interessante vraag! Ik ben hier om u te helpen met ISO 9001 gerelateerde onderwerpen, kwaliteitsmanagement, of het verbeteren van uw document. Kunt u uw vraag wat meer toelichten?",
            "Ik help u graag verder! Selecteer eerst tekst in uw document om het te herschrijven, of stel een specifieke vraag over ISO 9001, kwaliteitsmanagement, of documentatie.",
            "Ik ben uw AI assistent voor ISO 9001 en document beheer. Ik kan u helpen met het herschrijven van tekst, het beantwoorden van vragen over kwaliteitsmanagement, of het geven van advies over ISO implementatie. Wat heeft u nodig?"
          ];
          
          const randomResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
          
          const assistantMessage = {
            id: (Date.now() + 1).toString(),
            type: 'assistant' as const,
            content: randomResponse,
            timestamp: new Date()
          };

          setChatMessages(prev => [...prev, assistantMessage]);
        }
        
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDocumentEdit = (e: React.FormEvent<HTMLDivElement>) => {
    setDocumentContent(e.currentTarget.innerHTML);
  };

  const switchChatMode = (mode: 'generator' | 'rewriter') => {
    setChatMode(mode);
    if (mode === 'generator') {
      setChatMessages([
        {
          id: '1',
          type: 'assistant',
          content: 'Ik ga u helpen met het maken van uw complete ISO 9001:2015 kwaliteitshandboek. Laten we beginnen met de eerste vraag:',
          timestamp: new Date()
        },
        {
          id: '2',
          type: 'assistant',
          content: currentQuestion < questions.length ? questions[currentQuestion] : 'Alle vragen zijn beantwoord! Uw ISO 9001:2015 kwaliteitshandboek is volledig gepersonaliseerd.',
          timestamp: new Date()
        }
      ]);
    } else {
      setChatMessages([{
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Hallo! Ik ben uw AI assistent voor ISO 9001 en document beheer. Ik kan u helpen met:\n\n• Tekst herschrijven en verbeteren\n• Vragen beantwoorden over ISO 9001:2015\n• Uitleg geven over kwaliteitsmanagement\n• Advies over documentatie en processen\n• Hulp bij implementatie van ISO standaarden\n\nSelecteer tekst in uw document om het te herschrijven, of stel gewoon een vraag!',
        timestamp: new Date()
      }]);
    }
  };

  // Handle resize functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const containerWidth = window.innerWidth;
      const newLeftWidth = (e.clientX / containerWidth) * 100;
      
      // Constrain between 20% and 80%
      const constrainedWidth = Math.min(Math.max(newLeftWidth, 20), 80);
      setLeftWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left Side - Chat Interface */}
      <div 
        className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-xl border-r border-blue-200/50 flex flex-col shadow-xl"
        style={{ width: `${leftWidth}%` }}
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-blue-200/30 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                {chatMode === 'generator' ? <MessageSquare className="w-5 h-5 text-white" /> : <Edit3 className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">AI Assistant</h2>
                <p className="text-sm text-blue-600 font-medium">
                  {chatMode === 'generator' ? 'Document Generator' : 'AI Assistant'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
              <span className="text-sm text-gray-600 font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="px-4 py-3 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 border-b border-blue-200/30">
          <div className="flex bg-white/80 rounded-2xl p-1 shadow-sm border border-blue-200/50">
            <button
              onClick={() => switchChatMode('generator')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                chatMode === 'generator'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span>Generator</span>
            </button>
            <button
              onClick={() => switchChatMode('rewriter')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                chatMode === 'rewriter'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>AI Assistant</span>
            </button>
          </div>
        </div>

        {/* Progress Bar - Only show in generator mode */}
        {chatMode === 'generator' && (
          <div className="px-4 py-3 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 border-b border-blue-200/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Voortgang</span>
              <span className="text-sm font-bold text-blue-600">{currentQuestion + 1}/{questions.length}</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700' 
                    : 'bg-gradient-to-br from-indigo-600 to-purple-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message */}
                <div className={`rounded-2xl px-4 py-3 shadow-lg ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                    : 'bg-white/90 text-gray-800 border border-blue-200/50 backdrop-blur-sm'
                }`}>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('nl-NL', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/90 border border-blue-200/50 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-blue-200/30 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 backdrop-blur-sm">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={chatMode === 'generator' ? "Type uw antwoord hier..." : "Stel een vraag over ISO 9001 of selecteer tekst om te herschrijven..."}
                className="w-full px-4 py-3 border-2 border-blue-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-medium bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-200 text-sm"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '100px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!chatInput.trim() || isTyping}
              className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Resize Handle */}
      <div
        ref={resizeRef}
        onMouseDown={handleMouseDown}
        className="w-1 bg-gray-300 hover:bg-blue-400 cursor-col-resize flex items-center justify-center group transition-colors duration-200"
      >
        <div className="w-0.5 h-8 bg-gray-400 group-hover:bg-blue-500 rounded-full transition-colors duration-200"></div>
      </div>

      {/* Right Side - A4 Document Editor */}
      <div 
        className="flex flex-col bg-gradient-to-br from-slate-50 to-gray-100"
        style={{ width: `${100 - leftWidth}%` }}
      >
        {/* Subtle Navigation Bar */}
        <div className="px-4 py-2 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-b border-blue-200/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-2 py-1 rounded hover:bg-white/60"
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="text-xs font-medium">Dashboard</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="relative group">
                <button className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow text-xs font-medium">
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        // PDF download
                        const printWindow = window.open('', '_blank');
                        if (printWindow) {
                          printWindow.document.write(`
                            <html>
                              <head>
                                <title>ISO 9001 Kwaliteitshandboek</title>
                                <style>
                                  body { font-family: 'Poppins', Arial, sans-serif; margin: 0; padding: 20px; }
                                  @media print {
                                    body { margin: 0; padding: 0; }
                                    @page { size: A4; margin: 2cm; }
                                  }
                                </style>
                              </head>
                              <body>
                                ${documentContent}
                              </body>
                            </html>
                          `);
                          printWindow.document.close();
                          printWindow.focus();
                          setTimeout(() => {
                            printWindow.print();
                          }, 500);
                        }
                      }}
                      className="w-full text-left px-3 py-1 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center space-x-1"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Download als PDF</span>
                    </button>
                    <button
                      onClick={() => {
                        // Word download
                        const blob = new Blob([`
                          <html xmlns:o='urn:schemas-microsoft-com:office:office' 
                               xmlns:w='urn:schemas-microsoft-com:office:word' 
                               xmlns='http://www.w3.org/TR/REC-html40'>
                            <head>
                              <meta charset='utf-8'>
                              <title>ISO 9001 Kwaliteitshandboek</title>
                              <style>
                                body { font-family: 'Poppins', Arial, sans-serif; margin: 0; padding: 20px; }
                                @page { size: A4; margin: 2cm; }
                              </style>
                            </head>
                            <body>
                              ${documentContent}
                            </body>
                          </html>
                        `], { type: 'application/msword' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `ISO-9001-Kwaliteitshandboek-${new Date().toISOString().split('T')[0]}.doc`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                      className="w-full text-left px-3 py-1 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center space-x-1"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Download als Word</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* A4 Document Editor */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
          <div 
            className="bg-white shadow-2xl mx-auto border border-gray-200 rounded-lg overflow-hidden"
            style={{ 
              width: '100%',
              maxWidth: '210mm',
              minHeight: '297mm'
            }}
          >
            <div 
              contentEditable
              onInput={handleDocumentEdit}
              onMouseUp={handleTextSelection}
              dangerouslySetInnerHTML={{ __html: documentContent }}
              className="p-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              style={{ 
                minHeight: '297mm',
                fontFamily: 'Poppins, Arial, sans-serif',
                lineHeight: '1.6'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}