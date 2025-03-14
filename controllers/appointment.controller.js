import { Appointment } from '../models/appointment.model.js'; // Adjust the path according to your project structure
import { Invoice } from '../models/invoice.model.js';
import { Estimate } from '../models/estimate.model.js';

// Add a new appointment
export const addAppointment = async (req, res) => {
    try {
        const { patientId,appointmentType,title, doctorId, centerId, start, end,reason,reports,procedurePlan,investigationReports,progressNotes,invoiceId,estimateId,isCancelled,cancelby,cancelReason, userId,status,isFollowUp } = req.body;

        if (!patientId || !title || !start || !end) {
            return res.status(400).json({ message: 'Patient ID and time are required', success: false });
        }


        // Create a new appointment
        const appointment = new Appointment({
            patientId,
            appointmentType,
            title,
            doctorId,
            centerId: centerId || null,
            start,
            end,
            reason,
            reports,procedurePlan,investigationReports,progressNotes,invoiceId,estimateId,
            isCancelled,cancelby,cancelReason,
            userId: userId || null,
            status: status || "Scheduled",
            isFollowUp
        });

        await appointment.save();
        res.status(201).json({ appointment, success: true });
    } catch (error) {
        console.error('Error adding appointment:', error);
        res.status(500).json({ message: 'Failed to add appointment', success: false });
    }
};

// Get all appointments
export const getAppointments = async (req, res) => {
    try {
        const { start, end } = req.query;
        const { id } = req.params; 

        if (!start || !end) {
            return res.status(400).json({ message: "Start and end dates are required", success: false });
        }

        const appointments = await Appointment.find({
            centerId: id,
            start: { $gte: new Date(start) },
            end: { $lte: new Date(end) },
        });

        res.status(200).json({ appointments, success: true });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Failed to fetch appointments", success: false });
    }
};


// Get appointments by patient ID
export const getAppointmentsByPatientId = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch all appointments for the given patient ID
        const appointments = await Appointment.find({ patientId: id });

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this patient', success: false });
        }

        // Enhance appointments with corresponding invoicePlan if invoiceId exists
        const enhancedAppointments = await Promise.all(
            appointments.map(async (appointment) => {
                if (appointment.invoiceId) {
                    const invoice = await Invoice.findOne({ _id: appointment.invoiceId });
                    const invoicePlan = invoice.invoicePlan ;
                    return { ...appointment.toObject(), invoicePlan }; // Convert Mongoose document to plain object
                }else if(appointment.estimateId){
                    const estimate = await Estimate.findOne({ _id: appointment.estimateId });
                    const estimatePlan = estimate.estimatePlan ;
                    return { ...appointment.toObject(), estimatePlan }; // Convert Mongoose document to plain object
                }
                return appointment.toObject(); // If no invoiceId, return appointment as-is
            })
        );

        res.status(200).json({ appointments: enhancedAppointments, success: true });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Failed to fetch appointments', success: false });
    }
};


// Get appointment by ID
export const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found', success: false });
        }
        res.status(200).json({ appointment, success: true });
    } catch (error) {
        console.error('Error fetching appointment:', error);
        res.status(500).json({ message: 'Failed to fetch appointment', success: false });
    }
};

// Update appointment by ID
export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { patientId,appointmentType,title, doctorId, centerId, start, end,reason,reports,procedurePlan,investigationReports,progressNotes,invoiceId,estimateId,isCancelled, cancelby,cancelReason, userId ,status,isFollowUp} = req.body;

        // Build updated data
        const updatedData = {
            ...(patientId && { patientId }),
            ...(appointmentType && { appointmentType }),
            ...(title && { title }),
            ...(doctorId && { doctorId }),
            centerId: centerId || null,
            ...(start && { start }),
            ...(end && { end }),
            ...(reason && { reason }),
            reports,procedurePlan,investigationReports,progressNotes,invoiceId,estimateId,
            isCancelled,cancelby,cancelReason,
            userId: userId || null,
            ...(status && { status }),
            isFollowUp
        };

        const appointment = await Appointment.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found', success: false });
        }
        res.status(200).json({ appointment, success: true });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(400).json({ message: 'Failed to update appointment', success: false });
    }
};

// Delete appointment by ID
export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found', success: false });
        }
        res.status(200).json({ appointment, success: true });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Failed to delete appointment', success: false });
    }
};

export const dashboardAppointments = async (req, res) => {
    try {
        const { id } = req.params; 
        const totalAppointments = await Appointment.countDocuments({ centerId: id }); // Get total count

        const lastFiveAppointments = await Appointment.find({centerId: id,}, { title: 1, _id: 1 }) // Select only title
            .sort({ createdAt: -1 }) // Sort by creation date (descending)
            .limit(5); // Get last 5 appointments

        return res.status(200).json({ 
            totalAppointments, 
            appointments: lastFiveAppointments 
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Failed to fetch appointments', success: false });
    }
};
