"""
Script simples para testar a API
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("Testing health endpoint...")
    response = requests.get(f"{BASE_URL}/api/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_get_news():
    """Test getting news"""
    print("Testing GET /api/news...")
    response = requests.get(f"{BASE_URL}/api/news")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        news = response.json()
        print(f"Found {len(news)} news items")
        if news:
            print(f"First news: {news[0]['title']}\n")
    else:
        print(f"Error: {response.text}\n")

def test_login():
    """Test login"""
    print("Testing POST /api/auth/login...")
    response = requests.post(
        f"{BASE_URL}/api/auth/login",
        json={
            "email": "admin@projetosemear.org.br",
            "password": "admin123"
        },
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Response: {response.json()}")
        print(f"Cookies: {response.cookies}\n")
        return response.cookies
    else:
        print(f"Error: {response.text}\n")
        return None

def test_create_news(cookies):
    """Test creating news (requires auth)"""
    print("Testing POST /api/news...")
    response = requests.post(
        f"{BASE_URL}/api/news",
        json={
            "title": "Test News",
            "excerpt": "This is a test excerpt",
            "content": "This is test content for the news item.",
            "date": "2024-01-15"
        },
        headers={"Content-Type": "application/json"},
        cookies=cookies
    )
    print(f"Status: {response.status_code}")
    if response.status_code == 201:
        print(f"Created news: {response.json()}\n")
        return response.json()["id"]
    else:
        print(f"Error: {response.text}\n")
        return None

if __name__ == "__main__":
    print("=" * 50)
    print("API Test Script")
    print("=" * 50)
    print()
    
    try:
        test_health()
        test_get_news()
        cookies = test_login()
        
        if cookies:
            test_create_news(cookies)
        
        print("=" * 50)
        print("Tests completed!")
        print("=" * 50)
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the API. Make sure the server is running on http://localhost:8000")
    except Exception as e:
        print(f"Error: {e}")

