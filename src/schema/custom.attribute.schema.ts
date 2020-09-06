import * as mongoose from 'mongoose';
import { Schema } from '..';

const customAttributeSchema = new mongoose.Schema({
    key:{
        type:String,
        required: 'key is required'
    },
    value:{
        type: mongoose.Schema.Types.Mixed, 
        required: 'value is required'
    }
});

export default customAttributeSchema;