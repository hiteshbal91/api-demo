#Prerequisite
node >= 0.10.28
mongodb >= 2.6

#Start an application
 1. cd  /path/to/folder
 2. npm install
 3. npm start or node app
**Note:** *make sure mongodb is started on the port specified in the config*

#REST APIs
**GET /categories**
*Gettting all the categories*

**POST /categories**
*Creating new category*
Body

    {
    	"name": "Category",
        "description": "Category description"
    }
Header

    Content-Type: "application/json"

**GET /categories/{cat_id}/products**
*Gettting all the products in the specified category*

**GET /products**
*Gettting all the products*

**POST /products**
*Creating new product*
Body

    {
    	"name": "Product",
        "description": "Product description",
        "price":  "42250",
        "categories": [{cat_id}]
    }
Header

    Content-Type: "application/json"

**Note:** *postman collection is attached to test it out*
