# Nagarjun Mallesh - Portfolio Website

A modern, production-ready portfolio website built with Next.js 15, featuring smooth animations, Medium blog integration, and a clean, professional design.

## ✨ Features

- 🎨 **Modern Design**: Clean, professional UI with smooth animations using Framer Motion
- 📱 **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- 📝 **Medium Blog Integration**: Automatically fetches and displays your latest Medium articles
- 🚀 **Performance Optimized**: Built with Next.js 15 for optimal performance
- ♿ **Accessible**: WCAG compliant with proper semantic HTML and ARIA labels
- 🎭 **Smooth Scrolling**: Lenis smooth scroll integration
- 🎯 **SEO Optimized**: Comprehensive metadata and Open Graph tags

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Icons**: Heroicons & React Icons
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NagarjunMa/PersonalPortfolio.git
cd PersonalPortfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional):
```bash
cp .env.example .env.local
```

4. Update the Medium username in `.env.local`:
```env
MEDIUM_USERNAME=your-medium-username
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
techportfolio/
├── app/
│   ├── api/
│   │   └── blogs/          # Medium RSS API route
│   ├── components/         # React components
│   ├── providers/          # Context providers (smooth scroll)
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Home page
├── public/
│   ├── fonts/              # Custom fonts
│   └── Logo/               # Brand assets
├── next.config.ts          # Next.js configuration
└── tailwind.config.js      # Tailwind configuration
```

## 🎨 Key Components

- **NavBar**: Responsive navigation with smooth scroll
- **Introduction**: Hero section with animations
- **About**: About section with tech stack
- **BlogSection**: Fetches and displays Medium articles
- **Contact**: Contact form with validation
- **Footer**: Footer with social links

## 🔧 Configuration

### Medium Blog Integration

The portfolio automatically fetches your Medium articles using the RSS2JSON API. To customize:

1. Set your Medium username in `.env.local`
2. The API fetches up to 6 most recent articles
3. Articles are cached for 30 minutes

### Image Optimization

Medium CDN images are configured in `next.config.ts`:
- `cdn-images-1.medium.com`
- `miro.medium.com`
- `medium.com`

### SEO

Update metadata in `app/layout.tsx`:
- Title, description, keywords
- Open Graph tags
- Twitter Card metadata

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NagarjunMa/PersonalPortfolio)

### Environment Variables

Set these in your deployment platform:

```env
MEDIUM_USERNAME=your-medium-username
```

## 📝 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  primary: '#00ADF4',
  background: '#081C29',
}
```

### Fonts

Custom fonts are loaded in `app/layout.tsx`. Add new fonts or modify existing ones there.

## 🐛 Troubleshooting

### Medium blogs not loading

- Verify your Medium username is correct
- Check network requests in browser DevTools
- Ensure RSS2JSON API is accessible

### Build errors

- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (18+ required)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Nagarjun Mallesh - [@nagarjunmallesh](https://medium.com/@nagarjunmallesh)

Project Link: [https://github.com/NagarjunMa/PersonalPortfolio](https://github.com/NagarjunMa/PersonalPortfolio)
