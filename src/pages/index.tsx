import Head from 'next/head';
import ExperienceBar from "../Components/ExperienceBar";
import { Profile } from '../Components/Profile';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <ExperienceBar />

      <section>
        <div>
          <Profile />
        </div>
        <div>
          
        </div>
      </section>
    </div>
  )
}
