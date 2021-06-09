import { createContext, ReactNode, useState } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeProvidersData {
  level: number;
  currentExperience: number; 
  experienceToNextLevel: number; 
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeProvidersData);

export function ChallengesProvider({ children }: ChallengesProviderProps){
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp(){
    setLevel(level+1);
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function completedChallenge(){
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

     if(finalExperience >= experienceToNextLevel){
       finalExperience = finalExperience - experienceToNextLevel;
       levelUp();
     }

     setCurrentExperience(finalExperience);
     setActiveChallenge(null);
     setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengeContext.Provider value={{
      level, 
      currentExperience, 
      experienceToNextLevel, 
      challengesCompleted,
      activeChallenge,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completedChallenge
    }}>
      {children}
    </ChallengeContext.Provider>
  )
}