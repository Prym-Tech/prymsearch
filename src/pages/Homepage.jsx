import React, { useState, useEffect } from 'react';

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
  X,
  Sparkles,
  Brain,
  Database,
  MessageSquare
} from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

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

  const examples = [
    "Find freelance graphic designers in New York",
    "Find fitness influencers in South Africa with 100k+ followers",
    "Find furniture merchants around Lagos, Nigeria"
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

        .gradient-text {
          background: linear-gradient(135deg, #121B00, #00D37F);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .example-item {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0.6;
          transform: scale(0.95);
        }

        .example-item.active {
          opacity: 1;
          transform: scale(1);
          box-shadow: 0 8px 25px rgba(0, 211, 127, 0.15);
          border-color: rgba(0, 211, 127, 0.3);
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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold animate-slide-in-left" style={{color: '#121B00'}}>
              Prymsearch
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12 animate-fade-in-up">
              <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105" style={{'--hover-color': '#00D37F'}}>
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105" style={{'--hover-color': '#00D37F'}}>
                How it Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105" style={{'--hover-color': '#00D37F'}}>
                Pricing
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-4 animate-slide-in-right">
              <button className="text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 ripple" style={{backgroundColor: '#121B00'}}>
                Join Waitlist
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
                  <button className="w-full text-white px-6 py-3 rounded-lg font-medium ripple" style={{backgroundColor: '#121B00'}}>
                    Join Waitlist
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full animate-fade-in-up hover-lift">
                <Sparkles className="w-4 h-4 animate-pulse-custom" style={{color: '#00D37F'}} />
                <span className="text-sm font-medium text-gray-700">Powered by Search AI 1.0</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight gradient-text animate-slide-in-left">
                The Google for Finding People
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Find the right people, businesses, and creators with AI precision. No more endless scrolling through social media or hit-or-miss cold outreach.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <button className="text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 ripple" style={{backgroundColor: '#121B00'}}>
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button className="border-2 px-8 py-4 rounded-lg font-medium text-lg hover:border-opacity-60 transition-all duration-300 hover:scale-105 hover:bg-gray-50" style={{borderColor: '#121B00', color: '#121B00'}}>
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 animate-slide-in-right animate-float">
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-pulse-custom" />
                  <input
                    type="text"
                    placeholder="Find B2B SaaS founders in Europe specializing in cybersecurity"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                    style={{'--focus-ring-color': '#00D37F', '--focus-border-color': '#00D37F'}}
                    onFocus={(e) => {
                      e.target.style.ringColor = '#00D37F';
                      e.target.style.borderColor = '#00D37F';
                    }}
                    readOnly
                  />
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 mb-4">Try these examples:</p>
                  {examples.map((example, index) => (
                    <div
                      key={index}
                      className={`example-item bg-white p-4 rounded-lg border border-gray-100 hover:border-gray-200 cursor-pointer ${
                        index === currentExampleIndex ? 'active' : ''
                      }`}
                    >
                      <p className="text-gray-700 transition-colors duration-300">
                        {example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold" style={{color: '#121B00'}}>
              Search the Right Way!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                <h3 className="text-xl font-semibold mb-4" style={{color: '#121B00'}}>
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold" style={{color: '#121B00'}}>
              How Prymsearch Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                <div className="w-8 h-8 text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg transition-transform duration-300 hover:scale-110" style={{backgroundColor: '#121B00'}}>
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold" style={{color: '#121B00'}}>
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white animate-fade-in-up">
            Ready to Find Anyone?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
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
                className="w-full px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 ripple"
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
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="space-y-4 animate-fade-in-up">
              <h3 className="text-lg font-semibold" style={{color: '#00D37F'}}>Product</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">API</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Enterprise</a>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <h3 className="text-lg font-semibold" style={{color: '#00D37F'}}>Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Blog</a>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-lg font-semibold" style={{color: '#00D37F'}}>Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Community</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">Status</a>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h3 className="text-lg font-semibold" style={{color: '#00D37F'}}>Legal</h3>
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
    </div>
  );
};

export default HomePage;