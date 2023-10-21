import React from "react";
import $ from "jquery";
import ExamScreen from "./Components/Student/Exam/exam_screen";
import PastExamInstructor from "./Components/Instructor/Exam/past_exam";
import StudentResult from "./Components/Instructor/Exam/student_result";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));

const UIBasicButton = React.lazy(() =>
  import("./Demo/UIElements/Basic/Button")
);
const UIBasicBadges = React.lazy(() =>
  import("./Demo/UIElements/Basic/Badges")
);
const UIBasicBreadcrumbPagination = React.lazy(() =>
  import("./Demo/UIElements/Basic/BreadcrumbPagination")
);

const UIBasicCollapse = React.lazy(() =>
  import("./Demo/UIElements/Basic/Collapse")
);
const UIBasicTabsPills = React.lazy(() =>
  import("./Demo/UIElements/Basic/TabsPills")
);
const UIBasicBasicTypography = React.lazy(() =>
  import("./Demo/UIElements/Basic/Typography")
);

const FormsElements = React.lazy(() => import("./Demo/Forms/FormsElements"));

const BootstrapTable = React.lazy(() => import("./Demo/Tables/BootstrapTable"));

const Nvd3Chart = React.lazy(() => import("./Demo/Charts/Nvd3Chart/index"));

const GoogleMap = React.lazy(() => import("./Demo/Maps/GoogleMap/index"));

const OtherSamplePage = React.lazy(() => import("./Demo/Other/SamplePage"));
const OtherDocs = React.lazy(() => import("./Demo/Other/Docs"));

// //////////////////////////////////////////////// admin

const CourseList = React.lazy(() =>
  import("./Components/Admin/Courses/course_list")
);
const CourseForm = React.lazy(() =>
  import("./Components/Admin/Courses/course_form")
);
const DepartmentList = React.lazy(() =>
  import("./Components/Admin/Department/department_list")
);
const DepartmentForm = React.lazy(() =>
  import("./Components/Admin/Department/department_form")
);
const InstructorList = React.lazy(() =>
  import("./Components/Admin/Instructor/instructor_list")
);
const InstrucorForm = React.lazy(() =>
  import("./Components/Admin/Instructor/instrucor_form")
);
const StudentList = React.lazy(() =>
  import("./Components/Admin/Students/student_list")
);
const StudentForm = React.lazy(() =>
  import("./Components/Admin/Students/student_form")
);

// //////////////////////////////////////////////// Instructor

const InstructorStudentList = React.lazy(() =>
  import("./Components/Instructor/Student/student_list")
);
const InstructorStudentForm = React.lazy(() =>
  import("./Components/Instructor/Student/student_form")
);

const ExamForm = React.lazy(() => import("./Components/Instructor/Exam/form"));
const ExamList = React.lazy(() => import("./Components/Instructor/Exam/list"));
const QuestionList = React.lazy(() =>
  import("./Components/Instructor/Question/list")
);
const QuestionForm = React.lazy(() =>
  import("./Components/Instructor/Question/form")
);

// //////////////////////////////////////////////// Student

const UpcomingExamList = React.lazy(() =>
  import("./Components/Student/Exam/upcoming_exam_list")
);
const PastExamList = React.lazy(() =>
  import("./Components/Student/Exam/past_exam_list")
);

const routes = [
  {
    path: "/admin/dashboard",
    exact: true,
    name: "dashboard",
    component: DashboardDefault,
  },
  {
    path: "/admin/course/list",
    exact: true,
    name: "course",
    component: CourseList,
  },
  {
    path: "/admin/course/form",
    exact: true,
    name: "course",
    component: CourseForm,
  },
  {
    path: "/admin/course/edit/:id",
    exact: true,
    name: "course",
    component: CourseForm,
  },
  {
    path: "/admin/department/list",
    exact: true,
    name: "department",
    component: DepartmentList,
  },
  {
    path: "/admin/department/form",
    exact: true,
    name: "department",
    component: DepartmentForm,
  },
  {
    path: "/admin/department/edit/:id",
    exact: true,
    name: "department",
    component: DepartmentForm,
  },
  {
    path: "/admin/instructor/list",
    exact: true,
    name: "instructor",
    component: InstructorList,
  },
  {
    path: "/admin/instructor/form",
    exact: true,
    name: "instructor",
    component: InstrucorForm,
  },
  {
    path: "/admin/instructor/edit/:id",
    exact: true,
    name: "instructor",
    component: InstrucorForm,
  },
  {
    path: "/admin/student/list",
    exact: true,
    name: "student",
    component: StudentList,
  },
  // {
  //   path: "/admin/student/form",
  //   exact: true,
  //   name: "student",
  //   component: StudentForm,
  // },
  // {
  //   path: "/admin/student/edit/:id",
  //   exact: true,
  //   name: "student",
  //   component: StudentForm,
  // },
  {
    path: "/instructor/dashboard",
    exact: true,
    name: "dashboard",
    component: DashboardDefault,
  },
  {
    path: "/instructor/student/list",
    exact: true,
    name: "student",
    component: InstructorStudentList,
  },
  {
    path: "/instructor/student/form",
    exact: true,
    name: "student",
    component: InstructorStudentForm,
  },
  {
    path: "/instructor/student/edit/:id",
    exact: true,
    name: "student",
    component: InstructorStudentForm,
  },
  {
    path: "/instructor/exam/list",
    exact: true,
    name: "exam",
    component: ExamList,
  },
  {
    path: "/instructor/past-exam/list",
    exact: true,
    name: "exam",
    component: PastExamInstructor,
  },
  {
    path: "/instructor/result/list/:id",
    exact: true,
    name: "exam",
    component: StudentResult,
  },
  {
    path: "/instructor/exam/form",
    exact: true,
    name: "exam",
    component: ExamForm,
  },
  {
    path: "/instructor/exam/edit/:id",
    exact: true,
    name: "exam",
    component: ExamForm,
  },
  {
    path: "/instructor/question/list",
    exact: true,
    name: "question",
    component: QuestionList,
  },
  {
    path: "/instructor/question/form",
    exact: true,
    name: "question",
    component: QuestionForm,
  },
  {
    path: "/instructor/question/edit/:id",
    exact: true,
    name: "dashboquestionard",
    component: QuestionForm,
  },
  {
    path: "/student/dashboard",
    exact: true,
    name: "dashboard",
    component: DashboardDefault,
  },
  {
    path: "/student/exam/list",
    exact: true,
    name: "exam",
    component: UpcomingExamList,
  },
  {
    path: "/student/past-exam/list",
    exact: true,
    name: "exam",
    component: PastExamList,
  },
  {
    path: "/student/exam-screen/:id",
    exact: true,
    name: "exam",
    component: ExamScreen,
  },

  // {
  //   path: "/basic/button",
  //   exact: true,
  //   name: "Basic Button",
  //   component: UIBasicButton,
  // },
  // {
  //   path: "/basic/badges",
  //   exact: true,
  //   name: "Basic Badges",
  //   component: UIBasicBadges,
  // },
  // {
  //   path: "/basic/breadcrumb-paging",
  //   exact: true,
  //   name: "Basic Breadcrumb Pagination",
  //   component: UIBasicBreadcrumbPagination,
  // },
  // {
  //   path: "/basic/collapse",
  //   exact: true,
  //   name: "Basic Collapse",
  //   component: UIBasicCollapse,
  // },
  // {
  //   path: "/basic/tabs-pills",
  //   exact: true,
  //   name: "Basic Tabs & Pills",
  //   component: UIBasicTabsPills,
  // },
  // {
  //   path: "/basic/typography",
  //   exact: true,
  //   name: "Basic Typography",
  //   component: UIBasicBasicTypography,
  // },
  // {
  //   path: "/forms/form-basic",
  //   exact: true,
  //   name: "Forms Elements",
  //   component: FormsElements,
  // },
  // {
  //   path: "/tables/bootstrap",
  //   exact: true,
  //   name: "Bootstrap Table",
  //   component: BootstrapTable,
  // },
  // {
  //   path: "/charts/nvd3",
  //   exact: true,
  //   name: "Nvd3 Chart",
  //   component: Nvd3Chart,
  // },
  // {
  //   path: "/maps/google-map",
  //   exact: true,
  //   name: "Google Map",
  //   component: GoogleMap,
  // },
  // {
  //   path: "/sample-page",
  //   exact: true,
  //   name: "Sample Page",
  //   component: OtherSamplePage,
  // },
  // { path: "/docs", exact: true, name: "Documentation", component: OtherDocs },
];

export default routes;
