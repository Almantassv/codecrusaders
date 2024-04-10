package lt.codecrusaders.backend.api;

import lt.codecrusaders.backend.db.UserRepository;
import lt.codecrusaders.backend.dtos.UserRegisterDTO;
import lt.codecrusaders.backend.fdtos.UserRegisterFDTO;
import lt.codecrusaders.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RegisterController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/api/register")
    public ResponseEntity<UserRegisterDTO> register(@RequestBody UserRegisterFDTO userRegisterFDTO) {
        UserService userService = new UserService(userRepository);
        UserRegisterDTO addedUser = userService.registerUser(userRegisterFDTO);
        return ResponseEntity.ok(addedUser);
    }
}
