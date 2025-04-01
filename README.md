# Personal Notepad - A Modern Web-Based Text Snippet Manager

Personal Notepad is a React-based web application that enables users to create, manage, and organize text snippets (pastes) with a clean and intuitive interface. 
This project was developed as a practice project to learn React-Redux and modern state management patterns.

Try it live at: https://paste-six-tau.vercel.app/

This application combines the power of React, Redux, and modern web technologies to deliver a responsive and user-friendly experience. 
Key features include:
- Create and edit text snippets with titles
- Real-time character counting and limit warnings
- Persistent storage using browser's local storage
- Search and filter functionality for saved snippets
- Copy-to-clipboard functionality
- Toast notifications for user feedback
- Modern state management using Redux Toolkit
- Responsive design with Tailwind CSS

## Repository Structure
```
personal-notepad/
├── src/                      # Source code directory
│   ├── components/          # Reusable UI components
│   │   └── Navbar.jsx      # Navigation component
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Main paste creation page
│   │   ├── Pastes.jsx      # List of saved pastes
│   │   └── ViewPaste.jsx   # Individual paste view
│   ├── redux/              # Redux state management
│   │   └── pasteSlice.jsx  # Paste-related actions and reducers
│   ├── App.jsx             # Main application component
│   ├── main.jsx           # Application entry point
│   └── store.js           # Redux store configuration
├── index.html             # HTML entry point
├── vite.config.js         # Vite build configuration
├── eslint.config.js       # ESLint configuration
└── package.json          # Project dependencies and scripts
```

## Usage Instructions
### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Modern web browser with localStorage support

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd personal-notepad

# Install dependencies
npm install

# Start development server
npm run dev
```

### Quick Start
1. Navigate to the home page
2. Enter a title for your paste in the "Title" field
3. Add your content in the "Content" textarea
4. Click "Create Paste" to save your snippet

### More Detailed Examples
#### Creating a New Paste
```jsx
// Navigate to the home page
// Enter title and content
const paste = {
  title: "My First Paste",
  content: "This is my first paste content"
};
// Click Create Paste button
```

#### Editing an Existing Paste
```jsx
// Navigate to /pastes
// Click on the paste you want to edit
// Modify content
// Click Update Paste button
```

### Troubleshooting
#### Common Issues
1. **Paste Not Saving**
   - Problem: Paste creation fails with duplicate title error
   - Solution: Ensure you're using a unique title for each paste
   ```javascript
   // Check existing pastes in localStorage
   console.log(JSON.parse(localStorage.getItem("pastes")))
   ```

2. **Local Storage Issues**
   - Problem: Pastes not persisting after browser refresh
   - Solution: 
     - Clear browser cache
     - Check browser's localStorage permissions
     ```javascript
     // Verify localStorage access
     localStorage.setItem('test', 'test');
     console.log(localStorage.getItem('test'));
     ```

## Data Flow
The application manages paste data through Redux state management with local storage persistence.

```ascii
[User Input] -> [Redux Store] -> [Local Storage]
      ^                ^
      |                |
      v                v
[UI Components] <- [State Updates]
```

Component Interactions:
1. User creates/edits paste in Home component
2. Redux actions dispatch state changes
3. PasteSlice handles state updates and localStorage persistence
4. UI components react to state changes through Redux selectors
5. Toast notifications provide user feedback
6. Router handles navigation between views
7. ViewPaste component retrieves individual paste data from store
