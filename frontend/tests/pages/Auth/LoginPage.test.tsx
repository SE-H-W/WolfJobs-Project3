import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from '../../../src/Pages/Auth/LoginPage';

// Mock the Google OAuth Provider with your client ID
const clientId = "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"; // Replace with your actual client ID

describe('LoginPage Component', () => {
    // A wrapper function to include the necessary providers
    const renderWithProviders = (ui: React.ReactNode) => {
        return render(
            <GoogleOAuthProvider clientId={clientId}>
                <MemoryRouter>
                    {ui}
                </MemoryRouter>
            </GoogleOAuthProvider>
        );
    };

    beforeEach(() => {
        renderWithProviders(<LoginPage />);
    });

    test('renders the LoginPage landing', () => {
        const headingElement = screen.getByText(/login/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('renders email and password input fields', () => {
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    test('renders the login button', () => {
        const loginButton = screen.getByRole('button', { name: /login/i });
        expect(loginButton).toBeInTheDocument();
    });
});
