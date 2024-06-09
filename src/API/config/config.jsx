const API_BASE_URL = process.env.REACT_APP_BASE_URL;
if (!API_BASE_URL) {
  console.error("API_BASE_URL is not defined!");
}

export const API_ENDPOINTS = {
  students: {
    read: `${API_BASE_URL}/students`,
    create: `${API_BASE_URL}/students/create`,
    update: (studentId) => `${API_BASE_URL}/students/update/${studentId}`,
    delete: (studentId) => `${API_BASE_URL}/students/delete/${studentId}`,
  },
  courses: {
    read: `${API_BASE_URL}/courses`,
    create: `${API_BASE_URL}/courses/create`,
    update: (courseId) => `${API_BASE_URL}/courses/update/${courseId}`,
    delete: (courseId) => `${API_BASE_URL}/courses/delete/${courseId}`,
  },
  assessments: {
    read: `${API_BASE_URL}/assessments`,
    create: `${API_BASE_URL}/assessments/create`,
    update: (assessmentId) => `${API_BASE_URL}/assessments/update/${assessmentId}`,
    delete: (assessmentId) => `${API_BASE_URL}/assessments/delete/${assessmentId}`,
  },
  downloadLogs: {
    download: `${API_BASE_URL}/util/download-logs`
  }
};