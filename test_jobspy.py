#!/usr/bin/env python3
"""
Test script for JobSpy library
This script demonstrates basic usage of JobSpy to scrape job postings.
"""

import csv
from jobspy import scrape_jobs

def main():
    print("🔍 Starting JobSpy test...")
    print("=" * 50)
    
    # Search for software engineer jobs
    jobs = scrape_jobs(
        site_name=["indeed", "linkedin", "zip_recruiter"],  # Using multiple sites for better results
        search_term="software engineer",
        location="San Francisco, CA",
        results_wanted=10,  # Small number for testing
        hours_old=72,  # Jobs posted in last 3 days
        country_indeed='USA',
        verbose=2  # Show detailed logs
    )
    
    print(f"\n✅ Found {len(jobs)} jobs")
    
    if len(jobs) > 0:
        print("\n📊 Sample results:")
        print(jobs.head())
        
        # Save to CSV
        output_file = "jobs_output.csv"
        jobs.to_csv(output_file, quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False)
        print(f"\n💾 Results saved to {output_file}")
        
        # Show some basic statistics
        print(f"\n📈 Basic Statistics:")
        print(f"Sites scraped: {jobs['site'].unique().tolist()}")
        print(f"Job types found: {jobs['job_type'].unique().tolist()}")
        if 'company' in jobs.columns:
            print(f"Companies with most jobs: {jobs['company'].value_counts().head(3).to_dict()}")
    else:
        print("❌ No jobs found. This might be due to:")
        print("- Rate limiting from job sites")
        print("- Network connectivity issues")
        print("- Restrictive search parameters")

if __name__ == "__main__":
    main()
