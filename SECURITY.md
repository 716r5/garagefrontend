# Security Guidelines

## Overview
This document outlines security best practices and measures implemented in the Garage@EEE frontend application.

## Security Measures Implemented

### 1. Dependency Management
- **Automated vulnerability scanning**: Run `npm audit` regularly to check for known vulnerabilities
- **Keep dependencies updated**: Update dependencies regularly, especially security patches
- **Current measures**: 
  - Axios updated to fix DoS vulnerability
  - React Router DOM updated to fix XSS vulnerability
  - ESLint security plugin added for static analysis

### 2. Authentication & Authorization
- **Token-based authentication**: JWT tokens are used for authentication
- **Secure storage**: Auth tokens are stored in localStorage (Note: Consider using httpOnly cookies for production)
- **Token validation**: Invalid tokens trigger automatic logout
- **Password handling**: Passwords/passcodes are never stored in application state or localStorage
- **Protected routes**: PrivateRoute component ensures authentication before accessing sensitive pages

### 3. Input Validation & Sanitization
- **Client-side validation**: All form inputs are validated before submission
- **Email validation**: Email format is validated using regex
- **Phone validation**: Phone numbers are validated for proper format
- **Input sanitization**: Basic XSS prevention by removing `<>` characters from user inputs
- **Important**: Client-side validation is NOT sufficient - always validate on the server side

### 4. Data Protection
- **Sensitive data logging**: Console.log statements that expose credentials or sensitive data have been removed
- **localStorage validation**: Data retrieved from localStorage is validated to prevent corruption or tampering
- **File upload restrictions**: File uploads are restricted by type and size (50MB max)

### 5. API Security
- **Timeout configuration**: All API calls have timeout settings (30 seconds) to prevent hanging requests
- **CORS configuration**: API endpoints use CORS properly configured
- **Error handling**: Proper error handling without exposing sensitive information

### 6. Security Linting
- **ESLint security plugin**: Configured to detect common security issues
- **Run linter**: Use `npm run build` or configure IDE to show security warnings
- **Security rules enabled**:
  - Detect unsafe regex
  - Detect eval usage
  - Detect buffer assertions
  - Detect possible timing attacks
  - Warn on dynamic require/fs operations

## Security Checklist for Developers

### Before Committing Code
- [ ] No hardcoded credentials, API keys, or secrets in code
- [ ] Environment variables are used for sensitive configuration (use `.env` files)
- [ ] `.env` files are listed in `.gitignore`
- [ ] No console.log statements exposing sensitive data
- [ ] Input validation is implemented
- [ ] No use of `dangerouslySetInnerHTML` or unsafe DOM manipulation
- [ ] Dependencies are up to date and have no known vulnerabilities

### During Code Review
- [ ] All user inputs are validated and sanitized
- [ ] Authentication and authorization logic is correct
- [ ] Sensitive data is not exposed in logs or error messages
- [ ] API calls have proper error handling
- [ ] Rate limiting considerations are documented
- [ ] XSS and CSRF protections are in place

### Before Deployment
- [ ] Run `npm audit` and fix all critical/high vulnerabilities
- [ ] Run security linter: Check ESLint output for security warnings
- [ ] Review all environment variables
- [ ] Ensure HTTPS is used for all API calls in production
- [ ] Test authentication flows thoroughly
- [ ] Verify file upload restrictions work correctly

## Known Limitations & Recommendations

### Current Limitations
1. **Client-side validation only**: All validation is currently client-side. Server-side validation is required.
2. **localStorage for tokens**: Tokens are stored in localStorage, which is vulnerable to XSS. Consider:
   - Using httpOnly cookies for production
   - Implementing token refresh mechanism
   - Adding token expiration checks
3. **No CSRF protection**: CSRF tokens are not implemented
4. **No rate limiting**: API endpoints may be vulnerable to brute force attacks

### Recommendations for Production
1. **Implement server-side validation**: Never trust client-side validation alone
2. **Use httpOnly cookies**: Store authentication tokens in httpOnly cookies instead of localStorage
3. **Implement CSRF protection**: Add CSRF tokens to all state-changing requests
4. **Add rate limiting**: Implement rate limiting on authentication endpoints
5. **Security headers**: Ensure proper security headers are set (CSP, X-Frame-Options, etc.)
6. **Content Security Policy**: Implement strict CSP to prevent XSS attacks
7. **Regular security audits**: Conduct periodic security assessments
8. **Dependency scanning**: Set up automated dependency vulnerability scanning in CI/CD
9. **Error handling**: Implement proper error handling that doesn't leak sensitive information
10. **Logging**: Implement server-side logging with proper security event monitoring

## Reporting Security Issues

If you discover a security vulnerability, please report it to:
- Email: ntugarageeee@gmail.com
- Do not open public issues for security vulnerabilities

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://reactjs.org/docs/security.html)
- [NPM Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)
- [ESLint Security Plugin](https://github.com/eslint-community/eslint-plugin-security)

## Last Updated
January 2026
