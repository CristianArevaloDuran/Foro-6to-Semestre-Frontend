import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import Cookies from 'js-cookie';
import { AuthProvider, useAuth } from './AuthContext.jsx';

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn()
  }
}));

function AuthStateProbe() {
  const auth = useAuth();

  return (
    <div>
      <p data-testid="user">{auth.user ? auth.user.email : 'no-user'}</p>
      <p data-testid="loading">{String(auth.loading)}</p>
      <p data-testid="authenticated">{String(auth.isAuthenticated)}</p>
      <button type="button" onClick={() => auth.login({ email: 'probe@example.com' }, 'token-123')}>
        login
      </button>
      <button type="button" onClick={auth.logout}>
        logout
      </button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    Cookies.get.mockReset();
    Cookies.set.mockReset();
    Cookies.remove.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('restores a valid session from the session cookie', async () => {
    Cookies.get.mockReturnValue('session-token');

    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ email: 'user@example.com' })
    });

    render(
      <AuthProvider apiUrl="https://api.example.com">
        <AuthStateProbe />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    expect(fetch).toHaveBeenCalledWith('https://api.example.com/me', {
      headers: {
        Authorization: 'Bearer session-token',
        'Content-Type': 'application/json'
      }
    });
    expect(screen.getByTestId('user')).toHaveTextContent('user@example.com');
    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
  });

  it('clears invalid sessions and leaves the user logged out', async () => {
    Cookies.get.mockReturnValue('expired-token');

    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Unauthorized' })
    });

    render(
      <AuthProvider apiUrl="https://api.example.com">
        <AuthStateProbe />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    expect(Cookies.remove).toHaveBeenCalledWith('session');
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
  });

  it('exposes login and logout helpers through the provider', async () => {
    Cookies.get.mockReturnValue(null);

    render(
      <AuthProvider apiUrl="https://api.example.com">
        <AuthStateProbe />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'login' }));

    expect(Cookies.set).toHaveBeenCalledWith('session', 'token-123', { secure: true });
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('probe@example.com');
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });

    fireEvent.click(screen.getByRole('button', { name: 'logout' }));

    expect(Cookies.remove).toHaveBeenCalledWith('session');
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    });
  });

  it('throws when useAuth is used outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<AuthStateProbe />)).toThrow('useAuth debe ser usado dentro de AuthProvider');

    spy.mockRestore();
  });
});