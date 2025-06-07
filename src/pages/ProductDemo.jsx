import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Users, Target, Zap, Globe, BarChart3, Shield, ArrowRight,
  CheckCircle, Menu, X, Sparkles, Brain, Database, MessageSquare,
  MousePointer2, ChevronLeft, ChevronRight, GraduationCap, Store,
  Briefcase, MessageCircle, Link, Mail, Phone
} from 'lucide-react'; // Added more Lucide icons for profiles

// --- DEMO DATA START ---
const demoProfiles = [
  {
    id: 'p1',
    type: 'professional',
    name: 'Dr. Evelyn Reed',
    headline: 'Chief AI Ethicist at InnovateTech | Public Speaker & Author on Responsible AI',
    location: 'London, UK',
    email: 'evelyn.reed@example.com',
    social: {
      linkedin: 'https://linkedin.com/in/evelynreed',
      twitter: 'https://twitter.com/EvelynAI_Ethic',
      website: 'https://evelynreed.ai'
    },
    bio: "Dr. Evelyn Reed is a leading voice in AI ethics, passionate about developing and implementing ethical guidelines for artificial intelligence. Her work at InnovateTech focuses on ensuring AI systems are fair, transparent, and accountable. She's a sought-after speaker and the author of 'AI for Good: Navigating the Ethical Frontier.'",
    details: { // Specific details for professionals
      skills: ['AI Ethics', 'Machine Learning', 'Public Speaking', 'Policy Development', 'Data Governance'],
      experience: [
        { title: 'Chief AI Ethicist', company: 'InnovateTech', duration: '2022 - Present' },
        { title: 'Senior AI Researcher', company: 'FutureLabs Institute', duration: '2018 - 2022' }
      ]
    },
    outreachInsights: {
      professional: "Highlight shared interest in AI ethics. Reference her recent publications or talks. Suggest a collaboration on an ethical AI framework or a joint speaking opportunity.",
      personal: "If cold outreach, focus on genuine appreciation for her work. Mention specific insights from her book. Ask for a brief virtual coffee chat to discuss her vision for AI's future."
    },
    keywords: ['AI ethics', 'public speaker', 'author', 'responsible AI', 'London', 'InnovateTech', 'AI policy', 'ethics']
  },
  {
    id: 'p2',
    type: 'influencer',
    name: 'FitFlow Femi',
    headline: 'Yoga & Wellness Influencer | Certified Vinyasa Instructor | Johannesburg, South Africa',
    location: 'Johannesburg, South Africa',
    email: 'femiflow@example.com',
    social: {
      instagram: 'https://instagram.com/fitflowfemi',
      youtube: 'https://youtube.com/fitflowfemi_yoga',
      tiktok: 'https://tiktok.com/@fitflowfemi'
    },
    bio: "Femi brings dynamic energy to every flow, inspiring thousands to find their inner calm and strength through yoga. With over 150k followers on Instagram, she shares daily routines, mindful living tips, and delicious plant-based recipes. Certified in Vinyasa flow, her mission is to make yoga accessible to everyone.",
    details: { // Specific details for influencers
      followers: { instagram: '155k', youtube: '50k', tiktok: '80k' },
      engagementRate: '4.2%',
      contentStyle: ['Dynamic Yoga Flows', 'Mindful Living', 'Plant-Based Recipes', 'Product Reviews (Wellness)']
    },
    outreachInsights: {
      brandCollaboration: "Propose a product placement or sponsored post relevant to yoga/wellness. Offer a free sample of your product for review. Mention her engagement rate and specific content style that aligns with your brand. Suggest a mutually beneficial campaign.",
      personal: "Express genuine appreciation for her positive energy. Share how her content has helped you. Ask a specific question about her favorite pose or mindfulness technique. Keep it authentic."
    },
    keywords: ['fitness influencer', 'yoga', 'Vinyasa', 'Johannesburg', 'wellness', 'South Africa', '100k+ followers', 'influencer', 'fitness']
  },
  {
    id: 'p3',
    type: 'business',
    name: 'Lagos Taste Buds',
    headline: 'Authentic Nigerian Street Food & Catering | Lagos, Nigeria',
    location: 'Lagos, Nigeria',
    email: 'lagostastebuds@example.com',
    social: {
      instagram: 'https://instagram.com/lagostastebuds',
      facebook: 'https://facebook.com/LagosTasteBuds',
      website: 'https://lagostastebuds.ng'
    },
    bio: "Lagos Taste Buds offers a culinary journey through Nigeria's vibrant street food scene. From sizzling suya to savory puff-puff, we bring authentic flavors to your events and daily cravings. Specializing in corporate catering and local pop-ups across Lagos.",
    details: { // Specific details for businesses
      cuisine: ['Nigerian', 'Street Food', 'Catering'],
      specialties: ['Suya', 'Puff-Puff', 'Jollof Rice', 'Small Chops'],
      serviceArea: ['Lagos Island', 'Lekki', 'Victoria Island', 'Surulere'],
      customerReviews: "4.8/5 on Google Reviews, praised for authentic taste and prompt service."
    },
    outreachInsights: {
      b2bCollaboration: "Propose a partnership for corporate events or office catering. Offer a tasting session for their team. Inquire about their capacity for large orders and delivery logistics. Highlight mutual client benefit.",
      customerQuery: "Ask about their daily menu or upcoming pop-up locations. Inquire about catering options for a specific event date. Mention a favorite dish you've heard about or tried. Inquire about bulk orders."
    },
    keywords: ['food vendor', 'catering', 'Lagos', 'Nigerian food', 'street food', 'pop-ups', 'business', 'restaurant']
  },
  {
    id: 'p4',
    type: 'professional',
    name: 'Sarah Chen',
    headline: 'Senior Product Manager (SaaS Cybersecurity) at CyberGuard Solutions | Berlin, Germany',
    location: 'Berlin, Germany',
    email: 'sarah.chen@example.com',
    social: {
      linkedin: 'https://linkedin.com/in/sarahchenpm',
      medium: 'https://medium.com/@sarahchen_pm'
    },
    bio: "Sarah is a seasoned product manager with a decade of experience in building and scaling B2B SaaS products, specifically in the cybersecurity domain. She excels at translating complex technical requirements into user-friendly solutions and leading cross-functional teams.",
    details: {
      skills: ['Product Management', 'SaaS', 'Cybersecurity', 'Agile Methodologies', 'Market Analysis', 'UX/UI'],
      experience: [
        { title: 'Senior Product Manager', company: 'CyberGuard Solutions', duration: '2020 - Present' },
        { title: 'Product Manager', company: 'SecureNet', duration: '2017 - 2020' }
      ]
    },
    outreachInsights: {
      professional: "Connect on LinkedIn with a personalized message. Mention recent product launches or industry news relevant to her expertise. Suggest an informational interview to learn about her experience in cybersecurity product management. Focus on shared industry challenges.",
      recruitment: "Highlight an open role that aligns with her experience and career goals. Mention specific projects or challenges she might find engaging at your company. Emphasize growth opportunities."
    },
    keywords: ['B2B SaaS', 'cybersecurity', 'product manager', 'Berlin', 'Germany', 'tech startup', 'professional', 'SaaS']
  },
  {
    id: 'p5',
    type: 'freelancer',
    name: 'Alex Designs',
    headline: 'Freelance Graphic Designer | Branding & UI/UX for Tech Startups | New York, USA',
    location: 'New York, USA',
    email: 'alex.designs@example.com',
    social: {
      behance: 'https://behance.net/alexdesigns',
      dribbble: 'https://dribbble.com/alexdesigns',
      website: 'https://alexdesigns.com'
    },
    bio: "Alex is a creative graphic designer specializing in crafting compelling brand identities and intuitive UI/UX for early-stage tech startups. He believes in design that not only looks good but also drives user engagement and business growth. Portfolio available on website.",
    details: {
      services: ['Brand Identity', 'Logo Design', 'UI/UX Design', 'Web Design', 'Marketing Collateral', 'Illustration'],
      portfolioLink: 'https://alexdesigns.com/portfolio',
      hourlyRate: '$75/hour (negotiable for larger projects)'
    },
    outreachInsights: {
      projectProposal: "Clearly outline your project needs and budget. Attach a creative brief. Reference specific portfolio pieces that impress you. Suggest a brief discovery call to discuss vision.",
      collaboration: "Suggest a potential design collaboration or partnership on a new venture. Explain mutual benefits. Focus on skill synergy for a joint project."
    },
    keywords: ['freelance graphic designer', 'branding', 'UI/UX', 'tech startups', 'New York', 'logo design', 'freelancer', 'designer']
  },
  {
    id: 'p6',
    type: 'tutor',
    name: 'Prof. David Olumide',
    headline: 'Online Tutor for Advanced Calculus & Engineering Mathematics',
    location: 'Remote | Lagos, Nigeria',
    email: 'david.math@example.com',
    social: {
      linkedin: 'https://linkedin.com/in/davidolumide',
      website: 'https://prof.davidolumide.com'
    },
    bio: "Prof. David Olumide is an experienced educator with over 20 years in university-level mathematics. He offers personalized online tutoring for advanced calculus, linear algebra, and engineering mathematics, helping students master complex concepts with clarity.",
    details: {
      subjects: ['Advanced Calculus', 'Linear Algebra', 'Differential Equations', 'Engineering Mathematics', 'Physics'],
      teachingStyle: ['Problem-solving focused', 'Conceptual understanding', 'Personalized pace'],
      availability: 'Weekdays: 4 PM - 8 PM WAT, Weekends: 10 AM - 6 PM WAT'
    },
    outreachInsights: {
      tutoringInquiry: "State the specific subject and topics you need help with. Mention your current academic level and learning goals. Inquire about his availability and rates. Propose a short introductory session.",
      collaboration: "If another tutor, suggest a collaborative project or resource sharing. If an institution, propose a partnership for student support. Highlight the benefit to students."
    },
    keywords: ['online tutoring', 'advanced calculus', 'engineering mathematics', 'Lagos', 'remote tutor', 'math tutor', 'tutor', 'professor']
  },
  {
    id: 'p7',
    type: 'influencer',
    name: 'Eco Explorer Emma',
    headline: 'Sustainable Travel & Lifestyle Blogger | Vancouver, Canada',
    location: 'Vancouver, Canada',
    email: 'emma.explore@example.com',
    social: {
      instagram: 'https://instagram.com/ecoexploreemma',
      blog: 'https://ecoexplore.blog',
      pinterest: 'https://pinterest.com/ecoexploreemma'
    },
    bio: "Emma is passionate about exploring the world responsibly and sharing eco-friendly tips for travel, home, and fashion. Her blog and social media platforms inspire conscious living and sustainable choices for a better planet.",
    details: {
      followers: { instagram: '85k', blog: '30k unique visitors/month', pinterest: '120k' },
      engagementRate: '3.5%',
      contentStyle: ['Sustainable Travel Guides', 'Eco-friendly Product Reviews', 'Minimalist Living', 'Ethical Fashion']
    },
    outreachInsights: {
      brandCollaboration: "Propose a partnership with a sustainable travel brand or eco-conscious product. Offer to create engaging content that highlights your brand's commitment to sustainability. Focus on authentic storytelling.",
      eventInvite: "Invite to an eco-friendly event or product launch. Offer exclusive access or a sneak peek. Emphasize alignment with her values."
    },
    keywords: ['sustainable travel', 'eco-friendly', 'lifestyle blogger', 'Vancouver', 'influencer', 'ethical fashion']
  },
  {
    id: 'p8',
    type: 'business',
    name: 'TechSolutions Africa',
    headline: 'Bespoke Software Development & IT Consulting | Nairobi, Kenya',
    location: 'Nairobi, Kenya',
    email: 'info@techsolutions.africa',
    social: {
      linkedin: 'https://linkedin.com/company/techsolutions-africa',
      website: 'https://techsolutions.africa'
    },
    bio: "TechSolutions Africa is a leading IT consulting firm specializing in bespoke software development, cloud solutions, and digital transformation for businesses across Africa. We empower organizations with innovative technology to drive growth and efficiency.",
    details: {
      services: ['Custom Software Development', 'Cloud Migration', 'Cybersecurity Consulting', 'IT Strategy'],
      industryFocus: ['FinTech', 'Healthcare', 'Logistics'],
      clientTestimonials: "Rated 5/5 for customer satisfaction, praised for technical expertise and timely delivery."
    },
    outreachInsights: {
      b2bCollaboration: "Propose a technology partnership or joint venture for a specific market need. Highlight complementary services. Suggest a meeting to discuss potential synergies.",
      salesLead: "Clearly state your company's IT challenges and how their services might provide a solution. Request a consultation or demo of their capabilities. Focus on specific business needs."
    },
    keywords: ['software development', 'IT consulting', 'Nairobi', 'Kenya', 'FinTech solutions', 'business', 'tech']
  },
  {
    id: 'p9',
    type: 'random person', // Example of a "random person" search
    name: 'Chinyere Okafor',
    headline: 'Community Organizer | Passionate about Local Arts & Culture | Enugu, Nigeria',
    location: 'Enugu, Nigeria',
    email: 'chinyere.okafor.community@example.com',
    social: {
      facebook: 'https://facebook.com/chinyere.okafor.community',
      blog: 'https://enuguartsblog.com/chinyere'
    },
    bio: "Chinyere is a vibrant community organizer dedicated to promoting and preserving local arts and cultural heritage in Enugu. She frequently organizes workshops, festivals, and advocacy programs to empower local artists and engage the community.",
    details: {
      communityProjects: ['Annual Enugu Arts Festival', 'Youth Mentorship Program', 'Local Artist Spotlight Series'],
      interests: ['Traditional Dance', 'Poetry', 'Community Engagement', 'Historical Preservation']
    },
    outreachInsights: {
      eventCollaboration: "Propose a collaboration for an upcoming community event. Offer resources or volunteers. Emphasize shared community goals.",
      personalInterest: "Express genuine interest in her work for local arts. Share how her efforts have impacted the community. Offer to volunteer or support an initiative."
    },
    keywords: ['community organizer', 'Enugu', 'arts', 'culture', 'Nigeria', 'local events', 'random person']
  }
];
// --- DEMO DATA END ---

const examples = [
  "Find sustainable travel bloggers in Vancouver with over 50k followers",
  "Search for freelance UI/UX designers in New York specializing in tech startups",
  "Locate AI ethicists in London who have published books on responsible AI",
  "Discover catering businesses in Lagos specializing in Nigerian street food",
  "Find online tutors for advanced calculus and engineering mathematics",
  "Search for B2B SaaS cybersecurity product managers in Berlin",
  "Identify yoga and wellness influencers in Johannesburg, South Africa",
  "Find software development and IT consulting firms in Nairobi, Kenya",
  "Locate community organizers in Enugu, Nigeria, focused on local arts and culture"
];

const ProductDemo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Search Demo State
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showResults, setShowResults] = useState(false); // To toggle results view

  // Refs for scrollable cards
  const cardContainerRef = useRef(null);
  const [cardSlideIndex, setCardSlideIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const autoSlideIntervalRef = useRef(null);

  // Color Palette
  const colors = {
    darkGreen: '#121B00',
    green: '#00D37F',
    pink: '#F84F94',
    yellow: '#dde35f', // Added yellow from your prompt
    grey: '#6B7280',
    black: '#000000', // Actual black for specific uses
    white: '#FFFFFF',
  };

  // Define smartWayCards here, before its use in useEffect
  const smartWayCards = [ // New set of cards for the horizontal scroll section
    {
      title: "Recruitment Simplified",
      description: "Quickly find top talent with specific skills and experiences, even passive candidates.",
      color: colors.green,
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Influencer Matchmaking",
      description: "Identify authentic influencers aligned with your brand values and target audience.",
      color: colors.pink,
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Market Research Accelerated",
      description: "Pinpoint industry experts and key opinion leaders for insightful market intelligence.",
      color: colors.darkGreen,
      icon: <Search className="w-8 h-8" />
    },
    {
      title: "Networking Redefined",
      description: "Discover professionals in your niche for collaborations, mentorship, or new opportunities.",
      color: colors.green,
      icon: <Globe className="w-8 h-8" />
    },
    {
      title: "Sales Prospecting",
      description: "Find decision-makers and leads with tailored profiles for higher conversion rates.",
      color: colors.pink,
      icon: <Target className="w-8 h-8" />
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmitWaitlist = (e) => { // Renamed to avoid conflict with search submit
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  // Auto-rotate examples in Hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExampleIndex((prev) => (prev + 1) % examples.length);
    }, 3000); // Change example every 3 seconds
    return () => clearInterval(interval);
  }, [examples.length]);

  // Auto-slide cards for "Discover People The Smart Way!" section
  useEffect(() => {
    if (isAutoSliding) {
      autoSlideIntervalRef.current = setInterval(() => {
        setCardSlideIndex((prev) => (prev + 1) % smartWayCards.length); // Use smartWayCards.length
      }, 3000); // Auto-slide every 3 seconds
    } else {
      clearInterval(autoSlideIntervalRef.current);
    }
    return () => clearInterval(autoSlideIntervalRef.current);
  }, [smartWayCards.length, isAutoSliding]);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust 50px offset from bottom
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // --- SEARCH DEMO LOGIC ---
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSelectedProfile(null); // Clear any previously selected profile
    const query = searchTerm.toLowerCase();

    const filtered = demoProfiles.filter(profile =>
      profile.name.toLowerCase().includes(query) ||
      profile.headline.toLowerCase().includes(query) ||
      profile.bio.toLowerCase().includes(query) ||
      profile.location.toLowerCase().includes(query) ||
      (profile.keywords && profile.keywords.some(keyword => keyword.toLowerCase().includes(query)))
    );
    setSearchResults(filtered);
    setShowResults(true); // Show results view
    // Scroll to results section or open a modal
    if (searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setShowResults(false); // Hide results and show detail
    if (profileDetailRef.current) {
      profileDetailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToResults = () => {
    setSelectedProfile(null);
    setShowResults(true);
  };

  // Refs for scrolling to sections
  const searchResultsRef = useRef(null);
  const profileDetailRef = useRef(null);

  // Carousel controls for "Discover People The Smart Way"
  const scrollLeft = () => {
    setIsAutoSliding(false); // Stop auto-slide on user click
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
    setTimeout(() => setIsAutoSliding(true), 10000); // Resume auto-slide after 10s
  };

  const scrollRight = () => {
    setIsAutoSliding(false); // Stop auto-slide on user click
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
    setTimeout(() => setIsAutoSliding(true), 10000); // Resume auto-slide after 10s
  };


  const features = [ // These are for "Search the Right Way!"
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Native Search",
      description: "Natural language queries that understand exactly who you're looking for, powered by advanced AI models.",
      color: colors.green
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Deep Profile Insights",
      description: "Get comprehensive profiles with bios, contact info, and AI-generated outreach suggestions.",
      color: colors.pink
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Data",
      description: "Fresh, verified information pulled from across the web in real-time, not outdated databases.",
      color: colors.yellow // Using yellow here
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Universal Application",
      description: "Find anyone - from B2B prospects to influencers, freelancers to industry experts.",
      color: colors.darkGreen
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Actionable Results",
      description: "Structured data ready for immediate use, with personalized outreach strategies included.",
      color: colors.pink
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Accuracy",
      description: "AI verification ensures authentic profiles and accurate contact information.",
      color: colors.green
    }
  ];

  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Describe Who You Need",
      description: "Tell us in plain English who you're looking for - no complex filters needed"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Processes Your Query",
      description: "Our Search AI understands your intent and searches across the web in real-time"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Get Curated Profiles",
      description: "Receive detailed, AI-verified profiles with bios, insights, and contact information"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connect & Engage",
      description: "Use our AI-generated outreach suggestions to make meaningful connections"
    }
  ];


  // Animation variants for example suggestions
  const exampleVariants = {
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans antialiased text-gray-900">
      <style jsx>{`
        /* Global CSS animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          from, to { border-color: transparent; }
          50% { border-color: #00D37F; }
        }
        @keyframes particleFloat {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes morphBlob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(-50%, -50%) rotate(0deg); }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(-50%, -50%) rotate(90deg); }
          50% { border-radius: 50% 60% 30% 40% / 30% 70% 40% 60%; transform: translate(-50%, -50%) rotate(180deg); }
          75% { border-radius: 70% 30% 60% 50% / 40% 50% 60% 30%; transform: translate(-50%, -50%) rotate(270deg); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 211, 127, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 211, 127, 0.6); }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(0, 211, 127, 0.5); }
          50% { text-shadow: 0 0 30px rgba(0, 211, 127, 0.8); }
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Utility classes for animations */
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-custom { animation: pulse 2s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .typewriter-text {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 2s steps(40, end), blink 0.75s step-end infinite;
        }
        .particle {
          position: absolute;
          width: 4px; height: 4px;
          background: linear-gradient(45deg, #00D37F, #F84F94);
          border-radius: 50%;
          animation: particleFloat 15s linear infinite;
          pointer-events: none;
        }
        .morphing-blob {
          position: absolute;
          width: 300px; height: 300px;
          background: linear-gradient(45deg, rgba(0, 211, 127, 0.1), rgba(248, 79, 148, 0.1));
          animation: morphBlob 20s ease-in-out infinite;
          filter: blur(20px);
          z-index: -1;
        }
        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.6;
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }
        .glow-border {
          animation: glowPulse 2s ease-in-out infinite;
        }
        .gradient-text {
          background: linear-gradient(90deg, #121B00 0%, #00D37F 25%, #121B00 50%, #00D37F 75%, #121B00 100%);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 3s ease-in-out infinite;
        }
        .gradient-text-shimmer {
          background: linear-gradient(90deg, #121B00, #121B00, #00D37F, #121B00, #121B00);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textShimmer 2s linear infinite;
        }
        .example-item {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0.6; transform: scale(0.95);
          will-change: transform, opacity; backface-visibility: hidden; -webkit-backface-visibility: hidden; transform-style: preserve-3d; -webkit-transform-style: preserve-3d;
        }
        .example-item.active {
          opacity: 1; transform: scale(1);
          box-shadow: 0 8px 25px rgba(0, 211, 127, 0.15); border-color: rgba(0, 211, 127, 0.3);
        }
        .mouse-follower {
          position: fixed; width: 40px; height: 40px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 211, 127, 0.3), transparent);
          pointer-events: none; z-index: 9999; transition: transform 0.1s ease-out; mix-blend-mode: multiply;
        }
        .parallax-bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(0, 211, 127, 0.05) 0%, rgba(248, 79, 148, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%);
          transform: translateY(calc(var(--scroll) * -0.5px));
        }
        /* Mobile optimization */
        @media (max-width: 768px) {
          .example-item { transition: all 0.3s ease-out; transform: scale(0.98); }
          .example-item.active { transform: scale(1); box-shadow: 0 4px 15px rgba(0, 211, 127, 0.1); }
          .animate-float { animation: none; }
          .hover-lift:hover { transform: translateY(-4px); }
          .morphing-blob { width: 200px; height: 200px; }
          .gradient-orb { width: 100px !important; height: 100px !important; }
        }
        .ripple { position: relative; overflow: hidden; z-index: 1; }
        .ripple::before {
          content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0;
          border-radius: 50%; background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%); transition: width 0.6s, height 0.6s; z-index: -1;
        }
        .ripple:hover::before { width: 300px; height: 300px; }
        .feature-card { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); border-left: 4px solid transparent; }
        .feature-card:hover { transform: translateY(-12px) scale(1.02); border-left-color: var(--card-color); box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15); }
        .feature-card .feature-icon { transition: all 0.3s ease; }
        .feature-card:hover .feature-icon { transform: scale(1.2) rotate(5deg); }
        .horizontal-scroll-container {
            overflow-x: hidden; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; cursor: grab;
            display: flex; padding-bottom: 2rem; flex-wrap: nowrap;
        }
        .horizontal-scroll-container::-webkit-scrollbar { height: 0px; }
        .horizontal-scroll-container::-webkit-scrollbar-thumb { background-color: transparent; }
        .horizontal-scroll-container::-webkit-scrollbar-track { background-color: transparent; }
      `}</style>

      {/* Mouse follower */}
      <div
        className="mouse-follower"
        style={{
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}

      {/* Background gradient orbs */}
      <div className="gradient-orb" style={{
        top: '10%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: `radial-gradient(circle, ${colors.green}0A, transparent)`,
        animationDelay: '0s'
      }} />
      <div className="gradient-orb" style={{
        top: '60%',
        right: '10%',
        width: '150px',
        height: '150px',
        background: `radial-gradient(circle, ${colors.pink}0A, transparent)`,
        animationDelay: '2s'
      }} />
      <div className="gradient-orb" style={{
        bottom: '10%',
        left: '30%',
        width: '180px',
        height: '180px',
        background: `radial-gradient(circle, ${colors.yellow}0A, transparent)`, // Using yellow orb
        animationDelay: '4s'
      }} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl font-bold text-glow" style={{color: colors.darkGreen}}
            >
              Prymsearch
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12">
              {['Features', 'How it Works', 'Pricing'].map((item, index) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 100 }}
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105 relative group"
                  style={{'--hover-color': colors.green}}
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" style={{backgroundColor: colors.green}}></span>
                </motion.a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                className="text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 ripple glow-border" style={{backgroundColor: colors.darkGreen}}
                onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
              >
                Join Waitlist
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-100 py-6 glass-effect"
            >
              <div className="space-y-4">
                <a href="#features" className="block px-4 py-2 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:translate-x-2">
                  Features
                </a>
                <a href="#how-it-works" className="block px-4 py-2 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:translate-x-2">
                  How it Works
                </a>
                <a href="#pricing" className="block px-4 py-2 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:translate-x-2">
                  Pricing
                </a>
                <div className="px-4 pt-4">
                  <button className="w-full text-white px-6 py-3 rounded-lg font-medium ripple" style={{backgroundColor: colors.darkGreen}}>
                    Join Waitlist
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          className="parallax-bg"
          style={{ '--scroll': scrollY }}
        />
        
        {/* Morphing blob */}
        <div className="morphing-blob" style={{
          top: '20%',
          right: '10%'
        }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full hover-lift glass-effect"
              >
                <Sparkles className="w-4 h-4 animate-pulse-custom" style={{color: colors.green}} />
                <span className="text-sm font-medium text-gray-700">Powered by Search AI 1.0</span> 
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="text-5xl lg:text-6xl font-bold leading-tight gradient-text"
              >
                The Google for Finding People 
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                Find the right people, businesses, and creators with AI precision. No more endless scrolling through social media or hit-or-miss cold outreach. 
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 ripple glow-border" style={{backgroundColor: colors.darkGreen}}
                  onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button className="border-2 px-8 py-4 rounded-lg font-medium text-lg hover:border-opacity-60 transition-all duration-300 hover:scale-105 hover:bg-gray-50 glass-effect" style={{borderColor: colors.darkGreen, color: colors.darkGreen}}>
                  Watch Demo
                </button>
              </motion.div>
            </div>

            {/* Hero Right: Search Bar & Examples */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
              className="bg-gray-50 rounded-2xl p-8 lg:p-12 animate-float glass-effect"
            >
              <div className="space-y-6">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-pulse-custom" />
                  <input
                    type="text"
                    placeholder="Find B2B SaaS founders in Europe specializing in cybersecurity"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                    style={{'--focus-ring-color': colors.green, '--focus-border-color': colors.green}}
                    onFocus={(e) => {
                      e.target.style.ringColor = colors.green;
                      e.target.style.borderColor = colors.green;
                    }}
                  />
                  <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white" style={{backgroundColor: colors.green}}>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
                
                <div className="space-y-3 relative h-28 overflow-hidden">
                  <p className="text-sm font-medium text-gray-700 mb-2">Try these examples:</p>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentExampleIndex}
                      initial="exit"
                      animate="enter"
                      exit="exit"
                      variants={exampleVariants}
                      className="absolute inset-x-0 bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                    >
                      <p className="text-gray-700">
                        {examples[currentExampleIndex]} 
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Results & Profile Detail Section */}
      {(showResults || selectedProfile) && (
        <section ref={searchResultsRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {!selectedProfile && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12" style={{color: colors.darkGreen}}>
                  Your Search Results
                </h2>
                {searchResults.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {searchResults.map(profile => (
                      <motion.div
                        key={profile.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200"
                        onClick={() => handleProfileClick(profile)}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                            {profile.type === 'professional' && <Briefcase className="w-8 h-8" style={{color: colors.green}} />}
                            {profile.type === 'influencer' && <MessageCircle className="w-8 h-8" style={{color: colors.pink}} />}
                            {profile.type === 'business' && <Store className="w-8 h-8" style={{color: colors.darkGreen}} />}
                            {profile.type === 'freelancer' && <Users className="w-8 h-8" style={{color: colors.yellow}} />}
                            {profile.type === 'tutor' && <GraduationCap className="w-8 h-8" style={{color: colors.pink}} />}
                            {profile.type === 'random person' && <Users className="w-8 h-8" style={{color: colors.grey}} />}
                            <div>
                                <h3 className="text-xl font-semibold" style={{color: colors.darkGreen}}>{profile.name}</h3>
                                <p className="text-gray-600 text-sm">{profile.headline}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4 line-clamp-3">{profile.bio}</p>
                        <p className="text-gray-500 text-sm"><Globe className="inline-block w-4 h-4 mr-1" />{profile.location}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-xl text-gray-700">No results found for "{searchTerm}". Please try another query.</p>
                )}
              </motion.div>
            )}

            {selectedProfile && (
              <motion.div
                ref={profileDetailRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8 lg:p-12 border border-gray-200"
              >
                <button
                  onClick={handleBackToResults}
                  className="mb-8 flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" /> Back to Results
                </button>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                        {selectedProfile.type === 'professional' && <Briefcase className="w-10 h-10" style={{color: colors.green}} />}
                        {selectedProfile.type === 'influencer' && <MessageCircle className="w-10 h-10" style={{color: colors.pink}} />}
                        {selectedProfile.type === 'business' && <Store className="w-10 h-10" style={{color: colors.darkGreen}} />}
                        {selectedProfile.type === 'freelancer' && <Users className="w-10 h-10" style={{color: colors.yellow}} />}
                        {selectedProfile.type === 'tutor' && <GraduationCap className="w-10 h-10" style={{color: colors.pink}} />}
                        {selectedProfile.type === 'random person' && <Users className="w-10 h-10" style={{color: colors.grey}} />}
                        <div>
                            <h2 className="text-3xl font-bold" style={{color: colors.darkGreen}}>{selectedProfile.name}</h2>
                            <p className="text-gray-700 text-lg">{selectedProfile.headline}</p>
                        </div>
                    </div>
                    <p className="text-gray-800 leading-relaxed mb-6">{selectedProfile.bio}</p>

                    <h3 className="text-xl font-semibold mb-4" style={{color: colors.darkGreen}}>Key Details</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                      <li className="flex items-center"><Globe className="w-5 h-5 mr-2 text-gray-500" /> {selectedProfile.location}</li>
                      <li className="flex items-center"><Mail className="w-5 h-5 mr-2 text-gray-500" /> <a href={`mailto:${selectedProfile.email}`} className="text-blue-600 hover:underline">{selectedProfile.email}</a></li>
                      {selectedProfile.social.linkedin && <li className="flex items-center"><Link className="w-5 h-5 mr-2 text-blue-700" /> <a href={selectedProfile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a></li>}
                      {selectedProfile.social.twitter && <li className="flex items-center"><Link className="w-5 h-5 mr-2 text-blue-400" /> <a href={selectedProfile.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter</a></li>}
                      {selectedProfile.social.instagram && <li className="flex items-center"><Link className="w-5 h-5 mr-2 text-purple-600" /> <a href={selectedProfile.social.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Instagram</a></li>}
                      {selectedProfile.social.facebook && <li className="flex items-center"><Link className="w-5 h-5 mr-2 text-blue-800" /> <a href={selectedProfile.social.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a></li>}
                      {selectedProfile.social.website && <li className="flex items-center"><Link className="w-5 h-5 mr-2 text-gray-500" /> <a href={selectedProfile.social.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Website</a></li>}
                      {selectedProfile.social.behance && <li className="flex items-center"><Link className="w-5 h-5 mr-2 text-blue-700" /> <a href={selectedProfile.social.behance} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Behance</a></li>}
                      {selectedProfile.social.dribbble && <li className="flex items-center"><Link className="w-5 h-5 mr-2 text-pink-600" /> <a href={selectedProfile.social.dribbble} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Dribbble</a></li>}
                      {selectedProfile.social.youtube && <li className="flex items-center"><Link className="w-5 h-5 mr-2 text-red-600" /> <a href={selectedProfile.social.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">YouTube</a></li>}
                      {selectedProfile.social.tiktok && <li className="flex items-center"><Link className="w-5 h-5 mr-2" style={{color: colors.black}} /> <a href={selectedProfile.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TikTok</a></li>}
                      {selectedProfile.details.portfolioLink && <li className="flex items-center"><Link className="w-5 h-5 mr-2 text-gray-500" /> <a href={selectedProfile.details.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Portfolio</a></li>}
                      {selectedProfile.details.hourlyRate && <li className="flex items-center"><Phone className="w-5 h-5 mr-2 text-gray-500" /> Hourly Rate: {selectedProfile.details.hourlyRate}</li>}
                      {selectedProfile.details.followers && <li className="flex items-center"><Users className="w-5 h-5 mr-2 text-gray-500" /> Followers: {Object.entries(selectedProfile.details.followers).map(([platform, count]) => `${platform}: ${count}`).join(', ')}</li>}
                      {selectedProfile.details.engagementRate && <li className="flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-gray-500" /> Engagement Rate: {selectedProfile.details.engagementRate}</li>}
                      {selectedProfile.details.cuisine && <li className="flex items-center"><Store className="w-5 h-5 mr-2 text-gray-500" /> Cuisine: {selectedProfile.details.cuisine.join(', ')}</li>}
                      {selectedProfile.details.serviceArea && <li className="flex items-center"><Globe className="w-5 h-5 mr-2 text-gray-500" /> Service Area: {selectedProfile.details.serviceArea.join(', ')}</li>}
                      {selectedProfile.details.subjects && <li className="flex items-center"><GraduationCap className="w-5 h-5 mr-2 text-gray-500" /> Subjects: {selectedProfile.details.subjects.join(', ')}</li>}
                       {selectedProfile.details.customerReviews && <li className="flex items-center"><MessageSquare className="w-5 h-5 mr-2 text-gray-500" /> Customer Reviews: {selectedProfile.details.customerReviews}</li>}
                       {selectedProfile.details.industryFocus && <li className="flex items-center"><Briefcase className="w-5 h-5 mr-2 text-gray-500" /> Industry Focus: {selectedProfile.details.industryFocus.join(', ')}</li>}
                       {selectedProfile.details.communityProjects && <li className="flex items-center"><Users className="w-5 h-5 mr-2 text-gray-500" /> Community Projects: {selectedProfile.details.communityProjects.join(', ')}</li>}
                       {selectedProfile.details.interests && <li className="flex items-center"><Sparkles className="w-5 h-5 mr-2 text-gray-500" /> Interests: {selectedProfile.details.interests.join(', ')}</li>}
                    </ul>

                    {selectedProfile.details.skills && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3" style={{color: colors.darkGreen}}>Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProfile.details.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedProfile.details.experience && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3" style={{color: colors.darkGreen}}>Experience</h3>
                        <ul className="space-y-3">
                          {selectedProfile.details.experience.map((exp, i) => (
                            <li key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <p className="font-medium" style={{color: colors.darkGreen}}>{exp.title}</p>
                              <p className="text-gray-700 text-sm">{exp.company} ({exp.duration})</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* AI-Generated Outreach Insights */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-inner border border-green-200 animate-fade-in-up" style={{borderColor: colors.green, background: `linear-gradient(to bottom right, ${colors.green}05, ${colors.green}1A)`}}>
                    <h3 className="text-2xl font-bold mb-6 flex items-center" style={{color: colors.darkGreen}}>
                      <Brain className="w-7 h-7 mr-3" style={{color: colors.green}} /> AI Outreach Insights
                    </h3>

                    {Object.entries(selectedProfile.outreachInsights).map(([key, value]) => (
                      <div key={key} className="mb-4">
                        <h4 className="font-semibold mb-2 text-lg capitalize" style={{color: colors.darkGreen}}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-gray-800 leading-relaxed">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}


      {/* Discover People The Smart Way - NEW SECTION FOR HORIZONTAL SCROLL */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text-shimmer" style={{color: colors.darkGreen}}>
              Discover People The Smart Way!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Prymsearch helps you find specific individuals across various domains with unmatched precision.
            </p>
          </motion.div>

          <div className="relative">
            <div
              ref={cardContainerRef}
              className="flex gap-8 pb-8 horizontal-scroll-container"
              // Adding drag functionality with useRef for better control than motion.div drag prop for continuous scroll
              onMouseDown={(e) => {
                setIsAutoSliding(false); // Stop auto-slide on user drag
                const startX = e.pageX - cardContainerRef.current.offsetLeft;
                const scrollLeft = cardContainerRef.current.scrollLeft;
                const mouseMoveHandler = (e) => {
                  e.preventDefault(); // Prevent text selection during drag
                  const x = e.pageX - cardContainerRef.current.offsetLeft;
                  const walk = (x - startX) * 1.5; // Adjust scroll speed
                  cardContainerRef.current.scrollLeft = scrollLeft - walk;
                };
                const mouseUpHandler = () => {
                  document.removeEventListener('mousemove', mouseMoveHandler);
                  document.removeEventListener('mouseup', mouseUpHandler);
                  // Resume auto-sliding after 10 seconds of user interaction
                  setTimeout(() => setIsAutoSliding(true), 10000);
                };
                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
              }}
            >
              {smartWayCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex-none w-80 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover-lift flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-pulse-custom" style={{backgroundColor: card.color, color: 'white'}}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4" style={{color: colors.darkGreen}}>
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
            {/* Scroll Controls */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4 md:px-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-200 text-gray-700 p-3 rounded-full shadow-md hover:bg-gray-300 transition-colors z-20"
                onClick={scrollLeft}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-200 text-gray-700 p-3 rounded-full shadow-md hover:bg-gray-300 transition-colors z-20"
                onClick={scrollRight}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (now 'Search the Right Way!') */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-glow" style={{color: colors.darkGreen}}>
              Search the Right Way! 
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered Search AI technology delivers precise results where traditional platforms fail 
            </p>
          </motion.div>
          
          {/* Main feature cards (now with dynamic color on hover) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 lg:p-10 rounded-xl shadow-sm border border-gray-100 feature-card flex flex-col justify-between"
                style={{'--card-color': feature.color}}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 feature-icon" style={{backgroundColor: feature.color, color: 'white'}}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{color: colors.darkGreen}}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold" style={{color: colors.darkGreen}}>
              How Prymsearch Works 
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Four simple steps to find exactly who you need 
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center space-y-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto animate-pulse-custom" style={{backgroundColor: colors.pink, color: 'white'}}>
                  {step.icon}
                </div>
                <div className="w-8 h-8 text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg transition-transform duration-300 hover:scale-110" style={{backgroundColor: colors.darkGreen}}>
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold" style={{color: colors.darkGreen}}>
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: colors.darkGreen}}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-white"
          >
            Ready to Find Anyone?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            Join thousands of professionals, businesses, and creators who are discovering the power of AI-driven people search. 
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleSubmitWaitlist} className="space-y-4"> {/* Changed to handleSubmitWaitlist */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-lg"
                style={{'--focus-ring-color': colors.green}}
                onFocus={(e) => {
                  e.target.style.ringColor = colors.green;
                }}
                required
              />
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 ripple"
                style={{backgroundColor: colors.green, color: colors.darkGreen}}
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 animate-pulse-custom" />
                    <span>Added to Waitlist!</span>
                  </>
                ) : (
                  <>
                    <span>Join Waitlist - It's Free</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-16 px-4 sm:px-6 lg:px-8" style={{backgroundColor: colors.darkGreen}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="space-y-4 animate-on-scroll">
              <h3 className="text-lg font-semibold" style={{color: colors.green}}>Product</h3>
              <div className="space-y-2">
                <a href="#features" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Features</a>
                <a href="#pricing" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">API</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Enterprise</a>
              </div>
            </div>
            
            <div className="space-y-4 animate-on-scroll" style={{animationDelay: '0.1s'}}>
              <h3 className="text-lg font-semibold" style={{color: colors.green}}>Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Blog</a>
              </div>
            </div>
            
            <div className="space-y-4 animate-on-scroll" style={{animationDelay: '0.2s'}}>
              <h3 className="text-lg font-semibold" style={{color: colors.green}}>Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Community</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Status</a>
              </div>
            </div>
            
            <div className="space-y-4 animate-on-scroll" style={{animationDelay: '0.3s'}}>
              <h3 className="text-lg font-semibold" style={{color: colors.green}}>Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Privacy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Terms</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Security</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Cookies</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center animate-on-scroll" style={{animationDelay: '0.4s'}}>
            <p className="text-gray-400">
              © 2025 Prymsearch. All rights reserved. Powered by Search AI. 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDemo;