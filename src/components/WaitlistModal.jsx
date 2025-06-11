import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { X, ArrowRight, CheckCircle, Users } from 'lucide-react';

// Set the app element for accessibility (put this in your main App.js file)
// Modal.setAppElement('#root');

const WaitlistModal = ({ 
  isOpen, 
  onClose, 
  initialEmail = '', 
  onSubmit 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [position, setPosition] = useState(null);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Update email when initialEmail changes
  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setShowSuccess(false);
      setPosition(null);
      setIsExistingUser(false);
      setShowConfetti(false);
    } else {
      setName('');
      setEmail('');
      setIsLoading(false);
      setShowSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || isLoading) return;
    
    setIsLoading(true);
    
    try {
      const result = await onSubmit({ name, email });
      
      if (result.success) {
        setPosition(result.position);
        setIsExistingUser(result.isExisting);
        setShowSuccess(true);
        
        if (!result.isExisting) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        
        // Auto close after 4 seconds
        setTimeout(() => {
          onClose();
        }, 15000);
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: '16px',
      padding: '0',
      maxWidth: '28rem',
      width: '90%',
      maxHeight: '90vh',
      overflow: 'visible',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Join Waitlist Modal"
      shouldCloseOnOverlayClick={!isLoading}
      shouldCloseOnEsc={!isLoading}
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: Math.random() > 0.5 ? '#B0D226' : '#161D25'
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {!showSuccess ? (
          // Form View
          <div className="p-8">
            <div className="text-center mb-8">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: '#161D25' }}
              >
                <Users className="w-8 h-8" style={{ color: '#B0D226' }} />
              </div>
              <h2 
                className="text-2xl font-bold mb-2"
                style={{ color: '#161D25' }}
              >
                Join the Waitlist
              </h2>
              <p className="text-sm text-gray-600">
                Be the first to know when we launch
              </p>
            </div>

            <div className="space-y-6 !text-sm">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#161D25' }}
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                  style={{ 
                    focusBorderColor: '#B0D226'
                  }}
                  required
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#161D25' }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                  style={{ 
                    focusBorderColor: '#B0D226'
                  }}
                  required
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || !name || !email}
                className="w-full py-4 rounded-full cursor-pointer font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                style={{ 
                  backgroundColor: '#161D25',
                  color: '#B0D226'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-transparent border-t-current"></div>
                    <span>Joining...</span>
                  </div>
                ) : (
                  <>
                    <span>Join Waitlist</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          // Success View
          <div className="p-8 text-center">
            <div className="mb-6">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse"
                style={{ backgroundColor: isExistingUser ? '#161D25' : '#B0D226' }}
              >
                <CheckCircle 
                  className="w-10 h-10" 
                  style={{ color: isExistingUser ? '#B0D226' : '#161D25' }} 
                />
              </div>
              
              {isExistingUser ? (
                <div>
                  <h2 
                    className="text-2xl font-bold mb-3"
                    style={{ color: '#161D25' }}
                  >
                    Welcome Back!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    You're already on our waitlist
                  </p>
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{ color: '#B0D226' }}
                  >
                    #{position}
                  </div>
                  <p 
                    className="text-lg"
                    style={{ color: '#161D25' }}
                  >
                    You're number {position} on the waitlist
                  </p>
                </div>
              ) : (
                <div>
                  <h2 
                    className="text-2xl font-bold mb-3"
                    style={{ color: '#161D25' }}
                  >
                    🎉 Congratulations!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Welcome to the waitlist, {name}!
                  </p>
                  <div 
                    className="text-4xl font-bold mb-2 animate-bounce"
                    style={{ color: '#B0D226' }}
                  >
                    #{position}
                  </div>
                  <p 
                    className="text-lg"
                    style={{ color: '#161D25' }}
                  >
                    You are number {position} on the waitlist
                  </p>
                </div>
              )}
            </div>
            
            <div 
              className="bg-gray-50 rounded-xl p-4"
              style={{ borderLeft: `4px solid #B0D226`, borderRight: `4px solid #B0D226` }}
            >
              <p className="text-sm text-gray-600">
                <span className='font-semibold'>First 100 have access to full pro features for 45 days after launch. Invite others! </span><br /> <br />We'll notify you as soon as we're ready to launch!
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default WaitlistModal;