#!/usr/bin/env python3
"""
JobSpy Backend API
Flask server that provides job search endpoints using JobSpy library.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the parent directory to sys.path so we can import jobspy
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from jobspy import scrape_jobs
import pandas as pd
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "JobSpy API is running"})

@app.route('/api/search-jobs', methods=['POST'])
def search_jobs():
    """
    Search for jobs using JobSpy
    
    Expected JSON payload:
    {
        "keywords": "software engineer",
        "location": "San Francisco, CA",
        "site_name": ["indeed", "linkedin"],
        "results_wanted": 20,
        "job_type": "fulltime",
        "is_remote": false,
        "hours_old": 72
    }
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'keywords' not in data:
            return jsonify({"error": "Keywords are required"}), 400
        
        # Extract parameters with defaults
        keywords = data['keywords']
        location = data.get('location', 'United States')
        site_name = data.get('site_name', ['indeed', 'linkedin'])
        results_wanted = data.get('results_wanted', 20)
        job_type = data.get('job_type', None)
        is_remote = data.get('is_remote', None)
        hours_old = data.get('hours_old', 72)
        country_indeed = data.get('country_indeed', 'USA')
        linkedin_fetch_description = data.get('linkedin_fetch_description', False)
        
        logger.info(f"Searching for jobs: {keywords} in {location}")
        
        # Call JobSpy with proper parameter handling
        jobspy_params = {
            'site_name': site_name,
            'search_term': keywords,
            'location': location,
            'results_wanted': results_wanted,
            'hours_old': hours_old,
            'country_indeed': country_indeed,
            'verbose': 1  # Reduce verbosity for API
        }
        
        # Only add optional parameters if they have valid values
        if job_type:
            jobspy_params['job_type'] = job_type
        if is_remote is not None:
            jobspy_params['is_remote'] = is_remote
        if linkedin_fetch_description:
            jobspy_params['linkedin_fetch_description'] = linkedin_fetch_description
            
        jobs_df = scrape_jobs(**jobspy_params)
        
        # Convert DataFrame to JSON-serializable format
        if len(jobs_df) == 0:
            return jsonify({
                "success": True,
                "count": 0,
                "jobs": [],
                "message": "No jobs found for the given criteria"
            })
        
        # Clean and prepare data for frontend
        jobs_data = []
        for _, job in jobs_df.iterrows():
            # Helper function to handle NaN values
            def clean_value(value, default=None):
                if pd.isna(value) or value != value:  # Check for NaN
                    return default
                return value
            
            # Clean salary amounts
            min_amount = clean_value(job.get('min_amount'))
            max_amount = clean_value(job.get('max_amount'))
            
            # Clean description field properly
            description = clean_value(job.get('description'), '')
            if description:
                description = str(description)
                if len(description) > 500:
                    description = description[:500] + "..."
            else:
                description = "No description available"
            
            job_dict = {
                "id": str(clean_value(job.get('id'), '')),
                "title": str(clean_value(job.get('title'), 'No title')),
                "company": str(clean_value(job.get('company'), 'Unknown Company')),
                "location": str(clean_value(job.get('location'), '')),
                "site": str(clean_value(job.get('site'), '')),
                "job_url": str(clean_value(job.get('job_url'), '')),
                "date_posted": str(clean_value(job.get('date_posted'), '')),
                "job_type": str(clean_value(job.get('job_type'), '')),
                "is_remote": bool(job.get('is_remote', False)),
                "description": description,
                "salary": {
                    "min_amount": min_amount,
                    "max_amount": max_amount,
                    "currency": str(clean_value(job.get('currency'), '')),
                    "interval": str(clean_value(job.get('interval'), ''))
                }
            }
            jobs_data.append(job_dict)
        
        # Calculate some basic statistics
        stats = {
            "total_jobs": len(jobs_data),
            "sites_scraped": list(jobs_df['site'].unique()),
            "job_types": list(jobs_df['job_type'].dropna().unique()),
            "top_companies": jobs_df['company'].value_counts().head(5).to_dict()
        }
        
        return jsonify({
            "success": True,
            "count": len(jobs_data),
            "jobs": jobs_data,
            "stats": stats,
            "search_params": {
                "keywords": keywords,
                "location": location,
                "sites": site_name,
                "results_wanted": results_wanted
            }
        })
        
    except Exception as e:
        logger.error(f"Error in job search: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "An error occurred while searching for jobs"
        }), 500

@app.route('/api/sites', methods=['GET'])
def get_available_sites():
    """Get list of available job sites"""
    sites = [
        {"value": "indeed", "label": "Indeed"},
        {"value": "linkedin", "label": "LinkedIn"},
        {"value": "glassdoor", "label": "Glassdoor"},
        {"value": "zip_recruiter", "label": "ZipRecruiter"},
        {"value": "google", "label": "Google Jobs"}
    ]
    return jsonify({"sites": sites})

@app.route('/api/job-types', methods=['GET'])
def get_job_types():
    """Get list of available job types"""
    job_types = [
        {"value": "fulltime", "label": "Full Time"},
        {"value": "parttime", "label": "Part Time"},
        {"value": "internship", "label": "Internship"},
        {"value": "contract", "label": "Contract"}
    ]
    return jsonify({"job_types": job_types})

if __name__ == '__main__':
    print("🚀 Starting JobSpy Backend API...")
    print("📍 Available endpoints:")
    print("  - GET  /api/health")
    print("  - POST /api/search-jobs")
    print("  - GET  /api/sites")
    print("  - GET  /api/job-types")
    print("🌐 Server running on http://localhost:5001")
    app.run(debug=True, host='0.0.0.0', port=5001)
