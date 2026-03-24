#!/usr/bin/env python3
"""
JobSpy Analysis Script
Demonstrates more advanced usage and analysis of job data.
"""

import pandas as pd
from jobspy import scrape_jobs

def analyze_job_market():
    print("🚀 JobSpy Advanced Analysis")
    print("=" * 50)
    
    # Search for multiple job types
    print("🔍 Scraping jobs for different roles...")
    
    # Software engineering jobs
    se_jobs = scrape_jobs(
        site_name=["indeed", "linkedin"],
        search_term="software engineer",
        location="San Francisco, CA",
        results_wanted=15,
        hours_old=168,  # Last week
        country_indeed='USA',
        verbose=1  # Less verbose
    )
    
    # Data science jobs
    ds_jobs = scrape_jobs(
        site_name=["indeed", "linkedin"],
        search_term="data scientist",
        location="San Francisco, CA", 
        results_wanted=15,
        hours_old=168,
        country_indeed='USA',
        verbose=1
    )
    
    # Product manager jobs
    pm_jobs = scrape_jobs(
        site_name=["indeed", "linkedin"],
        search_term="product manager",
        location="San Francisco, CA",
        results_wanted=15,
        hours_old=168,
        country_indeed='USA',
        verbose=1
    )
    
    print(f"\n📊 Results Summary:")
    print(f"Software Engineer jobs: {len(se_jobs)}")
    print(f"Data Scientist jobs: {len(ds_jobs)}")
    print(f"Product Manager jobs: {len(pm_jobs)}")
    
    # Combine all jobs for analysis
    all_jobs = pd.concat([se_jobs, ds_jobs, pm_jobs], ignore_index=True)
    print(f"Total jobs scraped: {len(all_jobs)}")
    
    if len(all_jobs) > 0:
        print("\n🏢 Top Companies by Job Postings:")
        company_counts = all_jobs['company'].value_counts().head(10)
        for company, count in company_counts.items():
            print(f"  {company}: {count} jobs")
        
        print("\n💼 Job Types Distribution:")
        job_type_counts = all_jobs['job_type'].value_counts()
        for job_type, count in job_type_counts.items():
            print(f"  {job_type}: {count} jobs")
        
        print("\n🌐 Job Sites Performance:")
        site_counts = all_jobs['site'].value_counts()
        for site, count in site_counts.items():
            print(f"  {site}: {count} jobs")
        
        # Salary analysis
        salary_jobs = all_jobs[(all_jobs['min_amount'].notna()) & (all_jobs['max_amount'].notna())]
        if len(salary_jobs) > 0:
            print(f"\n💰 Salary Analysis (based on {len(salary_jobs)} jobs with salary data):")
            avg_min = salary_jobs['min_amount'].mean()
            avg_max = salary_jobs['max_amount'].mean()
            print(f"  Average salary range: ${avg_min:,.0f} - ${avg_max:,.0f}")
        
        # Save comprehensive results
        all_jobs.to_csv("comprehensive_job_analysis.csv", index=False)
        print(f"\n💾 Complete analysis saved to comprehensive_job_analysis.csv")
    
    return all_jobs

def search_remote_jobs():
    """Demonstrate searching for remote jobs specifically"""
    print("\n🏡 Searching for Remote Jobs...")
    print("-" * 30)
    
    remote_jobs = scrape_jobs(
        site_name=["indeed", "linkedin"],
        search_term="python developer",
        is_remote=True,
        results_wanted=10,
        hours_old=72,
        country_indeed='USA',
        verbose=1
    )
    
    print(f"Found {len(remote_jobs)} remote Python developer jobs")
    
    if len(remote_jobs) > 0:
        remote_jobs.to_csv("remote_jobs.csv", index=False)
        print("Remote jobs saved to remote_jobs.csv")
    
    return remote_jobs

if __name__ == "__main__":
    # Run comprehensive analysis
    all_jobs = analyze_job_market()
    
    # Search for remote jobs
    remote_jobs = search_remote_jobs()
    
    print("\n✅ Analysis complete!")
    print("\nFiles generated:")
    print("  - comprehensive_job_analysis.csv")
    print("  - remote_jobs.csv")
