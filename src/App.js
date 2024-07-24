import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Layout } from "./components/common/Layout";
import { Home } from "./pages/Home";
import { BlogSinglePage } from "./components/common/BlogSinglePage";
import { About } from "./pages/About";
import { Courses } from "./pages/Courses";
import { Blog } from "./pages/Blog";
import { Instructor } from "./pages/Instructor";
import PageNotFound from "./pagesGrade/PageNotFound";

import { GlobalStyles } from "@mui/material";
import AppLayout from "./ui/AppLayout";

import Subjects from "./pagesGrade/Subjects";

import Cabins from "./pagesGrade/Cabins";
import Users from "./pagesGrade/Users";
import SubjectDetails from "./features/subjects/SubjectDetails";
import Subject from "./pagesGrade/Subject";
import { Toaster } from "react-hot-toast";
import Profile from "./pagesGrade/Profile";
import Login from "./pagesGrade/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import Tasks from "./features/subjects/Tasks";
import Quiz from "./features/subjects/Quiz";
import CreateQuiz from "./features/subjects/CreateQuiz";
import QuizGrades from "./features/subjects/QuizGrades";
import Grades from "./pagesGrade/Grades";
import Instructors from "./pagesGrade/Instructors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/:year"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="subjects" element={<Subjects />} />
            <Route path="subjects/:subjectId" element={<Subject />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="instructors" element={<Instructors />} />
            <Route path="subjects/grades/:subjectId" element={<Grades />} />
            <Route path="profile" element={<Profile />} />
            <Route path="subjects/tasks/:subjectId" element={<Tasks />} />
            <Route path="subjects/quiz/:subjectId" element={<Quiz />} />
            <Route
              path="subjects/createQuiz/:subjectId"
              element={<CreateQuiz />}
            />
            <Route
              path="subjects/quizGrades/:subjectId"
              element={<QuizGrades />}
            />
            {/* <Route path="subjectDetails" element={<SubjectDetails />} /> */}
          </Route>

          <Route path="*" element={<PageNotFound />} />

          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <Layout>
                  <About />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Layout>
                  <Courses />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor"
            element={
              <ProtectedRoute>
                <Layout>
                  <Instructor />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <Layout>
                  <Blog />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/single-blog"
            element={
              <ProtectedRoute>
                <Layout>
                  <BlogSinglePage />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
