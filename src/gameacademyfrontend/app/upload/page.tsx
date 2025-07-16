'use client'

import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import styles from './upload.module.css'
import Link from 'next/link'
import { useAuthExpiration } from '@/components/useAuthExp';

function parseJwt<T extends Record<string, unknown>>(token: string): T {
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload)) as T
}

type JwtPayload = { sub?: string; id?: string }
type SuggestedUser = {
  _id: string
  email: string
  displayName: string
  role: string
}

const ALL_GENRES = [
  'Экшен',
  'Приключения',
  'Адвенчура',
  'RPG',
  'Стратегия',
  'Головоломка',
  'Спортивная',
]

export default function UploadPage() {
  const router = useRouter()

  const [uploader, setUploader] = useState<string>('')
  const [role, setRole] = useState<string | null>(null)
  useAuthExpiration()
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    try {
      const payload = parseJwt<JwtPayload>(token)
      const userId = payload.sub ?? payload.id
      if (!userId) throw new Error()
      setUploader(userId)

      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
          { id: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(res => {
          const {
            profile: { role },
          } = res.data as { profile: { role: string } }
          if (role !== 'Admin') {
            router.replace('/')
          } else {
            setRole(role)
          }
        })
        .catch(() => {
          router.replace('/')
        })
    } catch {
      router.push('/auth/login')
    }
  }, [router])

  const [playable, setPlayable] = useState(false)
  const [gitUrl, setGitUrl] = useState('')
  const [zipFile, setZipFile] = useState<File | null>(null)
  const [cover, setCover] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [genreSearch, setGenreSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const genreRef = useRef<HTMLDivElement>(null)
  const genreInputRef = useRef<HTMLInputElement>(null)

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    )
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (genreRef.current && !genreRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
        setGenreSearch('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filteredGenres = ALL_GENRES.filter(
    g => g.toLowerCase().includes(genreSearch.toLowerCase()) && !selectedGenres.includes(g)
  )

  const [addModels, setAddModels] = useState(false)
  const [models, setModels] = useState<FileList | null>(null)
  const [images, setImages] = useState<FileList | null>(null)
  const [videos, setVideos] = useState<FileList | null>(null)

  const onModelsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModels(e.target.files)
  }
  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files)
  }
  const onVideosChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideos(e.target.files)
  }

  const [authorQuery, setAuthorQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SuggestedUser[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<SuggestedUser[]>([])
  const [authorDropdownOpen, setAuthorDropdownOpen] = useState(false)
  const authorInputRef = useRef<HTMLInputElement>(null)

  const authorDropdownRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!authorDropdownOpen) {
      setSuggestions([])
      return
    }
    const token = localStorage.getItem('token')
    if (!token) return

    const queryParam = encodeURIComponent(authorQuery.trim())
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL_API}/user/search?query=${queryParam}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(async res => {
        if (!res.ok) throw new Error('Ошибка поиска пользователей')
        const payload = (await res.json()) as { users: SuggestedUser[] }
        const filtered = payload.users.filter(u =>
          !selectedAuthors.some(sa => sa._id === u._id)
        )
        setSuggestions(filtered)
      })
      .catch(() => {
        setSuggestions([])
      })
  }, [authorQuery, selectedAuthors, authorDropdownOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        authorDropdownOpen &&
        authorInputRef.current &&
        authorDropdownRef.current &&
        !authorInputRef.current.contains(target) &&
        !authorDropdownRef.current.contains(target)
      ) {
        setAuthorDropdownOpen(false)
        setAuthorQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [authorDropdownOpen])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (playable && !zipFile) {
      alert('Выберите ZIP-файл для WebGL-билда')
      return
    }
    if (!cover) {
      alert('Выберите главное фото')
      return
    }
    if (!playable && !gitUrl) {
      alert('Укажите ссылку на GitHub')
      return
    }
    if ((!images || images.length === 0) && (!videos || videos.length === 0)) {
      alert('Загрузите хотя бы одно изображение или видео')
      return
    }

    const form = new FormData()
    if (playable && zipFile) form.append('file', zipFile)
    form.append('cover', cover)
    form.append('githubUrl', gitUrl)
    form.append('title', title)
    form.append('description', description)
    form.append('uploader', uploader)

    selectedGenres.forEach(g => form.append('genres', g))

    selectedAuthors.forEach(a => form.append('authors', a._id))

    if (addModels && models) {
      Array.from(models).forEach(m => form.append('models', m))
    }
    if (images) {
      Array.from(images).forEach(img => form.append('images', img))
    }
    if (videos) {
      Array.from(videos).forEach(v => form.append('videos', v))
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/games`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      router.push('/games')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message: string }>
        if (axiosErr.response?.status === 409) {
          alert(`Ошибка: Обнаружен дубликат`)
          return
        }
      }
      alert(`Не удалось загрузить игру: ${err instanceof Error ? err.message : err}`)
    }
  }

  if (role === null) {
    return <p>Проверяем доступ…</p>
  }

  return (
    <main className={styles.container}>
      <div
        style={{
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Link href="/games">
          <button className={styles.backButton}>← Назад</button>
        </Link>
        <h1 className={styles.heading}>Загрузить новую игру</h1>
      </div>
      <form onSubmit={onSubmit} className={styles.form}>
        {/* Cover */}
        <div className={styles.formGroup}>
          <label>Главное фото (cover):</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => e.target.files && setCover(e.target.files[0])}
            className={styles.fileInput}
          />
        </div>

        {/* Title */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Название:</label>
          <input
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Описание:</label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Жанры */}
        <div className={styles.formGroup} ref={genreRef}>
          <label className={styles.label}>Жанры:</label>
          <div className={styles.genreSelect}>
            <div
              className={styles.selectedContainer}
              onClick={() => setDropdownOpen(true)}
            >
              {selectedGenres.map(g => (
                <span key={g} className={styles.genreBadge}>
                  {g}{' '}
                  <button type="button" onClick={() => toggleGenre(g)}>
                    ×
                  </button>
                </span>
              ))}
              <input
                ref={genreInputRef}
                type="text"
                placeholder="Поиск жанров…"
                className={styles.genreInput}
                value={genreSearch}
                onChange={e => {
                  setGenreSearch(e.target.value)
                  setDropdownOpen(true)
                }}
                onFocus={() => setDropdownOpen(true)}
              />
            </div>
            {dropdownOpen && (
              <ul className={styles.genreDropdown}>
                {filteredGenres.length > 0 ? (
                  filteredGenres.map(g => (
                    <li
                      key={g}
                      className={styles.genreItem}
                      onClick={() => {
                        toggleGenre(g)
                        setGenreSearch('')
                        genreInputRef.current?.focus()
                      }}
                    >
                      {g}
                    </li>
                  ))
                ) : (
                  <li className={styles.noResults}>Нет жанров</li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* --- Блок соавторов --- */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Соавторы (необязательно):</label>

          {/* 5.1) Список выбранных соавторов (в отдельном контейнере) */}
          {selectedAuthors.length > 0 && (
            <div className={styles.selectedAuthorsList}>
              {selectedAuthors.map(a => (
                <span key={a._id} className={styles.authorBadge}>
                  {a.displayName}{' '}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedAuthors(prev =>
                        prev.filter(x => x._id !== a._id)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* 5.2) Поле поиска (полная ширина) */}
          <input
            ref={authorInputRef}
            type="text"
            placeholder="Начните вводить имя соавтора…"
            className={styles.input}
            value={authorQuery}
            onChange={e => {
              setAuthorQuery(e.target.value)
              setAuthorDropdownOpen(true)
            }}
            onFocus={() => setAuthorDropdownOpen(true)}
          />

          {/* 5.3) Выпадашка с кандидатами */}
          {authorDropdownOpen && suggestions.length > 0 && (
            <ul className={styles.authorDropdown} ref={authorDropdownRef}>
              {suggestions.map(u => (
                <li
                  key={u._id}
                  className={styles.authorDropdownItem}
                  onClick={() => {
                    setSelectedAuthors(prev => [...prev, u])
                    setAuthorQuery('')
                    setSuggestions([])
                    authorInputRef.current?.focus()
                  }}
                >
                  <span className={styles.authorName}>{u.displayName}</span>{' '}
                  <span className={styles.authorEmail}>({u.email})</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Играбельность */}
        <label className={styles.checkboxGroup}>
          <input
            type="checkbox"
            checked={playable}
            onChange={() => setPlayable(v => !v)}
          />
          Играбельная в браузере (ZIP WebGL)
        </label>

        {/* ZIP при необходимости */}
        {playable && (
          <div className={styles.formGroup}>
            <label>ZIP WebGL-билда:</label>
            <input
              type="file"
              accept=".zip"
              onChange={e => e.target.files && setZipFile(e.target.files[0])}
              className={styles.fileInput}
            />
          </div>
        )}

        {/* GitHub URL */}
        <div className={styles.formGroup}>
          <label>GitHub URL:</label>
          <input
            type="url"
            value={gitUrl}
            onChange={e => setGitUrl(e.target.value)}
            placeholder="https://github.com/..."
            className={styles.input}
          />
        </div>

        {/* 3D модели */}
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            checked={addModels}
            onChange={() => setAddModels(v => !v)}
          />
          <label>Добавить 3D модели</label>
        </div>
        {addModels && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Выбрать модели (.glb, .gltf):</label>
            <input
              type="file"
              accept=".glb,.gltf"
              multiple
              onChange={onModelsChange}
              className={styles.fileInput}
            />
          </div>
        )}

        {/* Изображения */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Изображения игры:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onImagesChange}
            className={styles.fileInput}
          />
        </div>

        {/* Видео */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Видео:</label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={onVideosChange}
            className={styles.fileInput}
          />
        </div>

        {/* Submit */}
        <button type="submit" className={styles.submitButton}>
          Загрузить
        </button>
      </form>
    </main>
  )
}