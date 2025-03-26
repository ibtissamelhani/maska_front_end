describe('Login Page',()=>{

  beforeEach(()=>{
    cy.visit('/auth/login');
  });

  it('should display login form elements', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist').and('contain', 'Sign In');
  });

  it('should show error for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Please fill in all fields').should('be.visible');
  });

  it('should handle failed login with invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('An error occurred during login check your credentials').should('be.visible');
  });

  it('should navigate to admin dashboard for admin role', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        token: 'mock-admin-token',
        role: 'ROLE_ADMIN'
      }
    }).as('adminLogin');

    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('Password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/admin/dashboard');
  });

  it('should navigate to landing page for member role', () => {
    // Mock the login service to return member credentials
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        token: 'mock-member-token',
        role: 'ROLE_MEMBER'
      }
    }).as('memberLogin');

    cy.get('input[name="email"]').type('jiso@mailinator.com');
    cy.get('input[name="password"]').type('Password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/landing');
  });

  it('should navigate to registration page', () => {
    cy.get('a').contains('or sign up').click();
    cy.url().should('include', '/auth/register');
  });
})
