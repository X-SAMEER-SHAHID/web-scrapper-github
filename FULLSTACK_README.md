# 🚀 JobSpy Full Stack Application

A modern React frontend with Flask backend powered by the JobSpy library for comprehensive job searching across multiple platforms.

## 🏗️ Architecture

```
JobSpy Full Stack/
├── backend/           # Flask API server
│   └── app.py        # Main API endpoints
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.js    # Job search form
│   │   │   ├── JobResults.js    # Results display
│   │   │   └── LoadingSpinner.js # Loading indicator
│   │   └── App.js    # Main application
├── jobspy_env/       # Python virtual environment
└── start_app.sh      # Quick startup script
```

## ⚡ Quick Start

### 1. Start Both Backend and Frontend
```bash
./start_app.sh
```

### 2. Manual Start (Alternative)

**Backend:**
```bash
cd backend
source ../jobspy_env/bin/activate
python app.py
```

**Frontend (in new terminal):**
```bash
cd frontend
npm start
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔧 Backend API Endpoints

### Health Check
```http
GET /api/health
```

### Search Jobs
```http
POST /api/search-jobs
Content-Type: application/json

{
  "keywords": "software engineer",
  "location": "San Francisco, CA",
  "site_name": ["indeed", "linkedin"],
  "results_wanted": 20,
  "job_type": "fulltime",
  "is_remote": false,
  "hours_old": 72
}
```

### Get Available Sites
```http
GET /api/sites
```

### Get Job Types
```http
GET /api/job-types
```

## 🎨 Frontend Features

### Search Form
- **Keywords**: Required job search terms
- **Location**: Geographic location filter
- **Job Type**: Full-time, part-time, internship, contract
- **Results Count**: 10, 20, 50, or 100 results
- **Job Sites**: Select multiple sources (Indeed, LinkedIn, etc.)
- **Advanced Options**:
  - Remote jobs only filter
  - Time filter (24h, 3 days, 1 week, 1 month)

### Results Display
- **Job Cards**: Detailed job information
- **Filtering**: By site, job type
- **Sorting**: By date, company, or title
- **Statistics**: Total jobs, sites searched, companies
- **Responsive Design**: Works on desktop and mobile

### Job Information Displayed
- Job title and company
- Location and remote status
- Job type and posting date
- Salary information (when available)
- Job description preview
- Direct link to original posting

## 🛠️ Technical Stack

### Backend
- **Flask**: Web framework
- **Flask-CORS**: Cross-origin resource sharing
- **JobSpy**: Job scraping library
- **Pandas**: Data manipulation

### Frontend
- **React**: UI framework
- **Styled-Components**: CSS-in-JS styling
- **Axios**: HTTP client (available if needed)

## 🔍 Supported Job Sites

- **Indeed**: Best performance, no rate limiting
- **LinkedIn**: High quality jobs, rate limited (~10 pages per IP)
- **Glassdoor**: Company reviews and salary data
- **ZipRecruiter**: US/Canada focused
- **Google Jobs**: Requires specific search syntax

## ⚡ Performance Tips

1. **Rate Limiting**: Job sites actively block scrapers
   - Start with fewer results (10-20)
   - Use multiple sites for better coverage
   - LinkedIn is most restrictive

2. **Search Optimization**:
   - Use specific keywords for better results
   - Indeed searches job descriptions too
   - Use quotes for exact matches

3. **Error Handling**:
   - 429 errors indicate rate limiting
   - Network timeouts are handled gracefully
   - Empty results suggest parameter adjustment

## 🚨 Troubleshooting

### Backend Issues
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# View backend logs
cd backend && source ../jobspy_env/bin/activate && python app.py
```

### Frontend Issues
```bash
# Restart frontend
cd frontend && npm start

# Check for dependency issues
cd frontend && npm install
```

### Common Errors
- **CORS errors**: Backend not running or wrong URL
- **429 responses**: Rate limited, wait before retrying
- **No results**: Adjust search parameters or check connectivity

## 📱 Mobile Responsive

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones

## 🎯 Example Searches

### Software Engineering Jobs
```json
{
  "keywords": "software engineer",
  "location": "San Francisco, CA",
  "site_name": ["indeed", "linkedin"],
  "results_wanted": 30,
  "job_type": "fulltime"
}
```

### Remote Data Science Jobs
```json
{
  "keywords": "data scientist",
  "location": "",
  "site_name": ["indeed", "linkedin", "glassdoor"],
  "results_wanted": 50,
  "is_remote": true,
  "hours_old": 168
}
```

### Entry Level Positions
```json
{
  "keywords": "entry level developer",
  "location": "New York, NY",
  "site_name": ["indeed", "zip_recruiter"],
  "results_wanted": 20,
  "job_type": "fulltime",
  "hours_old": 72
}
```

## 📈 Future Enhancements

- [ ] Job alerts and notifications
- [ ] Save favorite jobs
- [ ] Export results to PDF/Excel
- [ ] Advanced filtering (salary range, company size)
- [ ] Job application tracking
- [ ] Company research integration

## 🔒 Rate Limiting & Best Practices

- **Indeed**: Most reliable, minimal rate limiting
- **LinkedIn**: ~10 pages per IP before blocking
- **Others**: Vary by site and usage patterns

**Recommendations**:
- Use reasonable request intervals
- Rotate through different sites
- Consider proxy usage for heavy scraping
- Monitor response codes and adjust accordingly

---

🚀 **Ready to find your next opportunity!** The application provides a powerful interface to search across multiple job boards simultaneously with advanced filtering and beautiful presentation of results.
