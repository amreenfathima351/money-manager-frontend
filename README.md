# Money Manager

**Money Manager** is a comprehensive, full-stack personal finance application designed to help users take complete control of their financial life. It provides a centralized platform to manage multiple accounts, track diverse income/expense streams, and gain actionable insights through data visualization.

---

### The Problem it Solves
Managing personal finances across multiple bank accounts, credit cards, and cash holdings can be overwhelming. Standard banking apps only show one side of the story, making it difficult for users to:
*   **See the "Big Picture"**: Tracking net worth across varied platforms is manual and tedious.
*   **Monitor Spending Habits**: Understanding exactly where money goes (e.g., food vs. shopping) often requires complex spreadsheets.
*   **Manage Inter-Account Transfers**: Keeping track of money moving between self-owned accounts (like a bank withdrawal to cash) is rarely handled well by automated tools.
*   **Partition Life**: Most tools don't differentiate between **Personal** and **Office/Professional** expenses in one view.

---

### The Solution
**Money Manager** solves these challenges by providing a premium, unified dashboard that acts as a financial command center:

*   **Multi-Account Unified View**: Manage Bank, Cash, Credit Card, and Savings accounts in one place with real-time balance tracking.
*   **Intuitive Transaction Logging**: Log Income, Expenses, and Transfers with just a few clicks.
*   **Smart Date Filtering**: Instantly toggle between **Today, Weekly, Monthly,** and **Yearly** views, or set custom date ranges to find specific data.
*   **Visual Analytics**: Interactive charts powered by `Recharts` provide a visual breakdown of spending by category, helping users identify saving opportunities.
*   **Division Control**: Tag every transaction as either "Personal" or "Office" to keep financial lives separate but organized.
*   **Safety Guards**: Built-in logic prevents "negative balance" errors by validating account limits before allowing expenses or transfers.
*   **Secure & Private**: Full JWT-based authentication ensures that your financial data is accessible only to you.

---

### Tech Stack
*   **Frontend**: React.js with Tailwind CSS for a sleek, responsive "Glassmorphism" UI.
*   **Backend**: Node.js & Express.js REST API.
*   **Database**: MongoDB (NoSQL) for flexible transaction and account storage.
*   **Icons & Animations**: Lucide-react for iconography and Framer Motion for smooth transitions.
*   **Charts**: Recharts for dynamic data visualization.

---

### Key Features
1.  **Dynamic Dashboard Summary**: Real-time calculation of Total Income, Total Expense, and Current Balance based on active filters.
2.  **Category Smart-Select**: Context-aware category suggestions (e.g., showing 'Salary' for Income but 'Food/Fuel' for Expenses).
3.  **Account Transfer Logic**: Automatically deducts from one account and adds to another in a single atomic transaction.
4.  **Security Measures**: Secure password hashing and protected API routes.
5.  **Responsive Design**: A premium look and feel that works perfectly on both Desktop and Mobile devices.

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amreenfathima351/money-manager-frontend.git
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd money-manager-frontend
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   REACT_APP_BACKEND_URL=your_backend_url
   ```

4. **Run the Application**
   ```bash
   npm start
   ```

---

## 📄 License
Distributed under the MIT License.
