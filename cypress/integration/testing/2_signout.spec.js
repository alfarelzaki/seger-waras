describe('Sign out test', () => {
    it('Visits Seger Waras that already logged in', () => {
      cy.visit('https://seger-waras.web.app')
    })

    it('Click button sign out', () => {
        // Tunggu sampai benar-benar dialihkan ke beranda
        cy.wait(2500)

        cy.get('button')
        .contains('Sign out')
        .click({force: true})
    })    
})