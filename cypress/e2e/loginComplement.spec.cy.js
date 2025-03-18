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
    genericLicenseExpireDateField:"cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input')",//position 0
    genericNationalityField:".oxd-select-text-input",//position 0
    maritalStatusField:"",
    bithDateField:"",
    genderChoice:"",


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
    cy.get(selectorsList.genericLicenseExpireDateField).clear().type('2035-06-06')
    // cy.get(selectorsList.genericNationalityField).eq(0).click().type('b')
  })

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