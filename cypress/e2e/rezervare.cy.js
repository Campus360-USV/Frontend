describe('Campus360 – login student', () => {
  it('studentul se poate autentifica', () => {
    // 1. Deschide aplicația
    cy.visit('/')

    // 2. Completează datele de login
    cy.get('input[type="email"]').type('student@usv.ro')
    cy.get('input[type="password"]').type('student123')

    // 3. Apasă butonul de autentificare
        cy.contains('button', /autentific|conect|intr|login|sign in/i).click()

        // 4. Verifică: login reușit → pagina Laboratoare, fără meniul de admin
    cy.url().should('include', '/laboratoare')
    cy.contains(/administrare/i).should('not.exist')
  })
})