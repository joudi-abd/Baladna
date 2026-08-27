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

# Favorites

# Favorites : GET '/favorites'

Authorization: Bearer {token}

Success Response:
        { 
            "success": true, 
            "message": "Favorites retrieved successfully", 
            "data": [{ } , { } , ...] 
        }

------------------------

# Add Favorites : POST '/favorites'

Authorization: Bearer {token}

Request Body:
        { 
            "favoritable_type": "place" / "trip", 
            "favoritable_id": 1
        }

Success Response:
        { 
            "success": true, 
            "message": "Added to favorites successfully", 
            "data": { ... } 
        }

--------------------------

# Delete Favorite : DELETE '/favorites/{favorite}'

Authorization: Bearer {token}

Success Response:
        { 
            "success": true, 
            "message": "Removed from favorites successfully"
        }

-------------------------

# Cities 

# Cities : GET '/cities'

Success Response:
        { 
            "success": true, 
            "message": "Cities retrieved successfully", 
            "data": [{ } , { } , ...]
        }

-------------------------

# Categories 

# Categories : GET '/categories'

Success Response:
        { 
            "success": true, 
            "message": "Categories retrieved successfully", 
            "data": [{ } , { } , ...]
        }

--------------------------

# Features

# Features : GET : '/features'

Success Response:
        { 
            "success": true, 
            "message": "Features retrieved successfully", 
            "data": [{ } , { } , ...]
        }

--------------------------

# About 

# About : GET : '/about'

Success Response:
        { 
            "success": true, 
            "message": "Features retrieved successfully", 
            "data": {
                "title": " ",
                "description": " ",
                "email": " ",
                "phone": " "
            }
        }

-------------------------

# Contact 

# Contact : POST : '/contact'

Request Body:
        { 
            "name": " ",
            "email": " ",
            "message": " ",
            "subject": " "
        }

Success Response:
        {
            "success": true,
            "message": "Contact message sent successfully",
            "data": [ { ... } ] 
        }

--------------------------

# Bookings

# Booking : POST '/bookings'

Authorization: Bearer {token} 

Request Body:
        { 
            "trip_id": ... ,
            "participants_count": ... ,
            "notes": " "
        }

Success Response:
        {
            "success": true,
            "message": "Booking created successfull",
            "data": { ... } 
        }        

-----------------------

# User Bookings : GET '/my-bookings'

Query Parameters:
                status , per_page 

Authorization: Bearer {token}

Success Response:
        {
            "success": true,
            "message": "User bookings retrieved successfully",
            "data": [ { } { } ... ] 
        }

-----------------------

# Delete Booking : DELETE '/bookings/{booking}'

Authorization: Bearer {token}

Success Response:
        {
            "success": true,
            "message": "Booking cancelled successfully",
        }

-----------------------

# Edit Booking : PUT '/bookings/{booking}'

Authorization: Bearer {token}

Request Body:
        { 
            "participants_count": ... ,
            "notes": " "
        }

Success Response:
        {
            "success": true,
            "message": "Booking updated successfully",
            "data": { ... } 
        }

-------------------------

# Profile

# Profile : GET '/profile'

Authorization: Bearer {token}

Success Response:
        {
            "success": true,
            "message": "Profile retrieved successfully",
            "data": { ... } 
        }

-------------------------

# Update Profile : PUT '/profile'

Authorization: Bearer {token}

Request Body:
        { 
            "name": " " ,
            "phone": " "
        }

Success Response:
        {
            "success": true,
            "message": "Profile updated successfully",
            "data": { ... } 
        }

-------------------------

# Change Password : PUT '/profile/password'

Authorization: Bearer {token}

Request Body:
        { 
            "current_password": "old_password" ,
            "password": "new_password",
            "password_confirmation": "new_password"
        }

Success Response:
        {
            "success": true,
            "message": "Password updated successfully",
        }

-------------------------

# Update Profile Image : POST '/profile/image'

Authorization: Bearer {token}

Request Body:(form-data)
        key: image , type: file , value: 'image file'


Success Response:
        {
            "success": true,
            "message": "Profile image updated successfully",
            "data": { ... } 
        }

----------------------------

# Notifications

# Notifications : GET '/notifications'

Authorization: Bearer {token} 

Query Parameters:
                is_read , per_page 

Success Response:
        {
            "success": true,
            "message": "Notifications retrieved successfully",
            "data": [ { ... } ] 
        }

----------------------------

# Mark Notification As Read : PUT '/notifications/{notification}

Authorization: Bearer {token}

Success Response:
        {
            "success": true,
            "message": "Notification marked as read successfully",
            "data": { ... } 
        }


-------------------------------
# Payments

# Create Payment : POST '/payments'
Authorization: Bearer {token}
Request Body:
        {
             "booking_id": ... ,
             "payment_method": "sham_cash | bank_transfer | cash_on_arrival" ,
             "proof_image": image (optional) 
        }
        proof_image يستخدم لإثبات التحويل عند اختيار sham_cash | bank_transfer.

Success Response:
        { 
            "success": true, 
            "message": "Payment created successfully.", 
            "data": { ... } 
        } 

------------------------

# User Payments : GET '/my-payments'

Authorization: Bearer {token}

Success Response:
        {        
            "success": true, 
            "message": "Payment retrieved successfully.", 
            "data": [{ ... } , { ... }]
        } 

------------------------

# Show Payment : GET '/payments/{payment}'

Authorization: Bearer {token}

Success Response:
        {        
            "success": true, 
            "message": "User payments retrieved successfully.", 
            "data": { ... } 
        } 

-------------------------

# Approve Payment : PUT '/payments/{payment}/approve'

Authorization: Bearer {token}

Requires confirm payments permission.

Success Response:
        { 
            "success": true, 
            "message": "Payment approved successfully." 
            "data": { ... } 
        } 
When the payment is approved:
Payment status → completed Booking status → confirmed Notification → sent to the user 

--------------------------

# Reject Payment : PUT '/payments/{payment}/reject'

Authorization: Bearer {token}

Requires reject payments permission.
Success Response:
        { 
            "success": true, 
            "message": "Payment rejected successfully.", 
            "data": { ... } 
        } 
When the payment is rejected:
Payment status → failed Booking status → pending Notification → sent to the user