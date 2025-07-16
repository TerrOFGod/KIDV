/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './profile.module.css'
import { useAuthExpiration } from '@/components/useAuthExp'

const AUTH_API = process.env.NEXT_PUBLIC_API_URL_API!
const GAMES_API = process.env.NEXT_PUBLIC_API_URL!

function parseJwt<T extends Record<string, any>>(token: string): T {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = atob(base64)
  return JSON.parse(jsonPayload) as T
}

interface Profile {
  displayName: string
  email: string
  role: string
}

interface Game {
  _id: string
  title: string
  cover?: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [games, setGames] = useState<Game[]>([])
  const [error, setError] = useState<string | null>(null)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [changeError, setChangeError] = useState<string | null>(null)
  const [changeSuccess, setChangeSuccess] = useState<string | null>(null)
  const [isChanging, setIsChanging] = useState(false)
  useAuthExpiration()


  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Не авторизованы')
        return
      }

      let userId: string
      try {
        const payload = parseJwt<{ id: string }>(token)
        userId = payload.id
      } catch {
        setError('Невалидный токен')
        return
      }

      try {
        const resProfile = await fetch(`${AUTH_API}/user/info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: userId }),
        })
        if (!resProfile.ok) throw new Error(`Ошибка ${resProfile.status}`)
        const { profile } = (await resProfile.json()) as { profile: Profile }
        setProfile(profile)

        const resGames = await fetch(
          `${GAMES_API}/games?uploader=${encodeURIComponent(userId)}`,
          { cache: 'no-store' }
        )
        if (!resGames.ok) throw new Error(`Ошибка ${resGames.status}`)
        const list = (await resGames.json()) as Game[]
        setGames(list)
      } catch (e: any) {
        setError(e.message)
      }
    }

    loadProfile()
  }, [])

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault()
    setChangeError(null)
    setChangeSuccess(null)

    if (!oldPassword || !newPassword || !confirmPassword) {
      setChangeError('Пожалуйста, заполните все поля')
      return
    }
    if (newPassword !== confirmPassword) {
      setChangeError('Новый пароль и подтверждение не совпадают')
      return
    }
    if (newPassword.length < 6) {
      setChangeError('Новый пароль должен содержать минимум 6 символов')
      return
    }

    setIsChanging(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Не авторизованы')

      const res = await fetch(`${AUTH_API}/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      })

      if (!res.ok) {
        let errMsg = `Ошибка ${res.status}`
        try {
          const data = await res.json()
          if (data.message) errMsg = data.message
        } catch {
          // ничего
        }
        throw new Error(errMsg)
      }

      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setChangeSuccess('Пароль успешно изменён')
    } catch (e: any) {
      setChangeError(e.message)
    } finally {
      setIsChanging(false)
    }
  }

  if (error) {
    return <p className={styles.messageError}>{error}</p>
  }
  if (!profile) {
    return <p className={styles.message}>Загрузка...</p>
  }

  return (
    <main className={styles.container}>
      {/* === Блок с информацией о профиле === */}
      <section className={styles.profile}>
        <div className={styles.avatar}>
          {profile.displayName?.[0].toUpperCase() ?? 'U'}
        </div>
        <div className={styles.info}>
          <h1 className={styles.name}>{profile.displayName}</h1>
          <span className={styles.role}>{profile.role}</span>
        </div>
      </section>

      {/* === Форма «Смена пароля» === */}
      <section className={styles.changePasswordSection}>
        <h2 className={styles.projectsTitle}>Сменить пароль</h2>

        <form onSubmit={handleChangePassword} className={styles.changePasswordForm}>
          <div className={styles.formGroup}>
            <label htmlFor="oldPassword">Старый пароль</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Новый пароль</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Подтвердите новый пароль</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {changeError && <p className={styles.errorText}>{changeError}</p>}
          {changeSuccess && <p className={styles.successText}>{changeSuccess}</p>}

          <button type="submit" className={styles.changePasswordButton} disabled={isChanging}>
            {isChanging ? 'Смена пароля...' : 'Сменить пароль'}
          </button>
        </form>
      </section>

      {/* === Блок «Мои проекты» === */}
      {games.length > 0 && (
        <section className={styles.projects}>
          <h2 className={styles.projectsTitle}>Мои проекты</h2>
          <div className={styles.grid}>
            {games.map((g) => (
              <Link
                href={`/games/${g._id}?from=profile`}
                key={g._id}
                className={styles.card}
              >
                <div className={styles.cover}>
                  {g.cover ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MINIO_IMAGES_BASE_URL!}/${encodeURIComponent(
                        g.cover
                      )}`}
                      alt={g.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  ) : (
                    <div className={styles.placeholder}>🎮</div>
                  )}
                </div>
                <h3 className={styles.title}>{g.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}