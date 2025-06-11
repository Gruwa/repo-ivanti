# FrontEndIvanti
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.14.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Documentation
Project documentation is generated using Compodoc. To generate the documentation, run:

```bash
npm run compodoc
```


Notes

Project include:
On start page you can see 3 menyu links. Second link go to the page with 2 Tabs (odd nad even lists of the users)

project use 2 source of data 1 from the link another one from json file for both requests - users and messages.

3'rd tab  have full list of users with pagination.

first 100 users have their own messages, other users have no messages.

You can find button on the accordion that redirect to the edip page where you can edit user data, 
but without saving i didn't have so much time to implement it. Also you can find on edit page button back to the list of users.
Where you were before.

Project have Compodoc for documentation, pre-push and pre-commit hooks,Also was added shared project with one component in it,
that was used in general project by route. All shared components was placed in the shared library that was created by Angular CLI.

Cards with messages lay in lane by 3 and change amount through the responsive fashion.