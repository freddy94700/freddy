# SpeakPal — Coach d'anglais par IA 🗣️

Application web (PWA) originale inspirée du concept des coachs d'anglais conversationnels par IA :
pratiquer l'anglais en parlant (ou en écrivant) avec un coach IA, avec corrections en temps réel.

> Application développée from scratch. Ni le nom, ni le code, ni les visuels d'aucune app existante
> ne sont repris.

## Fonctionnalités

- 💬 **Conversation avec un coach IA** : sujets personnalisés selon le niveau (A1–C2) et les centres d'intérêt
- 🎤 **Entrée vocale** (Web Speech API, `en-US`) et 🔊 **réponse vocale** (synthèse vocale)
- ✏️ **Corrections en temps réel** : grammaire, vocabulaire, expressions, avec explications en français
  et suggestions « mieux dire » (niveau plus naturel)
- 🗣️ **Astuces de prononciation** (th, live/life, ship/sheep…)
- 🌐 **Traduction en français** des réponses du coach (bouton FR)
- 🎭 **Jeux de rôle** : entretien d'embauche, restaurant, aéroport, réunion pro — avec objectifs et validation d'étapes
- 📈 **Progression** : score de maîtrise, série de jours, objectif hebdomadaire, graphique de tendance
- 🎁 **Freemium** : 1 conversation gratuite par jour, Premium (démo) pour l'illimité
- 🤖 **Deux moteurs de coach** :
  - hors-ligne (règles intégrées, fonctionne sans clé API)
  - LLM via n'importe quel endpoint compatible OpenAI (clé stockée localement uniquement)

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
