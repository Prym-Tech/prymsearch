import React, { useState, useEffect } from 'react';
import { Search, User, Building, Users, Star, MapPin, Store, Mail, Phone, Globe, Instagram, Twitter, Linkedin, ExternalLink, ChevronRight, Zap, Target, TrendingUp, MessageCircle, Filter, ArrowLeft } from 'lucide-react';
import allProfiles from '../utils/demoProfiles.json';
import { 
  Menu,
  X,
} from 'lucide-react';

const ProdDemo = () => {
  const PAGE_SIZE = 20;
  const [currentPage, setCurrentPage] = useState(1);

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

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    console.log(searchQuery)
    if(searchQuery == '') {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const demoQueries = {
    professionals: [
      "Find me UX designers in Lagos with experience in fintech",
      "Looking for cybersecurity experts in London with 5+ years experience",
      "Find Python developers in San Francisco who work with AI/ML"
    ],
    businesses: [
      "Find sustainable fashion brands in Nigeria with strong social media presence",
      "Looking for SaaS startups in Europe specializing in productivity tools",
      "Find eco-friendly restaurants in Lagos with delivery services"
    ],
    influencers: [
      "Find fitness influencers in South Africa with over 100k followers",
      "Looking for tech content creators on YouTube with engagement rate above 5%",
      "Find beauty influencers in West Africa who focus on natural products"
    ],
    general: [
      "Find yoga instructors in Lagos who teach Vinyasa flow",
      "Looking for vintage camera collectors and enthusiasts",
      "Find someone who offers online tutoring for advanced calculus"
    ]
  };

  const manualQueryMapping = {
    "Find me UX designers in Lagos with experience in fintech": [1, 2, 9, 32, 44, 56, 68, 80, 81, 82, 83, 84, 85, 86, 87],
    "Looking for cybersecurity experts in London with 5+ years experience": [8, 20, 33, 45, 57, 69, 88, 89, 90, 91, 92, 93, 94, 95, 96],
    "Find Python developers in San Francisco who work with AI/ML": [5, 13, 19, 25, 34, 46, 58, 70, 97, 98, 99, 100, 101, 102, 103],
    "Find sustainable fashion brands in Nigeria with strong social media presence": [26, 35, 47, 59, 71, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113],
    "Looking for SaaS startups in Europe specializing in productivity tools": [27, 36, 48, 60, 72, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
    "Find eco-friendly restaurants in Lagos with delivery services": [28, 37, 49, 61, 73, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133],
    "Find fitness influencers in South Africa with over 100k followers": [29, 38, 50, 62, 74, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143],
    "Looking for tech content creators on YouTube with engagement rate above 5%": [30, 39, 51, 63, 75, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153],
    "Find beauty influencers in West Africa who focus on natural products": [31, 40, 52, 64, 76, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163],
    "Find yoga instructors in Lagos who teach Vinyasa flow": [10, 41, 53, 65, 77, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173],
    "Looking for vintage camera collectors and enthusiasts": [14, 42, 54, 66, 78, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183],
    "Find someone who offers online tutoring for advanced calculus": [15, 43, 55, 67, 79, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193]
  };

  const handleSearch = async (query) => {
    setIsSearching(true);
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedProfile(null);
  
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    let filteredResults = [];

    if (manualQueryMapping[query]) {
        const profileIds = manualQueryMapping[query];
        const idSet = new Set(profileIds);
        filteredResults = allProfiles.filter(profile => idSet.has(profile.id));
    } else {
        const stopWords = new Set(['find', 'me', 'looking', 'for', 'with', 'in', 'and', 'who', 'work', 'a', 'an', 'the', 'is', 'are', 'on', 'offers', 'services', 'strong', 'social', 'media', 'presence', 'over', 'above', 'teach', 'somebody', 'someone', 'rate']);
        const lowerQuery = query.toLowerCase().replace(/\//g, ' ');
        const queryTerms = lowerQuery.split(/\s+/).map(term => term.replace(/[^\w\d+]/gi, '')).filter(term => term.length > 0 && !stopWords.has(term));

        if (queryTerms.length > 0) {
            filteredResults = allProfiles.filter(profile => {
                const profileText = [profile.name, profile.title, profile.company, profile.location, profile.summary, ...(profile.tags || [])].join(' ').toLowerCase();
                return queryTerms.every(term => profileText.includes(term));
            });
        }
    }
  
    setSearchResults(filteredResults);
    setIsSearching(false);
  };

  const paginatedResults = searchResults.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(searchResults.length / PAGE_SIZE);

  // IMPROVEMENT: AI Suggestions are now more detailed and include a recommended contact method.
  const generateOutreachSuggestion = (profile) => {
    const firstName = profile.name.split(' ')[0];
    const title = profile.title.toLowerCase();
    let type = 'general';

    if (title.includes('designer')) type = 'designer';
    else if (title.includes('developer') || title.includes('engineer')) type = 'developer';
    else if (title.includes('coach') || title.includes('influencer')) type = 'influencer';
    else if (title.includes('brand') || title.includes('restaurant') || title.includes('startup') || title.includes('collector')) type = 'business';
    else if (title.includes('tutor') || title.includes('instructor') || title.includes('expert') || title.includes('analyst') || title.includes('consultant')) type = 'expert';

    const suggestions = {
      designer: {
        subject: `Collaboration on a challenging UX project`,
        approach: "Professional & Peer-to-Peer",
        message: `Hi ${firstName}, I came across your profile and was very impressed with your work in ${profile.tags[1] || 'design systems'}. We're tackling a complex project in the fintech space that I think would benefit from your expertise. Would you be open to a brief chat about a potential collaboration?`,
        tips: ["Mention a specific project or skill to show you've done your research.", "Keep the tone respectful of their time and expertise.", "Be clear on whether it's a freelance, full-time, or partnership opportunity."],
        bestContactMethod: "Given their professional nature, it's best to reach out via Email or LinkedIn."
      },
      developer: {
        subject: `Technical question about your work in ${profile.tags[1] || 'AI/ML'}`,
        approach: "Technical & Specific",
        message: `Hi ${firstName}, I saw your profile and your extensive work with Python and AI/ML. I'm currently working on a project involving [mention specific tech] and had a question about your approach to [mention specific problem]. Would you be open to connecting and sharing some insights?`,
        tips: ["Show genuine technical interest, not just a generic recruitment message.", "Reference their GitHub or a specific project if possible.", "Be direct and concise. Developers appreciate efficiency."],
        bestContactMethod: "A direct message on X (Twitter) or a well-written email is often effective."
      },
      expert: {
        subject: `Inquiry regarding your expertise in ${profile.tags[0]}`,
        approach: "Direct & Respectful",
        message: `Dear ${firstName}, I found your profile highlighting your extensive experience in ${profile.tags[0]}. We are conducting research where your insight would be invaluable. Would you be open to a brief, compensated consultation call?`,
        tips: ["Acknowledge their specific expertise and how it's relevant to you.", "Be upfront about offering compensation for their time.", "Provide context on what you'd like to discuss to gauge their interest."],
        bestContactMethod: "A professional email is the most appropriate channel for this kind of request."
      },
      influencer: {
        subject: `Your content on ${profile.tags[1] || 'wellness'} is inspiring! (Partnership Idea)`,
        approach: "Community & Value-Focused",
        message: `Hi ${firstName}, I'm a huge fan of your work and how you engage with your community. Your recent post about [mention specific post] was fantastic! I represent a brand that shares your values of [mention shared value]. I have an idea for a partnership that I think your audience would love.`,
        tips: ["Engage with their content authentically before reaching out.", "Show that you understand their brand and audience.", "Propose a partnership that offers clear value to them and their followers, not just your brand."],
        bestContactMethod: "Instagram DM is most effective. Check their bio for a business email for formal proposals."
      },
      business: {
        subject: `Partnership Inquiry: ${profile.name} x [Your Brand]`,
        approach: "Brand & Mission-Aligned",
        message: `Hello ${firstName} Team, We're big admirers of ${profile.name}'s commitment to [mention their mission, e.g., 'sustainability' or 'productivity']. We share that passion and see a strong alignment with our brand. We would be thrilled to explore a potential collaboration.`,
        tips: ["Keep it professional and address the team.", "Clearly state the alignment you see between your brands.", "Visit their online store and mention a specific product you admire."],
        bestContactMethod: "Use the official business email found on their website or LinkedIn page."
      },
      general: {
        subject: `Connecting with an expert in ${profile.tags[0] || 'your field'}`,
        approach: "Polite & Inquisitive",
        message: `Hi ${firstName}, I found your profile while looking for professionals in the ${profile.tags[0] || 'your area'} space. Your work is very interesting, especially [mention something specific]. I'd love to connect and follow your work.`,
        tips: ["Be specific and genuine about why you're reaching out.", "Keep the initial message concise and focused on them.", "End with a low-pressure call to action like 'love to connect'."],
        bestContactMethod: "LinkedIn is the ideal platform for general professional networking."
      }
    };
    return suggestions[type] || suggestions['general'];
  };
  
  const ProfileCard = ({ profile, onClick }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#00D37F] p-4 sm:p-6" onClick={() => onClick(profile)} >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover" />
          {profile.verified && (<div className="absolute -top-1 -right-1 bg-[#00D37F] rounded-full p-1"><Star className="w-3 h-3 text-white" fill="white" /></div>)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[#121B00] text-base sm:text-lg truncate">{profile.name}</h3>
          <p className="text-gray-600 text-sm mb-1">{profile.title}</p>
          <p className="text-gray-500 text-sm mb-2">{profile.company}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{profile.location}</span></div>
            <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" fill="currentColor" /><span>{profile.rating}</span></div>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {profile.tags.slice(0, 3).map((tag, index) => (<span key={index} className="px-2 py-1 bg-[#dde35f] text-[#121B00] rounded-full text-xs font-medium">{tag}</span>))}
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{profile.summary}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1"><Users className="w-4 h-4 text-[#F84F94]" /><span>{profile.followers}</span></div>
              <div className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-[#00D37F]" /><span>{profile.engagement}</span></div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileDetails = ({ profile, onBack }) => {
    const outreachSuggestion = generateOutreachSuggestion(profile);
    return (
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-[#00D37F] hover:text-[#121B00] mb-6 transition-colors font-semibold"><ArrowLeft className="w-5 h-5" /> Back to Results</button>
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative self-center md:self-start flex-shrink-0">
              <img src={profile.avatar} alt={profile.name} className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0" />
              {profile.verified && (<div className="absolute -top-2 -right-2 bg-[#00D37F] rounded-full p-2"><Star className="w-4 h-4 text-white" fill="white" /></div>)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#121B00] mb-2">{profile.name}</h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-2">{profile.title}</p>
              <p className="text-base sm:text-lg text-gray-500 mb-4">{profile.company}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{profile.location}</span></div>
                <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" fill="currentColor" /><span>{profile.rating}/5.0</span></div>
                <div className="flex items-center gap-1"><Users className="w-4 h-4" /><span>{profile.followers} followers</span></div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {profile.tags.map((tag, index) => (<span key={index} className="px-3 py-1 bg-[#dde35f] text-[#121B00] rounded-full text-sm font-medium">{tag}</span>))}
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#121B00] mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{profile.summary}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(profile.metrics).map(([key, value], index) => (<div key={index} className="bg-gray-50 rounded-lg p-4 text-center"><div className="text-xl sm:text-2xl font-bold text-[#00D37F] mb-1">{value}</div><div className="text-xs sm:text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div></div>))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#121B00] mb-4">Contact Information</h3>
              <div className="space-y-3">
                {profile.contactInfo.email && (<div className="flex items-center gap-3"><Mail className="w-5 h-5 text-[#00D37F]" /><span className="text-gray-600 break-all">{profile.contactInfo.email}</span></div>)}
                {profile.contactInfo.phone && (<div className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#00D37F]" /><span className="text-gray-600">{profile.contactInfo.phone}</span></div>)}
                {profile.contactInfo.website && (<div className="flex items-center gap-3"><Globe className="w-5 h-5 text-[#00D37F]" /><a href={'https://' + profile.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#00D37F] break-all">{profile.contactInfo.website}</a></div>)}
                {/* IMPROVEMENT: Conditionally render the store link for businesses */}
                {profile.contactInfo.store && (<div className="flex items-center gap-3"><Store className="w-5 h-5 text-[#00D37F]" /><a href={profile.contactInfo.store} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#00D37F] break-all">{profile.contactInfo.store}</a></div>)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#121B00] mb-4">Social Media</h3>
              <div className="space-y-3">
                {profile.social.linkedin && (<div className="flex items-center gap-3"><Linkedin className="w-5 h-5 text-[#0A66C2]" /><span className="text-gray-600 break-all">{profile.social.linkedin}</span></div>)}
                {profile.social.twitter && (<div className="flex items-center gap-3"><Twitter className="w-5 h-5 text-[#1DA1F2]" /><span className="text-gray-600">@{profile.social.twitter}</span></div>)}
                {profile.social.instagram && (<div className="flex items-center gap-3"><Instagram className="w-5 h-5 text-[#E4405F]" /><span className="text-gray-600">@{profile.social.instagram}</span></div>)}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#00D37F]/10 to-[#F84F94]/10 rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4"><Zap className="w-5 h-5 text-[#00D37F]" /><h3 className="text-lg font-bold text-[#121B00]">AI Outreach Suggestions</h3></div>
            <div className="space-y-4">
              <div><h4 className="font-semibold text-[#121B00] mb-2">Recommended Subject:</h4><p className="text-gray-700 bg-white rounded px-3 py-2">{outreachSuggestion.subject}</p></div>
              <div><h4 className="font-semibold text-[#121B00] mb-2">Approach Style:</h4><span className="inline-block bg-[#dde35f] text-[#121B00] px-3 py-1 rounded-full text-sm font-medium">{outreachSuggestion.approach}</span></div>
              {/* IMPROVEMENT: Added best contact method display */}
              <div><h4 className="font-semibold text-[#121B00] mb-2">Best Contact Method:</h4><p className="text-gray-700">{outreachSuggestion.bestContactMethod}</p></div>
              <div><h4 className="font-semibold text-[#121B00] mb-2">Message Template:</h4><p className="text-gray-700 bg-white rounded px-3 py-2 leading-relaxed">{outreachSuggestion.message}</p></div>
              <div>
                <h4 className="font-semibold text-[#121B00] mb-2">Pro Tips:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">{outreachSuggestion.tips.map((tip, index) => (<li key={index}>{tip}</li>))}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (selectedProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-6 sm:py-8"><ProfileDetails profile={selectedProfile} onBack={() => setSelectedProfile(null)} /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
      <main className="container mx-auto pt-[120px] lg:pt-[150px] px-4 py-6 sm:py-8">
        {searchResults.length === 0 && !isSearching && (
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#121B00] mb-4">Find Anyone, Anywhere</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Use AI to discover the perfect people, businesses, and creators with just a simple description.</p>
          </div>
        )}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="h-6 w-6 text-gray-400" /></div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && searchQuery.trim() && handleSearch(searchQuery)} placeholder="Describe who you're looking for..." className="w-full pl-12 pr-28 sm:pr-32 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-xl focus:border-[#00D37F] focus:outline-none transition-colors" />
            <button onClick={() => searchQuery.trim() && handleSearch(searchQuery)} disabled={!searchQuery.trim() || isSearching} className="absolute inset-y-0 right-0 m-1.5 px-4 sm:px-6 bg-[#00D37F] text-white rounded-lg hover:bg-[#00B36B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
              {isSearching ? (<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />) : (<><Search className="w-5 h-5" /><span className="hidden sm:inline">Search</span></>)}
            </button>
          </div>
        </div>
        {searchResults.length === 0 && !isSearching && (
          <div className="max-w-6xl mx-auto mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-[#121B00] mb-6 text-center">Try These Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(demoQueries).map(([category, queries]) => (
                <div key={category} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border">
                  <div className="flex items-center gap-2 mb-4">
                    {category === 'professionals' && <User className="w-5 h-5 text-[#00D37F]" />}
                    {category === 'businesses' && <Building className="w-5 h-5 text-[#F84F94]" />}
                    {category === 'influencers' && <Users className="w-5 h-5 text-[#dde35f]" />}
                    {category === 'general' && <Search className="w-5 h-5 text-gray-600" />}
                    <h4 className="font-bold text-[#121B00] capitalize">{category}</h4>
                  </div>
                  <div className="space-y-2">{queries.map((query, index) => (<button key={index} onClick={() => handleSearch(query)} className="text-left text-sm text-gray-600 hover:text-[#00D37F] transition-colors block w-full p-2 rounded hover:bg-gray-50">"{query}"</button>))}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {isSearching && (
          <div className="text-center py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#00D37F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-[#121B00] mb-2">Searching...</h3>
            <p className="text-gray-600">Finding your perfect matches</p>
          </div>
        )}
        {searchResults.length > 0 && !isSearching && (
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
              {/* <h3 className="text-xl sm:text-2xl font-bold text-[#121B00] truncate">Found {searchResults.length} matches</h3> */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#121B00] truncate">Found 100 matches</h3>
              <div className="flex items-center gap-2 flex-shrink-0"><Filter className="w-5 h-5 text-gray-400" /><span className="text-sm text-gray-600">Sort by relevance</span></div>
            </div>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">{paginatedResults.map((profile) => (<ProfileCard key={profile.id} profile={profile} onClick={setSelectedProfile} />))}</div>
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-md border bg-white text-[#121B00] border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
                {Array.from({ length: totalPages }, (_, i) => (<button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded-md border text-sm font-medium ${currentPage === i + 1 ? 'bg-[#00D37F] text-white border-[#00D37F]' : 'bg-white text-[#121B00] border-gray-300 hover:bg-gray-50'}`}>{i + 1}</button>))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-md border bg-white text-[#121B00] border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
              </div>
            )}
          </div>
        )}
        {searchResults.length === 0 && !isSearching && searchQuery && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#121B00] mb-2">No matches found</h3>
            <p className="text-gray-600 max-w-md mx-auto">Try a different or more general search query. For example, instead of "Fintech UX Designer in Ikeja", try "UX Designer Lagos".</p>
          </div>
        )}
      </main>
      <footer className="bg-[#121B00] text-white py-10 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00D37F] to-[#F84F94] rounded-lg flex items-center justify-center"><Search className="w-5 h-5 text-white" /></div>
            <h3 className="text-xl font-bold">Prymsearch</h3>
          </div>
          <p className="text-gray-300 mb-4">Powered by AI • Find People, Businesses & Creators</p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm text-gray-400">
            <span>© 2025 Prymsearch</span><span>•</span><span>Search AI 1.0</span><span>•</span><span>Made in Nigeria 🇳🇬</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProdDemo;