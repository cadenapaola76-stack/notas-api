

export default class NoteController {

 constructor(noteService) {

 this.noteService = noteService;

 }


 createNote = async (req, res) => {

const data = req.body;

 if (req.file) data.imageUrl = '/uploads/' + req.file.filename;

data.userId = 'user_123'; //TODO:  LUEGO OBTENER EL USUARIO DE LA SESION O TOKEN

 try {

 const note = await this.noteService.createNote(data);

 res.status(201).json({
    message: " Nota creada satisfactoriamente",
    data: note
 }); // 201 Created

 } catch (error) {

 res.status(400).json({ error: error.message });

 }

 }


 getNotesByUserId = async (req, res) => {

 const userId = 'user_123';

 try {

 const notes = await this.noteService.getNotesByUserId(userId);

 res.status(200).json(notes); // 200 OK

 } catch (error) {

 res.status(404).json({ error: error.message });

 }

}

// tarea 3

getById = async (req, res) => {

   const { id } = req.params;

try {

 const notes = await this.noteService.getById(id);

 res.status(200).json(notes); // 200 OK

 } catch (error) {

 res.status(404).json({ error: error.message });

 }
}

updateNote = async (req, res) => {
    
   const { id } = req.params;

   const data = req.body;
  
    console.log("data es:", data);
    console.log("el otro id es:", id);
   
    //if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
    try {
    const note = await this.noteService.updateNote(id, data);

  
    res.status (200).json({
        message: "Nota actualizada satisfactoriamente",
        data: note
    });
     
    } catch (error) {
   
    res.status(404).json ({error:error.message});
    
}
    
}

deleteNote = async (req, res)=> {
    //const userId = 'user_123';
    const { id } = req.params;
try{
    const deleteData = await this.noteService.deleteNote(id);
    res.status (200).json({

        message:"Nota eliminada satisfactoriamente"
    });
    
}catch (error){
    res.status(404).json({error:error.message});
}

}


}