// Sample course data
const courses = [
  { id: 1, icon: '🖥️', title: 'Web Development', desc: 'Learn HTML, CSS & JavaScript', level: 'Beginner' },
  { id: 2, icon: '🐍', title: 'Python Basics', desc: 'Introduction to Python programming', level: 'Beginner' },
  { id: 3, icon: '⚛️', title: 'React Mastery', desc: 'Build modern UIs with React', level: 'Intermediate' },
  { id: 4, icon: '🗄️', title: 'Databases', desc: 'SQL and NoSQL databases', level: 'Intermediate' },
  { id: 5, icon: '☁️', title: 'Cloud Computing', desc: 'AWS and cloud deployment', level: 'Advanced' },
  { id: 6, icon: '🔐', title: 'Cybersecurity', desc: 'Secure your applications', level: 'Advanced' }
];

// Load courses on page load
document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  loadDashboard();
});

// Render course grid
function renderCourses() {
  const grid = document.getElementById('courseGrid');
  grid.innerHTML = courses.map(course => `
    <div class="course">
      <div class="course-icon">${course.icon}</div>
      <h3>${course.title}</h3>
      <p>${course.desc}</p>
      <span class="tag">${course.level}</span>
      <button class="btn small" onclick="enrollCourse(${course.id})">Enroll Now</button>
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
    alert('Please fill in all fields');
    return;
  }
  
  // Store in localStorage
  localStorage.setItem('student', JSON.stringify({ name, email, enrolledCourses: [], progress: [] }));
  closeLogin();
  loadDashboard();
  alert(`Welcome, ${name}!`);
}

// Enroll in course
function enrollCourse(courseId) {
  const student = JSON.parse(localStorage.getItem('student'));
  
  if (!student) {
    alert('Please login first');
    openLogin();
    return;
  }
  
  const course = courses.find(c => c.id === courseId);
  if (!student.enrolledCourses.includes(courseId)) {
    student.enrolledCourses.push(courseId);
    student.progress.push({ courseId, progress: Math.floor(Math.random() * 100) });
    localStorage.setItem('student', JSON.stringify(student));
    alert(`Enrolled in ${course.title}!`);
    loadDashboard();
  } else {
    alert('Already enrolled in this course');
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
    document.getElementById('progressList').innerHTML = '<p>Login to view your progress</p>';
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
    progressList.innerHTML = '<p>No courses enrolled yet</p>';
  } else {
    progressList.innerHTML = student.progress.map(p => {
      const course = courses.find(c => c.id === p.courseId);
      return `
        <div class="progress-row">
          <div class="progress-title">
            <span>${course.title}</span>
            <span>${p.progress}%</span>
          </div>
          <div class="bar"><i style="width: ${p.progress}%"></i></div>
        </div>
      `;
    }).join('');
  }
}