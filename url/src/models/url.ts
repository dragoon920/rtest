import mongoose from 'mongoose';

// instantiate a mongoose schema
const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    userId: String,
    date: {
        type: String,
        default: Date.now
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
})


const Url = mongoose.model('Url', urlSchema);

export {Url};
