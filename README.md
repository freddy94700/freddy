# SpeakPal — Coach d'anglais par IA 🗣️

Application web (PWA) originale inspirée du concept des coachs d'anglais conversationnels par IA :
pratiquer l'anglais en parlant (ou en écrivant) avec un coach IA, avec corrections en temps réel.

> Application développée from scratch. Ni le nom, ni le code, ni les visuels d'aucune app existante
> ne sont repris.

## Fonctionnalités

- 👤 **Coach personnage** : avatar homme/femme au choix (Léa 👩‍🏫 ou Marc 👨‍🏫), affiché dans la conversation ; le nom du personnage est utilisé par le coach (LLM et hors-ligne). Modifiable à tout moment dans Progression → Mon profil
- ✏️ **Niveau modifiable** : A1–C2, ajustable à tout moment dans Progression → Mon profil
- 💬 **Conversation avec un coach IA** : sujets personnalisés selon le niveau (A1–C2) et les centres d'intérêt
- 🎤 **Entrée vocale** (Web Speech API, `en-US`) et 🔊 **réponse vocale** (synthèse vocale)
- ✏️ **Corrections en temps réel** : grammaire, vocabulaire, expressions, avec explications en français
  et suggestions « mieux dire » (niveau plus naturel)
- 🗣️ **Astuces de prononciation** (th, live/life, ship/sheep…)
- 🌐 **Traduction en français** des réponses du coach (bouton FR)
- 🎭 **Jeux de rôle** : entretien d'embauche, restaurant, aéroport, réunion pro — avec objectifs et validation d'étapes
- 📈 **Progression** : score de maîtrise, série de jours, objectif hebdomadaire, graphique de tendance
- 🎁 **Mode full par défaut** : conversations illimitées (premium activé d'office ; le limiteur freemium n'est actif que si tu désactives premium dans les réglages)
- 🌐 **Mode en ligne (LLM) prioritaire** : dès qu'une clé API est renseignée, le coach LLM est utilisé (badge 🟢 en ligne / ⚪ hors-ligne) avec repli automatique sur le moteur hors-ligne
- 🤖 **Deux moteurs de coach** :
  - hors-ligne (règles intégrées, fonctionne sans clé API)
  - LLM en ligne, **préconfiguré Mistral** (`https://api.mistral.ai/v1/chat/completions`, `mistral-small-latest`) ; préréglages OpenAI / OpenRouter / personnalisé. La clé est saisie dans l'app et stockée localement uniquement (jamais embarquée dans le build)
- 🚀 **Déploiement GitHub Pages** automatique sur `master` (`.github/workflows/pages.yml`) — activer « Source: GitHub Actions » dans les réglages Pages du dépôt

## Lancer le projet

```bash
npm install
npm run dev      # serveur de dev (http://localhost:5173)
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

## Notes techniques

- React 18 + TypeScript + Vite
- État persisté dans `localStorage`
- La reconnaissance vocale nécessite Chrome/Edge (HTTPS ou localhost) ; sinon l'app fonctionne en mode texte
- La clé API n'est jamais transmise ailleurs que vers l'endpoint renseigné par l'utilisateur
