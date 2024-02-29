### Running the Server and Client

To run both the server and client, follow these steps:

```sh
git clone <repo link>
cd codeum-reparo
npm i
npm run dev
```

The Next.js app is located in `apps/web`, and the Express server is in `apps/server`.

### Apps and Packages

This Turborepo contains the following packages/apps:

- `server`: Express server
- `web`: [Next.js](https://nextjs.org/) app

### Bug Reporting Guidelines

1. **Fork the Repository:**
   Each team should fork the repository to their own GitHub account for codebase review and bug tracking.

2. **Raise Issues:**
   Teams should raise issues in the GitHub repository they have forked. Each bug report must include:

   - **Bug Description:**
     A clear and concise description of the encountered bug.

   - **Screenshot:**
     A screenshot of the functional/UI bug.

   - **Recreation Steps:**
     Clearly outline steps to recreate the bug. This helps in identifying and fixing the issue efficiently.

3. **Scoring System:**
   - **Functional Bugs: 5 points**
     - These bugs affect the application's core functionality (e.g., incorrect calculations, logic errors, or failure to perform expected tasks).

   - **UI/UX Bugs: 3 points**
     - These bugs relate to problems with the user interface (e.g., layout issues, broken styling, or improper rendering of elements, which may affect the user experience).

By adhering to these guidelines, teams can efficiently report and track bugs in the codebase, ensuring a smoother debugging process.
