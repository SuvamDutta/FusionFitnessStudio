const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'gym.db'), { verbose: console.log });

const JUNE_DATE = '2026-06-01'; // Default date for June entries

// 1. Insert Expenses
const expenses = [
  { category: 'FIXED', amount: 4200, date: '2026-06-03', description: 'IPAD EMI' },
  { category: 'SALARY', amount: 10000, date: '2026-06-01', description: 'ARYAN' },
  { category: 'SALARY', amount: 15000, date: '2026-06-01', description: 'SURAJ DA' },
  { category: 'SALARY', amount: 8000, date: '2026-06-01', description: 'PRIYANSHU' },
  { category: 'SALARY', amount: 2800, date: '2026-06-01', description: 'JOSNA' },
  { category: 'SALARY', amount: 30000, date: '2026-06-01', description: 'SUBHAM' },
  { category: 'SALARY', amount: 2047, date: '2026-06-01', description: 'ROHIT' },
  { category: 'SALARY', amount: 5300, date: '2026-06-01', description: 'KARAM' },
  { category: 'BILLS', amount: 1010, date: '2026-06-30', description: 'INTERNET' },
  { category: 'BILLS', amount: 1000, date: '2026-06-01', description: 'YO ACTIVE' },
  { category: 'BILLS', amount: 10000, date: '2026-06-01', description: 'EC BILL' },
  { category: 'MISCELLANEOUS', amount: 2300, date: '2026-06-10', description: 'AC MAINTANENCE' },
  { category: 'MISCELLANEOUS', amount: 1000, date: '2026-06-16', description: 'FRAGNANCE' },
  { category: 'MISCELLANEOUS', amount: 300, date: '2026-06-16', description: 'ELECTRICITY' },
];

const insertExpense = db.prepare('INSERT INTO expenses (category, amount, date, description) VALUES (?, ?, ?, ?)');
expenses.forEach(e => insertExpense.run(e.category, e.amount, e.date, e.description));

// 2. Insert Supplements
const supplements = [
  { item: 'WELLCORE', price: 10500 },
  { item: 'SUPER YOU', price: 5000 },
  { item: 'MAX CHIPS', price: 1200 },
  { item: 'WELLCORE', price: 11500 },
  { item: 'MUSCLE BLAZE', price: 13500 },
  { item: 'MAX CHIPS', price: 4000 },
  { item: 'MAX CHIPS', price: 4000 },
  { item: 'GNC WAFFERS', price: 540 },
  { item: 'MAX CHIPS', price: 4800 },
  { item: 'GNC WAFFERS', price: 1800 },
  { item: 'MAX CHIPS', price: 12600 },
];

const insertSupplement = db.prepare('INSERT INTO supplements (buyer_name, item, price, date) VALUES (?, ?, ?, ?)');
supplements.forEach(s => insertSupplement.run('Walk-in', s.item, s.price, JUNE_DATE));

// 3. Insert Members and Payments
const membersData = [
  // Monthly
  { name: 'SUPRIYO SHAW', fee: 800, mode: 'ONLINE', months: 1 },
  { name: 'DIPU TWARI', fee: 1100, mode: 'ONLINE', months: 1 },
  { name: 'SHAHIL', fee: 800, mode: 'ONLINE', months: 1 },
  { name: 'DEV SHARMA', fee: 1600, mode: 'ONLINE', months: 1 },
  { name: 'SAYAN ANSKAR', fee: 1000, mode: 'ONLINE', months: 1 },
  { name: 'ANWESHA DEY', fee: 1100, mode: 'CASH', months: 1 },
  { name: 'DARPAN', fee: 1000, mode: 'ONLINE', months: 1 },
  { name: 'SOUMADEEP MONDAL', fee: 1000, mode: 'ONLINE', months: 1 },
  { name: 'VINIT SINGH', fee: 800, mode: 'ONLINE', months: 1 },
  { name: 'RAJ KISORE', fee: 1100, mode: 'ONLINE', months: 1 },
  { name: 'DIP KUMAR', fee: 800, mode: 'ONLINE', months: 1 },
  { name: 'SK AMIRUL ISLAM', fee: 900, mode: 'ONLINE', months: 1 },
  { name: 'HARPRIT KAUR', fee: 1800, mode: 'ONLINE', months: 1 },
  { name: 'SAYAN DIP DAS', fee: 800, mode: 'CASH', months: 1 },
  { name: 'ADITYA PANDEY', fee: 1000, mode: 'CASH', months: 1 },
  { name: 'SAGAR BHOWMIK', fee: 800, mode: 'ONLINE', months: 1 },
  { name: 'DEBOJOTI DAS', fee: 800, mode: 'ONLINE', months: 1 },
  
  // Quarterly / Multi-Month
  { name: 'SOUMYAJET DAS', fee: 1000, mode: 'ONLINE', months: 1 },
  { name: 'SUBHOJIT DAS', fee: 750, mode: 'ONLINE', months: 9 },
  { name: 'NANDINI PAUL', fee: 960, mode: 'ONLINE', months: 1 },
  { name: 'VISHAL SHAW', fee: 1000, mode: 'ONLINE', months: 1 },
  { name: 'RAJ MISHRA', fee: 1000, mode: 'ONLINE', months: 1 },
  { name: 'SOHINI SARKAR', fee: 950, mode: 'ONLINE', months: 1 },
  { name: 'RAHA CHUKIDAR', fee: 1000, mode: 'ONLINE', months: 1 },
  { name: 'VIVAN RAI', fee: 1066, mode: 'ONLINE', months: 1 },
  { name: 'NAKSHATRA', fee: 1000, mode: 'ONLINE', months: 1 },
  { name: 'SUBHODIP', fee: 960, mode: 'ONLINE', months: 1 },
  { name: 'MD RAKIBUL', fee: 833, mode: 'ONLINE', months: 4 },
  { name: 'FAZAN AFROSE', fee: 800, mode: 'ONLINE', months: 3 },
  { name: 'M MEENA', fee: 1000, mode: 'ONLINE', months: 1 },
  { name: 'BODHISATYA CHOUDHURI', fee: 900, mode: 'ONLINE', months: 2 },
  { name: 'RAHUL TIWARI', fee: 750, mode: 'ONLINE', months: 3 },
  { name: 'SAMRIDH MISHRA', fee: 700, mode: 'ONLINE', months: 3 },
  { name: 'SATYAJIT MANDI', fee: 880, mode: 'ONLINE', months: 1 },
  
  // New Admissions
  { name: 'DEBDIP MANNA', fee: 1100, mode: 'CASH', months: 1 },
  { name: 'RAHUL SHAW', fee: 1000, mode: 'CASH', months: 3 },
  { name: 'SUJAY KUMAR MAHATO', fee: 950, mode: 'ONLINE', months: 3 },
  { name: 'VISHAL RAJAK', fee: 950, mode: 'ONLINE', months: 3 },
  { name: 'HARSHIT SRIVASTAVA', fee: 1200, mode: 'ONLINE', months: 2 },
  { name: 'TUSHAR GUPTA', fee: 1000, mode: 'ONLINE', months: 3 },
  { name: 'ISHA GHOSH', fee: 1100, mode: 'ONLINE', months: 1 },
  { name: 'SUSANT KUMAR', fee: 1100, mode: 'ONLINE', months: 1 },
  { name: 'MILI MONDAL', fee: 1100, mode: 'ONLINE', months: 1 },
];

const insertMember = db.prepare('INSERT INTO members (name, join_date, status) VALUES (?, ?, ?)');
const insertPayment = db.prepare('INSERT INTO payments (member_id, amount, date, months_covered, mode) VALUES (?, ?, ?, ?, ?)');

membersData.forEach(m => {
  const result = insertMember.run(m.name, JUNE_DATE, 'ACTIVE');
  const memberId = result.lastInsertRowid;
  
  // The fee shown in the image for multi-month is the PER MONTH fee or TOTAL fee?
  // e.g. RAHUL SHAW @ 3 MONTHS - 1000. Is it 1000 total or 1000 * 3?
  // Earlier user said: "some one give me 3 month money of rs 3000 that will be 1000 rs avg for july". So the total paid is 3000. 
  // If the sheet says 1000 next to "@ 3 MONTHS", maybe they mean 1000 per month, so total is 3000.
  // I will multiply fee by months to get the total amount they paid up front.
  // Wait, if SUBHOJIT DAS @ 9 MONTHS is 750, is that 750*9 = 6750? Likely.
  // Let's assume the total amount paid is `fee * months` based on the user's "3000 for 3 months = 1000 avg" logic.
  
  const totalAmount = m.fee * m.months;
  
  insertPayment.run(memberId, totalAmount, JUNE_DATE, m.months, m.mode);
});

console.log('June data seeded successfully!');
