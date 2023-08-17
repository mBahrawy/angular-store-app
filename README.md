## Products Store Angular Web App

Welcome to the Basic E-Commerce Store Angular Web App! This application provides a simple and user-friendly shopping experience. Below, I've included all the information you need to set up, run, and understand the features of this application.

## Features

### 1. Login Display

A basic login form is provided to facilitate user authentication. Two static login roles are available:

- **User Role**
  - Username: user
  - Password: user

- **Admin Role**
  - Username: admin
  - Password: admin

### 2. Categories/Product Display (For user view)

Access to the categories and product display page is restricted to logged-in users. The content is only accessible to users, this contains filter categories, search with product name, pagination, and changing page limit to show.

 - Show different categories.
 - Under each category, display available products along with a filter section.
 - Loading animations are used while fetching data.
 - Each product card displays full product details.

### 3. Admin View (for admin view)

 - Display all products in a table format.
 - Pagination and changing page limit.
 - Admin can view product.
 - Admin can add new products.
 - Admin can update existing product details.
 - Admin can delete products.


## Features

 - Developed using the latest Angular version (15).
 - Angular guards are implemented for security
 - Module-based architecture, large scalability.
 - lazy-loaded modules, enhanced app loading speed
 - Responsive design for mobile devices, Using Angular material UI.
 - Styles are defined using SASS.
 - Dynamic localization supports English and Arabic languages.
 - Animated loader is shown during every request.
 - Toaster feedback for errors
 - User data persistence during auth by local storage
 - Dynamic localization


  ## Modules

  - App module (main module)
  - Auth module (for login elements)
  - Admin module (containing all admin view elements)
  - User module (containing all user view elements)
  - Shared module (all shared components and modules)
  - Material module (importing all angular material modules)
  


## Getting Started

To get started with the Basic E-Commerce Store Angular Web App, follow these steps:

1. **Clone the Repository:** Clone this repository to your local machine.

```
git clone [https://github.com/your-username/basic-ecommerce-angular.git](https://github.com/mBahrawy/angular-store-app.git)
```

2. **cd to the project directory**
```
  cd angular-store-app
```

3. **Install dependencies**
```
  npm i 
```

4. **run the app**
```
  npm start
```


