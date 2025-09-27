# AgroSena - Agricultural Job Matching Platform

A modern, responsive website built with Next.js 14, TypeScript, and Tailwind CSS for AgroSena, a platform that connects agricultural workers with land owners.

## 🌱 Features

- **Job Matching Platform**: Connects agricultural workers with land owners
- **User Authentication**: Complete login system with registration and password recovery
- **Modern Design**: Clean, professional design with agricultural theme
- **Responsive**: Mobile-first design that works on all devices
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Meta tags, OpenGraph, and Twitter Card support
- **Performance**: Optimized images, lazy loading, and fast loading times
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FarmSena
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                 # Next.js 14 App Router
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout with metadata
│   └── page.tsx        # Homepage
├── components/         # React components
│   ├── Header.tsx      # Navigation header with login button
│   ├── Hero.tsx        # Hero section for job matching
│   ├── Features.tsx    # Platform features showcase
│   ├── Services.tsx    # Services for workers and owners
│   ├── About.tsx       # About the platform
│   ├── Contact.tsx     # Contact form and info
│   ├── Footer.tsx      # Site footer
│   └── LoginPanel.tsx  # Authentication modal
├── lib/               # Utility functions
│   └── utils.ts       # Common utilities
└── styles/            # Additional styles (if needed)
```

## 🛠️ Built With

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **ESLint & Prettier** - Code formatting and linting

## 🎨 Design System

### Colors
- **Primary Green**: Agricultural theme with various shades
- **Secondary Yellow**: Complementary accent color
- **Neutral Grays**: Text and background colors

### Typography
- **Font**: Inter (Google Fonts)
- **Responsive**: Fluid typography that scales with screen size

### Components
- Consistent spacing and border radius
- Hover states and smooth transitions
- Focus states for accessibility

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: 
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Screen reader friendly

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## 🚀 Deployment

The project is ready for deployment on platforms like:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Digital Ocean App Platform**

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

This is a client project. Please follow the established coding standards and get approval before making significant changes.

## 📞 Support

For support and questions, contact the development team.

---

Built with ❤️ for modern agriculture
