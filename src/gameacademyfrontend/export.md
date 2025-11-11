# Project Structure

```
.next/
app/
  admin/
    games/
      admin-games.module.css
      page.tsx
    users/
      admin-users.module.css
      page.tsx
    page.tsx
  auth/
    login/
      login.module.css
      page.tsx
    register/
      page.tsx
      register.module.css
  games/
    [id]/
      play/
        ClientGame.tsx
        ClientGameWrapper.tsx
        page.tsx
        play.module.css
      AuthorsBlock.tsx
      BreadcrumbsAndHeader.tsx
      ClientCommentsSection.tsx
      comments.module.css
      CommentsSection.tsx
      game-overview.module.css
      media-gallery.module.css
      MediaGallery.tsx
      ModelsViewer.tsx
      ModelsViewerWrapper.tsx
      page.tsx
    games.module.css
    page.tsx
  hall-of-fame/
    page.tsx
  map-success/
    page.tsx
  news/
    [slug]/
      page.tsx
    page.tsx
  portfolio/
    [slug]/
      page.tsx
    page.tsx
  profile/
    page.tsx
  staff/
    [slug]/
      page.tsx
    page.tsx
  upload/
    page.tsx
    upload.module.css
  error.module.css
  error.tsx
  globals.css
  layout.tsx
  not-found.module.css
  not-found.tsx
  page.module.css
  page.tsx
assets/
components/
  features/
    admin/
      forms/
        NewsForm.tsx
        PortfolioForm.tsx
        ProjectForm.tsx
        StaffForm.tsx
      NewsManagement.tsx
      PortfolioManagement.tsx
      ProjectsManagement.tsx
      StaffManagement.tsx
      UsersManagement.tsx
    auth/
      LoginModal.tsx
      RegisterModal.tsx
    hallOfFame/
      CallToAction.tsx
      EmptyHallOfFame.tsx
      HallOfFameHeader.tsx
      ProjectAuthors.tsx
      ProjectCard.tsx
      ProjectGrid.tsx
    news/
      FullWidthImage.tsx
      MarkdownContent.tsx
      NewsCard.tsx
      NewsFilterPanel.tsx
      NewsGrid.tsx
      NewsSidebar.tsx
    portfolio/
      detail/
        EmptyPortfolio.tsx
        PhaseModal.tsx
        PortfolioDetail.tsx
        ProjectAuthors.tsx
        ProjectContent.tsx
        ProjectCover.tsx
        ProjectSidebar.tsx
      CategoryFilter.tsx
      EmptyProjects.tsx
      PortfolioStats.tsx
      ProjectCard.tsx
      ProjectsGrid.tsx
      SearchFilter.tsx
    staff/
      detail/
        StaffAchievements.tsx
        StaffContacts.tsx
        StaffHeader.tsx
        StaffProjects.tsx
        StaffSkills.tsx
      EmptyStaff.tsx
      SkillFilter.tsx
      StaffCard.tsx
      StaffCardGameStyle.tsx
      StaffGrid.tsx
    successStories/
      SuccessMapView.tsx
      SuccessMarker.tsx
      YearFilter.tsx
    Modal.tsx
    SkillDetailModal.tsx
    SkillTree.tsx
    SocialLinks.tsx
  layout/
    AnimatedDiv.tsx
    AnimatedSection.tsx
    Footer.tsx
    Header.tsx
    Layout.tsx
    ProjectTimeline.tsx
  sections/
    Awards.tsx
    Blog.tsx
    Contact.tsx
    FAQ.tsx
    Hero.tsx
    Partners.tsx
    Projects.tsx
    Team.tsx
  ui/
    BackButton.tsx
    BackToTopButton.tsx
    ImageSlider.tsx
    Label.tsx
    PageTitle.tsx
    ScrollToTop.tsx
    SectionWrapper.tsx
  ClientWrapper.tsx
  header.module.css
  header.tsx
  UnityCleanup.tsx
  useAuthExp.ts
contexts/
  AuthContext.tsx
data/
  categories.ts
  news.ts
  portfolio.ts
  roles.ts
  staff.ts
  successStories.ts
public/
types/
  news.d.ts
  portfolio.d.ts
  roles.d.ts
  staff.d.ts
  studentProject.d.ts
  successStories.d.ts
utils/
  imageUtils.ts
  markdownUtils.ts
.env.local
```


## app\admin\games\admin-games.module.css

```css
.container {
    padding: 24px;
}

.error {
    color: red;
    text-align: center;
    margin-top: 20px;
}

.section {
    margin-bottom: 40px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
}

.table th,
.table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.table th {
    background: #f5f5f5;
}

.deleteBtn {
    background: #ff4d4f;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.deleteBtn:hover {
    opacity: 0.9;
}

.hashCell {
    font-family: monospace;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.meta {
    font-size: 0.85rem;
    max-height: 80px;
    overflow: auto;
}
```


## app\admin\games\page.tsx

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthExpiration } from '@/components/useAuthExp';
import axios from 'axios';
import styles from './admin-games.module.css';

interface Game {
  _id: string;
  title: string;
  uploader: string;
  createdAt: string;
}

interface Duplicate {
    _id: string;
    zipHash: string;
    author?: string;
    productName?: string;
    fileHashes?: Record<string, string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: Record<string, any>;
    createdAt: string;
  }

export default function AdminGamesPage() {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [dups, setDups] = useState<Duplicate[]>([]);
  const [error, setError] = useState<string>('');
  useAuthExpiration()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.replace('/');
    const payload = JSON.parse(atob(token.split('.')[1])) as { id: string };
    const userId = payload.id;
    axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
      { id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      if (res.data.profile.role !== 'Admin') router.replace('/');
    }).catch(() => router.replace('/'));
  }, [router]);

  useEffect(() => {
    axios.get<{ games: Game[] }>(`${process.env.NEXT_PUBLIC_API_URL}/admin/games`)
      .then(res => setGames(res.data.games))
      .catch(() => setError('Не удалось загрузить игры'));
    axios.get<{ duplicates: Duplicate[] }>(`${process.env.NEXT_PUBLIC_API_URL}/admin/duplicates`)
      .then(res => setDups(res.data.duplicates))
      .catch(() => setError('Не удалось загрузить историю дубликатов'));
  }, []);

  const deleteGame = async (id: string) => {
    if (!confirm('Удалить эту игру?')) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/games/delete`, { id });
      setGames(g => g.filter(x => x._id !== id));
    } catch {
      alert('Ошибка при удалении игры');
    }
  };

  const deleteDup = async (id: string) => {
    if (!confirm('Удалить запись дубликата?')) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/duplicates/delete`, { id });
      setDups(d => d.filter(x => x._id !== id));
    } catch {
      alert('Ошибка при удалении дубликата');
    }
  };

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <main className={styles.container}>
      <h1>Админ-панель: Игры и Дубликаты</h1>

      <section className={styles.section}>
        <h2>Все игры</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Uploader</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map(g => (
              <tr key={g._id}>
                <td>{g.title}</td>
                <td>{g.uploader}</td>
                <td>{new Date(g.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => deleteGame(g._id)} className={styles.deleteBtn}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2>История дубликатов</h2>
        <table className={styles.table}>
            <thead>
            <tr>
                <th>Zip-hash</th>
                <th>Author</th>
                <th>Product</th>
                <th>Files&nbsp;(&nbsp;#&nbsp;)</th>
                <th>Meta</th>
                <th>Created</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {dups.map(d => (
                <tr key={d._id}>
                <td className={styles.hashCell}>{d.zipHash}</td>
                <td>{d.author || '—'}</td>
                <td>{d.productName || '—'}</td>

                {/* количество файлов и разворачиваемое содержимое */}
                <td>
                    {d.fileHashes ? Object.keys(d.fileHashes).length : 0}
                    {d.fileHashes && (
                    <details>
                        <summary>детали</summary>
                        <pre className={styles.meta}>
                            {JSON.stringify(d.fileHashes, null, 2)}
                        </pre>
                    </details>
                    )}
                </td>

                <td>
                    <pre className={styles.meta}>
                        {JSON.stringify(d.metadata, null, 2)}
                    </pre>
                </td>

                <td>{new Date(d.createdAt).toLocaleString()}</td>

                <td>
                    <button
                    onClick={() => deleteDup(d._id)}
                    className={styles.deleteBtn}
                    >
                    Удалить
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </section>
    </main>
  );
}
```


## app\admin\users\admin-users.module.css

```css
.container {
    padding: 24px;
}

.error {
    color: red;
    text-align: center;
    margin-top: 20px;
}

.searchInput {
    padding: 8px;
    width: 250px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
}

.table th,
.table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.table th {
    background: #f5f5f5;
}

.deleteBtn {
    background: #ff4d4f;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.deleteBtn:hover {
    opacity: 0.9;
}

.container {
    padding: 24px;
}

.error {
    color: red;
    text-align: center;
    margin-top: 20px;
}

.searchInput {
    padding: 8px;
    width: 250px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
}

.table th,
.table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.table th {
    background: #f5f5f5;
}

.deleteBtn {
    background: #ff4d4f;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.deleteBtn:hover {
    opacity: 0.9; 
}
```


## app\admin\users\page.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './admin-users.module.css';
import { useAuthExpiration } from '@/components/useAuthExp';

interface User {
  email: string;
  displayName?: string;
  role: string;
}

interface UsersResponse {
  users: User[];
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  useAuthExpiration()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/');
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1])) as { id: string };
    const userId = payload.id;
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
        { id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const role = res.data.profile.role;
        if (role !== 'Admin') {
          router.replace('/');
        }
      })
      .catch(() => {
        router.replace('/');
      });
  }, [router]);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      const url = searchTerm
        ? `${process.env.NEXT_PUBLIC_API_URL_API}/user/search?query=${encodeURIComponent(searchTerm)}`
        : `${process.env.NEXT_PUBLIC_API_URL_API}/user/users`;

      const { data } = await axios.get<UsersResponse>(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.users);
      setError('');
    } catch {
      setError('Не удалось загрузить список пользователей');
    }
  };

  useEffect(() => {
    loadUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const onRoleChange = async (email: string, newRole: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/users/change-role`,
        { email, newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, role: newRole } : u))
      );
    } catch {
      alert('Ошибка при смене роли');
    }
  };

  const onDelete = async (email: string) => {
    if (!confirm(`Удалить пользователя ${email}?`)) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/delete`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.filter((u) => u.email !== email));
    } catch {
      alert('Ошибка при удалении пользователя');
    }
  };

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <main className={styles.container}>
      <h1>Управление пользователями</h1>

      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Поиск по имени…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput} 
        />
        <button onClick={loadUsers} style={{ marginLeft: '8px' }}>
          Найти
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Имя</th>
            <th>Роль</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email}>
              <td>{u.email}</td>
              <td>{u.displayName || '-'}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => onRoleChange(u.email, e.target.value)}
                >
                  {['Guest', 'Student', 'Teacher', 'Admin'].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(u.email)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
```


## app\admin\page.tsx

```tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import NewsManagement from '@/components/features/admin/NewsManagement';
import PortfolioManagement from '@/components/features/admin/PortfolioManagement';
import ProjectsManagement from '@/components/features/admin/ProjectsManagement';
import StaffManagement from '@/components/features/admin/StaffManagement';
import UsersManagement from '@/components/features/admin/UsersManagement';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  //useEffect(() => {
    //if (!isAuthenticated || user?.role !== 'Admin') {
      //router.push('/');
    //}
  //}, [isAuthenticated, user, router]);

  //if (!isAuthenticated || user?.role !== 'Admin') {
    //return (
      //<div className="min-h-screen flex items-center justify-center">
        //<div className="text-center">
          //<h2 className="text-2xl font-bold mb-4">Доступ запрещен</h2>
          //<p className="text-gray-600">Требуются права администратора</p>
       //</div>
      //</div>
    //);
  //}

  const adminTabs = [
    { id: 'dashboard', label: 'Дашборд', icon: '📊' },
    { id: 'users', label: 'Пользователи', icon: '👥' },
    { id: 'news', label: 'Блог', icon: '📝' },
    { id: 'portfolio', label: 'Портфолио', icon: '💼' },
    { id: 'projects', label: 'Проекты', icon: '🚀' },
    { id: 'staff', label: 'Команда', icon: '👥' },
    { id: 'settings', label: 'Настройки', icon: '⚙️' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Хлебные крошки */}
          <nav className="mb-8">
            <button
              onClick={() => router.push('/')}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              ← На главную
            </button>
          </nav>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Заголовок админки */}
            <div className="bg-blue-300 text-white p-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Админ-панель</h1>
                  <p className="text-primary/80 text-lg">Управление платформой</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-80">Администратор</p>
                  <p className="font-semibold">{user?.displayName}</p>
                </div>
              </div>
            </div>

            {/* Основной контент */}
            <div className="flex">
              {/* Боковая панель */}
              <div className="w-64 bg-gray-50 border-r border-gray-200">
                <nav className="p-4 space-y-2">
                  {adminTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-300 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Контент */}
              <div className="flex-1 p-8">
                {activeTab === 'dashboard' && <AdminDashboard />}
                {activeTab === 'users' && <UsersManagement />}
                {activeTab === 'news' && <NewsManagement />}
                {activeTab === 'portfolio' && <PortfolioManagement />}
                {activeTab === 'projects' && <ProjectsManagement />}
                {activeTab === 'staff' && <StaffManagement />}
                {activeTab === 'settings' && <AdminSettings />}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const stats = [
    { label: 'Всего пользователей', value: '1,234', change: '+12%' },
    { label: 'Активных проектов', value: '89', change: '+5%' },
    { label: 'Новых за неделю', value: '34', change: '+8%' },
    { label: 'Онлайн сейчас', value: '56', change: '+3%' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Обзор системы</h2>
      
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Быстрые действия */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Добавить пользователя', description: 'Создать нового пользователя', action: '➕' },
          { title: 'Модерация проектов', description: 'Проверить новые проекты', action: '👁️' },
          { title: 'Системные настройки', description: 'Настройки платформы', action: '⚙️' },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <span className="text-2xl">{item.action}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            <button className="w-full bg-blue-300 text-white py-2 rounded-lg hover:bg-blue-300/90 transition-colors">
              Перейти
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Настройки системы</h2>
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Компонент настроек системы</p>
      </div>
    </div>
  );
}
```


## app\auth\login\login.module.css

```css
.container {
    max-width: 400px;
    margin: 80px auto;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
    margin-bottom: 16px;
    font-size: 1.5rem;
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.input {
    padding: 8px 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.button {
    padding: 10px 16px;
    font-size: 1rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.button:hover {
    background-color: #005bb5;
}

.error {
    margin-top: 8px;
    color: #d00;
    font-size: 0.9rem;
    text-align: center;
}

.registerLink {
    margin-top: 12px;
    font-size: 0.9rem;
    color: #555;
}

.link {
    color: #0070f3;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline; 
}
```


## app\auth\login\page.tsx

```tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/games');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Ошибка авторизации');
        return;
      }
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      router.push('/games');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка авторизации');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Вход</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          suppressHydrationWarning
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Войти
        </button>
      </form>

      <p className={styles.registerLink}>
        Нет аккаунта?&nbsp;
        <Link href="/auth/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
```


## app\auth\register\page.tsx

```tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/games');
    }
  }, [router]);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Ошибка регистрации');
        return;
      }

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
      }

      router.push('/auth/login');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Имя"
          className={styles.input}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Зарегистрироваться
        </button>
      </form>

      <p className={styles.registerLink}>
        Уже есть аккаунт?&nbsp;
        <Link href="/auth/login" className={styles.link}>
          Войти в него
        </Link>
      </p>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
```


## app\auth\register\register.module.css

```css
.container {
    max-width: 400px;
    margin: 80px auto;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
    margin-bottom: 16px;
    font-size: 1.5rem;
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.input {
    padding: 8px 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.button {
    padding: 10px 16px;
    font-size: 1rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.button:hover {
    background-color: #005bb5;
}

.error {
    margin-top: 8px;
    color: #d00;
    font-size: 0.9rem;
    text-align: center;
}

.registerLink {
    margin-top: 12px;
    font-size: 0.9rem;
    color: #555;
}

.link {
    color: #0070f3;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}
```


## app\games\[id]\play\ClientGame.tsx

```tsx
'use client'

import { useEffect } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'
import styles from './play.module.css'

interface ClientGameProps {
  prefix: string
  canvasClass: string
}

export default function ClientGame({ prefix, canvasClass }: ClientGameProps) {
  const base = `${process.env.NEXT_PUBLIC_MINIO_BASE_URL}/${prefix}Build/`
  const {
    unityProvider,
    unload,
    loadingProgression,
    isLoaded,
  } = useUnityContext({
    loaderUrl:    `${base}UnityLoader.js`,
    dataUrl:      `${base}YourGame.data.br`,
    frameworkUrl: `${base}YourGame.framework.js.br`,
    codeUrl:      `${base}YourGame.wasm.br`,
  })

  useEffect(() => {
    return () => {
      if (typeof unload === 'function') {
        unload().catch((e) => {
          console.debug('Unity unload failed (ignored):', e)
        })
      }
    }
  }, [unload])

  return (
    <div className={styles.gameWrapper}>
      {!isLoaded && (
        <p className={styles.gameLoading}>
          Загрузка {Math.round(loadingProgression * 100)}%
        </p>
      )}
      <Unity unityProvider={unityProvider} className={`${canvasClass} unity-canvas`} />
    </div>
  )
}
```


## app\games\[id]\play\ClientGameWrapper.tsx

```tsx
'use client';

import dynamic from 'next/dynamic';

const ClientGame = dynamic(() => import('./ClientGame'), { ssr: false });

export default function ClientGameWrapper({
  prefix,
  canvasClass,
}: {
  prefix: string;
  canvasClass: string;
}) {
  return <ClientGame prefix={prefix} canvasClass={canvasClass} />;
}
```


## app\games\[id]\play\page.tsx

```tsx
import ClientGameWrapper from './ClientGameWrapper';
import styles from './play.module.css';
import { BreadcrumbsAndHeader } from '../BreadcrumbsAndHeader';

export default async function PlayPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return <p>Ошибка {res.status}: игра не найдена</p>;
  }
  const game = await res.json();

  return (
    <main className={styles.container}>
    <BreadcrumbsAndHeader title={game.title} id={id} />

      <div className={styles.gameWrapper}>
        {!game && <p className={styles.gameLoading}>Загрузка...</p>}
        <ClientGameWrapper prefix={game.prefix} canvasClass={styles.unityCanvas} />
      </div>
    </main>
  );
}
```


## app\games\[id]\play\play.module.css

```css
.breadcrumbs {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 8px;
}

.breadcrumbLink {
    color: #0070f3;
    text-decoration: none;
    transition: text-decoration 0.2s ease;
}

.breadcrumbLink:hover {
    text-decoration: underline;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
}

.headerRow {
    position: relative;
    display: flex;
    align-items: center;
}


.title {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0 auto;
    text-align: center;
}

.backButton {
    position: absolute;
    left: 0;
    background: transparent;
    border: none;
    color: #777;
    font-size: 1rem;
    padding: 4px 8px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s ease;
}

.backButton:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

.unityCanvas {
    width: 100% !important;
    height: auto !important;
    max-height: 80vh;
}

.gameLoading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1rem;
}

.unityCanvas {
    width: 100% !important;
    height: 100% !important;
}
```


## app\games\[id]\AuthorsBlock.tsx

```tsx
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
```


## app\games\[id]\BreadcrumbsAndHeader.tsx

```tsx
'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import styles from './game-overview.module.css'

interface Props {
  title: string
  id: string
}

export function BreadcrumbsAndHeader({ title, id }: Props) {
  const search = useSearchParams()
  const pathname = usePathname()
  const from = search.get('from')
  const isPlay = pathname.endsWith('/play')

  const rootLink = from === 'profile'
    ? { href: '/profile', text: 'Мои проекты' }
    : { href: '/games',   text: 'Все проекты' }

  const overviewLink = from === 'profile'
    ? { href: `/games/${id}?from=profile`, text: title }
    : { href: `/games/${id}`,             text: title }

  return (
    <>
      <nav className={styles.breadcrumbs}>
        <Link href={rootLink.href} className={styles.breadcrumbLink}>
          {rootLink.text}
        </Link>
        {' / '}
        {isPlay ? (
          <>
            <Link href={overviewLink.href} className={styles.breadcrumbLink}>
              {overviewLink.text}
            </Link>
            {' / '}
            <span>Play</span>
          </>
        ) : (
          <span>{overviewLink.text}</span>
        )}
      </nav>

      <div className={styles.headerRow}>
        <Link
          href={isPlay ? overviewLink.href : rootLink.href}
          className={styles.backButton}
        >
          {isPlay
            ? '← Назад к обзору'
            : from === 'profile'
              ? '← Назад в профиль'
              : '← Все игры'
          }
        </Link>
        <h1 className={styles.title}>
          {isPlay ? `${title} (Запущено)` : title}
        </h1>
      </div>
    </>
  )
}
```


## app\games\[id]\ClientCommentsSection.tsx

```tsx
'use client'
import dynamic from 'next/dynamic';

export default dynamic(
  () => import('./CommentsSection'),
  { ssr: false }
);
```


## app\games\[id]\comments.module.css

```css
.comments {
    margin-top: 32px;
    font-family: sans-serif;
}

.list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.item {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    position: relative;
}

.topItem {
    margin-top: 16px;
}

.header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: #555;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #0070f3;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.name {
    font-weight: 600;
}

.role {
    font-style: italic;
    font-size: 0.85rem;
    color: #777;
}

.sep {
    color: #ccc;
}

.time {
    font-size: 0.8rem;
    color: #999;
}

.content {
    margin: 8px 0;
    line-height: 1.4;
}

.actionsRow {
    margin-bottom: 4px;
}

.reply {
    background: none;
    border: none;
    color: #0070f3;
    cursor: pointer;
    font-size: 0.85rem;
    padding: 2px 0;
}


.inlineForm {
    margin: 8px 0 16px;
}

.input {
    width: 100%;
    min-height: 64px;
    padding: 8px;
    margin-bottom: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    font-size: 0.95rem;
}

.buttonsRow {
    display: flex;
    gap: 8px;
    font-size: 0.9rem;
}

.send {
    background: #0070f3;
    color: white;
    border: none;
    padding: 6px 16px;
    cursor: pointer;
    border-radius: 4px;
}

.send:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.cancel {
    background: transparent;
    border: 1px solid #ccc;
    padding: 6px 16px;
    cursor: pointer;
    border-radius: 4px;
}

.cancel:hover {
    background: #f5f5f5;
}
```


## app\games\[id]\CommentsSection.tsx

```tsx
'use client'

import { useEffect, useState } from 'react'
import styles from './comments.module.css'

type Comment = {
  _id: string
  content: string
  author: { displayName: string; role: string }
  createdAt: string
  replies: Comment[]
}

const MAX_DEPTH = 3

export default function CommentsSection({ gameId }: { gameId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [text, setText] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)

  const BACKEND = process.env.NEXT_PUBLIC_API_URL_API!

  async function fetchComments() {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await fetch(`${BACKEND}/comments?gameId=${encodeURIComponent(gameId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error(`Ошибка ${res.status}`)
    const { comments: data } = (await res.json()) as { comments: Comment[] }
    setComments(data)
  }

  useEffect(() => {
    fetchComments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

  async function post() {
    const token = localStorage.getItem('token')
    if (!token) return alert('Войдите')
    const res = await fetch(`${BACKEND}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gameId, parent: replyTo, content: text }),
    })
    if (!res.ok) throw new Error(`Ошибка при отправке: ${res.status}`)
    setText('')
    setReplyTo(null)
    await fetchComments()
  }

  const renderList = (list: Comment[], depth = 0) => {
    const indent = depth > 0 ? Math.min(depth, MAX_DEPTH) * 20 : 0
    const listStyle: React.CSSProperties = {
      marginLeft: indent,
      paddingLeft: depth > 0 ? 12 : 0,
      borderLeft: depth > 0 ? '2px solid rgba(0,0,0,0.1)' : undefined,
    }

    return (
      <ul className={styles.list} style={listStyle}>
        {list.map(c => (
          <li
            key={c._id}
            className={`${styles.item} ${depth === 0 ? styles.topItem : ''}`}
          >
            <div className={styles.header}>
              <div className={styles.avatar}>{c.author.displayName[0]}</div>
              <span className={styles.name}>{c.author.displayName}</span>
              <span className={styles.sep}>·</span>
              <span className={styles.role}>{c.author.role}</span>
              <span className={styles.sep}>·</span>
              <span className={styles.time}>
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
            <p className={styles.content}>{c.content}</p>

            <div className={styles.actionsRow}>
              {/* Скрываем кнопку, если под этим комментом уже открыта форма */}
              {replyTo !== c._id && (
                <button
                  className={styles.reply}
                  onClick={() => {
                    setReplyTo(c._id)
                    setText(`@${c.author.displayName}, `)
                  }}
                >
                  Ответить
                </button>
              )}
            </div>

            {/* inline-форма под этим комментом */}
            {replyTo === c._id && (
              <div className={styles.inlineForm}>
                <textarea
                  className={styles.input}
                  placeholder="Ваш ответ…"
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
                <div className={styles.buttonsRow}>
                  <button
                    className={styles.send}
                    onClick={post}
                    disabled={!text.trim()}
                  >
                    Отправить
                  </button>
                  <button
                    className={styles.cancel}
                    onClick={() => {
                      setReplyTo(null)
                      setText('')
                    }}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}

            {/* рекурсия для вложенных ответов */}
            {c.replies.length > 0 && renderList(c.replies, depth + 1)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className={styles.comments}>
      <h2>Комментарии</h2>

      {/* форма для корневого комментария */}
      {replyTo === null && (
        <div className={styles.inlineForm}>
          <textarea
            className={styles.input}
            placeholder="Ваш комментарий…"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button
            className={styles.send}
            onClick={post}
            disabled={!text.trim()}
          >
            Отправить
          </button>
        </div>
      )}

      {renderList(comments)}
    </section>
  )
}
```


## app\games\[id]\game-overview.module.css

```css
.container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
}

.topRow {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
    align-items: stretch;
}

.mediaBlock,
.sidebarBlock {
    height: 100%;
    overflow: hidden;
}

.glassBlock {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.10);
    padding: 20px;
}

.mediaBlock {
    display: flex;
    flex-direction: column;
    height: 60vh;
    max-height: 80vh;
    overflow: hidden;
}

.mediaBlock .gallery {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
}

.sidebarBlock {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.coverContainer {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 12px;
    overflow: hidden;
}

.coverContainer img {
    border-radius: 12px !important;
}

.breadcrumbs {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 8px;
}

.breadcrumbLink {
    color: #0070f3;
    text-decoration: none;
    transition: text-decoration 0.2s ease;
}

.breadcrumbLink:hover {
    text-decoration: underline;
}

.headerRow {
    display: flex;
    align-items: center;
    position: relative;
}

.title {
    font-size: 2rem;
    font-weight: 600;
    margin: 0 auto;
    text-align: center;
    flex: 1;
}

.backButton {
    position: absolute;
    left: 0;
    background: transparent;
    border: none;
    color: #777;
    font-size: 1rem;
    padding: 4px 8px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s ease;
}

.backButton:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

.mediaPanel {
    display: flex;
    gap: 24px;
    align-items: flex-start;
}

.mediaPanel> :first-child {
    flex: 2;
}

.sidebar {
    flex: 1;
    display: flex;
    max-width: 320px;
    flex-direction: column;
    gap: 16px;
}

.coverContainer {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 12px;
    overflow: hidden;
    background: transparent;
}


.coverContainer img {
    border-radius: 12px !important;
}

.button {
    display: block;
    text-align: center;
    padding: 12px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s;
}

.button:hover {
    background-color: #005bb5;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    background-color: #0070f3;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.85rem;
}

.modelsSection {
    padding: 24px;
}

.modelsTitle {
    margin: 0 0 12px;
    font-size: 1.2rem;
}

.modelsGrid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.details {
    padding: 24px;
    line-height: 1.6;

    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.sectionTitle {
    margin-top: 0;
}

.imagesGrid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 12px;
}

.imageItem {
    position: relative;
    flex: 1 1 calc(33.333% - 12px);
    min-width: 120px;
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: 4px;
}

.videosSection {
    margin: 24px 0;
}

.videosGrid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.videoItem {
    flex: 0 0 45%;
    max-width: 45%;
    height: auto;
    border-radius: 4px;
    background: transparent;
}

.authorBlock {
    margin: 4px 0;
    padding: 16px;
    
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(6px);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.authorItem,
.coauthorsContainer {
    font-size: 0.95rem;
    
    color: #ffffff;
}


.authorName {
    font-weight: 600;
    color: #ffffff;
}


.authorBlockError {
    color: #ff6b6b;
    font-size: 0.9rem;
    margin-bottom: 12px;
}


.authorBlockTitle {
    font-size: 1rem;
    font-weight: 600;
    color: #f0f0f0;
    margin-bottom: 4px;
}
```


## app\games\[id]\media-gallery.module.css

```css
.gallery {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    gap: 12px;
}

.mainMedia {
    position: relative;
    width: 100%;
    flex: 1;
    background: transparent;
    border-radius: 8px;
    overflow: hidden;
}

.mainMedia img,
.mainMedia video {
    border-radius: 8px;
}

.mainVideo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: transparent;
}

.thumbs {
    flex: 0 0 auto;
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-gutter: stable;
}

.thumbs::-webkit-scrollbar {
    height: 6px;
}

.thumbs::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.thumbs::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
}

.thumbItem {
    flex: 0 0 auto;
    border: none;
    padding: 0;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
}

.thumbItem:not(.active):hover {
    opacity: 0.7;
}

.active {
    outline: 2px solid #0070f3;
}

.thumbVideo {
    width: 80px;
    height: 60px;
    object-fit: cover;
}
```


## app\games\[id]\MediaGallery.tsx

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './media-gallery.module.css';

type MediaItem = {
  type: 'image' | 'video';
  key: string;
};

interface MediaGalleryProps {
  images: string[];
  videos: string[];
  imagesBase: string;
  videosBase: string;
}

export default function MediaGallery({
  images,
  videos,
  imagesBase,
  videosBase,
}: MediaGalleryProps) {
  const all: MediaItem[] = [
    ...images.map((key) => ({ type: 'image' as const, key })),
    ...videos.map((key) => ({ type: 'video' as const, key })),
  ];

  const [selected, setSelected] = useState<MediaItem | null>(
    all.length > 0 ? all[0] : null
  );

  if (!selected) return null;

  return (
    <div className={styles.gallery}>
      <div className={styles.mainMedia}>
        {selected.type === 'image' ? (
          <Image
            src={`${imagesBase}/${encodeURIComponent(selected.key)}`}
            alt=""
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 66vw"
            quality={90}
            priority
            />
        ) : (
          <video
            src={`${videosBase}/${encodeURIComponent(selected.key)}`}
            controls
            className={styles.mainVideo}
          />
        )}
      </div>

      <div className={styles.thumbs}>
        {all.map((item) => {
          const isActive =
            item.key === selected.key && item.type === selected.type;

          return (
            <button
              key={`${item.type}-${item.key}`}
              className={`${styles.thumbItem} ${
                isActive ? styles.active : ''
              }`}
              onClick={() => setSelected(item)}
              type="button"
            >
              {item.type === 'image' ? (
                <Image
                  src={`${imagesBase}/${encodeURIComponent(item.key)}`}
                  alt=""
                  width={80}
                  height={60}
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              ) : (
                <video
                  src={`${videosBase}/${encodeURIComponent(item.key)}`}
                  muted
                  className={styles.thumbVideo}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```


## app\games\[id]\ModelsViewer.tsx

```tsx
'use client';

import React from 'react';

interface ModelsViewerProps {
  models: string[];
  baseUrl: string;
}

export default function ModelsViewer({ models, baseUrl }: ModelsViewerProps) {
  if (models.length === 0) return null;

  return (
    <section>
      <h2>3D Модели</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {models.map((key, i) => (
          // @ts-expect-error custom element
          <model-viewer
            key={i}
            src={`${baseUrl}/${key}`}
            alt={`Модель ${i + 1}`}
            auto-rotate
            camera-controls
            style={{ width: 300, height: 300, margin: 10 }}
          />
        ))}
      </div>
    </section>
  );
}
```


## app\games\[id]\ModelsViewerWrapper.tsx

```tsx
'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ModelsViewer = dynamic(() => import('./ModelsViewer'), {
  ssr: false,
});

interface Props {
  models: string[];
  baseUrl: string;
}

export default function ModelsViewerWrapper({ models, baseUrl }: Props) {
  return <ModelsViewer models={models} baseUrl={baseUrl} />;
}
```


## app\games\[id]\page.tsx

```tsx
import Link from 'next/link'
import Image from 'next/image'
import ModelsViewerWrapper from './ModelsViewerWrapper'
import MediaGallery from './MediaGallery'
import styles from './game-overview.module.css'
import { BreadcrumbsAndHeader } from './BreadcrumbsAndHeader'
import ClientCommentsSection from './ClientCommentsSection'
import AuthorsBlock from './AuthorsBlock'

type Game = {
  title: string
  description: string
  models: string[]
  images: string[]
  videos: string[]
  genres: string[]
  cover?: string
  playable: boolean
  githubUrl: string
  uploader: string
  authors: Array<string>
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!
const MODELS_BASE = process.env.NEXT_PUBLIC_MINIO_MODELS_BASE_URL!
const IMAGES_BASE = process.env.NEXT_PUBLIC_MINIO_IMAGES_BASE_URL!
const VIDEOS_BASE = process.env.NEXT_PUBLIC_MINIO_VIDEOS_BASE_URL!

export default async function GameOverview({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { from?: string }
}) {
  const { id } = params
  const from = searchParams.from

  const res = await fetch(`${API_URL}/games/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Не удалось загрузить игру')
  const game: Game = await res.json()

const authorId = game.uploader 

const rawAuthorIds: string[] = (game.authors || []).map((x) => x.toString())

const withoutUploader = rawAuthorIds.filter((x) => x !== authorId)

const uniqueCoauthorIds = Array.from(new Set(withoutUploader))

  const playHref = from
    ? `/games/${id}/play?from=${from}`
    : `/games/${id}/play`

  return (
    <main className={styles.container}>
      <BreadcrumbsAndHeader title={game.title} id={id} />

      {/* === ТОП: две колонки === */}
      <div className={styles.topRow}>
        {/* 1. Большая медиапанель */}
        <div className={`${styles.glassBlock} ${styles.mediaBlock}`}>
          <MediaGallery
            images={game.images}
            videos={game.videos}
            imagesBase={IMAGES_BASE}
            videosBase={VIDEOS_BASE}
          />
        </div>

        {/* 2. Боковая панель с cover + авторами + соавторами + кнопками */}
        <div className={`${styles.glassBlock} ${styles.sidebarBlock}`}>
          {game.cover && (
            <div className={styles.coverContainer}>
              <Image
                src={`${IMAGES_BASE}/${encodeURIComponent(game.cover)}`}
                alt={game.title}
                fill
                className={styles.coverImage}
                unoptimized
              />
            </div>
          )}

          {game.genres?.length > 0 && (
            <div className={styles.tags}>
              {game.genres.map((g) => (
                <span key={g} className={styles.tag}>
                  {g}
                </span>
              ))}
            </div>
          )}
          {game.playable && (
            <Link href={playHref} className={styles.button}>
              Играть ▶️
            </Link>
          )}
          {game.githubUrl && (
            <Link href={game.githubUrl} target="_blank" className={styles.button}>
              GitHub
            </Link>
          )}
        </div>
      </div>

      {/* === Блок 3: 3D модели === */}
      {game.models.length > 0 && (
        <section className={`${styles.glassBlock} ${styles.modelsSection}`}>
          <div className={styles.modelsGrid}>
            <ModelsViewerWrapper models={game.models} baseUrl={MODELS_BASE} />
          </div>
        </section>
      )}

      {/* === Блок 4: Описание === */}
      <section className={`${styles.glassBlock} ${styles.details}`}>
        <h2 className={styles.sectionTitle}>Описание</h2>
        <p>{game.description}</p>
      </section>

      {/* === Блок «Автор / Соавторы» === */}
      <AuthorsBlock
        authorId={authorId}
        coauthorIds={uniqueCoauthorIds}
      />

      {/* === Блок 5: Комментарии === */}
      <section className={styles.commentsSection}>
        <ClientCommentsSection gameId={id} />
      </section>
    </main>
  )
}
```


## app\games\games.module.css

```css
.container {
    padding: 0 20px;
}

.searchWrapper {
    position: relative;
    width: 100%;
    margin-bottom: 24px;
    overflow: visible;
    z-index: 3000;
}

.searchInput {
    width: 100%;
    padding: 8px 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
}

.backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1500;
    pointer-events: none;
}

.dropdown {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    max-height: 70vh;
    overflow-y: auto;
    z-index: 2000;
}

.dropdownItem {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    text-decoration: none;
    color: inherit;
    background: #fff;
    border-bottom: 1px solid #eee;
    min-height: 80px;
    border-radius: 0;
}

.dropdownItem:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.dropdownItem:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom: none;
}

.dropdownItem .cardImage {
    flex: 0 0 80px;
    width: 80px;
    height: 80px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
}

.dropdownItem .cardContent {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.dropdownItem .cardTitle {
    margin: 0;
    font-size: 1rem;
    line-height: 1.2;
}

.dropdownItem .cardDesc {
    margin: 4px 0 0;
    font-size: 0.85rem;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dropdownItem:hover {
    background: #f9f9f9;
}

.noResults {
    padding: 12px;
    color: #777;
    text-align: center;
}

.list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
    padding: 20px;
    list-style: none;
    margin: 0;
}

.card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cardImage {
    position: relative;
    width: 100%;
    height: 160px;
    overflow: hidden;
}

.cardIcon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    background: #f0f0f0;
}

.cardContent {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cardTitle {
    font-size: 1.1rem;
    margin: 0 0 8px;
    font-weight: 600;
}

.cardDesc {
    flex: 1;
    font-size: 0.95rem;
    color: #555;
    margin: 0 0 12px;
    line-height: 1.4;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.cardButton {
    width: 90%;
    margin: 0 auto 12px;
    padding: 8px 0;
    background-color: #0070f3;
    color: #fff;
    border: none;
    border-radius: 4px;
    text-align: center;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: auto;
}

.cardButton:hover {
    background-color: #005bb5;
}

.cardLink {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-decoration: none;
    color: inherit;
}

.pageHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
}

.uploadButton {
    padding: 8px 16px;
    background-color: #0070f3;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.uploadButton:hover {
    background-color: #005bb5;
}
```


## app\games\page.tsx

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import styles from './games.module.css'
import { usePathname } from 'next/navigation'
import axios from 'axios'

type Game = {
  _id: string
  title: string
  description: string
  cover?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!
const AUTH_API = process.env.NEXT_PUBLIC_API_URL_API!
const IMAGES_BASE = process.env.NEXT_PUBLIC_MINIO_IMAGES_BASE_URL!

export default function ProfileGamesList() {
  const pathname = usePathname()

  const [allGames, setAllGames] = useState<Game[]>([])
  const [searchResults, setSearchResults] = useState<Game[]>([])
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/games`)
      .then(r => r.json())
      .then((data: Game[]) => setAllGames(data))
  }, [])

  useEffect(() => {
    if (!q) {
      setSearchResults([])
      return
    }
    const url = new URL(`${API_URL}/games`)
    url.searchParams.set('q', q)
    fetch(url.toString())
      .then(r => r.json())
      .then((data: Game[]) => setSearchResults(data))
  }, [q])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const { id: userId } = JSON.parse(atob(token.split('.')[1])) as { id: string }
    axios.post(
        `${AUTH_API}/user/info`,
        { id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(res => {
        setUserRole(res.data.profile.role)
      }).catch(() => {
        setUserRole(null)
      })
  }, [])

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
        top: rect.bottom + window.scrollY + 16,
        left: rect.left + window.scrollX,
        width: rect.width,
        maxHeight: '70vh',
        overflowY: 'auto',
        zIndex: 2000,
      })
    }
  }, [open])

  const results = q ? searchResults : []

  return (
    <main>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Все проекты</h1>

          {userRole === 'Admin' && (
            <Link href="/upload">
              <button className={styles.uploadButton}>Новый проект</button>
            </Link>
          )}
        </header>

        <div className={styles.searchWrapper} key={pathname}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Поиск по названию, описанию или жанру…"
            className={styles.searchInput}
            value={q}
            onChange={e => { setQ(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
          />
        </div>
      </div>

      {open && q && createPortal(
        <>
          {results.length > 0 && <div className={styles.backdrop} />}
          <div ref={dropdownRef} style={dropdownStyle} className={styles.dropdown}>
            {results.length > 0 ? (
              results.map(g => (
                <Link
                  key={g._id}
                  href={`/profile/games/${g._id}`}
                  className={styles.dropdownItem}
                >
                  <div className={styles.cardImage}>
                    {g.cover
                      ? <Image
                          src={`${IMAGES_BASE}/${encodeURIComponent(g.cover)}`}
                          alt={g.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          unoptimized
                        />
                      : <div className={styles.cardIcon}>🎮</div>
                    }
                  </div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{g.title}</h2>
                    <p className={styles.cardDesc}>{g.description}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.noResults}>Ничего не найдено</div>
            )}
          </div>
        </>,
        document.body
      )}

      <ul className={styles.list}>
        {allGames.map(g => (
          <li key={g._id} className={styles.card}>
            <Link href={`/profile/games/${g._id}`} className={styles.cardLink}>
              <div className={styles.cardImage}>
                {g.cover
                  ? <Image
                      src={`${IMAGES_BASE}/${encodeURIComponent(g.cover)}`}
                      alt={g.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  : <div className={styles.cardIcon}>🎮</div>
                }
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{g.title}</h2>
                <p className={styles.cardDesc}>{g.description}</p>
                <button className={styles.cardButton}>Обзор</button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
```


## app\hall-of-fame\page.tsx

```tsx
// src/app/hall-of-fame/page.tsx
'use client';

import { motion } from "framer-motion";

import portfolioData from "@/data/portfolio";
import { PortfolioItem } from "@/types/portfolio";

import HallOfFameHeader from "@/components/features/hallOfFame/HallOfFameHeader";
import ProjectGrid from "@/components/features/hallOfFame/ProjectGrid";
import CallToAction from "@/components/features/hallOfFame/CallToAction";

const HallOfFamePage = () => {
  // Отбираем только помеченные проекты
  const hallOfFameProjects = portfolioData.filter(
    (project: PortfolioItem) => project.hallOfFame
  );

  return (
    <motion.section
      className="py-12 px-4 max-w-7xl mx-auto space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <HallOfFameHeader />
      
      <ProjectGrid projects={hallOfFameProjects} />
      
      {hallOfFameProjects.length > 0 && <CallToAction />}
    </motion.section>
  );
};

export default HallOfFamePage;
```


## app\map-success\page.tsx

```tsx
// src/app/success-map/page.tsx
'use client';

import { useState } from "react";

import successStories from "@/data/successStories";

import PageTitle from "@/components/ui/PageTitle";

import YearFilter from "@/components/features/successStories/YearFilter";
import SuccessMapView from "@/components/features/successStories/SuccessMapView";

const SuccessMapPage = () => {
  const [selectedYears, setSelectedYears] = useState<number[]>([]);

  // Получаем уникальные годы и сортируем по убыванию
  const allYears = Array.from(
    new Set(successStories.map((s) => s.year))
  ).sort((a, b) => b - a);

  const toggleYear = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) 
        ? prev.filter((y) => y !== year) 
        : [...prev, year]
    );
  };

  const filteredStories =
    selectedYears.length === 0
      ? successStories
      : successStories.filter((s) => selectedYears.includes(s.year));

  return (
    <section className="space-y-10 px-4 max-w-7xl mx-auto">
      <PageTitle>Карта успеха выпускников</PageTitle>
      <p className="text-gray-600 max-w-2xl">
        Здесь отмечены коммерческие релизы, в которых участвовали наши выпускники.
      </p>

      <YearFilter
        years={allYears}
        selectedYears={selectedYears}
        onToggleYear={toggleYear}
        onReset={() => setSelectedYears([])}
      />

      <SuccessMapView stories={filteredStories} />
    </section>
  );
};

export default SuccessMapPage;
```


## app\news\[slug]\page.tsx

```tsx
import { notFound } from 'next/navigation';

import { NewsItem } from "@/types/news";

import { getMarkdownContent } from '@/utils/markdownUtils';

import AnimatedDiv  from '@/components/layout/AnimatedDiv';

import FullWidthImage from '@/components/features/news/FullWidthImage';
import MarkdownContent from '@/components/features/news/MarkdownContent';
import NewsSidebar from '@/components/features/news/NewsSidebar';

// Генерация статических путей
export async function generateStaticParams() {
  const newsData = (await import('@/data/news')).default
  return newsData.map((article) => ({
    slug: article.slug,
  }))
}

// Получение данных статьи
async function getNewsItem(slug: string): Promise<{
  article: NewsItem;
  content: string;
}> {
  const newsData = (await import('@/data/news')).default
  const article = newsData.find((item) => item.slug === slug)

  if (!article) notFound()

  try{
    const content = await getMarkdownContent(article.markdown)

    return { article, content }
  } catch(error){
    console.error('Error loading markdown:', error)
    return {
      article,
      content: `# Ошибка загрузки контента\n${error}`
    }
  }

}

export default async function NewsDetail(
  { params }: 
  { params: { slug: string } 
}) {
  const { article, content } = await getNewsItem(await params.slug)

  return (
    <AnimatedDiv>
      <div className="bg-white">
        {/* Фото во весь экран */}
        <FullWidthImage article={article}/>

        {/* Контент */}
        <div className="max-w-7xl mx-auto px-0 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Основной текст */}
            <MarkdownContent content={content}/>

            {/* Боковая панель */}
            <NewsSidebar article={article} />
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};
```


## app\news\page.tsx

```tsx
'use client';

import { useState } from "react";
import newsData from "@/data/news";

import PageTitle from "@/components/ui/PageTitle";

import AnimatedDiv  from '@/components/layout/AnimatedDiv';

import NewsGrid from "@/components/features/news/NewsGrid";
import NewsFilterPanel from "@/components/features/news/NewsFilterPanel";

const NewsList = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredNews = newsData.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesQuery = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const uniqueCategories = Array.from(
    new Set(newsData.map((item) => item.category))
  );

  const categories = ["all", ...uniqueCategories];

  return (
    <AnimatedDiv>
      <section className="space-y-10 bg-light">
        <PageTitle>НОВОСТИ</PageTitle>

        <div className="flex flex-col-reverse lg:flex-row gap-y-8 lg:gap-y-0 lg:gap-x-12">
          {/* Левая колонка: Список новостей */}
          <NewsGrid items={filteredNews} />

          {/* Правая колонка: Поиск и фильтр */}
          <NewsFilterPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </div>
      </section>
    </AnimatedDiv>
  );
};

export default NewsList;
```


## app\portfolio\[slug]\page.tsx

```tsx
import { PortfolioItem, ProjectPhase, ProjectAuthor } from "@/types/portfolio";
import portfolioData from "@/data/portfolio";
import { getMarkdownContent } from "@/utils/markdownUtils";
import PortfolioDetailClient from "@/components/features/portfolio/detail/PortfolioDetail";
import EmptyPortfolio from "@/components/features/portfolio/detail/EmptyPortfolio";

// Генерация статических путей
export async function generateStaticParams() {
  return portfolioData.map((project) => ({
    slug: project.slug,
  }));
}

// Серверный компонент для загрузки данных
export default async function PortfolioDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = portfolioData.find((p: PortfolioItem) => p.slug === slug);
  
  let content = "";
  if (project?.markdown) {
    try {
      content = await getMarkdownContent(project.markdown);
    } catch (error) {
      content = "### Контент проекта недоступен";
      console.error("Ошибка загрузки контента:", error);
    }
  }

  if (!project) {
    return (
      <EmptyPortfolio slug={slug}/>
    );
  }

  return (
    <PortfolioDetailClient 
      project={project} 
      content={content} 
    />
  );
}
```


## app\portfolio\page.tsx

```tsx
'use client'; // Директива для клиентского компонента

import { useState } from "react";

import { PortfolioItem } from "@/types/portfolio"; // Импорт типа
import portfolioData from "@/data/portfolio";

import PageTitle from "@/components/ui/PageTitle";

import ProjectsGrid from "@/components/features/portfolio/ProjectsGrid";
import SearchFilter from "@/components/features/portfolio/SearchFilter";
import CategoryFilter from "@/components/features/portfolio/CategoryFilter";
import PortfolioStats from "@/components/features/portfolio/PortfolioStats";
import EmptyProjects from "@/components/features/portfolio/EmptyProjects";

import AnimatedDiv from "@/components/layout/AnimatedDiv";

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Фильтрация проектов
  const filteredProjects = portfolioData.filter((project: PortfolioItem) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesQuery = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Получение уникальных категорий
  const uniqueCategories = Array.from(
    new Set(portfolioData.map((project: PortfolioItem) => project.category))
  );

  const categories = ["all", ...uniqueCategories];

  // Статистика
  const totalProjects = portfolioData.length;
  const hallOfFameCount = portfolioData.filter(p => p.hallOfFame).length;

  // Сброс фильтров
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <AnimatedDiv className="bg-light min-h-screen">
      <section className="container mx-auto py-10 px-4 space-y-10">
        <PageTitle>Портфолио</PageTitle>

        <div className="flex flex-col-reverse lg:flex-row gap-y-8 lg:gap-y-0 lg:gap-x-12">
          {/* Основная область с проектами */}
          <div className="w-full lg:w-2/3">
            {filteredProjects.length > 0 ? (
              <ProjectsGrid projects={filteredProjects} />
            ) : (
              <EmptyProjects onResetFilters={handleResetFilters} />
            )}
          </div>

          {/* Панель фильтров */}
          <aside className="w-full lg:w-1/3 space-y-8">
            {/* Поиск */}
            <SearchFilter 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />

            {/* Категории */}
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />

            {/* Дополнительные фильтры (можно добавить позже) */}
            <PortfolioStats 
              totalProjects={totalProjects}
              hallOfFameCount={hallOfFameCount}
              filteredCount={filteredProjects.length}
              selectedCategory={selectedCategory}
            />
          </aside>
        </div>
      </section>
    </AnimatedDiv>
  );
};

export default Portfolio;
```


## app\profile\page.tsx

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Доступ запрещен</h2>
          <p className="text-gray-600">Пожалуйста, войдите в систему</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Хлебные крошки */}
          <nav className="mb-8">
            <button
              onClick={() => router.push('/')}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              ← На главную
            </button>
          </nav>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Заголовок профиля */}
            <div className="bg-blue-300 text-white p-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {user.displayName.split(' ').map(part => part[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{user.displayName}</h1>
                  <p className="text-primary/80 text-lg">{user.email}</p>
                  <span className="inline-block mt-2 px-4 py-1 bg-white/20 rounded-full text-sm">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Навигация по вкладкам */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8">
                {[
                  { id: 'info', label: 'Основная информация' },
                  { id: 'projects', label: 'Мои проекты' },
                  { id: 'settings', label: 'Настройки' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Содержимое вкладок */}
            <div className="p-8">
              {activeTab === 'info' && <ProfileInfo user={user} />}
              {activeTab === 'projects' && <ProfileProjects />}
              {activeTab === 'settings' && <ProfileSettings />}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileInfo({ user }: { user: any }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-lg font-semibold mb-4">Личная информация</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">Имя</label>
            <p className="font-medium">{user.displayName}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Роль</label>
            <p className="font-medium">{user.role}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-4">Статистика</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Проектов создано</span>
            <span className="font-bold text-primary">0</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Участий в проектах</span>
            <span className="font-bold text-primary">0</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Дата регистрации</span>
            <span className="font-bold text-primary">-</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileProjects() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold">Мои проекты</h4>
        <button className="bg-blue-300 text-white px-4 py-2 rounded-lg hover:bg-blue-300/90 transition-colors">
          + Создать проект
        </button>
      </div>
      
      <div className="text-center py-12 text-gray-500">
        <p>У вас пока нет проектов</p>
        <button className="mt-4 bg-blue-300 text-white px-6 py-2 rounded-lg hover:bg-blue-300/90 transition-colors">
          Создать первый проект
        </button>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Настройки аккаунта</h4>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Смена пароля
          </label>
          <div className="space-y-4 max-w-md">
            <input
              type="password"
              placeholder="Текущий пароль"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Подтвердите новый пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="bg-blue-300 text-white px-6 py-2 rounded-lg hover:bg-blue-300/90 transition-colors">
              Обновить пароль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```


## app\staff\[slug]\page.tsx

```tsx
// src/app/staff/[slug]/page.tsx
import { StaffMember } from "@/types/staff";
import { PortfolioItem } from "@/types/portfolio";

import staffList from "@/data/staff";
import portfolioData from "@/data/portfolio";

import StaffHeader from "@/components/features/staff/detail/StaffHeader";
import StaffSkills from "@/components/features/staff/detail/StaffSkills";
import StaffProjects from "@/components/features/staff/detail/StaffProjects";
import StaffAchievements from "@/components/features/staff/detail/StaffAchievements";
import StaffContacts from "@/components/features/staff/detail/StaffContacts";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/layout/AnimatedSection";

// Генерация статических путей
export async function generateStaticParams() {
  return staffList.map((staff) => ({
    slug: staff.slug,
  }));
}

type StaffDetailPageProps = {
  params: { slug: string };
};

export default async function StaffDetailPage({ params }: StaffDetailPageProps) {
  const { slug } = await params;
  
  const staff = staffList.find((s: StaffMember) => s.slug === slug) as StaffMember | undefined;
  
  const relatedProjects = portfolioData.filter((project: PortfolioItem) =>
    project.authors?.some(author => author.slug === staff?.slug)
  );

  if (!staff) {
    return (
      <div className="p-8 text-center text-red-600 text-lg">
        Преподаватель не найден
      </div>
    );
  }

  return (
    <AnimatedSection 
      className="space-y-10"       
      transition={{ duration: 0.5 }}>
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-10">
        <StaffHeader staff={staff} />
        
        <StaffSkills skills={staff.skills || []} />
        
        <StaffProjects projects={relatedProjects} />
        
        <StaffAchievements staff={staff} projects={relatedProjects} />
        
        <StaffContacts staff={staff} />
      </div>
    </AnimatedSection>
  );
}
```


## app\staff\page.tsx

```tsx
// src/app/staff/page.tsx
'use client';

import { useState } from "react";

import staffList from "@/data/staff";

import PageTitle from "@/components/ui/PageTitle";

import AnimatedSection from "@/components/layout/AnimatedSection";

import SkillFilter from "@/components/features/staff/SkillFilter";
import StaffGrid from "@/components/features/staff/StaffGrid";
import EmptyStaff from "@/components/features/staff/EmptyStaff";


const StaffPage = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Получение всех уникальных навыков
  const allSkills = Array.from(
    new Set(
      staffList.flatMap((staff) => 
        staff.stats ? staff.stats.map((stat) => stat.label) : []
      )
    )
  ).sort();

  // Фильтрация сотрудников по выбранным навыкам
  const filteredStaff = selectedSkills.length === 0
    ? staffList
    : staffList.filter((staff) => {
        // Проверяем, что у сотрудника есть stats
        if (!staff.stats) return false;
        
        // Проверяем, что все выбранные навыки есть у сотрудника
        return selectedSkills.every((selected) =>
          staff.stats!.some((stat) => stat.label === selected)
        );
      });

  // Сброс фильтров
  const resetFilters = () => setSelectedSkills([]);

  return (
    <AnimatedSection className="container mx-auto px-4 py-10 space-y-10">
      <PageTitle>НАШИ СОТРУДНИКИ</PageTitle>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <SkillFilter 
          skills={allSkills} 
          selectedSkills={selectedSkills} 
          setSelectedSkills={setSelectedSkills} 
        />
        
        {filteredStaff.length > 0 ? (
          <StaffGrid staffList={filteredStaff} />
        ) : (
          <EmptyStaff onReset={resetFilters} />
        )}
      </div>
    </AnimatedSection>
  );
};

export default StaffPage;
```


## app\upload\page.tsx

```tsx
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
```


## app\upload\upload.module.css

```css



.container {
    max-width: 600px;
    margin: 40px auto;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    
}

.heading {
    font-size: 1.8rem;
    margin-bottom: 24px;
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.formGroup {
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
    
}

.label {
    font-weight: 500;
    font-size: 0.95rem;
}

.input,
.textarea,
.fileInput,
.select {
    padding: 8px 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s;
}

.input:focus,
.genreInput:focus,
.authorInput:focus {
    border-color: #0070f3;
}

.textarea {
    min-height: 100px;
    resize: vertical;
}

.checkboxGroup {
    display: flex;
    align-items: center;
    gap: 8px;
}

.checkboxList {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.checkboxItem {
    display: flex;
    align-items: center;
    gap: 4px;
}

.submitButton {
    padding: 12px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.submitButton:hover {
    background-color: #005bb5;
}


.backButton {
    left: 0;
    background: transparent;
    border: none;
    color: #777;
    font-size: 1rem;
    padding: 4px 8px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s ease;
}

.backButton:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}


.genreSelect {
    position: relative;
    z-index: 1;
    
}

.selectedContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: text;
    background: #fff;
}

.genreBadge {
    background: #eef;
    padding: 2px 6px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.genreBadge button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    color: #0070f3;
    font-weight: 600;
    padding: 0;
}

.genreBadge button:hover {
    color: #005bb5;
}

.genreInput {
    flex: 1;
    border: none;
    outline: none;
    min-width: 80px;
    font-size: 1rem;
}

.genreDropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    max-height: 150px;
    overflow-y: auto;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 10;
    list-style: none;
    margin: 0;
    padding: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.genreItem {
    padding: 6px 8px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: background-color 0.2s;
}

.genreItem:hover {
    background: #f0f0f0;
}

.noResults {
    padding: 6px 8px;
    color: #777;
    font-size: 0.95rem;
}


.selectedAuthorsList {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
}

.authorBadge {
    display: inline-flex;
    align-items: center;
    background-color: rgba(0, 112, 243, 0.1);
    color: #0070f3;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.9rem;
}

.authorBadge button {
    background: transparent;
    border: none;
    color: #0070f3;
    font-weight: bold;
    margin-left: 4px;
    cursor: pointer;
    font-size: 0.9rem;
}

.authorBadge button:hover {
    color: #005bb5;
}


.authorInput {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
    position: relative;
}


.authorDropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    list-style: none;
    margin: 0;
    padding: 0;
}

.authorDropdownItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 0.95rem;
}

.authorDropdownItem:hover {
    background-color: rgba(0, 112, 243, 0.05);
}

.authorName {
    font-weight: 500;
    color: #333;
}

.authorEmail {
    font-size: 0.85rem;
    color: #666;
}
```


## app\error.module.css

```css
.container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #121212;
    color: #fff;
    padding: 24px;
    text-align: center;
}

.title {
    font-size: 2.5rem;
    margin-bottom: 16px;
    background: linear-gradient(90deg, #ff4d4f, #ff7a45);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.description {
    font-size: 1.125rem;
    margin-bottom: 24px;
    color: #ccc;
    max-width: 480px;
}

.buttons {
    display: flex;
    gap: 12px;
}

.button {
    padding: 10px 20px;
    background-color: #ff4d4f;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.2s, transform 0.2s;
}

.button:hover {
    background-color: #d9363e;
    transform: translateY(-2px); }
```


## app\error.tsx

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './error.module.css';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error('Произошла ошибка на стороне клиента или сервера:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Упс… что‐то пошло не так.</h1>
      <p className={styles.description}>
        Возникла внутренняя ошибка сервера или при рендере страницы. Попробуйте обновить страницу либо вернуться на главную.
      </p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => reset()}>
          Повторить попытку
        </button>
        <button className={styles.button} onClick={() => router.push('/')}>
          На главную
        </button>
      </div>
    </div>
  );
}
```


## app\globals.css

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";


html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-gray-900;
}


section {
  scroll-margin-top: 80px;
}


.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glowPulse {
  0% { box-shadow: 0 0 0px rgba(255, 255, 255, 0); }
  50% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.7); }
  100% { box-shadow: 0 0 0px rgba(255, 255, 255, 0); }
}

.card-glow-legendary:hover {
  animation: glowPulse 2s infinite;
  border: 2px solid transparent;
  background-image: linear-gradient(#fefce8, #fefce8),
  radial-gradient(circle at top left, #facc15, #eab308);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

.card-glow-rare:hover {
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.6);
  border-color: #bfdbfe;
  transition: all 0.3s ease;
}

@keyframes glowPulse {
  0% {
    box-shadow: 0 0 0px rgba(0, 200, 255, 0.0);
  }
  50% {
    box-shadow: 0 0 20px 4px rgba(0, 200, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 0px rgba(0, 200, 255, 0.0);
  }
}

.animated-glow {
  animation: glowPulse 2.5s ease-in-out infinite;
}
```


## app\layout.tsx

```tsx
'use client';

import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        // Определяем активную секцию на основе пути
        if (pathname === '/') setActiveSection('home');
        else if (pathname === '/profile') setActiveSection('profile');
        else if (pathname === '/admin') setActiveSection('admin');
    }, [pathname]);

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
    };

    return (
        <html lang="ru">
            <head>
                <Script
                    src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                    strategy="beforeInteractive"
                    type="module"
                />
            </head>
            <body>
                <AuthProvider>
                    <div className="min-h-screen">
                        <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
                        <main>
                            {children}
                        </main>
                        {pathname === '/' && <Footer />}
                    </div>
                </AuthProvider>
            </body>
        </html>
    )
}
```


## app\not-found.module.css

```css
.container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #121212;
    color: #fff;
    padding: 24px;
    text-align: center;
}

.title {
    font-size: 3rem;
    margin-bottom: 16px;
    background: linear-gradient(90deg, #0070f3, #00c6ff);

    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;

    -webkit-text-fill-color: transparent;
}

.description {
    font-size: 1.125rem;
    margin-bottom: 24px;
    color: #ccc;
}

.link {
    display: inline-block;
    padding: 12px 24px;
    background-color: #0070f3;
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s ease, transform 0.2s;
}

.link:hover {
    background-color: #005bb5;
    transform: translateY(-2px); }
```


## app\not-found.tsx

```tsx
'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 — Страница не найдена</h1>
      <p className={styles.description}>
        К сожалению, такой страницы не существует или она была перемещена.
      </p>
      <Link href="/" className={styles.link}>
        ← Вернуться на главную
      </Link>
    </div>
  );
}
```


## app\page.module.css

```css

```


## app\page.tsx

```tsx
// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Team from '@/components/sections/Team';
import Blog from '@/components/sections/Blog';
import Partners from '@/components/sections/Partners';
import Awards from '@/components/sections/Awards';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Главная', component: Hero },
    { id: 'projects', label: 'Проекты', component: Projects },
    { id: 'team', label: 'Команда', component: Team },
    { id: 'blog', label: 'Блог', component: Blog },
    { id: 'partners', label: 'Партнеры', component: Partners },
    { id: 'awards', label: 'Награды', component: Awards },
    { id: 'faq', label: 'FAQ', component: FAQ },
    { id: 'contact', label: 'Контакты', component: Contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-20">
      {sections.map((section, index) => {
        const SectionComponent = section.component;
        return (
          <section 
            key={section.id}
            id={section.id}
            className="min-h-screen"
          >
            <SectionComponent />
          </section>
        );
      })}
    </div>
  );
}
```


## components\features\admin\forms\NewsForm.tsx

```tsx
import { NewsItem } from "@/types/news";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsForm({ news, onSave, onClose }: {
  news: NewsItem | null;
  onSave: (data: NewsItem) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<NewsItem>({
    slug: news?.slug || '',
    title: news?.title || '',
    category: news?.category || '',
    image: news?.image || '',
    date: news?.date || new Date().toISOString().split('T')[0],
    markdown: news?.markdown || '',
    author: news?.author || { name: '', slug: '' },
    tags: news?.tags || [],
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags!, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">
            {news ? 'Редактирование статьи' : 'Новая статья'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата публикации *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL изображения
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя автора
              </label>
              <input
                type="text"
                value={formData.author?.name || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  author: { ...prev.author!, name: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug автора
              </label>
              <input
                type="text"
                value={formData.author?.slug || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  author: { ...prev.author!, slug: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Теги
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-300/10 text-primary"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-primary/70"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Введите тег и нажмите Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Контент (Markdown)
            </label>
            <textarea
              value={formData.markdown}
              onChange={(e) => setFormData(prev => ({ ...prev, markdown: e.target.value }))}
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors"
            >
              {news ? 'Обновить' : 'Создать'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
```


## components\features\admin\forms\PortfolioForm.tsx

```tsx
// components/admin/PortfolioForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem } from '@/types/portfolio';

export default function PortfolioForm({ 
  item, 
  onSave, 
  onClose 
}: {
  item: PortfolioItem | null;
  onSave: (data: PortfolioItem) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<PortfolioItem>({
    slug: item?.slug || '',
    title: item?.title || '',
    category: item?.category || '',
    image: item?.image || '',
    description: item?.description || '',
    releaseDate: item?.releaseDate || '',
    download: item?.download || '',
    phases: item?.phases || [],
    goals: item?.goals || [],
    features: item?.features || [],
    screenshots: item?.screenshots || [],
    hallOfFame: item?.hallOfFame || false,
    authors: item?.authors || [],
    year: item?.year || new Date().getFullYear(),
    markdown: item?.markdown || '',
    tags: item?.tags || [],
  });

  const [newTag, setNewTag] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newScreenshot, setNewScreenshot] = useState('');
  const [newAuthor, setNewAuthor] = useState({ name: '', slug: '', role: '' });
  const [newPhase, setNewPhase] = useState({ 
    title: '', 
    date: '', 
    description: '',
    skills: [] as Array<{ name: string; level: number }>
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Управление тегами
  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags!, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  // Управление целями
  const addGoal = () => {
    if (newGoal.trim() && !formData.goals?.includes(newGoal.trim())) {
      setFormData(prev => ({
        ...prev,
        goals: [...(prev.goals || []), newGoal.trim()]
      }));
      setNewGoal('');
    }
  };

  const removeGoal = (goalToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals?.filter(goal => goal !== goalToRemove)
    }));
  };

  // Управление фичами
  const addFeature = () => {
    if (newFeature.trim() && !formData.features?.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter(feature => feature !== featureToRemove)
    }));
  };

  // Управление скриншотами
  const addScreenshot = () => {
    if (newScreenshot.trim() && !formData.screenshots?.includes(newScreenshot.trim())) {
      setFormData(prev => ({
        ...prev,
        screenshots: [...(prev.screenshots || []), newScreenshot.trim()]
      }));
      setNewScreenshot('');
    }
  };

  const removeScreenshot = (screenshotToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots?.filter(screenshot => screenshot !== screenshotToRemove)
    }));
  };

  // Управление авторами
  const addAuthor = () => {
    if (newAuthor.name.trim() && newAuthor.slug.trim()) {
      setFormData(prev => ({
        ...prev,
        authors: [...(prev.authors || []), { ...newAuthor }]
      }));
      setNewAuthor({ name: '', slug: '', role: '' });
    }
  };

  const removeAuthor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors?.filter((_, i) => i !== index)
    }));
  };

  // Управление фазами
  const addPhase = () => {
    if (newPhase.title.trim() && newPhase.date.trim()) {
      setFormData(prev => ({
        ...prev,
        phases: [...(prev.phases || []), { ...newPhase }]
      }));
      setNewPhase({ title: '', date: '', description: '', skills: [] });
    }
  };

  const removePhase = (index: number) => {
    setFormData(prev => ({
      ...prev,
      phases: prev.phases?.filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">
            {item ? 'Редактирование проекта' : 'Новый проект портфолио'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Основная информация */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Год *
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата релиза
              </label>
              <input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL основного изображения *
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ссылка для скачивания
            </label>
            <input
              type="url"
              value={formData.download}
              onChange={(e) => setFormData(prev => ({ ...prev, download: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Теги */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Теги
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-300/10 text-primary"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-primary/70"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Введите тег и нажмите Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Цели */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цели проекта
            </label>
            <div className="space-y-2 mb-2">
              {formData.goals?.map((goal, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{goal}</span>
                  <button
                    type="button"
                    onClick={() => removeGoal(goal)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
                placeholder="Добавить цель"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addGoal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Особенности */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Особенности проекта
            </label>
            <div className="space-y-2 mb-2">
              {formData.features?.map((feature, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="Добавить особенность"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Скриншоты */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Скриншоты (URL)
            </label>
            <div className="space-y-2 mb-2">
              {formData.screenshots?.map((screenshot, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="truncate">{screenshot}</span>
                  <button
                    type="button"
                    onClick={() => removeScreenshot(screenshot)}
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                value={newScreenshot}
                onChange={(e) => setNewScreenshot(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addScreenshot())}
                placeholder="URL скриншота"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addScreenshot}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Авторы */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Авторы проекта
            </label>
            <div className="space-y-3 mb-4">
              {formData.authors?.map((author, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <div className="font-medium">{author.name}</div>
                    <div className="text-sm text-gray-600">Slug: {author.slug} | Роль: {author.role}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Имя</label>
                <input
                  type="text"
                  value={newAuthor.name}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Slug</label>
                <input
                  type="text"
                  value={newAuthor.slug}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Роль</label>
                <input
                  type="text"
                  value={newAuthor.role}
                  onChange={(e) => setNewAuthor(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={addAuthor}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Добавить автора
                </button>
              </div>
            </div>
          </div>

          {/* Фазы проекта */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Фазы разработки
            </label>
            <div className="space-y-4 mb-4">
              {formData.phases?.map((phase, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{phase.title}</h4>
                      <p className="text-sm text-gray-600">{phase.date}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhase(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-sm">{phase.description}</p>
                </div>
              ))}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Название фазы</label>
                  <input
                    type="text"
                    value={newPhase.title}
                    onChange={(e) => setNewPhase(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Дата</label>
                  <input
                    type="date"
                    value={newPhase.date}
                    onChange={(e) => setNewPhase(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Описание</label>
                <textarea
                  value={newPhase.description}
                  onChange={(e) => setNewPhase(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                type="button"
                onClick={addPhase}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Добавить фазу
              </button>
            </div>
          </div>

          {/* Дополнительные настройки */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hallOfFame"
                checked={formData.hallOfFame}
                onChange={(e) => setFormData(prev => ({ ...prev, hallOfFame: e.target.checked }))}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="hallOfFame" className="ml-2 block text-sm text-gray-700">
                Включить в Hall of Fame
              </label>
            </div>
          </div>

          {/* Markdown контент */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Детальное описание (Markdown)
            </label>
            <textarea
              value={formData.markdown}
              onChange={(e) => setFormData(prev => ({ ...prev, markdown: e.target.value }))}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors"
            >
              {item ? 'Обновить' : 'Создать'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
```


## components\features\admin\forms\ProjectForm.tsx

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/ProjectForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StudentProject } from '@/types/studentProject';

export default function ProjectForm({ 
  project, 
  onSave, 
  onClose 
}: {
  project: StudentProject | null;
  onSave: (data: StudentProject) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<StudentProject>({
    slug: project?.slug || '',
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category || '',
    image: project?.image || '',
    year: project?.year || new Date().getFullYear(),
    authors: project?.authors || [],
    markdown: project?.markdown || '',
    tags: project?.tags || [],
    status: project?.status || 'active',
    githubUrl: project?.githubUrl || '',
    demoUrl: project?.demoUrl || '',
  });

  const [newTag, setNewTag] = useState('');
  const [newAuthor, setNewAuthor] = useState({ name: '', slug: '', role: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags!, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const addAuthor = () => {
    if (newAuthor.name.trim() && newAuthor.slug.trim()) {
      setFormData(prev => ({
        ...prev,
        authors: [...prev.authors, { ...newAuthor }]
      }));
      setNewAuthor({ name: '', slug: '', role: '' });
    }
  };

  const removeAuthor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">
            {project ? "Редактирование проекта" : "Новый студенческий проект"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Основная информация */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Год *
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    year: parseInt(e.target.value),
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Статус *
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as any,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="active">Активный</option>
                <option value="completed">Завершенный</option>
                <option value="archived">Архивный</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL основного изображения *
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    githubUrl: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Demo URL
              </label>
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, demoUrl: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Теги */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Теги
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-300/10 text-primary"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-primary/70"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                placeholder="Введите тег и нажмите Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Авторы */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Авторы проекта
            </label>
            <div className="space-y-3 mb-4">
              {formData.authors.map((author, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded"
                >
                  <div>
                    <div className="font-medium">{author.name}</div>
                    <div className="text-sm text-gray-600">
                      Slug: {author.slug} | Роль: {author.role}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Имя
                </label>
                <input
                  type="text"
                  value={newAuthor.name}
                  onChange={(e) =>
                    setNewAuthor((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={newAuthor.slug}
                  onChange={(e) =>
                    setNewAuthor((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Роль
                </label>
                <input
                  type="text"
                  value={newAuthor.role}
                  onChange={(e) =>
                    setNewAuthor((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={addAuthor}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Добавить автора
                </button>
              </div>
            </div>
          </div>

          {/* Markdown контент */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Детальное описание (Markdown)
            </label>
            <textarea
              value={formData.markdown}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, markdown: e.target.value }))
              }
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors"
            >
              {project ? "Обновить" : "Создать"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
```


## components\features\admin\forms\StaffForm.tsx

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/StaffForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StaffMember } from '@/types/staff';

export default function StaffForm({ 
  member, 
  onSave, 
  onClose 
}: {
  member: StaffMember | null;
  onSave: (data: StaffMember) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<StaffMember>({
    slug: member?.slug || '',
    name: member?.name || '',
    position: member?.position || '',
    photo: member?.photo || '',
    title: member?.title || '',
    rarity: member?.rarity || 'COMMON',
    email: member?.email || '',
    telegram: member?.telegram || '',
    github: member?.github || '',
    bio: member?.bio || '',
    researchInterests: member?.researchInterests || [],
    stats: member?.stats || [],
    skills: member?.skills || [],
    achievements: member?.achievements || [],
    tags: member?.tags || [],
  });

  const [newTag, setNewTag] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newStat, setNewStat] = useState({ label: '', value: 0 });
  const [newSkill, setNewSkill] = useState({ 
    name: '', 
    level: 50,
    description: '',
    subskills: [] as Array<{ name: string; description?: string }>
  });
  const [newSubskill, setNewSubskill] = useState({ name: '', description: '' });
  const [newAchievement, setNewAchievement] = useState({ 
    title: '', 
    icon: '', 
    description: '' 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags!, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.researchInterests?.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        researchInterests: [...(prev.researchInterests || []), newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      researchInterests: prev.researchInterests?.filter(interest => interest !== interestToRemove)
    }));
  };

  const addStat = () => {
    if (newStat.label.trim()) {
      setFormData(prev => ({
        ...prev,
        stats: [...(prev.stats || []), { ...newStat }]
      }));
      setNewStat({ label: '', value: 0 });
    }
  };

  const removeStat = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats?.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), { ...newSkill }]
      }));
      setNewSkill({ name: '', level: 50, description: '', subskills: [] });
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index)
    }));
  };

  const addSubskill = () => {
    if (newSubskill.name.trim()) {
      setNewSkill(prev => ({
        ...prev,
        subskills: [...prev.subskills, { ...newSubskill }]
      }));
      setNewSubskill({ name: '', description: '' });
    }
  };

  const removeSubskill = (index: number) => {
    setNewSkill(prev => ({
      ...prev,
      subskills: prev.subskills.filter((_, i) => i !== index)
    }));
  };

  const addAchievement = () => {
    if (newAchievement.title.trim() && newAchievement.icon.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...(prev.achievements || []), { ...newAchievement }]
      }));
      setNewAchievement({ title: '', icon: '', description: '' });
    }
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements?.filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">
            {member ? 'Редактирование сотрудника' : 'Новый сотрудник'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Основная информация */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Полное имя *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Должность *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Титул
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Редкость
              </label>
              <select
                value={formData.rarity}
                onChange={(e) => setFormData(prev => ({ ...prev, rarity: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="COMMON">COMMON</option>
                <option value="RARE">RARE</option>
                <option value="LEGENDARY">LEGENDARY</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telegram
              </label>
              <input
                type="text"
                value={formData.telegram || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, telegram: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub
            </label>
            <input
              type="text"
              value={formData.github || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL фотографии *
            </label>
            <input
              type="url"
              value={formData.photo}
              onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Биография
            </label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Научные интересы */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Научные интересы
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.researchInterests?.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-2 hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                placeholder="Добавить научный интерес"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Теги */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Теги
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-300/10 text-primary"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-primary/70"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Введите тег и нажмите Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Статистика */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Статистика
            </label>
            <div className="space-y-3 mb-4">
              {formData.stats?.map((stat, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <span className="font-medium">{stat.label}</span>
                    <span className="ml-2 text-gray-600">({stat.value})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStat(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Название</label>
                <input
                  type="text"
                  value={newStat.label}
                  onChange={(e) => setNewStat(prev => ({ ...prev, label: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Значение</label>
                <input
                  type="number"
                  value={newStat.value}
                  onChange={(e) => setNewStat(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={addStat}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Добавить статистику
                </button>
              </div>
            </div>
          </div>

          {/* Навыки */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Навыки
            </label>
            <div className="space-y-4 mb-4">
              {formData.skills?.map((skill, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <p className="text-sm text-gray-600">Уровень: {skill.level}%</p>
                      {skill.description && (
                        <p className="text-sm mt-1">{skill.description}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                  {skill.subskills && skill.subskills.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-sm font-medium mb-1">Поднавыки:</h5>
                      <div className="flex flex-wrap gap-1">
                        {skill.subskills.map((subskill, subIndex) => (
                          <span
                            key={subIndex}
                            className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {subskill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Название навыка</label>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Уровень (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-center text-sm">{newSkill.level}%</div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Описание</label>
                <textarea
                  value={newSkill.description}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Поднавыки */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Поднавыки</label>
                <div className="space-y-2 mb-2">
                  {newSkill.subskills.map((subskill, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div>
                        <span className="font-medium">{subskill.name}</span>
                        {subskill.description && (
                          <span className="ml-2 text-gray-600">- {subskill.description}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSubskill(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newSubskill.name}
                    onChange={(e) => setNewSubskill(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Название поднавыка"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="text"
                    value={newSubskill.description}
                    onChange={(e) => setNewSubskill(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Описание"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={addSubskill}
                      className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
                    >
                      Добавить поднавык
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={addSkill}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Добавить навык
              </button>
            </div>
          </div>

          {/* Достижения */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Достижения
            </label>
            <div className="space-y-4 mb-4">
              {formData.achievements?.map((achievement, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{achievement.icon}</span>
                        <h4 className="font-medium">{achievement.title}</h4>
                      </div>
                      <p className="text-sm mt-1">{achievement.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAchievement(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Название</label>
                  <input
                    type="text"
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Иконка (эмодзи)</label>
                  <input
                    type="text"
                    value={newAchievement.icon}
                    onChange={(e) => setNewAchievement(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Описание</label>
                <textarea
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                type="button"
                onClick={addAchievement}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Добавить достижение
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors"
            >
              {member ? 'Обновить' : 'Создать'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
```


## components\features\admin\NewsManagement.tsx

```tsx
// components/admin/NewsManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NewsItem } from '@/types/news';
import NewsForm from './forms/NewsForm';

export default function NewsManagement() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Здесь будет реальный API call
      const mockNews: NewsItem[] = [
        {
          _id: '1',
          slug: 'how-to-win-hackathon',
          title: 'Как выиграть хакатон',
          category: 'Соревнования',
          image: '/blog/hackathon.jpg',
          date: '2024-03-15',
          markdown: 'Содержание статьи...',
          author: { name: 'Анна Петрова', slug: 'anna-petrova' },
          tags: ['хакатон', 'советы', 'победа']
        }
      ];
      setNews(mockNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (newsData: NewsItem) => {
    try {
      if (editingNews) {
        // Update existing
        setNews(prev => prev.map(item => 
          item._id === editingNews._id ? newsData : item
        ));
      } else {
        // Create new
        setNews(prev => [...prev, { ...newsData, _id: Date.now().toString() }]);
      }
      setIsModalOpen(false);
      setEditingNews(null);
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту запись?')) {
      setNews(prev => prev.filter(item => item._id !== id));
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управление блогом</h2>
          <p className="text-gray-600">Создание и редактирование статей блога</p>
        </div>
        <button
          onClick={() => {
            setEditingNews(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/90 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Новая статья</span>
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Всего статей</h3>
          <div className="text-2xl font-bold text-gray-900">{news.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Категорий</h3>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(news.map(item => item.category)).size}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Тегов</h3>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(news.flatMap(item => item.tags)).size}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">За этот месяц</h3>
          <div className="text-2xl font-bold text-gray-900">0</div>
        </div>
      </div>

      {/* Таблица статей */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статья
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Категория
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Теги
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString('ru-RU')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags!.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{item.tags!.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingNews(item);
                      setIsModalOpen(true);
                    }}
                    className="text-black hover:text-black/80 mr-4"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(item._id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Нет статей. Создайте первую!</p>
          </div>
        )}
      </div>

      {/* Модальное окно для редактирования/создания */}
      <AnimatePresence>
        {isModalOpen && (
          <NewsForm
            news={editingNews}
            onSave={handleSave}
            onClose={() => {
              setIsModalOpen(false);
              setEditingNews(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```


## components\features\admin\PortfolioManagement.tsx

```tsx
// components/admin/PortfolioManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '@/types/portfolio';
import PortfolioForm from './forms/PortfolioForm';

export default function PortfolioManagement() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      // Mock data
      const mockData: PortfolioItem[] = [
        {
          _id: '1',
          slug: 'ai-vision-system',
          title: 'AI Vision System',
          category: 'Computer Vision',
          image: '/portfolio/ai-vision.jpg',
          description: 'Система компьютерного зрения для медицинской диагностики',
          year: 2024,
          hallOfFame: true,
          tags: ['AI', 'Computer Vision', 'Medical']
        }
      ];
      setPortfolio(mockData);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: PortfolioItem) => {
    try {
      if (editingItem) {
        setPortfolio(prev => prev.map(item => 
          item._id === editingItem._id ? data : item
        ));
      } else {
        setPortfolio(prev => [...prev, { ...data, _id: Date.now().toString() }]);
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving portfolio item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот проект?')) {
      setPortfolio(prev => prev.filter(item => item._id !== id));
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управление портфолио</h2>
          <p className="text-gray-600">Проекты кафедры и достижения</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/90 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Новый проект</span>
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Всего проектов</h3>
          <div className="text-2xl font-bold text-gray-900">{portfolio.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">В Hall of Fame</h3>
          <div className="text-2xl font-bold text-gray-900">
            {portfolio.filter(item => item.hallOfFame).length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Категорий</h3>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(portfolio.map(item => item.category)).size}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">За этот год</h3>
          <div className="text-2xl font-bold text-gray-900">
            {portfolio.filter(item => item.year === new Date().getFullYear()).length}
          </div>
        </div>
      </div>

      {/* Сетка проектов */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-gray-200 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.hallOfFame && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                  ★ Hall of Fame
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags?.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{item.year}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setIsModalOpen(true);
                    }}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(item._id!)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {portfolio.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">Нет проектов в портфолио. Добавьте первый!</p>
        </div>
      )}

      {/* Модальное окно для портфолио (аналогично NewsForm) */}
      <AnimatePresence>
        {isModalOpen && (
          <PortfolioForm
            item={editingItem}
            onSave={handleSave}
            onClose={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```


## components\features\admin\ProjectsManagement.tsx

```tsx
// components/admin/ProjectsManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentProject } from '@/types/studentProject';
import ProjectForm from './forms/ProjectForm';

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<StudentProject | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'archived'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Mock data
      const mockData: StudentProject[] = [
        {
          _id: '1',
          slug: 'student-game-project',
          title: 'Student Game Project',
          description: 'Инновационная игра разработанная студентами',
          category: 'Game Development',
          image: '/projects/game-project.jpg',
          year: 2024,
          authors: [
            { name: 'Иван Иванов', slug: 'ivan-ivanov', role: 'Developer' },
            { name: 'Мария Петрова', slug: 'maria-petrova', role: 'Designer' }
          ],
          tags: ['Unity', 'C#', 'Game Design'],
          status: 'active',
          githubUrl: 'https://github.com/example',
          demoUrl: 'https://demo.example.com'
        }
      ];
      setProjects(mockData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.status === filter
  );

  const handleSave = async (data: StudentProject) => {
    try {
      if (editingProject) {
        setProjects(prev => prev.map(item => 
          item._id === editingProject._id ? data : item
        ));
      } else {
        setProjects(prev => [...prev, { ...data, _id: Date.now().toString() }]);
      }
      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот проект?')) {
      setProjects(prev => prev.filter(item => item._id !== id));
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управление проектами</h2>
          <p className="text-gray-600">Студенческие проекты и работы</p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/90 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Новый проект</span>
        </button>
      </div>

      {/* Фильтры и статистика */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex space-x-2">
          {[
            { id: 'all' as const, label: 'Все', count: projects.length },
            { id: 'active' as const, label: 'Активные', count: projects.filter(p => p.status === 'active').length },
            { id: 'completed' as const, label: 'Завершенные', count: projects.filter(p => p.status === 'completed').length },
            { id: 'archived' as const, label: 'Архив', count: projects.filter(p => p.status === 'archived').length },
          ].map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === filterItem.id
                  ? 'bg-blue-300 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterItem.label} ({filterItem.count})
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500">
          Показано: {filteredProjects.length} из {projects.length}
        </div>
      </div>

      {/* Сетка проектов */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-40 bg-gray-200 relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold text-white ${
                project.status === 'active' ? 'bg-green-500' :
                project.status === 'completed' ? 'bg-blue-500' :
                'bg-gray-500'
              }`}>
                {project.status === 'active' ? 'Активный' :
                 project.status === 'completed' ? 'Завершен' : 'Архив'}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags?.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                <span>{project.year} год</span>
                <span>{project.authors.length} участников</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      Demo
                    </a>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setIsModalOpen(true);
                    }}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    Редакт.
                  </button>
                  <button
                    onClick={() => handleDelete(project._id!)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">
            {projects.length === 0 
              ? 'Нет студенческих проектов. Добавьте первый!' 
              : `Нет проектов в категории "${filter}"`}
          </p>
        </div>
      )}

      {/* Модальное окно для проектов 
      */}

      <AnimatePresence>
        {isModalOpen && (
          <ProjectForm
            project={editingProject}
            onSave={handleSave}
            onClose={() => {
              setIsModalOpen(false);
              setEditingProject(null);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Компонент ProjectForm будет аналогичен предыдущим формам
```


## components\features\admin\StaffManagement.tsx

```tsx
// components/admin/StaffManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StaffMember } from '@/types/staff';
import StaffForm from './forms/StaffForm';

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      // Mock data
      const mockData: StaffMember[] = [
        {
          _id: '1',
          slug: 'vlada-kugurakova',
          name: 'Кугуракова Влада Владимировна',
          position: 'Руководитель кафедры',
          photo: '/team/kugurakova.jpg',
          title: 'Доцент',
          rarity: 'LEGENDARY',
          email: 'vlada.kugurakova@gmail.com',
          telegram: '@vladakugurakova',
          bio: 'Опыт работы в IT-индустрии более 10 лет...',
          researchInterests: ['VR/AR', 'Game Development', 'Computer Vision'],
          tags: ['Руководство', 'VR/AR', 'Исследования']
        }
      ];
      setStaff(mockData);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: StaffMember) => {
    try {
      if (editingMember) {
        setStaff(prev => prev.map(item => 
          item._id === editingMember._id ? data : item
        ));
      } else {
        setStaff(prev => [...prev, { ...data, _id: Date.now().toString() }]);
      }
      setIsModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error saving staff member:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
      setStaff(prev => prev.filter(item => item._id !== id));
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управление командой</h2>
          <p className="text-gray-600">Преподаватели и сотрудники кафедры</p>
        </div>
        <button
          onClick={() => {
            setEditingMember(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/90 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Новый сотрудник</span>
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Всего сотрудников</h3>
          <div className="text-2xl font-bold text-gray-900">{staff.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Преподавателей</h3>
          <div className="text-2xl font-bold text-gray-900">
            {staff.filter(m => m.position.includes('преподаватель')).length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">LEGENDARY</h3>
          <div className="text-2xl font-bold text-gray-900">
            {staff.filter(m => m.rarity === 'LEGENDARY').length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Направлений</h3>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(staff.flatMap(m => m.researchInterests || [])).size}
          </div>
        </div>
      </div>

      {/* Таблица сотрудников */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Сотрудник
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Должность
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Редкость
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Контакты
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={member.photo}
                        alt={member.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    member.rarity === 'LEGENDARY' ? 'bg-yellow-100 text-yellow-800' :
                    member.rarity === 'RARE' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {member.rarity === 'LEGENDARY' ? 'LEGENDARY' :
                     member.rarity === 'RARE' ? 'RARE' : 'COMMON'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{member.email}</div>
                  <div>{member.telegram}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingMember(member);
                      setIsModalOpen(true);
                    }}
                    className="text-primary hover:text-primary/80 mr-4"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(member._id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {staff.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Нет сотрудников. Добавьте первого!</p>
          </div>
        )}
      </div>

      {/* Модальное окно для сотрудников 
      */}

      <AnimatePresence>
        {isModalOpen && (
          <StaffForm
            member={editingMember}
            onSave={handleSave}
            onClose={() => {
              setIsModalOpen(false);
              setEditingMember(null);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Компонент StaffForm будет аналогичен предыдущим формам
```


## components\features\admin\UsersManagement.tsx

```tsx
// components/features/admin/UsersManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface User {
  email: string;
  displayName?: string;
  role: string;
  createdAt?: string;
}

interface UsersResponse {
  users: User[];
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      const url = searchTerm
        ? `${process.env.NEXT_PUBLIC_API_URL_API}/user/search?query=${encodeURIComponent(searchTerm)}`
        : `${process.env.NEXT_PUBLIC_API_URL_API}/user/users`;

      const { data } = await axios.get<UsersResponse>(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.users);
      setError('');
    } catch (err) {
      setError('Не удалось загрузить список пользователей');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (email: string, newRole: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/users/change-role`,
        { email, newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      alert('Ошибка при смене роли');
      console.error('Error changing role:', err);
    }
  };

  const handleDelete = async (email: string) => {
    if (!confirm(`Удалить пользователя ${email}?`)) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Не авторизованы');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/delete`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.filter((u) => u.email !== email));
    } catch (err) {
      alert('Ошибка при удалении пользователя');
      console.error('Error deleting user:', err);
    }
  };

  // Статистика пользователей
  const userStats = {
    total: users.length,
    admins: users.filter(u => u.role === 'Admin').length,
    teachers: users.filter(u => u.role === 'Teacher').length,
    students: users.filter(u => u.role === 'Student').length,
    guests: users.filter(u => u.role === 'Guest').length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Загрузка пользователей...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управление пользователями</h2>
          <p className="text-gray-600">Управление учетными записями и правами доступа</p>
        </div>
        <button
          onClick={fetchUsers}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/90 transition-colors flex items-center space-x-2"
        >
          <span>🔄</span>
          <span>Обновить</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">Всего пользователей</h3>
          <div className="text-2xl font-bold text-gray-900">{userStats.total}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">Администраторы</h3>
          <div className="text-2xl font-bold text-blue-300">{userStats.admins}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">Преподаватели</h3>
          <div className="text-2xl font-bold text-green-600">{userStats.teachers}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">Студенты</h3>
          <div className="text-2xl font-bold text-purple-600">{userStats.students}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">Гости</h3>
          <div className="text-2xl font-bold text-gray-600">{userStats.guests}</div>
        </motion.div>
      </div>

      {/* Поиск и фильтры */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Поиск пользователей
            </label>
            <div className="flex gap-2">
              <input
                id="search"
                type="text"
                placeholder="Введите email или имя пользователя..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={fetchUsers}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Найти
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Таблица пользователей */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Пользователь
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Роль
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата регистрации
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <motion.tr
                key={user.email}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-blue-300 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.displayName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.displayName || 'Без имени'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.email, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-primary ${
                      user.role === 'Admin' 
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : user.role === 'Teacher'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : user.role === 'Student'
                        ? 'bg-purple-100 text-purple-800 border-purple-200'
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}
                  >
                    {['Guest', 'Student', 'Teacher', 'Admin'].map((role) => (
                      <option key={role} value={role}>
                        {role === 'Guest' && 'Гость'}
                        {role === 'Student' && 'Студент'}
                        {role === 'Teacher' && 'Преподаватель'}
                        {role === 'Admin' && 'Администратор'}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="text-red-600 hover:text-red-900 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Удалить
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'Пользователи не найдены' : 'Нет пользователей'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```


## components\features\auth\LoginModal.tsx

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/auth/LoginModal.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      onClose();
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Вход</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-300 text-white py-3 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Нет аккаунта?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Зарегистрироваться
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```


## components\features\auth\RegisterModal.tsx

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/auth/RegisterModal.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(email, password, displayName);
      onClose();
      setEmail('');
      setPassword('');
      setDisplayName('');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setEmail('');
    setPassword('');
    setDisplayName('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Регистрация</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                  Имя
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500 mt-1">Минимум 6 символов</p>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-300 text-white py-3 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Уже есть аккаунт?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Войти
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```


## components\features\hallOfFame\CallToAction.tsx

```tsx
// src/components/features/hallOfFame/CallToAction.tsx
import { motion } from "framer-motion";
import Link from "next/link";

const CallToAction = () => (
  <motion.div
    className="text-center pt-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
  >
    <Link
      href="/portfolio"
      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <span>Посмотреть все проекты</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </Link>
  </motion.div>
);

export default CallToAction;
```


## components\features\hallOfFame\EmptyHallOfFame.tsx

```tsx
// src/components/features/hallOfFame/EmptyHallOfFame.tsx
import Link from "next/link";

const EmptyHallOfFame = () => (
  <div className="text-center py-12">
    <p className="text-gray-500 text-lg">
      Пока нет проектов, отмеченных на стене славы. Возможно, ваш проект будет первым!
    </p>
    <Link 
      href="/portfolio" 
      className="mt-4 inline-block text-blue-600 hover:underline"
    >
      Посмотреть все проекты →
    </Link>
  </div>
);

export default EmptyHallOfFame;
```


## components\features\hallOfFame\HallOfFameHeader.tsx

```tsx
// src/components/features/hallOfFame/HallOfFameHeader.tsx
import { motion } from "framer-motion";

import PageTitle from "@/components/ui/PageTitle";

const HallOfFameHeader = () => (
  <motion.div
    className="text-center space-y-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <PageTitle>
      <span className="inline-block animate-pulse">💎</span> СТЕНА СЛАВЫ <span className="inline-block animate-pulse">💎</span>
    </PageTitle>
    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
      Лучшие проекты, отобранные руководством кафедры
    </p>
  </motion.div>
);

export default HallOfFameHeader;
```


## components\features\hallOfFame\ProjectAuthors.tsx

```tsx
// src/components/features/hallOfFame/ProjectAuthors.tsx
import { ProjectAuthor } from "@/types/portfolio";

type ProjectAuthorsProps = {
  authors: ProjectAuthor[];
};

const ProjectAuthors = ({ authors }: ProjectAuthorsProps) => {
  if (!authors || authors.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {authors.slice(0, 3).map((member, idx) => (
        <span 
          key={idx} 
          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
        >
          {member.name}
        </span>
      ))}
      {authors.length > 3 && (
        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
          +{authors.length - 3} участников
        </span>
      )}
    </div>
  );
};

export default ProjectAuthors;
```


## components\features\hallOfFame\ProjectCard.tsx

```tsx
// src/components/features/hallOfFame/ProjectCard.tsx
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { PortfolioItem } from "@/types/portfolio";

import ProjectAuthors from "@/components/features/hallOfFame/ProjectAuthors";

type ProjectCardProps = {
  project: PortfolioItem;
  index: number;
};

const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      },
    }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block rounded-xl overflow-hidden border-2 border-blue-300 relative bg-white
                transform transition duration-500 shadow-xl hover:shadow-[0_0_20px_4px_rgba(0,200,255,0.3)]"
      aria-label={`Посмотреть проект: ${project.title}`}
    >
      {/* Обложка проекта */}
      <div className="relative h-52">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:opacity-85 transition-opacity duration-300"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Изображение отсутствует</span>
          </div>
        )}
        
        {/* Бейдж */}
        <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold shadow z-10">
          💎 Выбор кафедры
        </span>
      </div>
      
      {/* Информация о проекте */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-start">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {project.category}
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {project.year}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug text-dark group-hover:text-primary transition-colors duration-300 mt-2">
          {project.title}
        </h3>
        
        {/* Участники проекта */}
        <ProjectAuthors authors={project.authors || []} />
      </div>
    </Link>
  </motion.div>
);

export default ProjectCard;
```


## components\features\hallOfFame\ProjectGrid.tsx

```tsx
// src/components/features/hallOfFame/ProjectGrid.tsx
import { motion } from "framer-motion";
import { PortfolioItem } from "@/types/portfolio";

import ProjectCard from "@/components/features/hallOfFame/ProjectCard";
import EmptyHallOfFame from "@/components/features/hallOfFame/EmptyHallOfFame";

type ProjectGridProps = {
  projects: PortfolioItem[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  if (projects.length === 0) {
    return <EmptyHallOfFame />;
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, i) => (
        <ProjectCard key={project.slug || i} project={project} index={i} />
      ))}
    </motion.div>
  );
};

export default ProjectGrid;
```


## components\features\news\FullWidthImage.tsx

```tsx
// src/components/features/news/FullWidthImage.tsx
import Image from "next/image";

import { NewsItem } from "@/types/news";

type FullWidthImageProps = {
  article: NewsItem;
};

const FullWidthImage = ({ article }: FullWidthImageProps) => (
  <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
      <Image
        src={article.image}
        alt={article.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
    </div>
  </div>
);

export default FullWidthImage;
```


## components\features\news\MarkdownContent.tsx

```tsx
// src/components/features/news/MarkdownContent.tsx
import ReactMarkdown from "react-markdown";

type MarkdownContentProps = {
  content: string;
};

const MarkdownContent = ({ content }: MarkdownContentProps) => (
  <div className="prose prose-lg prose-brand max-w-none lg:col-span-3 marker:text-primary">
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
);

export default MarkdownContent;
```


## components\features\news\NewsCard.tsx

```tsx
// src/components/features/news/NewsCard.tsx
import Link from "next/link";
import Image from "next/image";

import { NewsItem } from "@/types/news";

type NewsCardProps = {
  item: NewsItem;
};

const NewsCard = ({ item }: NewsCardProps) => (
  <Link
    href={`/news/${item.slug}`}
    className="group block rounded-xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(0,120,255,0.3)] transform hover:scale-[1.02] transition duration-300"
  >
    <div className="relative h-56">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover group-hover:opacity-80 transition duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="bg-white px-4 py-3">
      <span className="text-sm text-gray-500 uppercase tracking-wide">
        {item.category}
      </span>
      <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition duration-300">
        {item.title}
      </h3>
    </div>
  </Link>
);

export default NewsCard;
```


## components\features\news\NewsFilterPanel.tsx

```tsx
// src/components/features/news/NewsFilterPanel.tsx
'use client';

import { Dispatch, SetStateAction } from "react";

import categoryData from "@/data/categories";

type NewsFilterPanelProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  categories: string[];
};

const NewsFilterPanel = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories
}: NewsFilterPanelProps) => (
  <aside className="w-full lg:w-1/3 space-y-8">
    <div>
      <h4 className="text-lg font-semibold text-gray-700 uppercase mb-2">
        Поиск
      </h4>
      <input
        type="text"
        placeholder="Поиск по заголовку…"
        className="w-full px-4 py-2 border rounded text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div>
      <h4 className="text-lg font-semibold text-gray-700 uppercase mb-2">
        Категории
      </h4>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer ${
              selectedCategory === category
                ? "font-semibold"
                : "text-gray-600"
            }`}
          >
            {categoryData[category as keyof typeof categoryData]?.label || category}
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

export default NewsFilterPanel;
```


## components\features\news\NewsGrid.tsx

```tsx
// src/components/features/news/NewsGrid.tsx
import { NewsItem } from "@/types/news";

import NewsCard from "@/components/features/news/NewsCard";

type NewsGridProps = {
  items: NewsItem[];
};

const NewsGrid = ({ items }: NewsGridProps) => (
  <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
    {items.map((item) => (
      <NewsCard key={item.slug} item={item} />
    ))}
  </div>
);

export default NewsGrid;
```


## components\features\news\NewsSidebar.tsx

```tsx
// src/components/features/news/NewsSidebar.tsx
import { NewsItem } from "@/types/news";
import categoryData from "@/data/categories";

type NewsSidebarProps = {
  article: NewsItem;
};

const NewsSidebar = ({ article }: NewsSidebarProps) => (
  <aside className="lg:col-span-1 space-y-6 mt-6 pt-6 border-t border-gray-300">
    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
      Дополнительная информация
    </h4>

    <div>
      <p className="text-xs font-medium text-gray-500 uppercase mb-1 tracking-wide">
        Дата выхода
      </p>
      <p className="text-sm text-gray-800">
        {new Date(article.date).toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>

    <div>
      <p className="text-xs font-medium text-gray-500 uppercase mb-1 tracking-wide">
        Категории новостей
      </p>
      <p className="text-sm text-gray-800">
        {categoryData[article.category as keyof typeof categoryData]?.label ||
          article.category}
      </p>
    </div>
  </aside>
);

export default NewsSidebar;
```


## components\features\portfolio\detail\EmptyPortfolio.tsx

```tsx
import Link from "next/link";

type EmptyPortfolioProps = {
  slug: string;
};

const EmptyPortfolio = ({slug}: EmptyPortfolioProps) => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Проект не найден</h2>
          <p className="text-gray-700 mb-6">
            Проект с идентификатором "{slug}" не существует или был удалён.
          </p>
          <Link 
            href="/portfolio" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться к портфолио
          </Link>
        </div>
      </div>
);
export default EmptyPortfolio;
```


## components\features\portfolio\detail\PhaseModal.tsx

```tsx
// src/components/features/portfolio/PhaseModal.tsx
'use client';

import { motion } from "framer-motion";
import { ProjectPhase } from "@/types/portfolio";
import Modal from "@/components/features/Modal";

type PhaseModalProps = {
  phase: ProjectPhase | null;
  onClose: () => void;
};

const PhaseModal = ({ phase, onClose }: PhaseModalProps) => {
  if (!phase) return null;

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{phase.title}</h2>
        <div className="text-sm text-gray-500 mb-2">
          {phase.date}
        </div>
        <p className="text-gray-700">{phase.description}</p>

        {phase.skills && phase.skills.length > 0 && (
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Развиваемые навыки
            </h3>
            <div className="space-y-3">
              {phase.skills.map((skill, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}/100</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PhaseModal;
```


## components\features\portfolio\detail\PortfolioDetail.tsx

```tsx
'use client';

import { useState } from "react";
import { motion } from "framer-motion";

import { PortfolioItem, ProjectPhase } from "@/types/portfolio";

import ProjectTimeline from "@/components/layout/ProjectTimeline";

import ImageSlider from "@/components/ui/ImageSlider";
import BackButton from "@/components/ui/BackButton";

import ProjectCover from "@/components/features/portfolio/detail/ProjectCover";
import ProjectContent from "@/components/features/portfolio/detail/ProjectContent";
import ProjectSidebar from "@/components/features/portfolio/detail/ProjectSidebar";
import ProjectAuthors from "@/components/features/portfolio/detail/ProjectAuthors";
import PhaseModal from "@/components/features/portfolio/detail/PhaseModal";

type PortfolioDetailClientProps = {
  project: PortfolioItem;
  content: string;
};

const PortfolioDetailClient = ({ project, content }: PortfolioDetailClientProps) => {
  const [modalData, setModalData] = useState<ProjectPhase | null>(null);

  const handlePhaseClick = (phase: ProjectPhase) => {
    setModalData(phase);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <motion.section
      className="space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProjectCover project={project} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <ProjectContent project={project} content={content} />
          </div>
          
          <div className="lg:col-span-1">
            <ProjectSidebar project={project} />
          </div>
        </div>

        {/* Этапы разработки */}
        {project.phases && project.phases.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-6">Этапы разработки</h2>
            <ProjectTimeline events={project.phases} onClick={handlePhaseClick} />
          </div>
        )}

        {/* Скриншоты */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-6">Скриншоты</h2>
            <ImageSlider images={project.screenshots} />
          </div>
        )}

        {/* Авторы проекта */}
        {project.authors && project.authors.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-6">Авторы проекта</h2>
            <ProjectAuthors authors={project.authors} />
          </div>
        )}
      </div>

      <PhaseModal phase={modalData} onClose={closeModal} />

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <BackButton href="/portfolio">
          Вернуться к портфолио
        </BackButton>
      </div>
    </motion.section>
  );
};

export default PortfolioDetailClient;
```


## components\features\portfolio\detail\ProjectAuthors.tsx

```tsx
// src/components/features/portfolio/ProjectAuthors.tsx
import Link from "next/link";
import { ProjectAuthor } from "@/types/portfolio";

type ProjectAuthorsProps = {
  authors: ProjectAuthor[];
};

const ProjectAuthors = ({ authors }: ProjectAuthorsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {authors.map((author, i) => (
      <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="flex-1">
          <Link
            href={`/staff/${author.slug}`}
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            {author.name}
          </Link>
          {author.role && (
            <p className="text-sm text-gray-600 mt-1">{author.role}</p>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ProjectAuthors;
```


## components\features\portfolio\detail\ProjectContent.tsx

```tsx
// src/components/features/portfolio/ProjectContent.tsx
import ReactMarkdown from "react-markdown";
import { PortfolioItem } from "@/types/portfolio";

type ProjectContentProps = {
  project: PortfolioItem;
  content: string;
};

const ProjectContent = ({ project, content }: ProjectContentProps) => (
  <div className="space-y-10">
    <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>

    <div className="prose prose-lg prose-brand max-w-none text-gray-700">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>

    {project.goals && project.goals.length > 0 && (
      <div>
        <h2 className="text-3xl font-bold mb-4">Цели проекта</h2>
        <ul className="list-disc text-lg pl-5 mt-2 space-y-3 text-gray-700 marker:text-primary">
          {project.goals.map((goal, i) => (
            <li key={i} className="pl-2">{goal}</li>
          ))}
        </ul>
      </div>
    )}

    {project.features && project.features.length > 0 && (
      <div>
        <h2 className="text-3xl font-bold mb-4">Технические особенности</h2>
        <ul className="list-disc text-lg pl-5 mt-2 space-y-3 text-gray-700 marker:text-primary">
          {project.features.map((feature, i) => (
            <li key={i} className="pl-2">{feature}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default ProjectContent;
```


## components\features\portfolio\detail\ProjectCover.tsx

```tsx
// src/components/features/portfolio/ProjectCover.tsx
import Image from "next/image";
import { PortfolioItem } from "@/types/portfolio";
import { getImageUrl } from "@/utils/imageUtils";

type ProjectCoverProps = {
  project: PortfolioItem;
};

const ProjectCover = ({ project }: ProjectCoverProps) => (
  <div className="w-full relative -mt-16 md:-mt-24">
    {project.image ? (
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
        <Image
          src={getImageUrl(project.image)}
          alt={`Обложка проекта: ${project.title}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    ) : (
      <div className="bg-gray-200 border-2 border-dashed w-full h-96 flex items-center justify-center">
        <span className="text-gray-500 text-lg">Изображение отсутствует</span>
      </div>
    )}
  </div>
);

export default ProjectCover;
```


## components\features\portfolio\detail\ProjectSidebar.tsx

```tsx
// src/components/features/portfolio/ProjectSidebar.tsx
import Link from "next/link";
import { PortfolioItem } from "@/types/portfolio";

type ProjectSidebarProps = {
  project: PortfolioItem;
};

const ProjectSidebar = ({ project }: ProjectSidebarProps) => (
  <aside className="space-y-6 border-t pt-6 border-gray-300">
    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
      Дополнительная информация
    </h4>
    
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-xs text-gray-500 uppercase mb-1">Дата релиза</p>
      <p className="text-sm font-medium">{project.releaseDate || "Не указана"}</p>
    </div>
    
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-xs text-gray-500 uppercase mb-1">Категория</p>
      <p className="text-sm font-medium">{project.category}</p>
    </div>
    
    {project.year && (
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-xs text-gray-500 uppercase mb-1">Год реализации</p>
        <p className="text-sm font-medium">{project.year}</p>
      </div>
    )}
    
    {project.download && (
      <a
        href={project.download}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
      >
        Скачать проект
      </a>
    )}
  </aside>
);

export default ProjectSidebar;
```


## components\features\portfolio\CategoryFilter.tsx

```tsx
// src/components/features/portfolio/CategoryFilter.tsx
'use client';

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}: CategoryFilterProps) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h4 className="text-lg font-semibold text-gray-700 uppercase mb-2">Категории</h4>
    <ul className="space-y-2">
      {categories.map((category) => (
        <li
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`cursor-pointer p-2 rounded-lg transition-colors ${
            selectedCategory === category 
              ? "bg-blue-50 text-blue-700 font-semibold" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center">
            <span className="mr-2">
              {selectedCategory === category ? "•" : "○"}
            </span>
            <span className="capitalize">
              {category === "all" ? "Все проекты" : category}
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default CategoryFilter;
```


## components\features\portfolio\EmptyProjects.tsx

```tsx
// src/components/features/portfolio/EmptyProjects.tsx
'use client';

type EmptyProjectsProps = {
  onResetFilters: () => void;
};

const EmptyProjects = ({ onResetFilters }: EmptyProjectsProps) => (
  <div className="text-center py-12 bg-white rounded-xl shadow">
    <p className="text-gray-500 text-lg mb-4">Проекты по вашему запросу не найдены</p>
    <button 
      onClick={onResetFilters}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Сбросить фильтры
    </button>
  </div>
);

export default EmptyProjects;
```


## components\features\portfolio\PortfolioStats.tsx

```tsx
// src/components/features/portfolio/PortfolioStats.tsx
type PortfolioStatsProps = {
  totalProjects: number;
  hallOfFameCount: number;
  filteredCount: number;
  selectedCategory: string;
};

const PortfolioStats = ({ 
  totalProjects, 
  hallOfFameCount, 
  filteredCount,
  selectedCategory
}: PortfolioStatsProps) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h4 className="text-lg font-semibold text-gray-700 uppercase mb-2">Статистика</h4>
    <ul className="space-y-1 text-sm text-gray-600">
      <li className="flex justify-between">
        <span>Всего проектов:</span>
        <span className="font-medium">{totalProjects}</span>
      </li>
      <li className="flex justify-between">
        <span>На стене славы:</span>
        <span className="font-medium">{hallOfFameCount}</span>
      </li>
      <li className="flex justify-between">
        <span>В категории "{selectedCategory === "all" ? "Все проекты" : selectedCategory}":</span>
        <span className="font-medium">{filteredCount}</span>
      </li>
    </ul>
  </div>
);

export default PortfolioStats;
```


## components\features\portfolio\ProjectCard.tsx

```tsx
// src/components/features/portfolio/ProjectCard.tsx
import Link from "next/link";
import Image from "next/image";

import { PortfolioItem } from "@/types/portfolio";

import { getImageUrl } from "@/utils/imageUtils";

type ProjectCardProps = {
  project: PortfolioItem;
};

const ProjectCard = ({ project }: ProjectCardProps) => (
  <Link
    href={`/portfolio/${project.slug}`}
    className="group block rounded-xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(0,120,255,0.3)] transform hover:scale-[1.02] transition duration-300 bg-white"
    aria-label={`Посмотреть проект: ${project.title}`}
  >
    <div className="relative h-56">
      {project.image ? (
        <Image
          src={getImageUrl(project.image)}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:opacity-80 transition-opacity duration-300"
        />
      ) : (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
          <span className="text-gray-500">Изображение отсутствует</span>
        </div>
      )}
    </div>
    <div className="px-4 py-4">
      <div className="flex justify-between items-start">
        <span className="text-sm text-gray-500 uppercase tracking-wide">
          {project.category}
        </span>
        {project.year && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {project.year}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold leading-snug text-dark group-hover:text-primary transition-colors duration-300 mt-2">
        {project.title}
      </h3>
      
      {/* Краткое описание */}
      {project.description && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {project.description}
        </p>
      )}
    </div>
  </Link>
);

export default ProjectCard;
```


## components\features\portfolio\ProjectsGrid.tsx

```tsx
// src/components/features/portfolio/ProjectsGrid.tsx
import { PortfolioItem } from "@/types/portfolio";
import ProjectCard from "@/components/features/portfolio/ProjectCard";

type ProjectsGridProps = {
  projects: PortfolioItem[];
};

const ProjectsGrid = ({ projects }: ProjectsGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {projects.map((project) => (
      <ProjectCard key={project.slug} project={project} />
    ))}
  </div>
);

export default ProjectsGrid;
```


## components\features\portfolio\SearchFilter.tsx

```tsx
// src/components/features/portfolio/SearchFilter.tsx
'use client';

type SearchFilterProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const SearchFilter = ({ searchQuery, setSearchQuery }: SearchFilterProps) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h4 className="text-lg font-semibold text-gray-700 uppercase mb-2">Поиск</h4>
    <input
      type="text"
      placeholder="Поиск проекта..."
      className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      aria-label="Поиск проектов"
    />
  </div>
);

export default SearchFilter;
```


## components\features\staff\detail\StaffAchievements.tsx

```tsx
// src/components/features/staff/StaffAchievements.tsx
'use client';

import { motion } from "framer-motion";
import { 
  FaStar, 
  FaServer, 
  FaCrown, 
  FaMedal 
} from "react-icons/fa";
import { StaffAchievement } from "@/types/staff";
import { PortfolioItem } from "@/types/portfolio";
import { StaffMember } from "@/types/staff";

type StaffAchievementsProps = {
  staff: StaffMember;
  projects: PortfolioItem[];
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "FaStar": return <FaStar className="text-2xl text-yellow-500 shrink-0" />;
    case "FaUserGear": return <FaServer className="text-2xl text-yellow-500 shrink-0" />;
    case "FaCrown": return <FaCrown className="text-2xl text-yellow-500 shrink-0" />;
    default: return <FaMedal className="text-2xl text-yellow-500 shrink-0" />;
  }
};

const generateDynamicAchievements = (
  staff: StaffMember, 
  projects: PortfolioItem[]
): StaffAchievement[] => {
  const achievements: StaffAchievement[] = [];

  // 🧠 Навыки выше 4
  staff.skills?.forEach(skill => {
    if (skill.level >= 4) {
      achievements.push({
        title: `Эксперт в ${skill.name}`,
        description: `Достиг высокого уровня в умении "${skill.name}"`,
        icon: "FaStar"
      });
    }
  });

  // 🛠 Больше 3 проектов
  if (projects.length >= 3) {
    achievements.push({
      title: "Опытный наставник",
      description: `Участвовал(а) в ${projects.length} проектах студентов`,
      icon: "FaUserGear"
    });
  }

  // 🔥 Роль "Руководитель" и есть проекты
  if (staff.position?.toLowerCase().includes("руководитель") && projects.length > 0) {
    achievements.push({
      title: "Лидер команды",
      description: "Руководил(а) разработкой студенческих проектов",
      icon: "FaCrown"
    });
  }

  return achievements;
};

const StaffAchievements = ({ staff, projects }: StaffAchievementsProps) => {
  const allAchievements = [
    ...(staff.achievements || []),
    ...generateDynamicAchievements(staff, projects)
  ];

  if (allAchievements.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Достижения</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allAchievements.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white border rounded-lg shadow p-4 flex items-start space-x-3 transition duration-300 hover:shadow-[0_0_15px_rgba(251,191,36,0.6)]"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {getIconComponent(a.icon)}
            </motion.div>
            <div>
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm text-gray-600">{a.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StaffAchievements;
```


## components\features\staff\detail\StaffContacts.tsx

```tsx
// src/components/features/staff/StaffContacts.tsx
import { StaffMember } from "@/types/staff";

type StaffContactsProps = {
  staff: StaffMember;
};

const StaffContacts = ({ staff }: StaffContactsProps) => {
  const hasContacts = staff.email || staff.telegram || staff.github;
  
  if (!hasContacts) return null;

  return (
    <div className="space-y-4 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold">Контакты</h2>
      <div className="flex flex-wrap gap-4">
        {staff.email && (
          <a 
            href={`mailto:${staff.email}`}
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <span>✉️</span> {staff.email}
          </a>
        )}
        {staff.telegram && (
          <a 
            href={`https://t.me/${staff.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <span>📨</span> @{staff.telegram}
          </a>
        )}
        {staff.github && (
          <a 
            href={`https://github.com/${staff.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <span>🐙</span> {staff.github}
          </a>
        )}
      </div>
    </div>
  );
};

export default StaffContacts;
```


## components\features\staff\detail\StaffHeader.tsx

```tsx
// src/components/features/staff/StaffHeader.tsx
import Image, { StaticImageData } from "next/image";
import { StaffMember } from "@/types/staff";

type StaffHeaderProps = {
  staff: StaffMember;
};

const StaffHeader = ({ staff }: StaffHeaderProps) => (
  <div className="text-center space-y-3">
    <div className="relative w-40 h-40 mx-auto">
      {staff.photo && (
        <Image
          src={staff.photo}
          alt={staff.name}
          fill
          className="object-cover rounded-full border-4 border-primary"
          sizes="(max-width: 640px) 100vw, 160px"
        />
      )}
    </div>
    <h1 className="text-3xl font-bold">{staff.name}</h1>
    <p className="text-gray-600">{staff.position}</p>
    
    {staff.title && (
      <p className="text-gray-500 italic">{staff.title}</p>
    )}
    {staff.rarity && (
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
        staff.rarity === "LEGENDARY" ? "bg-purple-100 text-purple-800" :
        staff.rarity === "RARE" ? "bg-blue-100 text-blue-800" :
        "bg-gray-100 text-gray-800"
      }`}>
        {staff.rarity === "LEGENDARY" ? "Легендарный" : 
          staff.rarity === "RARE" ? "Редкий" : "Обычный"}
      </span>
    )}
  </div>
);

export default StaffHeader;
```


## components\features\staff\detail\StaffProjects.tsx

```tsx
// src/components/features/staff/StaffProjects.tsx
import Link from "next/link";
import Image from "next/image";
import { PortfolioItem } from "@/types/portfolio";

type StaffProjectsProps = {
  projects: PortfolioItem[];
};

const StaffProjects = ({ projects }: StaffProjectsProps) => {
  if (projects.length === 0) return null;

  return (
    <div className="space-y-4 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold">Проекты преподавателя</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <Link
            key={i}
            href={`/portfolio/${project.slug}`}
            className="group block rounded overflow-hidden shadow hover:shadow-lg transition-all"
          >
            <div className="relative w-full h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="bg-white p-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600">{project.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StaffProjects;
```


## components\features\staff\detail\StaffSkills.tsx

```tsx
// src/components/features/staff/StaffSkills.tsx
'use client';

import SkillTree from "@/components/features/SkillTree";
import { StaffSkill } from "@/types/staff";

type StaffSkillsProps = {
  skills: StaffSkill[];
};

const StaffSkills = ({ skills }: StaffSkillsProps) => {
  if (skills.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Навыки</h2>
      <SkillTree skills={skills} />
    </div>
  );
};

export default StaffSkills;
```


## components\features\staff\EmptyStaff.tsx

```tsx
// src/components/features/staff/EmptyStaff.tsx
'use client';

import AnimatedDiv from "@/components/layout/AnimatedDiv";

type EmptyStaffProps = {
  onReset: () => void;
};

const EmptyStaff = ({ onReset }: EmptyStaffProps) => (
    <AnimatedDiv className="text-center py-12 bg-gray-50 rounded-lg" transition={{ duration: 0.3 }}>
        <p className="text-gray-500 mb-4">
            Нет сотрудников с выбранными навыками
        </p>
        <button
            onClick={onReset}
            className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-300-dark transition-colors"
        >
            Показать всех сотрудников
        </button>
    </AnimatedDiv>
);

export default EmptyStaff;
```


## components\features\staff\SkillFilter.tsx

```tsx
// src/components/features/staff/SkillFilter.tsx
'use client';

import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

type SkillFilterProps = {
  skills: string[];
  selectedSkills: string[];
  setSelectedSkills: Dispatch<SetStateAction<string[]>>;
};

const SkillFilter = ({ 
  skills, 
  selectedSkills, 
  setSelectedSkills 
}: SkillFilterProps) => {
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const resetFilters = () => setSelectedSkills([]);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill) => {
          const isSelected = selectedSkills.includes(skill);
          return (
            <motion.button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-4 py-1.5 text-sm rounded-full border-2 font-medium transition-colors ${
                isSelected
                  ? "bg-blue-300 text-white border-primary"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {skill}
            </motion.button>
          );
        })}
      </div>

      {selectedSkills.length > 0 && (
        <button
          onClick={resetFilters}
          className="text-sm text-primary font-medium hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Сбросить фильтры
        </button>
      )}
    </div>
  );
};

export default SkillFilter;
```


## components\features\staff\StaffCard.tsx

```tsx
import Link from "next/link";
import Image from "next/image"
import SocialLinks from "@/components/features/SocialLinks";

import Label from "@/components/ui/Label";

import { NewsItem } from "@/types/news";
import { StaffMember } from "@/types/staff"; // Предполагаем наличие типов
import newsData from "@/data/news";
import roles from "@/data/roles";

interface StaffCardProps {
  staff: StaffMember;
}

const StaffCard = ({ staff }: StaffCardProps) => {
  const { 
    id, 
    photo, 
    name, 
    title, 
    email, 
    telegram, 
    github, 
    bio 
  } = staff;
  
  const authorArticles = newsData.filter(
    (article: NewsItem) => article.authorId === id
  );
  
  return (
    <div className="border-t border-gray-300 pt-8 pb-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Оптимизированное изображение Next.js */}
        <div className="relative w-40 h-40">
          <Image
            src={photo}
            alt={`Фото ${name}`}
            className="w-full h-full object-cover rounded-full border shadow-sm"
          />
        </div>

        <div className="flex-1 space-y-2 text-left">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>

          <p className="text-sm text-gray-700 font-semibold">
            <Label dict={roles} value={title!} />
          </p>

          {email && (
            <a
              href={`mailto:${email}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {email}
            </a>
          )}

          <SocialLinks links={{ telegram, github }} />
        </div>
      </div>

      {bio && (
        <div className="text-gray-700 text-base leading-relaxed max-w-3xl">
          {bio}
        </div>
      )}

      {authorArticles.length > 0 && (
        <Link
          href={`/news/${authorArticles[0].slug}`}
          className="inline-block mt-2 text-sm text-blue-600 hover:underline"
          aria-label={`Читать статью автора ${name}`}
        >
          Читать статью →
        </Link>
      )}
    </div>
  );
};

export default StaffCard;
```


## components\features\staff\StaffCardGameStyle.tsx

```tsx
import Link from "next/link";
import classNames from "classnames";

// Типизация для редкости
type Rarity = 'LEGENDARY' | 'RARE' | 'COMMON';

// Типизация для стилей редкости
interface RarityStyles {
  [key: string]: {
    bg: string;
    border: string;
    badge: string;
    glow: string;
  };
}

// Тип для статистики
interface Stat {
  label: string;
  value: number;
}

// Пропсы компонента
interface StaffCardGameStyleProps {
  slug: string;
  name: string;
  position: string;
  image?: string;
  rarity?: Rarity | string; // Допускаем другие строки, но предпочтительно Rarity
  stats?: Stat[];
}

const rarityStyles: RarityStyles = {
  LEGENDARY: {
    bg: "bg-yellow-50",
    border: "border-2 border-yellow-400",
    badge: "bg-yellow-300 text-yellow-900",
    glow: "hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]"
  },
  RARE: {
    bg: "bg-blue-50",
    border: "border border-blue-300",
    badge: "bg-blue-200 text-blue-800",
    glow: "hover:shadow-[0_0_20px_rgba(147,197,253,0.5)]"
  },
  COMMON: {
    bg: "bg-white",
    border: "border border-gray-200",
    badge: "bg-gray-200 text-gray-700",
    glow: "hover:shadow-[0_0_20px_rgba(209,213,219,0.4)]"
  }
};

const StaffCardGameStyle = ({ 
  slug, 
  name, 
  position, 
  image, 
  rarity = "COMMON", 
  stats = [] 
}: StaffCardGameStyleProps) => {
  // Нормализуем значение редкости к верхнему регистру
  const normalizedRarity = rarity.toUpperCase();
  
  // Получаем стили для редкости или используем COMMON как запасной вариант
  const styles = rarityStyles[normalizedRarity] || rarityStyles.COMMON;

  return (
    <Link href={`/staff/${slug}`} passHref legacyBehavior>
      <a className="block">
        <div
          className={classNames(
            "rounded-xl overflow-hidden p-4 transition-transform transform hover:scale-[1.02] shadow-md",
            styles.bg,
            styles.border,
            styles.glow,
            "cursor-pointer" // Явное указание курсора
          )}
          aria-label={`Карточка сотрудника: ${name}`}
        >
          {/* Область фото */}
          <div className="w-full h-60 flex items-center justify-center overflow-hidden rounded-md mb-4 bg-white">
            {/* Используем next/image для оптимизации */}
            <img
              src={image}
              alt={`Фото ${name}`}
              className="h-full object-contain"
              loading="lazy" // Ленивая загрузка
            />
          </div>

          {/* Контент карточки */}
          <div className="space-y-2 px-1 pb-1">
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{position}</p>

            <span className={classNames(
              "inline-block text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider",
              styles.badge
            )}>
              {normalizedRarity}
            </span>

            {/* Статистика */}
            {stats.length > 0 && (
              <div className="pt-3 space-y-1 text-sm">
                {stats.map((stat, i) => (
                  <div key={`stat-${i}`} className="flex justify-between">
                    <span className="text-gray-700">{stat.label}</span>
                    <span className="font-medium text-gray-900">
                      {stat.value}/100
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default StaffCardGameStyle;
```


## components\features\staff\StaffGrid.tsx

```tsx
// src/components/features/staff/StaffGrid.tsx
'use client';

import { motion, AnimatePresence } from "framer-motion";
import { StaffMember } from "@/types/staff";
import StaffCardGameStyle from "@/components/features/staff/StaffCardGameStyle";

type StaffGridProps = {
  staffList: StaffMember[];
};

const StaffGrid = ({ staffList }: StaffGridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <AnimatePresence mode="popLayout">
      {staffList.map((staff) => (
        <motion.div
          key={staff.slug}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StaffCardGameStyle {...staff} />
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default StaffGrid;
```


## components\features\successStories\SuccessMapView.tsx

```tsx
// src/components/features/successStories/SuccessMapView.tsx
import dynamic from "next/dynamic";

import { SuccessStory } from "@/types/successStories";

import SuccessMarker from "@/components/features/successStories/SuccessMarker";

// Динамический импорт компонентов Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

type SuccessMapViewProps = {
  stories: SuccessStory[];
  center?: [number, number];
  zoom?: number;
};

const SuccessMapView = ({ 
  stories, 
  center = [51.505, 20], 
  zoom = 3 
}: SuccessMapViewProps) => (
  <div className="h-[600px] w-full rounded shadow overflow-hidden z-0">
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {stories.map((story) => (
        <SuccessMarker key={story.id} story={story} />
      ))}
    </MapContainer>
  </div>
);

export default SuccessMapView;
```


## components\features\successStories\SuccessMarker.tsx

```tsx
// src/components/features/successStories/SuccessMarker.tsx
import dynamic from "next/dynamic";
import Image from "next/image";

import L from "leaflet";

import { SuccessStory } from "@/types/successStories";

// Динамический импорт компонентов Leaflet
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Иконка маркера
const customIcon = new L.Icon({
  iconUrl: "/icons/marker-blue.png",
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
});

type SuccessMarkerProps = {
  story: SuccessStory;
};

const SuccessMarker = ({ story }: SuccessMarkerProps) => (
  <Marker position={[story.lat, story.lng]} icon={customIcon}>
    <Popup>
      <div className="space-y-2 text-sm min-w-[250px]">
        <div className="relative w-full h-28">
          <Image
            src={story.image}
            alt={story.project}
            fill
            className="object-cover rounded"
            sizes="250px"
          />
        </div>
        <div>
          <strong className="text-md">{story.project}</strong>
          <p>{story.description}</p>
          <p className="text-gray-500">{story.city}, {story.year}</p>
          <a
            href={story.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Подробнее
          </a>
        </div>
      </div>
    </Popup>
  </Marker>
);

export default SuccessMarker;
```


## components\features\successStories\YearFilter.tsx

```tsx
// src/components/features/successStories/YearFilter.tsx
import React from "react";

type YearFilterProps = {
  years: number[];
  selectedYears: number[];
  onToggleYear: (year: number) => void;
  onReset: () => void;
};

const YearFilter = ({ 
  years, 
  selectedYears, 
  onToggleYear, 
  onReset 
}: YearFilterProps) => (
  <div>
    <div className="flex flex-wrap gap-2">
      {years.map((year) => {
        const isSelected = selectedYears.includes(year);
        return (
          <button
            key={year}
            onClick={() => onToggleYear(year)}
            className={`px-4 py-1 text-sm rounded-full border transition ${
              isSelected
                ? "bg-blue-300 text-white border-primary"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {year}
          </button>
        );
      })}
    </div>

    {selectedYears.length > 0 && (
      <button
        onClick={onReset}
        className="text-sm text-primary underline mt-2"
      >
        Сбросить фильтры
      </button>
    )}
  </div>
);

export default YearFilter;
```


## components\features\Modal.tsx

```tsx
'use client'; // Директива для клиентского компонента

import { ReactNode, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  children: ReactNode; // Типизация для содержимого модального окна
  onClose: () => void; // Функция закрытия без аргументов
  isOpen?: boolean; // Опциональный флаг открытия (для контроля извне)
}

const Modal = ({ children, onClose, isOpen = true }: ModalProps) => {
  // Обработчик клика на оверлей
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6 relative z-60 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e: MouseEvent) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
              onClick={onClose}
              aria-label="Закрыть"
            >
              &times;
            </button>
            <div className="mt-2">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
```


## components\features\SkillDetailModal.tsx

```tsx
'use client'; // Директива для клиентского компонента

import { MouseEvent } from "react";

// Тип для объекта skill
interface Skill {
  name: string;
  level: number;
  description?: string; // Опциональное поле
}

// Типизация пропсов компонента
interface SkillDetailModalProps {
  skill: Skill;
  onClose: () => void;
}

const SkillDetailModal = ({ skill, onClose }: SkillDetailModalProps) => {
  // Обработчик клика по оверлею
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-modal-title"
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-xl mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Закрыть модальное окно"
        >
          ✕
        </button>
        <h2 id="skill-modal-title" className="text-2xl font-bold mb-2">
          {skill.name}
        </h2>
        <p className="text-sm text-gray-600 mb-4">Уровень: {skill.level}</p>
        <p className="text-gray-700">
          {skill.description || "Описание навыка пока не добавлено."}
        </p>
      </div>
    </div>
  );
};

export default SkillDetailModal;
```


## components\features\SkillTree.tsx

```tsx
'use client'; // Директива для клиентского компонента

import { useState } from "react";
import SkillDetailModal from "@/components/features/SkillDetailModal";

// Типы для структур данных
interface Subskill {
  name: string;
  // Можно добавить дополнительные поля при необходимости
}

interface Skill {
  name: string;
  level: number; // Уровень как число (1-5)
  description?: string;
  subskills?: Subskill[];
}

interface SkillTreeProps {
  skills: Skill[]; // Массив навыков
}

const SkillTree = ({ skills }: SkillTreeProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <div className="relative w-full overflow-x-auto py-8">
      <div className="flex justify-center gap-8 flex-wrap md:flex-nowrap">
        {skills.map((skill, index) => (
          <div 
            key={`${skill.name}-${index}`} 
            className="relative flex flex-col items-center group"
          >
            {/* Основной навык */}
            <div
              onClick={() => setSelectedSkill(skill)}
              className="w-36 h-24 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex flex-col justify-center items-center shadow-xl border-4 border-white hover:scale-105 transition-all duration-300 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedSkill(skill)}
              aria-label={`Подробнее о навыке ${skill.name}, уровень ${skill.level}`}
            >
              <div className="font-semibold text-base">{skill.name}</div>
              <div className="text-xs mb-1">Уровень: {skill.level}</div>

              {/* Прогресс-бар */}
              <div className="w-28 h-2 bg-white bg-opacity-20 rounded overflow-hidden mt-1">
                <div
                  className="h-full bg-white rounded"
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                  aria-valuenow={skill.level}
                  aria-valuemin={1}
                  aria-valuemax={5}
                  role="progressbar"
                ></div>
              </div>
            </div>

            {/* Линия к поднавыкам */}
            {skill.subskills && skill.subskills.length > 0 && (
              <div className="h-8 w-0.5 bg-gray-300 mt-1"></div>
            )}

            {/* Поднавыки */}
            {skill.subskills && skill.subskills.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-4 px-4 max-w-5xl mx-auto">
                {skill.subskills.map((sub, i) => (
                  <div
                    key={`${sub.name}-${i}`}
                    className="bg-gray-100 rounded-md px-4 py-2 text-sm shadow-sm hover:bg-gray-200 transition"
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Модальное окно деталей навыка */}
      {selectedSkill && (
        <SkillDetailModal 
          skill={selectedSkill} 
          onClose={() => setSelectedSkill(null)} 
        />
      )}
    </div>
  );
};

export default SkillTree;
```


## components\features\SocialLinks.tsx

```tsx
import { FaTelegram, FaGithub } from "react-icons/fa";

// Типизация пропсов
interface SocialLinksProps {
  links?: {
    telegram?: string;
    github?: string;
    // Можно расширить для других соцсетей
    twitter?: string;
    linkedin?: string;
  };
}

const SocialLinks = ({ links = {} }: SocialLinksProps) => {
  const { telegram, github } = links;

  // Проверка наличия хотя бы одной ссылки
  const hasLinks = telegram || github;
  if (!hasLinks) return null;

  return (
    <div className="flex flex-wrap gap-3 pt-2">
      {telegram && (
        <a
          href={telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition-colors"
          aria-label="Наш Telegram"
        >
          <FaTelegram className="text-blue-500 text-base" />
          Telegram
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-800 text-sm rounded-md hover:bg-gray-200 transition-colors"
          aria-label="Наш GitHub"
        >
          <FaGithub className="text-gray-800 text-base" />
          GitHub
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
```


## components\layout\AnimatedDiv.tsx

```tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type AnimatedDivProps = {
  children: ReactNode;
  className?: string;
  animation?: Variants;
  initial?: string | boolean;
  animate?: string | boolean;
  transition?: {
    duration?: number;
    delay?: number;
  };
};

export default function AnimatedDiv({
  children,
  className = '',
  animation,
  initial = "hidden",
  animate = "visible",
  transition = { duration: 0.5 }
}: AnimatedDivProps) {
  // Дефолтная анимация если не передана кастомная
  const defaultAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: transition?.duration,
        delay: transition?.delay,
      }
    }
  };

  return (
    <motion.div
      className={`${className}`}
      variants={animation || defaultAnimation}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
```


## components\layout\AnimatedSection.tsx

```tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  animation?: Variants;
  initial?: string | boolean;
  animate?: string | boolean;
  transition?: {
    duration?: number;
    delay?: number;
  };
};

export default function AnimatedSection({
  children,
  className = '',
  animation,
  initial = "hidden",
  animate = "visible",
  transition = { duration: 0.5 }
}: AnimatedSectionProps) {
  // Дефолтная анимация если не передана кастомная
  const defaultAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: transition?.duration,
        delay: transition?.delay,
      }
    }
  };

  return (
    <motion.section
      className={`${className}`}
      variants={animation || defaultAnimation}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.section>
  )
}
```


## components\layout\Footer.tsx

```tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ИТИС КИРВИ</h3>
            <p className="text-gray-400">
              Кафедра индустрии разработки видеоигр
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <div className="space-y-2">
              {['Главная', 'О кафедре', 'Проекты', 'Команда', 'Блог', 'Партнеры', 'Награды', 'FAQ', 'Контакты'].map((item) => (
                <button
                  key={item}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-gray-400">
              <p>ул. Кремлевская 35, каб. 1407</p>
              <p>+7 (XXX) XXX-XX-XX</p>
              <p>info@itis-kirvi.ru</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Соцсети</h4>
            <div className="flex gap-4">
              {['VK', 'TG', 'YT'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 ИТИС КИРВИ. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
```


## components\layout\Header.tsx

```tsx
// components/layout/Header.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/features/auth/LoginModal';
import RegisterModal from '@/components/features/auth/RegisterModal';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  const mainMenuItems = [
    { id: 'hero', label: 'Главная', path: '/' },
    { id: 'projects', label: 'Проекты', path: '/' },
    { id: 'team', label: 'Команда', path: '/' },
    { id: 'blog', label: 'Блог', path: '/' },
    { id: 'partners', label: 'Партнеры', path: '/' },
    { id: 'awards', label: 'Награды', path: '/' },
    { id: 'faq', label: 'FAQ', path: '/' },
    { id: 'contact', label: 'Контакты', path: '/' },
  ];

  const handleMainMenuClick = (item: typeof mainMenuItems[0]) => {
    if (pathname !== '/') {
      router.push('/');
      // Ждем немного перед скроллом чтобы страница успела загрузиться
      setTimeout(() => {
        onSectionChange(item.id);
        const element = document.getElementById(item.id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      onSectionChange(item.id);
      const element = document.getElementById(item.id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    setShowLoginModal(true);
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    setShowRegisterModal(true);
    setIsMenuOpen(false);
  };

  const handleProfile = () => {
    router.push('/profile');
    setShowUserMenu(false);
    setIsMenuOpen(false);
  };

  const handleAdmin = () => {
    router.push('/admin');
    setShowUserMenu(false);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsMenuOpen(false);
    if (pathname !== '/') {
      router.push('/');
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Логотип */}
            <button
              onClick={() => {
                router.push('/');
                onSectionChange('hero');
              }}
              className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              ИТИС КИРВИ
            </button>

            {/* Десктопное меню */}
            <div className="hidden md:flex items-center space-x-8">
              {mainMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMainMenuClick(item)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id && pathname === '/'
                      ? 'text-primary font-semibold bg-blue-300/10'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Кнопки авторизации или профиль */}
              {!isAuthenticated ? (
                <div className="flex items-center space-x-4 ml-4">
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    Войти
                  </button>
                  <button
                    onClick={handleRegister}
                    className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors"
                  >
                    Регистрация
                  </button>
                </div>
              ) : (
                <div className="relative ml-4">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-300 bg-blue-300 rounded-full flex items-center justify-center text-sm font-semibold">
                      {getUserInitials(user?.displayName || 'U')}
                    </div>
                    <span className="text-gray-700">{user?.displayName}</span>
                    <motion.span
                      animate={{ rotate: showUserMenu ? 180 : 0 }}
                      className="text-gray-500"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <button
                          onClick={handleProfile}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Мой профиль
                        </button>
                        <button
                          onClick={handleAdmin}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Админ-панель
                        </button>
                        {user?.role === 'Admin' && (
                          <button
                            onClick={handleAdmin}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            Админ-панель
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Выйти
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Мобильное меню */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Мобильное меню выпадающее */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-white border rounded-lg shadow-lg">
              {mainMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMainMenuClick(item)}
                  className={`block w-full text-left px-4 py-3 border-b last:border-b-0 ${
                    activeSection === item.id && pathname === '/'
                      ? 'text-primary font-semibold bg-blue-300/10'
                      : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Кнопки авторизации для мобильной версии */}
              <div className="px-4 py-3 border-t">
                {!isAuthenticated ? (
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={handleLogin}
                      className="w-full text-left py-2 text-gray-600"
                    >
                      Войти
                    </button>
                    <button
                      onClick={handleRegister}
                      className="w-full bg-blue-300 text-white py-2 rounded-lg text-center"
                    >
                      Регистрация
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 py-2">
                      <div className="w-8 h-8 bg-blue-300 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {getUserInitials(user?.displayName || 'U')}
                      </div>
                      <span className="text-gray-700">{user?.displayName}</span>
                    </div>
                    <button
                      onClick={handleProfile}
                      className="w-full text-left py-2 text-gray-600"
                    >
                      Мой профиль
                    </button>
                    {user?.role === 'Admin' && (
                      <button
                        onClick={handleAdmin}
                        className="w-full text-left py-2 text-gray-600"
                      >
                        Админ-панель
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 text-red-600"
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Модальные окна */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
}
```


## components\layout\Layout.tsx

```tsx
'use client'; // Директива для клиентского компонента

import { usePathname } from "next/navigation"; // Замена useLocation из react-router
import Header from "./Header";
import { ReactNode } from "react"; // Импорт типа для children

interface LayoutProps {
  children: ReactNode; // Четкая типизация для children
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname(); // Получаем текущий путь в Next.js
  const isNewsDetail = pathname?.startsWith("/news/") || false;

  return (
    <div className="bg-light min-h-screen font-montserrat">
      <Header />
      <main
        className={`max-w-7xl mx-auto p-4 ${
          isNewsDetail ? "pt-0" : "pt-16 md:pt-24"
        } space-y-12`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
```


## components\layout\ProjectTimeline.tsx

```tsx
'use client'; // Директива для клиентского компонента

import { motion } from "framer-motion";
import { 
  FaLightbulb, 
  FaDraftingCompass, 
  FaCode, 
  FaBug, 
  FaRocket 
} from "react-icons/fa";
import { ReactNode, MouseEvent } from "react";

// Тип для события временной шкалы
interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  // Дополнительные поля при необходимости
}

// Тип для пропсов компонента
interface ProjectTimelineProps {
  events?: TimelineEvent[]; // Массив событий (опциональный)
  onClick?: (event: TimelineEvent) => void; // Обработчик клика (опциональный)
}

// Типизированный объект иконок
const phaseIcons: Record<string, ReactNode> = {
  "Идея": <FaLightbulb className="text-yellow-500" />,
  "Прототип": <FaDraftingCompass className="text-blue-500" />,
  "Разработка": <FaCode className="text-indigo-500" />,
  "Тестирование": <FaBug className="text-red-500" />,
  "Релиз": <FaRocket className="text-green-500" />,
};

const ProjectTimeline = ({ events = [], onClick }: ProjectTimelineProps) => {
  // Обработчик клика по событию
  const handleEventClick = (event: TimelineEvent, e: MouseEvent) => {
    e.stopPropagation();
    onClick?.(event);
  };

  return (
    <div className="overflow-x-auto py-6">
      <div className="flex space-x-8 min-w-max px-2">
        {events.map((event, index) => (
          <motion.div
            key={`${event.title}-${index}`} // Уникальный ключ
            className="bg-white rounded-lg border shadow-md px-4 py-3 w-56 cursor-pointer hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
            onClick={(e) => handleEventClick(event, e)}
            layout // Оптимизация анимаций при изменениях
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="text-2xl">
                {phaseIcons[event.title] || <span>📍</span>}
              </div>
              <div className="font-semibold">{event.title}</div>
            </div>
            <div className="text-xs text-gray-500 mb-1">{event.date}</div>
            <div className="text-sm text-gray-700">{event.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;
```


## components\sections\Awards.tsx

```tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Award {
  id: number;
  title: string;
  year: number;
  description: string;
  image: string;
  place: number;
  participants: string[];
  tags: string[];
}

export default function Awards() {
  const awards: Award[] = [
    {
      id: 1,
      title: "Цифровой прорыв 2024",
      year: 2024,
      description: "Первое место в номинации 'Лучшее AI-решение' за разработку системы компьютерного зрения",
      image: "/awards/digital-breakthrough.jpg",
      place: 1,
      participants: ["Анна Петрова", "Максим Иванов", "Елена Сидорова"],
      tags: ["Хакатон", "AI", "Компьютерное зрение"]
    },
    {
      id: 2,
      title: "GameDev Championship 2023",
      year: 2023,
      description: "Гран-при за инновационную игровую механику в проекте 'Neon Dreams'",
      image: "/awards/gamedev-championship.jpg",
      place: 1,
      participants: ["Дмитрий Козлов", "Ольга Новикова"],
      tags: ["GameDev", "Инновации", "Геймдизайн"]
    },
    {
      id: 3,
      title: "IT-Planet 2023",
      year: 2023,
      description: "Второе место в категории 'Мобильная разработка'",
      image: "/awards/it-planet.jpg",
      place: 2,
      participants: ["Иван Смирнов", "Мария Кузнецова"],
      tags: ["Мобильная разработка", "Кросс-платформенность"]
    }
  ];

  const stats = [
    { number: "15+", label: "Побед в конкурсах" },
    { number: "50+", label: "Участников" },
    { number: "3", label: "Года успеха" },
    { number: "1M+", label: "Призовые фонды" }
  ];

  return (
    <div id="awards" className="container mx-auto px-4 py-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Наши достижения</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы гордимся победами наших студентов и проектов на региональных и всероссийских соревнованиях.
        </p>
      </motion.div>

      {/* Статистика */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Награды */}
      <div className="space-y-8">
        {awards.map((award, index) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-300 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {award.year}
                </div>
              </div>
              
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold">{award.title}</h3>
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-300 text-white rounded-full text-lg font-bold">
                    {award.place}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{award.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Участники:</h4>
                  <div className="flex flex-wrap gap-2">
                    {award.participants.map((participant, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {award.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-blue-300/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Призыв к действию */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-12"
      >
        <h3 className="text-2xl font-semibold mb-4">Хотите присоединиться к нашим победам?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Присоединяйтесь к нашей команде и станьте частью успешных проектов.
        </p>
        <button className="bg-blue-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors mr-4">
          Участвовать в конкурсах
        </button>
        <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-300/10 transition-colors">
          Предложить проект
        </button>
      </motion.div>
    </div>
  );
}
```


## components\sections\Blog.tsx

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

// Определяем типы для анимаций
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    }
  }
};

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Как выиграть хакатон: советы от победителей",
      excerpt: "Практические рекомендации от наших студентов, победивших на всероссийском хакатоне Digital Breakthrough.",
      content: "Полный текст статьи о том, как правильно готовиться к хакатонам...",
      date: "15 марта 2024",
      author: "Анна Петрова",
      category: "Соревнования",
      image: "/blog/hackathon.jpg",
      readTime: "5 мин",
      tags: ["Хакатон", "Советы", "Победа"]
    },
    {
      id: 2,
      title: "Тенденции в разработке игр 2024",
      excerpt: "Обзор ключевых трендов в игровой индустрии и технологиях разработки.",
      content: "В этом году мы наблюдаем несколько интересных тенденций...",
      date: "10 марта 2024",
      author: "Максим Иванов",
      category: "Аналитика",
      image: "/blog/trends.jpg",
      readTime: "7 мин",
      tags: ["Тренды", "GameDev", "Технологии"]
    }
  ];

    const filteredItems = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(item => item.category === selectedCategory);

  const categories = [
    {id: 'all', label: "Все"}, 
    {id: 'Соревнования', label: "Соревнования"}, 
    {id: 'Аналитика', label: "Аналитика"}, 
    {id: 'Проекты', label: "Проекты"}, 
    {id: 'Обучение', label: "Обучение"}
    ];

  return (
    <div id="blog" className="container mx-auto px-4 py-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Блог</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Последние новости, статьи и советы от нашей команды и студентов.
        </p>
      </motion.div>

      {/* Категории */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-300 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Сетка постов */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
        <AnimatePresence mode="popLayout">
        {filteredItems.map((post, index) => (
          <motion.article
            key={post.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group flex flex-col" // Добавлен flex flex-col
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-blue-300 text-white px-3 py-1 rounded-full text-sm">
                {post.category}
              </div>
            </div>
      
            <div className="p-6 flex flex-col flex-1"> {/* Добавлен flex flex-col flex-1 */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
        
              <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
        
              <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p> {/* Добавлен flex-1 */}
        
              <div className="flex items-center justify-between mt-auto"> {/* Добавлен mt-auto */}
                <span className="text-sm text-gray-500">Автор: {post.author}</span>
                <motion.button 
                  className="text-primary font-semibold text-sm cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                  whileHover={{ x: 5 }}
                >
                  Читать →
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
        </AnimatePresence>
      </motion.div>

      {/* Кнопка "Все статьи" */}
      <div className="text-center mt-12">
        <button className="bg-blue-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors">
          Все статьи
        </button>
      </div>

      {/* Модальное окно поста */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-4 bg-blue-300 text-white px-3 py-1 rounded-full text-sm">
                  {selectedPost.category}
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{selectedPost.date}</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-600">Автор: {selectedPost.author}</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {selectedPost.excerpt}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedPost.content}
                  </p>
                </div>
                
                <div className="border-t mt-8 pt-6">
                  <h4 className="text-lg font-semibold mb-4">Понравилась статья?</h4>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                      <span>👍</span> Полезно
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                      <span>💬</span> Комментировать
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                      <span>↗</span> Поделиться
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```


## components\sections\Contact.tsx

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTelegram, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactMethod: 'email'
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: FaMapMarkerAlt,
      label: 'Адрес',
      value: 'ул. Кремлевская 35, каб. 1407',
      description: 'Казанский федеральный университет'
    },
    {
      icon: FaPhone,
      label: 'Телефон',
      value: '+7 (XXX) XXX-XX-XX',
      description: 'Пн-Пт с 9:00 до 18:00'
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'info@itis-kirvi.ru',
      description: 'Общие вопросы'
    },
    {
      icon: FaTelegram,
      label: 'Telegram',
      value: '@itis_kirvi',
      description: 'Быстрая связь'
    }
  ];

  return (
    <div id="contact" className="container mx-auto px-4 py-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Связаться</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Хотите предложить проект, сотрудничество или задать вопрос? Напишите нам.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Контактная информация */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold mb-6">Контактная информация</h3>
          
          <div className="grid gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-300/10 rounded-lg flex items-center justify-center">
                  <method.icon className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{method.label}</h4>
                  <p className="text-gray-700">{method.value}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Карта */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Карта будет здесь</span>
            </div>
            <div className="p-4">
              <h4 className="font-semibold mb-2">Как добраться</h4>
              <p className="text-sm text-gray-600">
                Главное здание КФУ, 4 этаж, кабинет 1407. 
                Ближайшая остановка - "Университет".
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Форма обратной связи */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-semibold mb-6">Напишите нам</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-2">
                Предпочтительный способ связи
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="email">Email</option>
                <option value="telegram">Telegram</option>
                <option value="phone">Телефон</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Тема сообщения
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="О чем вы хотите поговорить?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Сообщение *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Расскажите подробнее о вашем вопросе или предложении..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-300 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </button>
            
            <p className="text-sm text-gray-500 text-center">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </form>
        </motion.div>
      </div>

      {/* Социальные сети */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-16"
      >
        <h3 className="text-2xl font-semibold mb-6">Мы в социальных сетях</h3>
        <div className="flex justify-center gap-6">
          {['VK', 'Telegram', 'YouTube', 'Habr'].map((social, index) => (
            <motion.a
              key={social}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-12 max-w-20 h-12 bg-blue-300 text-white rounded-full flex items-center justify-center hover:bg-blue-300/90 transition-colors"
            >
              {social}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
```


## components\sections\FAQ.tsx

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// Определяем типы для анимаций
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    }
  }
};

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Как попасть в проекты кафедры?",
      answer: "Достаточно быть студентом КФУ и проявить инициативу — мы открыты к новым участникам с 1 курса. Посетите наше собрание, ознакомьтесь с текущими проектами и выберите подходящий для вас.",
      category: "поступление"
    },
    {
      id: 2,
      question: "Можно ли пройти практику на кафедре?",
      answer: "Да, мы организуем учебную и производственную практику в рамках командной проектной работы. Студенты работают над реальными проектами под руководством опытных наставников.",
      category: "обучение"
    },
    {
      id: 3,
      question: "Что нужно, чтобы поступить?",
      answer: "Подавайте документы в КФУ по направлению 'Информационные системы и технологии'. Подробности о вступительных испытаниях и сроках подачи документов — на сайте приёмной комиссии КФУ.",
      category: "поступление"
    },
    {
      id: 4,
      question: "Какие технологии изучаются?",
      answer: "В зависимости от направления: Python, C#, JavaScript, Unity, Unreal Engine, Docker, React, Git, SQL, ML, компьютерное зрение, VR/AR разработка и другие современные технологии.",
      category: "обучение"
    },
    {
      id: 5,
      question: "Есть ли бюджетные места?",
      answer: "Да, на направлении 'Информационные системы и технологии' предусмотрены бюджетные места. Количество мест зависит от контрольных цифр приема текущего года.",
      category: "поступление"
    },
    {
      id: 6,
      question: "Какие перспективы трудоустройства?",
      answer: "Наши выпускники работают в ведущих IT-компаниях России и мира: Яндекс, VK, 1C, GameDev студиях и стартапах. Средняя зарплата выпускников составляет 120K+ рублей.",
      category: "карьера"
    }
  ];

  const categories = [
    { id: 'all', label: 'Все вопросы' },
    { id: 'поступление', label: 'Поступление' },
    { id: 'обучение', label: 'Обучение' },
    { id: 'карьера', label: 'Карьера' }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const filteredItems = selectedCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <div id="faq" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Ответы на самые популярные вопросы о кафедре, обучении и перспективах.
        </p>
      </motion.div>

      {/* Категории */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-300 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* FAQ список */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        className="max-w-4xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(item.id)}
              >
                <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                <motion.span
                  animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                  className="flex-shrink-0 text-primary text-xl"
                >
                  ↓
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 border-t">
                      <p className="text-gray-700 leading-relaxed pt-4">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Дополнительная помощь */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-16"
      >
        <div className="bg-blue-300 text-white rounded-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Не нашли ответ на свой вопрос?</h3>
          <p className="mb-6 opacity-90">
            Свяжитесь с нами напрямую, и мы с радостью ответим на все ваши вопросы.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Написать в Telegram
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Отправить email
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```


## components\sections\Hero.tsx

```tsx
export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Где рождаются будущие лидеры IT
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Практико-ориентированная кафедра, готовящая востребованных специалистов 
          через реальные проекты и сильнейшую фундаментальную подготовку.
        </p>
        <button className="bg-blue-300 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-300/90 transition-colors">
          Начать обучение
        </button>
      </div>
    </div>
  );
}
```


## components\sections\Partners.tsx

```tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  type: string;
  projects: number;
}

export default function Partners() {
  const partners: Partner[] = [
    {
      id: 1,
      name: "Яндекс",
      logo: "/partners/yandex.png",
      description: "Крупнейшая российская IT-компания, лидер в области поисковых технологий и интернет-сервисов",
      website: "https://yandex.ru",
      type: "Технологический партнер",
      projects: 8
    },
    {
      id: 2,
      name: "VK",
      logo: "/partners/vk.png",
      description: "Ведущая технологическая компания, развивающая экосистему сервисов",
      website: "https://vk.com",
      type: "Образовательный партнер",
      projects: 5
    },
    {
      id: 3,
      name: "1C",
      logo: "/partners/1c.png",
      description: "Ведущий разработчик программного обеспечения для бизнеса",
      website: "https://1c.ru",
      type: "Технологический партнер",
      projects: 3
    }
  ];

  return (
    <div id="partners" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Партнёры</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          ИТИС КИРВИ сотрудничает с ведущими компаниями и научными организациями, 
          предоставляя студентам возможности для практики, стажировок и участия в индустриальных проектах.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-shadow"
          >
            <div className="relative h-20 mb-6">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
            <span className="inline-block bg-blue-300/10 text-primary px-3 py-1 rounded-full text-sm mb-4">
              {partner.type}
            </span>
            
            <p className="text-gray-600 mb-4 line-clamp-3">{partner.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Совместных проектов:</span>
              <span className="font-semibold">{partner.projects}</span>
            </div>
            
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              Посетить сайт
              <span>↗</span>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Статистика партнерств */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-16 bg-blue-300 text-white rounded-xl p-8"
      >
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-primary/80">Компаний-партнеров</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-primary/80">Совместных проектов</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">100+</div>
            <div className="text-primary/80">Студентов на стажировках</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">3+</div>
            <div className="text-primary/80">Года сотрудничества</div>
          </div>
        </div>
      </motion.div>

      {/* Призыв к действию */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-12"
      >
        <h3 className="text-2xl font-semibold mb-4">Хотите стать партнером?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Предложите совместный проект, стажировки для студентов или образовательные инициативы.
        </p>
        <button className="bg-blue-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors">
          Стать партнером
        </button>
      </motion.div>
    </div>
  );
}
```


## components\sections\Projects.tsx

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Определяем типы для анимаций
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    }
  }
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "AI Vision System",
      year: 2024,
      description: "Система компьютерного зрения для анализа медицинских изображений",
      tags: ["Python", "ML", "OpenCV"],
      category: "ai",
      featured: true
    },
    {
      id: 2,
      title: "Neon Dreams Game",
      year: 2024,
      description: "Иммерсивная игра в стиле киберпанк с продвинутой графикой",
      tags: ["Unity", "C#", "3D Graphics"],
      category: "gamedev",
      featured: true
    },
    {
      id: 3,
      title: "VR Learning Platform",
      year: 2023,
      description: "Образовательная платформа с использованием виртуальной реальности",
      tags: ["VR", "Education", "Unity"],
      category: "vr",
      featured: false
    },
  ];

  const filters = [
    { id: 'all', label: 'Все проекты' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'gamedev', label: 'Game Development' },
    { id: 'vr', label: 'VR/AR' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div id="projects" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Проекты</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Наша кафедра — не про теорию ради теории. Каждый проект здесь — это шаг в карьеру, 
          возможность применить знания на практике и создать что-то значимое.
        </p>
      </motion.div>

      {/* Фильтры с анимацией */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8"
        layout
      >
        {filters.map((filterItem) => (
          <motion.button
            key={filterItem.id}
            onClick={() => setFilter(filterItem.id)}
            className={`px-6 py-3 rounded-full transition-colors ${
              filter === filterItem.id
                ? 'bg-blue-300 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            {filterItem.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Сетка проектов с анимацией фильтрации */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className={`bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow ${
                project.featured ? 'ring-2 ring-primary' : ''
              }`}
              //onClick={() => setSelectedProject(project.id)}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <motion.span 
                      className="bg-blue-300 text-white px-2 py-1 rounded text-xs"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Featured
                    </motion.span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <motion.span 
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{project.year}</span>
                  <motion.button 
                    className="text-primary font-semibold text-sm cursor-pointer"
                    onClick={() => setSelectedProject(project.id)}
                    whileHover={{ x: 5 }}
                  >
                    Подробнее →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Сообщение если нет проектов */}
      <AnimatePresence>
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-semibold mb-4">Проекты не найдены</h3>
            <p className="text-gray-600 mb-6">
              Попробуйте выбрать другую категорию или сбросить фильтры
            </p>
            <motion.button
              onClick={() => setFilter('all')}
              className="bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Показать все проекты
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Индикатор количества найденных проектов */}
      <motion.div 
        className="text-center mt-8 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={filteredProjects.length}
      >
        Найдено проектов: {filteredProjects.length}
      </motion.div>
    </div>
  );
}
```


## components\sections\Team.tsx

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { div } from 'framer-motion/client';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  photo: string;
  tags: string[];
  bio: string;
  achievements: string[];
  contact: string;
}

// Определяем типы для анимаций
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    }
  }
};

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [filter, setFilter] = useState('all');

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Кугуракова Влада Владимировна",
      position: "Руководитель кафедры",
      photo: "/team/kugurakova.jpg",
      tags: ["Руководство", "Исследования", "VR/AR"],
      bio: "Опыт работы в IT-индустрии более 10 лет. Специалист в области разработки видеоигр и иммерсивных технологий.",
      achievements: [
        "Основатель кафедры ИРВИ",
        "Автор 20+ научных публикаций",
        "Руководитель 10+ успешных проектов"
      ],
      contact: "vlada.kugurakova@gmail.com"
    },
    {
      id: 2,
      name: "Петров Алексей",
      position: "Старший преподаватель",
      photo: "/team/petrov.jpg",
      tags: ["Unity", "C#", "Game Design"],
      bio: "Специалист в области игрового дизайна и разработки на Unity.",
      achievements: [
        "Ведущий разработчик 5 коммерческих проектов",
        "Эксперт в области игровых механик"
      ],
      contact: "a.petrov@example.com"
    }
  ];

  const filters = [
    {id: 'all', label: "Все"}, 
    {id: 'Руководство', label: "Руководство"}, 
    {id: 'Преподаватели', label: "Преподаватели"}, 
    {id: 'Исследователи', label: "Исследователи"}
    ];

    const filteredItems = filter === 'all' 
    ? teamMembers 
    : teamMembers.filter(item => item.tags.includes(filter));

  return (
    <div id="team" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Команда</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          За каждым проектом — преподаватели, наставники и исследователи, 
          вдохновляющие и направляющие студентов.
        </p>
      </motion.div>

      {/* Фильтры */}
      <motion.div         
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-4 mb-8">
        {filters.map((filterItem) => (
          <button
            key={filterItem.id}
            onClick={() => setFilter(filterItem.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === filterItem.id
                ? 'bg-blue-300 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-300'
            }`}
          >
            {filterItem.label}
          </button>
        ))}
      </motion.div>

      {/* Сетка команды */}
  <motion.div         
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    layout
    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >

    <AnimatePresence mode="popLayout">
    {filteredItems.map((member, index) => (
      <motion.div
        key={member.id}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className="bg-white rounded-xl shadow-lg overflow-hidden group flex flex-col" // Добавлен flex flex-col
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute bottom-4 left-4 z-20 text-white">
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-sm opacity-90">{member.position}</p>
          </div>
        </div>
      
        <div className="p-6 flex flex-col flex-1"> {/* Добавлен flex flex-col и flex-1 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {member.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-blue-300/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-600 line-clamp-3 flex-1 mb-4">{member.bio}</p> {/* Добавлен flex-1 и mb-4 */}
        
          <div className="mt-auto flex items-center justify-between"> {/* Добавлен mt-auto */}
            <span className="text-sm text-gray-500">
              {member.achievements.length} достижений
            </span>
            <motion.button 
              className="text-primary font-semibold text-sm cursor-pointer"
              onClick={() => setSelectedMember(member)}
              whileHover={{ x: 5 }}
            >
              Подробнее →
            </motion.button>
          </div>
        </div>
      </motion.div>
    ))}
    </AnimatePresence>
    </motion.div>

      {/* Модальное окно сотрудника */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6 md:p-8">
                <h3 className="text-3xl font-bold mb-2">{selectedMember.name}</h3>
                <p className="text-xl text-primary mb-6">{selectedMember.position}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedMember.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-blue-300/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Биография</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedMember.bio}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Достижения</h4>
                  <ul className="space-y-2">
                    {selectedMember.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold mb-2">Контакты</h4>
                  <p className="text-gray-700">{selectedMember.contact}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```


## components\ui\BackButton.tsx

```tsx
// src/components/ui/BackButton.tsx
import Link from "next/link";

type BackButtonProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const BackButton = ({ href, className = "", children }: BackButtonProps) => (
  <Link 
    href={href} 
    className={`inline-flex items-center px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors ${className}`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
    {children}
  </Link>
);

export default BackButton;
```


## components\ui\BackToTopButton.tsx

```tsx
'use client'; // Важно: указываем что это клиентский компонент

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isBrowser, setIsBrowser] = useState<boolean>(false); // Для безопасного доступа к window

  useEffect(() => {
    // Устанавливаем флаг что компонент выполняется в браузере
    setIsBrowser(true);
    
    // Проверяем доступность window перед использованием
    if (typeof window === "undefined") return;

    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    
    // Инициализируем видимость при монтировании
    toggleVisibility();
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
    // Дополнительная проверка для Next.js
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Не рендерим компонент при SSR
  if (!isBrowser) return null;

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-300 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition"
      aria-label="Вернуться к началу"
    >
      <FaArrowUp className="text-base" />
      <span className="hidden sm:inline text-sm font-medium">
        Вернуться к началу
      </span>
    </button>
  ) : null;
};

export default BackToTopButton;
```


## components\ui\ImageSlider.tsx

```tsx
'use client'; // Директива для клиентского компонента

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Типизация пропсов компонента
interface ImageSliderProps {
  images: string[]; // Массив строк с URL изображений
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState<number>(0);

  const prev = (): void => {
    setCurrent((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const next = (): void => {
    setCurrent((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Проверка на пустой массив изображений
  if (!images || images.length === 0) {
    return <div className="text-center py-12 text-gray-500">Нет изображений для отображения</div>;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded shadow">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[current]}
            src={images[current]}
            alt={`Изображение ${current + 1}`}
            className="w-full object-cover"
            initial={{ opacity: 0.2, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
      </div>

      {/* Навигация */}
      <div className="flex items-center justify-between mt-4">
        <button 
          onClick={prev}
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Предыдущее изображение"
        >
          <FaChevronLeft size={20} />
        </button>
        
        <span className="text-sm text-gray-700">
          {current + 1} из {images.length}
        </span>
        
        <button 
          onClick={next}
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Следующее изображение"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
```


## components\ui\Label.tsx

```tsx
import React from 'react';

// Определение типа для элемента словаря
interface DictItem {
  label?: string;  // Опциональное поле label
}

// Определение типов для пропсов компонента
interface LabelProps {
  dict: Record<string, DictItem | undefined>;  // Словарь с ключами-строками
  value: string | number;  // Значение может быть строкой или числом
}

const Label: React.FC<LabelProps> = ({ dict, value }) => {
  // Преобразуем значение в строку для использования в качестве ключа
  const key = value.toString();
  
  // Получаем элемент из словаря
  const item = dict[key];
  
  // Возвращаем label из словаря или исходное значение
  return <>{item?.label || value}</>;
};

export default Label;
```


## components\ui\PageTitle.tsx

```tsx
'use client'; // Директива для клиентского компонента (требуется для Framer Motion)

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTitleProps {
  children: ReactNode; // Типизация для содержимого заголовка
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <motion.h1
      className="text-4xl md:text-5xl italic font-semibold text-gray-800 mb-6 uppercase tracking-wider"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      role="heading" // Улучшение семантики
      aria-level={1} // Указание уровня заголовка
    >
      {children}
    </motion.h1>
  );
};

export default PageTitle;
```


## components\ui\ScrollToTop.tsx

```tsx
'use client'; // Директива для клиентского компонента

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Проверка доступности window (для SSR)
    if (typeof window !== "undefined") {
      // Прокручиваем в начало страницы при изменении пути
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Добавлено плавное скроллирование
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
```


## components\ui\SectionWrapper.tsx

```tsx
'use client'; // Директива для клиентского компонента (требуется для Framer Motion)

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  noAnimation?: boolean; // Опциональный флаг отключения анимации
  className?: string; // Опциональный класс для дополнительного стиля
}

const SectionWrapper = ({ 
  children, 
  noAnimation = false, 
  className = "" 
}: SectionWrapperProps) => {
  // Базовый класс с дополнительными классами
  const baseClass = `space-y-10 ${className}`;

  // Вариант без анимации
  if (noAnimation) {
    return <section className={baseClass}>{children}</section>;
  }

  // Вариант с анимацией
  return (
    <motion.section
      className={baseClass}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }} // Изменено на whileInView
      viewport={{ once: true, margin: "-20% 0px" }} // Триггер анимации при появлении в области видимости
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
```


## components\ClientWrapper.tsx

```tsx
'use client'

import { usePathname } from 'next/navigation'

interface ClientWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function ClientWrapper({
  children,
  className,
}: ClientWrapperProps) {
  const pathname = usePathname();
  return (
    <div key={pathname} className={className}>
      {children}
    </div>
  );
}
```


## components\header.module.css

```css
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 80px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1f1f1f;
    padding: 16px 0;
    z-index: 1000;
}

.brand {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
}

.spacer {
    flex: 1;
}

.avatarWrapper {
    position: relative;
    margin: 0;
}

.avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #0070f3;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
}

.menu {
    position: absolute;
    left: 100%;
    top: 50%;
    margin-bottom: 8px;
    transform: translateY(10%);
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    min-width: 140px;
}

.menuLink,
.menuLogout {
    width: 100%;
    padding: 10px 16px;
    text-align: left;
    text-decoration: none;
    color: #333;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.95rem;
    transition: background-color 0.2s;
}

.menuLink:hover,
.menuLogout:hover {
    background-color: #f5f5f5;
}

.menuLogout {
    margin-top: 4px;
    color: #ff4d4f;
}

.nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
}

.navLink {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-decoration: none;
    color: #aaa;
    font-size: 0.9rem;
    transition: color 0.2s;
}

.navLink:hover {
    color: #fff;
}
```


## components\header.tsx

```tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from './header.module.css';

function parseJwt<T extends Record<string, unknown>>(token: string): T {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload)) as T;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const avatarWrapperRef = useRef<HTMLDivElement>(null);

  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setCheckedAuth(true);
  }, [pathname]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setUserRole(null);

    const { id: userId } = parseJwt<{ id: string }>(token)
    axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
      { id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => {
      const { profile } = res.data as { profile: { role: string } };
      setUserRole(profile.role);
    })
    .catch(() => {
      setUserRole(null);
    });
  }, [isLoggedIn, pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        avatarWrapperRef.current &&
        !avatarWrapperRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  if (!checkedAuth) return null;

  return (
    <header className={styles.header}>
      <div className={styles.brand} onClick={() => router.push('/')}>
        GameAcademy
      </div>

      {isLoggedIn ? (
        <div ref={avatarWrapperRef} className={styles.avatarWrapper}>
        <div
            className={styles.avatar}
            onClick={() => setMenuOpen(v => !v)}
        >
            UA
        </div>
        {menuOpen && (
            <nav className={styles.menu}>
            <Link
                href="/profile"
                className={styles.menuLink}
                onClick={() => setMenuOpen(false)}
            >
                Профиль
            </Link>
            <Link
                href="/profile/games"
                //href="/games"
                className={styles.menuLink}
                onClick={() => setMenuOpen(false)}
            >
                Библиотека проектов
            </Link>
            {userRole === 'Admin' && (
                <>
                <Link
                    href="/admin/users"
                    className={styles.menuLink}
                    onClick={() => setMenuOpen(false)}
                >
                    Админ-панель пользователей
                </Link>
                <Link
                    href="/admin/games"
                    className={styles.menuLink}
                    onClick={() => setMenuOpen(false)}
                >
                    Админ-панель игр
                </Link>
                </>
            )}
            <button
                className={styles.menuLogout}
                onClick={handleLogout}
            >
                Выйти
            </button>
            </nav>
        )}
        </div>
    ) : (
        <nav className={styles.nav}>
        <Link href="/auth/login" className={styles.navLink}>Войти</Link>
        <Link href="/auth/register" className={styles.navLink}>Регистрация</Link>
        </nav>
    )}

    <div className={styles.spacer} />
    </header>
  );
}
```


## components\UnityCleanup.tsx

```tsx
'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function UnityCleanup() {
  const pathname = usePathname()
  useEffect(() => {
    if (!pathname.includes('/play')) {
      document
        .querySelectorAll('script[src*="UnityLoader.js"]')
        .forEach(s => s.remove())
    }
  }, [pathname])
  return null
}
```


## components\useAuthExp.ts

```ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuthExpiration() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const { exp } = parseJwt<{ exp: number }>(token);
        if (exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          router.push('/auth/login');
        }
      } catch {
        localStorage.removeItem('token');
        router.push('/auth/login');
      }
    };

    checkToken();

    const interval = setInterval(checkToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);
}

function parseJwt<T extends Record<string, unknown>>(token: string): T {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload)) as T;
}
```


## contexts\AuthContext.tsx

```tsx
// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Проверяем наличие токена при загрузке
    const token = localStorage.getItem('token');
    if (token) {
      // Декодируем токен для получения информации о пользователе
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userInfo: User = {
          id: payload.id,
          email: payload.email,
          displayName: payload.displayName || payload.email,
          role: payload.role || 'Student'
        };
        setUser(userInfo);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка авторизации');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);

      // Декодируем токен для получения информации о пользователе
      const payload = JSON.parse(atob(data.access_token.split('.')[1]));
      const userInfo: User = {
        id: payload.id,
        email: payload.email,
        displayName: payload.displayName || payload.email,
        role: payload.role || 'Student'
      };
      
      setUser(userInfo);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_API}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, displayName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка регистрации');
      }

      const data = await response.json();
      
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        
        const payload = JSON.parse(atob(data.access_token.split('.')[1]));
        const userInfo: User = {
          id: payload.id,
          email: payload.email,
          displayName: payload.displayName || payload.email,
          role: payload.role || 'Student'
        };
        
        setUser(userInfo);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```


## data\categories.ts

```ts
const categoryData = {
    all: { label: "Все" },
    alumni: { label: "Выпускники" },
    announcements: { label: "Объявления" },
    students: { label: "Студенты" },
    faculty: { label: "Факультет" },
  };
  
  export default categoryData;
```


## data\news.ts

```ts
import {NewsItem} from "@/types/news"

const newsData: NewsItem[] = [
  {
    slug: "vr-gamedev-methodology",
    title: "Методология VR/AR в геймдеве",
    category: "Выпускники",
    image: "https://verpex.com/assets/uploads/images/blog/Is-Selling-3d-Models-Profitable.webp?v=1713956983", 
    date: "2025-04-01",
    markdown: "/content/vr-gamedev-methodology.md",
  },
  {
    slug: "uiux-hackathon-winners",
    title: "Победители хакатона UI/UX",
    category: "Студенты",
    image: "https://verpex.com/assets/uploads/images/blog/Is-Selling-3d-Models-Profitable.webp?v=1713956983", 
    date: "2024-12-10",
    markdown: "/content/uiux-hackathon-winners.md",
  },
  {
    slug: "gazizov-3d-modeling-in-games",
    title: "Применение 3D-моделирования в разработке игр",
    category: "Факультет",
    image: "https://verpex.com/assets/uploads/images/blog/Is-Selling-3d-Models-Profitable.webp?v=1713956983", 
    date: "2023-09-20",
    markdown: "/content/gazizov-3d-modeling-in-games.md",
  },
  {
    slug: "kugurakova-game-education-strategy",
    title: "Образовательные стратегии в сфере разработки игр",
    category: "Факультет",
    image: "https://www.tinkercoders.com/wp-content/uploads/2022/06/game-developme.jpeg", 
    date: "2023-05-10",
    markdown: "/content/kugurakova-game-education-strategy.md",
  },
  {
    slug: "kostuk-vr-crane-training",
    title: "Реализация динамических уровней VR для обучения работе с башенным краном",
    category: "Факультет",
    image: "https://www.agilitypr.com/wp-content/uploads/2024/10/gamification-1080x497.jpg", 
    date: "2023-11-15",
    markdown: "/content/kostuk-vr-crane-training.md",
  },
];

export default newsData;
```


## data\portfolio.ts

```ts
import { PortfolioItem } from "@/types/portfolio";


const portfolioData: PortfolioItem[] = [
  {
    slug: "vr-medical-simulator",
    title: "VR-симулятор для медицины",
    category: "VR/AR",
    image: "../assets/portfolio/AR-VR-in-Healthcare-1.jpg",
    description: "Интерактивный VR-симулятор для обучения медицинским манипуляциям.",
    releaseDate: "20-04-2025",
    download: "https://example.com/vr-simulator-download",
    phases: [
      {
        title: "Идея",
        date: "10-01-2025",
        description: "Определены цели и формат проекта. Подготовлена концепция VR-тренажера для медицинских задач.",
        skills: [
          { name: "Креативность", level: 80 },
          { name: "Документирование", level: 60 }
        ]
      },
      {
        title: "Прототип",
        date: "05-02-2025",
        description: "Создан базовый VR-интерфейс и сценарий одной обучающей ситуации.",
        skills: [
          { name: "Unity", level: 70 },
          { name: "UI/UX", level: 50 }
        ]
      },
      {
        title: "Разработка",
        date: "01-03-2025",
        description: "Добавлены анимации, модели и интерактивные элементы. Внедрена система оценки действий пользователя.",
        skills: [
          { name: "Программирование", level: 75 },
          { name: "Анализ", level: 60 }
        ]
      },
      {
        title: "Тестирование",
        date: "01-04-2025",
        description: "Проведено тестирование с реальными пользователями. Исправлены ошибки UX."
      },
      {
        title: "Релиз",
        date: "20-04-2025",
        description: "Проект опубликован на платформе кафедры. Доступен для использования студентами."
      }
    ],      
    goals: [
      "Отработка навыков оказания первой помощи",
      "Тренировка выполнения клинических алгоритмов"
    ],
    features: [
      "Поддержка Oculus Quest 2",
      "Реалистичная физика взаимодействия с инструментами",
      "Аналитика прогресса пользователя"
    ],
    screenshots: [
      "https://medcitynews.com/wp-content/uploads/sites/7/2019/09/GettyImages-1015934084.jpg",
      "https://www.quytech.com/blog/wp-content/uploads/2019/07/vr-healthcareapp.jpg",
      "https://nolijconsulting.com/wp-content/uploads/2022/03/nolij-post-imge.png",
    ],
    hallOfFame: true,
    authors: [
      { name: "Влада Кугуракова", slug: "vlada-kugurakova", role: "VR Developer" },
      { name: "Даниил Костюк", slug: "kostuk", role: "3D Artist" },
    ],
    year: 2025
  },

  {
    slug: "ar-education-app",
    title: "AR-приложение для обучения",
    category: "VR/AR",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*S8aT0HfsYQ5XkWC48wV4NA.jpeg",
    releaseDate: "20-04-2025",
    download: "https://example.com/vr-simulator-download",
    phases: [
      {
        title: "Идея",
        date: "10-01-2025",
        description: "Определены цели и формат проекта. Подготовена концепция VR-тренажера для медицинских задач.",
        skills: [
          { name: "Креативность", level: 80 },
          { name: "Документирование", level: 60 }
        ]
      },
      {
        title: "Прототип",
        date: "05-02-2025",
        description: "Создан базовый VR-интерфейс и сценарий одной обучающей ситуации.",
        skills: [
          { name: "Unity", level: 70 },
          { name: "UI/UX", level: 50 }
        ]
      },
      {
        title: "Разработка",
        date: "01-03-2025",
        description: "Добавлены анимации, модели и интерактивные элементы. Внедрена система оценки действий пользователя.",
        skills: [
          { name: "Программирование", level: 75 },
          { name: "Анализ", level: 60 }
        ]
      },
      {
        title: "Тестирование",
        date: "01-04-2025",
        description: "Проведено тестирование с реальными пользователями. Исправлены ошибки UX."
      },
      {
        title: "Релиз",
        date: "20-04-2025",
        description: "Проект опубликован на платформе кафедры. Доступен для использования студентами."
      }
    ],      
    goals: [
      "Отработка навыков оказания первой помощи",
      "Тренировка выполнения клинических алгоритмов"
    ],
    features: [
      "Поддержка Oculus Quest 2",
      "Реалистичная физика взаимодействия с инструментами",
      "Аналитика прогресса пользователя"
    ],
    screenshots: [
      "https://capsulesight.com/108-BenefitsAREducation-feature.webp",
      "https://www.fastbrain.it/wp-content/uploads/2023/10/realta-aumentata-apprendimento.png",
      "https://quantumera.com/wp-content/uploads/2019/06/01-QE-Blog-2019.jpg",
    ],
    hallOfFame: true,
    authors: [
      { name: "Рим Газизов", slug: "gazizov", role: "AR Developer" },
      { name: "Даниил Костюк", slug: "kostuk", role: "3D Artist" },
      { name: "Влада Кугуракова", slug: "vlada-kugurakova", role: "VR Developer" },
    ],
    year: 2023
  },
    
  {
    slug: "3d-character-design",
    title: "3D-дизайн персонажа",
    category: "3D",
    image: "https://images-rsg.storage.googleapis.com/wp-content/uploads/2023/07/stylized-3d-characters-cowboy-office-construction-worker.jpg",
    hallOfFame: true,
    year: 2024
  },
  
  {
    slug: "mobile-puzzle-game",
    title: "Мобильная головоломка",
    category: "Игры",
    image: "https://placehold.co/600x400?text=Puzzle+Game",
    year: 2022
  }
];

export default portfolioData;
```


## data\roles.ts

```ts


import { RolesDict } from "@/types/roles";

const roles: RolesDict = {
  head: { label: "Руководитель кафедры" },
  senior: { label: "Старший преподаватель" },
  assistant: { label: "Ассистент" },
};

export default roles;
```


## data\staff.ts

```ts

import { StaffMember } from "@/types/staff";


const staffList: StaffMember[] = [
  {
    slug: "vlada-kugurakova",
    name: "Влада Кугуракова",
    position: "Руководитель кафедры",
    title: "head", 
    rarity: "LEGENDARY",
    photo: "https://kpfu.ru/docs/F13042469430/img854158901.jpg", 
    email: "vlada.kugurakova@example.com",
    telegram: "https://t.me/vlada_kugurakova",
    bio: "Доктор технических наук, профессор. Эксперт в области игровых технологий и VR/AR.",
    researchInterests: ["VR/AR", "Игровые движки", "Искусственный интеллект"],
    stats: [
      { label: "Unity", value: 100 },
      { label: "Game Design", value: 100 },
      { label: "Teaching", value: 100 }
    ],
    skills: [
      {
        name: "Unity",
        level: 999,
        subskills: [
          { name: "Physics" },
          { name: "UI Toolkit" }
        ],
        description: "Эксперт в разработке на Unity"
      },
      {
        name: "Game Design",
        level: 999,
        subskills: [
          { name: "Narrative" },
          { name: "Balancing" },
          { name: "UX/UI" },
        ],
        description: "Создание игровых механик и баланса"
      },
      { 
        name: "Mentorship", 
        level: 999,
        description: "Наставничество студентов"
      },
      { 
        name: "Storytelling", 
        level: 999,
        description: "Создание захватывающих сюжетов"
      }
    ],
    achievements: [
      {
        title: "Публикация проекта",
        icon: "FaUpload",
        description: "Разместил проект на платформе",
      },
      {
        title: "VR-эксперт",
        icon: "FaVrCardboard",
        description: "Участвовал в 3+ VR-проектах",
      },
      {
        title: "Ментор",
        icon: "FaHandsHelping",
        description: "Курировал более 50 студентов",
      }
    ]
  },
  {
    slug: "kostuk",
    name: "Костюк Даниил Иванович",
    position: "Преподаватель",
    title: "senior", 
    rarity: "RARE",
    photo: "https://shelly.kpfu.ru/e-ksu/docs/F738761626/sm6BPVcIJ_g.jpg?rnd=7502",
    email: "d.kostuk@example.com",
    github: "https://github.com/dkostuk",
    bio: "Специалист в области игровой разработки и 3D-моделирования.",
    stats: [
      { label: "Unity", value: 100 },
      { label: "Game Design", value: 80 },
      { label: "Teaching", value: 95 }
    ],
    skills: [
      { 
        name: "Unity", 
        level: 5,
        description: "Разработка игр и приложений"
      },
      { 
        name: "Game Design", 
        level: 5,
        description: "Проектирование игровых систем"
      },
      { 
        name: "Mentorship", 
        level: 4,
        description: "Руководство студенческими проектами"
      },
      { 
        name: "Storytelling", 
        level: 3,
        description: "Создание нарративов"
      }
    ],
    achievements: [
      {
        title: "Публикация проекта",
        icon: "FaUpload",
        description: "Разместил проект на платформе",
      },
      {
        title: "VR-эксперт",
        icon: "FaVrCardboard",
        description: "Участвовал в 3+ VR-проектах",
      },
      {
        title: "Ментор",
        icon: "FaHandsHelping",
        description: "Курировал более 50 студентов",
      }
    ]
  },
  {
    slug: "gazizov",
    name: "Газизов Рим Радикович",
    position: "Преподаватель",
    title: "senior", 
    rarity: "RARE",
    photo: "https://shelly.kpfu.ru/e-ksu/docs/F478398570/AsuwoTT94E8.jpg?rnd=5174",
    email: "r.gazizov@example.com",
    telegram: "https://t.me/rim_gazizov",
    bio: "Специалист в области разработки игр и компьютерной графики.",
    researchInterests: ["Компьютерная графика", "Шейдеры", "Оптимизация"],
    stats: [
      { label: "Unity", value: 95 },
      { label: "Game Design", value: 75 },
      { label: "Teaching", value: 90 }
    ],
    skills: [
      { 
        name: "Unity", 
        level: 5,
        description: "Разработка игр и приложений"
      },
      { 
        name: "Game Design", 
        level: 5,
        description: "Проектирование игровых систем"
      },
      { 
        name: "Mentorship", 
        level: 4,
        description: "Руководство студенческими проектами"
      },
      { 
        name: "Storytelling", 
        level: 3,
        description: "Создание нарративов"
      }
    ],
    achievements: [
      {
        title: "Публикация проекта",
        icon: "FaUpload",
        description: "Разместил проект на платформе",
      },
      {
        title: "VR-эксперт",
        icon: "FaVrCardboard",
        description: "Участвовал в 3+ VR-проектах",
      }
    ]
  },
  {
    slug: "lesnovskiy",
    name: "Лесновский Антон Федерович",
    position: "Аспирант",
    title: "assistant", 
    rarity: "COMMON",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    email: "a.lesnovskiy@example.com",
    github: "https://github.com/alesnovskiy",
    bio: "Аспирант, специализирующийся на игровых AI и алгоритмах.",
    researchInterests: ["Искусственный интеллект", "Алгоритмы", "Нейронные сети"],
    stats: [
      { label: "Unity", value: 95 },
      { label: "Game Design", value: 75 },
      { label: "Teaching", value: 90 }
    ],
    skills: [
      { 
        name: "Unity", 
        level: 5,
        description: "Разработка игр и приложений"
      },
      { 
        name: "Game Design", 
        level: 5,
        description: "Проектирование игровых систем"
      },
      { 
        name: "Mentorship", 
        level: 4,
        description: "Руководство студенческими проектами"
      },
      { 
        name: "Storytelling", 
        level: 3,
        description: "Создание нарративов"
      }
    ]
  },
  {
    slug: "kucherov",
    name: "Кучеров Алексей Иванович",
    position: "Аспирант",
    title: "assistant", 
    rarity: "COMMON",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    email: "a.kucherov@example.com",
    telegram: "https://t.me/a_kucherov",
    bio: "Аспирант с фокусом на маркетинг игровых продуктов и аналитику.",
    stats: [
      { label: "Unity", value: 95 },
      { label: "Marketing", value: 75 },
      { label: "Game Design", value: 75 }
    ],
    skills: [
      { 
        name: "Unity", 
        level: 5,
        description: "Разработка игр и приложений"
      },
      { 
        name: "Game Design", 
        level: 5,
        description: "Проектирование игровых систем"
      },
      { 
        name: "Marketing", 
        level: 4,
        description: "Продвижение игровых продуктов"
      }
    ]
  },
  {
    slug: "fedotov",
    name: "Федотов Илья Павлович",
    position: "Аспирант",
    title: "assistant", 
    rarity: "COMMON",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    email: "i.fedotov@example.com",
    github: "https://github.com/i_fedotov",
    bio: "Аспирант, специализирующийся на UX/UI дизайне для игр и приложений.",
    researchInterests: ["UX/UI дизайн", "Юзабилити", "Прототипирование"],
    stats: [
      { label: "Unity", value: 95 },
      { label: "UX/UI Design", value: 75 },
      { label: "Marketing", value: 10 }
    ],
    skills: [
      { 
        name: "Unity", 
        level: 5,
        description: "Разработка игр и приложений"
      },
      { 
        name: "UX/UI Design", 
        level: 5,
        description: "Проектирование пользовательских интерфейсов"
      },
      { 
        name: "Prototyping", 
        level: 4,
        description: "Создание прототипов интерфейсов"
      }
    ]
  }
];

export default staffList;
```


## data\successStories.ts

```ts
import { SuccessStory } from "@/types/successStories";

const successStories: SuccessStory[] = [
  {
    id: 1,
    lat: 55.7558,
    lng: 37.6173,
    city: "Москва",
    graduate: "Иван Смирнов",
    project: "NeuroBlade",
    year: 2023,
    description: "Игра попала в топ-10 Steam в жанре хак-энд-слэш.",
    link: "",
    image: "https:
  },
  {
    id: 2,
    lat: 48.8566,
    lng: 2.3522,
    city: "Париж",
    graduate: "Анна Лебедева",
    project: "VR Chef",
    year: 2022,
    description: "Кулинарный симулятор для Oculus Quest.",
    link: "https://example.com/vrchef",
    image: "https://thumbs.dreamstime.com/b/png-smiling-chef-character-wearing-vr-headset-blue-outfit-against-transparent-background-381634483.jpg"
  },
  {
    id: 3,
    lat: 55.7908,
    lng: 49.1144,
    city: "Казань",
    graduate: "Даннил Костюк",
    project: "VR-симулятор",
    year: 2024,
    description: "Первый VR-симулятор для медицины.",
    link: "http://localhost:3000/portfolio/vr-medical-simulator",
    image: "https://verpex.com/assets/uploads/images/blog/Is-Selling-3d-Models-Profitable.webp?v=1713956983"
  },
  {
    id: 4,
    lat: 55.7608,
    lng: 49.1144,
    city: "Казань",
    graduate: "Иван Лесницкий",
    project: "AR-приложение для обучения",
    year: 2024,
    description: "Проект попал в акселератор и получил грант.",
    link: "http://localhost:3000/portfolio/ar-education-app",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*S8aT0HfsYQ5XkWC48wV4NA.jpeg"
  },
];

export default successStories;
```


## types\news.d.ts

```ts
import { StaticImageData } from "next/image";


export interface NewsItem {
  _id?: string;
  slug: string;
  title: string;
  category: string;
  image: string; 
  date: string;
  markdown: string;
  author?: { name: string; slug: string }; 
  tags?: string[];
}
```


## types\portfolio.d.ts

```ts
import { StaticImageData } from "next/image";


export interface ProjectSkill {
  name: string;
  level: number;
}


export interface ProjectPhase {
  title: string;
  date: string;
  description: string;
  skills?: ProjectSkill[];
}


export interface ProjectAuthor {
  name: string;
  slug: string;
  role: string;
}


export interface PortfolioItem {
  _id?: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  releaseDate?: string;
  download?: string;
  phases?: ProjectPhase[];
  goals?: string[];
  features?: string[];
  screenshots?: string[];
  hallOfFame?: boolean;
  authors?: ProjectAuthor[];
  year?: number;
  markdown?: string; 
  tags?: string[];
}
```


## types\roles.d.ts

```ts


export interface RoleItem {
  label: string;
  description?: string; 
}

export interface RolesDict {
  [key: string]: RoleItem;
}
```


## types\staff.d.ts

```ts
import { StaticImageData } from "next/image";


export type Rarity = "LEGENDARY" | "RARE" | "COMMON";


export interface StaffStat {
  label: string;
  value: number;
}


export interface Subskill {
  name: string;
  description?: string;
}


export interface StaffSkill {
  name: string;
  level: number;
  description?: string;
  subskills?: Subskill[];
}


export interface StaffAchievement {
  title: string;
  icon: string; 
  description: string;
}


export interface StaffMember {
  _id?: string;
  
  slug: string;
  name: string;
  position: string; 
  photo: string; 
  
  
  title?: string; 
  rarity?: Rarity; 
  
  
  email?: string;
  telegram?: string;
  github?: string;
  
  
  bio?: string;
  researchInterests?: string[];
  
  
  stats?: StaffStat[];
  skills?: StaffSkill[];
  achievements?: StaffAchievement[];
  
  
  id?: string | number; 
  image?: string; 
  tags?: string[];
}
```


## types\studentProject.d.ts

```ts
export interface StudentProject {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  year: number;
  authors: Array<{
    name: string;
    slug: string;
    role: string;
  }>;
  markdown?: string;
  tags?: string[];
  status: 'active' | 'completed' | 'archived';
  githubUrl?: string;
  demoUrl?: string;
}
```


## types\successStories.d.ts

```ts
export interface SuccessStory {
  id: number;
  lat: number;
  lng: number;
  city: string;
  graduate: string;
  project: string;
  year: number;
  description: string;
  link: string;
  image: string;
}
```


## utils\imageUtils.ts

```ts

import { StaticImageData } from "next/image";

export const getImageUrl = (image: string | StaticImageData): string => {
  return typeof image === 'string' ? image : image.src;
};
```


## utils\markdownUtils.ts

```ts

export async function getMarkdownContent(fileName: string) {
  if (process.env.NODE_ENV === 'production') {
    const fs = (await import('fs')).promises;
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public', fileName);
    return fs.readFile(filePath, 'utf-8');
  } else {
    const response = await fetch(`http://localhost:3000${fileName}`);
    if (!response.ok) throw new Error('Failed to load markdown');
    return response.text();
  }
}
```


## .env.local

```local
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_API_URL_API=http://localhost:3003/api
NEXT_PUBLIC_MINIO_BASE_URL=http://127.0.0.1:9000/games
NEXT_PUBLIC_MINIO_MODELS_BASE_URL=http://127.0.0.1:9000/models
NEXT_PUBLIC_MINIO_IMAGES_BASE_URL=http://127.0.0.1:9000/game-images
NEXT_PUBLIC_MINIO_VIDEOS_BASE_URL=http://127.0.0.1:9000/game-videos
```

