import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './components/SearchForm';
import JobResults from './components/JobResults';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 0;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid #f5c6cb;
`;

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchStats, setSearchStats] = useState(null);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError('');
    setJobs([]);
    setSearchStats(null);

    try {
      const response = await fetch('http://localhost:5001/api/search-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch jobs');
      }

      if (data.success) {
        setJobs(data.jobs);
        setSearchStats(data.stats);
        
        if (data.jobs.length === 0) {
          setError('No jobs found for your search criteria. Try adjusting your keywords or location.');
        }
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(`Error: ${err.message}. Make sure the backend server is running on http://localhost:5001`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <ContentWrapper>
        <Header>
          <Title>🔍 JobSpy Search</Title>
          <Subtitle>Find your next opportunity with powerful job scraping</Subtitle>
        </Header>

        <SearchForm onSearch={handleSearch} loading={loading} />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {loading && <LoadingSpinner />}

        {jobs.length > 0 && (
          <JobResults jobs={jobs} stats={searchStats} />
        )}
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;