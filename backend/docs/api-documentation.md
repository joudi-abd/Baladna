\*\* Base URL: '/api'

# Authentication

# Register : POST '/register'

Request Body:
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

Request Body:
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

# Places

# Places : GET '/places'

Query Parameters:
        search, city_id, category_id, status, per_page

Success Response:
        {
            "data": [
                {},{},{}
            ],
            "links": { ... },
            "meta": { ... }
        }

---------------------

# Featured Places : GET '/places/featured'

Query Parameters:
        limit (optional, default 10, max 50)

Success Response:
        { 
            "success": true, 
            "message": "Featured places retrieved successfully", 
            "data": [ { ... } ] 
        }

---------------------

# Show Place : GET '/places/{place}'

Success Response:
        { 
            "success": true, 
            "message": "Place retrieved successfully", 
            "data": { ... } 
        }

---------------------

# Trips

# Trips : GET '/trips'

Query Parameters:
        search, city_id, category_id, transpotation_type, trip_date, budget_max , budget_min, status, per_page

Success Response:
        {
            "data": [
                {},{},{}
            ],
            "links": { ... },
            "meta": { ... }
        }

---------------------

# Show Trip : GET '/trips/{trip}'

Success Response:
        { 
            "success": true, 
            "message": "Trip retrieved successfully", 
            "data": { ... } 
        }

--------------------

# Reviews 

# Add Review : POST '/reviews'

Authorization: Bearer {token}

Request Body:
        { 
            "reviewable_type": "place" / "trip", 
            "reviewable_id": 1, 
            "rating": 5,
            "comment": "place/trip is very beautiful" 
        }
Success Response:
        { 
            "success": true, 
            "message": "Review added successfully.", 
            "data": { ... } 
        }

----------------------

# Update Review : PUT '/reviews/{review}'

Authorization: Bearer {token}

Request Body:
        {  
            "rating": 4,
            "comment": "Update review" 
        }
Success Response:
        { 
            "success": true, 
            "message": "Review updated successfully.", 
            "data": { ... } 
        }

-----------------------

# Delete Review : DELETE '/reviews/{review}'

Authorization: Bearer {token}

Success Response:
        { 
            "success": true, 
            "message": "Review deleted successfully."
        }

----------------------

# Place Reviews : GET '/places/{place}/reviews'


Query Parameters:
                per_page

Authorization: Bearer {token}

Success Response:
        { 
            "success": true, 
            "message": "Reviews retrieved successfully", 
            "data": [ ... ] 
        }

-----------------------

# Trip Reviews : GET '/trips/{trip}/reviews'


Query Parameters:
                per_page

Authorization: Bearer {token}

Success Response:
        { 
            "success": true, 
            "message": "Reviews retrieved successfully", 
            "data": [ ... ] 
        }

-------------------------



