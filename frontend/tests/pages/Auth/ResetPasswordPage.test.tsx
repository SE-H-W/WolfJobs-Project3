// src/pages/__tests__/ResetPasswordPage.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai'; // Use Chai for assertions
import ResetPasswordPage from '../../../src/Pages/Auth/ResetPasswordPage.tsx'; // Adjust the path as needed
import axios from 'axios';
import sinon from 'sinon';
import { resetPasswordURL } from '../../../src/api/constants.ts'; // Adjust the path as needed

// Create a mock for the useNavigate function
const mockNavigate = sinon.stub();

const MockedResetPasswordPage = (props: any) => {
  return (
    <MemoryRouter>
      <ResetPasswordPage {...props} navigate={mockNavigate} />
    </MemoryRouter>
  );
};

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    mockNavigate.resetHistory(); // Reset history before each test
  });

  it('renders the Reset Password page', () => {
    render(<MockedResetPasswordPage />);

    expect(screen.getByText(/Reset Password/i)).to.exist;
  });
});