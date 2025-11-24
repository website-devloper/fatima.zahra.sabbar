// Script to seed the database with initial blog posts
// Run with: node --loader ts-node/esm scripts/seedBlog.ts
// Or add to package.json: "seed": "node scripts/seedBlog.js"

import dbConnect from '../lib/mongodb';
import BlogPost from '../models/BlogPost';

const seedPosts = [
    {
        slug: 'modern-web-development-trends-2024',
        title: 'Modern Web Development Trends in 2024',
        excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps.',
        content: `
      <h2>Introduction</h2>
      <p>The web development landscape is evolving rapidly, and 2024 brings exciting new trends that are reshaping how we build digital experiences. In this article, we'll explore the most important trends that every developer should know about.</p>
      
      <h3>1. AI-Powered Development</h3>
      <p>Artificial Intelligence is revolutionizing how we write code and build applications. From GitHub Copilot to ChatGPT, AI tools are becoming essential companions for developers, helping us write better code faster.</p>
      
      <h3>2. Server Components and Edge Computing</h3>
      <p>React Server Components and edge computing are changing how we think about rendering and performance. These technologies allow us to build faster, more efficient applications by processing data closer to the user.</p>
      
      <h3>3. Progressive Web Apps (PWAs)</h3>
      <p>PWAs continue to bridge the gap between web and native applications, offering offline capabilities, push notifications, and app-like experiences directly in the browser.</p>
      
      <h3>4. TypeScript Everywhere</h3>
      <p>TypeScript has become the de facto standard for modern JavaScript development, providing type safety and better developer experience across the entire stack.</p>
      
      <h2>Conclusion</h2>
      <p>Staying updated with these trends is crucial for building competitive, modern web applications. As we move forward, the focus remains on performance, user experience, and developer productivity.</p>
    `,
        image: '/blog/web-trends.jpg',
        author: 'Fatima Zahra Sabbar',
        category: 'Web Development',
        tags: ['React', 'Next.js', 'AI', 'PWA', 'TypeScript'],
        readTime: '5 min read',
        published: true,
    },
    {
        slug: 'building-scalable-applications-with-nextjs',
        title: 'Building Scalable Applications with Next.js',
        excerpt: 'Learn best practices for creating high-performance, scalable web applications using Next.js and modern development patterns.',
        content: `
      <h2>Why Next.js?</h2>
      <p>Next.js has become the go-to framework for building production-ready React applications. Its powerful features like server-side rendering, static site generation, and API routes make it perfect for scalable applications.</p>
      
      <h3>Key Features for Scalability</h3>
      <h4>1. Automatic Code Splitting</h4>
      <p>Next.js automatically splits your code into smaller bundles, ensuring users only download what they need for each page. This significantly improves initial load times and overall performance.</p>
      
      <h4>2. Image Optimization</h4>
      <p>The built-in Image component automatically optimizes images, serves them in modern formats like WebP, and implements lazy loading out of the box.</p>
      
      <h4>3. API Routes</h4>
      <p>Build your backend API directly within your Next.js application, creating a seamless full-stack development experience.</p>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Use Server Components for data-heavy operations</li>
        <li>Implement proper caching strategies</li>
        <li>Optimize database queries and API calls</li>
        <li>Use incremental static regeneration for dynamic content</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Next.js provides all the tools you need to build scalable, performant applications. By following these best practices, you can create applications that handle millions of users while maintaining excellent performance.</p>
    `,
        image: '/blog/nextjs-scalable.jpg',
        author: 'Fatima Zahra Sabbar',
        category: 'Development',
        tags: ['Next.js', 'React', 'Scalability', 'Performance'],
        readTime: '7 min read',
        published: true,
    },
    {
        slug: 'automation-workflows-boost-productivity',
        title: 'How Automation Workflows Can Boost Your Productivity',
        excerpt: 'Discover how implementing smart automation workflows can save hours of manual work and supercharge your productivity.',
        content: `
      <h2>The Power of Automation</h2>
      <p>In today's fast-paced digital world, automation isn't just a luxury—it's a necessity. By automating repetitive tasks, you can focus on what truly matters: creative problem-solving and strategic thinking.</p>
      
      <h3>Types of Workflows to Automate</h3>
      
      <h4>1. Development Workflows</h4>
      <p>Automate your build processes, testing, and deployment with CI/CD pipelines. Tools like GitHub Actions and Jenkins can save hours of manual work every week.</p>
      
      <h4>2. Content Management</h4>
      <p>Set up automated content publishing, social media posting, and email marketing campaigns to maintain consistent communication with your audience.</p>
      
      <h4>3. Data Processing</h4>
      <p>Use scripts and tools to automatically collect, process, and analyze data, turning raw information into actionable insights.</p>
      
      <h3>Tools and Technologies</h3>
      <p>Modern automation relies on a combination of:</p>
      <ul>
        <li>Zapier and Make.com for no-code automation</li>
        <li>Python scripts for custom workflows</li>
        <li>AI tools for intelligent task handling</li>
        <li>Cloud functions for serverless automation</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Start small by identifying one repetitive task in your workflow. Automate it, measure the time saved, and gradually expand to other areas. The cumulative effect can be transformative.</p>
    `,
        image: '/blog/automation.jpg',
        author: 'Fatima Zahra Sabbar',
        category: 'Productivity',
        tags: ['Automation', 'AI', 'Productivity', 'Workflows'],
        readTime: '6 min read',
        published: true,
    },
    {
        slug: 'mastering-responsive-design',
        title: 'Mastering Responsive Design in Modern Web Development',
        excerpt: 'A comprehensive guide to creating beautiful, responsive websites that work flawlessly across all devices.',
        content: `
      <h2>What is Responsive Design?</h2>
      <p>Responsive design is the practice of creating websites that adapt seamlessly to different screen sizes and devices. In an era where mobile traffic exceeds desktop, it's more important than ever.</p>
      
      <h3>Core Principles</h3>
      
      <h4>1. Fluid Grids</h4>
      <p>Use percentage-based widths instead of fixed pixels to create layouts that adapt to any screen size. Modern CSS Grid and Flexbox make this easier than ever.</p>
      
      <h4>2. Flexible Images</h4>
      <p>Images should scale proportionally and never overflow their containers. Use max-width: 100% and modern responsive image techniques like srcset.</p>
      
      <h4>3. Media Queries</h4>
      <p>Media queries allow you to apply different styles based on device characteristics like screen width, height, and orientation.</p>
      
      <h3>Modern Approaches</h3>
      <p>Today's responsive design goes beyond just making things fit on smaller screens:</p>
      <ul>
        <li>Mobile-first design approach</li>
        <li>Container queries for component-level responsiveness</li>
        <li>Responsive typography with clamp() and viewport units</li>
        <li>Touch-friendly interfaces with appropriate tap targets</li>
      </ul>
      
      <h3>Testing Your Design</h3>
      <p>Always test on real devices when possible. Emulators are helpful, but nothing beats testing on actual hardware to catch subtle issues.</p>
      
      <h2>Conclusion</h2>
      <p>Responsive design is not optional in modern web development—it's fundamental. By mastering these techniques, you'll create experiences that delight users on any device.</p>
    `,
        image: '/blog/responsive-design.jpg',
        author: 'Fatima Zahra Sabbar',
        category: 'Design',
        tags: ['CSS', 'Responsive Design', 'UI/UX', 'Mobile'],
        readTime: '8 min read',
        published: true,
    },
];

async function seedDatabase() {
    try {
        await dbConnect();
        console.log('Connected to MongoDB');

        // Clear existing posts
        await BlogPost.deleteMany({});
        console.log('Cleared existing blog posts');

        // Insert seed data
        const result = await BlogPost.insertMany(seedPosts);
        console.log(`Successfully seeded ${result.length} blog posts`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
