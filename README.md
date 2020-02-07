# NaxlGrid

This project is an in-browser data manager for maintaining personal tabular data.
It has been created as a new project, but shares some code with Naxl-UI.
Naxl is a Personal Database Manager for no-coders. Not Another eXceL.

The aim is to produce a web-based tool that anyone can use to create and manage databases (sets of tables) for their own use.
The target user is someone with a degree of technical skill but no specific programming ability. 
Anyone who can create and edit an Excel spreadsheet should qualify.

The focus is on the ability to store and retrieve personally useful data from a variety of sources in a variety of relevant formats. 
It is not about transactional updates, detailed validation or multi-user access.

The technology used should be state of the art, hence the choice of JavaScript, React, Express, JSON and NoSQL.

## Installation

Simply:
 - Download or clone the repo from GitHub.
 - `npm install` to install dependencies.
 - `npm start` to run the UI project from a local server.
 - optionally `npm test` to run the unit testing. There is a Windows batch file that combines the above.
  - Browse to [http://localhost:30002/](http://localhost:3000/) if it doesn't start automatically.

## Demonstration

The initial browser displays a menu of sample data. It also shows the current locale, obtained from the browser. You may need to configure that.

A dataset is a collection of data tables. You can click the '+' buttons to add a new dataset, a new table, or a new row or field in a table.

You can upload a CSV file to create a new table in a dataset. A sample file called 'member.csv' can be found in the 'test' directory.

The 'vertical ellipsis' button exposes the fields of a table for editing. The table is live.

## Todo

- Store to a data table
- delete things: dataset, table, row, field
- Upload new database tables from XLS or JSON.

## License

TBD
