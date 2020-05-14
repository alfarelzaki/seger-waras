let titleBefore;
let contentBefore;
let edited = '(Edited)'

describe('Update test', () => {
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

    it('Get unupdated articles', () => {
        cy.get(':nth-child(1) > .ant-list-item-main > .ant-list-item-meta > .ant-list-item-meta-content > .ant-list-item-meta-title')
        .invoke('text')
        .then((text) => {
            titleBefore = text
            console.log(titleBefore)
        })

        cy.get(':nth-child(1) > .ant-list-item-main')
        .invoke('text')
        .then((text) => {
            contentBefore = text.substring(titleBefore.length, text.length)
            console.log(contentBefore)
        })
    })

    it('Click edit', () => {
        // klik tombol my articles
        cy.get(':nth-child(1) > .ant-list-item-main > .ant-list-item-action > :nth-child(1) > div')
        .click({force: true})
    })

    it('Update title', () => {
        // Mengisi kolom title
        cy.wait(2000)

        cy.get('#title')
        .type(edited)
        .should('have.value', titleBefore + edited)
    })

    it('Update content', () => {
        // Mengisi kolom content
        cy.wait(2000)

        cy.get('#content')
        .type(edited)
        .should('have.value', contentBefore + edited)
    })

    it('Click submit', () => {
        // klik tombol submit articles
        cy.get('button')
        .contains('Submit')
        .click({force: true})
    })

    it('Check updated articles', () => {
        // mengecek konten apakah sudah terupdate atau belum
        cy.wait(2500)
        cy.url().should('eq', 'https://seger-waras.web.app/readPost')

        cy.get(':nth-child(1) > .ant-list-item-main > .ant-list-item-meta > .ant-list-item-meta-content > .ant-list-item-meta-title')
        .invoke('text')
        .should((text) => {
            expect(text).to.eq(titleBefore + edited)
        })

        cy.get(':nth-child(1) > .ant-list-item-main')
        .invoke('text')
        .should((text) => {
            text = text.substring(titleBefore.length + edited.length, text.length)
            expect(text).to.eq(contentBefore + edited)
        })
    })
})