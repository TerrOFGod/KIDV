/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './games.module.css'
import axios from 'axios'

type Game = {
  _id: string
  title: string
  description: string
  cover?: string
  genres: string[]
  playable: boolean
  createdAt: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!
const IMAGES_BASE = process.env.NEXT_PUBLIC_MINIO_IMAGES_BASE_URL!

export default function GamesPage() {
  const router = useRouter()
  const [allGames, setAllGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [searchResults, setSearchResults] = useState<Game[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [userRole, setUserRole] = useState<string | null>(null)

  // Get all unique genres
  const allGenres = ['all', ...new Set(allGames.flatMap(game => game.genres))]

  useEffect(() => {
    fetchGames()
    checkUserRole()
  }, [])

  useEffect(() => {
    filterAndSortGames()
  }, [allGames, searchTerm, selectedGenre, sortBy])

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${API_URL}/games`)
      setAllGames(response.data)
    } catch (error) {
      console.error('Error fetching games:', error)
    }
  }

  const checkUserRole = () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const { id: userId } = JSON.parse(atob(token.split('.')[1])) as { id: string }
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
        { id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(res => {
        setUserRole(res.data.profile.role)
      }).catch(() => {
        setUserRole(null)
      })
    } catch (error) {
      console.error('Error checking user role:', error)
    }
  }

  const filterAndSortGames = () => {
    let filtered = allGames

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(game => game.genres.includes(selectedGenre))
    }

    // Sort games
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredGames(filtered)
  }

  // Search functionality for dropdown
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
      return
    }

    const filtered = allGames.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5) // Limit to 5 results for dropdown

    setSearchResults(filtered)
  }, [searchTerm, allGames])

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const tgt = e.target as Node
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(tgt) &&
        !dropdownRef.current.contains(tgt)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  useEffect(() => {
    if (open && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: 'absolute',
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
        maxHeight: '300px',
        overflowY: 'auto',
        zIndex: 2000,
      })
    }
  }, [open])

  const results = searchTerm ? searchResults : []

  return (
    <main className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <h1>All Games & Projects</h1>
          <p className={styles.subtitle}>Explore student creations and research projects</p>
        </div>

        {userRole === 'Admin' && (
          <Link href="/upload">
            <button className={styles.uploadButton}>Upload New Project</button>
          </Link>
        )}
      </header>

      {/* Search and Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search games by title, description, or genre..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
          />
        </div>

        <div className={styles.filterControls}>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className={styles.filterSelect}
          >
            {allGenres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Search Dropdown */}
      {open && searchTerm && createPortal(
        <>
          {results.length > 0 && <div className={styles.backdrop} />}
          <div ref={dropdownRef} style={dropdownStyle} className={styles.dropdown}>
            {results.map(game => (
              <Link
                key={game._id}
                href={`/games/${game._id}`}
                className={styles.dropdownItem}
                onClick={() => setOpen(false)}
              >
                <div className={styles.cardImage}>
                  {game.cover ? (
                    <Image
                      src={`${IMAGES_BASE}/${encodeURIComponent(game.cover)}`}
                      alt={game.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  ) : (
                    <div className={styles.cardIcon}>🎮</div>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{game.title}</h3>
                  <p className={styles.cardDesc}>{game.description}</p>
                  <div className={styles.genreTags}>
                    {game.genres.slice(0, 2).map(genre => (
                      <span key={genre} className={styles.genreTag}>{genre}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>,
        document.body
      )}

      {/* Games Grid */}
      <div className={styles.content}>
        <div className={styles.statsBar}>
          <span className={styles.statsText}>
            Showing {filteredGames.length} of {allGames.length} games
          </span>
          {selectedGenre !== 'all' && (
            <button
              onClick={() => setSelectedGenre('all')}
              className={styles.clearFilter}
            >
              Clear genre filter
            </button>
          )}
        </div>

        {filteredGames.length > 0 ? (
          <div className={styles.grid}>
            {filteredGames.map(game => (
              <div key={game._id} className={styles.card}>
                <Link href={`/games/${game._id}`} className={styles.cardLink}>
                  <div className={styles.cardImage}>
                    {game.cover ? (
                      <Image
                        src={`${IMAGES_BASE}/${encodeURIComponent(game.cover)}`}
                        alt={game.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                    ) : (
                      <div className={styles.cardIcon}>🎮</div>
                    )}
                    {game.playable && (
                      <div className={styles.playableBadge}>Playable</div>
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{game.title}</h3>
                    <p className={styles.cardDesc}>{game.description}</p>
                    <div className={styles.cardFooter}>
                      <div className={styles.genreTags}>
                        {game.genres.slice(0, 3).map(genre => (
                          <span key={genre} className={styles.genreTag}>{genre}</span>
                        ))}
                      </div>
                      <button className={styles.cardButton}>
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h3>No games found</h3>
            <p>
              {searchTerm || selectedGenre !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No games available at the moment'
              }
            </p>
            {(searchTerm || selectedGenre !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedGenre('all')
                }}
                className={styles.clearAllButton}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  )
}