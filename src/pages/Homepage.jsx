import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import {
  Search,
  Users,
  Target,
  Zap,
  Globe,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle,
  Menu,
  User,
  ShoppingBag,
  X,
  Sparkles,
  Brain,
  Database,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';

import Logo from '../assets/logos/logoL.png';
import Ind from '../assets/logos/ind.png';
import Shopper from '../assets/logos/shop.png';


// Set the app element for react-modal
Modal.setAppElement('#root'); // Or your app's root element

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModal(false);


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = () => {
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail('');
    }
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Native Search",
      description: "Natural language queries that understand exactly who you're looking for, powered by advanced AI models."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Deep Profile Insights",
      description: "Get comprehensive profiles with bios, contact info, and AI-generated outreach suggestions."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Data",
      description: "Fresh, verified information pulled from across the web in real-time, not outdated databases."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Universal Application",
      description: "Find anyone - from B2B prospects to influencers, freelancers to industry experts."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Actionable Results",
      description: "Structured data ready for immediate use, with personalized outreach strategies included."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Accuracy",
      description: "AI verification ensures authentic profiles and accurate contact information."
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

  // const examples = [
  //   "Looking for freelance graphic designers specializing in branding for tech startups in New York",
  //   "Find fitness influencers in South Africa with 100k+ followers",
  //   "Find me someone who offers online tutoring for digital marketing",
  //   "Find furniture merchants around Lagos, Nigeria"
  // ];

  const examples = [
    { text: "UX Designer with freelance experience in New York", icon: Ind },
    { text: "Find eco-friendly restaurants in Lagos with delivery services", icon: Shopper },
    { text: "Find fitness influencers in South Africa with 100k+ followers", icon: Ind },
    { text: "Find me someone who offers online tutoring for digital marketing", icon: Ind },
    { text: "Find furniture merchants around Lagos, Nigeria", icon: Shopper }
  ];

  // Auto-rotate examples
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExampleIndex((prev) => (prev + 1) % examples.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [examples.length]);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
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

  // NOTE: Replace 'VIDEO_ID' with the actual ID of your YouTube video.
  const videoId = "dRPMJa2_vIM";


  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          from, to {
            border-color: transparent;
          }
          50% {
            border-color: #00D37F;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }

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

        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes textShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .gradient-text {
          background: linear-gradient(
            90deg,
            #121B00 0%,
            #00D37F 25%,
            #121B00 50%,
            #00D37F 75%,
            #121B00 100%
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 3s ease-in-out infinite;
        }

        .gradient-text-shimmer {
          background: linear-gradient(
            90deg,
            #121B00,
            #121B00,
            #00D37F,
            #121B00,
            #121B00
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textShimmer 2s linear infinite;
        }

        .example-item {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0.6;
          transform: scale(0.95);
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }

        .example-item.active {
          opacity: 1;
          transform: scale(1);
          box-shadow: 0 8px 25px rgba(0, 211, 127, 0.15);
          border-color: rgba(0, 211, 127, 0.3);
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
          .example-item {
            transition: all 0.3s ease-out;
            transform: scale(0.98);
          }
          
          .example-item.active {
            transform: scale(1);
            box-shadow: 0 4px 15px rgba(0, 211, 127, 0.1);
          }
          
          .animate-float {
            animation: none;
          }
          
          .hover-lift:hover {
            transform: translateY(-4px);
          }
        }

        .ripple {
          position: relative;
          overflow: hidden;
        }

        .ripple::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .ripple:hover::before {
          width: 300px;
          height: 300px;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-lg shadow-sm ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex justify-between items-center h-20">
            <div className="animate-slide-in-left">
              <img src={Logo} className='w-[150px]' />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12 animate-fade-in-up">
              <a href="#features" className="text-gray-700 text-sm hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105" style={{'--hover-color': '#00D37F'}}>
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 text-sm hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105" style={{'--hover-color': '#00D37F'}}>
                How it Works
              </a>
              <a href="#pricing" className="text-gray-700 text-sm hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105" style={{'--hover-color': '#00D37F'}}>
                Pricing
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-4 animate-slide-in-right">
              <button className="text-lgreen px-8 py-4 rounded-full font-medium text-sm hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 ripple" style={{backgroundColor: '#161D25'}}>
                  <span>Join Waitlist</span>
                </button>
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
            <div className="md:hidden bg-white border-t border-gray-100 py-6 animate-fade-in-up">
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
                  
                  <button className="w-full text-lgreen px-8 py-4 rounded-full font-medium text-base hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 ripple" style={{backgroundColor: '#161D25'}}>
                    <span>Join Waitlist</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-35 lg:pt-38 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full animate-fade-in-up hover-lift">
                <Zap className="w-4 h-4 animate-pulse-custom" style={{color: '# 1E1E1E'}} />
                <span className="text-sm font-medium text-gray-700">Powered by Search AI 1.0</span>
              </div>
              
              <h1 className="text-[40px] lg:text-6xl font-semibold leading-tight gradient-text animate-slide-in-left">
                The Google for<br /> Finding People
              </h1>
              
              <p className="text-sm lg:text-base text-tgrey leading-relaxed max-w-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Find the right people, businesses, and creators with AI precision. No more endless scrolling through social media or hit-or-miss cold outreach.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <button className="text-lgreen px-8 py-4 rounded-full font-medium text-base hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 ripple" style={{backgroundColor: '#161D25'}}>
                  <span>Join Waitlist</span>
                </button>
                <button
                  onClick={openModal}
                  className="cursor-pointer border-2 px-8 py-4 rounded-full font-medium text-base hover:border-opacity-60 transition-all duration-300 hover:scale-105 hover:bg-gray-50 flex items-center justify-center"
                  style={{borderColor: '#121B00', color: '#121B00'}}
                >
                  <span>Watch Demo</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <div className="pt-12 lg:pt-14 bg-gray-100 pl-8 flex items-center justify-center rounded-[32px]">
              <div className="w-full space-y-4">
                {/* Search Bar */}
                <div className="relative mr-8">
                  <input
                    type="text"
                    placeholder="Find good food vendors online"
                    className="w-full pl-4 pr-20 py-6 border-1 border-gray-400 rounded-full text-gray-900 placeholder-gray-600 focus:outline-none shadow-sm text-xs lg:text-sm"
                    readOnly
                  />
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-3 lg:px-6 lg:py-4 rounded-full text-xs lg:text-sm font-medium flex items-center gap-2 transition-all duration-200"
                    style={{ backgroundColor: '#161D25', color: '#B0D226' }}
                  >
                    <Search className="w-4 h-4 lg:w-5 lg:h-5" />
                    Search
                  </button>
                </div>

                {/* Examples Container */}
                <div 
                  className="overflow-hidden rounded-[32px] rounded-tr-[0] rounded-bl-[0] h-[340px] p-6 pr-0 space-y-4"
                  style={{ backgroundColor: '#161D25' }}
                >
                  {examples.map((example, index) => {
                    const IconComponent = example.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-2xl rounded-r-[0] bg-white/10 cursor-pointer transition-all duration-300 ${
                          index === currentExampleIndex 
                            ? 'bg-white/10  border-1 border-white transform scale-105' 
                            : 'hover:bg-white/5 hover:border-1 hover:border-white'
                        }`}
                      >
                        <div 
                          className="w-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <img src={IconComponent} className="w-[17px]" />
                        </div>
                        <p className="text-white text-xs lg:text-sm leading-relaxed">
                          {example.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-20 animate-on-scroll">
            <h2 className="text-3xl lg:text-5xl font-semibold" style={{color: '#121B00'}}>
              Search the Right Way!
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered Search AI technology delivers precise results where traditional platforms fail
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 lg:p-10 rounded-xl shadow-sm border border-gray-100 hover-lift animate-on-scroll"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110" style={{backgroundColor: '#00D37F', color: 'white'}}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold mb-4" style={{color: '#121B00'}}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-20 animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold" style={{color: '#121B00'}}>
              How Prymsearch Works
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Four simple steps to find exactly who you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center space-y-6 animate-on-scroll hover:scale-105 transition-transform duration-300"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto animate-pulse-custom" style={{backgroundColor: '#F84F94', color: 'white'}}>
                  {step.icon}
                </div>
                <div className="w-8 h-8 text-white rounded-full flex items-center justify-center mx-auto font-bold text-base transition-transform duration-300 hover:scale-110" style={{backgroundColor: '#121B00'}}>
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold" style={{color: '#121B00'}}>
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#121B00'}}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-xl lg:text-2xl font-bold text-white animate-fade-in-up">
            Ready to Find Anyone?
          </h2>
          <p className="text-base text-gray-300 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Join thousands of professionals, businesses, and creators who are discovering the power of AI-driven people search.
          </p>
          
          <div className="max-w-md mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-lg"
                style={{'--focus-ring-color': '#00D37F'}}
                onFocus={(e) => {
                  e.target.style.ringColor = '#00D37F';
                }}
              />
              <button
                onClick={handleSubmit}
                className="w-full px-8 py-4 rounded-lg font-medium text-base hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 ripple"
                style={{backgroundColor: '#00D37F', color: '#121B00'}}
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
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-16 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#121B00'}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="space-y-4 animate-fade-in-up">
              <h3 className="text-base font-semibold" style={{color: '#00D37F'}}>Product</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">API</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Enterprise</a>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <h3 className="text-base font-semibold" style={{color: '#00D37F'}}>Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Blog</a>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-base font-semibold" style={{color: '#00D37F'}}>Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Community</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Status</a>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h3 className="text-base font-semibold" style={{color: '#00D37F'}}>Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Privacy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Terms</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Security</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Cookies</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <p className="text-gray-400">
              © 2025 Prymsearch. All rights reserved. Powered by Search AI.
            </p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            background: 'transparent',
            padding: 0,
            overflow: 'visible'
          }
        }}
        contentLabel="Watch Demo Video"
      >
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0, width: '80vw', maxWidth: '900px' }}>
          <iframe
            src={`https://www.youtube.com/embed/$${videoId}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Demo Video"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
            <button
            onClick={closeModal}
            className="absolute -top-4 -right-4 bg-white rounded-full p-2"
            style={{ zIndex: 1001}}
           >
            <X className="w-6 h-6 text-black" />
           </button>
        </div>
      </Modal>

    </div>
  );
};

export default HomePage;