describe("Issue details editing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Delete the issue and assert it", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="icon:trash"]').click();
    });
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.get("button").contains("Delete issue").click();
    });
    cy.reload();
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.contains("This is an issue of type: Task.").should("not.exist");
  });

  it("Issue Deletion Cancellation", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="icon:trash"]').click();
    });
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.get("button").contains("Cancel").click();
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="modal:issue-details"]').should("be.visible");
    cy.get('[data-testid="icon:close"]').eq(0).click();
    cy.get('[data-testid="board-list:backlog"]')
      .contains("This is an issue of type: Task.")
      .should("be.visible");
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
});
