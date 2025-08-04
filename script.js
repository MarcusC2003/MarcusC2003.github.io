// Global state
let currentFile = 'home.html';
let isDarkMode = true;
let expandedProjects = false;
let terminalHistory = [
  { type: 'output', content: 'Welcome to Marcus Chan\'s Portfolio Terminal' },
  { type: 'output', content: 'Type "help" for available commands' },
  { type: 'input', content: 'cd /contact_me' },
  { type: 'output', content: 'Directory changed to /contact_me' },
  { type: 'input', content: 'cat email.txt' },
  { type: 'output', content: 'marcusgchan@gmail.com' }
];

const projects = [
  { name: 'ecommerce-platform', title: 'E-Commerce Platform', tech: ['React', 'Node.js', 'MongoDB'], status: 'Completed' },
  { name: 'task-management', title: 'Task Management App', tech: ['React', 'Firebase', 'Material-UI'], status: 'In Progress' },
  { name: 'portfolio-website', title: 'Portfolio Website', tech: ['React', 'CSS3', 'JavaScript'], status: 'Completed' },
  { name: 'weather-dashboard', title: 'Weather Dashboard', tech: ['React', 'API', 'Chart.js'], status: 'Completed' },
  { name: 'social-media-app', title: 'Social Media App', tech: ['React', 'Express', 'PostgreSQL'], status: 'Planning' },
  { name: 'game-development', title: 'Game Development', tech: ['JavaScript', 'Canvas', 'WebGL'], status: 'In Progress' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Set up event listeners
  setupFileNavigation();
  setupThemeToggle();
  setupProjectDirectory();
  setupTerminal();
  
  // Load initial content
  loadFileContent('home.html');
  updateTerminalOutput();
  populateProjects();
}

// File navigation
function setupFileNavigation() {
  const fileItems = document.querySelectorAll('.file-item');
  fileItems.forEach(item => {
    item.addEventListener('click', function() {
      const fileName = this.getAttribute('data-file');
      switchFile(fileName);
    });
  });
}

function switchFile(fileName) {
  // Update active file
  document.querySelectorAll('.file-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-file="${fileName}"]`).classList.add('active');
  
  currentFile = fileName;
  loadFileContent(fileName);
}

// Theme toggle
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  themeToggle.addEventListener('change', function() {
    isDarkMode = !this.checked;
    updateTheme();
  });
}

function updateTheme() {
  const ide = document.getElementById('ide');
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  if (isDarkMode) {
    ide.classList.remove('light');
    body.classList.remove('light');
    themeIcon.textContent = '☀️';
  } else {
    ide.classList.add('light');
    body.classList.add('light');
    themeIcon.textContent = '🌙';
  }
}

// Project directory
function setupProjectDirectory() {
  populateProjects();
}

function toggleProjects() {
  const projectList = document.getElementById('project-list');
  const expandIcon = document.getElementById('expand-icon');
  
  expandedProjects = !expandedProjects;
  
  if (expandedProjects) {
    projectList.style.maxHeight = '400px';
    expandIcon.textContent = '−';
  } else {
    projectList.style.maxHeight = '0';
    expandIcon.textContent = '+';
  }
}

function populateProjects() {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';
  
  projects.forEach((project, index) => {
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';
    projectItem.style.animationDelay = `${index * 0.1}s`;
    
    projectItem.innerHTML = `
      <span class="project-icon">📄</span>
      <span class="project-name">${project.name}/</span>
      <div class="project-details">
        <div class="project-title">${project.title}</div>
        <div class="project-tech">
          ${project.tech.map(tech => `<span class="tech-chip">${tech}</span>`).join('')}
        </div>
      </div>
    `;
    
    projectList.appendChild(projectItem);
  });
}

// Terminal functionality
function setupTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTerminalCommand(this.value);
      this.value = '';
    }
  });
}

function handleTerminalCommand(command) {
  if (!command.trim()) return;
  
  // Add command to history
  terminalHistory.push({ type: 'input', content: command });
  
  // Process command
  let output = '';
  const cmd = command.toLowerCase();
  
  if (cmd === 'help') {
    output = 'Available commands: help, about, skills, projects, contact, clear';
  } else if (cmd === 'about') {
    output = 'Opening about.html...';
    switchFile('about.html');
  } else if (cmd === 'skills') {
    output = 'Opening skills.html...';
    switchFile('skills.html');
  } else if (cmd === 'projects') {
    output = 'Opening projects.html...';
    switchFile('projects.html');
  } else if (cmd === 'contact') {
    output = 'Opening contact.html...';
    switchFile('contact.html');
  } else if (cmd === 'clear') {
    terminalHistory = [];
    updateTerminalOutput();
    return;
  } else if (cmd.includes('cat') && cmd.includes('email')) {
    output = 'marcusgchan@gmail.com';
  } else if (cmd.includes('cd')) {
    output = 'Directory changed';
  } else {
    output = `Command not found: ${command}. Type "help" for available commands.`;
  }
  
  terminalHistory.push({ type: 'output', content: output });
  updateTerminalOutput();
}

function updateTerminalOutput() {
  const terminalOutput = document.getElementById('terminal-output');
  terminalOutput.innerHTML = '';
  
  terminalHistory.forEach(entry => {
    const line = document.createElement('div');
    line.className = `terminal-line ${entry.type}`;
    
    if (entry.type === 'input') {
      line.innerHTML = `<span class="prompt">$ </span>${entry.content}`;
    } else {
      line.textContent = entry.content;
    }
    
    terminalOutput.appendChild(line);
  });
  
  // Scroll to bottom
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Content loading
function loadFileContent(fileName) {
  const fileContent = document.getElementById('file-content');
  
  switch (fileName) {
    case 'home.html':
      fileContent.innerHTML = getHomeContent();
      break;
    case 'about.html':
      fileContent.innerHTML = getAboutContent();
      break;
    case 'skills.html':
      fileContent.innerHTML = getSkillsContent();
      break;
    case 'projects.html':
      fileContent.innerHTML = getProjectsContent();
      break;
    case 'contact.html':
      fileContent.innerHTML = getContactContent();
      break;
    default:
      fileContent.innerHTML = getHomeContent();
  }
}

function getHomeContent() {
  return `
    <div class="file-content">
      <div class="code-header">
        <span class="file-name">home.html</span>
        <div class="file-controls">
          <span class="control close"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
      </div>
      <div class="code-body">
        <div class="line-numbers">
          ${Array.from({ length: 25 }).map((_, i) => `<div class="line-number">${i + 1}</div>`).join('')}
        </div>
        <div class="code-content">
          <div class="code-line"><span class="comment">&lt;!DOCTYPE html&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">html</span> <span class="prop">lang</span>=<span class="string">"en"</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">head</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">meta</span> <span class="prop">charset</span>=<span class="string">"UTF-8"</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">meta</span> <span class="prop">name</span>=<span class="string">"viewport"</span> <span class="prop">content</span>=<span class="string">"width=device-width, initial-scale=1.0"</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">title</span><span class="tag">&gt;</span>Marcus Chan - Portfolio<span class="tag">&lt;/</span><span class="component">title</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">link</span> <span class="prop">rel</span>=<span class="string">"stylesheet"</span> <span class="prop">href</span>=<span class="string">"styles.css"</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">head</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">body</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">header</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">h1</span><span class="tag">&gt;</span>Marcus Chan<span class="tag">&lt;/</span><span class="component">h1</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">p</span><span class="tag">&gt;</span>Creative Developer & Designer<span class="tag">&lt;/</span><span class="component">p</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;/</span><span class="component">header</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">main</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="comment">&lt;!-- Portfolio content here --&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;/</span><span class="component">main</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">body</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">html</span><span class="tag">&gt;</span></div>
          
          <div class="code-block centered-content">
            <div class="block-header">
              <span class="block-icon">◉</span>
              <span class="block-title">Portfolio Overview</span>
            </div>
            <div class="block-content">
              <div class="overview-grid">
                <div class="overview-item">
                  <span class="overview-label">Name:</span>
                  <span class="overview-value">Marcus Chan</span>
                </div>
                <div class="overview-item">
                  <span class="overview-label">Role:</span>
                  <span class="overview-value">Creative Developer & Designer</span>
                </div>
                <div class="overview-item">
                  <span class="overview-label">Experience:</span>
                  <span class="overview-value">3+ Years</span>
                </div>
                <div class="overview-item">
                  <span class="overview-label">Projects:</span>
                  <span class="overview-value">50+ Completed</span>
                </div>
                <div class="overview-item">
                  <span class="overview-label">Location:</span>
                  <span class="overview-value">San Francisco, CA</span>
                </div>
                <div class="overview-item">
                  <span class="overview-label">Specialization:</span>
                  <span class="overview-value">Full-Stack Development</span>
                </div>
              </div>
            </div>
          </div>

          <div class="code-block centered-content">
            <div class="block-header">
              <span class="block-icon">◉</span>
              <span class="block-title">Featured Project</span>
            </div>
            <div class="block-content">
              <div class="featured-project">
                <div class="project-preview">
                  <div class="project-image">
                    <div class="mockup-phone">
                      <div class="phone-screen">
                        <div class="app-header">Tryotel</div>
                        <div class="app-content">
                          <div class="flight-search">
                            <div class="search-tabs">
                              <span class="tab active">ONE-WAY</span>
                              <span class="tab">ROUND TRIP</span>
                              <span class="tab">MULTI-CITY</span>
                            </div>
                            <div class="search-form">
                              <div class="input-group">
                                <label>FROM</label>
                                <input type="text" value="DSC" readonly />
                              </div>
                              <div class="input-group">
                                <label>TO</label>
                                <input type="text" value="DXB" readonly />
                              </div>
                              <div class="input-group">
                                <label>DEPARTURE</label>
                                <input type="text" value="26 Jan '24" readonly />
                              </div>
                              <div class="input-group">
                                <label>PASSENGERS</label>
                                <input type="text" value="1 Traveler" readonly />
                              </div>
                            </div>
                            <button class="search-btn">SEARCH FLIGHTS</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="project-info">
                  <h3>Tryotel App</h3>
                  <p>Modern flight booking application with real-time search and booking capabilities.</p>
                  <div class="project-tech-stack">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">MongoDB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="code-block centered-content">
            <div class="block-header">
              <span class="block-icon">◉</span>
              <span class="block-title">Quick Stats</span>
            </div>
            <div class="block-content">
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-number">50+</div>
                  <div class="stat-label">Projects Completed</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">3+</div>
                  <div class="stat-label">Years Experience</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">25+</div>
                  <div class="stat-label">Happy Clients</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">15+</div>
                  <div class="stat-label">Technologies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getAboutContent() {
  return `
    <div class="file-content">
      <div class="code-header">
        <span class="file-name">about.html</span>
        <div class="file-controls">
          <span class="control close"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
      </div>
      <div class="code-body">
        <div class="line-numbers">
          ${Array.from({ length: 25 }).map((_, i) => `<div class="line-number">${i + 1}</div>`).join('')}
        </div>
        <div class="code-content">
          <div class="code-line"><span class="comment">&lt;!DOCTYPE html&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">html</span> <span class="prop">lang</span>=<span class="string">"en"</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">head</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">title</span><span class="tag">&gt;</span>About Marcus Chan<span class="tag">&lt;/</span><span class="component">title</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">head</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">body</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">section</span> <span class="prop">class</span>=<span class="string">"about"</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">h1</span><span class="tag">&gt;</span>Marcus Chan<span class="tag">&lt;/</span><span class="component">h1</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">h2</span><span class="tag">&gt;</span>Creative Developer & Designer<span class="tag">&lt;/</span><span class="component">h2</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">p</span><span class="tag">&gt;</span>Passionate developer and designer who loves turning ideas into reality.<span class="tag">&lt;/</span><span class="component">p</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;/</span><span class="component">section</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">body</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">html</span><span class="tag">&gt;</span></div>
          
          <div class="code-block">
            <div class="block-header">
              <span class="block-icon">◉</span>
              <span class="block-title">Personal Information</span>
            </div>
            <div class="block-content">
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Location</span>
                  <span class="info-value">Vancouver, BC</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Coding Experience</span>
                  <span class="info-value">5+ Years</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Projects</span>
                  <span class="info-value">3 Completed</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Specialization</span>
                  <span class="info-value">Front-End Development + UX/UI Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getSkillsContent() {
  return `
    <div class="file-content">
      <div class="code-header">
        <span class="file-name">skills.html</span>
        <div class="file-controls">
          <span class="control close"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
      </div>
      <div class="code-body">
        <div class="line-numbers">
          ${Array.from({ length: 25 }).map((_, i) => `<div class="line-number">${i + 1}</div>`).join('')}
        </div>
        <div class="code-content">
          <div class="code-line"><span class="comment">&lt;!DOCTYPE html&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">html</span> <span class="prop">lang</span>=<span class="string">"en"</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">head</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">title</span><span class="tag">&gt;</span>Skills - Marcus Chan<span class="tag">&lt;/</span><span class="component">title</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">head</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">body</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">section</span> <span class="prop">class</span>=<span class="string">"skills"</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">h1</span><span class="tag">&gt;</span>Technical Skills<span class="tag">&lt;/</span><span class="component">h1</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">div</span> <span class="prop">class</span>=<span class="string">"skill-category"</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-3"><span class="tag">&lt;</span><span class="component">h2</span><span class="tag">&gt;</span>Frontend<span class="tag">&lt;/</span><span class="component">h2</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-3"><span class="tag">&lt;</span><span class="component">ul</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-4"><span class="tag">&lt;</span><span class="component">li</span><span class="tag">&gt;</span>React<span class="tag">&lt;/</span><span class="component">li</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-4"><span class="tag">&lt;</span><span class="component">li</span><span class="tag">&gt;</span>JavaScript<span class="tag">&lt;/</span><span class="component">li</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-4"><span class="tag">&lt;</span><span class="component">li</span><span class="tag">&gt;</span>CSS3<span class="tag">&lt;/</span><span class="component">li</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-4"><span class="tag">&lt;</span><span class="component">li</span><span class="tag">&gt;</span>HTML5<span class="tag">&lt;/</span><span class="component">li</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-3"><span class="tag">&lt;/</span><span class="component">ul</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;/</span><span class="component">div</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;/</span><span class="component">section</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">body</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">html</span><span class="tag">&gt;</span></div>
          
          <div class="code-block">
            <div class="block-header">
              <span class="block-icon">◉</span>
              <span class="block-title">Skill Categories</span>
            </div>
            <div class="block-content">
              <div class="skill-categories">
                <div class="skill-category">
                  <span class="category-name">Frontend</span>
                  <div class="skill-tags">
                    <span class="skill-tag">React</span>
                    <span class="skill-tag">JavaScript</span>
                    <span class="skill-tag">CSS</span>
                    <span class="skill-tag">HTML</span>
                  </div>
                </div>
                <div class="skill-category">
                  <span class="category-name">Backend</span>
                  <div class="skill-tags">
                    <span class="skill-tag">Node.js</span>
                    <span class="skill-tag">SQL</span>
                    <span class="skill-tag">Python(Pandas, Numpy, Matplotlib, Seaborn, Scikit-learn)</span>
                    <span class="skill-tag">Java</span>
                    <span class="skill-tag">C++</span>
                    <span class="skill-tag">C</span>
                    <span class="skill-tag">C#</span>
                  </div>
                </div>
                <div class="skill-category">
                  <span class="category-name">Design</span>
                  <div class="skill-tags">
                    <span class="skill-tag">UI/UX</span>
                    <span class="skill-tag">Figma</span>
                    <span class="skill-tag">Photoshop</span>
                    <span class="skill-tag">Maya</span>
                    <span class="skill-tag">Blender</span>
                    <span class="skill-tag">Unity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getProjectsContent() {
  return `
    <div class="file-content">
      <div class="code-header">
        <span class="file-name">projects.html</span>
        <div class="file-controls">
          <span class="control close"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
      </div>
      <div class="code-body">
        <div class="line-numbers">
          ${Array.from({ length: 25 }).map((_, i) => `<div class="line-number">${i + 1}</div>`).join('')}
        </div>
        <div class="code-content">
          <div class="code-line"><span class="comment">&lt;!DOCTYPE html&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">html</span> <span class="prop">lang</span>=<span class="string">"en"</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">head</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">title</span><span class="tag">&gt;</span>Projects - Marcus Chan<span class="tag">&lt;/</span><span class="component">title</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">head</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">body</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">section</span> <span class="prop">class</span>=<span class="string">"projects"</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">h1</span><span class="tag">&gt;</span>My Projects<span class="tag">&lt;/</span><span class="component">h1</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">div</span> <span class="prop">class</span>=<span class="string">"project-grid"</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-3"><span class="tag">&lt;</span><span class="component">article</span> <span class="prop">class</span>=<span class="string">"project-card"</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-4"><span class="tag">&lt;</span><span class="component">h3</span><span class="tag">&gt;</span>E-Commerce Platform<span class="tag">&lt;/</span><span class="component">h3</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-4"><span class="tag">&lt;</span><span class="component">p</span><span class="tag">&gt;</span>Modern e-commerce solution<span class="tag">&lt;/</span><span class="component">p</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-3"><span class="tag">&lt;/</span><span class="component">article</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;/</span><span class="component">div</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;/</span><span class="component">section</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">body</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">html</span><span class="tag">&gt;</span></div>
          
          <div class="code-block">
            <div class="block-header">
              <span class="block-icon">◉</span>
              <span class="block-title">Project Gallery</span>
            </div>
            <div class="block-content">
              <div class="project-gallery">
                ${projects.map((project, index) => `
                  <div class="project-card" style="animation-delay: ${index * 0.1}s">
                    <div class="project-header">
                      <h3>${project.title}</h3>
                      <span class="status-badge ${project.status.toLowerCase().replace(' ', '-')}">
                        ${project.status}
                      </span>
                    </div>
                    <div class="project-tech">
                      ${project.tech.map(tech => `<span class="tech-chip">${tech}</span>`).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getContactContent() {
  return `
    <div class="file-content">
      <div class="code-header">
        <span class="file-name">contact.html</span>
        <div class="file-controls">
          <span class="control close"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
      </div>
      <div class="code-body">
        <div class="line-numbers">
          ${Array.from({ length: 25 }).map((_, i) => `<div class="line-number">${i + 1}</div>`).join('')}
        </div>
        <div class="code-content">
          <div class="code-line"><span class="comment">&lt;!DOCTYPE html&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">html</span> <span class="prop">lang</span>=<span class="string">"en"</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">head</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">title</span><span class="tag">&gt;</span>Contact - Marcus Chan<span class="tag">&lt;/</span><span class="component">title</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">head</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;</span><span class="component">body</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;</span><span class="component">section</span> <span class="prop">class</span>=<span class="string">"contact"</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">h1</span><span class="tag">&gt;</span>Get In Touch<span class="tag">&lt;/</span><span class="component">h1</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;</span><span class="component">div</span> <span class="prop">class</span>=<span class="string">"contact-info"</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-3"><span class="tag">&lt;</span><span class="component">p</span><span class="tag">&gt;</span>Email: marcusgchan@gmail.com<span class="tag">&lt;/</span><span class="component">p</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-3"><span class="tag">&lt;</span><span class="component">p</span><span class="tag">&gt;</span>Phone: +1 (555) 123-4567<span class="tag">&lt;/</span><span class="component">p</span><span class="tag">&gt;</span></div>
          <div class="code-line indent-2"><span class="tag">&lt;/</span><span class="component">div</span><span class="tag">&gt;</span></div>
          <div class="code-line indent"><span class="tag">&lt;/</span><span class="component">section</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">body</span><span class="tag">&gt;</span></div>
          <div class="code-line"><span class="tag">&lt;/</span><span class="component">html</span><span class="tag">&gt;</span></div>
          
          <div class="code-block">
            <div class="block-header">
              <span class="block-icon">◉</span>
              <span class="block-title">Contact Information</span>
            </div>
            <div class="block-content">
              <div class="contact-grid">
                <div class="contact-item">
                  <span class="contact-label">Email</span>
                  <span class="contact-value">marcusgchan@gmail.com</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">Phone</span>
                  <span class="contact-value">+1 (604)-618-5440</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">Location</span>
                  <span class="contact-value">San Francisco, CA</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">GitHub</span>
                  <span class="contact-value">github.com/MarcusC2003</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">LinkedIn</span>
                  <span class="contact-value">linkedin.com/in/marcusgchan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Welcome screen and loading functionality
function openPortfolio() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const loadingScreen = document.getElementById('loading-screen');
  const ide = document.getElementById('ide');
  
  welcomeScreen.style.display = 'none';
  loadingScreen.style.display = 'flex';
  
  startLoading();
}

function startLoading() {
  const loadingSteps = [
    'Initializing Portfolio IDE...',
    'Loading Components...',
    'Setting up Terminal...',
    'Configuring Theme...',
    'Ready to Launch!'
  ];
  
  let currentStep = 0;
  let progress = 0;
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const loadingOutput = document.getElementById('loading-output');
  
  const progressInterval = setInterval(() => {
    progress += 2;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const ide = document.getElementById('ide');
        
        loadingScreen.style.display = 'none';
        ide.style.display = 'flex';
        ide.classList.add('loaded');
      }, 1000);
    }
  }, 50);
  
  const stepInterval = setInterval(() => {
    if (currentStep < loadingSteps.length) {
      const stepLine = document.createElement('div');
      stepLine.className = 'loading-line';
      stepLine.innerHTML = `
        <span class="prompt">$ </span>
        <span class="command">load_portfolio</span>
        <span class="output"> ${loadingSteps[currentStep]}</span>
      `;
      loadingOutput.appendChild(stepLine);
      currentStep++;
    } else {
      clearInterval(stepInterval);
    }
  }, 800);
}

// Terminal form submission
function handleTerminalSubmit(event) {
  event.preventDefault();
  const input = event.target.querySelector('.terminal-input');
  handleTerminalCommand(input.value);
  input.value = '';
} 