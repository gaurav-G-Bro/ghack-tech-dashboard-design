import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    contact: { 
        type: String, 
        required: true 
    },
    receivedDate: { 
        type: Date, 
        required: true,
        default: Date.now() 
    },
    inventory: { 
        type: String, 
        default: '' 
    },
    inventoryData: {
        type: String,
        default: 'NA'
    },
    issues: { 
        type: String, 
        default: '' 
    },
    notes: { 
        type: String, 
        default: '' 
    },
    technician: { 
        type: String, 
        default: '' 
    },
    amount: { type: Number, default: 0 },
    deadline: { type: Date, default: null },
    status: { type: String, default: 'Pending' }
});


const Client = mongoose.model('Client', ClientSchema);
export default Client;
