## Test App

This project contains product data and user can perform the add, edit, delete product

## Project Structure

Folder structure :

    |____next.config.mjs
    |____next-env.d.ts
    |____tailwind.config.ts
    |____public
    | |____vercel.svg
    | |____next.svg
    | |____assets
    |____package-lock.json
    |____package.json
    |____.env
    |____tsconfig.json
    |____postcss.config.js
    |____.eslintrc.json
    |____src
    | |____app
    | | |____types
    | | | |____type.tsx
    | | |____utils
    | | | |____common.tsx
    | | |____product
    | | | |____addproduct
    | | | | |____page.tsx
    | | | |____page.tsx
    | | | |____editproduct
    | | | | |____page.tsx
    | | |____layout.tsx
    | | |____page.tsx
    | | |____globals.css

<details>
<summary>Project structure is explained as below</summary>

| Name                            | Description                                                                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **next.config.mjs**             | File used for various settings for our nextjs application                                                                                                     |
| **next-env.d.ts**               | File used for declare TypeScript types and interfaces for Next.js application                                                                                 |
| **tailwind.config.ts**          | File used for configuring Tailwind such as font and color                                                                                                     |
| **public**                      | File is created default and used for static accests used in our application                                                                                   |
| **assets**                      | File contains accets of our app like image, font                                                                                                              |
| **vercel.svg**                  | Svg default file                                                                                                                                              |
| **next.svg**                    | Svg default file                                                                                                                                              |
| **package-lock.json**           | Its automatically generated while install modules and manage dependancy version                                                                               |
| **package.json**                | Package file contains information about project, project dependancy and various settings of project                                                           |
| **.env**                        | File contains the envirement variables                                                                                                                        |
| **tsconfig.json**               | Configuration file for the typescript and contain various settings that define how the TypeScript compiler should compile your TypeScript code in java script |
| **postcss.config.js**           | Used for the configuration of PostCSS                                                                                                                         |
| **.eslintrc.json**              | Used for the rules applied on code, find problems in code and enforce to follow some rules                                                                    |
| **src**                         | Src folder contains the actual code with file and assets                                                                                                      |
| **src/app/types**               | Contains comman types                                                                                                                                         |
| **src/app/utils**               | Contains comman utils function                                                                                                                                |
| **src/app/product**             | Product folder contains the file for adding and edit product page                                                                                             |
| **src/app/product/addproduct**  | Add product page contains code for allows users to add product                                                                                                |
| **src/app/product/editproduct** | Add product page contains code for allows users to edit product                                                                                               |
| **src/app/layout.tsx**          | Default created file contains various layouts                                                                                                                 |
| **src/app/page.tsx**            | Default created and used for indivisual page creation                                                                                                         |
| **src/screens/globals.css**     | Define the globle style that used in entire application                                                                                                       |

</details>

## Dependencies

<details>
<summary>Global</summary>

| Name                | Version  | Description                                                                       |
| ------------------- | -------- | --------------------------------------------------------------------------------- |
| @emotion/react      | ^11.11.3 | library designed for writing css styles with JavaScript                           |
| @emotion/styled     | ^11.11.0 | Library provides way to create React components that have styles attached to them |
| @heroicons/react    | ^2.1.1   | Library used for the svg icons                                                    |
| @mui/icons-material | ^5.15.6  | Library used for ready-to-use React Material Icons                                |
| @mui/material       | ^5.15.6  | Library used for ready made components                                            |
| axios               | ^1.6.7   | Library used for Api calling                                                      |
| react-toastify      | ^10.0.4  | Library used for add tost notifications to your app                               |

</details>

## Pre-requisites

For development, You will need to install all the required packages for the next js

Please Follow the instruction from this link:  
https://nextjs.org/

- #### Install Git
  Make sure there is installed Git in your envirement

## Getting started

`Please follow the Project setup instructions on a development environment`

## Clone Repository

git clone https://github.com/Ttristate123/nextjs-frontend.git

## Setup

- Download or clone the repository
- cd nextjs-frontend
- Run command on project rood directory `npm install`
- For run project `npm run dev`
- Set "NEXT_PUBLIC_BASE_API_URL" to backend API url in .env file

## Generate a build

npm run build
