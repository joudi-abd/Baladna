\*\* Base URL: '/api'

# Authentication

# Register : POST '/register'

Request:
        { 
            "name": "test", 
            "email": "test@test.com", 
            "password": "123456", 
        }
Success Response:
        { 
            "success": true, 
            "message": "User registered successfully", 
            "user": {}, 
            "token": "..." 
        }

--------------------

# Login : POST '/login'

Request:
        { 
            "email": "ahmed@test.com", 
            "password": "123456" 
        }
Success Response:
        { 
            "success": true, 
            "message": "Login successful", 
            "user": {},
            "token": "..." 
        }

---------------------

# Logout : POST '/logout'

Headers:

Authorization: Bearer {token}

Success Response:
        { 
            "success": true, 
            "message": "Logged out successfully" 
        }

---------------------

# Me : GET '/me'

Headers:

Authorization: Bearer {token}

Success Response:
        { 
            "success": true, 
            "user": {} 
        }

---------------------

