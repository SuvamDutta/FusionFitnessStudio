'use server';

import db from './db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// MEMBERS
export async function getMembers() {
  const result = await db.execute('SELECT * FROM members ORDER BY name ASC');
  return result.rows;
}

export async function addMember(data) {
  await db.execute({
    sql: 'INSERT INTO members (name, join_date, status) VALUES (?, ?, ?)',
    args: [data.name, data.joinDate, 'ACTIVE']
  });
  revalidatePath('/members');
}

// PAYMENTS
export async function getPayments() {
  const result = await db.execute(`
    SELECT payments.*, members.name as member_name 
    FROM payments 
    JOIN members ON payments.member_id = members.id 
    ORDER BY date DESC
  `);
  return result.rows;
}

export async function addPayment(data) {
  await db.execute({
    sql: 'INSERT INTO payments (member_id, amount, date, months_covered, mode) VALUES (?, ?, ?, ?, ?)',
    args: [data.memberId, data.amount, data.date, data.monthsCovered, data.mode]
  });
  revalidatePath('/');
  revalidatePath('/members');
}

export async function deletePayment(id) {
  await db.execute({
    sql: 'DELETE FROM payments WHERE id = ?',
    args: [id]
  });
  revalidatePath('/');
  revalidatePath('/members');
}

// EXPENSES
export async function getExpenses(monthPrefix) {
  if (monthPrefix) {
    const result = await db.execute({
      sql: 'SELECT * FROM expenses WHERE date LIKE ? ORDER BY date DESC',
      args: [monthPrefix + '%']
    });
    return result.rows;
  } else {
    const result = await db.execute('SELECT * FROM expenses ORDER BY date DESC');
    return result.rows;
  }
}

export async function addExpense(data) {
  await db.execute({
    sql: 'INSERT INTO expenses (category, amount, date, description) VALUES (?, ?, ?, ?)',
    args: [data.category, data.amount, data.date, data.description]
  });
  revalidatePath('/');
  revalidatePath('/expenses');
}

// INVENTORY
export async function getInventory() {
  const result = await db.execute('SELECT * FROM inventory ORDER BY item_name ASC');
  return result.rows;
}

export async function addInventory(data) {
  const costPerServing = data.buyPrice / data.quantity;
  await db.execute({
    sql: `
      INSERT INTO inventory (item_name, quantity, total_buy_price, cost_per_serving) 
      VALUES (?, ?, ?, ?) 
      ON CONFLICT(item_name) DO UPDATE SET 
        quantity = quantity + ?, 
        total_buy_price = total_buy_price + ?,
        cost_per_serving = (total_buy_price + ?) / (quantity + ?)
    `,
    args: [data.itemName, data.quantity, data.buyPrice, costPerServing, data.quantity, data.buyPrice, data.buyPrice, data.quantity]
  });
  revalidatePath('/supplements');
}

export async function deleteInventoryItem(id) {
  await db.execute({
    sql: 'DELETE FROM inventory WHERE id = ?',
    args: [id]
  });
  revalidatePath('/supplements');
}

// SUPPLEMENTS
export async function getSupplements(monthPrefix) {
  if (monthPrefix) {
    const result = await db.execute({
      sql: `
        SELECT supplements.*, inventory.item_name as item
        FROM supplements 
        JOIN inventory ON supplements.inventory_id = inventory.id
        WHERE date LIKE ? 
        ORDER BY date DESC
      `,
      args: [monthPrefix + '%']
    });
    return result.rows;
  } else {
    const result = await db.execute(`
      SELECT supplements.*, inventory.item_name as item
      FROM supplements 
      JOIN inventory ON supplements.inventory_id = inventory.id
      ORDER BY date DESC
    `);
    return result.rows;
  }
}

export async function addSupplement(data) {
  // Get current cost per serving
  const invResult = await db.execute({
    sql: 'SELECT cost_per_serving FROM inventory WHERE id = ?',
    args: [data.inventoryId]
  });
  const inv = invResult.rows[0];
  const costAtSale = inv ? inv.cost_per_serving : 0;

  // Insert sale
  await db.execute({
    sql: 'INSERT INTO supplements (buyer_name, inventory_id, quantity_sold, price, cost_at_sale, date) VALUES (?, ?, ?, ?, ?, ?)',
    args: [data.buyerName, data.inventoryId, data.quantitySold, data.price, costAtSale, data.date]
  });
  
  // Decrement inventory stock
  await db.execute({
    sql: 'UPDATE inventory SET quantity = quantity - ? WHERE id = ?',
    args: [data.quantitySold, data.inventoryId]
  });

  revalidatePath('/');
  revalidatePath('/supplements');
}

export async function deleteSupplementSale(id) {
  // Get the inventory_id and quantity_sold to restore stock
  const saleResult = await db.execute({
    sql: 'SELECT inventory_id, quantity_sold FROM supplements WHERE id = ?',
    args: [id]
  });
  const sale = saleResult.rows[0];
  
  if (sale) {
    // Delete the sale
    await db.execute({
      sql: 'DELETE FROM supplements WHERE id = ?',
      args: [id]
    });
    
    // Restore inventory stock
    await db.execute({
      sql: 'UPDATE inventory SET quantity = quantity + ? WHERE id = ?',
      args: [sale.quantity_sold, sale.inventory_id]
    });
  }

  revalidatePath('/');
  revalidatePath('/supplements');
}

// REPORT GENERATION
export async function getMonthlyReport(year, month) {
  const monthStr = month < 10 ? '0' + month : month;
  const monthPrefix = `${year}-${monthStr}`;
  
  // Expenses for the month
  const expenses = await getExpenses(monthPrefix);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  // Supplement profit
  const supplements = await getSupplements(monthPrefix);
  const supplementRevenue = supplements.reduce((sum, sup) => sum + sup.price, 0);
  const supplementCost = supplements.reduce((sum, sup) => sum + (sup.cost_at_sale * sup.quantity_sold), 0);
  const netSupplementProfit = supplementRevenue - supplementCost;

  // Payments logic:
  const allPayments = await getPayments();
  let totalFees = 0;
  
  const targetMonthIndex = year * 12 + month;

  const validPayments = allPayments.map(p => {
    const pDate = new Date(p.date);
    const pYear = pDate.getFullYear();
    const pMonth = pDate.getMonth() + 1;
    const pStartMonthIndex = pYear * 12 + pMonth;
    const pEndMonthIndex = pStartMonthIndex + p.months_covered - 1;
    
    if (targetMonthIndex >= pStartMonthIndex && targetMonthIndex <= pEndMonthIndex) {
      const apportionedAmount = p.amount / p.months_covered;
      totalFees += apportionedAmount;
      return { ...p, apportionedAmount };
    }
    return null;
  }).filter(p => p !== null);

  const profit = totalFees + netSupplementProfit - totalExpenses;

  return {
    monthPrefix,
    totalExpenses,
    supplementRevenue,
    supplementCost,
    netSupplementProfit,
    totalFees,
    profit,
    validPayments,
    expenses,
    supplements
  };
}

// AUTHENTICATION
export async function login(id, password) {
  if (id === 'Fusion' && password === 'SpraYgod@99') {
    const cookieStore = await cookies();
    cookieStore.set('auth-token', 'logged-in', { httpOnly: true, path: '/' });
    return { success: true };
  }
  return { success: false, error: 'Invalid ID or Password' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  revalidatePath('/');
}
