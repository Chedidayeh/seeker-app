"use client"
import React from 'react'
import { motion } from 'motion/react'
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input'
import { useTranslations } from 'next-intl'

export default function Hero() {
    const t = useTranslations('Hero');
    
    const placeholders = [
        t('searchPlaceholders.lawyer'),
        t('searchPlaceholders.designer'),
        t('searchPlaceholders.financialAdvisor'),
        t('searchPlaceholders.marketingConsultant'),
        t('searchPlaceholders.healthcare'),
        t('searchPlaceholders.homeRepair'),
        t('searchPlaceholders.realEstate'),
        t('searchPlaceholders.itSpecialist')
      ];
     
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Search query:", e.target.value);
      };
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchQuery = formData.get("search") as string;
        console.log("Searching for:", searchQuery);
        // Here you would typically redirect to search results or handle the search
      };
    
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-grid-pattern"
      />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform-gpu">
        <div className="grid lg:grid-cols-3 gap-12 items-center min-h-screen py-20">
          {/* Left Side - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              {t('title.part1')}
              <motion.span
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                {t('title.part2')}
              </motion.span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 22, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 18, filter: 'blur(2px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.55 }
                }
              }}
              className="flex flex-wrap gap-8 text-sm text-gray-500 dark:text-gray-400"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{t('stats.verifiedProfessionals')}</span>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{t('stats.serviceCategories')}</span>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>{t('stats.successfulConnections')}</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <div className="relative lg:col-span-1">
            <div className="relative">
              {/* Main Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 18, filter: 'blur(3px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-2 shadow-2xl"
              >
                <div className="aspect-square bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center">
                  {/* Placeholder for image - you can replace this with an actual image */}
                  <div className=''>
                  <img src='/image.png' alt='' />
                  </div>
                </div>
              </motion.div>
            
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 0.2, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 0.2, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 dark:bg-indigo-800 rounded-full blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 0.2, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full blur-xl"
      />
    </div>
  )
}
