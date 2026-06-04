# Week 9 Day 4 - Redux Thunk User Fetch (Redux Toolkit)

## What this does
- Uses **Redux Toolkit** + **createAsyncThunk** (async thunk) to fetch user data from:
  - `https://jsonplaceholder.typicode.com/users/:id`
- Displays loading, success, and error states.

## Run
```bash
cd "week9/day 4/xp"
npm install
npm run dev
```

Then open the URL shown in the terminal (Vite).

## How to test error handling
- Enter `9999` (or any non-existing ID) and click **Fetch User**.

