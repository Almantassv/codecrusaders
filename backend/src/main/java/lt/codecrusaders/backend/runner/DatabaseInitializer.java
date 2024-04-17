package lt.codecrusaders.backend.runner;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lt.codecrusaders.backend.model.entity.Roles;
import lt.codecrusaders.backend.model.entity.User;
import lt.codecrusaders.backend.repositories.UserRepository;
import lt.codecrusaders.backend.security.BCrypt;
import lt.codecrusaders.backend.services.UserService;

import org.hibernate.annotations.Comment;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {


    private final UserRepository userRepository;



    @Override
    public void run(String... args) throws Exception {

        if (userRepository.findByUsername("admin").isEmpty()) {
            User adminUser = new User();
            adminUser.setRoleID(Roles.ADMIN.getRoleId());

            adminUser.setUsername("admin");
            adminUser.setEmail("admin@gmail.com");

            BCrypt bcrypt = new BCrypt();
            adminUser.setPassword(bcrypt.hashPassword("admin"));

            userRepository.save(adminUser);
            log.info("Database initialized");
        }
    }
    }

