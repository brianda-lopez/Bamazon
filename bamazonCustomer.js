// DEPENDENCIES
// -------------------------------------------------------------

    // get and store MySQL npm package
    var mysql = require('mysql');

    // get and store inquirer npm package
    var inquirer = require('inquirer');

    // connect to MySQL db
    var connection = mysql.createConnection({
        host: "localhost",
      
        // Your port; if not 3306
        port: 3306,
      
        // Your username
        user: "root",
      
        // Your password
        password: "spring2019",
        database: "BamazonDB"
    });

    // asynchronously initialize the connection
    connection.connect (function(err) {
        if (err) throw err;

        // testing the connection
        console.log("Connection Made! \nConnected as id " + connection.threadId);

        seeAsTable();

    })

// FUNCTIONS

    // to see as a formatted table
    var seeAsTable = function () {
        connection.query('SELECT * FROM products', function (err, res) {
          console.table(res);

        promptCustomer(res);

        }); // end of connection.query
    } // end of seeAsTable

    // create prompt for customer; check if customer input matches item in table
    // allow each product in table to be an option that the user can select from by using function(res)
    var promptCustomer = function (res) {
        inquirer.prompt ([{
            type: "input",
            name: "choice",
            message: "What would you like to buy? Select 'Q' to quit."
        }]).then (function(answer) {
            var correct = false;

            // allow 'Q' to allow user to quit application
            if (answer.choice.toUpperCase() == "Q") {
                process.exit();
            }


            for (var i=0; i < res.length; i++) {
                if (res[i].product_name == answer.choice) {
                    correct = true;
                    var product = answer.choice;
                    var id = i;

                    // prompt customer for what they want to buy
                    inquirer.prompt({
                        type: "input",
                        name: "quantity",
                        message: "How many of this product would you like to buy?",
                        validate: function (value) {
                            if (isNaN (value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        } // end of validate
                    }).then(function(answer) {

                        // if quantity allows for it, deduct customer purchase quantity from existing quantity
                        if ((res[id].stock_quantity - answer.quantity) > 0) {
                            connection.query ("UPDATE products SET stock_quantity='" + (res[id].stock_quantity - answer.quantity) + "' WHERE product_name='" + product+"'", function (err, res2) {
                                console.log("Product bought!");

                                seeAsTable();

                            }) // end of function err, res2
                        } else {
                            console.log("We don't have enough -- Sorry about that!");
                            promptCustomer(res);
                        }
                    }) // end of then

                } // end of if statement
            } // end of for loop

            // if user provides product that doesn't exist in our db
            if (i == res.length && correct == false ) {
                console.log("We do not offer this product at this time!");
                promptCustomer(res);
            } // end of if statement

        }) // end of then
    } // end of promptCustomer