import userData from '../fixtures/userData.json'

describe('Orange HRM Tests', () => {

  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    buttonClick: '.oxd-button',
    dashboardGrid: '.orangehrm-dashboard-grid',
    alertFail: '.oxd-alert',
    myInfoSidebar: "[href='/web/index.php/pim/viewMyDetails']",
    firstNameField: "[name='firstName']",
    middleNameField: "[name='middleName']",
    lastNameField:"[name='lastName']",
    genericEmployeeIdField:".oxd-input--active",//position 3
    genericOtherIdField:".oxd-input--active",//position 4
    genericDriverLicenseNumberField:".oxd-input--active",//position 5
    genericLicenseExpireDateField:"[placeholder='yyyy-dd-mm']",//position 0
    dateCloseButton:".--close",
    saveButton:"[type='submit']",
    saveSuccessfully:".oxd-toast"


  }

  it.only('Login - User Info Update', () => {
    cy.visit('/auth/login')
// Using right credentials    
    cy.get(selectorsList.usernameField).type(userData.loginSuccess.username) //correct user
    cy.get(selectorsList.passwordField).type(userData.loginSuccess.password) //correct password
    cy.get(selectorsList.buttonClick).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index') //checking the website address
    cy.get(selectorsList.dashboardGrid) //checking element on new page
    cy.get(selectorsList.myInfoSidebar).click()
    cy.get(selectorsList.firstNameField).clear().type('Bruno')
    cy.get(selectorsList.middleNameField).clear().type('Lucio')
    cy.get(selectorsList.lastNameField).clear().type('Chagas')
    cy.get(selectorsList.genericEmployeeIdField).eq(3).clear().type('EMP01')
    cy.get(selectorsList.genericOtherIdField).eq(4).clear().type('OTH01')
    cy.get(selectorsList.genericDriverLicenseNumberField).eq(5).clear().type('DRLI01')
    cy.get(selectorsList.genericLicenseExpireDateField).eq(0).click().clear().type('2030-06-12')
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.saveButton).eq(1).click()
    cy.get(selectorsList.saveSuccessfully)

    // cy.get(selectorsList.genericNationalityField).eq(0).click().type('b')
  })

//Thursday, 26-Jan-2034

  it('Login - Fail', () => {
    cy.visit('/auth/login')
// Using wrong credentials on username only
    cy.get(selectorsList.usernameField).type(userData.loginFail.username) //incorrect user
    cy.get(selectorsList.passwordField).type(userData.loginSuccess.password) //correct password
    cy.get(selectorsList.buttonClick).click()
    cy.get(selectorsList.alertFail) //checking message of fail

    cy.visit('/auth/login')
//using wrong credentials on password only
    cy.get(selectorsList.usernameField).type(userData.loginSuccess.username) //correct user
    cy.get(selectorsList.passwordField).type(userData.loginFail.password) //incorrect password
    cy.get(selectorsList.buttonClick).click()
    cy.get(selectorsList.alertFail) //checking message of fail
  })  
})