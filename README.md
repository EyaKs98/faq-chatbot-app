# 🤖 Chatbot FAQ — Assistant virtuel intelligent

Chatbot conversationnel qui répond aux questions des utilisateurs en s'appuyant exclusivement sur une base de connaissances prédéfinie (FAQ). Ce projet illustre une approche simplifiée du RAG (Retrieval-Augmented Generation) : le contexte métier est injecté directement dans le prompt du modèle, sans recours à une base vectorielle.

## Fonctionnalités
- Interface de chat conversationnelle avec gestion de l'historique
- Réponses strictement basées sur la base de connaissances fournie
- Indicateur visuel de saisie ("en train d'écrire...")
- Architecture facilement adaptable à tout autre domaine métier

## Stack technique
| Côté | Techno |
|---|---|
| Frontend | Angular 17 (standalone components) |
| Backend | Node.js, Express |
| IA | API Groq — modèle `openai/gpt-oss-20b` |

## Installation

### Prérequis
- Node.js 18 ou version ultérieure
- Une clé API Groq gratuite (voir ci-dessous)

### 1. Obtenir une clé API
- Se rendre sur [console.groq.com](https://console.groq.com)
- Cliquer sur **API Keys**, puis **Create API Key**
- Copier la clé générée

### 2. Démarrer le backend

```bash
cd server
```

```bash
npm install
```

```bash
cp .env.example .env
```

Ouvrir le fichier `.env` nouvellement créé et renseigner la clé API obtenue précédemment.

```bash
npm start
```

Le serveur backend est accessible sur `http://localhost:3002`.

### 3. Démarrer le frontend

Dans un second terminal :

```bash
cd client
```

```bash
npm install
```

```bash
npm start
```

L'application est accessible sur `http://localhost:4200`.

## Personnalisation
La base de connaissances du chatbot se trouve dans `server/faq-data.js`. Il suffit de remplacer son contenu par les informations propres à l'entreprise, au produit ou au service concerné — aucune autre modification n'est nécessaire.

## Utilisation
1. Accéder à `http://localhost:4200`
2. Poser une question en lien avec le domaine couvert par la base de connaissances
3. Le chatbot répond en s'appuyant exclusivement sur les informations fournies

## Captures d'écran

<img width="932" height="857" alt="image" src="https://github.com/user-attachments/assets/159667c5-fa9f-475f-865b-777b65317715" />
