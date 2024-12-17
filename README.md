# GameDay Frontend Application README

Overview:
This repository contains the frontend code for GameDay, a web application built using React to design the frontend. The primary goal of GameDay is to provide users with an intuitive, responsive, and interactive interface. The app was designed with the user experience in mind, ensuring that navigation is seamless and accessible. From interaticing with the schedule to viewing standings and notifications, every page is structured to deliver an easy-to-use experience. React was chosen for its component-based architecture, enabling efficient UI updates and a smooth, dynamic experience. The frontend leverages various React features like state management and routing to facilitate real-time updates and interactions across different parts of the application.

The design of GameDay focuses on providing clean layouts for each page, such as the login, signup, dashboard, schedule management, and standings display. It allows users to effortlessly manage their information, receive notifications, and interact with the created schedule in a way that’s both visually appealing and highly functional. The pages were carefully crafted to match the web application’s requirements, ensuring that every aspect of the user journey, from authentication to managing personal data, is streamlined and intuitive. Furthermore, the structure of the frontend is modular, which makes the application easy to maintain and scale, allowing for future enhancements to both the design and functionality as needed.

Folder Structure:

Here’s a high-level overview of the folder structure:

├── node_modules/               # Project dependencies
├── package-lock.json           # Lockfile for managing dependencies
├── package.json                # Project configuration
├── public/                     # Public assets
│   ├── assets/                 # Static assets (images, icons, etc.)
│   ├── index.html              # Main HTML file
│   ├── manifest.json           # Web app manifest
│   └── README.md               # Project documentation
└── src/                        # Source code for the app
    ├── App.css                 # Main stylesheet
    ├── App.js                  # Root component
    ├── App.test.js             # Test file for App.js
    ├── components/             # Reusable UI components
    │   ├── dashboard/          # Dashboard related components
    │   │   ├── Dashboard.css   # Styles for the Dashboard component
    │   │   └── Dashboard.js    # Dashboard component logic
    │   ├── forgotpassword/     # Components for the forgot password flow
    │   │   ├── ForgotPassword.css # Styles for Forgot Password
    │   │   └── ForgotPassword.js  # Forgot Password component logic
    │   ├── home/               # Homepage components
    │   │   ├── home.css        # Styles for the Home component
    │   │   └── home.js         # Home component logic
    │   ├── Login/              # Login page components
    │   │   ├── Login.css       # Styles for Login component
    │   │   └── Login.js        # Login component logic
    │   ├── notification_preview/ # Notification preview components
    │   │   ├── noti_preview.css # Styles for Notification Preview
    │   │   └── noti_preview.js  # Notification Preview component logic
    │   ├── notifications/      # Components for managing notifications
    │   │   ├── notifications.css # Styles for Notifications component
    │   │   └── notifications.js  # Notifications component logic
    │   ├── schedule/           # Schedule-related components
    │   │   ├── editEventModal.css # Styles for event editing modal
    │   │   ├── editEventModal.js  # Event editing modal logic
    │   │   ├── scheduleCalendar1.css # Styles for calendar view
    │   │   ├── scheduleCalendar1.js  # Calendar view logic
    │   │   └── scheduleContext.js  # Context for managing schedule state
    │   ├── signup/             # Signup page components
    │   │   ├── SignUp.css      # Styles for Signup component
    │   │   └── SignUp.js       # Signup component logic
    │   ├── standings/          # Standings page components
    │   │   ├── standings.css   # Styles for Standings component
    │   │   └── standings.js    # Standings component logic
    │   └── standings_preview/  # Standings preview components
    │       ├── standings_preview.css # Styles for Standings Preview
    │       └── standings_preview.js  # Standings Preview component logic
    ├── data/                   # Data-related files (JSON, API services)
    │   ├── index.css           # General styles for data handling
    │   ├── index.js            # JavaScript for managing data
    │   ├── logo.svg            # SVG logo
    ├── pages/                  # Pages for different routes in the app
    │   ├── dashboard/          # Dashboard page
    │   │   ├── Dashboard.css   # Styles for the Dashboard page
    │   │   └── Dashboard.js    # Dashboard page logic
    │   ├── forgotpassword/     # Forgot password page
    │   │   ├── ForgotPassword.css # Styles for Forgot Password page
    │   │   └── ForgotPassword.js  # Forgot Password page logic
    │   ├── home/               # Home page
    │   │   ├── home.css        # Styles for Home page
    │   │   └── home.js         # Home page logic
    │   ├── Login/              # Login page
    │   │   ├── Login.css       # Styles for Login page
    │   │   └── Login.js        # Login page logic
    │   └── signup/             # Signup page
    │       ├── SignUp.css      # Styles for Signup page
    │       └── SignUp.js       # Signup page logic
    ├── reportWebVitals.js      # Performance reporting for app
    ├── setupTests.js           # Setup for tests
    ├── styles/                 # Global styles
    │   ├── global.css          # Global styles for the app
    │   └── theme.css           # Theming styles for the app
    └── index.js                # Main entry point for React app

    The .js files in the GameDay frontend repository are primarily responsible for the logic and functionality of the application. These files are where the core React components and JavaScript logic reside, handling everything from user interactions to data management and routing.

    The .css files in GameDay are responsible for styling the components and pages, ensuring that the application looks visually appealing and provides a pleasant user experience. These styles are tightly coupled with the React components and are designed to be modular and reusable across different pages and components.

Aim & Goals

    The primary goal of the frontend application is to provide a user-friendly interface with the following key features:

    User Management:
        - Authentication flow, including Login and Signup pages.  
        - Password recovery via the Forgot Password page.  
    
    Dashboard:
        - Display key user information and notifications on the Dashboard.

    Scheduling: 
        - Allow users to view the schedule.
        - Allow the commisioner to edit and manage the schedule efficiently.

    Notifications: 
        - Enable users to receive notifications.
        - Enable the commissioner to send notifications.

    Standings:
        - Present standings in an interactive layout.

Products:

    The frontend application delivers key products designed to enhance the user experience, including a secure authentication system, a dynamic dashboard, an interactive scheduling tool, a real-time notification system, and a visually appealing standings display. Each product is built to seamlessly integrate with the overall application, ensuring ease of use and functionality.

    User Authentication:

        - Secure Login and Signup forms for user registration and access.
  
    Interactive Dashboard:
        - Overview of user activity, notifications, and schedule management.

    Dynamic Scheduling System:
        - Users (comissioners) can create, edit, and view the schedule in an easy-to-use format.

    Notifications:
        - A notification system to keep users updated with important information regarding game changes, cancellations, and etc.

    Standings Page:
        - A component for displaying team standings to users.

GameDay Backend Application
Overview:
The GameDay backend is the backbone of a sports scheduling web application that integrates with a React-based frontend. Built using Python with the Flask framework, it handles data management, user authentication, and interactions with game schedules and standings. The backend is designed to be robust and scalable, ensuring that as user demand increases, the system remains reliable and responsive.

Technology Choices:
Python and Flask: We chose Python due to its readability and Flask for its simplicity and ability to scale up to complex applications. Flask's lightweight and modular design is ideal for a service-oriented architecture, allowing us to efficiently handle requests and manage the application's core functionalities.

Databases: Our backend utilizes CSV files for storing static data and integrates with ICS (iCalendar) files for managing game schedules. This choice allows for easy data manipulation and integration with various calendar services, enhancing the application's utility.

AWS Deployment: Deployment is handled through AWS, utilizing services such as Amplify for frontend deployment and EC2 for backend services. This combination offers a robust, scalable environment for hosting our application, ensuring high availability and performance.

Integration with Frontend:
The backend communicates with the frontend through well-defined API endpoints, enabling seamless data transactions and updates. This architecture supports real-time interactions, allowing users to manage their schedules, view standings, and receive notifications dynamically. Flask routes handle the logic for API requests, ensuring data is correctly processed and sent to the frontend.

The API design is focused on providing a smooth integration with the React components, enabling dynamic updates without reloading the page. Authentication processes are securely managed through the backend, leveraging Flask's capabilities to provide secure routes and data integrity.

Folder Structure:
Here’s a high-level overview of the backend folder structure:

The backend directory contains several subdirectories and files. Within the data/ directory, we store user information and game schedules in users.csv and games.ics files, respectively. The models.py file contains the database models, while myapp.py sets up the Flask application and defines routes. Dependency details are listed in the requirements.txt file. The README.md provides documentation about the backend. Within the api/ directory, there are specific files for different purposes: auth.py handles authentication routes, schedule.py manages schedule-related routes, and notifications.py deals with notification routes. This organization supports efficient management and scalability of the backend functionality.

Aim & Goals:
The backend's primary goal is to provide a robust, secure, and responsive API that allows for efficient data management and seamless user experience across the GameDay application. By maintaining a high level of performance and reliability, we ensure that the application scales with user growth and that data integrity is maintained throughout the user journey.

By using Python, Flask, and AWS, the backend architecture not only supports the current requirements but also lays a foundation for future enhancements and integrations, making GameDay a versatile tool for sports management.


