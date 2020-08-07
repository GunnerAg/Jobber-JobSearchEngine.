# JOBBER

## Description

JOBBER is an employment application in which employers and employees get in contact to look for the best job collaborations. The employers will look in JOBBER's database for the perfect match, and the employees will receive the job offers. Then, they will have the possibility to accept it or refuse it, and then notify to the employer
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **landing page** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend
- **events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend 
- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in

## Backlog

- Difference between job applications
- Point in the Profile Pages how much hiring propositions exists 



## ROUTES:

- GET / 
  - renders the homepage
  
- GET /singupEmployee
  - redirects to / if user logged in succesfully
  - renders the signup form

- POST /singupEmployee
  - redirects to / if user logged in
  - body:
    - First name
    - Last name
    - Email
    - Password

- GET /loginEmployee
  - redirects to /employeeProfile if user logged in succesfully
  - renders the login form (with flash msg)

- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


## Models

Employee model:

    -name.
    -secondname.
    -age.
    -adress.
    -email.
    -passwordHash.

Employer model:

    -companyName.
    -location.
    -adress.
    -email.
    -passwordHash.


Offer model:

  -companyName.
  -companyId.
  -nameEmployee.
  -employeeId.
  -status.

 
```
username: String
password: String
```

Event model

```
owner: ObjectId<User>
name: String
description: String
date: Date
location: String
attendees: [ObjectId<User>]
``` 

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
