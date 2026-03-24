import React, { useState } from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
`;

const StatsHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

const StatCard = styled.div`
  background: rgba(255,255,255,0.1);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const FilterBar = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 0.9rem;
`;

const FilterLabel = styled.span`
  font-weight: 600;
  color: #333;
`;

const JobList = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const JobCard = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e1e5e9;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
`;

const JobTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.3rem;
  flex: 1;
  min-width: 200px;
`;

const JobMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
`;

const Company = styled.div`
  font-weight: 600;
  color: #667eea;
  font-size: 1.1rem;
`;

const Location = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const JobDetails = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch(props.type) {
      case 'site': return '#e3f2fd';
      case 'jobType': return '#f3e5f5';
      case 'remote': return '#e8f5e8';
      case 'salary': return '#fff3e0';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'site': return '#1976d2';
      case 'jobType': return '#7b1fa2';
      case 'remote': return '#388e3c';
      case 'salary': return '#f57c00';
      default: return '#666';
    }
  }};
`;

const Description = styled.div`
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
  font-size: 0.9rem;
`;

const JobActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.a`
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
`;

function JobResults({ jobs, stats }) {
  const [siteFilter, setSiteFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredJobs = jobs.filter(job => {
    if (siteFilter && job.site !== siteFilter) return false;
    if (jobTypeFilter && job.job_type !== jobTypeFilter) return false;
    return true;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch(sortBy) {
      case 'date':
        return new Date(b.date_posted) - new Date(a.date_posted);
      case 'company':
        return a.company.localeCompare(b.company);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const formatSalary = (job) => {
    if (job.salary.min_amount && job.salary.max_amount) {
      const currency = job.salary.currency || '$';
      const interval = job.salary.interval || 'year';
      return `${currency}${job.salary.min_amount?.toLocaleString()} - ${currency}${job.salary.max_amount?.toLocaleString()}/${interval}`;
    }
    return null;
  };

  if (jobs.length === 0) {
    return (
      <ResultsContainer>
        <NoResults>
          No jobs found. Try adjusting your search criteria.
        </NoResults>
      </ResultsContainer>
    );
  }

  return (
    <ResultsContainer>
      <StatsHeader>
        <h2>Search Results</h2>
        <StatsGrid>
          <StatCard>
            <StatNumber>{stats?.total_jobs || jobs.length}</StatNumber>
            <StatLabel>Total Jobs</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats?.sites_scraped?.length || 0}</StatNumber>
            <StatLabel>Sites Searched</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{Object.keys(stats?.top_companies || {}).length}</StatNumber>
            <StatLabel>Companies</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{filteredJobs.length}</StatNumber>
            <StatLabel>Filtered Results</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsHeader>

      <FilterBar>
        <FilterLabel>Filter by:</FilterLabel>
        <div>
          <FilterLabel>Site:</FilterLabel>
          <FilterSelect value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)}>
            <option value="">All Sites</option>
            {stats?.sites_scraped?.map(site => (
              <option key={site} value={site}>{site}</option>
            ))}
          </FilterSelect>
        </div>
        <div>
          <FilterLabel>Job Type:</FilterLabel>
          <FilterSelect value={jobTypeFilter} onChange={(e) => setJobTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            {stats?.job_types?.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </FilterSelect>
        </div>
        <div>
          <FilterLabel>Sort by:</FilterLabel>
          <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date Posted</option>
            <option value="company">Company</option>
            <option value="title">Job Title</option>
          </FilterSelect>
        </div>
      </FilterBar>

      <JobList>
        {sortedJobs.map((job, index) => (
          <JobCard key={job.id || index}>
            <JobHeader>
              <JobTitle>{job.title}</JobTitle>
              <JobMeta>
                <Company>{job.company}</Company>
                <Location>{job.location}</Location>
              </JobMeta>
            </JobHeader>

            <JobDetails>
              <Badge type="site">{job.site}</Badge>
              {job.job_type && <Badge type="jobType">{job.job_type}</Badge>}
              {job.is_remote && <Badge type="remote">Remote</Badge>}
              {formatSalary(job) && <Badge type="salary">{formatSalary(job)}</Badge>}
              {job.date_posted && <Badge>Posted: {new Date(job.date_posted).toLocaleDateString()}</Badge>}
            </JobDetails>

            {job.description && (
              <Description>
                {job.description.substring(0, 300)}
                {job.description.length > 300 && '...'}
              </Description>
            )}

            <JobActions>
              <ActionButton href={job.job_url} target="_blank" rel="noopener noreferrer">
                View Job
              </ActionButton>
            </JobActions>
          </JobCard>
        ))}
      </JobList>
    </ResultsContainer>
  );
}

export default JobResults;
