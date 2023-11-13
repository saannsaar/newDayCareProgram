
describe('template spec', () => {
	beforeEach(function() {

		cy.visit('http://localhost:3000/')
		cy.contains('Kirjaudu sisään')
		cy.get('form').find('input').first().type('sannin.sahkoposti@email.com')
		cy.get('form').find('input').last().type('Salasanani1')
		cy.get('form').find('button').first().click()

	})


	it('homepage opens on parent account', () => {
		cy.contains('Ilmoitukset')
		cy.contains('Sää tänään')
		cy.contains('2023')
		cy.contains('Lapsi Vepsalainen').click()
		cy.contains('Valitse lapsi')

	})
  
	it('can open message page on parent account', () => {
		cy.contains('Viestit').click()
		cy.wait(2000)      
		cy.contains('Kirjoita viesti')
	})

	it('can open own info page on parent account', () => {
		cy.contains('Oma perhe').click()
		cy.wait(2000)      
		cy.contains('Omat tiedot').click()
	})

	it('can open caretimes page on parent account', () => {
		cy.contains('Hoitoajat').click()
		cy.wait(2000)      
		cy.contains('15:00').click()
		cy.contains('Tallenna muutokset').click()
	})

	it('can logout', () => {
		cy.contains('Kirjaudu ulos').click()
		cy.contains('Kirjaudu sisään')
	})
  
})