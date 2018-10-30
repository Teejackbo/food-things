describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Displays an error without a username.', () => {
    cy.get('[name="password"]').type('password')
    cy.get('[data-cy-login-btn]').click()
    cy.contains('Please enter a username.').should('have.class', 'error')
  })

  it('Displays an error without a password.', () => {
    cy.get('[name="username"]').type('username')
    cy.get('[data-cy-login-btn]').click()
    cy.contains('Please enter a password.').should('have.class', 'error')
  })

  it('Displays both errors when neither field is filled out.', () => {
    cy.get('[data-cy-login-btn]').click()
    cy.contains('Please enter a username.').should('have.class', 'error')
    cy.contains('Please enter a password.').should('have.class', 'error')
  })

  it('Signs you in and redirects to the home page.', () => {
    cy.stubLogin()
    cy.get('[name="username"]').type('jack')
    cy.get('[name="password"]').type('jack')
    cy.get('[data-cy-login-btn]').click()
    cy.contains('Logout')
    cy.contains('Successfully logged in.').should('have.class', 'success')
  })
})
