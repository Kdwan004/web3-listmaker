markdown

# Web3 List Maker on Sui

A decentralized list-making application built on the [Sui blockchain](https://sui.io/) using the Move programming language. This project allows users to create, manage, and share lists in a secure, transparent, and decentralized manner.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Building and Deploying](#building-and-deploying)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Web3 List Maker is a front-end and blockchain-integrated application that leverages the Sui blockchain for decentralized data storage and smart contract functionality. The front-end is built with TypeScript and Vite, while the smart contract logic is implemented in Move (`list_maker.move`) within the Sui ecosystem.

## Features
- Create and manage lists on-chain.
- Secure and transparent data storage using Sui's blockchain.
- Responsive front-end for seamless user interaction.
- Smart contract logic for list operations written in Move.

## Project Structure
```
├── eslint.config.js          # ESLint configuration for JavaScript/TypeScript linting
├── index.html               # Main HTML entry point
├── move/                    # Sui Move smart contract directory
│   └── list_make/           # List Maker smart contract module
│       ├── build/           # Compiled Move artifacts
│       ├── Move.lock        # Move dependency lock file
│       ├── Move.toml        # Move package configuration
│       ├── sources/         # Move source files
│       │   └── list_maker.move  # Core list-making smart contract
│       └── tests/           # Move contract tests
├── node_modules/            # Node.js dependencies
├── package.json             # Node.js project metadata and dependencies
├── pnpm-lock.yaml           # PNPM lock file for reproducible builds
├── public/                  # Static assets
├── src/                     # Front-end source code (TypeScript)
├── tsconfig.app.json        # TypeScript configuration for the app
├── tsconfig.json            # Base TypeScript configuration
├── tsconfig.node.json       # TypeScript configuration for Node.js
└── vite.config.ts           # Vite configuration for the front-end
```


## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PNPM](https://pnpm.io/) (package manager)
- [Sui CLI](https://docs.sui.io/guides/developer/getting-started) for interacting with the Sui blockchain
- A code editor (e.g., VSCode)
- Basic knowledge of Move and TypeScript

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone git@github.com:Kdwan004/web3-listmaker.git
   cd web3-list-maker

2. **Install Front-End Dependencies**:
    ```bash
    pnpm install

3. **Set Up the Sui Move Environment**:
Follow the official Sui documentation to install the Sui CLI and configure your Move development environment: Sui Developer Getting Started.

4. **Run the Front-End Development Server**:
    ```bash
    pnpm run dev

The app will be available at http://localhost:5173 (or another port if specified).

