import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import StudentSidebar from '../../components/student/StudentSidebar';
import SmartDataGrid from '../../components/common/SmartDataGrid';
import '../../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState({
    averageGrade: 0,
    activeCourses: 0,
    completedLessons: 0,
    upcomingExams: 0
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة جلب البيانات من الخادم
    const fetchDashboardData = async () => {
      try {
        // بيانات إحصائية وهمية
        setStats({
          averageGrade: 85,
          activeCourses: 4,
          completedLessons: 32,
          upcomingExams: 2
        });

        // دورات حديثة وهمية
        setRecentCourses([
          { id: 1, title: 'الرياضيات المتقدمة', progress: 75, nextLesson: '2024-03-20' },
          { id: 2, title: 'الفيزياء النووية', progress: 60, nextLesson: '2024-03-22' },
          { id: 3, title: 'الكيمياء العضوية', progress: 85, nextLesson: '2024-03-25' }
        ]);

        // اختبارات قادمة وهمية
        setUpcomingExams([
          { id: 1, title: 'اختبار الرياضيات النهائي', date: '2024-04-01', duration: 60 },
          { id: 2, title: 'اختبار العلوم الفصلي', date: '2024-03-25', duration: 45 }
        ]);

        // إشعارات وهمية
        setNotifications([
          { id: 1, title: 'واجب جديد', message: 'تم نشر واجب جديد في مادة الرياضيات', date: '2024-03-18' },
          { id: 2, title: 'تذكير بالاختبار', message: 'اختبار العلوم غداً الساعة 10 صباحاً', date: '2024-03-19' }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const courseColumns = [
    { field: 'title', headerName: 'اسم المادة', flex: 1 },
    {
      field: 'progress',
      headerName: 'التقدم',
      flex: 1,
      renderCell: (params) => (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${params.value}%` }}
          />
          <span>{params.value}%</span>
        </div>
      )
    },
    {
      field: 'nextLesson',
      headerName: 'الدرس القادم',
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString('ar-SA')
    }
  ];

  const examColumns = [
    { field: 'title', headerName: 'عنوان الاختبار', flex: 1 },
    {
      field: 'date',
      headerName: 'التاريخ',
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString('ar-SA')
    },
    {
      field: 'duration',
      headerName: 'المدة',
      flex: 1,
      renderCell: (params) => `${params.value} دقيقة`
    }
  ];

  return (
    <div className={`student-dashboard ${isDarkMode ? 'dark' : ''}`}>
      <StudentSidebar />
      <div className="dashboard-content">
        <header>
          <h1>لوحة التحكم</h1>
          <div className="date">اليوم: {new Date().toLocaleDateString('ar-SA')}</div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>المعدل العام</h3>
              <p>{stats.averageGrade}%</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>المواد النشطة</h3>
              <p>{stats.activeCourses}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>الدروس المكتملة</h3>
              <p>{stats.completedLessons}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>الاختبارات القادمة</h3>
              <p>{stats.upcomingExams}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="recent-courses">
            <h2>المواد النشطة</h2>
            <SmartDataGrid
              rows={recentCourses}
              columns={courseColumns}
              loading={loading}
              pageSize={5}
            />
          </div>

          <div className="upcoming-exams">
            <h2>الاختبارات القادمة</h2>
            <SmartDataGrid
              rows={upcomingExams}
              columns={examColumns}
              loading={loading}
              pageSize={5}
            />
          </div>
        </div>

        <div className="notifications">
          <h2>الإشعارات</h2>
          <div className="notifications-list">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-card">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <span className="notification-date">
                    {new Date(notification.date).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <p>{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 