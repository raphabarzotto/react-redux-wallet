# React Redux Wallet

- In this project, I developed a simple wallet app using React Redux
- Used the free API https://economia.awesomeapi.com.br/json/all to help with currency exchange rates
- Project was made in February 2022 as a part of [Trybe's Front-end Course](https://www.betrybe.com/)

# How to Install
You can use any of the methods to install.

To test it, go to http://localhost:3000/
<details>
  <summary><strong>Locally</strong></summary>

  1. `npm install`
  2. `npm start`
</details>
<details>
  <summary><strong>Docker</strong></summary>

  1. `docker-compose up -d` &rarr; to install container and run project

</details>

# Project features and images
- Login page with email REGEX and password minimum characters requirements
![login page without requirements met](/images/login1.png "login page without requirements met")
![login page with requirements met](/images/login2.png "login page with requirements met")
- Wallet page containing:
  - Header with email information and total spent
  - Forms to add a new expense
  - Table of detailed expenses
![wallet page](/images/wallet.png "wallet page")

# What to do next
- Add an Edit and a Delete button