describe('Species Management Page', ()=>{
  beforeEach(() => {

    cy.intercept('POST', '**/api/v1/auth/authenticate', {
      statusCode: 200,
      body: {
        token: 'token',
        role: 'ROLE_ADMIN'
      }
    }).as('loginRequest');

    cy.visit('/auth/login');

    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('Password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest', { timeout: 10000});


    cy.intercept('GET', '**/api/v1/species?page=0&size=8', {
      statusCode: 200,
      body: {
        content: [
          { id: '1', name: 'Lion', category: 'BIG_GAME', minimumWeight: 150, difficulty: 'RARE', points: 100 },
          { id: '2', name: 'Eagle', category: 'BIRD', minimumWeight: 5, difficulty: 'COMMON', points: 50 }
        ],
        totalPages: 2,
        totalElements: 8,
        number: 0
      }
    }).as('fetchSpecies');

    cy.visit('/admin/species');
    cy.wait('@fetchSpecies', { timeout: 10000})
  });

  it('should display species-test table with correct columns', () => {
    cy.get('table').should('exist');
    cy.get('th').should('contain.text', 'Name')
      .and('contain.text', 'category')
      .and('contain.text', 'minimum Weight')
      .and('contain.text', 'difficulty')
      .and('contain.text', 'points');
  });

  it('should display species-test details correctly', () => {
    cy.get('tbody tr').first().should('contain', 'Lion')
      .and('contain', 'BIG_GAME')
      .and('contain', '150')
      .and('contain', 'RARE')
      .and('contain', '100');
  });

  it('should handle pagination', () => {
    cy.get('button').contains('previous');

    cy.get('a').contains('Page 1 of 2').should('exist');

    cy.intercept('GET', '**/species?page=1&size=8', {
      statusCode: 200,
      body: {
        content: [
          { id: '3', name: 'Tiger', category: 'BIG_GAME', minimumWeight: 200, difficulty: 'EPIC', points: 150 }
        ],
        totalPages: 2,
        totalElements: 10,
        number: 1
      }
    }).as('fetchNextPage');

    cy.get('button').contains('Next').click();
    cy.wait('@fetchNextPage');

  });

})
