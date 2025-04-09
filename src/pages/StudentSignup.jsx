import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/StudentSignup.css';

function StudentSignup() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    birthDate: '',
    educationLevel: '',
    school: '',
    interests: [],
    profileImage: null,
    activationCode: ''
  });
  const [errors, setErrors] = useState({});
  const [showActivation, setShowActivation] = useState(false);

  const educationLevels = [
    'الابتدائي',
    'الإعدادي',
    'الثانوي'
  ];

  const interests = [
    'الرياضيات',
    'العلوم',
    'اللغة العربية',
    'اللغة الإنجليزية',
    'الفيزياء',
    'الكيمياء',
    'البيولوجيا',
    'التاريخ',
    'الجغرافيا',
    'الفنون',
    'البرمجة'
  ];

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'الاسم الكامل مطلوب';
    if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';
    if (formData.password.length < 8) newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    if (!/[A-Z]/.test(formData.password)) newErrors.password = 'يجب أن تحتوي كلمة المرور على حرف كبير على الأقل';
    if (!/[a-z]/.test(formData.password)) newErrors.password = 'يجب أن تحتوي كلمة المرور على حرف صغير على الأقل';
    if (!/[0-9]/.test(formData.password)) newErrors.password = 'يجب أن تحتوي كلمة المرور على رقم على الأقل';
    if (!formData.birthDate) newErrors.birthDate = 'تاريخ الميلاد مطلوب';
    if (!formData.educationLevel) newErrors.educationLevel = 'المرحلة الدراسية مطلوبة';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1 && !validateStep1()) return;
    
    if (step === 3) {
      if (!formData.activationCode) {
        setErrors({ activationCode: 'رمز التفعيل مطلوب' });
        return;
      }
      // هنا سيتم التحقق من رمز التفعيل مع الخادم
    }

    if (step < 3) {
      setStep(step + 1);
      if (step === 2) {
        setShowActivation(true);
        // محاكاة إرسال رمز التفعيل
        console.log('Activation code sent to:', formData.email);
      }
    } else {
      // إرسال البيانات إلى الخادم
      try {
        // محاكاة إرسال البيانات
        console.log('Form submitted:', formData);
        navigate('/student/dashboard');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (type === 'checkbox') {
      const { checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // مسح خطأ الحقل عند التعديل
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className={`student-signup ${theme}`}>
      <div className="signup-container">
        <h1>تسجيل الطالب</h1>
        <div className="progress-bar">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label>الاسم الكامل</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>كلمة المرور</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>تاريخ الميلاد</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={errors.birthDate ? 'error' : ''}
                />
                {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
              </div>

              <div className="form-group">
                <label>المرحلة الدراسية</label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className={errors.educationLevel ? 'error' : ''}
                >
                  <option value="">اختر المرحلة</option>
                  {educationLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.educationLevel && <span className="error-message">{errors.educationLevel}</span>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label>المدرسة/المؤسسة التعليمية</label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>الاهتمامات التعليمية</label>
                <div className="checkbox-group">
                  {interests.map(interest => (
                    <label key={interest} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest}
                        checked={formData.interests.includes(interest)}
                        onChange={handleChange}
                      />
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>الصورة الشخصية</label>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {step === 3 && showActivation && (
            <div className="form-step">
              <div className="form-group">
                <label>رمز التفعيل</label>
                <input
                  type="text"
                  name="activationCode"
                  value={formData.activationCode}
                  onChange={handleChange}
                  className={errors.activationCode ? 'error' : ''}
                />
                {errors.activationCode && <span className="error-message">{errors.activationCode}</span>}
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} className="back-button">
                رجوع
              </button>
            )}
            <button type="submit" className="submit-button">
              {step === 3 ? 'تفعيل الحساب' : 'التالي'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentSignup; 