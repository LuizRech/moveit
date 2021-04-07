import React from 'react';

import styles from '../styles/pages/Profile.module.css';

export function Profile(){
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/LuizRech.png" alt="Luiz Rech"/>
      <div>
        <strong>Luiz Rech</strong>
        
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}