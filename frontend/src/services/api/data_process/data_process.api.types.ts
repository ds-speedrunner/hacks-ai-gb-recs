export interface DataProcessResponse {
  courses: Course[]
}

export interface Course {
  name: string
  url: string
  coverage: number
  skills: Skills
}

export interface Skills {
  [key: string]: boolean
}

export interface DataProcessRequest {
  text: string
}

export function generateRandomData(size=5): DataProcessResponse {
  return {
    courses: Array.from({ length: size }, (_, i) => ({
      name: `Course ${i + 1}`,
      url: `https://course-${i + 1}.com`,
      coverage: Math.random(),
      skills: {
        'Skill 1': Math.random() > 0.5,
        'Skill 2': Math.random() > 0.5,
        'Skill 3': Math.random() > 0.5,
        'Skill 4': Math.random() > 0.5,
        'Skill 5': Math.random() > 0.5,
      }
    }))
  }
}