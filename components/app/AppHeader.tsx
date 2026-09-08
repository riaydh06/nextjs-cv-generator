import Link from 'next/link'

import styles from './AppHeader.module.css'

type AppHeaderProps = {
  current?: 'edit' | 'download'
}

export function AppHeader({ current = 'edit' }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/">
        CV Generator
      </Link>
      <nav className={styles.nav} aria-label="CV steps">
        <Link className={`${styles.navLink} ${current === 'edit' ? styles.active : ''}`} href="/">
          1. Edit Details
        </Link>
        <Link
          className={`${styles.navLink} ${current === 'download' ? styles.active : ''}`}
          href="/download"
        >
          2. Preview & Download
        </Link>
      </nav>
      <div className={styles.meta}>
        <span className={styles.storageBadge}>Saved to browser</span>
      </div>
    </header>
  )
}
