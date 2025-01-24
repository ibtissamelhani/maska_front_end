

describe('Home Page', ()=>{

  beforeEach(()=>{
    cy.visit("/")
  })

  it('should display the header with background image', () => {
    cy.get('header').should('exist')
    cy.get('header > div').first()
      .should('have.css', 'background-image')
      .and('include', 'hunters-league.webp')
  });

  it('shows the welcome message', ()=>{
    cy.contains('Unleash the thrill of the hunt and the excitement of competition with Hunter\'s League, the ultimate platform for managing hunting events.')
  });

  it('should have two navigation buttons', () => {
    cy.get('button[routerLink="/auth/register"]')
      .should('be.visible')
      .and('contain.text', 'Get Started')
      .and('have.class', 'bg-green-900');

    cy.get('button[routerLink="/auth/login"]')
      .should('be.visible')
      .and('contain.text', 'Sign in')
      .and('have.class', 'bg-gray-100');
  });

  it('should navigate to register page when Get Started is clicked', () => {
    cy.get('button[routerLink="/auth/register"]').click();
    cy.url().should('include', '/auth/register');
  });

  it('should navigate to login page when Sign in is clicked', () => {
    cy.get('button[routerLink="/auth/login"]').click();
    cy.url().should('include', '/auth/login');
  });

})


