describe("API_Automation Assessment", () => {
  //🔹 1. POST /api/login
  it("Valid login (use provided demo credentials)", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      expect(response.body.token).to.eq("QpwL5tke4Pnpja7X4");
    });
  });
  it("Invalid login - missing password", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      failOnStatusCode: false,
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      body: {
        email: "peter@klaven",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error", "Missing password");
    });
  });

  //🔹 2. GET /api/users?page=2
  it("Confirm status code and behavior (what’s returned?)", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      // Basic status check
      expect(response.status).to.eq(200);

      // Top-level fields
      expect(response.body.page).to.eq(2);
      expect(response.body.per_page).to.eq(6);
      expect(response.body.total).to.eq(12);
      expect(response.body.total_pages).to.eq(2);

      // Assert array length
      expect(response.body.data).to.have.length(6);

      // Assert first user details
      expect(response.body.data[0]).to.have.property("id", 7);
      expect(response.body.data[0]).to.have.property(
        "email",
        "michael.lawson@reqres.in"
      );
      expect(response.body.data[0]).to.have.property("first_name", "Michael");
      expect(response.body.data[0]).to.have.property("last_name", "Lawson");

      // Assert support section
      expect(response.body.support)
        .to.have.property("url")
        .and.include("reqres");
      expect(response.body.support.text).to.include("Content Caddy");
    });
  });
  it("Validate data fields (e.g., email format, avatar URLs)", () => {
    cy.request("https://reqres.in/api/users?page=2").then((response) => {
      expect(response.status).to.eq(200);
      const users = response.body.data;
      users.forEach((user) => {
        // Validate required fields are present
        expect(user).to.have.all.keys(
          "id",
          "email",
          "first_name",
          "last_name",
          "avatar"
        );

        // ✅ Validate email format (basic)
        expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

        // ✅ Validate domain is reqres.in
        expect(user.email).to.include("@reqres.in");

        // ✅ Validate avatar URL is a valid JPG image link
        expect(user.avatar).to.match(/^https:\/\/.*\.jpg$/);

        // Optional: check avatar contains user id (good to catch wrong links)
        expect(user.avatar).to.include(user.id);
      });
    });
  });

  //🔹 3. DELETE /api/users/2
  it("Confirm status code and behavior (what’s returned?)", () => {
    cy.request({
      method: "DELETE",
      url: "https://reqres.in/api/users/2",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      // Assert HTTP 204 No Content
      expect(response.status).to.eq(204);

      // Assert response body is empty
      expect(response.body).to.be.empty;
    });
  });
  it("Add an edge case: delete an already deleted or non-existent user", () => {
    cy.request({
      method: "DELETE",
      url: "https://reqres.in/api/users/999", //Delete non-existent user (ID: 999)
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      // Assert HTTP 204 No Content
      expect(response.status).to.eq(204);

      // Assert response body is empty
      expect(response.body).to.be.empty;
    });
  });

  //Add at least one custom helper function or utility for reusability
  it("Deletes existing user with ID 2", () => {
    cy.deleteUserAndAssert(2);
  });
  it("Deletes non-existent user with ID 999", () => {
    cy.deleteUserAndAssert(999);
  });
});
