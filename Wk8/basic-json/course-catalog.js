// Course Catalog Manager - Core Implementation
// Copied form Week8a Assignment Guide

class CourseCatalogManager {
constructor() {
this.courseCatalog = null;
this.filteredCourses = [];
this.currentView = 'all';
this.searchCache = new Map();
this.initializeApp();
}
initializeApp() {
try {
this.setupEventListeners();
this.loadSampleData();
this.displayStatistics();
} catch (error) {
this.handleError('Application initialization failed', error);
}
}
async loadCourseData(jsonString) {
try {
// Validate JSON format first
if (!jsonString || typeof jsonString !== 'string') {
throw new Error('Invalid input: JSON string required');
}
// Parse JSON with error handling
const data = JSON.parse(jsonString);
// Validate required structure
this.validateCatalogStructure(data);
// Store data and update display
this.courseCatalog = data;
this.filteredCourses = this.getAllCourses();
this.displayAllCourses();
this.displayStatistics();
console.log('Course catalog loaded successfully');
this.showSuccessMessage('Course catalog loaded with ' +
this.filteredCourses.length + ' courses');
} catch (error) {
console.error('JSON parsing error:', error);
this.handleError('Failed to load course data', error);
}
}
validateCatalogStructure(data) {
const required = ['university', 'semester', 'departments', 'metadata'];
const missing = required.filter(field => !data.hasOwnProperty(field));
if (missing.length > 0) {
throw new Error('Missing required fields: ' + missing.join(', '));
}
if (!Array.isArray(data.departments) || data.departments.length === 0) {
throw new Error('Departments array is required and must contain at least
one department');
}
// Validate each department structure
data.departments.forEach((dept, index) => {
if (!dept.code || !dept.name || !Array.isArray(dept.courses)) {
throw new Error('Department ' + index + ' missing required fields');
}
});
}
getAllCourses() {
if (!this.courseCatalog) return [];
const allCourses = [];
this.courseCatalog.departments.forEach(dept => {
dept.courses.forEach(course => {
allCourses.push({
...course,
departmentCode: dept.code,
departmentName: dept.name
});
});
});
return allCourses;
}
searchCourses(query) {
if (!query || query.trim().length === 0) {
this.filteredCourses = this.getAllCourses();
this.displayAllCourses();
return;
}
const searchTerm = query.toLowerCase().trim();
// Check cache for performance
if (this.searchCache.has(searchTerm)) {
this.filteredCourses = this.searchCache.get(searchTerm);
this.displayAllCourses();
return;
}
// Perform comprehensive search
const results = this.getAllCourses().filter(course => {
return course.courseCode.toLowerCase().includes(searchTerm) ||
course.title.toLowerCase().includes(searchTerm) ||
course.description.toLowerCase().includes(searchTerm) ||
course.instructor.name.toLowerCase().includes(searchTerm) ||
course.topics.some(topic => topic.toLowerCase().includes(searchTerm)) ||
course.departmentName.toLowerCase().includes(searchTerm);
});
// Cache results
this.searchCache.set(searchTerm, results);
this.filteredCourses = results;
this.displayAllCourses();
this.updateSearchStats(searchTerm, results.length);
}
createCourseCard(course) {
const cardDiv = document.createElement('div');
cardDiv.className = 'course-card';
cardDiv.dataset.courseCode = course.courseCode;
// Calculate enrollment percentage
const enrollmentPercent = Math.round((course.schedule.enrolled /
course.schedule.capacity) * 100);
const enrollmentStatus = enrollmentPercent >= 90 ? 'full' :
enrollmentPercent >= 70 ? 'filling' : 'open';
const cardHTML =
'<div class="course-header">' +
'<h3 class="course-code">' + course.courseCode + '</h3>' +
'<span class="credits">' + course.credits + ' credits</span>' +
'</div>' +
'<h4 class="course-title">' + course.title + '</h4>' +
'<p class="course-description">' + this.truncateText(course.description,
120) + '</p>' +
'<div class="instructor-info">' +
'<strong>Instructor:</strong> ' + course.instructor.name +
'</div>' +
'<div class="schedule-info">' +
'<strong>Schedule:</strong> ' + course.schedule.days.join(', ') + ' ' +
course.schedule.time +
'</div>' +
'<div class="enrollment-info ' + enrollmentStatus + '">' +
'Enrolled: ' + course.schedule.enrolled + '/' + course.schedule.capacity
+ ' (' + enrollmentPercent + '%)' +
'</div>' +
'<div class="topics">' +
course.topics.map(topic => '<span class="topic-tag">' + topic +
'</span>').join('') +
'</div>' +
'<button class="details-btn" onclick="app.showCourseDetails('' +
course.courseCode + '')">' +
'View Details' +
'</button>';
cardDiv.innerHTML = cardHTML;
return cardDiv;
}
displayAllCourses() {
const container = document.getElementById('coursesContainer');
if (!container) {
console.error('Courses container not found');
return;
}
container.innerHTML = '';
if (this.filteredCourses.length === 0) {
container.innerHTML = '<div class="no-results">No courses found matching
your criteria.</div>';
return;
}
this.filteredCourses.forEach(course => {
const courseCard = this.createCourseCard(course);
container.appendChild(courseCard);
});
this.updateDisplayStats();
}
}
// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
window.app = new CourseCatalogManager();
});