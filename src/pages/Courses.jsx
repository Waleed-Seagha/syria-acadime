import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Courses.css';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'جميع الدورات' },
    { id: 'math', name: 'الرياضيات' },
    { id: 'science', name: 'العلوم' },
    { id: 'arabic', name: 'اللغة العربية' },
    { id: 'english', name: 'اللغة الإنجليزية' }
  ];

  const courses = [
    {
      id: 1,
      title: 'أساسيات الرياضيات',
      category: 'math',
      instructor: 'د. أحمد محمد',
      level: 'مبتدئ',
      duration: '12 ساعة',
      image: '/img/courses/math.jpg'
    },
    {
      id: 2,
      title: 'الفيزياء الحديثة',
      category: 'science',
      instructor: 'د. سارة أحمد',
      level: 'متقدم',
      duration: '15 ساعة',
      image: '/img/courses/physics.jpg'
    },
    // يمكن إضافة المزيد من الدورات هنا
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="courses-page">
      <motion.section 
        className="courses-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            استكشف دوراتنا التعليمية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            اختر من بين مجموعة متنوعة من الدورات عالية الجودة
          </motion.p>
        </div>
      </motion.section>

      <section className="courses-content">
        <div className="container">
          <motion.div 
            className="categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          <motion.div 
            className="courses-grid"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredCourses.map(course => (
              <motion.div 
                key={course.id}
                className="course-card"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p className="instructor">المدرس: {course.instructor}</p>
                  <div className="course-meta">
                    <span className="level">{course.level}</span>
                    <span className="duration">{course.duration}</span>
                  </div>
                  <button className="btn btn-primary">التسجيل في الدورة</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Courses; 