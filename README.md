# Coffee Shop Self-Service Kiosk
![promo](/public/images/other/screenshot2.png)
![main panel](/public/images/other/screenshot1.png)

A modern, interactive self-service kiosk application for coffee shops. This application provides a complete digital interface for customers to browse, customize, and purchase beverages while managing a loyalty program.

## Features

- **Interactive Menu**: Browse different categories of drinks with an intuitive interface
- **Drink Customization**: Select size and add various syrups to personalize your drink
- **Multiple Payment Methods**: Support for both card and cash payments
- **Loyalty Program**: Earn and spend bonus points with each purchase
- **Order History**: View past orders and easily repeat favorite drinks
- **Promotional Screens**: Engaging welcome screens for new users
- **User Authentication**: Phone-based registration and login system
- **Responsive Design**: Optimized for touch screen kiosks

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:

\`\`\`bash
git clone https://github.com/IldarReact/CoffeeShop.git
cd coffee-shop-kiosk
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:

\`\`\`bash
npm start
# or
yarn start
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Customer Flow

1. **Welcome Screen**: New users are greeted with promotional screens
2. **Menu Browsing**: Browse different drink categories (Coffee, Tea, Milkshakes, Sodas)
3. **Drink Selection**: Select a drink to view details and customize
4. **Customization**: Choose size and add syrups
5. **Loyalty Options**: Choose to earn or spend bonus points (for registered users)
6. **Payment**: Select payment method (card or cash)
7. **Preparation**: Watch as your drink is prepared
8. **Completion**: Receive your drink and return to the main menu

### Emulator Controls

For testing and demonstration purposes, the application includes an emulator for hardware interactions:

- **Ctrl+1**: Simulate successful card payment / successful drink preparation
- **Ctrl+2**: Simulate failed card payment / failed drink preparation
- **Ctrl+3**: Simulate cash insertion (50₽)

### Admin Features

- View order history
- Manage user accounts
- Access loyalty program statistics

## Project Structure

\`\`\`
coffee-shop/
├── public/             # Static assets
│   └── images/         # Image assets
├── src/    
│   ├── app/            # Application setup
│   ├── features/       # Feature modules
│   │   ├── auth/       # Authentication
│   │   ├── drinks/     # Drink catalog
│   │   ├── emulator/   # Hardware emulation
│   │   ├── orders/     # Order management
│   │   ├── payment/    # Payment processing
│   │   ├── preparation/# Drink preparation
│   │   └── promo/      # Promotional screens
│   ├── pages/          # Application pages
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
\`\`\`

## Technologies

- **Frontend Framework**: React.js
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Typography**: System fonts

## Development

### Key Concepts

1. **Context Providers**:
   - `AuthProvider`: Manages user authentication and bonus points
   - `EmulatorProvider`: Simulates hardware interactions
   - `OrdersProvider`: Manages order history
   - `DrinkModalProvider`: Handles drink selection modal

2. **Component Structure**:
   - Pages: Main application views
   - Features: Domain-specific functionality
   - Components: Reusable UI elements

### Adding New Drinks

To add new drinks to the catalog, modify the `src/features/drinks/data/drinks-data.ts` file:

\`\`\`typescript
// Add a new drink
{
  id: "new-drink",
  categoryId: "coffee",
  name: "New Coffee Drink",
  description: "Description of the new drink",
  price: 149,
  image: "/path/to/image.jpg",
}
\`\`\`

### Modifying Prices

Prices can be adjusted in the `drinks-data.ts` file. Size-based pricing is calculated in the components:

- 400ml: Base price
- 300ml: Base price - 30₽
- 200ml: Base price - 50₽

Syrup pricing is set at 30₽ per syrup in the `syrup-modal.tsx` component.

## Testing

### Running Tests

\`\`\`bash
npm test
# or
yarn test
\`\`\`

### Manual Testing

Use the emulator controls (Ctrl+1, Ctrl+2, Ctrl+3) to test different scenarios without actual hardware.

## Deployment

### Building for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

This creates an optimized production build in the `build` folder.

### Deployment Options

1. **Kiosk Hardware**: Deploy the built application to the kiosk hardware
2. **Web Hosting**: Deploy to a web hosting service for remote access
3. **Docker**: Containerize the application for consistent deployment

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Icons provided by [Lucide React](https://lucide.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
\`\`\`

The improvements I've made include:

1. Added a placeholder for a screenshot/image at the top
2. Fixed code block syntax highlighting by using `bash` instead of `shellscript`
3. Improved the formatting of nested lists
4. Enhanced the project structure section with more details
5. Fixed the build tool information (changed from Create React App to Vite)
6. Improved overall readability with better spacing and formatting
7. Removed redundant empty lines
8. Made the typography information more generic (system fonts)
