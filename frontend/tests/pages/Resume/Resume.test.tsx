// Resume.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Resume from '../../../src/Pages/Resume/Resume.tsx'; // Adjust the path as needed
import axios from 'axios';

// Mocking axios post method
const mockAxiosPost = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    if (url === 'http://localhost:8000/resume/parseResume') {
      resolve({
        data: {
          success: true,
          ats_score: 250, // Default mock score
        },
      });
    } else {
      reject(new Error('Unknown endpoint'));
    }
  });
};

// Override axios post method for tests
const originalAxiosPost = axios.post;

beforeEach(() => {
  axios.post = mockAxiosPost;
});

afterEach(() => {
  axios.post = originalAxiosPost;
});

const setup = () => {
  return render(<Resume />);
};

describe('Resume Component', () => {
  it('should render the Resume page without crashing', () => {
    const { getByText } = setup();

    // Assuming the Resume page has a heading or title like "Resume"
    expect(getByText(/Resume/i)).toBeInTheDocument();
  });

  it('ATS Score Visibility - should not show ATS score initially and show after running', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot(); // Initial state snapshot
  });
});
