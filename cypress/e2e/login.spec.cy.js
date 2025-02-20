describe('Orange HRM Tests', () => {
  it('Login - Success', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("[name='username']").type('Admin') //correct user
    cy.get("[name='password']").type('admin123') //correct password
    cy.get('.oxd-button').click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index') //checking the website address
    cy.get('.oxd-text--h6').contains('Dashboard') //checking element on new page
  })

  it.skip('Login - Fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
// Using wrong credentials on username only
    cy.get("[name='username']").type('Adimin') //incorrect user
    cy.get("[name='password']").type('admin123') //correct password
    cy.get('.oxd-button').click()
    cy.get('.oxd-alert') //checking message of fail

//using wrong credentials on password only
    cy.get("[name='username']").type('Admin') //correct user
    cy.get("[name='password']").type('admin223') //incorrect password
    cy.get('.oxd-button').click()
    cy.get('.oxd-alert') //checking message of fail
  })  
})