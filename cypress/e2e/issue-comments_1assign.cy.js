describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const DetailsModal = '[data-testid="modal:issue-details"]';
  const CommentIssue = '[data-testid="issue-comment"]';
  const TextAreaComment = 'textarea[placeholder="Add a comment..."]';

  const getIssueDetailsModal = () => cy.get(DetailsModal);
  const getCommentIssue = () => cy.get(CommentIssue);
  const comment = "TEST_COMMENT";

  const commentEdited = "TEST_COMMENT_EDITED";

  it("Should create, add and delete a comment successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get(TextAreaComment).type(comment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.contains("Add a comment...").should("exist");
      getCommentIssue().should("contain", comment).should("be.visible");

      getCommentIssue().first().contains("Edit").click();
      cy.get(TextAreaComment)
        .should("contain", comment)
        .clear()
        .type(commentEdited);
      cy.contains("button", "Save").click().should("not.exist");
      getCommentIssue().should("contain", commentEdited);

      getCommentIssue().first().contains("Delete").click();
    });
    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    getIssueDetailsModal().should("not.contain", commentEdited);
  });
});
