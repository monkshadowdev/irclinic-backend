import { Invoice } from '../models/invoice.model.js'; // Update the path as per your project structure

// Add a new invoice
export const addInvoice = async (req, res) => {
    try {
        const { invoicePlan, userId } = req.body;

        // Validate required fields
        if (!invoicePlan) {
            return res.status(400).json({ message: 'Invoice plan is required', success: false });
        }

        // Create a new invoice
        const invoice = new Invoice({
            invoicePlan,
            userId
        });

        await invoice.save();
        res.status(201).json({ invoice, success: true });
    } catch (error) {
        console.error('Error adding invoice:', error);
        res.status(500).json({ message: 'Failed to add invoice', success: false });
    }
};

// Get all invoices
export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        if (!invoices ) {
            return res.status(404).json({ message: 'No invoices found', success: false });
        }
        res.status(200).json({ invoices, success: true });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ message: 'Failed to fetch invoices', success: false });
    }
};

// Get invoice by ID
export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found', success: false });
        }
        res.status(200).json({ invoice, success: true });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ message: 'Failed to fetch invoice', success: false });
    }
};

// Update invoice by ID
export const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { invoicePlan, userId } = req.body;

        // Build updated data
        const updatedData = {
            ...(invoicePlan && { invoicePlan }),
            ...(userId && { userId })
        };

        const invoice = await Invoice.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found', success: false });
        }
        res.status(200).json({ invoice, success: true });
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(400).json({ message: 'Failed to update invoice', success: false });
    }
};

// Delete invoice by ID
export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByIdAndDelete(id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found', success: false });
        }
        res.status(200).json({ invoice, success: true });
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ message: 'Failed to delete invoice', success: false });
    }
};
