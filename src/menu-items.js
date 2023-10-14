const menuItems = {
  admin: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/admin/dashboard",
          icon: "feather icon-home",
        },
        {
          id: "course",
          title: "Courses",
          type: "collapse",
          icon: "feather icon-file-text",
          children: [
            {
              id: "course_list",
              title: "Courses",
              type: "item",
              url: "/admin/course/list",
            },
            {
              id: "course_form",
              title: "Add Course",
              type: "item",
              url: "/admin/course/form",
            },
          ],
        },
        {
          id: "department",
          title: "Departments",
          type: "collapse",
          icon: "feather icon-server",
          children: [
            {
              id: "department_list",
              title: "Departments",
              type: "item",
              url: "/admin/department/list",
            },
            {
              id: "department_form",
              title: "Add Department",
              type: "item",
              url: "/admin/department/form",
            },
          ],
        },
        {
          id: "instructor",
          title: "Instructors",
          type: "collapse",
          icon: "feather icon-help-circle",
          children: [
            {
              id: "instructor_list",
              title: "Instructors",
              type: "item",
              url: "/admin/instructor/list",
            },
            {
              id: "instructor_form",
              title: "Add Instructor",
              type: "item",
              url: "/admin/instructor/form",
            },
          ],
        },
        {
          id: "student",
          title: "Students",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "student_list",
              title: "Students",
              type: "item",
              url: "/admin/student/list",
            },
            {
              id: "student_form",
              title: "Add Student",
              type: "item",
              url: "/admin/student/form",
            },
          ],
        },
      ],
    },
  ],
  instructor: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/instructor/dashboard",
          icon: "feather icon-home",
        },
        {
          id: "student",
          title: "Students",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "student_list",
              title: "Students",
              type: "item",
              url: "/instructor/student/list",
            },
            {
              id: "student_form",
              title: "Add Student",
              type: "item",
              url: "/instructor/student/form",
            },
          ],
        },
        {
          id: "exam",
          title: "Exams",
          type: "collapse",
          icon: "feather icon-file-text",
          children: [
            {
              id: "exam_list",
              title: "Exams",
              type: "item",
              url: "/instructor/exam/list",
            },
            {
              id: "exam_form",
              title: "Create Exam ",
              type: "item",
              url: "/instructor/exam/form",
            },
          ],
        },
        {
          id: "question",
          title: "Questions",
          type: "collapse",
          icon: "feather icon-help-circle",
          children: [
            {
              id: "question_list",
              title: "Questions",
              type: "item",
              url: "/instructor/question/list",
            },
            {
              id: "question_form",
              title: "Create Question ",
              type: "item",
              url: "/instructor/question/form",
            },
          ],
        },
      ],
    },
  ],
  student: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/admin/dashboard",
          icon: "feather icon-home",
        },
      ],
    },
  ],
};
export default menuItems;
