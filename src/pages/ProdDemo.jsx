import React, { useState, useEffect } from 'react';
import { Search, User, Building, Users, Star, MapPin, Calendar, Mail, Phone, Globe, Instagram, Twitter, Linkedin, ExternalLink, ChevronRight, Zap, Target, TrendingUp, MessageCircle, Filter, ArrowLeft } from 'lucide-react';

const PrymsearchDemo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchType, setSearchType] = useState('all');

  // Demo search suggestions
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

  // Demo data for search results
  const demoProfiles = {
    "ux designers fintech lagos": [
      {
        id: 1,
        name: "Adebayo Okonkwo",
        title: "Senior UX Designer",
        company: "Flutterwave",
        location: "Lagos, Nigeria",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        followers: "12.5K",
        engagement: "8.2%",
        verified: true,
        tags: ["UX Design", "Fintech", "Mobile Design", "User Research"],
        summary: "Award-winning UX designer with 6+ years specializing in financial technology. Led design for 3 major fintech products serving 2M+ users.",
        contactInfo: {
          email: "adebayo.okonkwo@email.com",
          phone: "+234 801 234 5678",
          website: "adebayoux.com"
        },
        social: {
          linkedin: "adebayo-okonkwo-ux",
          twitter: "adebayo_ux",
          instagram: "adebayo.designs"
        },
        metrics: {
          projectsCompleted: 45,
          clientSatisfaction: "98%",
          responseTime: "< 2 hours",
          availability: "Available"
        }
      },
      {
        id: 2,
        name: "Kemi Adeleke",
        title: "Product Designer",
        company: "Paystack",
        location: "Lagos, Nigeria",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b9a57b0c?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        followers: "8.7K",
        engagement: "6.1%",
        verified: true,
        tags: ["Product Design", "Fintech", "Design Systems", "Prototyping"],
        summary: "Creative product designer passionate about creating intuitive financial experiences. Expert in design systems and user-centered design.",
        contactInfo: {
          email: "kemi.adeleke@email.com",
          phone: "+234 802 345 6789",
          website: "kemiadeleke.design"
        },
        social: {
          linkedin: "kemi-adeleke-design",
          twitter: "kemi_designs",
          instagram: "kemi.creative"
        },
        metrics: {
          projectsCompleted: 32,
          clientSatisfaction: "96%",
          responseTime: "< 3 hours",
          availability: "Busy"
        }
      }
    ],
    "fitness influencers south africa 100k": [
      {
        id: 3,
        name: "Thandie Mbeki",
        title: "Fitness Coach & Influencer",
        company: "FitLife SA",
        location: "Cape Town, South Africa",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        followers: "245K",
        engagement: "12.3%",
        verified: true,
        tags: ["Fitness", "Wellness", "Nutrition", "Lifestyle"],
        summary: "Certified fitness trainer and wellness coach inspiring healthy living across Africa. 5+ years building fitness communities.",
        contactInfo: {
          email: "thandie@fitlifesa.com",
          phone: "+27 82 123 4567",
          website: "fitlifesa.com"
        },
        social: {
          instagram: "thandie_fitlife",
          twitter: "thandie_fitness",
          youtube: "FitLifeSA"
        },
        metrics: {
          avgViews: "85K",
          engagementRate: "12.3%",
          brandPartnerships: 25,
          availability: "Available"
        }
      }
    ],
    "sustainable fashion brands nigeria": [
      {
        id: 4,
        name: "EcoThreads Nigeria",
        title: "Sustainable Fashion Brand",
        company: "EcoThreads Nigeria",
        location: "Lagos, Nigeria",
        avatar: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop",
        rating: 4.7,
        followers: "45K",
        engagement: "9.1%",
        verified: true,
        tags: ["Sustainable Fashion", "Eco-Friendly", "African Textiles", "Ethical Production"],
        summary: "Leading sustainable fashion brand promoting African textiles and ethical production. Featured in Vogue Africa and Elle.",
        contactInfo: {
          email: "hello@ecothreads.ng",
          phone: "+234 803 456 7890",
          website: "ecothreads.ng"
        },
        social: {
          instagram: "ecothreads_ng",
          twitter: "ecothreads",
          facebook: "EcoThreadsNigeria"
        },
        metrics: {
          monthlyRevenue: "$25K+",
          customerSatisfaction: "94%",
          sustainabilityScore: "A+",
          availability: "Available"
        }
      }
    ]
  };

  const handleSearch = async (query) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Match query to demo data
    const lowerQuery = query.toLowerCase();
    let results = [];
    
    if (lowerQuery.includes('ux') && lowerQuery.includes('fintech') && lowerQuery.includes('lagos')) {
      results = demoProfiles["ux designers fintech lagos"];
    } else if (lowerQuery.includes('fitness') && lowerQuery.includes('south africa') && lowerQuery.includes('100k')) {
      results = demoProfiles["fitness influencers south africa 100k"];
    } else if (lowerQuery.includes('sustainable') && lowerQuery.includes('fashion') && lowerQuery.includes('nigeria')) {
      results = demoProfiles["sustainable fashion brands nigeria"];
    } else {
      // Return mixed results for other queries
      results = [
        ...demoProfiles["ux designers fintech lagos"].slice(0, 1),
        ...demoProfiles["fitness influencers south africa 100k"],
        ...demoProfiles["sustainable fashion brands nigeria"]
      ];
    }
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const generateOutreachSuggestion = (profile) => {
    const suggestions = {
      "UX Designer": {
        subject: "Collaboration Opportunity - Fintech UX Project",
        approach: "Professional & Project-Focused",
        message: `Hi ${profile.name.split(' ')[0]}, I noticed your impressive work in fintech UX design. I'd love to discuss a potential collaboration on an exciting project that aligns with your expertise in financial technology interfaces.`,
        tips: ["Mention specific projects from their portfolio", "Reference their fintech experience", "Propose clear collaboration terms"]
      },
      "Fitness Coach": {
        subject: "Partnership Opportunity - Wellness Brand Collaboration",
        approach: "Community & Values-Focused",
        message: `Hi ${profile.name.split(' ')[0]}, Your fitness content really resonates with your community! I represent a wellness brand that shares your values. Would you be interested in exploring a partnership that could benefit your followers?`,
        tips: ["Engage with recent content first", "Highlight mutual values", "Offer value to their audience"]
      },
      "Fashion Brand": {
        subject: "Business Partnership - Sustainable Fashion Collaboration",
        approach: "Brand & Mission-Aligned",
        message: `Hello, I'm impressed by EcoThreads' commitment to sustainable fashion. We're looking to partner with brands that share our environmental values. Would you be open to discussing potential collaboration opportunities?`,
        tips: ["Research their sustainability mission", "Propose win-win partnerships", "Mention specific products or campaigns"]
      }
    };

    return suggestions[profile.title.includes('Designer') ? 'UX Designer' : 
                     profile.title.includes('Coach') ? 'Fitness Coach' : 'Fashion Brand'] || suggestions['UX Designer'];
  };

  const ProfileCard = ({ profile, onClick }) => (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#00D37F] p-6"
      onClick={() => onClick(profile)}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {profile.verified && (
            <div className="absolute -top-1 -right-1 bg-[#00D37F] rounded-full p-1">
              <Star className="w-3 h-3 text-white" fill="white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[#121B00] text-lg truncate">{profile.name}</h3>
          <p className="text-gray-600 text-sm mb-1">{profile.title}</p>
          <p className="text-gray-500 text-sm mb-2">{profile.company}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
              <span>{profile.rating}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {profile.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#dde35f] text-[#121B00] rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{profile.summary}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#F84F94]" />
                <span>{profile.followers}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-[#00D37F]" />
                <span>{profile.engagement}</span>
              </div>
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
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#00D37F] hover:text-[#121B00] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Results
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
              />
              {profile.verified && (
                <div className="absolute -top-2 -right-2 bg-[#00D37F] rounded-full p-2">
                  <Star className="w-4 h-4 text-white" fill="white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-[#121B00] mb-2">{profile.name}</h1>
              <p className="text-xl text-gray-600 mb-2">{profile.title}</p>
              <p className="text-lg text-gray-500 mb-4">{profile.company}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  <span>{profile.rating}/5.0</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{profile.followers} followers</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {profile.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#dde35f] text-[#121B00] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#121B00] mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{profile.summary}</p>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(profile.metrics).map(([key, value], index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#00D37F] mb-1">{value}</div>
                <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
          
          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#121B00] mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#00D37F]" />
                  <span className="text-gray-600">{profile.contactInfo.email}</span>
                </div>
                {profile.contactInfo.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#00D37F]" />
                    <span className="text-gray-600">{profile.contactInfo.phone}</span>
                  </div>
                )}
                {profile.contactInfo.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#00D37F]" />
                    <span className="text-gray-600">{profile.contactInfo.website}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-[#121B00] mb-4">Social Media</h3>
              <div className="space-y-3">
                {profile.social.linkedin && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                    <span className="text-gray-600">{profile.social.linkedin}</span>
                  </div>
                )}
                {profile.social.twitter && (
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                    <span className="text-gray-600">@{profile.social.twitter}</span>
                  </div>
                )}
                {profile.social.instagram && (
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-[#E4405F]" />
                    <span className="text-gray-600">@{profile.social.instagram}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* AI Outreach Suggestions */}
          <div className="bg-gradient-to-r from-[#00D37F]/10 to-[#F84F94]/10 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-[#00D37F]" />
              <h3 className="text-lg font-bold text-[#121B00]">AI Outreach Suggestions</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#121B00] mb-2">Recommended Subject Line:</h4>
                <p className="text-gray-700 bg-white rounded px-3 py-2">{outreachSuggestion.subject}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-[#121B00] mb-2">Approach Style:</h4>
                <span className="inline-block bg-[#dde35f] text-[#121B00] px-3 py-1 rounded-full text-sm">
                  {outreachSuggestion.approach}
                </span>
              </div>
              
              <div>
                <h4 className="font-semibold text-[#121B00] mb-2">Message Template:</h4>
                <p className="text-gray-700 bg-white rounded px-3 py-2">{outreachSuggestion.message}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-[#121B00] mb-2">Pro Tips:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {outreachSuggestion.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
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
        <div className="container mx-auto px-4 py-8">
          <ProfileDetails 
            profile={selectedProfile} 
            onBack={() => setSelectedProfile(null)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00D37F] to-[#F84F94] rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#121B00]">Prymsearch</h1>
                <p className="text-sm text-gray-600">The Google for finding People, Businesses and Creators</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {searchResults.length === 0 && !isSearching && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#121B00] mb-4">
              Find Anyone, Anywhere
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Use AI to discover the perfect people, businesses, and creators with just a simple description.
            </p>
          </div>
        )}

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchQuery.trim() && handleSearch(searchQuery)}
              placeholder="Describe who you're looking for in plain English..."
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[#00D37F] focus:outline-none transition-colors"
            />
            <button
              onClick={() => searchQuery.trim() && handleSearch(searchQuery)}
              disabled={!searchQuery.trim() || isSearching}
              className="absolute inset-y-0 right-0 px-6 bg-[#00D37F] text-white rounded-r-xl hover:bg-[#00B36B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Demo Queries */}
        {searchResults.length === 0 && !isSearching && (
          <div className="max-w-6xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-[#121B00] mb-6 text-center">Try These Examples</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(demoQueries).map(([category, queries]) => (
                <div key={category} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    {category === 'professionals' && <User className="w-5 h-5 text-[#00D37F]" />}
                    {category === 'businesses' && <Building className="w-5 h-5 text-[#F84F94]" />}
                    {category === 'influencers' && <Users className="w-5 h-5 text-[#dde35f]" />}
                    {category === 'general' && <Search className="w-5 h-5 text-gray-600" />}
                    <h4 className="font-bold text-[#121B00] capitalize">{category}</h4>
                  </div>
                  <div className="space-y-2">
                    {queries.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(query)}
                        className="text-left text-sm text-gray-600 hover:text-[#00D37F] transition-colors block w-full p-2 rounded hover:bg-gray-50"
                      >
                        "{query}"
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-[#00D37F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#121B00] mb-2">Searching the web...</h3>
            <p className="text-gray-600">Our AI is analyzing millions of profiles to find your perfect matches</p>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#121B00]">
                Found {searchResults.length} matches for "{searchQuery}"
              </h3>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Sort by relevance</span>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {searchResults.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={setSelectedProfile}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#121B00] text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00D37F] to-[#F84F94] rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">Prymsearch</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Powered by AI • Find People, Businesses & Creators
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>© 2024 Prymsearch</span>
            <span>•</span>
            <span>Search AI 1.0</span>
            <span>•</span>
            <span>Made in Nigeria 🇳🇬</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrymsearchDemo;