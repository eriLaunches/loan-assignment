# Loan Assignment ⚖️

Javascript program that assigns each loan to a facility while adhering to each facility's covenants. <br/>
Program currently outputs two files: `assignments.csv` and `yields.csv`, which can be found within the `output` folder.

## 🌱 Prerequisites

This project requires NodeJS (version 12) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v12.22.1
```

## 🚀 Usage

1.  Clone this repo
2.  Run `npm install` in the terminal to install dependencies
3.  Run `npm run start` in the terminal

```sh
$ npm run start
🥳  The CSV file was written successfully to './output/assignments.csv'
🥳  The CSV file was written successfully to './output/yields.csv'
```

Navigate to `./output` folder to see `assignments.csv` & `yields.csv`.


## ✍️ Write-up ⬇

  <details><summary>Click to open Write-up</summary>

1.  **How long did you spend working on the problem? What did you find to be the most difficult part?**<br/>
    4 hours. The most difficult part was ensuring that the code reasonably captured the business requirements. To ensure that some of the assumptions I had about the data was accurate, I ran calculations via an excel spreadsheet to confirm my understanding of the restrictions against the expected output. Examples of assumptions include:
    * A facility has at most one max_default_likelihood.
    * Rounding of expected_yield was done to the final output on a facility level

    <br/>


2.  **How would you modify your data model or code to account for an eventual introduction of new, as-of-yet unknown types of covenants, beyond just maximum default likelihood and state restrictions?**<br/>
    Currently, the check for restrictions is contained within the `allocateLoans()` method. To account for an eventual introduction of new ones, I would create a separate method (i.e `passedRestrictions()`) that returns a boolean (true or false) representing whether or not ALL the restrictions are satisfied. Any new restrictions will be added to that method. I would refactor `allocateLoans()` to call `passedRestrictions()` for assignation. <br/>

    I would also modify the `joinFC()` method (joining of facilitites and covenant data) to add any additional fields needed based on the new restrictions.


3.  **How would you architect your solution as a production service wherein new facilities can be introduced at arbitrary points in time. Assume these facilities become available by the finance team emailing your team and describing the addition with a new set of CSVs.**<br/>
    I would set up an automated process that scans emails for the csv files meeting a specified criteria (i.e. naming convension, author group) and adds the csv file to a directory that houses the files in sub-folders by type <br />
    ```
    └───facilities
    │   │   100.json
    │   │   101.json
    │   │   102.json
    │   │   103.json
    │
    └───covenants
        │   100.json
        │   102.json
    ```
    From there, my program would read the directory and run logic on all the files within the facilities folder to parse the csvs and assign loans accordingly. This can be set to run on a reocurring basis (x times a week) base on business needs.

4.  **Your solution most likely simulates the streaming process by directly calling a method in your code to process the loans inside of a for loop. What would a REST API look like for this same service? Stakeholders using the API will need, at a minimum, to be able to request a loan be assigned to a facility, and read the funding status of a loan, as well as query the capacities remaining in facilities.**<br/>

    The following is how I would build out the three desired API endpoints for the stakeholders to leverage: <br />

    * **Loan Assignment** *GET/POST* `/assignLoan?facId=456&loanId=123`<br />
    I would leverage the proposed passedRestrictions() method I mentioned earlier (in #2) as the basis of my REST API. Assuming we can query the data internally, the method should only need to take in a `facility ID` and a `loan ID`. If not, then both objects can be passed as part of the body of the GET API request. From there, I would evaluate all relevant covenants for the given facility and identify whether or not the requested loan can be assigned. I'd return a boolean to signify whether or not the loan assignation request can be carried out. We could alternatively build a POST method which would carry out the assignation if passedRestrictions() returns true, or return a 403 HTTP code if it returns false.

    * **Read Funding Status** *GET* `/getFundingStatus?loanId=123` <br />
    Provided that we begin storing funding status on the loan level, this API call should be a GET with only the `loan ID` being passed as a parameter. We would query our database for the given loan ID and simply return the funding status. If no loan is found for the ID we can pass a 404 or something similar.

    * **Remaining Facility Capacity** *GET* `/remainingCapacity?facId=456` <br />
    In my current data model, I leverage the `available_amt` property in my Facility/Covenant intermediate join object to ensure that we do not overallocate loans to the facility. If we then store that data in a database, we could then leverage the `available_amt` property to return when a GET API request comes in for the remaining facility capacity. The method would take in a `facility ID` and we'd return the `available_amt` value for the intermediate object.


5.  **How might you improve your assignment algorithm if you were permitted to assign loans in batch rather than streaming? We are not looking for code here, but pseudo code or description of a revised algorithm appreciated.**<br/>

    I would reevaluate the 'pool' of available facilities after each batch. Eventually, a facility will be either fully or close to fully allocated such that no loan can be allocated to it regardless of its covenants. This can improve our performance because when such a facility exists, we can remove it from our 'pool' of available facilities the next batch of loans can be assigned to.

    In my code, after evaluating the last loan in the batch, I'd run a 'cleaner' method that cleans the fully allocated facilities out of our 'pool' of available facilities.


6.  **Discuss your solution’s runtime complexity.**<br/>
    * `joinFC()`: Joining the facilities and covenants data is `O(F+C)`. F = # of facilities. C = # of covenants
    * `allocateLoans()`: Allocating loans is `O(L*F)`. L = # of loans. F = # of facilities. I am using a nested for loop such that worst case runtime would be every loan evaluates every facility for potential assignation.
    * `selectAssignments()` and `selectYields()`: Selecting fields from object for final output is `O(F)` for assignments and `O(L)` for yields. F = # of facilities. L = # of loans.
    </details>

