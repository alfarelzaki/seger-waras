let email = 'example2@email.com'
let password = '123456'

describe('Register test', () => {
    it('Visits Seger Waras', () => {
      cy.visit('https://seger-waras.web.app')
    })
  
    it('Click tombol ke Register', () => {
      // Klik tombol register untuk ke form daftar
      cy.get('a')
      .contains('register now!')
      .click()
    })
  
    it('Input email', () => {
        // Tunggu sampai benar-benar dialihkan
        cy.wait(2500)
  
        // Mengisi kolom email
        cy.get('input[name="email"]')
        .type(email)
        .should('have.value', email)
    })
  
    it('Input password', () => {
        // Mengisi kolom password
        cy.get('input[name="password"]')
        .type(password)
        .should('have.value', password)
    })
  
    it('Click Register', () => {
        // Klik tombol register untuk masuk
        cy.get('.login-form-button')
        .click()
  
        // Tunggu sampai benar-benar dialihkan ke beranda
        cy.wait(2500)
        cy.url().should('eq', 'https://seger-waras.web.app/')
    })
    
  })