export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  location: string;
  contact: {
    email: string;
    phone: string;
  };
  social: {
    linkedin: string;
    github: string;
    facebook: string;
    instagram: string;
  };
  cvUrl: string;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backendDb: string[];
  tools: string[];
}

export interface Experience {
  title: string;
  date: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
  github: string;
  demo?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Seif Tamer Elsayed Ismail",
    role: "Software Developer | MERN Stack Specialist",
    bio: "Software Developer and Computer Science student with a strong foundation in full-stack web development and scalable system design. Specializing in the MERN stack and modern JavaScript ecosystems (Next.js, TypeScript), with a proven track record of delivering production-ready applications.",
    location: "Port Said, Egypt",
    contact: {
      email: "seiftamer404@gmail.com",
      phone: "+201288100177",
    },
    social: {
      linkedin:  "https://www.linkedin.com/in/seif-elsharnoby-278793163/",
      github:    "https://github.com/SeifTamer404",
      facebook:  "https://www.facebook.com/seif.elsharnoby.643637",
      instagram: "https://www.instagram.com/_seif_elsharnoby/",
    },
    cvUrl: "https://drive.google.com/file/d/11MKn85of8d2ESq5DEmZXfs55_j2Jgqfw/view?usp=drive_link",
  },
  skills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "C++", "Python", "Java", "PHP", "HTML5/CSS3"],
    frontend: [
      "React.js",
      "Next.js (App Router, Server Actions, ISR/SSG/SSR)",
      "Redux Toolkit",
      "Context API",
      "TanStack Query v5",
      "Tailwind CSS",
      "Bootstrap",
      "Framer Motion",
      "Radix UI",
    ],
    backendDb: [
      "Node.js",
      "Express.js",
      "Laravel",
      "RESTful API Design",
      "JWT",
      "MongoDB",
      "MySQL",
    ],
    tools: ["Git", "GitHub", "Agile/Scrum", "CI/CD workflows", "Figma", "Linux (Ubuntu)"],
  },
  experience: [
    {
      title: "Freelance Full-Stack Web Developer",
      date: "2024-Present",
      description:
        "Designed full-stack apps using React, Next.js, Node.js. Integrated RESTful APIs and managed full project lifecycles across 8 client engagements.",
    },
    {
      title: "Software Development Intern @ ITI & NTI",
      date: "2024-2025",
      description:
        "Collaborated in agile teams to deliver 5 large-scale projects, utilizing complex state management and secure auth flows.",
    },
    {
      title: "Frontend Development Instructor @ TROSC",
      date: "Nov 2024-Present",
      description:
        "Delivered 3 cohorts of technical workshops on HTML, CSS, JS, React to 30+ students.",
    },
    {
      title: "Full-Stack Web Developer / Core Member @ Octalian Community",
      date: "Oct 2025-Present",
      description:
        "Architected MERN stack systems for 4+ real-world web applications.",
    },
  ],
  projects: [
      {
      id: "avex-ecommerce",
      title: "AVEX Marketplace",
      description: "A high-performance full-stack marketplace featuring smart search, robust Redux state management, secure authentication, and enterprise-grade SEO using Next.js ISR & SSR.",
      stack: [
        "Next.js (App Router)", 
        "Redux Toolkit", 
        "MongoDB & Mongoose", 
        "Better Auth", 
        "Tailwind CSS"
      ],
      image: "/project/avex.png",
      github: "https://github.com/SeifTamer404/avex-ecommerce",
      demo: "https://avex-ecommerce.vercel.app"
    },
    {
      id: "react-events",
      title: "React Events",
      description:
        "Advanced Event Management SPA. Features dynamic route guards and deferred data fetching.",
      stack: ["React.js", "React Router v6", "JWT Authentication"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      github: "https://github.com/SeifTamer404/react-events-project",
    },
    {
      id: "dev-project-gallery",
      title: "Dev Project Gallery",
      description:
        "Developer Portfolio Platform. Features Optimistic Updates, smart caching, and Glassmorphic UI.",
      stack: ["React.js", "TanStack Query v5", "Node.js", "Express.js"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
      github: "https://github.com/SeifTamer404/dev-project-gallery",
    },
    {
      id: "forkify",
      title: "Forkify",
      description:
        "MVC Vanilla JavaScript Application. Features complex state-dependent logic and fractional ingredient scaling.",
      stack: ["Vanilla JS (ES6+)", "MVC Architecture", "RESTful APIs", "SCSS"],
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2080&auto=format&fit=crop",
      github: "https://github.com/SeifTamer404/forkify",
    },
    {
      id: "foodji",
      title: "Foodji",
      description: "A React food ordering application featuring meal browsing, cart management, and a complete checkout process.",
      stack: ["React", "Context API", "Custom Hooks"],
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
      github: "https://github.com/SeifTamer404/foodji", 
    },
    {
      id: "project-management",
      title: "Project Management App",
      description: "A React application for creating and managing projects and their associated tasks with localStorage data persistence.",
      stack: ["React", "localStorage"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
      github: "https://github.com/SeifTamer404/project-management-app", 
    },
    {
      id: "tic-tac-toe",
      title: "Tic Tac Toe",
      description: "A classic two-player Tic Tac Toe game featuring win detection, turn highlighting, and a board reset functionality.",
      stack: ["React", "JavaScript", "CSS"],
      image: "https://images.unsplash.com/photo-1668901382969-8c73e450a1f5?q=80&w=2070&auto=format&fit=crop",
      github: "https://github.com/SeifTamer404/tic-tac-toe", 
    }
  ],
};
