// ResumeDropzone.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ResumeDropzone from '../../../src/components/Resume/ResumeDropzone.tsx'; // Adjust the path as needed

// Manual function to handle file upload callback
const mockOnFileUpload = (files: File[]) => {
  console.log('Files uploaded:', files); // For manual verification if needed
};

const setup = () => {
  const { container } = render(<ResumeDropzone onFileUpload={mockOnFileUpload} />);
  return container;
};

describe('ResumeDropzone Component', () => {
  it('should render the ResumeDropzone component', () => {
    const container = setup();

    // Check if the dropzone component renders with the expected text using querySelector
    const dropTextElement = container.querySelector('p');
    expect(dropTextElement?.textContent).toBe("Drag 'n' drop some files here, or click to select files");
  });

  it('should display the drop area for dragging files', () => {
    const container = setup();

    // Check if drop area text exists by querying with querySelector
    const dropArea = container.querySelector('div');
    expect(dropArea).toBeTruthy();
  });
});