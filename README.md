### Index

1. [Running Development Environment](#running-development-environment)
    - [Server and Client](#server-and-client)
  
2. [Bug Reporting Guidelines](#bug-reporting-guidelines)
    - [Fork the Repository](#1-fork-the-repository)
    - [Enable Issues](#2-enable-issues)
    - [Raise Issues](#3-raise-issues)
    - [Scoring System](#4-scoring-system)

---

### Running Development Environment

#### Server and Client

To run both the server and client, follow these steps:

```sh
git clone <repo link>
cd codeum-reparo
npm i
npm run dev
```

The Next.js app is located in `apps/web`, and the Express server is in `apps/server`.

---

### Bug Reporting Guidelines

#### 1. Fork the Repository

Participants should fork the repository to their own GitHub account for codebase review and bug tracking.

#### 2. Enable Issues

In the settings of the forked repository, participants should ensure that the "Issues" feature is enabled. This allows for efficient bug tracking and communication.

#### 3. Raise Issues

Teams should raise issues in the GitHub repository they have forked. Each bug report must include:

   - **Bug Description:**
     A clear and concise description of the encountered bug.

   - **Screenshot:**
     A screenshot of the functional/UI bug.

   - **Recreation Steps:**
     Clearly outline steps to recreate the bug. This helps in identifying and fixing the issue efficiently.

#### 4. Scoring System

   - **Functional Bugs: 5 points**
     - These bugs affect the application's core functionality (e.g., incorrect calculations, logic errors, or failure to perform expected tasks).

   - **UI/UX Bugs: 3 points**
     - These bugs relate to problems with the user interface (e.g., layout issues, broken styling, or improper rendering of elements, which may affect the user experience).

By following these guidelines, participants can contribute to the bug identification and resolution process.
