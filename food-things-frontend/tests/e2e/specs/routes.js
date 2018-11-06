describe('Routes', () => {
  it('/', () => {
    cy.visit('/')
  })

  it('/login', () => {
    cy.visit('/login')
  })

  it('/sign-up', () => {
    cy.visit('/sign-up')
  })

  it('/food/create', () => {
    cy.visit('/food/create')
  })
})
