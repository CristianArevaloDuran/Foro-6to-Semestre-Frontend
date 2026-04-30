"use client"

import { useAuth } from "../../lib/AuthContext.jsx";
import { useRouter } from "next/navigation";


export default function User() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (loading) return (
        <main>
            <h1 className="mt-30">Cargando...</h1>
        </main>
    )

    if (!user) return (
        <main>
            <h1 className="mt-30">No hay sesión iniciada</h1>
        </main>
    )

    // Normalizar estructura: algunos backends guardan datos en user.user
    const u = user.user || user;
    const name = u?.user_metadata?.name || u?.name || u?.username || u?.email || 'Usuario';

    const initials = (name.split(' ').map(n => n[0]).slice(0,2).join('') || 'U').toUpperCase();

    return (
        <main>
            <div className="user-container">
                <header className="user-header">
                    <div className="avatar">{initials}</div>
                    <div className="user-info">
                        <h1>{name}</h1>
                        <p className="muted">{u?.email}</p>
                    </div>
                    <div className="user-actions">
                        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </header>

                <section className="user-body">
                    <div className="user-card">
                        <h2 className="card-title">Perfil</h2>
                        <p><strong>Nombre:</strong> {name}</p>
                        <p><strong>Email:</strong> {u?.email || '—'}</p>
                        <p><strong>ID:</strong> {u?.id || u?._id || '—'}</p>
                    </div>

                    <div className="user-card">
                        <h2 className="card-title">Cuenta</h2>
                        <div className="kv-list">
                            <p><strong>Username:</strong> {u?.user_metadata?.username || u?.username || '—'}</p>
                            <p><strong>Rol:</strong> {u?.role || u?.user_metadata?.role || '—'}</p>
                            <p><strong>Registrado:</strong> {u?.created_at || u?.user_metadata?.created_at || '—'}</p>
                            {
                                u?.user_metadata && Object.keys(u.user_metadata).length > 0 && (
                                    <>
                                        <h3 className="card-subtitle">Metadatos</h3>
                                        <ul>
                                            {Object.entries(u.user_metadata).map(([k,v]) => (
                                                <li key={k}><strong>{k}:</strong> {String(v)}</li>
                                            ))}
                                        </ul>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}