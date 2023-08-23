describe("Verifying Elements/item on Notary Signing Agents page", () => {
  beforeEach("Open Snapdocs Landing Page", () => {
    cy.visit("/");
    cy.navigateTo("Notary Signing Agents");
  });

  it("Verify the Notary Search Bar is visible and have attribute type=text", () => {
    cy.get("#autocomplete")
      .should("be.visible")
      .and("have.attr", "placeholder", "Address, city & state, or zip");
  });

  it("Verify the Suggested Locations Table has the correct cities", () => {
    cy.get("table.suggested-locations tbody td").each((city, i) => {
      let cities = [
        "New York, NY",
        "Los Angeles, CA",
        "Chicago, IL",
        "Phoenix, AZ",
        "Philadelphia, PA",
        "Houston, TX",
      ];
      cy.wrap(city).should("contain", cities[i]);
    });
  });

  it("Should search for a notary by zip code and verify a list of notaries and their information is returned", () => {
    cy.searchNotaryAgentsIn("11204");
    cy.url().should("contain", "11204");
    cy.get('[name="address"]').should("have.value", "11204");
    cy.get("table tbody tr").then((notaryAgentList) => {
      expect(notaryAgentList).length.greaterThan(0);
      expect(notaryAgentList).to.have.class("notary-info");
    });
  });
  it("Verify the contents of a notary panel", () => {
    cy.searchNotaryAgentsIn("11204");
    cy.contains("Alicia Carter").click();
    cy.get('[itemprop="name"]').should("have.text", "Alicia Carter");
    cy.contains("Snapdocs Verified").should(
      "have.css",
      "background-color",
      "rgb(92, 184, 92)"
    );
    cy.get('[placeholder="Your Email"]').should(
      "have.attr",
      "required",
      "required"
    );
    cy.get('[class="info-value"]').should(
      "contain",
      "ID, Commission, E&O Insurance, Background Check Report"
    );
  });
});
