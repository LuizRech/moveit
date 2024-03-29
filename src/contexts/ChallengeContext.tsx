import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../Components/LevelUpModal';


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
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengeProvidersData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps){
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  // UseEffect sem o segundo parametro [], é como se fosse um doc.ready no jquery.
  // É executado uma unica vez quando o componente é carregado em tela
  useEffect(()=>{
    Notification.requestPermission();
  }, []);

  useEffect(()=>{
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp(){
    setLevel(level+1);
    setIsLevelUpModalOpen(true);
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio! :)', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
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

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
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
      completedChallenge,
      closeLevelUpModal
    }}>
    
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  )
}