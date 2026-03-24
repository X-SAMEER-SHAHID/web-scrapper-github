import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  margin: 20px 0;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #667eea;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  color: #667eea;
  font-weight: 600;
  animation: ${pulse} 1.5s ease-in-out infinite;
  margin-bottom: 10px;
`;

const LoadingSubtext = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  max-width: 400px;
  line-height: 1.4;
`;

const ProgressDots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 15px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

function LoadingSpinner() {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Searching for jobs...</LoadingText>
      <LoadingSubtext>
        We're scraping multiple job sites to find the best opportunities for you. 
        This may take a few moments depending on the number of results requested.
      </LoadingSubtext>
      <ProgressDots>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </ProgressDots>
    </LoadingContainer>
  );
}

export default LoadingSpinner;
