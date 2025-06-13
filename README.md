# ✅ Cypress API Test Cases – Reqres API

This repository contains Cypress-based API test cases for [Reqres.in](https://reqres.in), a demo REST API used for learning and testing.

---

### 📁 Project Structure

```

📁 cypress/
└── e2e/
└── apiTests.cy.js          # API test cases (GET, POST, DELETE, etc.)
📁 cypress/support/
└── commands.js                # Custom Cypress command (e.g., deleteUserAndAssert)
cypress.config.js               # Cypress configuration
package.json                    # Project dependencies + test script
README.md                       # This file

````

---

### ⚙️ Setup Instructions

1. **Install [Node.js](https://nodejs.org/en) (v14 or above)**  
   Make sure Node.js and npm are available in your terminal.

2. **Clone the repository:**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
````

3. **Install Cypress:**

```bash
npm install
```

4. **Run Cypress Test Runner:**

```bash
npx cypress open
```

> Then select `apiTests.cy.js` from the test runner to execute the test cases.

---

### 🧪 Included Test Scenarios

* ✅ Login with valid credentials
* ✅ Login with missing password (expect 400)
* ✅ List users and validate response data
* ✅ Delete existing user (204 No Content)
* ✅ Delete non-existent user (still 204, mock behavior)

---

### 🛠️ Custom Cypress Command

Defined in `cypress/support/commands.js`:

```js
Cypress.Commands.add('deleteUserAndAssert', (userId, expectedStatus = 204) => {
  cy.request({
    method: 'DELETE',
    url: `https://reqres.in/api/users/${userId}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(expectedStatus);
    expect(response.body).to.be.empty;
  });
});
```

✅ **Usage example:**

```js
cy.deleteUserAndAssert(2); // deletes user with ID 2
```

---

### 📌 Notes

* These tests are built for **learning/demo purposes** using a public mock API.
* No real data is affected. You can safely run the tests multiple times.


