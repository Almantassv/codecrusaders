package lt.codecrusaders.backend.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.security.SecureRandom;

import lombok.Data;

@Data
public class BCrypt {
    private int hashStrength = 4; /*Bigger means worse performance*/
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(hashStrength, new SecureRandom());
    public String hashPassword(String rawPassword) {
        return bCryptPasswordEncoder.encode(rawPassword);
    }
    public boolean matches(String hashedPassword, String encodedPassword) {
        return this.bCryptPasswordEncoder.matches(hashedPassword, encodedPassword);
    }
}
