# Exercise UCLL Master-detail

Note: This project is for learning/teaching purposes only. As this is using Northwind API's, data cannot be created/updated. Errors when executing create/update/delete requests are expected. If you want to be able to execute them, please use your own services & data.

## Setup

1. Create Northwind destination
2. Download this project as zip
3. Unzip the project on your local machine
4. Open SAP Business Application Studio
5. Copy the entire project into your workspace
6. Open up the project
7. Run command 'npm i'
8. Run command 'npm run start'
9. Check implementation of Northwind destination in project: data should be appearing

## Exercise

1. Retrieve employee information. EmployeeId is given as a constant variable in models.js
2. Filter Orders by employee, using the same employee number
3. Show me more details about orders by adding table columns
4. Fix navigation to detail page when selecting a line. Hint: look at the targets defined in manifest.json
5. Retrieve all order details for the selected order
7. Show order detail data in the detail view
8. Retrieve a list of products
9. When clicking add, I should be able to add a product to the order. Please complete the necessary function in Detail.controller & complete the models.js function

## Optional

1. When selecting an order detail, I navigate to a detaildetail.view.xml page. On this page, I want to see all details about the product's supplier
2. I want to sort & filter my order details by Category
3. I want to change the amount of a certain product
4. Before entering the app, I want the possibility to select a user for which I want to see all orders
5. I want to be able to delete products from an order
6. I want a counter to see how many orders there are for a certain employee
7. I want a counter to see how many products there are in a certain order
8. I want to see the total price of an order detail (qty * amount)
9. I want to see the total price of an order, and the total amount of discount the employee got
