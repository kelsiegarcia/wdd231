const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

function displayCourses(courses) {
  const courseList = document.getElementById("courses");
  const modal = document.getElementById("courseModal");
  const modalContent = document.getElementById("courseInfo");
  const span = document.getElementsByClassName("close")[0];

  courseList.innerHTML = "";
  courses.forEach((course) => {
    const courseItem = document.createElement("button");
    courseItem.classList.add(course.addClassList);
    courseItem.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
    courseItem.addEventListener("click", () => {
      modalContent.innerHTML = `
        <h3>${course.subject} ${course.number} ${course.title}</h3>
        <h4>${course.description}</h4>
        <p>Credits: ${course.credits}</p>
        <p>Certificate: ${course.certificate}</p>
        <p>Technology: ${course.technology.join(", ")}</p>
      `;
      modal.style.display = "block";
    });
    courseList.appendChild(courseItem);
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function updateCompletedCourses(courses) {
  courses.forEach((course) => {
    if (course.completed) {
      course.completed = true;
      course.addClassList = "finished";
    } else {
      course.completed = false;
      course.addClassList = "unfinished";
    }
  });
}

function reduceCourses(courses) {
  const totalCreditsCompleted = courses.reduce((total, course) => {
    if (course.completed) {
      return total + course.credits;
    }
    return total;
  }, 0);

  const totalCredits = courses.reduce(
    (total, course) => total + course.credits,
    0
  );

  const totalCreditsElement = document.getElementById("total-credits");
  totalCreditsElement.innerHTML = `Total number of credits completed: ${totalCreditsCompleted} / ${totalCredits} credits`;
}

function filterCourses(courses) {
  // Get the buttons
  const certButton = document.getElementById("cse");
  const wddButton = document.getElementById("wdd");
  const allButton = document.getElementById("all");

  // depending on what button is clicked, filter courses
  if (certButton) {
    certButton.addEventListener("click", () => {
      const cseCourses = courses.filter((course) => course.subject === "CSE");
      //display the filtered courses
      displayCourses(cseCourses);
    });
  }
  if (wddButton) {
    wddButton.addEventListener("click", () => {
      const wddCourses = courses.filter((course) => course.subject === "WDD");
      displayCourses(wddCourses);
    });
  }
  if (allButton) {
    allButton.addEventListener("click", () => {
      displayCourses(courses);
    });
  }
}

updateCompletedCourses(courses);
displayCourses(courses);
filterCourses(courses);
reduceCourses(courses);
