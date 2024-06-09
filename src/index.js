import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Courses from './pages/courses/Courses';
import Assessments from './pages/assessments/Assessments';
import Students from './pages/students/Students';
import AssessmentsForStudent from './pages/assessments/components/AssessmentsForStudent';
import PageNotFound from './pages/PageNotFound';
import { API_ENDPOINTS } from './API/config/config';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "courses",
        element: <Courses />,
        loader: async () => {
          return fetch(API_ENDPOINTS.courses.read)
        }
      },
      {
        path: "assessments",
        element: <Assessments />,
        loader: async () => {
          return fetch(API_ENDPOINTS.assessments.read)
        }
      },
      {
        path: "students",
        element: <Students />,
        loader: async () => {
          return fetch(API_ENDPOINTS.students.read)
        }
      },
      {
        path: "/download-logs",
        element: <></>,
        loader: async () => {
          const response = await fetch(API_ENDPOINTS.downloadLogs.download);
          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'logs.txt';
            a.click();
            window.URL.revokeObjectURL(url);
          } else {
            console.error('Failed to download logs');
          }
          return null;
        },
      },
      {
        path: "assessments/student/:id",
        element: <AssessmentsForStudent />,
        loader: async ({ params }) => {
          const response = await fetch(`http://localhost:8080/api/assessments/student/${params.id}`);
          return response.json();
        }
      },
      {
        path: "/1",
        element: <PageNotFound />
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
