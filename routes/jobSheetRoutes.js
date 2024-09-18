import {Router} from "express";
import {getAllJobSheets, newJobSheetForm, createJobSheet, viewJobSheet, editJobSheetForm, updateJobSheet, deleteJobSheet, getAllClients, getSingleClient, addNewClient, updateClient, deleteClient} from "../controllers/jobSheetController.js";
import { generateJobSheetPdf } from '../controllers/jobSheetController.js';

const router = Router();

router.get('/', getAllJobSheets);

router.get('/jobsheet', getAllJobSheets);

router.get('/jobsheet/new', newJobSheetForm);

router.post('/jobsheet', createJobSheet);

router.get('/jobsheet/:id', viewJobSheet);

router.get('/jobsheet/:id/edit', editJobSheetForm);

router.put('/jobsheet/:id/edit', updateJobSheet);

router.delete('/jobsheet/:id', deleteJobSheet);

router.get('/api/clients', getAllClients);

router.get('/api/clients/:id', getSingleClient);

router.post('/api/clients', addNewClient);

router.put('/api/clients/:id', updateClient);

router.delete('/api/clients/:id', deleteClient);

router.get('/jobsheet/:id/pdf', generateJobSheetPdf);


export {router};
