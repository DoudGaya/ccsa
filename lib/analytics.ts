// Google Analytics tracking utilities for CCSA website

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'get',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: Record<string, any>[]
  }
}

// Generic event tracking
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_title: title,
      page_location: url,
    })
  }
}

// CCSA-specific tracking functions

// Training Applications
export const trackTrainingApplication = (trainingType: string) => {
  trackEvent('submit', 'training_application', trainingType)
}

export const trackTrainingApplicationView = (trainingType: string) => {
  trackEvent('view', 'training_application', trainingType)
}

// Program Applications (China Programs)
export const trackProgramApplication = (programType: string) => {
  trackEvent('submit', 'program_application', programType)
}

export const trackProgramApplicationView = (programType: string) => {
  trackEvent('view', 'program_application', programType)
}

// Contact and Communication
export const trackContactForm = (formType: string = 'general') => {
  trackEvent('submit', 'contact', formType)
}

export const trackNewsletterSignup = () => {
  trackEvent('signup', 'newsletter', 'footer')
}

// Content Engagement
export const trackNewsArticleView = (articleTitle: string) => {
  trackEvent('view', 'content', `article: ${articleTitle}`)
}

export const trackResearchView = (researchTitle: string) => {
  trackEvent('view', 'content', `research: ${researchTitle}`)
}

export const trackPublicationDownload = (publicationName: string) => {
  trackEvent('download', 'publication', publicationName)
}

// Event and Training
export const trackEventRegistration = (eventName: string) => {
  trackEvent('register', 'event', eventName)
}

export const trackCustomCourseRequest = (courseType: string) => {
  trackEvent('submit', 'custom_course', courseType)
}

// Volunteer Activities
export const trackVolunteerApplication = (volunteerType: string) => {
  trackEvent('submit', 'volunteer', volunteerType)
}

// Social Media and Sharing
export const trackSocialShare = (platform: string, contentType: string, contentTitle?: string) => {
  trackEvent('share', 'social', `${platform}: ${contentType}`, undefined)
}

export const trackSocialClick = (platform: string) => {
  trackEvent('click', 'social', platform)
}

// Navigation and User Interaction
export const trackMenuClick = (menuItem: string) => {
  trackEvent('click', 'navigation', menuItem)
}

export const trackSearchUsage = (searchTerm: string) => {
  trackEvent('search', 'site_search', searchTerm)
}

export const trackFilterUsage = (filterType: string, filterValue: string) => {
  trackEvent('filter', 'data_table', `${filterType}: ${filterValue}`)
}

// Admin Dashboard (for internal analytics)
export const trackAdminAction = (action: string, section: string) => {
  trackEvent(action, 'admin', section)
}

export const trackAdminLogin = () => {
  trackEvent('login', 'admin', 'dashboard')
}

// File Downloads
export const trackFileDownload = (fileName: string, fileType: string) => {
  trackEvent('download', 'file', `${fileType}: ${fileName}`)
}

// External Link Clicks
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('click', 'external_link', linkText || url)
}

// Mandate Areas Engagement
export const trackMandateAreaClick = (mandateTitle: string) => {
  trackEvent('click', 'mandate_area', mandateTitle)
}

export default {
  trackEvent,
  trackPageView,
  trackTrainingApplication,
  trackTrainingApplicationView,
  trackProgramApplication,
  trackProgramApplicationView,
  trackContactForm,
  trackNewsletterSignup,
  trackNewsArticleView,
  trackResearchView,
  trackPublicationDownload,
  trackEventRegistration,
  trackCustomCourseRequest,
  trackVolunteerApplication,
  trackSocialShare,
  trackSocialClick,
  trackMenuClick,
  trackSearchUsage,
  trackFilterUsage,
  trackAdminAction,
  trackAdminLogin,
  trackFileDownload,
  trackExternalLink,
  trackMandateAreaClick,
}
