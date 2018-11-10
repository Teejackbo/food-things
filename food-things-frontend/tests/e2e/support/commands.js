Cypress.Commands.add('stubLogin', () => {
  cy.server()
  cy.route('POST', '/**/login', {
    id: 1,
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'jcldrk@gmail.com',
    username: 'jack',
    permissions: 1,
  }).as('login')
})

Cypress.Commands.add('login', () => {
  cy.stubLogin()
  cy.visit('/login')
  cy.get('.checkbox').click()
  cy.get('[data-cy-login-btn]').click()
})
