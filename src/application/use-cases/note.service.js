
// importante al trabajar con nuestros archivos debemos añadir al final .js requerido para ESM

import NoteEntity from "../../domain/entities/note.entity.js";

export default class NoteService {

 constructor(noteRepository) {

 this.noteRepository = noteRepository;

 }

async createNote(data) {

 if (!data.title || !data.content) { throw new Error("Title and content are required"); }

 const note = new NoteEntity(data);

 return await this.noteRepository.save(note);

 }

async getNotesByUserId(userId){

 return await this.noteRepository.findByUserId(userId);

}

// Tarea 3

 async getById(id){
        return await this.noteRepository.findById(id);
    }


async updateNote(id, data) {
    
    console.log("ID recibido:", id);
    console.log("Datos recibidos:", data);
    const note = await this.noteRepository.updateMany(id, data);

    if (!note) throw new Error("Note not found"); 

    return note;
    
}


async deleteNote(id){
    
    return  await this.noteRepository.deleteMany(id);
    
}
 
}


 