// src/api/keywords.ts

import axios from 'axios';

interface SuggestResumeKeywordsResponse {
  success: boolean;
  missingKeywords: string[];
}
const API_BASE_URL = 'http://localhost:8000'; // Adjust to your backend's URL

export const suggestResumeKeywords = async (
  userId: string,
  jobId: string
): Promise<SuggestResumeKeywordsResponse> => {
  try {
    console.log('Making request to get job keywords for jobId keywords_ts:', jobId);
    const response = await axios.get<SuggestResumeKeywordsResponse>(
      `${API_BASE_URL}/api/v1/keywords/suggestResumeKeywords/${userId}/${jobId}`
    );
    console.log('Received response from API keywords_ts:', response);
    return response.data;
  } catch (error) {
    console.error('Error suggesting resume keywords:', error);
    throw error;
  }
};

