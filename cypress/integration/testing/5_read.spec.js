describe('Read test', () => {
    it('Visits Seger Waras', () => {
        // pastikan url benar
        cy.visit('https://seger-waras.web.app')
        cy.wait(2500)
        cy.url().should('eq', 'https://seger-waras.web.app/')
    })

    it('Click my articles', () => {
        // klik tombol my articles
        cy.get('button')
        .contains('My Articles')
        .click({force: true})

        cy.wait(2500)
        cy.url().should('eq', 'https://seger-waras.web.app/readPost')
    })
})