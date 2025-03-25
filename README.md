# Momentum
Momentum is a fitness tracking app that helps users stay motivated and on track with their fitness goals. What sets us apart from other fitness apps is the accessibility to premium features such as personalized workout plans, advanced analytics, and social sharing.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)
- [turso](https://docs.turso.tech/cli/installation) Database driver

### Installation
- Clone the repository
- Navigate to the project directory:
```shell
cd momentum
```
- Initialize the database:
```shell
turso dev --db-file local.db
```
- Install dependencies:
```shell
pnpm install
```
- Start the development server:
```shell
pnpm dev
```

### Contributing
If you'd like to contribute to Momentum, please follow these steps:
1. Claim an issue
2. Create a new branch for your feature or bug fix with the naming convention of `<username>/moment-<issue_number>/<short_description>`
3. Make your changes and commit them
4. Submit a pull request
