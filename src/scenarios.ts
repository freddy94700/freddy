export interface ScenarioStep {
  prompt: { en: string; fr: string }
  keywords: string[]
  praise: { en: string; fr: string }
  hint: { en: string; fr: string }
}

export interface Scenario {
  id: string
  icon: string
  title: string
  description: string
  goals: string[]
  steps: ScenarioStep[]
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'interview',
    icon: '💼',
    title: 'Entretien d’embauche',
    description: 'Préparez un entretien d’embauche en anglais, étape par étape.',
    goals: ['Vous présenter', 'Expliquer votre motivation', 'Parler de vos qualités et défauts', 'Poser une question à la fin'],
    steps: [
      {
        prompt: { en: "Hi! Thanks for coming in today. Could you start by telling me a bit about yourself?", fr: "Bonjour ! Merci d'être venu aujourd'hui. Pouvez-vous commencer par me parler un peu de vous ?" },
        keywords: ['name', 'i’m', 'i am', 'work', 'study', 'from', 'live', 'love', 'like', 'enjoy', 'passion'],
        praise: { en: 'Great introduction! Now, why are you interested in this position?', fr: 'Bonne présentation ! Maintenant, pourquoi ce poste vous intéresse-t-il ?' },
        hint: { en: "Try to use « I'm » and mention your job, studies or where you're from.", fr: "Essayez d'utiliser « I'm » et de mentionner votre métier, vos études ou d'où vous venez." },
      },
      {
        prompt: { en: 'Good. What would you say are your greatest strengths?', fr: 'Bien. Quelles seraient vos plus grandes qualités ?' },
        keywords: ['team', 'hard', 'motivated', 'organized', 'creative', 'fast', 'learn', 'good at', 'responsible', 'positive'],
        praise: { en: 'Nice! And what about your weaknesses? Everyone has them.', fr: 'Très bien ! Et vos défauts ? Tout le monde en a.' },
        hint: { en: "Give one weakness and say how you're working on it.", fr: "Donnez un défaut et dites comment vous travaillez dessus." },
      },
      {
        prompt: { en: 'Interesting. Where do you see yourself in five years?', fr: 'Intéressant. Où vous voyez-vous dans cinq ans ?' },
        keywords: ['manager', 'team', 'learn', 'grow', 'company', 'skill', 'expert', 'lead', 'senior', 'business', 'own'],
        praise: { en: 'Perfect answer. Do you have any questions for me?', fr: 'Excellente réponse. Avez-vous des questions pour moi ?' },
        hint: { en: 'Ask something about the team, the role or the company culture.', fr: "Posez une question sur l'équipe, le poste ou la culture de l'entreprise." },
      },
      {
        prompt: { en: 'Great question! Is there anything else you’d like to know about the role?', fr: 'Bonne question ! Souhaitez-vous savoir autre chose sur le poste ?' },
        keywords: ['salary', 'hours', 'holiday', 'start', 'when', 'how', 'what', 'train', 'benefit', 'office'],
        praise: { en: "Wonderful! It was a pleasure talking to you. We'll be in touch soon.", fr: "Parfait ! C'était un plaisir d'échanger avec vous. Nous revenons vers vous bientôt." },
        hint: { en: 'Ask about salary, holidays, start date or training.', fr: "Demandez le salaire, les congés, la date de début ou la formation." },
      },
    ],
  },
  {
    id: 'restaurant',
    icon: '🍽️',
    title: 'Au restaurant',
    description: 'Commandez un repas, demandez l’addition et gérez un problème.',
    goals: ['Dire bonjour et demander une table', 'Commander un plat et une boisson', 'Signaler un problème', 'Demander l’addition'],
    steps: [
      {
        prompt: { en: 'Good evening! Welcome to our restaurant. Do you have a reservation?', fr: "Bonsoir ! Bienvenue dans notre restaurant. Avez-vous une réservation ?" },
        keywords: ['yes', 'no', 'table', 'two', 'people', 'name', 'reservation', 'here', 'for'],
        praise: { en: "Perfect, this way please. Can I get you something to drink to start with?", fr: "Parfait, par ici s'il vous plaît. Puis-je vous servir quelque chose à boire pour commencer ?" },
        hint: { en: "Answer with « A table for two, please » or « Yes, under the name… ».", fr: "Répondez par « A table for two, please » ou « Yes, under the name… »." },
      },
      {
        prompt: { en: 'Here are your drinks. Are you ready to order, or do you need a few more minutes?', fr: "Voici vos boissons. Êtes-vous prêts à commander, ou avez-vous besoin de quelques minutes de plus ?" },
        keywords: ['ready', 'order', 'menu', 'starter', 'main', 'food', 'eat', 'pizza', 'fish', 'chicken', 'salad', 'soup', 'burger', 'pasta', 'steak', 'wine', 'water', 'minutes'],
        praise: { en: "Excellent choice! I'll bring that right away. Anything else?", fr: "Excellent choix ! Je vous apporte ça tout de suite. Autre chose ?" },
        hint: { en: "Say what you'd like: « I'll have the… » or « I'd like a… ».", fr: "Dites ce que vous voulez : « I'll have the… » ou « I'd like a… »." },
      },
      {
        prompt: { en: 'Here is your food. How is everything tasting?', fr: "Voici votre plat. Tout est à votre goût ?" },
        keywords: ['good', 'delicious', 'great', 'fine', 'ok', 'cold', 'wrong', 'not', 'problem', 'salt', 'spicy', 'small'],
        praise: { en: "I'm so glad you enjoyed it! Can I get you anything else — dessert, coffee?", fr: "Ravi que ça vous ait plu ! Puis-je vous prendre autre chose — un dessert, un café ?" },
        hint: { en: "Say « It's delicious! » or describe a problem politely: « Excuse me, this is cold ».", fr: "Dites « It's delicious! » ou décrivez un problème poliment : « Excuse me, this is cold »." },
      },
      {
        prompt: { en: 'Would you like the bill now?', fr: "Souhaitez-vous l'addition maintenant ?" },
        keywords: ['bill', 'check', 'yes', 'card', 'cash', 'pay', 'please', 'receipt'],
        praise: { en: "Thank you so much! Have a wonderful evening, and come again soon!", fr: "Merci beaucoup ! Passez une excellente soirée, et revenez bientôt !" },
        hint: { en: 'Ask for the bill: « Could we have the bill, please? »', fr: "Demandez l'addition : « Could we have the bill, please? »" },
      },
    ],
  },
  {
    id: 'airport',
    icon: '✈️',
    title: 'À l’aéroport',
    description: 'Enregistrement, bagages perdus et embarquement en anglais.',
    goals: ['S’enregistrer et choisir un siège', 'Déclarer un bagage', 'Signaler un bagage perdu', 'Comprendre les annonces'],
    steps: [
      {
        prompt: { en: 'Good morning! Welcome to check-in. May I see your passport and booking confirmation, please?', fr: "Bonjour ! Bienvenue à l'enregistrement. Puis-je voir votre passeport et votre confirmation de réservation, s'il vous plaît ?" },
        keywords: ['here', 'yes', 'passport', 'ticket', 'booking', 'flight', 'london', 'paris', 'gate', 'seat'],
        praise: { en: "Thank you! Would you like a window or an aisle seat?", fr: "Merci ! Préférez-vous un siège côté hublot ou côté couloir ?" },
        hint: { en: "Hand over your documents: « Here you go » and answer about your seat.", fr: "Donnez vos documents : « Here you go » et répondez pour votre siège." },
      },
      {
        prompt: { en: 'Do you have any checked luggage today?', fr: "Avez-vous des bagages en soute aujourd'hui ?" },
        keywords: ['yes', 'no', 'bag', 'suitcase', 'one', 'two', 'kilos', 'kg', 'weight', 'heavy'],
        praise: { en: 'Perfect. Your boarding pass is ready — gate 12, boarding at 10:30. Have a good flight!', fr: "Parfait. Votre carte d'embarquement est prête — porte 12, embarquement à 10h30. Bon vol !" },
        hint: { en: "Answer about your bags: « Yes, one suitcase » or « No, just hand luggage ».", fr: "Répondez au sujet de vos bagages : « Yes, one suitcase » ou « No, just hand luggage »." },
      },
      {
        prompt: { en: "I'm sorry to hear that. Can you describe your suitcase for me?", fr: "Désolé d'apprendre cela. Pouvez-vous me décrire votre valise ?" },
        keywords: ['black', 'blue', 'red', 'big', 'small', 'leather', 'wheels', 'handle', 'color', 'brand', 'logo'],
        praise: { en: "Thank you. We'll contact you within 24 hours. Here is your reference number.", fr: "Merci. Nous vous contacterons sous 24 heures. Voici votre numéro de référence." },
        hint: { en: 'Describe it: « It’s a black suitcase with wheels ».', fr: "Décrivez-la : « It's a black suitcase with wheels »." },
      },
      {
        prompt: { en: 'This is a final boarding call for flight BA204 to London. Please proceed to gate 12 immediately.', fr: "Dernier appel pour le vol BA204 à destination de Londres. Veuillez vous rendre immédiatement à la porte 12." },
        keywords: ['gate', 'hurry', 'go', 'ok', 'thanks', 'where', 'boarding', 'passport', 'ready'],
        praise: { en: "Excellent! Enjoy your flight to London!", fr: "Parfait ! Bon vol pour Londres !" },
        hint: { en: 'React to the announcement: « Let’s go to gate 12! »', fr: "Réagissez à l'annonce : « Let's go to gate 12! »" },
      },
    ],
  },
  {
    id: 'meeting',
    icon: '🤝',
    title: 'Réunion professionnelle',
    description: 'Participez à une réunion : donner votre avis, nuancer, conclure.',
    goals: ['Ouvrir la réunion', 'Donner votre avis', 'Être d’accord / pas d’accord poliment', 'Conclure et résumer'],
    steps: [
      {
        prompt: { en: "Good morning everyone, let's get started. The main topic today is our new marketing campaign. What are your thoughts?", fr: "Bonjour à tous, commençons. Le sujet du jour est notre nouvelle campagne marketing. Quelles sont vos réflexions ?" },
        keywords: ['think', 'idea', 'suggest', 'maybe', 'could', 'should', 'campaign', 'social', 'media', 'budget', 'target'],
        praise: { en: 'That’s a really interesting point. Anyone else would like to add something?', fr: "C'est un point vraiment intéressant. Quelqu'un d'autre veut ajouter quelque chose ?" },
        hint: { en: "Give an opinion: « In my opinion, we should… » or « I think we could… ».", fr: "Donnez votre avis : « In my opinion, we should… » ou « I think we could… »." },
      },
      {
        prompt: { en: 'I see your point, but don’t you think the budget might be too high?', fr: "Je vois votre point de vue, mais ne pensez-vous pas que le budget est peut-être trop élevé ?" },
        keywords: ['agree', 'disagree', 'partly', 'true', 'however', 'but', 'maybe', 'yes', 'no', 'depends'],
        praise: { en: 'Exactly, a good balance is important. Let’s summarize the key actions then.', fr: "Exactement, un bon équilibre est important. Résumons les actions clés alors." },
        hint: { en: "Agree or disagree politely: « I partly agree, however… » or « I don’t quite agree because… ».", fr: "Soyez d'accord ou non, poliment : « I partly agree, however… » ou « I don't quite agree because… »." },
      },
      {
        prompt: { en: 'So, to wrap up: we will launch the campaign next month and review the results in a team meeting. Does that work for everyone?', fr: "Pour conclure : nous lancerons la campagne le mois prochain et nous examinerons les résultats en réunion d'équipe. Cela convient à tout le monde ?" },
        keywords: ['yes', 'works', 'ok', 'fine', 'good', 'agree', 'sounds', 'great', 'perfect'],
        praise: { en: "Great, thanks everyone for your input. Have a productive day!", fr: "Parfait, merci à tous pour votre contribution. Bonne journée productive !" },
        hint: { en: 'Confirm: « Yes, that works for me » or « Sounds good to me! »', fr: "Confirmez : « Yes, that works for me » ou « Sounds good to me! »" },
      },
    ],
  },
]

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id)
}
