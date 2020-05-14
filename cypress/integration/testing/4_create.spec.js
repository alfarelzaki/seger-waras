let item = 0;

describe('Create test', () => {
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
        // Mengecek banyak data sebelum penambahan
        cy.get('ul.ant-list-items').find('li.ant-list-item').then(($item) => {
            item = $item.length
        })
    })

    it('Click create', () => {
        // klik tombol create articles
        cy.get('a > .ant-btn')
        .click({force: true})

        cy.wait(2500)
        cy.url().should('eq', 'https://seger-waras.web.app/createPost')
    })

    it('Input title', () => {
        // Mengisi kolom title
        cy.get('#nest-messages_title')
        .type('How to Make Your Own Hand Sanitizer')
        .should('have.value', 'How to Make Your Own Hand Sanitizer')
    })

    it('Input imageUrl', () => {
        // Mengisi kolom title
        cy.get('#nest-messages_imageUrl')
        .type('https://post.healthline.com/wp-content/uploads/2020/03/Sanitizer_Pump_Hands-1296x728-Header.jpg')
        .should('have.value', 'https://post.healthline.com/wp-content/uploads/2020/03/Sanitizer_Pump_Hands-1296x728-Header.jpg')
    })

    it('Input content', () => {
        // Mengisi kolom title
        cy.get('#nest-messages_content')
        .type('When it comes to preventing the spread of infectious diseases like COVID-19, nothing beats good old-fashioned handwashing.\nBut if water and soap aren’t available, your next best option, according to the Centers for Disease Control and Prevention (CDC)Trusted Source, is to use an alcohol-based hand sanitizer that contains at least 60 percent alcohol.')
        .should('have.value', 'When it comes to preventing the spread of infectious diseases like COVID-19, nothing beats good old-fashioned handwashing.\nBut if water and soap aren’t available, your next best option, according to the Centers for Disease Control and Prevention (CDC)Trusted Source, is to use an alcohol-based hand sanitizer that contains at least 60 percent alcohol.')
    })

    it('Click submit', () => {
        // klik tombol submit articles
        cy.get('.ant-form-item-control-input-content > .ant-btn')
        .click({force: true})

        cy.wait(2500)
        cy.url().should('eq', 'https://seger-waras.web.app/readPost')
    })

    it('Check item', () => {
        // mengecek apakah item sudah ditambahkan atau belum
        cy.get('ul.ant-list-items').find('li.ant-list-item').then(($item) => {
            const itemNow = $item.length
            expect(itemNow).to.eq(item + 1)
        })
    })
})