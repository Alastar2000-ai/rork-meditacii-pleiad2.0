import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { courses, Course, Lesson } from '@/mocks/courses';

interface CourseState {
  enrolledCourses: string[];
  completedLessons: { courseId: string; lessonId: string }[];
  
  // Actions
  enrollInCourse: (courseId: string) => void;
  unenrollFromCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  
  completeLesson: (courseId: string, lessonId: string) => void;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
  
  // Admin actions
  addCourse: (course: Course) => void;
  updateCourse: (id: string, data: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addLesson: (courseId: string, lesson: Lesson) => void;
  updateLesson: (courseId: string, lessonId: string, data: Partial<Lesson>) => void;
  deleteLesson: (courseId: string, lessonId: string) => void;
  
  // Data
  allCourses: Course[];
  getCourse: (id: string) => Course | undefined;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      enrolledCourses: [],
      completedLessons: [],
      allCourses: [...courses],
      
      enrollInCourse: (courseId) => {
        set((state) => ({
          enrolledCourses: state.enrolledCourses.includes(courseId)
            ? state.enrolledCourses
            : [...state.enrolledCourses, courseId],
        }));
      },
      
      unenrollFromCourse: (courseId) => {
        set((state) => ({
          enrolledCourses: state.enrolledCourses.filter((id) => id !== courseId),
        }));
      },
      
      isEnrolled: (courseId) => {
        return get().enrolledCourses.includes(courseId);
      },
      
      completeLesson: (courseId, lessonId) => {
        set((state) => {
          const isAlreadyCompleted = state.completedLessons.some(
            (item) => item.courseId === courseId && item.lessonId === lessonId
          );
          
          if (isAlreadyCompleted) {
            return state;
          }
          
          return {
            completedLessons: [
              ...state.completedLessons,
              { courseId, lessonId },
            ],
          };
        });
      },
      
      isLessonCompleted: (courseId, lessonId) => {
        return get().completedLessons.some(
          (item) => item.courseId === courseId && item.lessonId === lessonId
        );
      },
      
      getCourseProgress: (courseId) => {
        const course = get().getCourse(courseId);
        if (!course) return 0;
        
        const totalLessons = course.lessonsList.length;
        const completedCount = get().completedLessons.filter(
          (item) => item.courseId === courseId
        ).length;
        
        return totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
      },
      
      // Admin actions
      addCourse: (course) => {
        set((state) => ({
          allCourses: [...state.allCourses, course],
        }));
      },
      
      updateCourse: (id, data) => {
        set((state) => ({
          allCourses: state.allCourses.map((course) =>
            course.id === id ? { ...course, ...data } : course
          ),
        }));
      },
      
      deleteCourse: (id) => {
        set((state) => ({
          allCourses: state.allCourses.filter((course) => course.id !== id),
        }));
      },
      
      addLesson: (courseId, lesson) => {
        set((state) => ({
          allCourses: state.allCourses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  lessons: course.lessons + 1,
                  lessonsList: [...course.lessonsList, lesson],
                }
              : course
          ),
        }));
      },
      
      updateLesson: (courseId, lessonId, data) => {
        set((state) => ({
          allCourses: state.allCourses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  lessonsList: course.lessonsList.map((lesson) =>
                    lesson.id === lessonId
                      ? { ...lesson, ...data }
                      : lesson
                  ),
                }
              : course
          ),
        }));
      },
      
      deleteLesson: (courseId, lessonId) => {
        set((state) => ({
          allCourses: state.allCourses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  lessons: course.lessons - 1,
                  lessonsList: course.lessonsList.filter(
                    (lesson) => lesson.id !== lessonId
                  ),
                }
              : course
          ),
        }));
      },
      
      getCourse: (id) => {
        return get().allCourses.find((course) => course.id === id);
      },
    }),
    {
      name: 'course-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);