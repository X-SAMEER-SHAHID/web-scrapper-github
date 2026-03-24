import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  margin-bottom: 30px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

const FullWidthGroup = styled.div`
  grid-column: 1 / -1;
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  width: 100%;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const AdvancedOptions = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e1e5e9;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

function SearchForm({ onSearch, loading }) {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [resultsWanted, setResultsWanted] = useState(20);
  const [isRemote, setIsRemote] = useState(false);
  const [hoursOld, setHoursOld] = useState(72);
  const [selectedSites, setSelectedSites] = useState(['indeed', 'linkedin']);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [linkedinFetchDescription, setLinkedinFetchDescription] = useState(false);

  const availableSites = [
    { value: 'indeed', label: 'Indeed' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'glassdoor', label: 'Glassdoor' },
    { value: 'zip_recruiter', label: 'ZipRecruiter' },
    { value: 'google', label: 'Google Jobs' }
  ];

  const handleSiteChange = (siteValue, checked) => {
    if (checked) {
      setSelectedSites([...selectedSites, siteValue]);
    } else {
      setSelectedSites(selectedSites.filter(site => site !== siteValue));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keywords.trim()) {
      alert('Please enter job keywords');
      return;
    }

    if (selectedSites.length === 0) {
      alert('Please select at least one job site');
      return;
    }

    const searchParams = {
      keywords: keywords.trim(),
      location: location.trim() || 'United States',
      site_name: selectedSites,
      results_wanted: parseInt(resultsWanted),
      job_type: jobType || null,
      is_remote: isRemote,
      hours_old: parseInt(hoursOld),
      country_indeed: 'USA',
      linkedin_fetch_description: linkedinFetchDescription
    };

    onSearch(searchParams);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="keywords">Job Keywords *</Label>
            <Input
              id="keywords"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., software engineer, data scientist"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco, CA"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="jobType">Job Type</Label>
            <Select
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Any</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="resultsWanted">Number of Results</Label>
            <Select
              id="resultsWanted"
              value={resultsWanted}
              onChange={(e) => setResultsWanted(e.target.value)}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Select>
          </FormGroup>

          <FullWidthGroup>
            <Label>Job Sites to Search</Label>
            <CheckboxGroup>
              {availableSites.map(site => (
                <CheckboxLabel key={site.value}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedSites.includes(site.value)}
                    onChange={(e) => handleSiteChange(site.value, e.target.checked)}
                  />
                  {site.label}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </FullWidthGroup>
        </FormGrid>

        <AdvancedOptions>
          <ToggleButton
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? '▼' : '▶'} Advanced Options
          </ToggleButton>

          {showAdvanced && (
            <FormGrid>
              <FormGroup>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    checked={isRemote}
                    onChange={(e) => setIsRemote(e.target.checked)}
                  />
                  Remote jobs only
                </CheckboxLabel>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="hoursOld">Posted within (hours)</Label>
                <Select
                  id="hoursOld"
                  value={hoursOld}
                  onChange={(e) => setHoursOld(e.target.value)}
                >
                  <option value={24}>24 hours</option>
                  <option value={72}>3 days</option>
                  <option value={168}>1 week</option>
                  <option value={720}>1 month</option>
                </Select>
              </FormGroup>

              <FullWidthGroup>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    checked={linkedinFetchDescription}
                    onChange={(e) => setLinkedinFetchDescription(e.target.checked)}
                  />
                  Fetch full LinkedIn descriptions (slower but more detailed)
                </CheckboxLabel>
              </FullWidthGroup>
            </FormGrid>
          )}
        </AdvancedOptions>

        <SearchButton type="submit" disabled={loading}>
          {loading ? '🔍 Searching...' : '🚀 Search Jobs'}
        </SearchButton>
      </form>
    </FormContainer>
  );
}

export default SearchForm;
