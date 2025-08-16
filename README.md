# Kanban Board
Mini Kanban board built with React and TS.

## Features

- **Drag & Drop**: Seamlessly move tasks between columns
- **Task Management**: Create, edit, and delete tasks with descriptions and comments
- **Column Operations**: Add, rename, and remove columns dynamically
- **Persistent Storage**: Data persists across browser sessions using localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant UI updates with React Context API and State Management

## Installation

```bash
npm install
npm run dev
```

go to http://localhost:5173/

## Technical Approach

### Design Philosophy

I chose Trello.com as inspiration for this Kanban board due to its minimalist design and intuitive user experience. This approach allows me to demonstrate fundamental React development skills while creating a practical, user-friendly application.

### State Management

I implemented React's Context API for state management. While I have experience with Redux, Zustand, and other state management solutions, Context API provides the perfect balance of simplicity and power.

### Styling Strategy

I opted for vanilla CSS to maximize development speed and maintain full control over the styling. While I'm proficient with styled-components, Material-UI, shadcn/ui, and Tailwind CSS, vanilla CSS allows for rapid prototyping and precise customization without additional dependencies.

- Used Lucide React icons for icons

### How to test
- add new column
- rename existing columns
- delete columns
- add new tasks
- edit existing tasks
- delete tasks
- add comments
- edit comments
- delete comments
- move tasks between columns
- move tasks on same columns
- check data persist on refresh
  
### Improvements
- Nested comments Reddit style. If I had more time, I would implement the bonus of nested comments.
    - Logic: ParentId field references another comment, can use recursive strategy starting with parentId = null
- Keyboard Navigation
- Unit Testing
- In a production setting, connect to a DB, load and update tasks there.
- Remove confirm windows and use a proper modal
- Perform optimizations (on context for example, if there are unnecessary/extra renders upon state updates)

