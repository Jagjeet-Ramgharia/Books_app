import React from "react";
import Card from "./Card";

describe("<Card />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Card
        author="DejaVu"
        description="This is a Desc..."
        genre="classics"
        handleOnClick={() => console.log("Clicked")}
        id={1}
        image="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        reviews={[]}
        setShowReviews={() => {}}
        showReviews={false}
        title={"This is title"}
        btnText="Button"
        isLoading="false"
        key={123}
      />
    );

    cy.intercept("POST", "http://127.0.0.1:3001/api/v1/add-books", {
      statusCode: 200,
      body: {
        message: "Book added successfully",
      },
    }).as("addToFavourite");

    cy.getBySel("image_container").should(
      "have.attr",
      "src",
      "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    );

    cy.getBySel("title").should("have.text", "This is title");

    cy.getBySel("desc").should("have.text", "This is a Desc...");

    cy.getBySel("button").should("have.text", "Button").click();
    // cy.wait("@addToFavourite").then((interception) => {
    //   expect(interception.response.statusCode).to.eq(200)
    //   expect(interception.response.body.message).to.eq("Book added successfully")
    // })
  });
});
