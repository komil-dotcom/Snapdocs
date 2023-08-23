const viewports = ["iphone-6", "ipad-2", [1024, 768]];
describe("Verifying Elements on Landing Page", () => {
  before(() => {
    cy.fixture("dashboardTabs").as("tabs");
  });
  beforeEach("Open Snapdocs Landing Page", () => {
    cy.visit("/");
  });
  viewports.forEach((size) => {
    it(`Snapdocs Logo should be visible and be a link to home page in ${size} viewport`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get("#site-logo").then((logo) => {
        cy.wrap(logo)
          .find("a")
          .invoke("attr", "href")
          .should("equal", "https://snapdocs.com");
        cy.wrap(logo)
          .find("img")
          .should(
            "have.attr",
            "src",
            "https://12h9ep29ycsl2dboql29k7wd-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/logo.png"
          );
      });
    });
    it(`'Request a demo' button is visible and is the correct href in ${size} viewport`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.contains("a", "Request a demo")
        .should("be.visible")
        .and("have.attr", "href", "https://www.snapdocs.com/more-info");
    });
  });

  it("The Navigation Bar's tabs should have the correct name and href to the corressponding webpages", () => {
    cy.get("#main-nav")
      .find("li")
      .each((tab, i) => {
        cy.get("@tabs").then((tabs) => {
          cy.wrap(tab)
            .should("contain", tabs.name[i])
            .find("a")
            .invoke("attr", "href")
            .should("contain", tabs.href[i]);
        });
      });
  });
});
