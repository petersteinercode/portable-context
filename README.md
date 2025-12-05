# Portable Context Tool

A text editor for building reusable LLM prompt context with a two-pane interface.

## Features

- **Document Tree Management**: Organize documents into groups with hierarchical structure
- **Real-time Editing**: Edit documents with auto-save functionality
- **Selection System**: Select groups and documents with cascading selection
- **Context Assembly**: Copy selected content with proper formatting
- **Token Counting**: Live token estimation for selected content
- **Persistent Storage**: All data saved to Vercel Blob Storage automatically

## Deployment to Vercel

### Prerequisites

1. A Vercel account
2. Vercel Blob Storage enabled in your project

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Enable Vercel Blob Storage:**
   - Go to your Vercel project settings
   - Navigate to the "Storage" tab
   - Enable "Blob Storage"
   - This will automatically provide the `BLOB_READ_WRITE_TOKEN` environment variable

3. **Deploy to Vercel:**
   ```bash
   vercel
   ```
   
   Or connect your GitHub repository to Vercel for automatic deployments.

### Local Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the port Vercel assigns).

## Usage

1. Open the deployed app or `index.html` in your web browser
2. Create groups and documents using the "+" buttons
3. Select items using checkboxes (group selection cascades to documents)
4. Edit documents by clicking on them in the left pane
5. Use "Copy Context" to copy selected content to clipboard
6. Use "Empty Context" to deselect all items
7. Click the header to export/import your data

## Data Structure

The application stores data in Vercel Blob Storage with the following structure:

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

- Built with React 18
- Styled with Tailwind CSS
- Uses Vercel Blob Storage for persistence
- Fully self-contained in a single HTML file
- API routes for blob storage operations
- Falls back to localStorage if API is unavailable

## Browser Compatibility

- Modern browsers with ES6+ support
- Requires Fetch API support
- Requires Clipboard API for copy functionality
