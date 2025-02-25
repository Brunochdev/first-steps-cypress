import userData from '../fixtures/userData.json'

describe('Orange HRM Tests', () => {

  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    buttonClick: '.oxd-button',
    dashboardGrid: '.orangehrm-dashboard-grid',
    alertFail: '.oxd-alert'
  }

  const userData = {
    loginSuccess:{
      username:'Admin',
      password:'admin123'
    },
    loginFail: {
      username:'Test',
      password:'Test'
    }
  }

  it('Login - Success', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
// Using right credentials    
    cy.get(selectorsList.usernameField).type(userData.loginSuccess.username) //correct user
    cy.get(selectorsList.passwordField).type(userData.loginSuccess.password) //correct password
    cy.get(selectorsList.buttonClick).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index') //checking the website address
    cy.get(selectorsList.dashboardGrid) //checking element on new page
  })

  it('Login - Fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
// Using wrong credentials on username only
    cy.get(selectorsList.usernameField).type(userData.loginFail.username) //incorrect user
    cy.get(selectorsList.passwordField).type(userData.loginSuccess.password) //correct password
    cy.get(selectorsList.buttonClick).click()
    cy.get(selectorsList.alertFail) //checking message of fail

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
//using wrong credentials on password only
    cy.get(selectorsList.usernameField).type(userData.loginSuccess.username) //correct user
    cy.get(selectorsList.passwordField).type(userData.loginFail.password) //incorrect password
    cy.get(selectorsList.buttonClick).click()
    cy.get(selectorsList.alertFail) //checking message of fail
  })  
})