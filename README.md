# Sequence App

Sequence is a online sample library for music producers. Sequence lets you upload, like, filter, and subsequently download music samples, loops, or one-shots for your projects.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **[Node.js](https://nodejs.org/en/)** (version 12.x or higher) - The JavaScript runtime environment. It's used to run the server-side of the application.
- **[npm](https://www.npmjs.com/)** (usually comes with Node.js) or **[Yarn](https://yarnpkg.com/)** - Package managers for installing the necessary libraries.

Ensure that Node.js and npm are installed by running `node -v` and `npm -v` in your terminal. This will display the current versions installed, confirming their installations.

### Installing

To install the dependencies and get the project running, follow these steps inside the project directory:

1. **Install dependencies** using npm. Run the following commands:

   Using npm:

   ```bash
   npm install
   ```

   Start the development server to run your app locally:

   ```bash
   npm run dev
   ```

## Running Tests

### Upload Form Tests

The tests for the upload form focus on verifying that appropriate error messages are displayed when invalid data is submitted.

To run these tests, follow the command below:

```bash
npm run test
```

## Login Credentials

### User Access

- **Username:** `testuser`
- **Password:** `testPassword123!`

**Note:** You are free to create a new user with your preferred credentials

## Built With

This project was built using a range of technologies and libraries, tailored to provide a seamless and efficient user experience. Below is a list of the major technologies utilized in the frontend development of the Sequence App:

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces. The core framework that powers the app.
- [@emotion/react](https://emotion.sh/docs/@emotion/react) and [@emotion/styled](https://emotion.sh/docs/@emotion/styled) - Used for custom styling of the React components, particularly for the slider component from @mui.
- [@mui/material](https://mui.com/) - Provides a robust set of UI tools and components, including the slider component styled with Emotion.
- [Meilisearch](https://www.meilisearch.com/) - A powerful, fast, open-source, easy to use and deploy search engine that enhances the app's search functionality.
- [Vitest](https://vitest.dev/) - A Vite-native unit testing framework used for writing and executing tests to ensure the app's reliability and stability.
- [React Dropzone](https://react-dropzone.js.org/) - A highly customizable library that provides drag-and-drop file upload functionality, enhancing the user interface for file management.
- [Axios](https://axios-http.com/) - A promise-based HTTP client for making requests to back-end services, used for handling API calls efficiently.
- [React Router](https://reactrouter.com/) - For declarative routing within the application, enabling navigation between different components.

**Note:** While the backend technologies, including MySQL for the database, play a crucial role in the overall functionality of the Sequence App, this section focuses on the frontend components and libraries.

## Author

- **Keno Nitsche** - [nitscheStudio](https://github.com/nitscheStudios)
