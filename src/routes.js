import React from "react";
import $ from "jquery";

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

const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "dashboard",
    component: DashboardDefault,
  },
  {
    path: "/course/list",
    exact: true,
    name: "course",
    component: CourseList,
  },
  {
    path: "/course/form",
    exact: true,
    name: "course",
    component: CourseForm,
  },
  {
    path: "/course/edit/:id",
    exact: true,
    name: "course",
    component: CourseForm,
  },
  {
    path: "/department/list",
    exact: true,
    name: "department",
    component: DepartmentList,
  },
  {
    path: "/department/form",
    exact: true,
    name: "department",
    component: DepartmentForm,
  },
  {
    path: "/department/edit/:id",
    exact: true,
    name: "department",
    component: DepartmentForm,
  },
  {
    path: "/instructor/list",
    exact: true,
    name: "instructor",
    component: InstructorList,
  },
  {
    path: "/instructor/form",
    exact: true,
    name: "instructor",
    component: InstrucorForm,
  },
  {
    path: "/student/list",
    exact: true,
    name: "student",
    component: StudentList,
  },
  {
    path: "/student/form",
    exact: true,
    name: "student",
    component: StudentForm,
  },
  {
    path: "/basic/button",
    exact: true,
    name: "Basic Button",
    component: UIBasicButton,
  },
  {
    path: "/basic/badges",
    exact: true,
    name: "Basic Badges",
    component: UIBasicBadges,
  },
  {
    path: "/basic/breadcrumb-paging",
    exact: true,
    name: "Basic Breadcrumb Pagination",
    component: UIBasicBreadcrumbPagination,
  },
  {
    path: "/basic/collapse",
    exact: true,
    name: "Basic Collapse",
    component: UIBasicCollapse,
  },
  {
    path: "/basic/tabs-pills",
    exact: true,
    name: "Basic Tabs & Pills",
    component: UIBasicTabsPills,
  },
  {
    path: "/basic/typography",
    exact: true,
    name: "Basic Typography",
    component: UIBasicBasicTypography,
  },
  {
    path: "/forms/form-basic",
    exact: true,
    name: "Forms Elements",
    component: FormsElements,
  },
  {
    path: "/tables/bootstrap",
    exact: true,
    name: "Bootstrap Table",
    component: BootstrapTable,
  },
  {
    path: "/charts/nvd3",
    exact: true,
    name: "Nvd3 Chart",
    component: Nvd3Chart,
  },
  {
    path: "/maps/google-map",
    exact: true,
    name: "Google Map",
    component: GoogleMap,
  },
  {
    path: "/sample-page",
    exact: true,
    name: "Sample Page",
    component: OtherSamplePage,
  },
  { path: "/docs", exact: true, name: "Documentation", component: OtherDocs },
];

export default routes;
