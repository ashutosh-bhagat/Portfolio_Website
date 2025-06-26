# 🎹 Ashutosh Bhagat - Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Deployment](https://img.shields.io/badge/Deploy-Vercel-black)

*A symphony of code and creativity where technology meets melody*

[🌐 Live Demo](https://your-portfolio-url.vercel.app) • [📧 Contact](mailto:asbh7190@gmail.com) • [🎵 Music](https://your-music-url.com)

</div>

---

## 🎯 About

Welcome to my digital portfolio - a unique blend of web development and musical artistry. This isn't just another portfolio; it's an interactive experience where you can play a virtual piano to navigate through my work, skills, and creative journey.

### 🎼 The Concept

As a full-stack developer and pianist, I wanted to create something that truly represents both sides of my passion. The interactive piano serves as both a musical instrument and a navigation system - each key plays a note while also taking you to different sections of my portfolio.

---

## ✨ Features

### 🎹 Interactive Piano Navigation
- **Musical Navigation**: Play piano keys to navigate between sections
- **Keyboard Shortcuts**: Use your computer keyboard to play notes
- **Shift + Navigation**: Hold Shift and press keys to navigate instantly
- **Real-time Audio**: Web Audio API powered sound generation
- **Visual Feedback**: Beautiful animations and visual effects

### 🎨 Modern Design
- **Neon Aesthetic**: Cyberpunk-inspired color scheme with neon accents
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: CSS animations and JavaScript-powered effects
- **Dark Theme**: Easy on the eyes with elegant dark styling

### 📱 Multi-Page Experience
- **Home**: Hero section with interactive piano
- **About**: Personal story and philosophy
- **Projects**: Showcase of technical work
- **Skills**: Interactive skill visualization
- **Blog**: Articles and thoughts
- **Music**: Upcoming musical features
- **Contact**: Get in touch form

### 🚀 Technical Features
- **Vanilla JavaScript**: No frameworks, pure performance
- **Web Audio API**: Real-time sound synthesis
- **CSS Grid & Flexbox**: Modern layout techniques
- **Intersection Observer**: Smooth scroll animations
- **Form Validation**: Client-side form handling
- **Keyboard Events**: Comprehensive keyboard support

---

## 🛠️ Tech Stack

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-FF6B6B?style=for-the-badge&logo=javascript&logoColor=white)

</div>

### Core Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ features and modern APIs
- **Web Audio API**: Real-time audio synthesis and processing

### Libraries & Tools
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Typography (Inter, JetBrains Mono, Playfair Display)
- **HTTP Server**: Local development server

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with Web Audio API support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ashutosh-bhagat-portfolio.git
   cd ashutosh-bhagat-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Build for Production

```bash
# Build the project (copies files to public/ directory)
npm run build

# Start production server
npm start

# Clean build directory
npm run clean
```

### Deployment

The project is configured for easy deployment on major hosting platforms:

**Vercel** (Recommended)
```bash
npm run build
# Deploy the public/ directory
```

**Netlify**
```bash
# Netlify will automatically run "npm run build" and serve from "public/"
```

**GitHub Pages**
```bash
npm run build
# Push the public/ directory to gh-pages branch
```

---

## 🎹 How to Use the Interactive Piano

### Basic Navigation
1. **Scroll to the piano section** on the home page
2. **Click on piano keys** to play notes and navigate
3. **Use your keyboard** - each key corresponds to a piano note

### Keyboard Shortcuts
| Key | Action | Section |
|-----|--------|---------|
| `A` | Play C4 | About |
| `S` | Play D4 | Projects |
| `D` | Play E4 | Skills |
| `F` | Play F4 | Blog |
| `G` | Play G4 | Music |
| `H` | Play A4 | Contact |
| `J` | Play B4 | Home |
| `Shift + H` | Quick Home | Return to Home |

### Advanced Features
- **Hold Shift**: Press any white key while holding Shift to navigate instantly
- **Audio Status**: Click to enable audio if not already enabled
- **Visual Feedback**: Watch the visualizer bars respond to your playing
- **Mobile Support**: Touch-friendly piano interface

---

## 📁 Project Structure

```
ashutosh-bhagat-portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
├── package.json        # Project dependencies
├── package-lock.json   # Locked dependency versions
└── README.md          # This file
```

### Key Components

#### `index.html`
- Semantic HTML5 structure
- Meta tags for SEO and social sharing
- Font and icon imports
- Complete page structure for all sections

#### `styles.css`
- CSS custom properties for theming
- Responsive design with media queries
- Advanced animations and transitions
- Dark theme with neon accents

#### `script.js`
- Interactive piano functionality
- Web Audio API implementation
- Navigation system
- Form handling and validation
- Scroll animations

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect it as a static site

2. **Deploy Settings**
   ```json
   {
     "buildCommand": "echo 'No build required'",
     "outputDirectory": ".",
     "installCommand": "npm install"
   }
   ```

3. **Environment Variables** (if needed)
   - Add any API keys or configuration in Vercel dashboard

### Alternative Deployment Options

#### Netlify
1. Drag and drop the project folder to Netlify
2. Or connect your GitHub repository
3. Deploy automatically on every push

#### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Select source branch (usually `main`)
3. Your site will be available at `https://username.github.io/repository-name`

---

## 🎨 Customization

### Colors
Modify the CSS custom properties in `styles.css`:

```css
:root {
    --neon-blue: #00D4FF;
    --neon-pink: #FF00AA;
    --neon-purple: #AA00FF;
    --neon-green: #00FF88;
    --neon-cyan: #00FFFF;
    --neon-orange: #FF6B00;
}
```

### Piano Keys
Update the piano configuration in `script.js`:

```javascript
const pianoKeys = [
    { name: 'C4', type: 'white', route: 'about', frequency: 261.63, label: 'About', keyboardKey: 'A', position: 0 },
    // Add or modify keys here
];
```

### Skills Data
Modify the skills array in `script.js`:

```javascript
const skillsData = [
    { name: 'Your Skill', level: 95, category: 'frontend', color: 'blue', icon: 'fas fa-code' },
    // Add your skills here
];
```

---

## 🔧 Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# The server will run on http://localhost:8080
```

### File Structure for Development
- **HTML**: Add new sections in `index.html`
- **CSS**: Add styles in `styles.css` following the existing pattern
- **JavaScript**: Add functionality in `script.js` with proper organization

### Browser Support
- Chrome 66+ (Web Audio API)
- Firefox 60+
- Safari 14+
- Edge 79+

---

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- **Desktop**: Full interactive experience
- **Tablet**: Touch-friendly piano interface
- **Mobile**: Optimized layout and navigation
- **Accessibility**: Keyboard navigation and screen reader support

---

## 🎵 Music & Audio

### Web Audio API Features
- **Real-time synthesis**: Generate tones on-the-fly
- **ADSR envelope**: Natural sound shaping
- **Filter effects**: Low-pass filtering for warmth
- **Polyphonic support**: Play multiple notes simultaneously

### Audio Compatibility
- **Automatic detection**: Checks for Web Audio API support
- **User interaction**: Requires user action to enable audio
- **Fallback handling**: Graceful degradation for unsupported browsers

---

## 🤝 Contributing

While this is a personal portfolio, I welcome feedback and suggestions:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Connect

<div align="center">

[📧 Email](mailto:asbh7190@gmail.com) • [💼 LinkedIn](https://linkedin.com/in/yourprofile) • [🐙 GitHub](https://github.com/yourusername) • [🎵 YouTube](https://youtube.com/@yourchannel)

</div>

---

## 🙏 Acknowledgments

- **Font Awesome** for the beautiful icons
- **Google Fonts** for the typography
- **Web Audio API** for the musical functionality
- **Vercel** for seamless deployment
- **The open-source community** for inspiration and tools

---

<div align="center">

**Made with ❤️ and 🎹 by Ashutosh Bhagat**

*Where code meets melody, and logic dances with creativity*

[⬆️ Back to Top](#-ashutosh-bhagat---portfolio)

</div> 