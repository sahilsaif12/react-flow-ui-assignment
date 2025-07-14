# React Flow Chatbot Builder UI
## Live- https://react-flow-ui-assignment-sk-saifuddin.vercel.app/

A modern, extensible chatbot flow builder UI built with React, TypeScript, and [@xyflow/react](https://xyflow.com/). Drag and drop nodes to visually design conversational flows, connect them, and edit node settings—all with a beautiful, scalable UX.

## Features

- **Drag & Drop Node Creation:**
  - Add nodes from a right-side panel to the canvas with a live preview of the actual node design.
- **Custom Node Types:**
  - Easily add new node types by updating a config array—no code duplication.
- **Custom Edges:**
  - Edges have arrowheads and can be extended with custom features (e.g., cancel buttons).
- **Node Selection & Editing:**
  - Click a node to open a settings panel and edit its content.
- **Connection Validation:**
  - Prevents multiple outgoing connections from the same handle.
- **Flow Validation & Save:**
  - Validates the flow before saving; shows success/error toasts.
- **Responsive, Modern UI:**
  - Built with Tailwind CSS and Lucide icons for a clean, accessible look.

## Tech Stack

- React + TypeScript
- [@xyflow/react](https://xyflow.com/) (formerly React Flow)
- Tailwind CSS
- shadcn 
- Lucide React Icons

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repo
$ git clone <your-repo-url>
$ cd react-flow-msg

# Install dependencies
$ npm install
# or
$ yarn install
```

### Running the App

```bash
# Start the development server
$ npm run dev
# or
$ yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Add a Node:** Drag a node from the right panel onto the canvas. The drag preview matches the actual node design.
- **Connect Nodes:** Drag from a node's handle to another node to create a connection.
- **Edit Node:** Click a node to open its settings panel and edit its content.
- **Save Flow:** Click the "Save Changes" button in the header. Validation ensures all nodes are connected.

## Adding New Node Types

1. Open `src/components/NodesPanel.tsx`.
2. Add a new object to the `nodeTypes` array with:
   - `type`: unique string
   - `label`, `description`, `icon`
   - `renderPreview`: a function returning the React element for the drag preview
3. Implement the node component in `src/components/nodes/` and register it in `Home.tsx`'s `nodeTypes`.
4. (Optional) Add settings UI in `Settingspanel.tsx`.

## Project Structure

```
react-flow-msg/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Home.tsx
│   │   ├── NodesPanel.tsx
│   │   ├── Settingspanel.tsx
│   │   ├── ui/
│   │   │   ├── NodeTypeCard.tsx
│   │   │   └── button.tsx
│   │   ├── nodes/
│   │   │   └── TextNode.tsx
│   │   └── edges/
│   │       └── CustomEdgeWithBtn.tsx
│   ├── utils/
│   │   └── flowValidation.ts
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md
```

## Customization & Extensibility

- **Node Types:** Add new node types by updating the config and creating a new component.
- **Edge Types:** Add new edge types in `Home.tsx` and implement in `components/edges/`.
- **Validation:** Customize flow validation in `utils/flowValidation.ts`.
- **UI:** All UI is built with Tailwind CSS for easy theming.
