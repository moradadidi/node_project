const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON bodies
// Sample in-memory data store
let items = [
 { id: 1, name: 'Item 1' },
 { id: 2, name: 'Item 2' }
];
// GET all items
app.get('/items', (req, res) => {
 res.json(items);
});
// GET item by ID
app.get('/items/:id', (req, res) => {
 const item = items.find(i => i.id == req.params.id);
 if (item) {
 res.json(item);
 } else {
 res.status(404).send('Item not found');
 }
});
// POST to add a new item
app.post('/items', (req, res) => {
 const newItem = { id: items.length + 1, name: req.body.name };
 items.push(newItem);
 res.status(201).json(
    {
        "data":newItem,
        "status":201,
        "message":"item created succefully"
    }
 );
});
// DELETE an item by ID
app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
  
    // Find the item to be deleted
    const item = items.find(i => i.id == itemId);
  
    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: `Item with ID ${itemId} not found`
      });
    }
  
    // Filter out the deleted item
    items = items.filter(i => i.id != itemId);
  
    // Send response with the deleted item, status, and message
    res.status(200).json({
      status: 'success',
      message: `Item with ID ${itemId} has been deleted`,
      deletedItem: item
    });
  });
  
// PATCH to update an item's name by ID
app.patch('/items/:id', (req, res) => {
 const item = items.find(i => i.id == req.params.id);
 if (item) {
 item.name = req.body.name || item.name;
 res.json(item);
 } else {
 res.status(404).send('Item not found');
 }
});
// Server listening
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});