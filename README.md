# 🤖 Chatbot FAQ

Chatbot qui répond aux questions des utilisateurs en se basant uniquement sur une FAQ définie à l'avance
(livraison, retours, paiement, garantie pour une boutique en ligne fictive "TechStore").
Version simplifiée du RAG : le contexte est injecté directement dans le prompt, sans base vectorielle.

## Fonctionnalités
- Interface de chat avec historique de conversation
- Réponses basées uniquement sur la FAQ fournie (pas d'improvisation hors sujet)
- Indicateur de saisie ("en train d'écrire...")

## Stack technique
| Côté | Techno |
|---|---|
| Frontend | Angular 17 (standalone components) |
| Backend | Node.js, Express |
| IA | API Groq — modèle `openai/gpt-oss-20b` |

## Installation

### Prérequis
- Node.js 18 ou plus récent
- Une clé API Groq gratuite (voir ci-dessous)

### 1. Obtenir une clé API
- Aller sur [console.groq.com](https://console.groq.com)
- Cliquer sur **API Keys**, puis **Create API Key**
- Copier la clé générée

### 2. Lancer le backend

\`\`\`bash
cd server
\`\`\`

\`\`\`bash
npm install
\`\`\`

\`\`\`bash
cp .env.example .env
\`\`\`

Ouvrir le fichier `.env` créé et remplacer la valeur d'exemple par la clé obtenue à l'étape 1.

\`\`\`bash
npm start
\`\`\`

Le backend est alors disponible sur `http://localhost:3002`.

### 3. Lancer le frontend

Dans un **second terminal** :

\`\`\`bash
cd client
\`\`\`

\`\`\`bash
npm install
\`\`\`

\`\`\`bash
npm start
\`\`\`

L'application est alors disponible sur `http://localhost:4200`.

## Personnaliser la FAQ
Le contenu du chatbot se trouve dans `server/faq-data.js`. Remplace le texte par les vraies
informations de l'entreprise, du produit ou du service que tu veux couvrir — aucune autre
modification n'est nécessaire.

## Utilisation
1. Ouvrir `http://localhost:4200`
2. Poser une question (ex. "Quels sont les délais de livraison ?")
3. Le chatbot répond en se basant sur la FAQ définie
