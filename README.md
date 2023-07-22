# E-Book Store Front-End + Back-End (Bachelor project)

This application represents my Bachelor project - an online store that sells e-books for the students of the Romanian-American University of Bucharest. 

The project has been created in the PERN stack (Postgres as the database, Express.js as a lightweight back-end framework, React as the client library, and Node.js as the back-end runtime). Besides these, some important libraries used are Redux, Redux-Toolkit, MaterialUI, 

This is my most comprehensive application to date, as it is a full-stack application. It involves multiple systems and components: an authentication system (sign in and sign up), a self-publishing system, a payment system (using the Stripe API), shopping cart system, products page, individual product information page, personal user account, book reading page within the personal user account, administrator dashboard, and others.

# Some bad practices

You may spot some incorrect or bad practices in some places, such as in certain routes in the back-end where variables are passed directly in a SQL string, which can lead to SQL injection. Please ignore such mistakes, as this project was created at a time when my knowledge of web development was not as great as today. Back then I tried my best to implement the best practices I already knew, such as using JWT tokens for authentication and authorization and storing the token in a HTTPOnly cookie. 

# Current situation

Unfortunately, this project is not maintained anymore, as I do not have the necessary time to correct all the rookie mistakes I did (such as the one mentioned above in regard to SQL). Furthermore, you will not be able to actually view the application on the Internet, as the cost of hosting it was getting to high. As such, the only thing that remains for you is to simply look through the code if you wish to.

# Detailed documentation

I tried my best to create a detailed documentation for each component and file in my project. This documentation is from my Bachelor project.

Path of file relative to src folder (for the front-end side)	| Purpose of file

`./components/Card.js` - Small presentational card component showing thumbnail of a product, the title of the product and the author’s name. Used within an image slider component.

`./components/Card.styled.js` -	Styling rules for the Card component.

`./components/Filters.js` -	Component containing filtering and sorting options. Used within the page displaying a list of products depending on the category selected.

`./components/Filters.styled.js` - Styling rules for the Filters component.

`./components/Footer.js` - Footer component containing contact and legal information that will be displayed at the bottom of the website on almost all webpages.

`./components/Footer.styled.js` - Styling rules for the Footer component.

`./components/List.js` - Component which acts as a menu for the page listing all products based on category. The user can choose a category and subcategory within this component.

`./components/Navbar.js` - Top navigation bar component which allows a user to access the main webpages of the application. Furthermore, it enables a user to search for a certain product using a search bar.

`./components/Navbar.styled.js` - Styling rules for the Navbar component.

`./components/Pagination.js` - Component which allows for pagination on the page displaying the list of products. There is a maximum of 12 products displayed on a page. If the number of products in a category exceeds this limit, pagination will allow to navigate to the next set of products in the category.

`./components/Pagination.styled.js` - Styling rules for the Pagination component.

`./components/ProductCard.js` - Individual product card showing a preview of the main details of a product on the page listing all products from a certain category.

`./components/ProductCard.styled.js` - Styling rules for the ProductCard component.

`./components/Rating.js` - Component displaying the rating of a product in the form of number of stars out of a total of five on the page showing all the details of a specific product.

`./components/Rating.styled.js` - Styling rules for the Rating component.

`./components/Review.js` - Component holding all the information regarding a review left by a user for a product. The details include: title of the review, review message body, first name of the user, rating given to the product and date of the review.

`./components/Review.styled.js` - Styling rules for the Review component.

`./components/ReviewField.js` - Component representing inputs for a user to write a review for a product.

`./components/ReviewField.styled.js` - Styling ruled for the ReviewField component.

`./components/ReviewList.js` - Component that contains both the ReviewField component as well as all the reviews left in the past by users in the form of a number of Review components.

`./components/ReviewList.styled.js` - Styling rules for the ReviewList component.

`./components/Slider.js` - Component containing a number of Card components, allowing a user to look through a collection of recommended or popular products. 

`./components/Slider.styled.js` - Styling rules for the Slider component.

`./components/home/Hero.js` - Component containing the main text and background graphics for the homepage of the website.

`./components/home/Hero.styled.js` - Styling rules for the Hero component.

`./components/product/ProductDetails.js` - Component that contains and showcases all the possible details of a product that may interest a user. This component is found primarily on the page displaying information regarding a specific product that was clicked on by a user.

`./components/product/ProductDetails.styled.js` - Styling rules for the ProductDetails component.

`./components/cart/CartProduct.js` - Component containing limited information about a product that was added to a user’s shopping basket. 

`./components/cart/CartProduct.styled.js` - Styling rules for the CartProduct component.

`./components/publish/DocumentDetails.js` - Component designed for the second step of the self-publishing page, where users have to enter details about the document they are uploading for review.

`./components/publish/DocumentDetails.styled.js` - Styling rules for the DocumentDetails component.

`./components/publish/Modal.js` - Component that pops up as an overlay above all other components on the screen and that shows a preview of how the store listing of the uploaded document would look like once the document is accepted in the review stage.

`./components/publish/Modal.styled.js` - Styling rules for the Modal component.

`./components/publish/PreviewDocument.js` - Component designed for the third step of the self-publishing page, where users can see a preview of how the store listing of the uploaded document would look like once the document is accepted in the review stage.

`./components/publish/PreviewDocument.styled.js` - Styling rules for the PreviewDocument component.

`./components/publish/ProgressBar.js` - Component outlining a user the main steps to be taken as well as the progress made in the self-publishing process. 

`./components/publish/ProgressBar.styled.js` - Styling rules for the ProgressBar component.

`./components/publish/PublishDocument.js` - Component designed for the last step of the self-publishing page, where users can submit their document for review by an administrator.

`./components/publish/PublishDocument.styled.js` - Styling rules for the PublishDocument component.

`./components/publish/UploadDocument.js` - Component designed for the first step of the self-publishing page, where users upload the actual document that they wish to self-publish.

`./components/publish/UploadDocument.styled.js` - Styling rules for the UploadDocument component.

`./components/user_account/Books.js` - Component situated in the user’s personal account displaying all the e-books that he or she has purchased.

`./components/user_account/Books.styled.js` - Styling rules for the Books component.

`./components/user_account/GeneralDetails.js` - Component situated in the user’s personal account displaying general details about the user.

`./components/user_account/GeneralDetails.styled.js` - Styling rules for the GeneralDetails component.

`./components/user_account/UserProdCard.js` - Modified component of the ProductCard component. Situated within the Books component.

`./components/user_account/UserProdCard.styled.js` - Styling rules for the UserProdCard component.

`./components/admin_dashboard/DashProducts.js` - Component situated within the admin dashboard page allowing an admin to view and manage all products on the store, as well as upload a new product.

`./components/admin_dashboard/DashProducts.styled.js` - Styling rules for the DashProducts component.

`./components/admin_dashboard/EditModal.js` - Modified version of the Modal component, allowing an administrator to edit the details of an existing product.

`./components/admin_dashboard/EditModal.styled.js` - Styling rules for the EditModal component.

`./components/admin_dashboard/Grid.js` - Component displaying a grid, or table, of all the products that the administrator is searching for.

`./components/admin_dashboard/Grid.styled.js` - Styling rules for the Grid component.

`./components/admin_dashboard/GridItem.js` - Individual item displaying core details of a product within the Grid component.

`./components/admin_dashboard/GridItem.styled.js` - Styling rules for the GridItem component.

`./components/admin_dashboard/Pending.js` - Component situated within the admin dashboard allowing an admin to view all the products that have been submitted for review by users in the self-publishing process.

`./components/admin_dashboard/Pending.styled.js` - Styling rules for the Pending component.

`./components/admin_dashboard/PendingGrid.js` - Modified version of the Grid component.

`./components/admin_dashboard/PendingGrid.styled.js` - Styling rules for the PendingGrid component.

`./components/admin_dashboard/PendingGridItem.js` - Modified version of the GridItem component.

`./components/admin_dashboard/UploadProduct.js` - Component allowing an administrator to fill in details regarding a new product and upload it to the store.

`./components/admin_dashboard/UploadProduct.styled.js` - Styling rules for the UploadProduct component.

`./components/admin_dashboard/WarningModal.js` - Modified version of the Modal and EditModal components.

`./components/admin_dashboard/WarningModal.styled.js` - Styling rules for the WarningModal component.

`./images/3d-green-book-in-air.png` - Image file serving as a background image.

`./images/3d-orange-book-in-air.png` - Image file serving as a background image.

`./images/3d-pink-book-in-air-1.png` - Image file serving as a background image.

`./images/3d-pink-book-in-air.png` - Image file serving as a background image.

`./images/3d-white-book-in-air.png` - Image file serving as a background image.

`./images/hero_image.png` - Image file serving as a background image for the homepage of the application.

`./images/logo.png` - Image file serving as the logo image of the online store, situated in the top-left corner of the navigation menu and in the footer.

`./pages/Cart.js` - Page component representing a user’s shopping cart.

`./pages/Cart.styled.js` - Styling rules for the Cart component.

`./pages/Dashboard.js` - Page component representing the administrator dashboard.

`./pages/Dashboard.styled.js` - Styling rules for the Dashboard component.

`./pages/Home.js` - Page component representing the homepage of the application.

`./pages/Login.js` - Page component representing the login page for a user.

`./pages/Login.styled.js` - Styling rules for the Login component.

`./pages/Product.js` - Page component representing the store listing of an individual product.

`./pages/Products.js` - Page component representing the webpage where users can view all the products from a certain category.

`./pages/Products.styled.js` - Styling rules for the Products component.

`./pages/Publish.js` - Page component representing the self-publishing section of the website.

`./pages/Publish.styled.js` - Styling rules for the Publish component.

`./pages/Register.js` - Page component representing the register page for a new user.

`./pages/UserAccount.js` - Page component representing the personal account of an existing user.

`./pages/UserAccount.styled.js` - Styling rules for the UserAccount component.

`./layouts/PrivateAdminRoute.js` - Route component checking if the user who has logged in is an administrator, in order to access the administrator dashboard.

`./layouts/PrivateProfessorRoute.js` - Route component checking if the user who has logged in is a professor, in order to access the self-publishing page.

`./layouts/PrivateRoute.js` - Route component checking if the user who has logged in has a role assigned to him or her, in order to parts of the application that are intended for authenticated users.

`./layouts/ProtectedLayout.js` - Holds a collection of routes intended for authenticated users only.

`./layouts/PublicLayout.js` - Holds a collection of routes intended for both authenticated and unauthenticated users.

`./store/cartSlice.js` - Holds a slice of the global state. This slice concerns a user’s shopping cart.

`./store/productsAdminSlice.js` - Holds a slice of the global state. This slice concerns the products that appear on the administrator dashboard.

`./store/productsSlice.js` - Holds a slice of the global state. This slice concerns the products that appear on the products categories page and the individual product page.

`./store/store.js` - Combines all the slices into a single object, holding the entire global state.

`./axios/base_url.js` - Configures the way requests need to be made, specifically the part of the request’s path that repeats for all requests.


Path of file relative to src folder (for the back-end side)	| Purpose of file

`index.js` - It represents the main entry point for the server-side. All route modules and additional middleware are imported in this file.

`.env` - This is a special file that is used to store environment variables. Such variables are usually API keys or account names, which represent sensitive data. Holding them in .env is a lot safer, and they can still be used by writing ‘process.env.KEY_NAME’, where KEY_NAME is the actual name given to a certain key-value pair in .env. This file is added inside .gitignore.

`commands.sql` - Holds SQL commands that were used to create the tables in the database as well as commands for populating the tables. This file serves more as a backup and documentation for the way the database was created.

`other.txt` - File containing passwords of user accounts that were created for testing purposes. This file is added inside .gitignore.

`./routes/account.js` - Contains routing logic and HTTP methods regarding a user’s account.

`./routes/admin.js` - Contains routing logic and HTTP methods regarding the administrator’s dashboard.

`./routes/payment.js` - Contains routing logic and HTTP methods regarding the Stripe API implementation within the application.

`./routes/products.js` - Contains routing logic and HTTP methods regarding products in general throughout the application.

`./routes/upload.js` - Contains routing logic and HTTP methods regarding the self-publishing system.

`./pool_connection/connect.js` - Configuration file for the connection between the application’s server-side and the PostgreSQL server, using a query builder called ‘node-postgres’.
`./auth/auth_jwt.js` - Contains routes for login and register.
`./auth/binarySearch.js` - Contains a binary search algorithm and a bubble sort algorithm, used mostly for checking if a PDF document already exists.
`./auth/hash.js` - Contains functions for hashing and comparing passwords.
`./auth/utilities.js` - Contains many functions for data validation, relying heavily on the use of regular expressions.
