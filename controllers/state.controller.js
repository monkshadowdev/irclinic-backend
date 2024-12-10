import { State } from '../models/state.model.js'; // Update the path as per your project structure

// Add a new state
export const addState = async (req, res) => {
    try {
        const { stateName,stateCode, userId } = req.body;

        // Validate required fields
        if (!stateName || !stateCode) {
            return res.status(400).json({ message: 'All Field is required', success: false });
        }

        const upperCaseStateCode = stateCode.toUpperCase();

        // Create a new state
        const state = new State({ stateName,stateCode:upperCaseStateCode, userId });

        await state.save();
        res.status(201).json({ state, success: true });
    } catch (error) {
        console.error('Error adding state:', error);
        res.status(500).json({ message: 'Failed to add state', success: false });
    }
};

// Get all states
export const getStates = async (req, res) => {
    try {
        const states = await State.find();
        if (!states ) {
            return res.status(404).json({ message: 'No states found', success: false });
        }
        res.status(200).json({ states, success: true });
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).json({ message: 'Failed to fetch states', success: false });
    }
};

// Get state by ID
export const getStateById = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State.findById(id);
        if (!state) {
            return res.status(404).json({ message: 'State not found', success: false });
        }
        res.status(200).json({ state, success: true });
    } catch (error) {
        console.error('Error fetching state:', error);
        res.status(500).json({ message: 'Failed to fetch state', success: false });
    }
};

// Update state by ID
export const updateState = async (req, res) => {
    try {
        const { id } = req.params;
        const { stateName,stateCode, userId } = req.body;

        // Build updated data

        const upperCaseStateCode = stateCode.toUpperCase();
        const updatedData = {
            ...(stateName && { stateName }),
            ...(upperCaseStateCode && { stateCode:upperCaseStateCode }),
            ...(userId && { userId }),
        };

        const state = await State.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!state) {
            return res.status(404).json({ message: 'State not found', success: false });
        }
        res.status(200).json({ state, success: true });
    } catch (error) {
        console.error('Error updating state:', error);
        res.status(400).json({ message: 'Failed to update state', success: false });
    }
};

// Delete state by ID
export const deleteState = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State.findByIdAndDelete(id);
        if (!state) {
            return res.status(404).json({ message: 'State not found', success: false });
        }
        res.status(200).json({ state, success: true });
    } catch (error) {
        console.error('Error deleting state:', error);
        res.status(500).json({ message: 'Failed to delete state', success: false });
    }
};