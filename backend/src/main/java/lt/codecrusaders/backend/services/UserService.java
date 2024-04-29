package lt.codecrusaders.backend.services;

import lombok.RequiredArgsConstructor;
import lt.codecrusaders.backend.repositories.UserRepository;
import lt.codecrusaders.backend.model.dto.UserLoginDTO;
import lt.codecrusaders.backend.model.dto.UserRegisterDTO;
import lt.codecrusaders.backend.model.fdto.UserLoginFDTO;
import lt.codecrusaders.backend.model.fdto.UserRegisterFDTO;
import lt.codecrusaders.backend.model.entity.Roles;
import lt.codecrusaders.backend.model.entity.User;
import lt.codecrusaders.backend.security.BCrypt;
import lt.codecrusaders.backend.security.TokenProvider;
import lt.codecrusaders.backend.utils.EmailValidator;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider = new TokenProvider();

    public User getUserByUsername(String username) {
        User foundUser = userRepository.findByUsername(username).orElse(null);
        if (foundUser != null) {
            List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(Roles.getRoleById(foundUser.getRoleID()).getRoleName()));
            foundUser.setAuthorities(authorities);
        }
        return foundUser;
    }

    public UserLoginDTO authUser(UserLoginFDTO userLoginFDTO) {
        UserLoginDTO userLoginDTO = new UserLoginDTO();
        BCrypt bcrypt = new BCrypt();
        try {
            if (userLoginFDTO.getUsername() == null || userLoginFDTO.getPassword() == null) {
                throw new IllegalArgumentException("Username or password cannot be null");
            } else if (userLoginFDTO.getUsername().isEmpty() || userLoginFDTO.getPassword().isEmpty()) {
                throw new IllegalArgumentException("Username or password cannot be empty");
            }
            User foundUser = getUserByUsername(userLoginFDTO.getUsername());
            if (foundUser == null || !bcrypt.matches(userLoginFDTO.getPassword(), foundUser.getPassword())) {
                throw new IllegalArgumentException("Incorrect username or password");
            }
            userLoginDTO.setToken(tokenProvider.generateToken(foundUser));
        } catch(IllegalArgumentException e) {
            userLoginDTO.setMessage(e.getMessage());
        }
        return userLoginDTO;
    }

    public UserRegisterDTO registerUser(UserRegisterFDTO userRegisterFDTO) {
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO();
        EmailValidator emailValidator = new EmailValidator();
        Pattern p = Pattern.compile("[^a-z0-9 ]", Pattern.CASE_INSENSITIVE);
        try {
            if (userRegisterFDTO.getUsername() == null || userRegisterFDTO.getEmail() == null || userRegisterFDTO.getPassword() == null || userRegisterFDTO.getConfirmPassword() == null) {
                throw new IllegalArgumentException("Username / email / password / confirmPassword cannot be null");
            } else if (userRegisterFDTO.getUsername().isEmpty() || userRegisterFDTO.getEmail().isEmpty() || userRegisterFDTO.getPassword().isEmpty() || userRegisterFDTO.getConfirmPassword().isEmpty()) {
                throw new IllegalArgumentException("Username / email / password / confirmPassword cannot be empty");
            } else if (userRepository.findByUsername(userRegisterFDTO.getUsername()).isPresent()) {
                throw new IllegalArgumentException("Username already exists");
            } else if (userRegisterFDTO.getUsername().trim().isEmpty()) {
                throw new IllegalArgumentException("Username cannot be empty");
            } else if (userRegisterFDTO.getPassword().trim().isEmpty()) {
                throw new IllegalArgumentException("Password cannot be empty");
            } else if (userRegisterFDTO.getUsername().contains(" ")) {
                throw new IllegalArgumentException("Username cannot contain spaces");
            } else if (userRegisterFDTO.getPassword().contains(" ")) {
                throw new IllegalArgumentException("Password cannot contain spaces");
            } else if (p.matcher(userRegisterFDTO.getUsername()).find()) {
                throw new IllegalArgumentException("Username cannot contain special characters");
            } else if (userRegisterFDTO.getPassword().length() < 8 || userRegisterFDTO.getPassword().length() > 20) {
                throw new IllegalArgumentException("Password must be between 8 and 20 characters long");
            } else if (userRegisterFDTO.getUsername().length() < 3 || userRegisterFDTO.getUsername().length() > 32) {
                throw new IllegalArgumentException("Username must be between 3 and 32 characters long");
            } else if (!userRegisterFDTO.getConfirmPassword().equals(userRegisterFDTO.getPassword())) {
                throw new IllegalArgumentException("Passwords do not match");
            } else if (!emailValidator.validateEmail(userRegisterFDTO.getEmail())) {
                throw new IllegalArgumentException("Invalid email format");
            } else if (userRepository.findByEmail(userRegisterFDTO.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Account with this email address already exists");
            }
            BCrypt bcrypt = new BCrypt();
            userRegisterFDTO.setPassword(bcrypt.hashPassword(userRegisterFDTO.getPassword()));
            User user = new User(userRegisterFDTO);
            user.setRoleID(Roles.USER.getRoleId());
            userRepository.save(user);
            userRegisterDTO.setSuccess(true);
            userRegisterDTO.setMessage("Successfully added user");
        } catch(IllegalArgumentException e) {
            userRegisterDTO.setMessage(e.getMessage());
        }
        return userRegisterDTO;
    }
}
