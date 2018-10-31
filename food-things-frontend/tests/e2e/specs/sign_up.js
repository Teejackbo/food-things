describe('Sign Up', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/sign-up')
  })

  it('Should have 5 inputs and a button.', () => {
    cy.get('[name="first_name"]')
    cy.get('[name="last_name"]')
    cy.get('[name="email"]')
    cy.get('[name="username"]')
    cy.get('[name="password"]')
    cy.get('button.success')
  })

  it('Should display an error without a first name.', () => {
    cy.route({
      method: 'POST',
      url: '**/users/register',
      response: 'fx:sign_up/no_first_name.json',
      status: 400,
    })

    cy.get('[name="last_name"]').type('last name')
    cy.get('[name="email"]').type('email@email.email')
    cy.get('[name="username"]').type('username')
    cy.get('[name="password"]').type('password')
    cy.get('button.success').click()

    cy.contains('Please enter a first name.').should('have.class', 'error')
  })

  it('Should display an error without a last name.', () => {
    cy.route({
      method: 'POST',
      url: '**/users/register',
      response: 'fx:sign_up/no_last_name.json',
      status: 400,
    })

    cy.get('[name="first_name"]').type('first name')
    cy.get('[name="email"]').type('email@email.email')
    cy.get('[name="username"]').type('username')
    cy.get('[name="password"]').type('password')
    cy.get('button.success').click()

    cy.contains('Please enter a last name.').should('have.class', 'error')
  })

  it('Should display an error without an email.', () => {
    cy.route({
      method: 'POST',
      url: '**/users/register',
      response: 'fx:sign_up/no_email.json',
      status: 400,
    })

    cy.get('[name="first_name"]').type('first name')
    cy.get('[name="last_name"]').type('last name')
    cy.get('[name="username"]').type('username')
    cy.get('[name="password"]').type('password')
    cy.get('button.success').click()
    cy.contains('Please enter an email address.').should('have.class', 'error')
  })

  it('Should display an error if the email is invalid.', () => {
    cy.route({
      method: 'POST',
      url: '**/users/register',
      response: 'fx:sign_up/invalid_email.json',
      status: 400,
    })

    cy.get('[name="first_name"]').type('first name')
    cy.get('[name="last_name"]').type('last name')
    cy.get('[name="email"]').type('not a valid email')
    cy.get('[name="username"]').type('username')
    cy.get('[name="password"]').type('password')
    cy.get('button.success').click()
    cy.contains('Please enter a valid email address.').should(
      'have.class',
      'error',
    )
  })

  it('Should display an error if the email is in use.', () => {
    cy.route({
      method: 'POST',
      url: '**/users/register',
      response: 'fx:sign_up/used_email.json',
      status: 409,
    })

    cy.get('[name="first_name"]').type('first name')
    cy.get('[name="last_name"]').type('last name')
    cy.get('[name="email"]').type('already@being.used')
    cy.get('[name="username"]').type('username')
    cy.get('[name="password"]').type('password')
    cy.get('button.success').click()
    cy.contains('This email is already in use.').should('have.class', 'error')
  })

  it('Should display an error without a username.', () => {
    cy.route({
      method: 'POST',
      url: '**/users/register',
      response: 'fx:sign_up/no_username.json',
      status: 400,
    })

    cy.get('[name="first_name"]').type('first name')
    cy.get('[name="last_name"]').type('last name')
    cy.get('[name="email"]').type('test@test.test')
    cy.get('[name="password"]').type('password')
    cy.get('button.success').click()
    cy.contains('Please enter a username.').should('have.class', 'error')
  })

  it('Should display an error if the username is in use.', () => {
    cy.route({
      method: 'POST',
      url: '**/users/register',
      response: 'fx:sign_up/used_username.json',
      status: 409,
    })

    cy.get('[name="first_name"]').type('first name')
    cy.get('[name="last_name"]').type('last name')
    cy.get('[name="email"]').type('test@test.test')
    cy.get('[name="password"]').type('password')
    cy.get('button.success').click()
    cy.contains('This username is already taken.').should('have.class', 'error')
  })

  it('Should display an error without a password.', () => {
    cy.route({
      method: 'POST',
      url: '**/users/register',
      response: 'fx:sign_up/bad_password.json',
      status: 400,
    })

    cy.get('[name="first_name"]').type('first name')
    cy.get('[name="last_name"]').type('last name')
    cy.get('[name="email"]').type('test@test.test')
    cy.get('[name="username"]').type('username')
    cy.get('button.success').click()
    cy.contains('Your password must be at least 5 characters long.').should(
      'have.class',
      'error',
    )
  })

  it('Should display an error if password is less than 5 characters long.', () => {
    cy.route({
      method: 'POST',
      url: '**/users/register',
      response: 'fx:sign_up/bad_password.json',
      status: 400,
    })

    cy.get('[name="first_name"]').type('first name')
    cy.get('[name="last_name"]').type('last name')
    cy.get('[name="email"]').type('test@test.test')
    cy.get('[name="username"]').type('username')
    cy.get('[name="password"]').type('123')
    cy.get('button.success').click()
    cy.contains('Your password must be at least 5 characters long.').should(
      'have.class',
      'error',
    )
  })

  it('Should successfully register, and log in the user.', () => {
    cy.route({
      method: 'POST',
      url: '**/users/register',
      response: 'fx:sign_up/success.json',
      status: 201,
    })

    cy.get('[name="first_name"]').type('test')
    cy.get('[name="last_name"]').type('user')
    cy.get('[name="email"]').type('test@test.test')
    cy.get('[name="username"]').type('test_user')
    cy.get('[name="password"]').type('test_password')
    cy.get('button.success').click()

    cy.contains('Successfully registered. Welcome, test_user!').should(
      'have.class',
      'success',
    )
    cy.url().should('not.contain', 'sign-up')
    cy.contains('Logout')
  })
})
