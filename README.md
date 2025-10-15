# AI Face Swap Video Platform

![App Preview](https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1200&h=300&fit=crop&auto=format)

A modern AI-powered face swap platform built with Next.js 15 and Cosmic CMS. Upload videos, detect faces automatically, and swap them with your chosen target faces - all completely free for videos up to 500 MB or 30 minutes.

## ✨ Features

- 🎭 **AI Face Detection**: Automatically detect and identify all faces in uploaded videos
- 🎯 **Interactive Face Selection**: Choose which face to swap with which target
- 📊 **Real-time Processing**: Track your video processing status with live updates
- 📁 **Project Management**: View and manage all your face swap projects
- 🎨 **Modern UI**: Clean, gradient-based design with intuitive user experience
- 🔄 **Multiple Status Tracking**: Monitor projects through pending, processing, completed, and failed states
- 📹 **Multi-format Support**: Works with MP4, MOV, AVI, MKV, and WebM
- ⚙️ **Admin Settings**: Configurable file size limits, duration limits, and service toggles

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ef25ca9c329a49d870efd5&clone_repository=68ef28c69c329a49d870effc)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build a website identical to "https://beart.ai/face-swap/?type=video". Only difference should be it should be free with unlimited access to all and max length of video upload should be 500 MB or 30 minutes. Have attached the base design for your reference"

### Code Generation Prompt

> The ai should identify faces from image and let end user decide which face one wants to swap with targeted one

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Content Management**: Cosmic CMS
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: Bun
- **UI Components**: Custom React components with Tailwind
- **Image Optimization**: Imgix (via Cosmic CDN)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account with the bucket configured
- Environment variables set up

### Installation

1. Clone the repository and install dependencies:

```bash
bun install
```

2. Set up your environment variables:

```bash
# .env.local
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

3. Run the development server:

```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Cosmic SDK Examples

### Fetching Video Projects

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all video projects with filtering
const response = await cosmic.objects
  .find({
    type: 'video-projects',
    'metadata.processing_status': 'completed'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const projects = response.objects
```

### Creating a New Project

```typescript
const newProject = await cosmic.objects.insertOne({
  type: 'video-projects',
  title: 'My Face Swap Project',
  metadata: {
    project_title: 'My Face Swap Project',
    description: 'Description of the project',
    processing_status: 'pending',
    video_duration: 120,
    file_size: 45
  }
})
```

### Updating Project Status

```typescript
await cosmic.objects.updateOne(projectId, {
  metadata: {
    processing_status: 'completed'
  }
})
```

## 🎨 Cosmic CMS Integration

This application uses two main content types:

### Settings (Singleton)
- **max_file_size**: Maximum file size in MB (500)
- **max_duration**: Maximum duration in minutes (30)
- **service_enabled**: Toggle service availability
- **announcement**: HTML banner for user announcements
- **supported_formats**: Comma-separated video formats

### Video Projects
- **project_title**: Name of the project
- **description**: Project description
- **original_video**: Source video file
- **result_video**: Processed video with face swap
- **processing_status**: pending | processing | completed | failed
- **video_duration**: Duration in seconds
- **file_size**: File size in MB
- **error_message**: Error details if processing failed

## 🌐 Deployment Options

### Deploy to Vercel

The easiest way to deploy this Next.js application:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above
2. Connect your repository
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

Alternative deployment option:

1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📝 License

This project is built with [Cosmic](https://www.cosmicjs.com) - a headless CMS for building modern applications.

<!-- README_END -->