# GeoAnalyzer

GeoAnalyzer is an interactive 3D model viewer with features for collaboration and analysis inspired by the product made by CoLab Software. It allows users to inspect 3D models, add comments, and take measurements.

## Features

- **3D Model Viewer:** Render and interact with 3D models in the browser.
  - **Wireframe Mode:** Toggle between solid and wireframe rendering.
  - **Color Picker:** Change the color of the 3D model.
- **Model Rotation:**
  - Independently rotate the model on the X, Y, and Z axes.
  - Control the speed of rotation for each axis.
- **Lighting Control:** Adjust the intensity of the ambient and directional lights in the scene.
- **Commenting System:**
  - Place comment markers on the 3D model.
  - Add messages to comment threads.
  - Delete comments.
- **Measurement Tools:**
  - **Distance Measurement:** Measure the distance between two points on the model.
  - **Angle Measurement:** Measure the angle formed by three points on the model.
- **Interactive Background:** An animated background of floating lines that responds to mouse movement.

## Skills Demonstrated

This project demonstrates a wide range of skills in modern web development and 3D graphics:

- **React:** The application's UI is built with React, using functional components and hooks for state management.
- **Three.js & @react-three/fiber:** The 3D rendering is powered by Three.js, with `@react-three/fiber` used as a React renderer for Three.js. This allows for a declarative and component-based approach to building the 3D scene.
- **@react-three/drei:** This library provides useful helpers and abstractions for `@react-three/fiber`, such as `OrbitControls`.
- **TypeScript:** The entire codebase is written in TypeScript, providing static typing for improved code quality and maintainability.
- **Geometry and Vector Math:** The measurement tools feature required calculations with vectors and geometry to determine distances and angles in 3D space.
- **Interactive UI/UX:** The application features a responsive UI with interactive tools and controls, providing a seamless user experience.
- **State Management:** Complex application state, including comments, measurements, and tool states, is managed effectively using React's `useState` hook.
- **Vite:** The project is built and served using Vite, a modern and fast build tool for web development.

## Getting Started

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to the local URL provided by Vite.
