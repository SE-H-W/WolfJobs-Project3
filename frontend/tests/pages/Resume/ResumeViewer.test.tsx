// ResumeViewer.test.tsx
import React from 'react';
import { render, act, fireEvent , waitFor} from '@testing-library/react';
import ResumeViewer from '../../../src/components/Resume/ResumeViewer.tsx'; // Adjust the path as needed
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const setup = () => {
    return render(
      <MemoryRouter initialEntries={['/resume/1']}>
        <Routes>
          <Route path="/resume/:applicantId" element={<ResumeViewer />} />
        </Routes>
      </MemoryRouter>
    );
  };
  
  describe('ResumeViewer Component', () => {
    it('should render the ResumeViewer component', () => {
      const { container } = setup();
  
      // Check if the ResumeViewer container renders
      const resumeViewerContainer = container.querySelector('.flex');
      
      // Expect it to be truthy (meaning it rendered correctly)
      expect(resumeViewerContainer).toBeTruthy();
    });
  
    it('should render navigation buttons and page number text', async () => {
      const { container } = setup();
  
      const previousButton = container.querySelector('button.rounded-l');
      const nextButton = container.querySelector('button.rounded-r');
      const pageNumberText = container.querySelector('p');
  
      expect(previousButton).toBeTruthy();
      expect(nextButton).toBeTruthy();
      expect(pageNumberText?.textContent).toContain('Page 1 of');
  
      // Click the next button
      if (nextButton) {
        fireEvent.click(nextButton);
        await waitFor(() => expect(pageNumberText?.textContent).not.toContain('Page 2 of'));
      }
  
      // Click the previous button
      if (previousButton) {
        fireEvent.click(previousButton);
        await waitFor(() => expect(pageNumberText?.textContent).toContain('Page 1 of'));
      }
    });
  });
  