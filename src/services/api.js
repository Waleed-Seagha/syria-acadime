import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// إعداد الإعدادات الافتراضية لـ axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// اعتراض الطلبات لإضافة التوكن
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// اعتراض الاستجابات للتعامل مع الأخطاء
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // خطأ من الخادم
      switch (error.response.status) {
        case 401:
          // غير مصرح
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // ممنوع
          window.location.href = '/unauthorized';
          break;
        case 404:
          // غير موجود
          window.location.href = '/not-found';
          break;
        default:
          break;
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // لم يتم استلام استجابة
      return Promise.reject({ message: 'خطأ في الاتصال بالخادم' });
    } else {
      // خطأ في إعداد الطلب
      return Promise.reject({ message: 'خطأ في إعداد الطلب' });
    }
  }
);

// خدمات المصادقة
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh-token'),
};

// خدمات الدورات
export const courseService = {
  getAllCourses: () => api.get('/courses'),
  getCourse: (id) => api.get(`/courses/${id}`),
  createCourse: (data) => api.post('/courses', data),
  updateCourse: (id, data) => api.put(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
};

// خدمات المعلمين
export const teachersService = {
  getAllTeachers: () => api.get('/teachers'),
  getTeacherById: (id) => api.get(`/teachers/${id}`),
};

// خدمات المستخدم
export const userService = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  changePassword: (data) => api.put('/user/change-password', data),
  getEnrolledCourses: () => api.get('/user/courses'),
};

// خدمات الاختبارات
export const examService = {
  getAllExams: () => api.get('/exams'),
  getExam: (id) => api.get(`/exams/${id}`),
  createExam: (data) => api.post('/exams', data),
  updateExam: (id, data) => api.put(`/exams/${id}`, data),
  deleteExam: (id) => api.delete(`/exams/${id}`),
  submitExam: (id, answers) => api.post(`/exams/${id}/submit`, answers),
};

// خدمات بنك الأسئلة
export const questionBankService = {
  getAllQuestions: () => api.get('/questions'),
  getQuestion: (id) => api.get(`/questions/${id}`),
  createQuestion: (data) => api.post('/questions', data),
  updateQuestion: (id, data) => api.put(`/questions/${id}`, data),
  deleteQuestion: (id) => api.delete(`/questions/${id}`),
};

export default api; 