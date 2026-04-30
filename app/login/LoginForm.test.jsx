import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import LoginForm from './LoginForm.jsx';

const loginMock = vi.fn();
const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

vi.mock('next/link', () => ({
  default: ({ href, children }) => <a href={href}>{children}</a>
}));

vi.mock('../lib/AuthContext.jsx', () => ({
  useAuth: () => ({
    login: loginMock
  })
}));

vi.mock('../components/AuthButton/AuthButton.js', () => ({
  default: ({ content, status }) => <button type="submit" data-status={status}>{content}</button>
}));

vi.mock('../components/AlertBlock/AlertBlock.js', () => ({
  default: ({ message, open, title }) => (open ? <div role="alert" data-title={title}>{message}</div> : null)
}));

vi.mock('../lib/constants.js', () => ({
  ICONS: {
    EMAIL: () => <span data-testid="email-icon" />,
    VIEW: () => <span data-testid="view-icon" />,
    VIEWOFF: () => <span data-testid="viewoff-icon" />
  }
}));

describe('LoginForm', () => {
  beforeEach(() => {
    loginMock.mockReset();
    pushMock.mockReset();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  function fillAndSubmit() {
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret123' }
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Entrar' }).closest('form'));
  }

  it('submits credentials, stores the session and redirects on success', async () => {
    const timeoutSpy = vi.spyOn(globalThis, 'setTimeout').mockImplementation((callback) => {
      callback();
      return 0;
    });

    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, email: 'user@example.com', access_token: 'token-xyz' })
    });

    render(<LoginForm API_URL="https://api.example.com" />);
    await act(async () => {
      fillAndSubmit();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(fetch).toHaveBeenCalledWith('https://api.example.com/login', expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }));

    expect(loginMock).toHaveBeenCalledWith({ id: 1, email: 'user@example.com', access_token: 'token-xyz' }, 'token-xyz');
    expect(pushMock).toHaveBeenCalledWith('/app');

    timeoutSpy.mockRestore();
  });

  it('shows an error when credentials are invalid', async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' })
    });

    render(<LoginForm API_URL="https://api.example.com" />);
    await act(async () => {
      fillAndSubmit();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(screen.getByRole('alert')).toHaveTextContent('Credenciales inválidas');
    expect(loginMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('shows a network error message when fetch fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    fetch.mockRejectedValue(new Error('network down'));

    render(<LoginForm API_URL="https://api.example.com" />);
    await act(async () => {
      fillAndSubmit();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(screen.getByRole('alert')).toHaveTextContent('Error mientras se iniciaba sesión');
    expect(loginMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});