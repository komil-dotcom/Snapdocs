// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add("navigateTo", (page) => {
  cy.contains("#main-nav a", page).click();
});

Cypress.Commands.add("searchNotaryAgentsIn", (location) => {
  cy.get("#autocomplete").type(`${location}{enter}`);
});

Cypress.Commands.add("login", (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.request({
        method: "POST",
        url: "/login",
        body: { username, password },
      }).then(({ body }) => {
        window.localStorage.setItem("authToken", body.token);
      });
    },
    {
      validate() {
        cy.request("/whoami").its("status").should("eq", 200);
      },
    }
  );
});
