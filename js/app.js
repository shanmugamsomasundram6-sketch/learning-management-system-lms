// Language data
const translations = {
  en: {
    'Enroll Now': 'Enroll Now',
    'Please login first': 'Please login first',
    'Enrolled in': 'Enrolled in',
    'Already enrolled in this course': 'Already enrolled in this course',
    'Please fill in all fields': 'Please fill in all fields',
    'Welcome': 'Welcome',
    'No courses enrolled yet': 'No courses enrolled yet'
  },
  ta: {
    'Enroll Now': 'இப்போது சேர்ந்துகொள்ளுங்கள்',
    'Please login first': 'முதலில் உள்நுழையவும்',
    'Enrolled in': 'இதில் சேர்ந்துகொண்டுள்ளீர்கள்',
    'Already enrolled in this course': 'இந்தப் பாடத்தில் ஏற்கனவே சேர்ந்துள்ளீர்கள்',
    'Please fill in all fields': 'தயவுசெய்து அனைத்துப் புலங்களையும் நிரப்பவும்',
    'Welcome': 'வரவேற்கிறோம்',
    'No courses enrolled yet': 'இன்னும் எந்தப் பாடத்திலும் சேரவில்லை'
  }
};

// Sample course data with bilingual support
const courses = [
  { 
    id: 1, 
    icon: '🖥️', 
    title_en: 'Web Development', 
    title_ta: 'வெப்சைட் உருவாக்கம்',
    desc_en: 'Learn HTML, CSS & JavaScript', 
    desc_ta: 'HTML, CSS மற்றும் JavaScript கற்றுக்கொள்ளுங்கள்',
    level_en: 'Beginner', 
    level_ta: 'ஆரம்பகர்'
  },
  { 
    id: 2, 
    icon: '🐍', 
    title_en: 'Python Basics', 
    title_ta: 'பைதான் அடிப்படைகள்',
    desc_en: 'Introduction to Python programming', 
    desc_ta: 'பைதான் நிரல்வரைதலுக்கான அறிமுகம்',
    level_en: 'Beginner', 
    level_ta: 'ஆரம்பகர்'
  },
  { 
    id: 3, 
    icon: '⚛️', 
    title_en: 'React Mastery', 
    title_ta: 'React வல்லுநர்',
    desc_en: 'Build modern UIs with React', 
    desc_ta: 'React உடன் நவீன UI கட்டவும்',
    level_en: 'Intermediate', 
    level_ta: 'மধ்யதர'
  },
  { 
    id: 4, 
    icon: '🗄️', 
    title_en: 'Databases', 
    title_ta: 'தரவுத்தளம்',
    desc_en: 'SQL and NoSQL databases', 
    desc_ta: 'SQL மற்றும் NoSQL தரவுத்தளங்கள்',
    level_en: 'Intermediate', 
    level_ta: 'மதியதர'
  },
  { 
    id: 5, 
    icon: '☁️', 
    title_en: 'Cloud Computing', 
    title_ta: 'கிளவுட் கணிப்பு',
    desc_en: 'AWS and cloud deployment', 
    desc_ta: 'AWS மற்றும் கிளவுட் வரிசைப்படுத்தல்',
    level_en: 'Advanced', 
    level_ta: 'உন்னத'
  },
  { 
    id: 6, 
    icon: '🔐', 
    title_en: 'Cybersecurity', 
    title_ta: 'சைபர் பாதுகாப்பு',
    desc_en: 'Secure your applications', 
    desc_ta: 'உங்கள் பயன்பாடுகளை பாதுகாப்பாக்குங்கள்',
    level_en: 'Advanced', 
    level_ta: 'உன்னத'
  }
];

let currentLanguage = 'en';

// Load courses on page load
document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  loadDashboard();
  updateLanguagePlaceholders();
});

// Change language
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  
  // Update all language texts
  document.querySelectorAll('.lang-text').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
  
  // Update placeholders
  updateLanguagePlaceholders();
  
  // Re-render courses and dashboard
  renderCourses();
  loadDashboard();
}

// Update placeholder texts
function updateLanguagePlaceholders() {
  const placeholders = {
    studentName: currentLanguage === 'en' ? 'Enter your name' : 'உங்கள் பெயரை உள்ளிடவும்',
    studentEmail: currentLanguage === 'en' ? 'Email address' : 'மின்னஞ்சல் முகவரி'
  };
  
  document.getElementById('studentName').placeholder = placeholders.studentName;
  document.getElementById('studentEmail').placeholder = placeholders.studentEmail;
}

// Render course grid
function renderCourses() {
  const grid = document.getElementById('courseGrid');
  grid.innerHTML = courses.map(course => `
    <div class="course">
      <div class="course-icon">${course.icon}</div>
      <h3>${currentLanguage === 'en' ? course.title_en : course.title_ta}</h3>
      <p>${currentLanguage === 'en' ? course.desc_en : course.desc_ta}</p>
      <span class="tag">${currentLanguage === 'en' ? course.level_en : course.level_ta}</span>
      <button class="btn small" onclick="enrollCourse(${course.id})">${currentLanguage === 'en' ? 'Enroll Now' : 'இப்போது சேர்ந்துகொள்ளுங்கள்'}</button>
    </div>
  `).join('');
}

// Modal functions
function openLogin() {
  document.getElementById('loginModal').classList.remove('hidden');
}

function closeLogin() {
  document.getElementById('loginModal').classList.add('hidden');
}

// Login function
function login() {
  const name = document.getElementById('studentName').value;
  const email = document.getElementById('studentEmail').value;
  
  if (!name || !email) {
    const msg = currentLanguage === 'en' ? 'Please fill in all fields' : 'தயவுசெய்து அனைத்துப் புலங்களையும் நிரப்பவும்';
    alert(msg);
    return;
  }
  
  // Store in localStorage
  localStorage.setItem('student', JSON.stringify({ name, email, enrolledCourses: [], progress: [] }));
  closeLogin();
  loadDashboard();
  const welcome = currentLanguage === 'en' ? `Welcome, ${name}!` : `வரவேற்கிறோம், ${name}!`;
  alert(welcome);
}

// Enroll in course
function enrollCourse(courseId) {
  const student = JSON.parse(localStorage.getItem('student'));
  
  if (!student) {
    const msg = currentLanguage === 'en' ? 'Please login first' : 'முதலில் உள்நுழையவும்';
    alert(msg);
    openLogin();
    return;
  }
  
  const course = courses.find(c => c.id === courseId);
  const courseTitle = currentLanguage === 'en' ? course.title_en : course.title_ta;
  
  if (!student.enrolledCourses.includes(courseId)) {
    student.enrolledCourses.push(courseId);
    student.progress.push({ courseId, progress: Math.floor(Math.random() * 100) });
    localStorage.setItem('student', JSON.stringify(student));
    const msg = currentLanguage === 'en' ? `Enrolled in ${courseTitle}!` : `${courseTitle} இல் சேர்ந்துகொண்டுள்ளீர்கள்!`;
    alert(msg);
    loadDashboard();
  } else {
    const msg = currentLanguage === 'en' ? 'Already enrolled in this course' : 'இந்தப் பாடத்தில் ஏற்கனவே சேர்ந்துள்ளீர்கள்';
    alert(msg);
  }
}

// Load dashboard
function loadDashboard() {
  const student = JSON.parse(localStorage.getItem('student'));
  
  if (!student) {
    document.getElementById('courseCount').textContent = '0';
    document.getElementById('progressValue').textContent = '0%';
    document.getElementById('quizScore').textContent = '0';
    document.getElementById('certCount').textContent = '0';
    const msg = currentLanguage === 'en' ? 'Login to view your progress' : 'உங்கள் முன்னேற்றத்தைப் பார்க்க உள்நுழையவும்';
    document.getElementById('progressList').innerHTML = `<p>${msg}</p>`;
    return;
  }
  
  // Update stats
  document.getElementById('courseCount').textContent = student.enrolledCourses.length;
  
  const avgProgress = student.progress.length > 0 
    ? Math.floor(student.progress.reduce((a, p) => a + p.progress, 0) / student.progress.length)
    : 0;
  document.getElementById('progressValue').textContent = avgProgress + '%';
  document.getElementById('quizScore').textContent = Math.floor(Math.random() * 100);
  document.getElementById('certCount').textContent = Math.floor(student.enrolledCourses.length / 2);
  
  // Render progress list
  const progressList = document.getElementById('progressList');
  if (student.progress.length === 0) {
    const msg = currentLanguage === 'en' ? 'No courses enrolled yet' : 'இன்னும் எந்தப் பாடத்திலும் சேரவில்லை';
    progressList.innerHTML = `<p>${msg}</p>`;
  } else {
    progressList.innerHTML = student.progress.map(p => {
      const course = courses.find(c => c.id === p.courseId);
      const courseTitle = currentLanguage === 'en' ? course.title_en : course.title_ta;
      return `
        <div class="progress-row">
          <div class="progress-title">
            <span>${courseTitle}</span>
            <span>${p.progress}%</span>
          </div>
          <div class="bar"><i style="width: ${p.progress}%"></i></div>
        </div>
      `;
    }).join('');
  }
}

// Load saved language on page load
window.addEventListener('load', () => {
  const savedLang = localStorage.getItem('language') || 'en';
  currentLanguage = savedLang;
  document.getElementById('langSelect').value = savedLang;
  changeLanguage(savedLang);
});