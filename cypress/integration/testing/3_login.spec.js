let email = 'example2@email.com'
let password = '123456'

describe('Login test', () => {
    it('Visits Seger Waras', () => {
      cy.visit('https://seger-waras.web.app')
    })

    it('Input email', () => {
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

    it('Click Login', () => {
        // Klik tombol login, dan seharusnya halaman berpindah menjadi /home
        cy.get('.login-form-button')
        .click()

        // Tunggu sampai benar-benar dialihkan ke beranda
        cy.wait(2500)
        cy.url().should('eq', 'https://seger-waras.web.app/')
    })
    
})