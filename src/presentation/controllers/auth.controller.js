
export default class AuthController {

 constructor({ authService }) {
     this.authService = authService;

 }

    register = async (req, res) => {
    const result = await this.authService.register(req.body);
    res.status(201).json(result);

    };

    login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {

    return res.status(400).json({ error: "Email and password are required" });
     }

    const result = await this.authService.login(req.body);

    res.json(result);

    };

    updateUser = async(req, res)=> {
        const { id } = req.params;
        const data = req.body;
        const result = await this.authService.updateUser(id, data);
        res.json(result);
    };

    deleteUser = async (req, res) => {
        const { id } = req.params;
        const result = await this.authService.deleteUser(id);
        res.status(201).json(result);
    };

}

