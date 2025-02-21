describe('Orange HRM Tests', () => {

  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    buttonClick: '.oxd-button',
    sectionTitleTopBar: '.oxd-text--h6',
    alertFail: '.oxd-alert'
  }

  it('Login - Success', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
// Using right credentials    
    cy.get(selectorsList.usernameField).type('Admin') //correct user
    cy.get(selectorsList.passwordField).type('admin123') //correct password
    cy.get(selectorsList.buttonClick).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index') //checking the website address
    cy.get(selectorsList.sectionTitleTopBar).contains('Dashboard') //checking element on new page
  })

  it('Login - Fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
// Using wrong credentials on username only
    cy.get(selectorsList.usernameField).type('Adimin') //incorrect user
    cy.get(selectorsList.passwordField).type('admin123') //correct password
    cy.get(selectorsList.buttonClick).click()
    cy.get(selectorsList.alertFail) //checking message of fail

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
//using wrong credentials on password only
    cy.get(selectorsList.usernameField).type('Admin') //correct user
    cy.get(selectorsList.passwordField).type('admin223') //incorrect password
    cy.get(selectorsList.buttonClick).click()
    cy.get(selectorsList.alertFail) //checking message of fail
  })  
})