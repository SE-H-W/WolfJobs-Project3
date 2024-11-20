// src/components/SuggestedKeywords/SuggestedKeywords.tsx

import React, { useState } from 'react';
import { suggestResumeKeywords } from '../../api/keywords';
import { useUserStore } from '../../store/UserStore';
import { Button, List, ListItem, Typography } from '@mui/material';

interface SuggestedKeywordsProps {
  jobId: string;
}

const SuggestedKeywords: React.FC<SuggestedKeywordsProps> = ({ jobId }) => {
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = useUserStore((state) => state.id);

  const fetchMissingKeywords = async () => {
    setLoading(true);
    try {
      const response = await suggestResumeKeywords(userId, jobId);
      if (response.success) {
        setMissingKeywords(response.missingKeywords);
      } else {
        console.error('Failed to fetch missing keywords');
        alert('Failed to fetch missing keywords');
      }
    } catch (error: any) {
      console.error('Error fetching missing keywords:', error);
      alert('An error occurred while fetching suggestions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={fetchMissingKeywords}
        disabled={loading}
        style={{ textTransform: 'none', marginTop: '16px' }}
      >
        {loading ? 'Loading...' : 'Suggest Keywords to Add to Resume'}
      </Button>
      {missingKeywords.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <Typography variant="h6">Suggested Keywords to Add:</Typography>
          <List>
            {missingKeywords.map((keyword, index) => (
              <ListItem key={index}>{keyword}</ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default SuggestedKeywords;
