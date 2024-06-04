import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Courses from './components/courses/Courses';
import Assessments from './components/assessments/Assessments';
import Students from './components/students/Students';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "courses",
        element: <Courses />,
        loader: async () => {
          return fetch("http://localhost:8080/api/courses")
        }
      },
      {
        path: "assessments",
        element: <Assessments />,
        loader: async () => {
          return fetch("http://localhost:8080/api/assessments")
        }
      },
      {
        path: "students",
        element: <Students />,
        loader: async () => {
          return fetch("http://localhost:8080/api/students")
        }
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
