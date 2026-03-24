# JobSpy Local Setup

This is your local setup of the [JobSpy library](https://github.com/speedyapply/JobSpy) - a powerful job scraping tool for LinkedIn, Indeed, Glassdoor, Google, ZipRecruiter & more.

## 🚀 Quick Start

### 1. Activate Virtual Environment
```bash
cd "/Users/sameershahid/Documents/web scrapper github/JobSpy"
source jobspy_env/bin/activate
```

### 2. Run Example Scripts

#### Basic Test
```bash
python test_jobspy.py
```

#### Advanced Analysis
```bash
python analyze_jobs.py
```

## 📁 Generated Files

- `jobs_output.csv` - Basic job search results
- `comprehensive_job_analysis.csv` - Multi-role analysis results  
- `remote_jobs.csv` - Remote job opportunities

## 🔧 Usage Examples

### Basic Job Search
```python
from jobspy import scrape_jobs

jobs = scrape_jobs(
    site_name=["indeed", "linkedin", "zip_recruiter"],
    search_term="software engineer", 
    location="San Francisco, CA",
    results_wanted=20,
    hours_old=72,
    country_indeed='USA'
)
```

### Advanced Search with Filters
```python
# Remote jobs only
remote_jobs = scrape_jobs(
    site_name=["indeed", "linkedin"],
    search_term="python developer",
    is_remote=True,
    job_type="fulltime",
    results_wanted=50
)

# Specific salary range (when available)
high_salary_jobs = scrape_jobs(
    site_name=["indeed"],
    search_term="senior software engineer",
    location="New York, NY",
    results_wanted=30,
    country_indeed='USA'
)
```

## 🌟 Key Features

- **Multi-site scraping**: LinkedIn, Indeed, Glassdoor, Google, ZipRecruiter
- **Concurrent processing**: Fast parallel scraping
- **Rich data**: Salaries, job types, company info, descriptions
- **Export options**: CSV, Excel support
- **Proxy support**: Bypass rate limiting
- **Flexible filtering**: Location, job type, remote work, posting date

## ⚠️ Important Notes

1. **Rate Limiting**: Job sites actively block scrapers
   - Use reasonable delays between requests
   - Consider using proxies for heavy usage
   - LinkedIn is most restrictive (~10 pages per IP)

2. **Virtual Environment**: Always activate the virtual environment before running scripts

3. **Search Tips**:
   - Use specific search terms for better results
   - Indeed searches job descriptions too (use quotes for exact matches)
   - Google Jobs requires very specific syntax

## 📚 Documentation

For complete documentation and parameters, see the [official README](https://github.com/speedyapply/JobSpy/blob/main/README.md).

## 🛠️ Troubleshooting

- **429 Errors**: You're being rate limited - wait before retrying
- **No Results**: Check search parameters and network connectivity
- **Import Errors**: Ensure virtual environment is activated
