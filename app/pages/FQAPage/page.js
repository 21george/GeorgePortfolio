"use client";
import React, { useState, useEffect } from 'react';
import { Plus, X, HelpCircle, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useTextAnimation } from "@/app/hooks/useTextAnimation";
import { useGSAP } from "@gsap/react";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());
  const [faqData, setFaqData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { animateText, cleanup } = useTextAnimation();

  // Fetch FAQ data from API
  const fetchFAQs = async (category = 'all', search = '', page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      if (search) params.append('search', search);
      params.append('page', page.toString());
      params.append('limit', '50');

      const response = await fetch(`/api/FQA?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setFaqData(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error(data.error || 'Failed to fetch FAQs');
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setError(error.message);
      setFaqData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/FQA/categories');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        const totalCount = data.data.reduce((sum, cat) => sum + cat.count, 0);
        
        const categoriesArray = [
          { id: 'all', name: 'All Questions', count: totalCount },
          ...data.data.map(cat => ({
            id: cat._id,
            name: cat._id.charAt(0).toUpperCase() + cat._id.slice(1),
            count: cat.count
          }))
        ];
        
        setCategories(categoriesArray);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([
        { id: 'all', name: 'All Questions', count: faqData.length }
      ]);
    }
  };

  // Increment view count for a specific FAQ
  const incrementViewCount = async (faqId) => {
    try {
      await fetch(`/api/FQA/${faqId}`);
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchFAQs();
    fetchCategories();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    if (!loading) {
      fetchFAQs(activeCategory, searchTerm);
    }
  }, [activeCategory, searchTerm]);

  // GSAP animations
  useGSAP(() => {
    // Animate header elements
    animateText('.faq-h1', {
      y: 50,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    });
    animateText('.faq-h2', {        
      y: 50,
      opacity: 1,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out"
    });
    animateText('.faq-h3', {
      y: 50,
      opacity: 1,
      duration: 1.2,
      delay: 0.4,
      ease: "power3.out"
    });
    
    // Animate grid lines
    animateText('.logos_banner-line', {
      scaleX: 1,
      opacity: 1,
      duration: 0.8,
      delay: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    });
    
    // Animate caption and line
    animateText('.faq-caption', {
      opacity: 1,
      duration: 0.8,
      delay: 1,
      ease: "power2.out"
    });
    
    animateText('.logos_line-bg', {
      scaleX: 1,
      duration: 1,
      delay: 1.2,
      ease: "power2.out"
    });
  }, [animateText, cleanup]);

  const toggleItem = (id) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
      incrementViewCount(id);
    }
    setOpenItems(newOpen);
  };

  

  // Loading state
  

 

  return (
    <main className="bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen transition-colors duration-300">
      {/* FAQ Header */}
      <section className="pt-22  sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="faq_header relative">
          <div className="faq_header-wrapper justify-between mx-auto flex items-center">
            {/* Header Text */}
            <div className="flex-1 ml-12 mt-2 font-mono text-gray-500 dark:text-gray-400">
              <div className="faq_header-top">
                <h2 className="faq-h1 opacity-0 uppercase text-4xl xs:text-2xl sm:text-2xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-gray-900 dark:text-white uppercase">
                  FREQUENTLY
                </h2>
              </div>
              <div className="faq_header-middle">
                <h2 className="faq-h2 opacity-0 uppercase text-4xl mr-[3em] xs:text-2xl sm:text-2xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-gray-900 dark:text-white uppercase">
                  ASKED
                </h2>
              </div>
              <div className="faq_header-bottom">
                <div className="faq-h3 opacity-0 uppercase text-4xl mr-[1em] xs:text-2xl sm:text-2xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-gray-900 dark:text-white uppercase">
                  QUESTIONS
                </div>
              </div>
            </div>
            {/* Logo Element Component */}
            <div className="logos_element-component flex-shrink-0 ml-8 hidden lg:block">
              <div className="logos_element-wrapper">
                {/* Grid Lines */}
                <div className="logos_banner-wrapper grid grid-cols-8 gap-1 mb-4 w-48 h-32">
                  {/* Desktop Lines (hidden on tablet) */}
                  {[...Array(13)].map((_, i) => (
                    <div
                      key={`desktop-${i}`}
                      className="logos_banner-line opacity-0 scale-x-0 h-1 bg-gray-300 dark:bg-gray-600 origin-left hidden md:block"
                    />
                  ))}
                  
                  {/* Mobile Landscape Lines */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`mobile-landscape-${i}`}
                      className="logos_banner-line opacity-0 scale-x-0 h-1 bg-gray-300 dark:bg-gray-600 origin-left block md:hidden"
                    />
                  ))}
                  
                  {/* Always Visible Lines */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`always-${i}`}
                      className="logos_banner-line opacity-0 scale-x-0 h-1 bg-gray-300 dark:bg-gray-600 origin-left"
                    />
                  ))}
                </div>
              </div>
              
              {/* Element Line */}
              <div className="logos_element-line">
                <div className="logos_line-bg h-px bg-gray-300 dark:bg-gray-600 scale-x-0 origin-left transform"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {faqData.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No questions found
              </h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : 'No FAQs available at the moment.'}
              </p>
            </div>
          ) : (
            <div className="faq_wrapper space-y-4">
              {faqData.map(item => (
                <div
                  key={item._id}
                  className="border border-gray-200 dark:border-gray-700  overflow-hidden transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                >
                  {/* FAQ Question */}
                  <button
                    onClick={() => toggleItem(item._id)}
                    className="faq_question w-full flex items-center justify-between p-6 text-left    transition-colors duration-200"
                    aria-expanded={openItems.has(item._id)}
                  >
                    <div className="faq_question-wrapper flex-1 pr-4">
                      
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                        {item.question}
                      </h3>
                    </div>
                    
                    {/* FAQ Icon */}
                    <div className="faq_icon-wrapper ml-4">
                      <div 
                        className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                          openItems.has(item._id) ? 'rotate-45' : 'rotate-0'
                        }`}
                      >
                        <svg 
                          width="100%" 
                          height="100%" 
                          viewBox="0 0 32 33" 
                          fill="none" 
                          className="text-gray-600 dark:text-gray-400"
                        >
                          <path 
                            d="M15.6165 23.8055V9.7998H16.3892V23.8055H15.6165ZM9 17.189V16.4163H23.0057V17.189H9Z" 
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* FAQ Answer */}
                  <div 
                    className={`faq_answer transition-all duration-300 ease-in-out overflow-hidden ${
                      openItems.has(item._id) 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!openItems.has(item._id)}
                  >
                    <div className="px-6 pb-6">
                      <div className="pt-4  border-gray-100 dark:border-gray-700">
                        <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}