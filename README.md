# Table to CSV Converter

A Next.js application that demonstrates different methods to export table data to CSV format.

## Features

- Convert table data to CSV using multiple approaches:
  - PapaParse library
  - React-CSV library
  - Combined approach with both libraries
- Modern UI with Tailwind CSS
- Font optimization with Next.js font system
- Responsive table design

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

First, clone the repository:

```bash
git clone https://github.com/your-username/table-to-csv.git
cd table-to-csv
```

Then, install the dependencies:

```bash
npm install
```

### Running the Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `app/` - Main application code
  - `papaparse/` - PapaParse implementation
  - `react-csv/` - React-CSV implementation 
  - `both/` - Combined implementation
  - `layout.tsx` - Root layout with font configuration

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [PapaParse](https://www.papaparse.com) - CSV parsing
- [React-CSV](https://www.npmjs.com/package/react-csv) - React CSV export
- [Geist Font](https://vercel.com/font) - Typography

## License

This project is licensed under the MIT License.