import JobSheet from "../models/JobSheet.js";
import Client from "../models/client.js";  
import pdf from 'html-pdf';

const getAllJobSheets = async (req, res) => {
  JobSheet.find()
  .then(jobsheets => res.render('home', { jobsheets }))
  .catch(err => console.log(err));
};

const newJobSheetForm = async (req, res) => {
  res.render('new-job-sheet', {newJobSheetForm});
};

const createJobSheet = async (req, res) => {
  
  try {
      const newJobSheet = await new Client({
        name: req.body['clientName'],          
        contact: req.body['contactInfo'],      
        receivedDate: req.body['receivedDate'],
        inventory: req.body['inventoryReceived'],
        inventoryData: req.body['inventoryImage'],
        issues: req.body['reportedIssues'],
        notes: req.body['clientNotes'],
        technician: req.body['assignedTechnician'],
        amount: req.body['estimatedAmount'],
        deadline: req.body['deadline'],
        status: req.body['status']
    });

    const saved = await Client.create(newJobSheet);
    if(!saved) res.send({message: "failed to save data...try again"}).status(404).redirect('/');
    res.redirect('/');
  }catch(err) {
    console.log(err);
  }
};

const viewJobSheet = async (req, res) => {
  try {
    const jobsheet = await Client.findById(req.params.id); 
    if (!jobsheet) {
      return res.status(404).send('Job Sheet not found');
    }
    res.render('view-job-sheet', { jobsheet });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


const editJobSheetForm = async (req, res) => {
  try {
    const jobsheet = await Client.findById(req.params.id);
    if (!jobsheet) {
      return res.status(404).send({ message: 'Job sheet not found' });
    }

    const formattedJobSheet = {
      ...jobsheet._doc,  
      receivedDate: jobsheet.receivedDate ? jobsheet.receivedDate.toISOString().split('T')[0] : '', 
      deadline: jobsheet.deadline ? jobsheet.deadline.toISOString().split('T')[0] : '' 
    };

    res.render('edit-job-sheet', { jobsheet: formattedJobSheet });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


const updateJobSheet = async (req, res) => {
  try {
    const data = await Client.findById(req.params.id);
    const updatedJobSheet = await Client.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body['clientName'],          
        contact: req.body['contactInfo'],      
        receivedDate: req.body['receivedDate'],
        inventory: req.body['inventoryReceived'],
        inventoryData: req.body['inventoryImage'],
        issues: req.body['reportedIssues'],
        notes: req.body['clientNotes'],
        technician: req.body['assignedTechnician'],
        amount: req.body['estimatedAmount'],
        deadline: req.body['deadline'],
        status: req.body['status']
  },
  { new: true }  
  );

    if (!updatedJobSheet) {
      return res.status(404).send({ message: 'Job sheet not found' }).redirect('/');
    }
    if(updateJobSheet) return res.redirect(`/jobsheet/${req.params.id}`);
  } catch (err) {
    console.error("Update Error: ", err);
    res.status(500).send({ message: err.message });
  }
};

const deleteJobSheet = async (req, res) => {
  await JobSheet.findByIdAndDelete(req.params.id)
  .then(() => res.redirect('/'))
  .catch(err => console.log(err));
};

// writing homepage client logic codes

const getAllClients = async (req, res)=> {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getSingleClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id); 
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addNewClient = async (req, res) => {
  const client = new Client({
    name: req.body.name,
    contact: req.body.contact,
    receivedDate: req.body.receivedDate,
    inventory: req.body.inventory,
    issues: req.body.issues,
    notes: req.body.notes,
    technician: req.body.technician,
    amount: req.body.amount,
    deadline: req.body.deadline,
    status: req.body.status
  });
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const updateClient = async (req, res) => {
  try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.json(client); 
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    };

    const deleteClient = async (req, res) => {
      try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id); 
        if (!deletedClient) return res.status(404).send({ message: 'Client not found.' });
        res.status(200).send({ message: 'Client deleted successfully.' });
      } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).send({ message: 'Internal server error.' });
      }
    };


    const generateJobSheetPdf = async (req, res) => {
      try {
        const jobsheet = await Client.findById(req.params.id);  
        if (!jobsheet) {
          return res.status(404).send('Job Sheet not found');
        }

        const html = `
        <h1>Job Sheet Details</h1>
        <p><strong>Client Name:</strong> ${jobsheet.name}</p>
        <p><strong>Client Info:</strong> ${jobsheet.contact}</p>
        <p><strong>Received Date:</strong> ${jobsheet.receivedDate}</p>
        <p><strong>inventory Received:</strong> ${jobsheet.inventory}</p>
        <p><strong>Reported Issues:</strong> ${jobsheet.issues}</p>
        <p><strong>Client Notes:</strong> ${jobsheet.notes}</p>
        <p><strong>Assigned Technician:</strong> ${jobsheet.technician}</p>
        <p><strong>Estimated Amount:</strong> ${jobsheet.amount}</p>
        <p><strong>Deadline:</strong> ${jobsheet.deadline}</p>
        <p><strong>Status:</strong> ${jobsheet.status}</p>
        `;

        const options = { format: 'A4' };
        pdf.create(html, options).toStream((err, stream) => {
          if (err) {
            return res.status(500).send('Error generating PDF');
          }
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `attachment; filename="JobSheet-${jobsheet._id}.pdf"`);
          stream.pipe(res);
        });

      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    };


    export {getAllJobSheets, newJobSheetForm, createJobSheet, viewJobSheet, editJobSheetForm, updateJobSheet, deleteJobSheet, getAllClients, getSingleClient, addNewClient, updateClient, deleteClient, generateJobSheetPdf};