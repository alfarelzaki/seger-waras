let item;

describe('Delete test', () => {
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

    it('Check amount of article', () => {
        // Mengecek banyak data sebelum menghapus
        cy.get('ul.ant-list-items').find('li.ant-list-item').then(($item) => {
            item = $item.length
        })
    })

    it('Click delete', () => {
        // klik tombol delete articles
        cy.get(':nth-child(1) > .ant-list-item-main > .ant-list-item-action > :nth-child(2) > div > .anticon > svg')
        .click({force: true})
    })

    it('Check item', () => {
        // mengecek apakah item sudah didelete atau belum
        cy.get('ul.ant-list-items').find('li.ant-list-item').then(($item) => {
            const itemNow = $item.length
            expect(itemNow).to.eq(item - 1)
        })
    })
})