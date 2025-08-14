# Kanban Board

A modern, responsive Kanban board application built with React and TypeScript, inspired by Trello's clean and intuitive interface.

## Features

- **Drag & Drop**: Seamlessly move tasks between columns
- **Task Management**: Create, edit, and delete tasks with descriptions and comments
- **Column Operations**: Add, rename, and remove columns dynamically
- **Persistent Storage**: Data persists across browser sessions using localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant UI updates with React Context API

## Installation

```bash
npm install
npm run dev
```

Bootstrapped with Vite

## Technical Approach

### Design Philosophy

I chose Trello.com as inspiration for this Kanban board due to its minimalist design and intuitive user experience. This approach allows me to demonstrate fundamental React development skills while creating a practical, user-friendly application.

### State Management

I implemented React's Context API for state management, leveraging its built-in capabilities for prop drilling avoidance and component communication. While I have experience with Redux, Zustand, and other state management solutions, Context API provides the perfect balance of simplicity and power for this application's needs.

### Styling Strategy

I opted for vanilla CSS to maximize development speed and maintain full control over the styling. While I'm proficient with styled-components, Material-UI, shadcn/ui, and Tailwind CSS, vanilla CSS allows for rapid prototyping and precise customization without additional dependencies.

### Architecture Highlights

- **Component Structure**: Modular components with clear separation of concerns
- **Type Safety**: Full TypeScript implementation for better development experience
- **Custom Hooks**: Reusable logic extraction for column, task, and comment operations
- **Local Storage**: Persistent data management without external dependencies
