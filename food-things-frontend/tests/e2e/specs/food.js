describe('Food', () => {
  describe('Create', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/food/create')
    })

    it('Should render 6 fields and a button.', () => {
      cy.get('[name="name"]')
      cy.get('[name="description"]')
      cy.get('[name="calories"]')
      cy.get('[name="carbs"]')
      cy.get('[name="protein"]')
      cy.get('[name="fat"]')
      cy.get('button.success')
    })

    it('Should display an error with no name.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/no_name.json',
        status: 400,
      })

      cy.get('[name="description"]').type('carrots are carrots')
      cy.get('[name="calories"]').type('50')
      cy.get('[name="carbs"]').type('30')
      cy.get('[name="protein"]').type('2')
      cy.get('[name="fat"]').type('1')
      cy.get('button.success').click()
      cy.contains('Please enter the name of the food.').should(
        'have.class',
        'error',
      )
    })

    it('Should display an error with no description.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/no_description.json',
        status: 400,
      })

      cy.get('[name="name"]').type('carrots')
      cy.get('[name="calories"]').type('50')
      cy.get('[name="carbs"]').type('30')
      cy.get('[name="protein"]').type('2')
      cy.get('[name="fat"]').type('1')
      cy.get('button.success').click()
      cy.contains('Please enter a description of the food.').should(
        'have.class',
        'error',
      )
    })

    it('Should display an error with no calories.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/no_calories.json',
        status: 400,
      })

      cy.get('[name="name"]').type('carrots')
      cy.get('[name="description"]').type('carrots are carrots')
      cy.get('[name="carbs"]').type('30')
      cy.get('[name="protein"]').type('2')
      cy.get('[name="fat"]').type('1')
      cy.get('button.success').click()
      cy.contains('The number of calories must be a number.').should(
        'have.class',
        'error',
      )
      cy.contains('Calories must be above 0.').should('have.class', 'error')
    })

    it('Should display an error with zero calories.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/zero_calories.json',
        status: 400,
      })

      cy.get('[name="name"]').type('carrots')
      cy.get('[name="description"]').type('carrots are carrots')
      cy.get('[name="carbs"]').type('30')
      cy.get('[name="calories"]').type('0')
      cy.get('[name="protein"]').type('2')
      cy.get('[name="fat"]').type('1')
      cy.get('button.success').click()
      cy.contains('Calories must be above 0.').should('have.class', 'error')
    })

    it('Should display an error with no carbs.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/no_carbs.json',
        status: 400,
      })

      cy.get('[name="name"]').type('carrots')
      cy.get('[name="description"]').type('carrots are carrots')
      cy.get('[name="calories"]').type('30')
      cy.get('[name="protein"]').type('2')
      cy.get('[name="fat"]').type('1')
      cy.get('button.success').click()
      cy.contains('The amount of carbs must be a number.').should(
        'have.class',
        'error',
      )
      cy.contains('Carbs must be above 0.').should('have.class', 'error')
    })

    it('Should display an error with zero carbs.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/zero_carbs.json',
        status: 400,
      })

      cy.get('[name="name"]').type('carrots')
      cy.get('[name="description"]').type('carrots are carrots')
      cy.get('[name="calories"]').type('30')
      cy.get('[name="carbs"]').type('0')
      cy.get('[name="protein"]').type('2')
      cy.get('[name="fat"]').type('1')
      cy.get('button.success').click()
      cy.contains('Carbs must be above 0.').should('have.class', 'error')
    })

    it('Should display an error with no protein.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/no_protein.json',
        status: 400,
      })

      cy.get('[name="name"]').type('carrots')
      cy.get('[name="description"]').type('carrots are carrots')
      cy.get('[name="calories"]').type('30')
      cy.get('[name="carbs"]').type('2')
      cy.get('[name="fat"]').type('1')
      cy.get('button.success').click()
      cy.contains('The amount of protein must be a number.').should(
        'have.class',
        'error',
      )
      cy.contains('Protein must be above 0.').should('have.class', 'error')
    })

    it('Should display an error with zero protein.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/zero_protein.json',
        status: 400,
      })

      cy.get('[name="name"]').type('carrots')
      cy.get('[name="description"]').type('carrots are carrots')
      cy.get('[name="calories"]').type('30')
      cy.get('[name="carbs"]').type('5')
      cy.get('[name="protein"]').type('0')
      cy.get('[name="fat"]').type('1')
      cy.get('button.success').click()
      cy.contains('Protein must be above 0.').should('have.class', 'error')
    })

    it('Should display an error with no fat.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/no_fat.json',
        status: 400,
      })

      cy.get('[name="name"]').type('carrots')
      cy.get('[name="description"]').type('carrots are carrots')
      cy.get('[name="calories"]').type('30')
      cy.get('[name="protein"]').type('2')
      cy.get('[name="carbs"]').type('1')
      cy.get('button.success').click()
      cy.contains('The amount of fat must be a number.').should(
        'have.class',
        'error',
      )
      cy.contains('Fat must be above 0.').should('have.class', 'error')
    })

    it('Should display an error with zero fat.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/zero_fat.json',
        status: 400,
      })

      cy.get('[name="name"]').type('carrots')
      cy.get('[name="description"]').type('carrots are carrots')
      cy.get('[name="calories"]').type('30')
      cy.get('[name="carbs"]').type('10')
      cy.get('[name="protein"]').type('2')
      cy.get('[name="fat"]').type('0')
      cy.get('button.success').click()
      cy.contains('Fat must be above 0.').should('have.class', 'error')
    })

    it('Should display an alert on successful creation.', () => {
      cy.route({
        method: 'POST',
        url: '**/food/create',
        response: 'fx:food/create/success.json',
        status: 201,
      })

      cy.get('[name="name"]').type('Carrots')
      cy.get('[name="description"]').type('carrots are carrots')
      cy.get('[name="calories"]').type('50')
      cy.get('[name="carbs"]').type('25')
      cy.get('[name="protein"]').type('12')
      cy.get('[name="fat"]').type('6')
      cy.get('button.success').click()
      cy.contains('Carrots successfully created!').should(
        'have.class',
        'success',
      )
    })
  })
})
