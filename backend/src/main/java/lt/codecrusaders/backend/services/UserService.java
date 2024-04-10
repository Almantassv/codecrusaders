package lt.codecrusaders.backend.services;

import lombok.RequiredArgsConstructor;
import lt.codecrusaders.backend.db.UserRepository;
import lt.codecrusaders.backend.dtos.UserLoginDTO;
import lt.codecrusaders.backend.dtos.UserRegisterDTO;
import lt.codecrusaders.backend.fdtos.UserLoginFDTO;
import lt.codecrusaders.backend.fdtos.UserRegisterFDTO;
import lt.codecrusaders.backend.obj.User;
import lt.codecrusaders.backend.utils.BCrypt;
import lt.codecrusaders.backend.utils.EmailValidator;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserLoginDTO authUser(UserLoginFDTO userLoginFDTO) {
        UserLoginDTO userLoginDTO = new UserLoginDTO();
        BCrypt bcrypt = new BCrypt();
        try {
            if (userLoginFDTO.getUsername() == null || userLoginFDTO.getPassword() == null) {
                throw new IllegalArgumentException("Username or password cannot be null");
            } else if (userLoginFDTO.getUsername().isEmpty() || userLoginFDTO.getPassword().isEmpty()) {
                throw new IllegalArgumentException("Username or password cannot be empty");
            } else if (userRepository.findByUsername(userLoginFDTO.getUsername()).isEmpty() ||
                    !bcrypt.matches(userLoginFDTO.getPassword(), userRepository.findByUsername(userLoginFDTO.getUsername()).get().getPassword())) {
                throw new IllegalArgumentException("Incorrect username or password");
            }
            userLoginDTO.setSuccess(true);
            userLoginDTO.setMessage("Successfully logged in");
        } catch(IllegalArgumentException e) {
            userLoginDTO.setMessage(e.getMessage());
        }
        return userLoginDTO;
    }

    public UserRegisterDTO registerUser(UserRegisterFDTO userRegisterFDTO) {
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO();
        EmailValidator emailValidator = new EmailValidator();
        try {
            if (userRegisterFDTO.getUsername() == null || userRegisterFDTO.getEmail() == null || userRegisterFDTO.getPassword() == null || userRegisterFDTO.getConfirmPassword() == null) {
                throw new IllegalArgumentException("Username / email / password / confirmPassword cannot be null");
            } else if (userRegisterFDTO.getUsername().isEmpty() || userRegisterFDTO.getEmail().isEmpty() || userRegisterFDTO.getPassword().isEmpty() || userRegisterFDTO.getConfirmPassword().isEmpty()) {
                throw new IllegalArgumentException("Username / email / password / confirmPassword cannot be empty");
            } else if (userRepository.findByUsername(userRegisterFDTO.getUsername()).isPresent()) {
                throw new IllegalArgumentException("Username already exists");
            } else if (userRegisterFDTO.getPassword().length() < 8) {
                throw new IllegalArgumentException("Password must be at least 8 characters long");
            } else if (!userRegisterFDTO.getConfirmPassword().equals(userRegisterFDTO.getPassword())) {
                throw new IllegalArgumentException("Passwords do not match");
            } else if (!emailValidator.validateEmail(userRegisterFDTO.getEmail())) {
                throw new IllegalArgumentException("Invalid email format");
            } else if (userRepository.findByEmail(userRegisterFDTO.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Account with this email address already exists");
            }
            BCrypt bcrypt = new BCrypt();
            userRegisterFDTO.setPassword(bcrypt.hashPassword(userRegisterFDTO.getPassword()));
            userRegisterDTO.setSuccess(true);
            userRegisterDTO.setMessage("Successfully added user");
            User user = new User(userRegisterFDTO);
            userRepository.save(user);
        } catch(IllegalArgumentException e) {
            userRegisterDTO.setMessage(e.getMessage());
        }
        return userRegisterDTO;
    }
}
