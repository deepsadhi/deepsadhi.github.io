// Dynamic Google Analytics loader
async function loadGoogleAnalytics() {
  try {
    const response = await fetch('/src/config.json');
    const config = await response.json();
    const gaId = config.analytics?.googleAnalyticsId;
    
    if (gaId) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);
      
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', gaId);
      
      // Make gtag globally available
      window.gtag = gtag;
    }
  } catch (error) {
    console.warn('Failed to load Google Analytics configuration:', error);
  }
}

// Load analytics when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadGoogleAnalytics);
} else {
  loadGoogleAnalytics();
} 