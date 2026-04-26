import noteModel from "./note.model.js";
import NoteModel from "./note.model.js";

export default class NoteMongoRepository {

 async save(noteEntity) {

 const note = new NoteModel({

 title: noteEntity.title,
 content: noteEntity.content,
 imageUrl: noteEntity.imageUrl,
 isPrivate: noteEntity.isPrivate,
 password: noteEntity.password,
 userId: noteEntity.userId

 });

 const savedNote = await note.save();
 return savedNote.toObject();

 }
async findByUserId(userId){
    return await NoteModel.find({userId});
}

//TAREA 3

async findById(id) {
        const note = await NoteModel.findById(id);
        return note ? note.toJSON() : null;
    }


async updateMany(id, data) {
        const note = await NoteModel.findByIdAndUpdate(id,data,{returnDocument:'after'});
        if (!note) return null;
     
        return note.toObject();
    }

async deleteMany(id){

    const note = await noteModel.findByIdAndDelete(id);
}

}

