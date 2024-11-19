// src/pages/__tests__/ForgotPasswordPage.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordPage from '../../../src/Pages/Auth/ForgotPasswordPage.tsx';
import axios from 'axios';
import { forgotPasswordURL } from '../../../src/api/constants.ts';
import { describe, it, expect, vi } from 'vitest';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';

describe('ForgotPasswordPage', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    );
  };

  afterEach(() => {
    sinon.restore(); // Restore the default behavior after each test
  });

  it('renders the Forgot Password form', () => {
    renderComponent();
    
    // Check for form elements
    expect(screen.getByLabelText(/email address/i)).to.exist;
    expect(screen.getByRole('button', { name: /send reset link/i })).to.exist;
    expect(screen.getByText(/remember your password/i)).to.exist;
  });

  it('shows validation errors for empty email', async () => {
    renderComponent();

    // Submit the form without entering an email
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    // Check for error message
    expect(await screen.findByText(/email is required/i)).to.exist;
  });

  it('shows validation error for invalid email', async () => {
    renderComponent();

    // Enter an invalid email and submit
    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    // Check for error message
    expect(await screen.findByText(/email format is not valid/i)).to.exist;
  });

  it('displays a success message on valid form submission', async () => {
    renderComponent();

    // Mock a successful response using sinon
    const postStub = sinon.stub(axios, 'post').resolves({
      data: { success: true, message: 'Reset link sent!' },
    });

    // Enter a valid email and submit
    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    // Check for success message
    expect(await screen.findByText(/reset link sent!/i)).to.exist;
    postStub.restore(); // Restore the stubbed method
  });

  it('displays an error message on failed form submission', async () => {
    renderComponent();

    // Mock an error response using sinon
    const postStub = sinon.stub(axios, 'post').rejects(new Error('Request failed'));

    // Enter a valid email and submit
    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    // Check for error message
    expect(await screen.findByText(/an error occurred while processing your request/i)).to.exist;
    postStub.restore(); // Restore the stubbed method
  });
});