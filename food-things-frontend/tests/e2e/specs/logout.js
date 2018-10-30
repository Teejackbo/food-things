describe('Logout', () => {
  it('Should not be visible if logged out already.', () => {
    cy.visit('/')
    cy.contains('Logout').should('not.exist')
  })

  it('Should log you out.', () => {
    cy.login()
    cy.visit('/')
    cy.contains('Logout').click()
    cy.contains('Login')
    cy.contains('Sign Up')
  })
})
