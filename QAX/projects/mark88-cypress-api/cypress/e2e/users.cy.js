describe('POST /users', () => {
  
  it('should register a new user', () => {
    const user = {
      name: "Silvia",
      email: "sil12@hotmail.com",
      password: "123456"
    };

    cy.task('deleteUser', user.email)
      .then(() => {
        cy.postUser(user)
          .then(response => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
          });
      });
  });

  it('should handle duplicated email', () => {
    const user = {
      name: "Sil",
      email: "sil@hotmail.com",
      password: "123456"
    };

    cy.task('deleteUser', user.email)
      .then(() => {
        cy.postUser(user)
          .then(() => {
            cy.postUser(user)
              .then(response => {
                expect(response.status).to.eq(409);
                expect(response.body.message).to.eq("Duplicated email!");
              });
          });
      });
  });

  context('required fields', () => {
    let user;

    beforeEach(() => {
      user = {
        name: "silvia",
        email: "papito@yahoo.com",
        password: "123456"
      };
    });

    it('should require name', () => {
      delete user.name;

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400);
        });
    });

    it('should require email', () => {
      delete user.email;

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400);
        });
    });

    it('should require password', () => {
      delete user.password;

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400);
        });
    });
  });
});