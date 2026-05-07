import AuthService from "../../application/use-cases/auth.service.js";
import HashService from "../../infrastructure/security/hash.service.js";
//import hashService from "../../infrastructure/security/hash.service.js";
import JwtService from "../../infrastructure/security/jwt.service.js";
//import jwtService from "../../infrastructure/security/jwt.service.js";
import {jest, test} from '@jest/globals';

/** Mock del repositorio de usuarios */

const mockUserRepository = {

save: jest.fn(),
 findByEmail: jest.fn(),

}


describe('AuthService - Pruebas unitarias', () => {
let authService;


   beforeEach(() => {
       jest.clearAllMocks();
       authService = new AuthService(mockUserRepository);
       // Mocking services with spyOn since jest.mock() fails en ESM
       jest.spyOn(HashService, 'hash').mockResolvedValue("haschedPassword");
       jest.spyOn(HashService, 'compare').mockResolvedValue(true);
       jest.spyOn(JwtService, 'generateToken').mockResolvedValue("mock_token");
 });

describe('register', () =>{

   test('deberia registrar un nuevo usuario', async () => {

      //arrange
      mockUserRepository.findByEmail.mockResolvedValue(null);// No existe el email
      mockUserRepository.save.mockResolvedValue(true); // Simula guardado exitoso
      const userData = { email: "test@example.com", password: "password123" };

      //act
      const result = await authService.register(userData);

      //assert

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(result).toStrictEqual({message:"User registered successfully"} ); 

   });

   test('deberia lanzar error si el email ya existe', async () => {
       //arrange
       mockUserRepository.findByEmail.mockResolvedValue({ id: "1", email: "test@example.com" });
      const userData = { email: "test@example.com", password: "password123" };

      //act & assert

      await expect(authService.register(userData)).rejects.toThrow("Email already in use");

   });

});

describe('login', () => {
   const loginData = { email: "test@example.com" , password: "password123"};
   const mockUser = { id: "123", email:"test@example.com", password: "hashedPassword", role: "user"};

   test('deberia loguear exitosamente y devolver un token', async ()=> {
         mockUserRepository.findByEmail.mockResolvedValue(mockUser);
         HashService.compare.mockResolvedValue(true);
         JwtService.generateToken.mockResolvedValue("mock_token");

         const result = await authService.login(loginData);

         expect(result).toHaveProperty("token","mock_token");
   });

   test('deberia fallar si el usuario no existe', async() =>{
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect (authService.login(loginData)).rejects.toThrow("Invalid credentials");
   });

   test('deberia fallar si la contraseña es incorrecta', async ()=>{
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      HashService.compare.mockResolvedValue(false);

      await expect (authService.login(loginData)).rejects.toThrow("Invalid credentials");
   });
});
});