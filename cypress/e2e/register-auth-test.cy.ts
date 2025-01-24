describe('Registration Page', ()=>{
  beforeEach(() => {
    cy.visit('/auth/register');
  });

  it('should display registration form elements', () => {
    const fields = [
      'input[formControlName="firstName"]',
      'input[formControlName="lastName"]',
      'input[formControlName="username"]',
      'input[formControlName="email"]',
      'input[formControlName="cin"]',
      'select[formControlName="nationality"]',
      'input[formControlName="password"]'
    ];

    fields.forEach(field => cy.get(field).should('exist'));
    cy.get('button[type="submit"]').should('exist').and('be.disabled');
  });

  it('should validate form fields', () => {
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[formControlName="username"]').type('ab').blur();
    cy.contains('Username must be at least 3 characters long');

    cy.get('input[formControlName="email"]').type('invalid-email').blur();
    cy.contains('Invalid email format');

    cy.get('input[formControlName="password"]').type('short').blur();
    cy.contains('Password must be at least 8 characters long');

    cy.get('input[formControlName="cin"]').type('123').blur();
    cy.contains('CIN must be exactly 8 digits');
  });

  it('should successfully register with valid data', () => {
    cy.intercept('POST', '**/register', {
      statusCode: 200,
      body: {
        message: 'Registration successful!',
        userId: '12345'
      }
    }).as('registerUser');

    cy.get('input[formControlName="firstName"]').type('John');
    cy.get('input[formControlName="lastName"]').type('Doe');
    cy.get('input[formControlName="username"]').type('johndoe');
    cy.get('input[formControlName="email"]').type('john.doe@example.com');
    cy.get('input[formControlName="cin"]').type('12345678');
    cy.get('select[formControlName="nationality"]').select('American');
    cy.get('input[formControlName="password"]').type('StrongPass123');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/auth/register');
  });

  it('should handle registration errors', () => {

    cy.intercept('POST', '**/register', {
      statusCode: 400,
      body: {
        message: 'Email already exists'
      }
    }).as('registerError');

    cy.get('input[formControlName="firstName"]').type('John');
    cy.get('input[formControlName="lastName"]').type('Doe');
    cy.get('input[formControlName="username"]').type('johndoe');
    cy.get('input[formControlName="email"]').type('john.doe@example.com');
    cy.get('input[formControlName="cin"]').type('12345678');
    cy.get('select[formControlName="nationality"]').select('American');
    cy.get('input[formControlName="password"]').type('StrongPass123');

    cy.get('button[type="submit"]').click();

    cy.wait('@registerError');
    cy.contains('register failed. Please try again.').should('be.visible');
  });
})
