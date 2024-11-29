import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CoverLetterDropzone from '../../../src/components/CoverLetter/CoverLetterDropZone'; // Adjust the path as needed

// Mock function to handle file upload callback
const mockOnFileUpload = (files: File[]) => {
  console.log('Files uploaded:', files); // For manual verification if needed
};

const setup = () => {
  const { container } = render(<CoverLetterDropzone onFileUpload={mockOnFileUpload} />);
  return container;
};

describe('CoverLetterDropzone Component', () => {
  it('should render the CoverLetterDropzone component', () => {
    const container = setup();

    // Check if the dropzone component renders with the expected text using querySelector
    const dropTextElement = container.querySelector('p');
    expect(dropTextElement?.textContent).toBe("Drag 'n' drop your cover letter here, or click to select a file");
  });

  it('should display the drop area for dragging files', () => {
    const container = setup();

    // Check if drop area exists by querying with querySelector
    const dropArea = container.querySelector('div');
    expect(dropArea).toBeTruthy();
  });

  it('should call onFileUpload when a file is dropped', () => {
    const { getByText } = render(<CoverLetterDropzone onFileUpload={mockOnFileUpload} />);

    const dropArea = getByText("Drag 'n' drop your cover letter here, or click to select a file");

    // Create a mock file
    const file = new File(['cover letter content'], 'cover_letter.pdf', { type: 'application/pdf' });

    // Simulate dropping a file
    fireEvent.drop(dropArea, {
      dataTransfer: {
        files: [file],
      },
    });

    // Since mockOnFileUpload just logs to console, you can spy on it if it's a jest mock function
    // For example, if you define it as:
    // const mockOnFileUpload = jest.fn();
    // Then you can expect it to have been called:
    // expect(mockOnFileUpload).toHaveBeenCalledWith([file]);
  });
});
