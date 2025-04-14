/**
 * Content Security Policy configuration
 * 
 * This module provides CSP headers to help prevent XSS and other code injection attacks
 */

/**
 * Generates a CSP meta tag for HTML documents
 * @returns {string} The CSP meta tag HTML
 */
export function getCSPMetaTag() {
    // Define allowed sources for various resource types
    const csp = [
        // Default policy: deny everything not explicitly allowed
        "default-src 'self'",
        
        // Scripts: allow from self and specific trusted domains
        "script-src 'self' https://www.gstatic.com https://www.googletagmanager.com",
        
        // Styles: allow from self and Google Fonts
        "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'",
        
        // Fonts: allow from Google Fonts
        "font-src 'self' https://fonts.gstatic.com",
        
        // Images: allow from self and data URLs (for embedded images)
        "img-src 'self' data: https://www.gstatic.com",
        
        // Connect: allow connections to Firebase and your API service
        "connect-src 'self' https://ezdata2.m5stack.com https://*.firebaseio.com https://firestore.googleapis.com",
        
        // Object sources: none allowed
        "object-src 'none'",
        
        // Form actions: restrict to self
        "form-action 'self'",
        
        // Base URI: restrict to self
        "base-uri 'self'",
        
        // Frame ancestors: restrict to self (prevents clickjacking)
        "frame-ancestors 'self'"
    ].join("; ");
    
    return `<meta http-equiv="Content-Security-Policy" content="${csp}">`;
}

/**
 * Adds CSP meta tag to an HTML document
 * @param {Document} document - The HTML document
 */
export function addCSPToDocument(document) {
    const head = document.querySelector('head');
    if (head) {
        const cspMeta = document.createElement('meta');
        cspMeta.httpEquiv = 'Content-Security-Policy';
        
        // Define CSP directives
        cspMeta.content = [
            "default-src 'self'",
            "script-src 'self' https://www.gstatic.com https://www.googletagmanager.com",
            "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https://www.gstatic.com",
            "connect-src 'self' https://ezdata2.m5stack.com https://*.firebaseio.com https://firestore.googleapis.com",
            "object-src 'none'",
            "form-action 'self'",
            "base-uri 'self'",
            "frame-ancestors 'self'"
        ].join("; ");
        
        head.appendChild(cspMeta);
    }
}
