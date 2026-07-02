import { getSupplements, getInventory, getGlobalMonth } from '@/lib/actions';
import AddSupplementForm from '@/app/components/AddSupplementForm';
import InventoryManagement from '@/app/components/InventoryManagement';
import DeleteSaleButton from '@/app/components/DeleteSaleButton';
import DeleteInventoryButton from '@/app/components/DeleteInventoryButton';

export default async function SupplementsPage() {
  const { monthPrefix } = await getGlobalMonth();
  const supplements = await getSupplements(monthPrefix);
  const inventory = await getInventory();

  return (
    <div>
      <div className="page-header">
        <h1>Supplement Sales & Inventory</h1>
      </div>

      <div className="grid-2 mb-2">
        <div className="card">
          <h2 className="mb-1">Inventory Management</h2>
          <InventoryManagement />
        </div>

        <div className="card">
          <h2 className="mb-1">Current Stock</h2>
          <div className="table-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Total Cost</th>
                  <th>Cost/Serving</th>
                  <th>Qty In Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.id}>
                    <td>{item.item_name}</td>
                    <td>₹{item.total_buy_price.toFixed(2)}</td>
                    <td>₹{item.cost_per_serving.toFixed(2)}</td>
                    <td style={{ color: item.quantity > 0 ? 'var(--success)' : 'var(--danger)' }}>
                      {item.quantity}
                    </td>
                    <td><DeleteInventoryButton id={item.id} /></td>
                  </tr>
                ))}
                {inventory.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No inventory added.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid-2 mb-2">
        <div className="card">
          <h2 className="mb-1">Record Sale</h2>
          <AddSupplementForm inventory={inventory} monthPrefix={monthPrefix} />
        </div>

        <div className="card">
          <h2 className="mb-1">P&L Summary</h2>
          <div className="grid-2">
            <div>
              <p className="text-muted mb-0">Gross Revenue</p>
              <div className="card-value positive" style={{ fontSize: '1.5rem' }}>
                ₹{supplements.reduce((sum, s) => sum + s.price, 0).toFixed(2)}
              </div>
            </div>
            <div>
              <p className="text-muted mb-0">Total Cost (COGS)</p>
              <div className="card-value danger" style={{ fontSize: '1.5rem', color: 'var(--danger)' }}>
                ₹{supplements.reduce((sum, s) => sum + (s.cost_at_sale * s.quantity_sold), 0).toFixed(2)}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
             <p className="text-muted mb-0">Net Supplement Profit</p>
             <div className="card-value positive">
                ₹{(supplements.reduce((sum, s) => sum + s.price, 0) - supplements.reduce((sum, s) => sum + (s.cost_at_sale * s.quantity_sold), 0)).toFixed(2)}
             </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-1">All Sales</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Buyer Name</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Sell Price</th>
                <th>Profit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {supplements.map(s => {
                const cogs = s.cost_at_sale * s.quantity_sold;
                const profit = s.price - cogs;
                return (
                <tr key={s.id}>
                  <td>{s.date}</td>
                  <td>{s.buyer_name}</td>
                  <td>{s.item}</td>
                  <td>{s.quantity_sold}</td>
                  <td>₹{s.price}</td>
                  <td style={{ color: profit >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                    ₹{profit.toFixed(2)}
                  </td>
                  <td><DeleteSaleButton id={s.id} /></td>
                </tr>
                )
              })}
              {supplements.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No sales recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
