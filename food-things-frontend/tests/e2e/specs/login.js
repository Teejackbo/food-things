describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Displays an error without a username on submit.', () => {
    cy.get('[name="password"]').type('password')
    cy.get('[data-cy-login-btn]').click()
    cy.contains('Please enter a username.')
    cy.get('[name="username"]').should('have.class', 'error')
  })

  it('Displays an error without a username on blur.', () => {
    cy.get('[name="username"]').click()
    cy.get('[name="password"]').click()
    cy.contains('Please enter a username.')
    cy.get('[name="username"]').should('have.class', 'error')
  })

  it('Displays an error without a password on submit.', () => {
    cy.get('[name="username"]').type('username')
    cy.get('[data-cy-login-btn]').click()
    cy.contains('Please enter a password.')
    cy.get('[name="password"]').should('have.class', 'error')
  })

  it('Displays an error without a password on blur.', () => {
    cy.get('[name="password"]').click()
    cy.get('[name="username"]').click()
    cy.contains('Please enter a password.')
    cy.get('[name="password"]').should('have.class', 'error')
  })

  it('Displays both errors when neither field is filled out on submit.', () => {
    cy.get('[data-cy-login-btn]').click()
    cy.contains('Please enter a username.')
    cy.contains('Please enter a password.')
    cy.get('[name="username"]').should('have.class', 'error')
    cy.get('[name="password"]').should('have.class', 'error')
  })

  it('Signs you in and redirects to the home page.', () => {
    cy.stubLogin()
    cy.get('[name="username"]').type('jack')
    cy.get('[name="password"]').type('jack')
    cy.get('[data-cy-login-btn]').click()
    cy.contains('Logout')
    cy.contains('Successfully logged in.').should('have.class', 'success')
  })

  it('Should still be logged in after refreshing if you choose to be remembered.', () => {
    cy.stubLogin()
    cy.get('[name="username"]').type('jack')
    cy.get('[name="password"]').type('jack')
    cy.get('.checkbox').click()
    cy.get('[data-cy-login-btn]').click()
    cy.reload()
    cy.contains('Logout')
  })
})
