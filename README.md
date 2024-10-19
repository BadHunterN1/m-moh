Overview
IM ALIVE is an interactive e-commerce website aimed at providing users with a seamless online shopping experience.
the platform allows customers to browse a selection of digital and physical products, manage their shopping cart, and complete the checkout process. Users are given an opportunity to register and log in, ensuring personalized experiences such as tracking their order history. A dynamic email notification system confirms each purchase, providing customers with detailed receipts and ensuring transparency.
The site leverages JavaScript for frontend functionality, EmailJS for communication, and localStorage for maintaining persistent cart data. Responsiveness is a key focus, enabling users to have a fluid experience across different screen sizes and devices.

Features:
1. Product Listings and Product Detail Pages
 The main page showcases a list of available products, each with a dedicated page containing more detailed information such as name, description, and price.
  Users can easily navigate from the main product list to individual product details and back.

3. Shopping Cart
 Users can add items to their cart with a single click and adjust quantities before checkout.
  The cart updates in real-time, showing the total cost of all selected items, with support for different currencies.
   Cart content persists across sessions using localStorage, so users don't lose their selections even after leaving the site.

5. Checkout Process
 The checkout page collects necessary billing details such as user name, phone number, and email, displaying the total price and a breakdown of items.
  Users who are not logged in are prompted to register before completing their order.

7. Email Confirmation
 After successful checkout, an email is automatically sent to the customer containing a summary of their order, thanks to the integration of EmailJS.
  The email includes the names of purchased products, quantities, and the total price, ensuring customers have a formal receipt.

8. User Authentication
 The website includes a basic authentication system allowing users to register and log in.
  Logged-in users can see their past orders, making repeat purchases easier.

9. Order Management
 Users can view their current and previous orders, complete with details on product names, quantities, and total cost.
  Orders can be accessed from the orders.html page, ensuring all purchases are traceable.

10. Responsive Design
 The site’s layout is designed to adjust for different screen sizes, ensuring usability on desktops, tablets, and smartphones.
  Media queries and responsive CSS are used to adapt the user interface to various resolutions.

11. Dynamic Data Management
 The system uses JavaScript for dynamically updating cart contents, handling user input, and maintaining session data for better performance.

Detailed Page Breakdown:
1. Home Page (index.html)
 Displays a dynamic list of products. Each product has a brief description, price, and an "Add to Cart" button.

2. Product Details Page
 Shows detailed information about a selected product, including pricing, stock availability, and a larger product image. Users can select quantities before adding to the cart.

3. Shopping Cart Page (cart.html)
 Lists the items the user has added to their cart. Users can adjust quantities, remove items, and view the total cost of their order. The page dynamically updates as users modify the cart.

4. Checkout Page (checkout.html)
 Collects billing information from the user. The page includes a summary of all the items in the cart, their total cost, and an "Order Now" button. Upon submission, the order is processed, and an email is sent to the user.

5. Order History Page (orders.html)
 After logging in, users can view their previous orders, including product details and total costs. This provides transparency and convenience for repeat customers.

6. Login and Registration Pages
 Simple user authentication system allowing new users to register and returning users to log in. Registered users benefit from the ability to view and track their orders.

Technologies Used:
 1- HTML/CSS/SCSS: For the structure and styling of the web pages.
 2- JavaScript (ES6)/TypeScript: Handles interactive elements, cart management, and checkout logic.
 3- Swiperjs: Handle IMG Swipers In Page.
 4- CurrencyAPI: For real time prices converts USD to EGP.
 5- EmailJS: Sends order confirmation emails to users after a successful checkout.
 6- LocalStorage: Stores cart, orderHistory data so users don’t lose their selections when navigating between pages or closing the browser.
 7- Google Fonts: Custom fonts ensure a clean and professional design.
 8- Font Awesome: Provides modern icons for the user interface.
 9- CSS Media Queries: Responsive design techniques ensure the site works seamlessly across devices.

Usage:
 1-Product Exploration: Start by browsing the available products on the home page.
 2-Add to Cart: Click on "Add to Cart" buttons to begin building your order.
 3-Checkout: Once done, proceed to checkout to fill in your billing details and submit your order.
 4-Order Confirmation: After placing your order, you’ll receive an email summarizing your purchase.

Future Improvements:
 1-Integrated Payment Gateways: Enable real payments using Stripe or PayPal.
 2-Improved User Accounts: Allow users to save their addresses and payment methods for faster checkouts.
 3-Ratings and Reviews: Provide users with the ability to review products they’ve purchased.

THX,
By BadHunterN1(Ahmed Moh)
