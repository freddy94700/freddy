export interface TopicLine {
  en: string
  fr: string
}

export interface Topic {
  id: string
  icon: string
  label: string
  starters: { low: TopicLine[]; mid: TopicLine[]; high: TopicLine[] }
  followups: { low: TopicLine[]; mid: TopicLine[]; high: TopicLine[] }
}

export const TOPICS: Topic[] = [
  {
    id: 'work',
    icon: '💼',
    label: 'Le travail',
    starters: {
      low: [
        { en: "Hi! Let's talk about work. What do you do?", fr: "Salut ! Parlons du travail. Que fais-tu dans la vie ?" },
        { en: "Hello! Do you like your job? Tell me about it.", fr: "Bonjour ! Aimes-tu ton travail ? Parle-moi de ça." },
      ],
      mid: [
        { en: "Hey! What do you do for a living, and what do you enjoy most about it?", fr: "Salut ! Que fais-tu dans la vie, et qu'aimes-tu le plus dans ton travail ?" },
        { en: "Hi there! How's work treating you these days?", fr: "Salut ! Comment se passe le travail en ce moment ?" },
      ],
      high: [
        { en: "Hey! What's your take on how the world of work has changed over the past decade?", fr: "Salut ! Comment vois-tu l'évolution du monde du travail ces dix dernières années ?" },
        { en: "Hi! If you could redesign your work week from scratch, what would you change?", fr: "Salut ! Si tu pouvais concevoir ta semaine de travail from scratch, que changerais-tu ?" },
      ],
    },
    followups: {
      low: [
        { en: "That sounds nice! Do you work every day?", fr: "Ça a l'air sympa ! Tu travailles tous les jours ?" },
        { en: "Interesting! Is it difficult?", fr: "Intéressant ! C'est difficile ?" },
        { en: "Cool! Do you like your colleagues?", fr: "Génial ! Tu aimes tes collègues ?" },
        { en: "I see! What time do you start work?", fr: "Je vois ! À quelle heure commences-tu le travail ?" },
      ],
      mid: [
        { en: "That's interesting! What does a typical day look like for you?", fr: "C'est intéressant ! À quoi ressemble une journée typique pour toi ?" },
        { en: "Nice! What's the most challenging part of your job?", fr: "Sympa ! Quelle est la partie la plus difficile de ton travail ?" },
        { en: "Got it. Have you ever thought about changing careers?", fr: "J'ai compris. As-tu déjà envisagé de changer de carrière ?" },
        { en: "Makes sense! How do you usually unwind after work?", fr: "Ça a du sens ! Comment te détends-tu habituellement après le travail ?" },
      ],
      high: [
        { en: "Fascinating! How do you stay motivated when projects drag on?", fr: "Fascinant ! Comment restes-tu motivé quand les projets s'éternisent ?" },
        { en: "That's a great perspective. Do you think remote work changes company culture in the long run?", fr: "C'est une excellente perspective. Penses-tu que le télétravail change la culture d'entreprise à long terme ?" },
        { en: "Interesting point. What would you say is the biggest misconception about your industry?", fr: "Point intéressant. Selon toi, quelle est la plus grande idée reçue sur ton secteur ?" },
      ],
    },
  },
  {
    id: 'travel',
    icon: '✈️',
    label: 'Les voyages',
    starters: {
      low: [
        { en: "Hi! Let's talk about travel. Do you like to travel?", fr: "Salut ! Parlons voyages. Aimes-tu voyager ?" },
        { en: "Hello! Where did you go on your last holiday?", fr: "Bonjour ! Où es-tu allé pendant tes dernières vacances ?" },
      ],
      mid: [
        { en: "Hey! What's the most memorable trip you've ever taken?", fr: "Salut ! Quel est le voyage le plus mémorable que tu aies fait ?" },
        { en: "Hi! Do you prefer beach holidays or city breaks?", fr: "Salut ! Préfères-tu les vacances à la plage ou les city trips ?" },
      ],
      high: [
        { en: "Hey! If money were no object, where would you go next and why?", fr: "Salut ! Si l'argent n'était pas un problème, où irais-tu ensuite et pourquoi ?" },
        { en: "Interesting topic! How has travelling changed the way you see the world?", fr: "Sujet intéressant ! Comment les voyages ont-ils changé ta façon de voir le monde ?" },
      ],
    },
    followups: {
      low: [
        { en: "Nice! What did you do there?", fr: "Sympa ! Qu'as-tu fait là-bas ?" },
        { en: "Cool! Was the weather good?", fr: "Génial ! Il a fait beau ?" },
        { en: "Great! Would you go back?", fr: "Super ! Y retournerais-tu ?" },
      ],
      mid: [
        { en: "That sounds amazing! What surprised you most about that place?", fr: "Ça a l'air incroyable ! Qu'est-ce qui t'a le plus surpris là-bas ?" },
        { en: "I see! How did you get there — by plane, train or car?", fr: "Je vois ! Comment y es-tu allé — en avion, en train ou en voiture ?" },
        { en: "Interesting! What's one thing you'd definitely recommend there?", fr: "Intéressant ! Quelle est une chose que tu recommanderais absolument là-bas ?" },
      ],
      high: [
        { en: "Wow! What would you say was the highlight of the trip?", fr: "Waouh ! Quel a été le moment fort du voyage selon toi ?" },
        { en: "Fascinating! Has travelling ever gone wrong for you? Tell me about it.", fr: "Fascinant ! Un voyage a-t-il déjà mal tourné pour toi ? Raconte-moi." },
        { en: "Good point. Do you prefer planning trips in detail or going with the flow?", fr: "Bon point. Préfères-tu planifier tes voyages en détail ou partir à l'aventure ?" },
      ],
    },
  },
  {
    id: 'hobbies',
    icon: '🎨',
    label: 'Les loisirs',
    starters: {
      low: [
        { en: "Hi! What do you like to do in your free time?", fr: "Salut ! Qu'aimes-tu faire pendant ton temps libre ?" },
        { en: "Hello! Do you have any hobbies?", fr: "Bonjour ! As-tu des loisirs ?" },
      ],
      mid: [
        { en: "Hey! How do you usually spend your weekends?", fr: "Salut ! Comment passes-tu tes week-ends d'habitude ?" },
        { en: "Hi! Is there anything you've been wanting to try lately?", fr: "Salut ! Y a-t-il quelque chose que tu as envie d'essayer récemment ?" },
      ],
      high: [
        { en: "Hey! What hobby would you pick up if you had a completely free month?", fr: "Salut ! Quel loisir adopterais-tu si tu avais un mois complètement libre ?" },
        { en: "Hi! Do you think hobbies say a lot about a person's personality?", fr: "Salut ! Penses-tu que les loisirs en disent long sur la personnalité de quelqu'un ?" },
      ],
    },
    followups: {
      low: [
        { en: "That sounds fun! How often do you do that?", fr: "Ça a l'air amusant ! À quelle fréquence fais-tu ça ?" },
        { en: "Cool! Did you start recently?", fr: "Génial ! Tu as commencé récemment ?" },
        { en: "Nice! Do your friends do it with you?", fr: "Sympa ! Tes amis le font avec toi ?" },
      ],
      mid: [
        { en: "Interesting! What got you into that?", fr: "Intéressant ! Qu'est-ce qui t'a fait commencer ça ?" },
        { en: "That's cool! What's the best part about it?", fr: "C'est cool ! Quelle est la meilleure partie ?" },
        { en: "I see! Have you ever tried doing it competitively?", fr: "Je vois ! As-tu déjà essayé de le faire en compétition ?" },
      ],
      high: [
        { en: "Fascinating! How has that hobby evolved for you over the years?", fr: "Fascinant ! Comment ce loisir a-t-il évolué pour toi au fil des ans ?" },
        { en: "Great answer! Do you think you'll ever get bored of it?", fr: "Bonne réponse ! Penses-tu que tu t'en lasseras un jour ?" },
      ],
    },
  },
  {
    id: 'food',
    icon: '🍕',
    label: 'La nourriture',
    starters: {
      low: [
        { en: "Hi! What's your favourite food?", fr: "Salut ! Quel est ton plat préféré ?" },
        { en: "Hello! Do you like cooking?", fr: "Bonjour ! Aimes-tu cuisiner ?" },
      ],
      mid: [
        { en: "Hey! What's the best meal you've had recently?", fr: "Salut ! Quel est le meilleur repas que tu aies mangé récemment ?" },
        { en: "Hi! Are you more of a home cook or a takeaway person?", fr: "Salut ! Tu es plutôt cuisine maison ou plats à emporter ?" },
      ],
      high: [
        { en: "Hey! If you had to eat one cuisine for the rest of your life, which would it be and why?", fr: "Salut ! Si tu ne devais manger qu'une seule cuisine pour le reste de ta vie, laquelle choisirais-tu et pourquoi ?" },
        { en: "Hi! Do you think food tells you a lot about a culture?", fr: "Salut ! Penses-tu que la nourriture en dit long sur une culture ?" },
      ],
    },
    followups: {
      low: [
        { en: "Yummy! Do you know how to make it?", fr: "Miam ! Sais-tu le faire ?" },
        { en: "Nice! Where did you eat it?", fr: "Sympa ! Où l'as-tu mangé ?" },
        { en: "Cool! Is it sweet or salty?", fr: "Génial ! C'est sucré ou salé ?" },
      ],
      mid: [
        { en: "That sounds delicious! What makes it special?", fr: "Ça a l'air délicieux ! Qu'est-ce qui le rend spécial ?" },
        { en: "Interesting! Do you eat out a lot?", fr: "Intéressant ! Manges-tu souvent au restaurant ?" },
        { en: "Got it! Any food you really dislike?", fr: "J'ai compris ! Y a-t-il une nourriture que tu détestes vraiment ?" },
      ],
      high: [
        { en: "Mouth-watering! What's the secret ingredient, in your opinion?", fr: "Ça donne envie ! Quel est l'ingrédient secret, selon toi ?" },
        { en: "Fascinating! How has your taste in food changed over time?", fr: "Fascinant ! Comment ton goût pour la nourriture a-t-il évolué avec le temps ?" },
      ],
    },
  },
  {
    id: 'movies',
    icon: '🎬',
    label: 'Films & séries',
    starters: {
      low: [
        { en: "Hi! Do you like watching movies?", fr: "Salut ! Aimes-tu regarder des films ?" },
        { en: "Hello! What's your favourite movie?", fr: "Bonjour ! Quel est ton film préféré ?" },
      ],
      mid: [
        { en: "Hey! What have you been watching lately?", fr: "Salut ! Qu'as-tu regardé récemment ?" },
        { en: "Hi! Movies or series — which do you prefer and why?", fr: "Salut ! Films ou séries — lesquels préfères-tu et pourquoi ?" },
      ],
      high: [
        { en: "Hey! What's a film that completely changed your perspective on something?", fr: "Salut ! Quel film a complètement changé ta perspective sur quelque chose ?" },
        { en: "Hi! Do you think streaming has ruined the cinema experience?", fr: "Salut ! Penses-tu que le streaming a gâché l'expérience du cinéma ?" },
      ],
    },
    followups: {
      low: [
        { en: "Nice! Who is your favourite actor?", fr: "Sympa ! Qui est ton acteur préféré ?" },
        { en: "Cool! Is it funny or scary?", fr: "Génial ! C'est drôle ou effrayant ?" },
        { en: "Great! Did you watch it alone or with friends?", fr: "Super ! L'as-tu regardé seul ou avec des amis ?" },
      ],
      mid: [
        { en: "Interesting! What did you like most about it?", fr: "Intéressant ! Qu'as-tu aimé le plus ?" },
        { en: "That's cool! Would you recommend it?", fr: "C'est cool ! Le recommanderais-tu ?" },
        { en: "I see! What genre do you usually go for?", fr: "Je vois ! Quel genre préfères-tu d'habitude ?" },
      ],
      high: [
        { en: "Fascinating! What do you think makes a truly great screenplay?", fr: "Fascinant ! Qu'est-ce qui fait selon toi un scénario vraiment réussi ?" },
        { en: "Good point! Do you prefer stories with a happy ending?", fr: "Bon point ! Préfères-tu les histoires avec une fin heureuse ?" },
      ],
    },
  },
  {
    id: 'daily',
    icon: '☀️',
    label: 'La vie quotidienne',
    starters: {
      low: [
        { en: "Hi! How are you today?", fr: "Salut ! Comment vas-tu aujourd'hui ?" },
        { en: "Hello! What did you do this morning?", fr: "Bonjour ! Qu'as-tu fait ce matin ?" },
      ],
      mid: [
        { en: "Hey! What does your morning routine look like?", fr: "Salut ! À quoi ressemble ta routine du matin ?" },
        { en: "Hi! Are you a morning person or a night owl?", fr: "Salut ! Es-tu du matin ou du soir ?" },
      ],
      high: [
        { en: "Hey! What's a small thing that happened recently that made your day?", fr: "Salut ! Quelle petite chose récente t'a rendu la journée meilleure ?" },
        { en: "Hi! Do you feel your daily routine reflects who you really are?", fr: "Salut ! Est-ce que ta routine quotidienne reflète vraiment qui tu es ?" },
      ],
    },
    followups: {
      low: [
        { en: "Nice! And what about tomorrow?", fr: "Sympa ! Et demain ?" },
        { en: "Cool! Do you do that every day?", fr: "Génial ! Fais-tu ça tous les jours ?" },
        { en: "I see! How did you feel?", fr: "Je vois ! Comment t'es-tu senti ?" },
      ],
      mid: [
        { en: "Interesting! How do you balance work and personal life?", fr: "Intéressant ! Comment concilies-tu travail et vie personnelle ?" },
        { en: "That's nice! Do you have any plans for the weekend?", fr: "C'est sympa ! As-tu des projets pour le week-end ?" },
        { en: "Got it! What time do you usually go to bed?", fr: "J'ai compris ! À quelle heure te couches-tu d'habitude ?" },
      ],
      high: [
        { en: "Fascinating! What's something you've changed in your routine that had a big impact?", fr: "Fascinant ! Quel changement dans ta routine a eu un grand impact ?" },
        { en: "Good point! Do you think routines help or limit creativity?", fr: "Bon point ! Penses-tu que les routines aident ou limitent la créativité ?" },
      ],
    },
  },
  {
    id: 'dreams',
    icon: '🌟',
    label: 'Rêves & objectifs',
    starters: {
      low: [
        { en: "Hi! What do you want to do in the future?", fr: "Salut ! Que veux-tu faire à l'avenir ?" },
        { en: "Hello! Do you have a dream?", fr: "Bonjour ! As-tu un rêve ?" },
      ],
      mid: [
        { en: "Hey! If you could achieve one thing this year, what would it be?", fr: "Salut ! Si tu pouvais accomplir une chose cette année, laquelle serait-ce ?" },
        { en: "Hi! What motivates you when things get hard?", fr: "Salut ! Qu'est-ce qui te motive quand les choses deviennent difficiles ?" },
      ],
      high: [
        { en: "Hey! Looking back, what decision are you most glad you made?", fr: "Salut ! Avec le recul, quelle décision te rend le plus heureux d'avoir prise ?" },
        { en: "Hi! Do you believe people can fundamentally change who they are?", fr: "Salut ! Penses-tu que les gens peuvent fondamentalement changer qui ils sont ?" },
      ],
    },
    followups: {
      low: [
        { en: "That's a great goal! Why is it important to you?", fr: "C'est un super objectif ! Pourquoi est-ce important pour toi ?" },
        { en: "Cool! When do you want to do it?", fr: "Génial ! Quand veux-tu le faire ?" },
        { en: "Nice! Who can help you?", fr: "Sympa ! Qui peut t'aider ?" },
      ],
      mid: [
        { en: "Interesting! What's the first step you could take this week?", fr: "Intéressant ! Quelle est la première étape que tu pourrais faire cette semaine ?" },
        { en: "That's inspiring! What could stop you, and how would you handle it?", fr: "C'est inspirant ! Qu'est-ce qui pourrait t'arrêter, et comment gérerais-tu ça ?" },
        { en: "I see! Have you told anyone about this goal?", fr: "Je vois ! En as-tu parlé à quelqu'un ?" },
      ],
      high: [
        { en: "Profound! How do you define success for yourself?", fr: "Profond ! Comment définis-tu le succès pour toi-même ?" },
        { en: "Great insight! What would you do differently if you started over?", fr: "Excellente réflexion ! Que ferais-tu différemment si tu recommençais à zéro ?" },
      ],
    },
  },
]

export function getTopic(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id)
}

export const INTEREST_OPTIONS = TOPICS.map((t) => ({ id: t.id, icon: t.icon, label: t.label }))

export function bandForLevel(level: string): 'low' | 'mid' | 'high' {
  if (level === 'A1' || level === 'A2') return 'low'
  if (level === 'B1' || level === 'B2') return 'mid'
  return 'high'
}
