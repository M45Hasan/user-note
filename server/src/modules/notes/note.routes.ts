import { Router } from 'express';

import { authenticate } from '../../common/middleware/auth.middleware.js';
import { validate } from '../../common/middleware/validate.middleware.js';

import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  getPublicNotes,
  updateNote,
} from './note.controller.js';

import {
  createNoteSchema,
  noteIdSchema,
  updateNoteSchema,
} from './note.validation.js';

const _ = Router();

_.get(
  '/public',
  getPublicNotes,
);

_.use(authenticate);

_.post(
  '/',
  validate(createNoteSchema),
  createNote,
);

_.get(
  '/',
  getNotes,
);

_.get(
  '/:id',
 
  getNote,
);

_.patch(
  '/:id',
 
  validate(updateNoteSchema),
  updateNote,
);

_.delete(
  '/:id',
  
  deleteNote,
);

export default _;