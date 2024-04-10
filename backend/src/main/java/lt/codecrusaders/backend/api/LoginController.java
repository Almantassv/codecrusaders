package lt.codecrusaders.backend.api;

import lt.codecrusaders.backend.db.UserRepository;
import lt.codecrusaders.backend.dtos.UserLoginDTO;
import lt.codecrusaders.backend.fdtos.UserLoginFDTO;
import lt.codecrusaders.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/api/login")
    public ResponseEntity<UserLoginDTO> login(@RequestBody UserLoginFDTO userLoginFDTO) {
        UserService userService = new UserService(userRepository);
        UserLoginDTO loggedUser = userService.authUser(userLoginFDTO);
        return ResponseEntity.ok(loggedUser);
    }
}
