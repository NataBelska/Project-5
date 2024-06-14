describe("Issue time tracking", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  //Selectors:
  const CreateIssue = '[data-testid="modal:issue-create"]';
  const IssueDescription = ".ql-editor";
  const IssueTitle = 'input[name="title"]';
  const SubmitNewIssue = 'button[type="submit"]';
  const DetailsModal = '[data-testid="modal:issue-details"]';

  //String variables:
  const DescriptionText =
    "This issue is created for time tracker testing purposes";
  const TitleText = "Issue for time tracking";

  it("Should create an issue and validate it successfully", () => {
    cy.get(CreateIssue).within(() => {
      cy.get(IssueDescription).type(DescriptionText);
      cy.get(IssueDescription).should("have.text", DescriptionText);
      cy.get(IssueTitle).type(TitleText).should("have.value", TitleText);
      cy.get(SubmitNewIssue).click();
    });

    cy.get(CreateIssue).should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");
    cy.reload();

    cy.contains(TitleText).click();
    cy.get(DetailsModal).should("be.visible");
  });
});
