export default class CategoryController {

 constructor(categoryService) {

 this.categoryService = categoryService;

 }


 createCategory = async (req, res) => {
    const data = req.body;
    //data.userId = req.user.id; 
    try {
        const category = await this.categoryService.createCategory(data);
        res.status(201).json({
        message: " Category created successfully",
        data: category
    }); // 201 Created

    } catch (error) {

    res.status(400).json({ error: error.message });

    }
 }


 getCategoryByUserId = async (req, res) => {
 //const userId = 'user_123';
 const userId = req.user.id;

    try {
        const categories = await this.categoryService.getCategoryByUserId(userId);
         res.status(200).json(categories); // 200 OK

        } catch (error) {
        res.status(404).json({ error: error.message });

        }
}
getById = async (req, res) => {

   const { id } = req.params;

try {

 const categories = await this.categoryService.getById(id);

 res.status(200).json(categories); // 200 OK

 } catch (error) {

 res.status(404).json({ error: error.message });

 }
}

updateCategory = async (req, res) => {
    
    const { id } = req.params;
    const data = req.body;
  
    console.log("data es:", data);
    console.log("el otro id es:", id);
   
    try {
    const category = await this.categoryService.updateCategory(id, data);

  
    res.status (200).json({
        message: "Category successfully updated",
        data: category
    });
     
    } catch (error) {
   
    res.status(404).json ({error:error.message});
    
}
    
}

deleteCategory = async (req, res)=> {
    //const userId = 'user_123';
    const { id } = req.params;
try{
    const deleteData = await this.categoryService.deleteCategory(id);
    res.status (200).json({

        message:"Category successfully deleted"
    });
    
}catch (error){
    res.status(404).json({error:error.message});
}

}


}
