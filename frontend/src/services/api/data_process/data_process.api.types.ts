export interface DataProcessResponse {
  courses: Course[]
}

export interface Course {
  cosine_dist_description: number
  cosine_dist_title: number
  more_text: string
  skills: string
  skills_ratio: number
  score_avg: number
  title: string
  url: string
}

export interface Skills {
  [key: string]: boolean
}

export interface DataProcessRequest {
  text: string
}