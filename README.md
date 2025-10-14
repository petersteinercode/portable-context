# Portable Context Tool

A text editor for building reusable LLM prompt context with a two-pane interface.

## Features

- **Document Tree Management**: Organize documents into groups with hierarchical structure
- **Real-time Editing**: Edit documents with auto-save functionality
- **Selection System**: Select groups and documents with cascading selection
- **Context Assembly**: Copy selected content with proper formatting
- **Token Counting**: Live token estimation for selected content
- **Persistent Storage**: All data saved to localStorage automatically

## Usage

1. Open `index.html` in your web browser
2. Create groups and documents using the "+" buttons
3. Select items using checkboxes (group selection cascades to documents)
4. Edit documents by clicking on them in the left pane
5. Use "Copy Context" to copy selected content to clipboard
6. Use "Empty Context" to deselect all items

## Data Structure

The application stores data in localStorage with the following structure:

```typescript
interface ContextStore {
  groups: Group[];
}

interface Group {
  id: string;
  name: string;
  documents: Document[];
  selected: boolean;
  collapsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Document {
  id: string;
  name: string;
  content: string;
  selected: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Context Format

When copying context, the format is:

```
# Group Name
## Document Name
{content}

# Another Group
## Another Document
{content}
```

## Technical Details

- Built with React 18 and TypeScript
- Styled with Tailwind CSS
- Uses Lucide React icons
- Fully self-contained in a single HTML file
- No build process required
- Works offline

## Browser Compatibility

- Modern browsers with ES6+ support
- Requires localStorage support
- Requires Clipboard API for copy functionality
