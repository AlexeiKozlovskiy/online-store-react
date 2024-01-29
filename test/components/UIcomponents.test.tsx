import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootState } from '@/store/store';
import { Preloader } from '@/components/Preloader/Preloader';
import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { GoogleButton } from '@/components/GoogleButton/GoogleButton';

describe('UI components', () => {
  it('should renders preloader', () => {
    render(
      <BrowserRouter>
        <Preloader />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should renders header logo', () => {
    render(
      <BrowserRouter>
        <HeaderLogo />
      </BrowserRouter>
    );

    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
  });

  it('should renders header logo', () => {
    render(
      <BrowserRouter>
        <HeaderLogo />
      </BrowserRouter>
    );

    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
  });

  it('should renders footer', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should renders header', () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should renders Google Button', () => {
    window.google = {
      accounts: {
        id: {
          initialize: vi.fn(),
          renderButton: vi.fn(),
        },
      },
    };

    render(
      <BrowserRouter>
        <GoogleButton />
      </BrowserRouter>
    );

    expect(screen.getByTestId('google-btn')).toBeInTheDocument();
  });
});
