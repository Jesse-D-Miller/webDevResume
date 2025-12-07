export const resumeData = {
  meta: {
    name: "JESSE MILLER",
    title: "Junior Full-Stack Developer",
    location: "Greater Vancnouver Area, BC, Canada",
    availability: "Open to full-time",
    links: {
      email: "jessedonaldmiller@gmail.com",
      github: "https://github.com/Jesse-D-Miller",
      linkedin: "https://www.linkedin.com/in/jesse-miller-962331363/",
      resumePdf: "/Jesse_Miller_WebDeveloper_Resume.pdf"
    }
  },
  summary: [
    "Junior full-stack developer with hands-on experience building responsive, database-driven web applications using React, Node.js, Express, Ruby on Rails, and PostgreSQL. Lighthouse Labs full-stack graduate with strong problem-solving skills, clean coding habits, and a focus on building intuitive user experiences. Brings proven leadership, calm decision-making, and reliability from several years as a BC Wildfire Crew Supervisor."
  ],
  skills: [
    // Languages
    { name: "JavaScript", level: "advanced", tags: ["language", "frontend", "backend"] },
    { name: "Ruby", level: "intermediate", tags: ["language", "backend"] },
    { name: "HTML5", level: "advanced", tags: ["language", "markup", "frontend"] },
    { name: "CSS/SCSS", level: "advanced", tags: ["language", "styling", "frontend"] },
    { name: "SQL", level: "intermediate", tags: ["language", "database"] },
    
    // Frameworks & Libraries
    { name: "React", level: "advanced", tags: ["framework", "frontend", "hooks", "state"] },
    { name: "Node.js", level: "intermediate", tags: ["runtime", "backend", "javascript"] },
    { name: "Express", level: "intermediate", tags: ["framework", "backend", "api"] },
    { name: "EJS", level: "intermediate", tags: ["templating", "backend"] },
    { name: "Rails", level: "intermediate", tags: ["framework", "backend", "ruby"] },
    { name: "Bootstrap", level: "intermediate", tags: ["framework", "css", "responsive"] },
    
    // Databases
    { name: "PostgreSQL", level: "intermediate", tags: ["database", "sql", "backend"] },
    
    // Testing
    { name: "Mocha", level: "intermediate", tags: ["testing", "javascript"] },
    { name: "Chai", level: "intermediate", tags: ["testing", "assertions"] },
    { name: "Cypress", level: "intermediate", tags: ["testing", "e2e", "frontend"] },
    
    // Tools & Other
    { name: "Git", level: "advanced", tags: ["version-control", "tooling"] },
    { name: "GitHub", level: "advanced", tags: ["version-control", "collaboration"] },
    { name: "REST APIs", level: "intermediate", tags: ["api", "backend", "integration"] },
    { name: "Command Line", level: "intermediate", tags: ["tooling", "terminal"] },
    { name: "Responsive Design", level: "advanced", tags: ["frontend", "css", "mobile"] },
    
    // Soft Skills
    { name: "Leadership", level: "advanced", tags: ["soft-skill", "management"] },
    { name: "Problem Solving", level: "advanced", tags: ["soft-skill", "analytical"] },
    { name: "Communication", level: "advanced", tags: ["soft-skill", "collaboration"] },
    { name: "Adaptability", level: "advanced", tags: ["soft-skill", "growth"] },
    { name: "Accountability", level: "advanced", tags: ["soft-skill", "reliability"] },
    { name: "Mentorship", level: "advanced", tags: ["soft-skill", "teaching"] },
    { name: "Strategic Thinking", level: "advanced", tags: ["soft-skill", "planning"] },
    { name: "Reliability", level: "advanced", tags: ["soft-skill", "dependability"] }
  ],
  projects: [
    {
      title: "Plot Twist - Collaborative Storytelling App",
      period: "2024",
      stack: ["React", "Node.js", "Express", "PostgreSQL", "SCSS"],
      links: { live: "", code: "https://github.com/wizbren/plot-twist" },
      highlights: [
        "Developed a full-stack web app where users can co-author and manage stories in real time",
        "Implemented secure user authentication, story versioning, and a clean, responsive UI",
        "Designed optimized SQL queries to improve story retrieval and database efficiency"
      ],
      skills: ["React", "Node.js", "Express", "PostgreSQL", "CSS/SCSS"]
    },
    {
      title: "What's Cookin' - AI Assisted Recipe Book",
      period: "2024",
      stack: ["React", "Node.js", "Express", "PostgreSQL", "SCSS"],
      links: { live: "", code: "https://github.com/wizbren/whats-cookin" },
      highlights: [
        "Created a full-stack recipe app integrating two external APIs for recipe discovery and AI-powered curation via ChatGPT",
        "Engineered dynamic search and filtering features with persistent user data storage",
        "Streamlined state management for a smooth, intuitive user experience"
      ],
      skills: ["React", "Node.js", "Express", "PostgreSQL", "REST APIs"]
    },
    {
      title: "Jungle Rails - Amazon Clone e-Commerce App",
      period: "2024",
      stack: ["Ruby on Rails", "PostgreSQL", "SCSS", "Bootstrap"],
      links: { live: "", code: "https://github.com/Jesse-D-Miller/jungle-rails" },
      highlights: [
        "Developed a full-stack e-commerce site replicating Amazon's core functionality, including carts and payments",
        "Implemented admin dashboards for inventory and order management",
        "Applied MVC design principles and RESTful routing to improve scalability and maintainability"
      ],
      skills: ["Rails", "PostgreSQL", "Bootstrap", "Ruby"]
    }
  ],
  experience: [
    {
      role: "Crew Supervisor",
      company: "BC Wildfire Service",
      period: "May 2023 – March 2025",
      location: "British Columbia, Canada",
      bullets: [
        "Supervised five Initial Attack crews across two bases, ensuring safety, readiness, and performance",
        "Designed and implemented a custom crew-tracking system to optimize deployment and resource allocation",
        "Mentored and trained new leaders through structured coaching programs to enhance team performance and cohesion",
        "Coordinated emergency logistics and personnel movements during high-pressure wildfire incidents"
      ],
      skills: ["Leadership", "Problem Solving", "Strategic Thinking", "Accountability", "Mentorship"]
    },
    {
      role: "Crew Leader / Member",
      company: "BC Wildfire Service",
      period: "2018 – 2023",
      location: "British Columbia, Canada",
      bullets: [
        "Led and supported wildfire suppression operations in rapidly changing environments",
        "Promoted to informal leadership roles, managing on-the-ground coordination and communication",
        "Facilitated clear communication between crews, command centers, and the public during interface emergencies"
      ],
      skills: ["Leadership", "Communication", "Adaptability", "Reliability"]
    }
  ],
  education: [
    {
      school: "Lighthouse Labs",
      program: "Full-Stack Web Development Bootcamp",
      period: "2024",
      details: [
        "Completed intensive 12-week program covering full-stack JavaScript and Ruby on Rails",
        "Built multiple production-ready web applications using React, Node.js, Express, and PostgreSQL"
      ]
    }
  ],
  hobbies: [
    "Board Games",
    "Basketball",
    "Cooking",
    "Snowboarding",
    "Hiking",
    "Biking",
    "Reading"
  ],
  secrets: {
    questLog: [
      { id: "proj", label: "Open a project card", done: false },
      { id: "flip", label: "Flip the sheet", done: false }
    ],
    stats: [
      { label: "Projects shipped", value: 8 },
      { label: "Commits this year", value: 350 }
    ],
    map: {
      nodes: [
        { id: "hero", label: "Front face", type: "hub" },
        { id: "projects", label: "Projects gallery", type: "room" },
        { id: "skills", label: "Skills lab", type: "room" },
        { id: "contact", label: "Comms terminal", type: "exit" }
      ],
      edges: [
        ["hero", "projects"],
        ["hero", "skills"],
        ["hero", "contact"]
      ]
    },
    easterEggs: [
      { trigger: "konami", reveal: "Hidden project or fun fact" }
    ]
  }
};