// Alege o zi lucrătoare din viitor și o oră aleatoare,
// ca testul să poată fi rulat de mai multe ori fără suprapuneri (409).
function ziLucratoareAleatoare() {
  const d = new Date()
  d.setDate(d.getDate() + 30 + Math.floor(Math.random() * 200))
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10) // format YYYY-MM-DD
}

describe('Campus360 – teste E2E student', () => {
  beforeEach(() => {
    // Login înainte de fiecare test
    cy.visit('/')
    cy.get('input[type="email"]').type('student@usv.ro')
    cy.get('input[type="password"]').type('student123')
    cy.contains('button', /autentific|conect|intr|login|sign in/i).click()
    cy.url().should('include', '/laboratoare')
  })

  it('studentul se poate autentifica', () => {
    cy.contains(/administrare/i).should('not.exist')
    cy.contains('Rezervările mele').should('be.visible')
  })

  it('studentul creează o rezervare validă', () => {
    const data = ziLucratoareAleatoare()
    const ora = 8 + Math.floor(Math.random() * 9)            // între 08 și 16
    const start = String(ora).padStart(2, '0') + ':00'
    const sfarsit = String(ora + 1).padStart(2, '0') + ':00'
    const scop = 'Test Cypress ' + Date.now()

    // Urmărim cererea trimisă la backend
        cy.intercept('POST', '**/api/rezervari*').as('creareRezervare')

    // 1. Navighează la formular
    cy.contains('Rezervările mele').click()
    cy.contains('Rezervare nouă').click()

    // 2. Completează formularul
    cy.get('select').first().select(1)                        // primul laborator din listă
    cy.get('input[type="date"]').clear().type(data)
    cy.get('input[type="number"]').type('{selectall}5')
    cy.get('input[type="time"]').eq(0).clear().type(start)
    cy.get('input[type="time"]').eq(1).clear().type(sfarsit)
    cy.get('textarea').type(scop)
    cy.get('input[type="checkbox"]').check()

    // 3. Trimite
    cy.contains('button', 'Trimite spre aprobare').click()

    // 4. Verifică răspunsul backend-ului: 201 Created
    cy.wait('@creareRezervare').its('response.statusCode').should('eq', 201)

    // 5. Verifică în „Rezervările mele” că rezervarea apare, în așteptare
    cy.contains('Rezervările mele').click()
    cy.contains(scop).should('be.visible')
    cy.contains('în așteptare').should('be.visible')
  })
})