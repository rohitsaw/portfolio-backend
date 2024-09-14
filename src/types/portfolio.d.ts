interface Certificate {
  id: number;
  certificate_name: string;
  certificate_description: string;
  certification_authority: string;
  certification_date: string;
  certification_expiry: string;
  verification_url: string;
  technology_tags: string | Array<String>;
}

interface Education {
  id: number;
  institute_name: string;
  degree_name: string;
  start_date: string;
  end_date: string;
  score: number;
}

interface Project {
  id: number;
  project_name: string;
  project_description: string;
  github_url: string;
  web_url: string;
  play_store_url: string;
  technology_tags: string | Array<string>;
}

interface Skill {
  id: number;
  skill_name: string;
  skill_category: string;
  skill_proficiency: number;
}

interface WorkExperience {
  id: number;
  company_name: string;
  designation: string;
  start_date: string;
  end_date: string;
  details: string;
}

interface User {
  id: number;
  user_email: string;
  name: string;
  about: string;
  social_links: Array<string>;
}

export { Certificate, Education, Project, Skill, WorkExperience, User };
