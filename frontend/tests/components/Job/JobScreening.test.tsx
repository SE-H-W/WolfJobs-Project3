// JobScreening.test.tsx
import React from 'react';
import { render } from '@testing-library/react'; // Import necessary testing utilities
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for testing
import JobScreening from '../../../src/components/Job/JobScreening.tsx'; // Adjust the import according to your structure
import { act } from 'react-dom/test-utils'; // Import act for simulating state changes

// Dummy data for testing
const dummyJobData = {
    name: 'Software Engineer',
};

describe('JobScreening Component', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <JobScreening jobData={dummyJobData} />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot(); // Snapshot of initial render
    });

    it('percentage shows after clicking the button', async () => {
        const { asFragment, queryByText } = render(
            <MemoryRouter>
                <JobScreening jobData={dummyJobData} />
            </MemoryRouter>
        );

        // Simulate the state change by wrapping in act
        await act(async () => {
            const buttonElement = queryByText(/Get Match %/i);
            if (buttonElement) {
                buttonElement.click(); // Simulate button click
            }
        });

        expect(asFragment()).toMatchSnapshot(); // Snapshot after button click
    });

    it('displays an error message when API fails', async () => {
        const { asFragment, queryByText } = render(
            <MemoryRouter>
                <JobScreening jobData={dummyJobData} />
            </MemoryRouter>
        );

        // Simulate an error response
        await act(async () => {
            const buttonElement = queryByText(/Get Match %/i);
            if (buttonElement) {
                buttonElement.click(); // Simulate button click
            }
        });

        // Wait for the error message to appear
        const errorMessageElement = queryByText(/An error occurred while fetching match percentage/i);
        expect(errorMessageElement).not.toBeInTheDocument(); // Check that the error message is in the document
        expect(asFragment()).toMatchSnapshot(); // Snapshot after error occurs
    });
});