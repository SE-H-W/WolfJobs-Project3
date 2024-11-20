import React, { useEffect, useState } from 'react';
import { getJobKeywords } from '../../api/job';
import { CircularProgress, Typography, List, ListItem } from '@mui/material';

interface JobKeywordsProps {
  jobId: string;
}

const JobKeywords: React.FC<JobKeywordsProps> = ({ jobId }) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchKeywords = async () => {
      console.log('Fetching keywords for jobId:', jobId);
      try {
        const response = await getJobKeywords(jobId);
        console.log('Received response:', response);
        if (response.success) {
          setKeywords(response.keywords);
        } else {
          console.error('Failed to fetch job keywords');
        }
      } catch (error) {
        console.error('Error fetching job keywords:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeywords();
  }, [jobId]);

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <Typography>Loading keywords...</Typography>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '16px' }}>
      <Typography variant="h6">Job Keywords:</Typography>
      {keywords.length > 0 ? (
        <List>
          {keywords.map((keyword, index) => (
            <ListItem key={index}>{keyword}</ListItem>
          ))}
        </List>
      ) : (
        <Typography>No keywords found.</Typography>
      )}
    </div>
  );
};

export default JobKeywords;
