// Course Catalog Manager - Core Implementation
// Code copied from Week8a Assignment Guide
// Comments added using GenAI tools to explain the structure and logic of the code


// the class encapsulates all the logic for managing the course catalog
class CourseCatalogManager {
    constructor() {
        // initialize properties used throughout the class
        this.courseCatalog = null;      // will hold the full catalog object
        this.filteredCourses = [];      // array of courses after search/filter
        this.currentView = 'all';       // keeps track of current filter view
        this.searchCache = new Map();   // store previous search results for speed
        this.initializeApp();           // start the application
    }

    // set up event listeners and load initial data
    initializeApp() {
        try {
            this.setupEventListeners(); // wire up buttons, inputs, etc.
            this.loadSampleData();      // get some sample JSON to display
            this.displayStatistics();   // show initial stats on page
        } catch (error) {
            this.handleError('Application initialization failed', error);
        }
    }

    // fetch the sample JSON data from a local file and load it into the catalog
    async loadSampleData() {
      try {
        const response = await fetch('sample-data.json');
        const data = await response.json();

        this.loadCourseData(JSON.stringify(data));

      } catch (error) {
        this.handleError('Failed to load sample data', error);
      }
    } 

    // takes a JSON string and reads it into the catalog
    async loadCourseData(jsonString) {
        try {
            // make sure a string was actually passed
            if (!jsonString || typeof jsonString !== 'string') {
                throw new Error('Invalid input: JSON string required');
            }
            // parse the string into a JavaScript object
            const data = JSON.parse(jsonString);
            // check the object has the shape we expect
            this.validateCatalogStructure(data);
            // store the valid data
            this.courseCatalog = data;
            // build a flat list of every course
            this.filteredCourses = this.getAllCourses();
            // render the courses and statistics
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

    // ensure the main JSON object has required top‑level fields
    validateCatalogStructure(data) {
        const required = ['university', 'semester', 'departments', 'metadata'];
        const missing = required.filter(field => !data.hasOwnProperty(field));
        if (missing.length > 0) {
            throw new Error('Missing required fields: ' + missing.join(', '));
        }
        if (!Array.isArray(data.departments) || data.departments.length === 0) {
            throw new Error('Departments array is required and must contain at least one department');
        }
        // check each department inside the array
        data.departments.forEach((dept, index) => {
            if (!dept.code || !dept.name || !Array.isArray(dept.courses)) {
                throw new Error('Department ' + index + ' missing required fields');
            }
        });
    }

    // build and return a flat list of all course objects with dept info
    getAllCourses() {
        if (!this.courseCatalog) return []; // nothing loaded yet
        const allCourses = [];
        this.courseCatalog.departments.forEach(dept => {
            dept.courses.forEach(course => {
                allCourses.push({
                    ...course,                   // copy the course fields
                    departmentCode: dept.code,   // add department code
                    departmentName: dept.name    // add department name
                });
            });
        });
        return allCourses; // return the combined array
    }

    // filter courses based on a search query string
    searchCourses(query) {
        if (!query || query.trim().length === 0) {
            // empty query means reset to all courses
            this.filteredCourses = this.getAllCourses();
            this.displayAllCourses();
            return;
        }
        const searchTerm = query.toLowerCase().trim(); // normalize
        // if we've searched for this term before, reuse results
        if (this.searchCache.has(searchTerm)) {
            this.filteredCourses = this.searchCache.get(searchTerm);
            this.displayAllCourses();
            return;
        }
        // perform the actual filtering by checking several fields
        const results = this.getAllCourses().filter(course => {
            return course.courseCode.toLowerCase().includes(searchTerm) ||
                course.title.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm) ||
                course.instructor.name.toLowerCase().includes(searchTerm) ||
                course.topics.some(topic => topic.toLowerCase().includes(searchTerm)) ||
                course.departmentName.toLowerCase().includes(searchTerm);
        });
        // save the results for later
        this.searchCache.set(searchTerm, results);
        this.filteredCourses = results;
        this.displayAllCourses();
        this.updateSearchStats(searchTerm, results.length);
    }
    
    // show search result count in console
    updateSearchStats(term, count) {
      console.log("Search for '" + term + "' returned " + count + " results");
    } 

    // create a DOM element representing a course card
    createCourseCard(course) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'course-card';      // assign CSS class
        cardDiv.dataset.courseCode = course.courseCode; // store code for reference
        // calculate how full the course is
        const enrollmentPercent = Math.round((course.schedule.enrolled /
            course.schedule.capacity) * 100);
        const enrollmentStatus = enrollmentPercent >= 90 ? 'full' :
            enrollmentPercent >= 70 ? 'filling' : 'open';
        // build the inner HTML using template strings
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
            '<button class="details-btn" onclick="app.showCourseDetails(\'' +
            course.courseCode + '\')">' +
            'View Details' +
            '</button>';
        cardDiv.innerHTML = cardHTML; // insert the HTML into the div
        return cardDiv;               // return the complete card element
    }

    // render the courses currently stored in filteredCourses
    displayAllCourses() {
        const container = document.getElementById('coursesContainer');
        if (!container) {
            console.error('Courses container not found');
            return;
        }
        container.innerHTML = ''; // clear previous content
        if (this.filteredCourses.length === 0) {
            // if no courses match, show a message
            container.innerHTML = '<div class="no-results">No courses found matching your criteria.</div>';
            return;
        }
        // otherwise, create and append a card for each course
        this.filteredCourses.forEach(course => {
            const courseCard = this.createCourseCard(course);
            container.appendChild(courseCard);
        });
        this.updateDisplayStats(); // update any on-screen statistics
        

    }

    //-----------------------//
    //Assignment requirements:
        
    // shorten long text so course cards stay compact
    truncateText(text, maxLength) {
      if (!text) return "";
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + "...";
    }

    // calculate and display catalog statistics
    displayStatistics() {
      if (!this.courseCatalog) return;
      const courses = this.getAllCourses();
      const totalCourses = courses.length;
      const totalDepartments =
        this.courseCatalog.departments.length;

      // simple average enrollment calculation
      let totalPercent = 0;
          
      courses.forEach(course => {
        totalPercent +=
          (course.schedule.enrolled /
          course.schedule.capacity);
      });

      const avgEnrollment =
        Math.round((totalPercent / totalCourses) * 100);

       document.getElementById("totalCourses").textContent =
         totalCourses;

      document.getElementById("totalDepartments").textContent =
         totalDepartments;

      document.getElementById("averageEnrollment").textContent =
      avgEnrollment + "%";
     }

    // update display stats after filtering or searching
    updateDisplayStats() {
      this.displayStatistics();
    }

    // connect page controls to functions
    setupEventListeners() {

      // search box
       const searchInput =
        document.getElementById("searchInput");

       if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          this.searchCourses(e.target.value);
        });
        }

       // clear search button
       const clearBtn =
          document.getElementById("clearSearchBtn");

      if (clearBtn) {
         clearBtn.addEventListener("click", () => {
          searchInput.value = "";
           this.searchCourses("");
        });
      }

      // department filter
       const deptFilter =
        document.getElementById("departmentFilter");

       if (deptFilter) {
         deptFilter.addEventListener("change", (e) => {
          this.filterByDepartment(e.target.value);
         });
       }

      // credit filter
      const creditFilter =
         document.getElementById("creditsFilter");

      if (creditFilter) {
        creditFilter.addEventListener("change", (e) => {
           this.filterByCredits(e.target.value);
        });
       }

    }

    // filter courses by department
     filterByDepartment(code) {
      if (code === "all") {
         this.filteredCourses = this.getAllCourses();
       }

       else {
        this.filteredCourses =
           this.getAllCourses().filter(course =>
             course.departmentCode === code
          );
       }

      this.displayAllCourses();
    }

    // filter courses based on credit hours
    filterByCredits(credits) {

     if (credits === "all") {
      this.filteredCourses = this.getAllCourses();
     }
    else {
      this.filteredCourses =
         this.getAllCourses().filter(course =>
          course.credits == credits
        );
     }

    this.displayAllCourses();
    }

    // display basic course details
    showCourseDetails(courseCode) {
      const course = this.getAllCourses().find(
        c => c.courseCode === courseCode
      );

      if (!course) {
        alert("Course not found");
        return;
      }

      alert(
        course.courseCode + "\n" +
        course.title + "\n\n" +
        course.description
      );
    } 

    // show a success message in console
    showSuccessMessage(message) {
       console.log(message);
    }

    // handle errors in a simple way
    handleError(message, error) {
       console.error(message, error);
        alert(message);
   }
}

// when the web page has finished loading, create the manager
document.addEventListener('DOMContentLoaded', function() {
    window.app = new CourseCatalogManager();
});
