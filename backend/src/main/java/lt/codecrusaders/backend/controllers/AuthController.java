package lt.codecrusaders.backend.controllers;

import lt.codecrusaders.backend.model.dto.UserLoginDTO;
import lt.codecrusaders.backend.model.dto.UserRegisterDTO;
import lt.codecrusaders.backend.model.fdto.UserLoginFDTO;
import lt.codecrusaders.backend.model.fdto.UserRegisterFDTO;
import lt.codecrusaders.backend.repositories.UserRepository;
import lt.codecrusaders.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private final UserService userService = new UserService(userRepository);

    @PostMapping(value = "/api/login")
    public ResponseEntity<UserLoginDTO> login(@RequestBody UserLoginFDTO userLoginFDTO) {
        UserLoginDTO loggedUser = userService.authUser(userLoginFDTO);
        if (loggedUser.getToken() == null) {
            return ResponseEntity.badRequest().body(loggedUser);
        }
        return ResponseEntity.ok(loggedUser);
    }

    @PostMapping(value = "/api/register")
    public ResponseEntity<UserRegisterDTO> register(@RequestBody UserRegisterFDTO userRegisterFDTO) {
        UserRegisterDTO addedUser = userService.registerUser(userRegisterFDTO);
        if (!addedUser.isSuccess()) {
            return ResponseEntity.badRequest().body(addedUser);
        }
        return ResponseEntity.ok(addedUser);
    }
}
