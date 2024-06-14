describe("Issue create", () => {
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
  const TypingTime = '[placeholder="Number"]';
  const CloseDetailsModal = '[data-testid="icon:close"]';
  const TimeLoggingWatch = '[data-testid="icon:stopwatch"]';

  //String variables:
  const DescriptionText =
    "This issue is created for time tracker testing purposes";
  const TitleText = "Issue for time tracking";

  it("Checking the time estimation", () => {
    //Create new issue and validate it successfully
    cy.get(CreateIssue).within(() => {
      cy.get(IssueDescription).type(DescriptionText);
      cy.get(IssueDescription).should("have.text", DescriptionText);
      cy.get(IssueTitle).type(TitleText).should("have.value", TitleText);
      cy.get(SubmitNewIssue).click();
    });
    cy.get(CreateIssue).should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");
    cy.reload();

    //Checking time estimation functionality
    cy.contains(TitleText).click();
    cy.get(DetailsModal)
      .should("be.visible")
      .within(() => {
        cy.contains("No time logged").should("be.visible");
        cy.get(TypingTime).type(10).type("{enter}").should("have.value", 10);
        cy.get(CloseDetailsModal).click();
      });
    cy.contains(TitleText).click();
    cy.get(DetailsModal)
      .should("be.visible")
      .within(() => {
        cy.get(TypingTime)
          .should("have.value", 10)
          .clear()
          .type(20)
          .type("{enter}")
          .should("have.value", 20);
        cy.get(CloseDetailsModal).click();
      });
    cy.contains(TitleText).click();
    cy.get(DetailsModal)
      .should("be.visible")
      .within(() => {
        cy.get(TypingTime).should("have.value", 20).clear().type("{enter}");
        cy.get(CloseDetailsModal).click();
      });
    cy.contains(TitleText).click();
    cy.get(DetailsModal).should("be.visible");
    cy.get(TypingTime).should("not.have.value");
  });
  /*Checking time logging functionality
  cy.contains(TitleText).click();
  cy.get(TypingTime).type(10).type("{enter}").should("have.value", 10);
  cy.get(TimeLoggingWatch).parent().click();*/
});
