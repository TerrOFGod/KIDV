'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './game-overview.module.css'

interface Profile {
  displayName: string
  email: string
  role: string
}

interface AuthorsBlockProps {
  authorId: string
  coauthorIds: string[]
}

export default function AuthorsBlock({ authorId, coauthorIds }: AuthorsBlockProps) {
  const [author, setAuthor] = useState<Profile | null>(null)
  const [coauthors, setCoauthors] = useState<Profile[]>([])
  const [error, setError] = useState<string | null>(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  useEffect(() => {
    if (!token) {
      setError('Необходимо войти, чтобы увидеть автора')
      return
    }

    const fetchProfile = async (userId: string): Promise<Profile> => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
        { id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      return res.data.profile as Profile
    }

    fetchProfile(authorId)
      .then((p) => setAuthor(p))
      .catch((err) => {
        console.error('Не удалось получить автора:', err)
        setError('Не удалось загрузить данные автора')
      })

    if (coauthorIds.length > 0) {

      Promise.all(coauthorIds.map((cid) => fetchProfile(cid)))
        .then((profiles) => {
          setCoauthors(profiles)
        })
        .catch(
        (err) => {
            console.error('Не удалось получить соавторов:', err)
            setError('Не удалось загрузить данные соавторов')
        })
    }
  }, [authorId, coauthorIds, token])

  if (error) {
    return <div className={styles.authorBlockError}>{error}</div>
  }

  return (
    <div className={styles.authorBlock}>
      {author && (
        <div className={styles.authorItem}>
          <strong>Автор:</strong>{' '}
          <span className={styles.authorName}>
            {author.displayName} ({author.email})
          </span>{' '}
          <em>• {author.role}</em>
        </div>
      )}

      {coauthors.length > 0 && (
        <div className={styles.coauthorsContainer}>
          <strong>Соавторы:</strong>{' '}
          {coauthors.map((c, idx) => (
            <span key={coauthorIds[idx]} className={styles.authorName}>
              {c.displayName} ({c.email})
              {idx < coauthors.length - 1 && ', '}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}